/*
  Warnings:

  - You are about to drop the column `hasInput` on the `QuestionBank` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `QuestionBank` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomAnswer" DROP CONSTRAINT "CustomAnswer_questionBy_fkey";

-- AlterTable
ALTER TABLE "CustomAnswer" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "QuestionBank" DROP COLUMN "hasInput",
DROP COLUMN "options";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coupleID" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coupleID_fkey" FOREIGN KEY ("coupleID") REFERENCES "Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;
