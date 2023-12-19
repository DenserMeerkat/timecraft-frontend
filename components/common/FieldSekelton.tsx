import { Skeleton } from "@/components/ui/skeleton";

export function FieldSkeleton() {
  return (
    <div className="max-w-7xl mx-auto pt-10 pb-10 md:pb-6 px-2 sm:px-4 md:px-6">
      <div className="mx-auto max-w-[16rem] h-12 flex items-center">
        <Skeleton className="h-12 w-52 mr-2" />
        <Skeleton className="h-12 w-12 rounded-md" />
      </div>
    </div>
  );
}
