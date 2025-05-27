"use client";

import { useState, useEffect } from "react";
import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";
import { getAllWorkExperiences } from "@/lib/services/work-experience.actions";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { WorkExperience } from "../../../generated/zod";

export default function ExperienceSection() {
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [loading, setLoading] = useState(true);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await getAllWorkExperiences();
                setExperiences(data);
                // Wait for the next frame to ensure content is rendered before animating
                requestAnimationFrame(() => setAnimate(true));
            } catch (error) {
                console.error("Error fetching experiences:", error);
                toast.error("Failed to fetch work experiences");
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    const formatDateRange = (startDate: Date, endDate: Date | null, onGoing: boolean) => {
        const start = format(new Date(startDate), "MMM yyyy");
        if (onGoing) return `${start} - Present`;
        if (!endDate) return start;
        return `${start} - ${format(new Date(endDate), "MMM yyyy")}`;
    };

    return (
        <motion.section
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1, 0.1)}
            className="container mx-auto px-4 py-12 bg-muted"
        >
            <motion.h2
                variants={fadeIn("up", 0.2)}
                className="text-3xl font-bold text-center mb-12"
            >
                Work Experience
            </motion.h2>

            {loading ? (
                <div className="space-y-8">
                    {[...Array(3)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            animate={animate ? "visible" : "hidden"}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                            className="border-l-2 border-primary pl-6 relative"
                        >
                            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : experiences.length === 0 ? (
                <motion.div
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    variants={fadeIn("up", 0.2)}
                    className="text-center py-12"
                >
                    <p className="text-muted-foreground">No work experiences found</p>
                </motion.div>
            ) : (
                <motion.div
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    variants={staggerContainer(0.1, 0.1)}
                    className="space-y-8"
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.wId}
                            variants={fadeIn("up", 0.2 + index * 0.1)}
                            className="border-l-2 border-primary pl-6 relative"
                        >
                            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1" />
                            <h3 className="text-xl font-semibold">{exp.position}</h3>
                            <p className="text-muted-foreground">
                                {exp.company} • {formatDateRange(exp.startDate, exp.endDate, exp.onGoing)}
                            </p>
                            <ul className="mt-2 space-y-1 list-disc list-inside">
                                {exp.responsibilities?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.section>
    );
}