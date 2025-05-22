"use client";

import BlogCard from "@/components/home/blog-card";
import { Button } from "@/components/ui/button";
import { blogs } from "@/lib/constants/blogs";
import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";

export default function BlogPage() {
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
                {blogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        variants={fadeIn("up", 0.2 + index * 0.1)}
                    >
                        <BlogCard blog={blog} />
                    </motion.div>
                ))}
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