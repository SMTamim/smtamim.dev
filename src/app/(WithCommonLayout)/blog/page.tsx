"use client";

import BlogCard, { BlogCardSkeleton } from "@/components/home/blog-card";
import { Button } from "@/components/ui/button";
import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { useEffect, useState } from "react";
import { TBlog } from "@/lib/types";
import { getAllBlogs } from "@/lib/services/blog.actions";

export default function BlogPage() {

    const [blogs, setBlogs] = useState<TBlog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);
            const blogs = await getAllBlogs();
            setBlogs(blogs);
            console.log(blogs);
        } catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.1)}
            className="container mx-auto px-4 py-12"
        >
            <motion.div variants={fadeIn("up", 0.2)} className="mb-12">
                <h1 className="text-3xl font-bold mb-4">Blog</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Thoughts on web development, design, and technology
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                        <motion.div key={index} variants={fadeIn("up", 0.2 + index * 0.1)}>
                            <BlogCardSkeleton key={index} />
                        </motion.div>
                    ))
                )
                    :
                    blogs.map((blog, index) => (
                        <motion.div
                            key={blog.blogId}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                        >
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))
                }
            </div>

            <motion.div
                variants={fadeIn("up", 0.4)}
                className="mt-12 flex justify-center"
            >
                <Button variant="outline">Load More</Button>
            </motion.div>
        </motion.section>
    );
}