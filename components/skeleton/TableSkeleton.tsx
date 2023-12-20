import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="mt-4 mb-8 pt-4">
      <Skeleton className="h-36 w-full" />
    </div>
  );
}
