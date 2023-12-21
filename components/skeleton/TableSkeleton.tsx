import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
