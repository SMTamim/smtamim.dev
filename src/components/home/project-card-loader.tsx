import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ProjectCardSkeleton() {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="pb-3">
                <div className="flex flex-wrap gap-1 mb-2">
                    {Array(3).fill(null).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-12 rounded-full" />
                    ))}
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
            </CardHeader>

            <CardContent className="p-0">
                <div className="aspect-video w-full overflow-hidden border-t bg-muted">
                    <Skeleton className="w-full h-full" />
                </div>
            </CardContent>

            <CardFooter className="mt-auto flex flex-col items-start gap-3 pt-4">
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <div className="flex gap-2 w-full">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </CardFooter>
        </Card>
    )
};