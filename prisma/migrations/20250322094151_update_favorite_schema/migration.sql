/*
  Warnings:

  - Added the required column `recipeOwnerId` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "favorite_userId_recipeId_idx";

-- AlterTable
ALTER TABLE "favorite" ADD COLUMN     "recipeOwnerId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "favorite_userId_recipeId_recipeOwnerId_idx" ON "favorite"("userId", "recipeId", "recipeOwnerId");

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_recipeOwnerId_fkey" FOREIGN KEY ("recipeOwnerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
