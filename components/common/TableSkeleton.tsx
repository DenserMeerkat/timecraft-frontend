import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="max-w-7xl mt-4 mb-14">
      <div className="flex justify-between gap-1 sm:gap-2 md:gap-4 mb-4">
        <Skeleton className="h-8 w-16 md:w-36 rounded-md" />
        <div className="w-full flex justify-end mr-2 sm:mr-1">
          <Skeleton className="h-8 w-44 md:w-52 max-w-2xl rounded-md" />
        </div>
        <Skeleton className="h-8 w-16 sm:w-32 rounded-md" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
