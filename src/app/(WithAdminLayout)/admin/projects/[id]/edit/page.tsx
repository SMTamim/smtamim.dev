"use server";

import EditProjectComponent from "@/components/admin/edit-project-component";
interface PageProps {
    params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
    const { id } = await params;
    return <EditProjectComponent projectID={id} />;
}
