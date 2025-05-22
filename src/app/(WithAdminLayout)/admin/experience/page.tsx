import { experiences } from "@/lib/constants/experiences";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ExperiencePage() {
    return (
        <div className="dark:text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium">Work Experience</h1>
                <Link
                    href="/admin/experience/new"
                    className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                    <Plus size={16} />
                    Add Experience
                </Link>
            </div>

            <div className="space-y-6">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-medium dark:text-gray-200">{exp.position}</h2>
                                <div className="text-gray-600 dark:text-gray-300 mt-1">{exp.company}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.duration}</div>
                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href={`/admin/experience/${exp.id}`}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                >
                                    Edit
                                </Link>
                                <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                                    Delete
                                </button>
                            </div>
                        </div>
                        <ul className="mt-4 space-y-2 pl-5 list-disc dark:text-gray-300">
                            {exp.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}