"use client";

import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { motion, fadeIn } from "@/components/shared/framer-motion";
import { useEffect, useState } from "react";
import { getSingleBlog } from "@/lib/services/blog";
import { TBlog } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";


export default function SingleBlogPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<TBlog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchBlogDetails = async () => {
            setIsLoading(true);
            try {
                if (slug) {
                    const blog = await getSingleBlog({ params: { slug: slug.toString() } });
                    console.log(blog);
                    setBlog(blog);
                }
            } catch (err) {
                console.error("Blog fetching error:", err);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchBlogDetails();
    }, [slug]);

    if (isLoading) {
        return (
            <BlogDetailSkeleton />
        )
    }
    if (!blog) {
        return notFound();
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn("up", 0.2)}
            className="container mx-auto px-4 py-12"
        >
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
            </Button>

            <article className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <span className="text-sm text-muted-foreground">
                        {formatDate(blog.createdAt!)} • {blog.readTime} min read
                    </span>
                    {blog.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-muted px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-6"
                >
                    {blog.title}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </article>
        </motion.div>
    );
}

function BlogDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12 animate-pulse">
            <div className="mb-8">
                <Skeleton className="w-32 h-10 rounded-md inline-flex items-center" />
            </div>

            <article className="max-w-3xl mx-auto">
                <div className="mb-8 space-y-2">
                    <Skeleton className="w-40 h-4" /> {/* Date + read time */}
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="w-14 h-6 rounded" />
                        ))}
                    </div>
                </div>

                <Skeleton className="w-3/4 h-10 mb-6" /> {/* Title */}

                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="w-full h-4 rounded" />
                    ))}
                    <Skeleton className="w-5/6 h-4 rounded" />
                    <Skeleton className="w-2/3 h-4 rounded" />
                </div>
            </article>
        </div>
    );
}