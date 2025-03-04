"use client";
import { useEffect, useRef, useState } from "react";
import TipTap from "../../_components/tiptap";
import {
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Trash2, SquareUserRound, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const NewRecipe = ({ currentUser }) => {
  const ref = useRef(null);
  const [content, setContent] = useState("");
  const foodCategory = ["Chinese Food", "Indonesian Food", "Thai Food"];

  const [ingridients, setIngridients] = useState([]);
  const handleContentChange = (content) => {
    setContent(content);
  };

  useEffect(() => {
    if (!ref.current) return;
    const header = ref.current;
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
  }, []);

  const onCornerMenuAction = (key) => {};

  const avatar = () => {
    return currentUser.email.charAt(0).toUpperCase();
  };

  const onAddIngridients = (e) => {
    e.preventDefault();
    const formEvent = e.currentTarget;
    const form = new FormData(formEvent);
    const ingridient = form.get("ingridient")?.toString();

    if (!ingridient) return;

    setIngridients([...ingridients, ingridient]);
    formEvent.reset();
  };

  const onDeleteIngridient = (position) => {
    if (position > -1) {
      const temp = ingridients.splice(position, 1);
      console.log(temp);
      setContent(temp);
    }
  };

  const onPublishContent = async (e) => {
    e.preventDefault();
    console.log("submit cuy");
  };

  return (
    <div className="w-screen">
      <header
        ref={ref}
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
              form="content"
            >
              Publish
            </button>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex justify-center items-center w-10 h-10 bg-black rounded-full hover:cursor-pointer">
                  <div className="text-white font-mono font-semibold">
                    {avatar()}
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                onAction={(key) => onCornerMenuAction(key)}
              >
                <DropdownItem key="profile">
                  <div className="flex flex-row space-x-4 items-center">
                    <SquareUserRound size={20} />
                    <div>Profile</div>
                  </div>
                </DropdownItem>
                <DropdownItem key="setting">
                  <div className="flex flex-row space-x-4 items-center">
                    <Settings size={20} />
                    <div>Settings</div>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="sign-out"
                  className="text-danger"
                  color="danger"
                >
                  <div className="flex flex-row space-x-4 items-center">
                    <LogOut size={20} />
                    <div>Sign out</div>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </header>
      <div className="flex flex-col w-[32rem] mx-auto pb-10">
        <form id="content" onSubmit={onPublishContent}>
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
          <Select
            variant="bordered"
            name="category"
            label="Select category"
            className="mt-2"
          >
            {foodCategory.map((e) => (
              <SelectItem key={e.toLowerCase()}>{e}</SelectItem>
            ))}
          </Select>
          <Input
            name="tags"
            placeholder="Add tag"
            variant="bordered"
            className="mt-2"
            startContent={
              <div className="flex flex-row space-y-1">
                <Chip
                  onClose={() => console.log("close")}
                  classNames={{
                    base: "bg-gray-200",
                  }}
                >
                  Ayam
                </Chip>
              </div>
            }
          />
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
                        onDeleteIngridient(idx);
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
