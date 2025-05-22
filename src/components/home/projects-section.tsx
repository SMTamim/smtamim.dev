"use client";

import { projects } from "@/lib/constants/projects";
import ProjectCard from "@/components/home/project-card";

import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";

export default function ProjectsSection() {
    return (
        <motion.section
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1, 0.1)}
            className="container mx-auto px-4 py-12"
        >
            <motion.h2
                variants={fadeIn("up", 0.2)}
                className="text-3xl font-bold text-center mb-12"
            >
                Featured Projects
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project, index) => (
                    <motion.div
                        key={project.id}
                        variants={fadeIn("up", 0.2 + index * 0.1)}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}