
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/constants/projects";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/#projects">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>
            </Button>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 bg-muted rounded-full text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg mb-6">{project.fullDescription}</p>

                    {project.features && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                            <ul className="space-y-2">
                                {project.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.challenges && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Challenges & Solutions</h2>
                            <ul className="space-y-2">
                                {project.challenges.map((challenge, i) => (
                                    <li key={i}>{challenge}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        {project.demoUrl && (
                            <Button asChild>
                                <Link href={project.demoUrl} target="_blank">
                                    Live Demo
                                </Link>
                            </Button>
                        )}
                        {project.codeUrl && (
                            <Button variant="outline" asChild>
                                <Link href={project.codeUrl} target="_blank">
                                    View Code
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}