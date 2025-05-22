import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Manage your portfolio projects
                        </p>
                        <Button asChild>
                            <Link href="/admin/projects">Manage Projects</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Blogs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Manage your blog posts
                        </p>
                        <Button asChild>
                            <Link href="/admin/blogs">Manage Blogs</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Manage your skills section
                        </p>
                        <Button asChild>
                            <Link href="/admin/skills">Manage Skills</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Manage your work experience
                        </p>
                        <Button asChild>
                            <Link href="/admin/experience">Manage Experience</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}