import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="max-w-3xl m-auto py-16 flex flex-col">
      <Skeleton className="w-full h-96 rounded-xl">
        <div className="bg-default-200" />
      </Skeleton>
      <div className="flex flex-row mt-6 gap-4">
        <Skeleton className="size-14 rounded-full">
          <div className="rounded-full bg-default-200" />
        </Skeleton>
        <div className="flex flex-col justify-between">
          <Skeleton className="rounded-xl h-8 w-96">
            <div className="bg-default-200" />
          </Skeleton>
          <Skeleton className="rounded-xl h-4 w-56">
            <div className="bg-default-200" />
          </Skeleton>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <Skeleton className="h-6 w-full rounded-xl">
          <div className="bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-xl">
          <div className="bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-xl">
          <div className="bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-xl">
          <div className="bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-xl">
          <div className="bg-default-200" />
        </Skeleton>
        <Skeleton className="h-6 w-full rounded-xl">
          <div className="bg-default-200" />
        </Skeleton>
      </div>
    </div>
  );
}
