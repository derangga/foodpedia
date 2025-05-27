import React, { useState } from "react";
import { Filter, X, Search } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Checkbox } from "../checkbox";
import { cn } from "@/lib/utils";

interface PopoverFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const PopoverFilter: React.FC<PopoverFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    onCategoryChange(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  const clearFilters = () => {
    onCategoryChange([]);
    setSearchQuery("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-4 py-2 flex items-center gap-2 rounded-lg border border-gray-300 hover:bg-gray-50 relative">
          <Filter className="h-5 w-5" />
          Filter
          {selectedCategories.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCategories.length}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="bg-white rounded-lg shadow-lg p-4 w-64 border-gray-300"
        sideOffset={5}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Categories</h3>
          {selectedCategories.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-orange-500 hover:text-orange-600"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {filteredCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                className={cn(
                  "h-4 w-4 rounded border border-gray-300",
                  "flex items-center justify-center",
                  selectedCategories.includes(category) &&
                    "data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:text-white"
                )}
              />
              <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverFilter;
