'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link"
// import { blogs } from "@/lib/constants/blogs"
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
import { getAllBlogs } from "@/lib/services/blog";

export default function BlogsPage() {

    const [blogs, setBlogs] = useState<TBlog[]>([]);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<string | undefined>(undefined);

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
                                            <Badge variant="outline">{blog.status}</Badge>
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
                                            <Button variant="outline" size="sm" onClick={() => handleEditClick(blog.blogId!)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                Delete
                                            </Button>
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