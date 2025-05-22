import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "./columns";
import { projects } from "@/lib/constants/projects";

export default function AdminProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Manage Projects</h1>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                    </Link>
                </Button>
            </div>

            <DataTable columns={columns} data={projects} />
        </div>
    );
}