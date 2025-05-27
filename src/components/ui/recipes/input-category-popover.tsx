"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { X } from "lucide-react";
import { Input } from "../input";

interface InputCategoryPopover {
  categories: string[];
  onCategorySelected?: (categories: string[]) => void;
}

const InputCategoryPopover: React.FC<InputCategoryPopover> = ({
  categories,
  onCategorySelected,
}) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const filteredCategories = categories.filter(
    (category) =>
      category.toLowerCase().includes(categoryInput.toLowerCase()) &&
      !selectedCategories.includes(category)
  );
  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      const newSelected = [...selectedCategories, category];
      setSelectedCategories(newSelected);
      onCategorySelected?.(newSelected);
    }
    setCategoryInput("");
  };
  const removeCategory = (category: string) => {
    const newSelected = selectedCategories.filter((c) => c !== category);
    setSelectedCategories(newSelected);
    onCategorySelected?.(newSelected);
  };
  return (
    <div className="relative">
      <Popover open={categoryInput.length > 0}>
        <PopoverTrigger asChild>
          <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-gray-300 min-h-[42px]">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
              >
                {category}
                <button
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="ml-2 text-orange-600 hover:text-orange-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
            <Input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="flex-1 min-w-[120px] border-none"
              placeholder="Type to search categories..."
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="bg-white rounded-lg border-gray-300 shadow-lg p-2 w-[320px] sm:w-[425px] max-h-[200px] overflow-y-auto"
          sideOffset={5}
        >
          {filteredCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => addCategory(category)}
              className="w-full text-left px-3 py-2 hover:bg-orange-50 rounded-md"
            >
              {category}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputCategoryPopover;
