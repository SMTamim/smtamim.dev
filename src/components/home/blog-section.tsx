"use client";

import { blogs } from "@/lib/constants/blogs";
import BlogCard from "@/components/home/blog-card";

import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogSection() {
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
                {blogs.slice(0, 3).map((blog, index) => (
                    <motion.div key={blog.id} variants={fadeIn("up", 0.2 + index * 0.1)}>
                        <BlogCard blog={blog} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}