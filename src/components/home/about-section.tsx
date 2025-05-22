"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, fadeIn } from "@/components/shared/framer-motion";

export default function AboutSection() {
    return (
        <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn("up", 0.2)}
            className="container mx-auto px-4 py-12"
        >
            <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <p className="text-lg mb-4">
                        {`I'm a passionate Full Stack Developer with 5 years of experience
                        building web applications. I specialize in JavaScript technologies
                        across the whole stack.`}
                    </p>
                    <p className="text-lg mb-4">
                        My approach combines technical expertise with creative problem-solving
                        to deliver high-quality, user-friendly applications.
                    </p>
                    <p className="text-lg">
                        {`I'm always eager to learn and explore new technologies, and I'm
                        committed to staying up-to-date with industry trends.`}
                    </p>
                </div>
                <Card>
                    <CardHeader className="text-xl font-semibold">
                        Education
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Master of Computer Science</h3>
                                <p className="text-muted-foreground">
                                    Stanford University • 2018 - 2020
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium">Bachelor of Software Engineering</h3>
                                <p className="text-muted-foreground">
                                    MIT • 2014 - 2018
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.section>
    );
}