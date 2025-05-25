import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IBlog } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
    blog: IBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-sm text-muted-foreground">
                    {formatDate(blog.date)} • {blog.readTime} min read
                </p>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                    <Link href={`/blog/${blog.slug}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}