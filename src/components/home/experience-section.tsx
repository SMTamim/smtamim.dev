"use client";

import { experiences } from "@/lib/constants/experiences";

import { motion, fadeIn, staggerContainer } from "@/components/shared/framer-motion";

export default function ExperienceSection() {
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

            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        variants={fadeIn("up", 0.2 + index * 0.1)}
                        className="border-l-2 border-primary pl-6 relative"
                    >
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1" />
                        <h3 className="text-xl font-semibold">{exp.position}</h3>
                        <p className="text-muted-foreground">
                            {exp.company} • {exp.duration}
                        </p>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            {exp.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}