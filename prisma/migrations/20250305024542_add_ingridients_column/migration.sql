/*
  Warnings:

  - You are about to drop the column `categoryId` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_categoryId_fkey";

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "categoryId",
DROP COLUMN "tags",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "ingredients" TEXT[];

-- DropTable
DROP TABLE "tag";

-- CreateTable
CREATE TABLE "favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorite_userId_recipeId_idx" ON "favorite"("userId", "recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE INDEX "category_name_idx" ON "category"("name");

-- CreateIndex
CREATE INDEX "recipe_title_userId_categories_createdAt_idx" ON "recipe"("title", "userId", "categories", "createdAt");

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
