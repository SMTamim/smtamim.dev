"use client";

import { motion } from "@/components/shared/framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllSkills, getAllSkillCategories } from "@/lib/services/skill.actions";
import { Skill, SkillCategory } from "../../../generated/zod";

const getProficiencyLabel = (level: number) => {
    if (level > 80) return 'Expert';
    if (level > 60) return 'Advanced';
    if (level > 40) return 'Intermediate';
    return 'Beginner';
};

export default function SkillsSection() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [skillsData, categoriesData] = await Promise.all([
                    getAllSkills(),
                    getAllSkillCategories()
                ]);
                setSkills(skillsData);
                setCategories(categoriesData);
            } catch (err) {
                setError("Failed to load skills data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <section id="skills" className="py-16 md:py-20 lg:py-24">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-destructive">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {`Technologies and abilities I've mastered throughout my career`}
                    </p>
                </motion.div>

                {/* Category Grouping with Dot Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <Card>
                        <CardHeader>
                            <h3 className="text-xl font-semibold">Skills by Category</h3>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {loading ? (
                                <div className="space-y-8">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <Skeleton className="h-6 w-6 rounded-full" />
                                                <Skeleton className="h-6 w-32" />
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {[...Array(5)].map((_, j) => (
                                                    <Skeleton key={j} className="h-10 w-24 rounded-full" />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : categories.length === 0 ? (
                                <p className="text-muted-foreground text-center py-8">No skill categories found</p>
                            ) : (
                                categories.map((category) => {
                                    const categorySkills = skills.filter(
                                        (skill) => skill.sCategoryId === category.sCatId
                                    );

                                    if (categorySkills.length === 0) return null;

                                    return (
                                        <div key={category.sCatId}>
                                            <div className="flex items-center gap-3 mb-4">
                                                {category.icon ? (
                                                    <Image
                                                        src={category.icon}
                                                        width={24}
                                                        height={24}
                                                        alt={category.name}
                                                        className="dark:invert"
                                                    />
                                                ) : (
                                                    <Skeleton className="h-6 w-6 rounded-full" />
                                                )}
                                                <h4 className="text-lg font-medium">{category.name}</h4>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                {categorySkills.map((skill) => (
                                                    <Tooltip key={skill.sId}>
                                                        <TooltipTrigger asChild>
                                                            <motion.div
                                                                whileHover={{ y: -3 }}
                                                                className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-full"
                                                            >
                                                                <Image
                                                                    src={skill.icon || "/icons/default-skill.svg"}
                                                                    width={20}
                                                                    height={20}
                                                                    alt={skill.name}
                                                                    className="h-5 w-5 object-contain"
                                                                />
                                                                <span className="text-sm font-medium">{skill.name}</span>
                                                                <div className="flex ml-2">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <div
                                                                            key={i}
                                                                            className={`w-2 h-2 rounded-full mx-0.5 ${i < Math.floor(skill.proficiency / 20)
                                                                                ? 'bg-primary'
                                                                                : 'bg-muted'
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                {skill.name} - {getProficiencyLabel(skill.proficiency)}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}