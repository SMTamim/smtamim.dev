import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Project } from "../../../generated/zod";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import config from "@/config";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    console.log({ project });
    return (
        <Card key={project.pId} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                        </Badge>
                    )}
                </div>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                    {project.shortDescription}
                </CardDescription>
            </CardHeader>

            {project.images.length > 0 && (
                <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-none border-t">
                        <Image
                            src={`${config.public_url}${project.images[0]}`}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </CardContent>
            )}

            <CardFooter className="mt-auto flex flex-col items-start gap-3 pt-4">
                <div className="flex gap-2">
                    <Badge
                        variant={
                            project.status === "COMPLETE" ? "default" :
                                project.status === "ONGOING" ? "secondary" : "outline"
                        }
                        className="capitalize"
                    >
                        {project.status.toLowerCase()}
                    </Badge>
                    {(project.frontendDemoUrl || project.backendDemoUrl) && (
                        <Badge variant="outline">Demo Available</Badge>
                    )}
                </div>

                <div className="flex gap-2 w-full">
                    <Button asChild variant="outline" className="flex-1">
                        <Link href={`/projects/${project.slug}`}>
                            View Details
                        </Link>
                    </Button>
                    {project.frontendDemoUrl && (
                        <Button asChild size="icon" variant="ghost">
                            <Link href={project.frontendDemoUrl} target="_blank" title="Live Demo">
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                    {project.frontendGitUrl && (
                        <Button asChild size="icon" variant="ghost">
                            <Link href={project.frontendGitUrl} target="_blank" title="Source Code">
                                <Github className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}