import Providers from "@/app/adminProviders";
import Sidebar from "@/components/admin/sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 p-8">
                        {children}
                    </div>
                </div>
            </div>
        </Providers>
    );
}