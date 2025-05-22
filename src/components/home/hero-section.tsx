"use client";

import { Button } from "@/components/ui/button";

import { motion, fadeIn } from "@/components/shared/framer-motion";
import Link from "next/link";
import { Download } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn("up", 0.2)}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {`Hi, I'm `}<span className="text-primary">S M Tamim Mahmud</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                        Full Stack Developer
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        I build exceptional digital experiences with modern technologies.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <Link href="/contact">Contact Me</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/resume.pdf" download>
                                <Download className="mr-2 h-4 w-4" />
                                Download Resume
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}