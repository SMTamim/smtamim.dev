"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/mode-toggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center">
            <div className="container flex h-14 items-center justify-between w-10/12">
                <Link href="/" className="font-bold">
                    S M Tamim Mahmud
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Button
                            key={link.name}
                            asChild
                            variant={pathname === link.href ? "secondary" : "ghost"}
                        >
                            <Link href={link.href}>{link.name}</Link>
                        </Button>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-2 py-4">
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.name}
                                        asChild
                                        variant={pathname === link.href ? "secondary" : "ghost"}
                                        className="justify-start"
                                    >
                                        <Link href={link.href}>{link.name}</Link>
                                    </Button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}