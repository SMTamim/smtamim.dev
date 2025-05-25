"use client";

import Loader from '@/components/shared/loader';
import { SessionProvider, useSession } from 'next-auth/react';


function SessionLoaderWrapper({ children }: { children: React.ReactNode }) {
    const { status } = useSession();

    if (status === "loading") {
        return <Loader />;
    }

    return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SessionLoaderWrapper>
                {children}
            </SessionLoaderWrapper>
        </SessionProvider>
    );
}
