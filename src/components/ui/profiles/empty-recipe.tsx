import { BookOpen } from "lucide-react";

const EmptyRecipe: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No recipes yet
        </h3>
      </div>
    </div>
  );
};

export default EmptyRecipe;
