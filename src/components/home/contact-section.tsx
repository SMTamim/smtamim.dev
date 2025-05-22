
"use client";
import { motion, fadeIn } from "@/components/shared/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactSection() {
    return (
        <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn("up", 0.2)}
            className="container mx-auto px-4 py-12"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground">tamimmahmud0@gmail.com</p>
                        </div>
                        <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">+880 1303255555</p>
                        </div>
                        <div>
                            <p className="font-medium">Location</p>
                            <p className="text-muted-foreground">Khulna, Bangladesh</p>
                        </div>
                    </div>
                </div>

                <div>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Subject" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Your message"
                                rows={5}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </motion.section>
    );
}