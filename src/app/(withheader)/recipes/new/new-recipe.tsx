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
import { createNewRecipe } from "@/actions/create-recipe";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingDialog from "@/components/ui/loading-dialog";
import Category from "@/models/category";

interface NewRecipePageProps {
  categories: Category[];
}

const NewRecipePage: React.FC<NewRecipePageProps> = ({ categories }) => {
  const maxImgSize = 500 * 1000; // max 500kb
  const router = useRouter();
  const ingredients = useRef<string[]>([]);
  const selectedCategories = useRef<string[]>([]);
  const contentGuide = useRef<string>("");
  const fileImage = useRef<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

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

    if (!contentGuide.current) {
      toast.error("Failed create recipe", {
        description: "You must provide how to cook",
        duration: 2000,
      });
      return;
    }

    formData.append("image", fileImage.current);
    formData.append("categories", JSON.stringify(selectedCategories.current));
    formData.append("ingredients", JSON.stringify(ingredients.current));
    formData.append("guide", contentGuide.current);

    setLoading(true);
    const result = await createNewRecipe(formData);
    setLoading(false);
    if (result instanceof Error) {
      toast.error("Failed create recipe", {
        description: result.message,
        duration: 2000,
      });
    } else {
      router.push(`/recipes/${result}`);
    }
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
            categories={categories}
            onCategorySelected={(v) => {
              selectedCategories.current = v;
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
          <Button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Create Recipe
          </Button>
        </div>
      </form>
      <LoadingDialog show={isLoading} />
    </div>
  );
};

export default NewRecipePage;
