import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground">{project.shortDescription}</p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/projects/${project.slug}`}>Project Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}