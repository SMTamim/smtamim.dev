import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} S M Tamim Mahmud. All rights reserved.
                    </p>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="https://github.com" target="_blank">
                                <Github className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="https://linkedin.com" target="_blank">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="https://twitter.com" target="_blank">
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="mailto:tamimmahmud0@gmail.com">
                                <Mail className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}