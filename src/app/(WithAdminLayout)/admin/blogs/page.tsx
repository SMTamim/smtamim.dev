'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { blogs } from "@/lib/constants/blogs"
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
import { useState } from "react"
import { formatDate } from 'date-fns';
import { NoDataFound } from "@/components/shared/no-data-found";

export default function BlogsPage() {

    const [isTableLoading, setIsTableLoading] = useState(true);

    setTimeout(() => { setIsTableLoading(false) }, 500);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Blog Posts</h1>
                <div>

                    <PostNewBlog />
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
                                    <TableRow key={blog.id}>
                                        <TableCell className="max-w-[300px] truncate">
                                            {blog.title}
                                        </TableCell>
                                        <TableCell>Published</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{formatDate(blog.date, "dd-MMM-yy hh:mm")}</Badge>
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
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/blogs/${blog.id}`}>Edit</Link>
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