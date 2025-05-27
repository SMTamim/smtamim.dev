"use client";
import BlogCard, { BlogCardSkeleton } from "@/components/home/blog-card";
import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/services/blog.actions";
import { TBlog } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NoDataFound } from "../shared/no-data-found";

export default function BlogSection() {
    const [blogs, setBlogs] = useState<TBlog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [animateContent, setAnimateContent] = useState(false);

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const blogs = await getAllBlogs();
            setBlogs(blogs);
            // Trigger animations after content is loaded
            requestAnimationFrame(() => setAnimateContent(true));
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <motion.section
            id="blog"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1, 0.1)}
            className="container mx-auto px-4 py-12"
        >
            <motion.div variants={fadeIn("up", 0.2)} className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest Blogs</h2>
                <Button variant="ghost" asChild>
                    <Link href="/blog">View All</Link>
                </Button>
            </motion.div>

            <motion.div
                className={`grid ${blogs.length ? 'md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 place-items-center'}`}
                initial="hidden"
                animate={animateContent ? "visible" : "hidden"}
                variants={staggerContainer(0.1, 0.1)}
            >
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <motion.div
                            key={`skeleton-${index}`}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                        >
                            <BlogCardSkeleton />
                        </motion.div>
                    ))
                ) : blogs.length ? (
                    blogs.slice(0, 3).map((blog, index) => (
                        <motion.div
                            key={blog.blogId}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                        >
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))
                ) : (
                    <NoDataFound title="No blog found" description="There's no blog to display here at the moment." />
                )}
            </motion.div>
        </motion.section>
    );
}