import { Progress } from "@heroui/react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
        size="md"
        color="warning"
      />
    </div>
  );
}
