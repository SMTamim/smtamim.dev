"use client";

import { motion } from "@/components/shared/framer-motion";
import { skills } from "@/lib/constants/skills";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

const skillIcons: Record<string, string> = {
    "JavaScript": "/icons/javascript.svg",
    "TypeScript": "/icons/typescript.svg",
    "React": "/icons/react.svg",
    "Next.js": "/icons/nextjs.svg",
    "Node.js": "/icons/nodejs.svg",
    "Express": "/icons/express.svg",
    "MongoDB": "/icons/mongodb.svg",
    "PostgreSQL": "/icons/postgresql.svg",
    "GraphQL": "/icons/graphql.svg",
    "HTML/CSS": "/icons/html-css.svg",
    "Tailwind CSS": "/icons/tailwindcss.svg",
    "Git": "/icons/git.svg",
    "Docker": "/icons/docker.svg",
    "AWS": "/icons/aws.svg",
    "Problem Solving": "/icons/problem-solving.svg",
    "Team Leadership": "/icons/leadership.svg",
    "Communication": "/icons/communication.svg",
    "Time Management": "/icons/time-management.svg",
    "Adaptability": "/icons/adaptability.svg",
    "Collaboration": "/icons/collaboration.svg",
    "Creativity": "/icons/creativity.svg",
    "Attention to Detail": "/icons/detail.svg",
};

const getProficiencyLabel = (level: number) => {
    if (level > 80) return 'Expert';
    if (level > 60) return 'Advanced';
    if (level > 40) return 'Intermediate';
    return 'Beginner';
};

export default function SkillsSection() {
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
                            {skills.categories.map((category) => (
                                <div key={category.name}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image
                                            src={category.icon}
                                            width={24}
                                            height={24}
                                            alt={category.name}
                                            className="dark:invert"
                                        />
                                        <h4 className="text-lg font-medium">{category.name}</h4>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {[...skills.technical, ...skills.soft]
                                            .filter((skill) => skill.category === category.name)
                                            .map((skill) => (
                                                <Tooltip key={skill.name}>
                                                    <TooltipTrigger>
                                                        <motion.div
                                                            whileHover={{ y: -3 }}
                                                            className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-full"
                                                        >
                                                            <Image
                                                                src={skillIcons[skill.name] || "/icons/default-skill.svg"}
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
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}