import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
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

export default function BlogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Blog Posts</h1>
                <Button asChild>
                    <Link href="/admin/blogs/new" className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {blogs.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell className="font-medium">{blog.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">Published</Badge>
                                </TableCell>
                                <TableCell>{blog.date}</TableCell>
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}