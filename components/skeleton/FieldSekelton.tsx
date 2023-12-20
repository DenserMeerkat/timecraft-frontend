import { Skeleton } from "@/components/ui/skeleton";

export function FieldSkeleton() {
  return (
    <div className="mx-auto max-w-[16rem] h-12 flex items-center">
      <Skeleton className="h-12 w-52 mr-2" />
      <Skeleton className="h-12 w-12 rounded-md" />
    </div>
  );
}
