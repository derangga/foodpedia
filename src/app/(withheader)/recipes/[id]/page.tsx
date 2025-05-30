import React from "react";
import { notFound } from "next/navigation";
import { Heart, MessageCircle, User } from "lucide-react";
import { format } from "date-fns";
import { getDetailRecipe } from "@/actions/recipe";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { imgURL } from "@/utils/image-url";

export default async function DetailRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getDetailRecipe(parseInt(id));
  if (result.error) {
    notFound();
  }

  const [recipe] = result.data;
  const sanitizeDescription = DOMPurify.sanitize(recipe.guide);
  const imgSrc = imgURL(`${recipe.id}/${recipe.image}`);
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Recipe Image */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8">
        <Image
          src={imgSrc}
          alt={recipe.title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{recipe.title}</h1>

      {/* User Section */}
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={recipe.userImage || ""}
          alt={recipe.userName}
          width={100}
          height={100}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{recipe.userName}</h3>
          <p className="text-sm text-gray-500">
            {format(recipe.createdAt || new Date(), "MMMM d, yyyy")}
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold mb-4">Story</h2>
        <p className="text-gray-700">{recipe.story}</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {recipe.categories.map((category) => (
          <span
            key={category}
            className="px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Ingredients */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <article className="prose max-w-none mb-8">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeDescription }}
          className="marker:text-black"
        />
      </article>

      {/* Engagement Section */}
      <div className="flex items-center gap-6 mb-12">
        <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
          <Heart className="h-6 w-6" />
          <span>10</span>
        </button>
        <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
          <MessageCircle className="h-6 w-6" />
          <span>10</span>
        </button>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>

        {/* Comment Input */}
        <div className="flex gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-gray-500" />
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Add a comment..."
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows={3}
            />
            <button className="mt-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Post Comment
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {[
            {
              id: 1,
              user: {
                name: "Sarah Chen",
                avatar:
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
              },
              content:
                "Made this last weekend and it was absolutely delicious! The instructions were very clear and easy to follow.",
              timestamp: new Date("2024-03-15T10:30:00"),
            },
            {
              id: 2,
              user: {
                name: "David Wilson",
                avatar:
                  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
              },
              content:
                "Great recipe! I added a bit more coffee liqueur and it turned out perfect. Thanks for sharing!",
              timestamp: new Date("2024-03-14T15:45:00"),
            },
          ].map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">
                    {comment.user.name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {format(comment.timestamp, "MMM d, yyyy")}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
