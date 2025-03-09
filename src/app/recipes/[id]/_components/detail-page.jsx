"use client";
import { AppHeader } from "@/shared/components/app-header";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { Publisher } from "./publisher";
import { CommentItem } from "./comment-item";
import { CommentBox } from "./comment-box";
import { IMG_URL } from "@/utils/image-url";

export const DetailPage = ({ currentUser, recipe }) => {
  const { favorite } = recipe._count;
  const sanitizeDescription = DOMPurify.sanitize(recipe.description);
  const imgURL = `${IMG_URL}/${recipe.id}/${recipe.image}`;
  console.log(imgURL);
  const onCornerMenuAction = async (key) => {};
  return (
    <>
      <AppHeader
        isLogin={true}
        avatarName={currentUser.email}
        onCornerMenuAction={onCornerMenuAction}
      />
      <main className="max-w-3xl m-auto p-8 gap-8">
        <section className="relative rounded-xl w-full h-96 overflow-hidden my-8">
          <Image
            src={imgURL}
            fill
            style={{ objectFit: "cover" }}
            alt={recipe.title}
          />
        </section>
        <section className="w-full">
          <h1 className="font-poppins font-bold text-4xl">{recipe.title}</h1>
          <Publisher
            className="mt-6"
            name={recipe.user.name}
            createdAt={recipe.createdAt}
          />
          <div className="flex flex-row border-y py-4 my-6 px-4 gap-4">
            <div className="flex gap-2 items-center hover:cursor-pointer">
              <Heart color="#6b7280" strokeWidth={1} size={22} />
              <div className="font-poppins text-gray-400 hover:text-gray-500 text-sm">
                {favorite}
              </div>
            </div>
            <div className="flex gap-2 items-center hover:cursor-pointer">
              <MessageCircle color="#6b7280" strokeWidth={1} size={22} />
              <div className="font-poppins text-gray-400 hover:text-gray-500 text-sm">
                100
              </div>
            </div>
            <div className="grow" />
            <Share2
              color="#6b7280"
              strokeWidth={1}
              size={22}
              className="hover:cursor-pointer"
            />
          </div>
          <div>{recipe.story}</div>
          <div className="my-4">
            <div className="font-poppins font-semibold">Categories :</div>
            <p className="font-bold text-orange-400">
              {recipe.categories.join()}
            </p>
          </div>
          <Card radius="md" className="p-7">
            <CardHeader className="p-0">
              <h2 className="font-poppins text-xl font-semibold">
                Ingredients
              </h2>
            </CardHeader>
            <CardBody className="p-0 mt-4">
              <ul className="list-disc list-inside space-y-2">
                {recipe.ingridients.map((e, idx) => (
                  <li key={idx + 1}>{e}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <article className="prose mt-8 space-y-4">
            <h2 className="font-poppins text-2xl font-semibold">
              Cooking <span className="text-orange-400">Instructions</span>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizeDescription }} />
          </article>
          <Divider className="my-8" />
        </section>
        <section>
          <div className="font-poppins font-semibold text-2xl">Comments</div>
          <CommentBox className="mt-4" />
          <CommentItem className="mt-3" />
        </section>
      </main>
    </>
  );
};
