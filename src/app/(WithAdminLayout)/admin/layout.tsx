import Providers from "@/app/adminProviders";
import Sidebar from "@/components/admin/sidebar";
import { EyeIcon } from "lucide-react";
import Link from "next/link";


interface IAdminLayoutProps {
    children: React.ReactNode;
}


export default async function AdminLayout({ children }: IAdminLayoutProps) {
    return (
        <Providers>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 p-8">
                        {children}
                    </div>
                    <div className={'sticky top-0 right-0 h-5 '} >
                        <Link className="flex p-4" target={'_blank'} href={"/"}>
                            <EyeIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </Providers>
    );
}
