import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TBlog } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import config from "@/config";

interface BlogCardProps {
    blog: TBlog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-sm text-muted-foreground">
                    {formatDate(blog.createdAt!)} • {blog.readTime} min read
                </p>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-none border-t">
                        <Image
                            src={`${config.public_url}${blog.featuredImage}`}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </CardContent>
            </CardContent>
            <CardFooter>
                <Button asChild variant="ghost" className="w-full">
                    <Link href={`/blog/${blog.slug}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export function BlogCardSkeleton() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="space-y-2">
                <Skeleton className="w-3/4 h-6 rounded-md" />
                <Skeleton className="w-1/2 h-4 rounded-md" />
            </CardHeader>
            <CardContent className="flex-1">
                <Skeleton className="w-full h-16 rounded-md" />
            </CardContent>
            <CardFooter>
                <Skeleton className="w-full h-10 rounded-md" />
            </CardFooter>
        </Card>
    );
}