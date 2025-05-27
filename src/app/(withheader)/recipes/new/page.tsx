"use client";
import React, { FormEvent, useRef, useState } from "react";
import { X } from "lucide-react";
import TipTap from "@/components/ui/recipes/tiptap";
import InputCategoryPopover from "@/components/ui/recipes/input-category-popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputIngredients from "@/components/ui/recipes/input-ingredients";
import { toast } from "sonner";

const CATEGORIES = [
  "Desserts",
  "Chicken",
  "Beef",
  "Vegetarian",
  "Seafood",
  "Pasta",
  "Breakfast",
  "Soups",
  "Salads",
  "Snacks",
];

const NewRecipe: React.FC = () => {
  const maxImgSize = 500 * 1000; // max 500kb
  const ingredients = useRef<string[]>([]);
  const categories = useRef<string[]>([]);
  const contentGuide = useRef<string>("");
  const fileImage = useRef<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileImage.current = e.target.files?.[0];
    if (fileImage.current) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(fileImage.current);
    }
  };

  const onEditorChange = (content: string) => {
    contentGuide.current = content;
  };

  const onPublishContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!fileImage.current) {
      toast.error("Failed create recipe", {
        description: "No image choosen",
        duration: 2000,
      });
      return;
    } else if (fileImage.current.size > maxImgSize) {
      toast.error("Failed create recipe", {
        description: "Max image size 500Kb",
        duration: 2000,
      });
      return;
    }

    formData.append("image", fileImage.current);
    formData.append("categories", JSON.stringify(categories));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("guide", contentGuide.current);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Create New Recipe
      </h1>

      <form className="space-y-6" onSubmit={onPublishContent}>
        {/* Title */}
        <div>
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Recipe Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter recipe title"
          />
        </div>

        {/* Story */}
        <div>
          <Label
            htmlFor="story"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Story
          </Label>
          <Textarea
            id="story"
            name="story"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Tell us the story behind this recipe"
          />
        </div>

        {/* Categories */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </Label>
          <InputCategoryPopover
            categories={CATEGORIES}
            onCategorySelected={(v) => {
              categories.current = v;
            }}
          />
        </div>

        {/* Image Upload */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Image
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="mx-auto h-32 w-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                    }}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex text-sm text-gray-600">
                    <Label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                    >
                      <span>Upload a file</span>
                      <Input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients
          </Label>
          <InputIngredients
            onItemsChange={(v) => {
              ingredients.current = v;
            }}
          />
        </div>

        {/* Recipe Guide */}
        <div>
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Guide
          </Label>
          <TipTap onChange={onEditorChange} />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRecipe;
