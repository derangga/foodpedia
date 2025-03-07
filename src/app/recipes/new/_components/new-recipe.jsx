"use client";
import { useEffect, useRef, useState } from "react";
import TipTap from "../../_components/tiptap";
import { addToast, Button, Chip, Input } from "@heroui/react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AvatarMenu } from "@/shared/components/avatar-menu";
import { createRecipeActions } from "../_actions/recipe";
import { redirect } from "next/navigation";

export const NewRecipe = ({ currentUser, categories }) => {
  const headerRef = useRef(null);
  const [content, setContent] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [ingridients, setIngridients] = useState([]);
  const handleContentChange = (content) => {
    setContent(content);
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
    function handleClickOutside(event) {
      if (event.target.id !== "category-btn") {
        setIsCategoryOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onCornerMenuAction = (key) => {};

  const onAddIngridients = (e) => {
    e.preventDefault();

    const formEvent = e.currentTarget;
    const form = new FormData(formEvent);
    const ingridient = form.get("ingridient")?.toString();
    console.log(`add ingridient ${ingridient}`);
    if (!ingridient) return;

    setIngridients([...ingridients, ingridient]);
    formEvent.reset();
  };

  const onDeleteIngridient = (name) => {
    const temp = ingridients.filter((e) => e !== name);
    setIngridients(temp);
  };

  const onClickCategory = (name) => {
    if (selectedCategories.includes(name)) return;
    if (selectedCategories.length >= 4) return;

    setSelectedCategories([...selectedCategories, name]);
    setIsCategoryOpen(false);
  };

  const onDeleteCategory = (name) => {
    const temp = selectedCategories.filter((e) => e !== name);
    setSelectedCategories(temp);
  };

  const onPublishContent = async (e) => {
    e.preventDefault();
    const formEvent = e.currentTarget;
    const formData = new FormData(formEvent);
    formData.append("content", content);
    formData.append("ingridients", ingridients);
    formData.append("categories", selectedCategories);

    const recipe = await createRecipeActions(formData);
    if (recipe?.error) {
      addToast({
        title: "Failed create recipe",
        description: `${
          recipe?.error || "please try again to insert the recipe later"
        }`,
        color: "danger",
      });

      return;
    }

    redirect("/recipes");
  };

  return (
    <div className="w-screen">
      <header
        ref={headerRef}
        className="flex sticky top-0 w-full bg-white z-50 px-6 h-16 items-center data-[scrolled]:shadow-md data-[scrolled]:bg-white transition-all"
      >
        <div className="flex flex-row w-[60rem] mx-auto justify-between items-center">
          <Link href={"/"}>
            <Image
              src={"/assets/foodpedia-logo.png"}
              alt="foodpedia"
              width={100}
              height={100}
            />
          </Link>
          <div className="flex flex-row items-center space-x-4">
            <button
              className="font-poppins px-6 py-1 text-white bg-orange-200 hover:bg-orange-400 hover:cursor-pointer rounded-xl"
              form="recipe-form"
            >
              Publish
            </button>
            <AvatarMenu
              name={currentUser.email}
              onCornerMenuAction={onCornerMenuAction}
            />
          </div>
        </div>
      </header>
      <div className="flex flex-col w-[32rem] mx-auto pb-10">
        <form id="recipe-form" onSubmit={onPublishContent}>
          <Input
            name="title"
            label="Recipe title"
            placeholder="Enter your recipe name"
            variant="bordered"
            className="mt-2"
          />
          <Input
            name="image"
            label="Select image"
            type="file"
            placeholder="A URL of your image food"
            variant="bordered"
            className="mt-2"
          />
          <div className="relative">
            <Input
              placeholder="Add category"
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
        <form className="flex flex-col space-y-2" onSubmit={onAddIngridients}>
          <div className="flex flex-row items-center space-x-2 mt-2">
            <Input
              name="ingridient"
              placeholder="Add Ingridient"
              variant="bordered"
            />
            <Button color="warning" className="text-white" type="submit">
              Add
            </Button>
          </div>
          {ingridients.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl h-24 w-full flex p-2 justify-center items-center">
              <div className="font-poppins text-gray-500">
                Empty Ingridients
              </div>
            </div>
          ) : (
            <div className="w-full grid grid-cols-2 gap-2 border-2 border-gray-300 rounded-xl p-2 min-h-24">
              {ingridients.map((e, idx) => {
                return (
                  <div
                    key={idx + 1}
                    className="flex flex-row w-full h-fit items-center justify-between space-x-3 p-2 rounded-lg hover:shadow-md hover:border hover:border-gray-100"
                  >
                    <div>{`${idx + 1}. ${e}`}</div>
                    <Button
                      isIconOnly
                      aria-label="Delete"
                      size="sm"
                      onPress={() => {
                        onDeleteIngridient(e);
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
        <TipTap
          content={content}
          onChange={handleContentChange}
          className="mt-2"
        />
      </div>
    </div>
  );
};
