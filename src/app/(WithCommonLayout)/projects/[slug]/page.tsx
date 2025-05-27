"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Project } from "../../../../../generated/zod";
import { useEffect, useState } from "react";
import { getSingleProject } from "@/lib/services/project.actions";
import { Skeleton } from "@/components/ui/skeleton";
import config from "@/config";

export default function ProjectShowcase() {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchBlogDetails = async () => {
            setIsLoading(true);
            try {
                if (slug) {
                    const blog = await getSingleProject({ params: { slug: slug.toString() } });
                    console.log(blog);
                    setProject(blog);
                }
            } catch (err) {
                console.error("Project fetching error:", err);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchBlogDetails();
    }, [slug]);

    if (isLoading) {
        return (
            <ProjectSkeleton />
        )
    }
    if (!project) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="container py-12">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
                        <p className="text-xl text-muted-foreground">{project.shortDescription}</p>

                        <div className="flex flex-wrap gap-4 mt-4">
                            {project.frontendDemoUrl && (
                                <Button asChild variant="default">
                                    <Link href={project.frontendDemoUrl} target="_blank">
                                        View Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                            {project.frontendGitUrl && (
                                <Button asChild variant="outline">
                                    <Link href={project.frontendGitUrl} target="_blank">
                                        <Github className="mr-2 h-4 w-4" /> Frontend Code
                                    </Link>
                                </Button>
                            )}
                            {project.backendGitUrl && (
                                <Button asChild variant="outline">
                                    <Link href={project.backendGitUrl} target="_blank">
                                        <Github className="mr-2 h-4 w-4" /> Backend Code
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Hero Image */}
                    {project.images.length > 0 && (
                        <div className="rounded-xl border bg-muted overflow-hidden mb-12">
                            <Image
                                src={`${config.public_url}${project.images[0]}`}
                                alt={project.title}
                                width={1600}
                                height={900}
                                className="w-full h-auto aspect-video object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                            {/* Full Description */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
                                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.fullDescription }} />

                            </section>

                            {/* Features */}
                            {project.features.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                                    <ul className="space-y-3">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-primary">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Challenges */}
                            {project.challenges.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                                    <ul className="space-y-4">
                                        {project.challenges.map((challenge, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-destructive">•</span>
                                                <span>{challenge}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Project Status */}
                            <div className="rounded-lg border p-6">
                                <h3 className="font-medium mb-4">Project Status</h3>
                                <div className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${project.status === "COMPLETE" ? "bg-green-500" :
                                        project.status === "ONGOING" ? "bg-blue-500" : "bg-orange-500"
                                        }`} />
                                    <span className="capitalize">
                                        {project.status.toLowerCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Gallery */}
                            {project.images.length > 1 && (
                                <div className="rounded-lg border p-6">
                                    <h3 className="font-medium mb-4">Gallery</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {project.images.slice(1).map((image, i) => (
                                            <div key={i} className="rounded-md overflow-hidden border">
                                                <Image
                                                    src={`${config.public_url}${image}`}
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-auto aspect-square object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            <div className="rounded-lg border p-6 space-y-3">
                                <h3 className="font-medium mb-2">Links</h3>
                                {project.frontendDemoUrl && (
                                    <Button asChild variant="outline" className="w-full justify-start">
                                        <Link href={project.frontendDemoUrl} target="_blank">
                                            <ArrowUpRight className="mr-2 h-4 w-4" /> Live Demo
                                        </Link>
                                    </Button>
                                )}
                                {project.frontendGitUrl && (
                                    <Button asChild variant="outline" className="w-full justify-start">
                                        <Link href={project.frontendGitUrl} target="_blank">
                                            <Github className="mr-2 h-4 w-4" /> Frontend Code
                                        </Link>
                                    </Button>
                                )}
                                {project.backendGitUrl && (
                                    <Button asChild variant="outline" className="w-full justify-start">
                                        <Link href={project.backendGitUrl} target="_blank">
                                            <Github className="mr-2 h-4 w-4" /> Backend Code
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

const ProjectSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <div className="container py-12">
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {Array(4).fill(0).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-20 rounded-full" />
                        ))}
                    </div>
                    <Skeleton className="h-10 w-2/3" />
                    <Skeleton className="h-6 w-1/2" />
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                </div>

                <Skeleton className="w-full h-[300px] rounded-xl mb-12" />

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i}>
                                <Skeleton className="h-6 w-1/3 mb-4" />
                                {[...Array(3)].map((_, j) => (
                                    <Skeleton key={j} className="h-4 w-full mb-2" />
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg border p-6 space-y-2">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                        <div className="rounded-lg border p-6 space-y-3">
                            <Skeleton className="h-6 w-1/3" />
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

)
