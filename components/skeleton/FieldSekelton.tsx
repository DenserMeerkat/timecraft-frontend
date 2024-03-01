import { Skeleton } from "@/components/ui/skeleton";

export function FieldSkeleton() {
  return (
    <div className="mx-auto flex h-12 max-w-[16rem] items-center">
      <Skeleton className="mr-2 h-12 w-52" />
      <Skeleton className="h-12 w-12 rounded-md" />
    </div>
  );
}
