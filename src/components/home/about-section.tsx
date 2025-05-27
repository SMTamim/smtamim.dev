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
                        {`Experienced web developer with 6+ years in custom solutions for business needs, skilled in database design, WordPress, Laravel, Python, PHP, HTML, JavaScript, React, FastAPI, Flask, and Flutter.`}
                    </p>
                    <p className="text-lg mb-4">
                        {` I deliver high-quality, tailored projects that boost efficiency and user engagement, ensuring your site or app is a valuable asset.`}
                    </p>
                    <p className="text-lg">
                        {`Let’s discuss how my expertise can support your goals—reach out for a consultation and see the difference expert development can make!`}
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
                                    Khulna University • 2025 - Ongoing
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium">Bachelor of Computer Science and Engineering</h3>
                                <p className="text-muted-foreground">
                                    Northern University of Business and Technology, Khulna • 2019 - 2023
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.section>
    );
}