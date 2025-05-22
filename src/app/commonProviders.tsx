'use client';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { ProgressProvider } from '@bprogress/next/app';

export default function CommonProviders({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider
            height="2px"
            color="#0c6611"
            shallowRouting
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </ProgressProvider>
    );
}