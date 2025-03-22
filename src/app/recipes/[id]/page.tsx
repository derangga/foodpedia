import { getUserById } from "@/shared/actions/get-user";
import { getDetailRecipeAction } from "../../../shared/actions/recipe";
import { authenticationStatus } from "@/shared/actions/authentication-status";
import { AppHeader } from "@/shared/components/app-header";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import DOMPurify from "isomorphic-dompurify";
import { Publisher } from "./_components/publisher";
import { CommentItem } from "./_components/comment-item";
import { CommentBox } from "./_components/comment-box";
import { imgURL } from "@/utils/image-url";
import { ImageClient } from "./_components/image-client";
import { ContentAnchor } from "./_components/content-anchor";
import { Recipe } from "@/model/recipe";
import { isFavoritedAction } from "@/shared/actions/favorite";
import { getCommentsAction } from "./_actions/comment";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const authStatus = await authenticationStatus();
  const recipe = await getDetailRecipeAction(Number(id));
  const comments = await getCommentsAction(recipe?.id);
  const currentUser = await getUserById(authStatus.userId);
  const isFavorited = await isFavoritedAction(authStatus.userId, recipe?.id);
  const favoriteCount = recipe?._count?.favorites;
  const commentCount = recipe?._count.comments;
  const sanitizeDescription = DOMPurify.sanitize(recipe?.description || "");
  const imgSrc = imgURL(`${recipe?.id}/${recipe?.image}`);

  return (
    <>
      <AppHeader auth={authStatus} avatarName={currentUser?.name || ""} />
      <main className="max-w-3xl m-auto p-8 gap-8">
        <section className="relative rounded-xl w-full h-96 overflow-hidden my-8">
          {/* Due to issue render on SSR use client side instead */}
          <ImageClient
            src={imgSrc}
            alt={recipe?.title}
            className="object-cover w-full h-full"
          />
        </section>
        <section className="w-full">
          <h1 className="font-poppins font-bold text-4xl">{recipe?.title}</h1>
          <Publisher
            className="mt-6"
            name={recipe?.user.name}
            createdAt={recipe?.createdAt}
          />
          <ContentAnchor
            isOwner={recipe?.userId === currentUser?.id}
            favoriteCount={favoriteCount}
            commentCount={commentCount}
            isFavorited={isFavorited}
            recipe={recipe as Recipe}
          />
          <div>{recipe?.story}</div>
          <div className="my-4">
            <div className="font-poppins font-semibold">Categories :</div>
            <div className="font-bold text-orange-400">
              {recipe?.categories.join()}
            </div>
          </div>
          <Card radius="md" className="p-7">
            <CardHeader className="p-0">
              <h2 className="font-poppins text-xl font-semibold">
                Ingredients
              </h2>
            </CardHeader>
            <CardBody className="p-0 mt-4">
              <ul className="list-disc list-inside space-y-2">
                {recipe?.ingredients.map((e, idx) => (
                  <li key={idx + 1}>{e}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <article className="prose mt-8 space-y-4">
            <h2 className="font-poppins text-2xl font-semibold">
              Cooking <span className="text-orange-400">Instructions</span>
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: sanitizeDescription }}
              className="marker:text-black"
            />
          </article>
          <Divider className="my-8" />
        </section>
        <section>
          <div className="font-poppins font-semibold text-2xl">Comments</div>
          {authStatus.isAuthenticate && recipe?.userId !== currentUser?.id && (
            <CommentBox
              userId={currentUser?.id}
              recipeId={recipe?.id}
              className="mt-4"
            />
          )}
          {comments.map((e, idx) => (
            <CommentItem
              key={idx + 1}
              className="mt-3"
              commentId={e.id}
              recipeId={e.recipeId}
              name={e.user.name}
              comment={e.comment}
              commentdAt={e.createdAt}
              showMenu={currentUser?.id === e.userId}
            />
          ))}
        </section>
      </main>
    </>
  );
}
