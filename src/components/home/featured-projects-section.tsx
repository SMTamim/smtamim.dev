"use client";

import ProjectCard from "@/components/home/project-card";
import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { useEffect, useState } from "react";
import { Project } from "../../../generated/zod";
import { getAllProjects } from "@/lib/services/project.actions";
import { toast } from "sonner";
import ProjectCardSkeleton from "./project-card-loader";
import { NoDataFound } from "../shared/no-data-found";
import { Card } from "../ui/card";

export default function FeaturedProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const projects = await getAllProjects({ isFeatured: true });
            setProjects(projects);
            // Trigger animations after content is loaded
            requestAnimationFrame(() => setShouldAnimate(true));
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

            <motion.div
                className={`grid ${projects.length ? "md:grid-cols-2 lg:grid-cols-3 gap-6" : "grid-cols-1"}`}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                variants={staggerContainer(0.1, 0.1)}
            >
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <motion.div
                            key={`skeleton-${index}`}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                        >
                            <ProjectCardSkeleton />
                        </motion.div>
                    ))
                ) : projects.length ? (
                    projects.slice(0, 3).map((project, index) => (
                        <motion.div
                            key={project.pId}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))
                ) : (
                    <motion.div variants={fadeIn("up", 0.2)}>
                        <Card>
                            <NoDataFound
                                title="No featured projects found"
                                description="There's no featured projects to display here at the moment."
                            />
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    );
}