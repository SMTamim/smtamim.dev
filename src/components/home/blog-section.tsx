"use client";
import BlogCard, { BlogCardSkeleton } from "@/components/home/blog-card";

import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/services/blog.actions";
import { TBlog } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogSection() {
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                        <motion.div key={index} variants={fadeIn("up", 0.2 + index * 0.1)}>
                            <BlogCardSkeleton key={index} />
                        </motion.div>
                    ))

                )
                    :
                    blogs.slice(0, 3).map((blog, index) => (
                        <motion.div key={blog.blogId} variants={fadeIn("up", 0.2 + index * 0.1)}>
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    );
}