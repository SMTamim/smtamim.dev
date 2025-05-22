import { projects } from "@/lib/constants/projects";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
    return (
        <div className="dark:text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                    <Plus size={16} />
                    Add Project
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Title
                            </th>
                            {/* Other table headers */}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200">
                                    <div className="font-medium">{project.title}</div>
                                </td>
                                {/* Other table cells */}
                                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                    <Link
                                        href={`/admin/projects/${project.id}`}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                    >
                                        Edit
                                    </Link>
                                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}