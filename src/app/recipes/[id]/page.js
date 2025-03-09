import { getUserBySessionAction } from "@/shared/actions/get-user";
import { getDetailRecipeAction } from "./_actions/recipe-detail";
import { authenticationStatus } from "@/shared/actions/authentication-status";
import { AppHeader } from "@/shared/components/app-header";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { Publisher } from "./_components/publisher";
import { CommentItem } from "./_components/comment-item";
import { CommentBox } from "./_components/comment-box";
import { imgURL } from "@/utils/image-url";
import { ImageHeader } from "./_components/image-header";

export default async function Page({ params }) {
  const { id } = await params;
  const authStatus = await authenticationStatus();
  const recipe = await getDetailRecipeAction(Number(id));
  const { favorite } = recipe._count;
  const currentUser = await getUserBySessionAction(authStatus?.sessionId);
  const sanitizeDescription = DOMPurify.sanitize(recipe.description);
  const imgSrc = imgURL(`${recipe.id}/${recipe.image}`);

  return (
    <>
      <AppHeader authStatus={authStatus} avatarName={currentUser?.name || ""} />
      <main className="max-w-3xl m-auto p-8 gap-8">
        <section className="relative rounded-xl w-full h-96 overflow-hidden my-8">
          {/* Due to issue render on SSR use client side instead */}
          <ImageHeader
            src={imgSrc}
            alt={recipe.title}
            className="object-cover w-full h-full"
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
          {authStatus.isAuthenticate && <CommentBox className="mt-4" />}
          <CommentItem className="mt-3" />
        </section>
      </main>
    </>
  );
}
