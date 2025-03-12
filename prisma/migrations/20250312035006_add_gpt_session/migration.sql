/*
  Warnings:

  - Added the required column `recipeOwnerId` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "chatSender" AS ENUM ('USER', 'GPT');

-- AlterTable
ALTER TABLE "favorite" ADD COLUMN     "recipeOwnerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "gptSession" (
    "id" SERIAL NOT NULL,
    "session" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "gptSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "sender" "chatSender" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gptSession_session_key" ON "gptSession"("session");

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_recipeOwnerId_fkey" FOREIGN KEY ("recipeOwnerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gptSession" ADD CONSTRAINT "gptSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "gptSession"("session") ON DELETE RESTRICT ON UPDATE CASCADE;
