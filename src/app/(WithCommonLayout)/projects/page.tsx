"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Project } from "../../../../generated/zod";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/lib/services/project.actions";
import { toast } from "sonner";
import ProjectCardSkeleton from "@/components/home/project-card-loader";
import config from "@/config";


export default function AdminProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <ProjectCards />
            </div>
        </div>
    );
}


function ProjectCards() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const projects = await getAllProjects();
            setProjects(projects);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
                <div className="flex gap-2">
                    {/* Optional: Add filter controls here */}
                </div>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6).fill(null).map((_, i) => (
                        <ProjectCardSkeleton key={i} />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.pId} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex flex-wrap gap-1 mb-2">
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
                                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {project.shortDescription}
                                </CardDescription>
                            </CardHeader>

                            {project.images.length > 0 && (
                                <CardContent className="p-0">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-t-none border-t">
                                        <Image
                                            src={`${config.public_url}${project.images[0]}`}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </CardContent>
                            )}

                            <CardFooter className="mt-auto flex flex-col items-start gap-3 pt-4">
                                <div className="flex gap-2">
                                    <Badge
                                        variant={
                                            project.status === "COMPLETE" ? "default" :
                                                project.status === "ONGOING" ? "secondary" : "outline"
                                        }
                                        className="capitalize"
                                    >
                                        {project.status.toLowerCase()}
                                    </Badge>
                                    {(project.frontendDemoUrl || project.backendDemoUrl) && (
                                        <Badge variant="outline">Demo Available</Badge>
                                    )}
                                </div>

                                <div className="flex gap-2 w-full">
                                    <Button asChild variant="outline" className="flex-1">
                                        <Link href={`/projects/${project.slug}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                    {project.frontendDemoUrl && (
                                        <Button asChild size="icon" variant="ghost">
                                            <Link href={project.frontendDemoUrl} target="_blank" title="Live Demo">
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    )}
                                    {project.frontendGitUrl && (
                                        <Button asChild size="icon" variant="ghost">
                                            <Link href={project.frontendGitUrl} target="_blank" title="Source Code">
                                                <Github className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}


