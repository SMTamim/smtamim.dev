import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { education } from "@/lib/constants/education"

export default function EducationPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Education</h1>
                <Button asChild>
                    <Link href="/admin/education/new" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Education
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {education.map((edu) => (
                    <Card key={edu.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{edu.degree}</CardTitle>
                                    <CardDescription>{edu.institution}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/education/${edu.id}`}>Edit</Link>
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Duration:</span>
                                    <span>{edu.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Field:</span>
                                    <span>{edu.field}</span>
                                </div>
                                {edu.description && (
                                    <p className="text-muted-foreground">{edu.description}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}