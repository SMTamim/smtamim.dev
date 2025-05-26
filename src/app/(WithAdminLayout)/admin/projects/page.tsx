"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Plus, ChevronDown, Check, XCircle, AlertCircle, Edit, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project, ProjectStatusSchema } from "../../../../../generated/zod";
import { ProjectStatus } from "../../../../../generated/prisma";
import { deleteProject, getAllProjects, updateProjectStatus } from "@/lib/services/project.actions";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { NoDataFound } from "@/components/shared/no-data-found";
import ConfirmModal from "@/components/shared/confirm-modal";

export default function ProjectsTable() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isTableLoading, setIsTableLoading] = useState(true);
    // const [selectedProject, setSelectedProject] = useState<string | undefined>(undefined);

    const statusOptions = [
        { value: ProjectStatus.PLANNING, label: "Planing", icon: AlertCircle, variant: "outline", color: "text-orange-600" },
        { value: ProjectStatus.ONGOING, label: "Ongoing", icon: Check, variant: "default", color: "text-blue-600" },
        { value: ProjectStatus.COMPLETE, label: "Complete", icon: XCircle, variant: "destructive", color: "text-green-600" },
    ];

    const handleStatusUpdate = async (projectId: string, newStatus: typeof ProjectStatusSchema._type) => {
        try {
            // Assuming you have an updateProjectStatus function similar to updateBlogStatus
            const result = await updateProjectStatus(projectId, newStatus);
            if (result.success) {
                toast.success("Project status updated successfully");
                fetchProjects();
            }
        } catch (err) {
            toast.error("Failed to update project status");
        }
    };

    const getStatusConfig = (status: typeof ProjectStatusSchema._type) => {
        return statusOptions.find(opt => opt.value === status) || statusOptions[0];
    };

    const StatusCell = ({ project }: { project: Project }) => {
        const currentStatus = getStatusConfig(project.status);
        const IconComponent = currentStatus.icon;

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="inline-flex items-center gap-1 cursor-pointer group">
                        <Badge
                            variant={currentStatus.variant as "outline" | "default" | "destructive"}
                            className="hover:opacity-80 transition-opacity pr-1"
                        >
                            <IconComponent className="h-3 w-3 mr-1" />
                            {currentStatus.label}
                            <ChevronDown className="h-3 w-3 ml-1 group-hover:translate-y-0.5 transition-transform" />
                        </Badge>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    {statusOptions.map((option) => {
                        const OptionIcon = option.icon;
                        const isSelected = project.status === option.value;

                        return (
                            <DropdownMenuItem
                                key={option.value}
                                className={`cursor-pointer gap-2 ${isSelected ? "bg-blue-50 text-blue-700" : ""}`}
                                onClick={() => handleStatusUpdate(project.pId, option.value)}
                            >
                                <OptionIcon className={`h-4 w-4 ${option.color}`} />
                                <span className="flex-1">{option.label}</span>
                                {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    const fetchProjects = async () => {
        try {
            setIsTableLoading(true);
            // Assuming you have a getAllProjects function
            const projects = await getAllProjects();
            setProjects(projects);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch projects");
        } finally {
            setIsTableLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (projectId: string) => {
        const toastId = toast.loading("Deleting project...");
        try {
            // Assuming you have a deleteProject function
            await deleteProject(projectId);
            fetchProjects();
            toast.success("Project deleted successfully", { id: toastId });
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || "Project deletion failed!", { id: toastId });
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Link href="/admin/projects/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Technologies</TableHead>
                            <TableHead>Demo Available</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            isTableLoading ? (
                                <TableSkeleton cols={6} />
                            ) : projects.length ? (
                                projects.map((project) => (
                                    <TableRow key={project.pId}>
                                        <TableCell className="font-medium">
                                            <div>{project.title}</div>
                                            <div className="text-sm text-muted-foreground line-clamp-1">
                                                {project.shortDescription}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusCell project={project} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {project.technologies.slice(0, 3).map((tech) => (
                                                    <Badge key={tech} variant="secondary" className="text-xs">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{project.technologies.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {project.frontendDemoUrl || project.backendDemoUrl ? (
                                                <Badge variant="outline">Available</Badge>
                                            ) : (
                                                <Badge variant="outline">None</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(project.updatedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 justify-end">
                                                <Link href={`/admin/projects/${project.pId}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <ConfirmModal
                                                    trigger={(
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            className="text-white-600 hover:text-red-800"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    )}
                                                    variant="destructive"
                                                    description={<span>Are you sure you want to deleting project <span className="text-red-400">{project.title}</span>?</span>}
                                                    onConfirm={() => handleDelete(project.pId)}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        <NoDataFound />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}