import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4">
      <Spinner className="size-10 text-muted-foreground" />
      <div className="flex w-full max-w-md flex-col gap-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </main>
  )
}
