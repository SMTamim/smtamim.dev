"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { blogs } from "@/lib/constants/blogs";
import { motion, fadeIn } from "@/components/shared/framer-motion";

interface BlogPageProps {
    params: {
        slug: string;
    };
}

export default function BlogPage({ params }: BlogPageProps) {
    const blog = blogs.find((b) => b.slug === params.slug);

    if (!blog) {
        notFound();
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
                        {formatDate(blog.date)} • {blog.readTime} min read
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