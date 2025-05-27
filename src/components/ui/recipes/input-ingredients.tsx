import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "../input";

interface InputIngredientsProps {
  onItemsChange?: (ingredients: string[]) => void;
}

const InputIngredients: React.FC<InputIngredientsProps> = ({
  onItemsChange,
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const handleIngredientKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentIngredient.trim()) {
      e.preventDefault();
      const newItems = [...ingredients, currentIngredient.trim()];
      setIngredients(newItems);
      setCurrentIngredient("");
      onItemsChange?.(newItems);
    }
  };

  const removeIngredient = (index: number) => {
    const newItems = ingredients.filter((_, i) => i !== index);
    setIngredients(newItems);
    onItemsChange?.(newItems);
  };
  return (
    <>
      <Input
        type="text"
        value={currentIngredient}
        onChange={(e) => setCurrentIngredient(e.target.value)}
        onKeyDown={handleIngredientKeyDown}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Type ingredient and press Enter"
      />
      <div className="mt-2 space-y-2">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
          >
            <span>{ingredient}</span>
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default InputIngredients;
