/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentLinkID" TEXT,
ADD COLUMN     "currentLinkLabel" VARCHAR(50),
ADD COLUMN     "questions" JSONB,
ADD COLUMN     "questionsLinks" JSONB,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Question";

-- DropEnum
DROP TYPE "QuestionType";

-- CreateTable
CREATE TABLE "CustomAnswer" (
    "id" SERIAL NOT NULL,
    "questionLinkID" TEXT NOT NULL,
    "question" VARCHAR(256) NOT NULL,
    "answer" VARCHAR(256) NOT NULL,
    "questionBy" TEXT NOT NULL,

    CONSTRAINT "CustomAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomAnswer" ADD CONSTRAINT "CustomAnswer_questionBy_fkey" FOREIGN KEY ("questionBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
