import Link from "next/link";
import {
    LayoutDashboard,
    Briefcase,
    Code,
    BookOpen,
    GraduationCap,
    Settings,
    LogOut,
} from "lucide-react";

export default function Sidebar() {
    return (
        <div className="sticky top-0 min-h-screen max-h-screen w-64 bg-white dark:bg-gray-800 shadow-md">
            <div className="p-4 border-b dark:border-gray-700">
                <h1 className="text-xl font-medium dark:text-white">Admin Dashboard</h1>
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/projects"
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                            <Code size={18} />
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/blogs"
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                            <BookOpen size={18} />
                            Blog Posts
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/skills"
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                            <Code size={18} />
                            Skills
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/experience"
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                            <Briefcase size={18} />
                            Experience
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/education"
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                            <GraduationCap size={18} />
                            Education
                        </Link>
                    </li>
                </ul>
                <div className="mt-8 pt-4 border-t dark:border-gray-700">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                    >
                        <Settings size={18} />
                        Settings
                    </Link>
                    <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 w-full">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
}