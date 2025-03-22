"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import TipTap from "../../_components/tiptap";
import {
  addToast,
  Button,
  Chip,
  Input,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AvatarMenu } from "@/shared/components/avatar-menu";
import { useRouter } from "next/navigation";
import { User } from "@/model/user";
import { updateRecipeActions } from "./_actions/edit-recipe";
import { Recipe } from "@/model/recipe";

export const EditRecipe = ({
  currentUser,
  categories,
  recipe,
}: {
  currentUser: User;
  categories: string[];
  recipe: Recipe;
}) => {
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const stepToCook = useRef<string>(recipe.description);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    recipe.categories
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [ingredients, setIngredients] = useState<Array<string>>(
    recipe.ingredients
  );
  const handleContentChange = (content: string) => {
    stepToCook.current = content;
  };

  useEffect(() => {
    if (!headerRef.current) return;
    const header = headerRef.current;
    const onScroll = () => {
      if (window.scrollY > 0) {
        header.dataset.scrolled = "";
      } else {
        delete header.dataset.scrolled;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [headerRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ((event.target as Element).id !== "category-btn") {
        setIsCategoryOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onAddIngredients = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEvent = e.currentTarget;
    const form = new FormData(formEvent);
    const ingredient = form.get("ingredient")?.toString();

    if (!ingredient) return;

    setIngredients([...ingredients, ingredient]);
    formEvent.reset();
  };

  const onDeleteIngredient = (name: string) => {
    const temp = ingredients.filter((e) => e !== name);
    setIngredients(temp);
  };

  const onClickCategory = (name: string) => {
    if (selectedCategories.includes(name)) return;
    if (selectedCategories.length >= 4) return;

    setSelectedCategories([...selectedCategories, name]);
    setIsCategoryOpen(false);
  };

  const onDeleteCategory = (name: string) => {
    const temp = selectedCategories.filter((e) => e !== name);
    setSelectedCategories(temp);
  };

  const onPublishContent = async (e: FormEvent<HTMLFormElement>) => {
    setDialogOpen(true);
    e.preventDefault();
    const formEvent = e.currentTarget;
    const formData = new FormData(formEvent);
    const maxImgSize = 500 * 1000; // max 500kb
    const image = formData.get("image") as File;
    if (image.size > maxImgSize) {
      addToast({
        title: "Failed create recipe",
        description: "max image size 500Kb",
        color: "danger",
      });
      return;
    }

    formData.append("id", `${recipe.id}`);
    formData.append("content", stepToCook.current);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("categories", JSON.stringify(selectedCategories));

    const result = await updateRecipeActions(formData);
    setDialogOpen(false);
    if (result.error) {
      addToast({
        title: "Failed yodate recipe",
        description: `${
          result.error || "please try again to update the recipe later"
        }`,
        color: "danger",
      });
      return;
    }

    router.back();
  };

  return (
    <div className="w-screen">
      <header
        ref={headerRef}
        className="flex flex-row justify-between sticky items-center top-0 w-full bg-white z-50 px-8 h-16 data-[scrolled]:shadow-md data-[scrolled]:bg-white transition-all"
      >
        <Link href={"/"}>
          <Image
            src={"/assets/foodpedia-logo.png"}
            alt="foodpedia"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex flex-row items-center gap-6">
          <div
            className="font-poppins text-sm text-gray-500 hover:text-black hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            Back to profile
          </div>
          <button
            className="font-poppins px-6 py-1 text-white bg-orange-200 hover:bg-orange-400 hover:cursor-pointer rounded-xl"
            form="recipe-form"
          >
            Save
          </button>
          <AvatarMenu name={currentUser.email} />
        </div>
      </header>
      <main className="grid grid-cols-2 w-2/3 mx-auto pt-6 pb-10 gap-4">
        <div className="flex flex-col">
          <form id="recipe-form" onSubmit={onPublishContent}>
            <Input
              name="title"
              label="Title"
              defaultValue={recipe.title}
              placeholder="Title: Baked BBQ Chicken Thighs"
              variant="bordered"
            />
            <Textarea
              label="Story"
              name="story"
              defaultValue={recipe.story || ""}
              placeholder="Share a little more about this dish. What or who inspired you to cook it? What makes it special to you? What's your favourite way to eat it?"
              className="mt-2"
              variant="bordered"
            />
            <Input
              name="image"
              label="Upload recipe photo"
              type="file"
              variant="bordered"
              className="mt-2"
              defaultValue={recipe.image || ""}
              accept="image/png, image/webp"
            />
            <div className="relative">
              <Input
                placeholder="Food category"
                variant="bordered"
                className="mt-2"
                onFocus={() => setIsCategoryOpen(true)}
                startContent={
                  <div className="flex flex-row gap-1 items-center">
                    {selectedCategories.map((e, idx) => (
                      <Chip
                        key={idx + 1}
                        onClose={() => onDeleteCategory(e)}
                        classNames={{
                          base: "bg-gray-200",
                        }}
                      >
                        {e}
                      </Chip>
                    ))}
                  </div>
                }
              />
              {isCategoryOpen && (
                <div className="absolute w-full left-0 right-0 mx-auto z-50 py-5 px-4 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="flex flex-col space-y-2">
                    <div className="font-poppins font-semibold text-sm">
                      Categories
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 items-center">
                      {categories.map((e, idx) => (
                        <button
                          key={idx + 1}
                          id="category-btn"
                          type="button"
                          className="px-3 py-1 border rounded-full text-xs hover:cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            onClickCategory(e);
                          }}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
          <form className="flex flex-col space-y-2" onSubmit={onAddIngredients}>
            <div className="flex flex-row items-center space-x-2 mt-2">
              <Input
                name="ingredient"
                placeholder="Your recipe ingredients"
                variant="bordered"
              />
              <Button color="warning" className="text-white" type="submit">
                Add
              </Button>
            </div>
            {ingredients.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl h-24 w-full flex p-2 justify-center items-center">
                <div className="font-poppins text-gray-500">
                  Empty Ingredients
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2 border-2 border-gray-300 rounded-xl p-2 min-h-24">
                {ingredients.map((e, idx) => {
                  return (
                    <div
                      key={idx + 1}
                      className="flex flex-row w-full h-fit justify-between space-x-3 p-2 rounded-lg hover:shadow-md hover:border hover:border-gray-100"
                    >
                      <div className="min-w-1 font-semibold">{`${
                        idx + 1
                      }.`}</div>
                      <div className="grow">{e}</div>
                      <Button
                        isIconOnly
                        aria-label="Delete"
                        size="sm"
                        color="danger"
                        onPress={() => {
                          onDeleteIngredient(e);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </div>
        <TipTap content={stepToCook.current} onChange={handleContentChange} />
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-6 rounded-lg shadow-lg w-60 gap-3 items-center">
              <h2 className="text-xl font-semibold">Saving Recipe</h2>
              <Spinner size="lg" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
