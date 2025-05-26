"use client";

import ProjectCard from "@/components/home/project-card";

import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { useEffect, useState } from "react";
import { Project } from "../../../generated/zod";
import { getAllProjects } from "@/lib/services/project.actions";
import { toast } from "sonner";
import ProjectCardSkeleton from "./project-card-loader";

export default function FeaturedProjectsSection() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const projects = await getAllProjects({ isFeatured: true });
            setProjects(projects);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    console.log({ isLoading, projects });

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

                {
                    isLoading ? (
                        Array(3).fill(0).map((_, index) => (
                            <motion.div key={index} variants={fadeIn("up", 0.2 + index * 0.1)}>
                                <ProjectCardSkeleton key={index} />
                            </motion.div>
                        ))

                    )
                        :
                        projects.slice(0, 3).map((project, index) => (
                            <motion.div
                                key={project.pId}
                                variants={fadeIn("up", 0.2 + index * 0.1)}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))
                }

            </div>
        </motion.section>
    );
}