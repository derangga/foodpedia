import { Skeleton } from "../skeleton";

const RecipeSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <div className="p-4">
      <Skeleton className="h-6 w-3/4 mb-1" />
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
);

export default RecipeSkeleton;
