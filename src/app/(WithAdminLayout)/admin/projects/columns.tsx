"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "technologies",
        header: "Technologies",
        cell: ({ row }) => {
            const technologies = row.getValue("technologies") as string[];
            return (
                <div className="flex flex-wrap gap-1">
                    {technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/projects/${project.id}`}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            );
        },
    },
];