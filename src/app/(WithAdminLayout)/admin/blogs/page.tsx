'use client';

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import PostNewBlog from "@/components/admin/new-blog-modal"
import { TableSkeleton } from "@/components/shared/table-skeleton"
import { useEffect, useState } from "react"
import { formatDate } from 'date-fns';
import { NoDataFound } from "@/components/shared/no-data-found";
import { TBlog } from "@/lib/types";
import { deleteBlog, getAllBlogs, updateBlogStatus } from "@/lib/services/blog";
import ConfirmModal from "@/components/shared/confirm-modal";
import { toast } from "sonner";
import { AlertCircle, Check, ChevronDown, XCircle } from "lucide-react";
import { BlogStatus } from "../../../../../generated/prisma";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function BlogsPage() {

    const [blogs, setBlogs] = useState<TBlog[]>([]);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<string | undefined>(undefined);

    const statusOptions = [
        { value: BlogStatus.PENDING, label: 'Pending', icon: AlertCircle, variant: 'outline', color: 'text-orange-600' },
        { value: BlogStatus.PUBLISHED, label: 'Published', icon: Check, variant: 'default', color: 'text-green-600' },
        { value: BlogStatus.UNPUBLISHED, label: 'Unpublished', icon: XCircle, variant: 'destructive', color: 'text-red-600' },
    ];

    const handleStatusUpdate = async (blogId: string, newStatus: BlogStatus) => {
        const result = await updateBlogStatus(blogId, newStatus)
        if (result.success) {
            toast.success("Blog status updated successfully");
            fetchBlogs();
        }
    };

    const getStatusConfig = (status: BlogStatus) => {
        return statusOptions.find(opt => opt.value === status) || statusOptions[0];
    };

    const StatusCell = ({ blog }: { blog: TBlog }) => {
        const currentStatus = getStatusConfig(blog.status as BlogStatus);
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
                        const isSelected = blog.status === option.value;

                        return (
                            <DropdownMenuItem
                                key={option.value}
                                className={`cursor-pointer gap-2 ${isSelected ? 'bg-blue-50 text-blue-700' : ''
                                    }`}
                                onClick={() => handleStatusUpdate(blog.blogId!, option.value)}
                            >
                                <OptionIcon className={`h-4 w-4 ${option.color}`} />
                                <span className="flex-1">{option.label}</span>
                                {isSelected && (
                                    <Check className="h-4 w-4 text-blue-600" />
                                )}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    const fetchBlogs = async () => {
        try {
            setIsTableLoading(true);
            const blogs = await getAllBlogs();
            setBlogs(blogs);
            console.log(blogs);
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsTableLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);


    const handleEditClick = (blogId: string) => {
        setSelectedBlog(blogId);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedBlog(undefined);
    };

    const handleDelete = async (blogId: string) => {
        const toastId = toast.loading("Deleting blog...");
        try {
            await deleteBlog(blogId);
            fetchBlogs();
            toast.success("Blog deleted successfully", { id: toastId });
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message || "Blog deletion failed!", { id: toastId });
            }
        }
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Blog Posts</h1>
                <div>
                    {modalOpen && (
                        <PostNewBlog
                            blogId={selectedBlog}
                            onClose={handleModalClose}
                            fetchBlogs={fetchBlogs}
                        />
                    )}
                    {!modalOpen && <PostNewBlog fetchBlogs={fetchBlogs} />}
                </div>
            </div>

            <div className="rounded-md border">

                <Table>
                    <TableHeader className="bg-accent">
                        <TableRow>
                            <TableHead className=" rounded-l-lg">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            isTableLoading ? (
                                <TableSkeleton cols={6} />
                            ) : blogs.length ? (
                                blogs.map((blog) => (
                                    <TableRow key={blog.blogId}>
                                        <TableCell className="max-w-[300px] truncate">
                                            {blog.title}
                                        </TableCell>
                                        <TableCell>
                                            <StatusCell blog={blog} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{formatDate(blog.createdAt!, "dd-MMM-yy hh:mm")}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                {blog.tags?.map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEditClick(blog.slug!)}>
                                                Edit
                                            </Button>
                                            <ConfirmModal
                                                trigger={<Button variant="destructive" size="sm">Delete</Button>}
                                                variant="destructive"
                                                description={<span>Are you sure you want to deleting post <span className="text-red-400">{blog.title}</span>?</span>}
                                                onConfirm={() => handleDelete(blog.blogId!)}
                                            />
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
    )
}