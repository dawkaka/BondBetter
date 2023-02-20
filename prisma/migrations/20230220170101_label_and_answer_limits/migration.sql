/*
  Warnings:

  - You are about to alter the column `currentLinkLabel` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(69)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "CustomAnswer" ALTER COLUMN "question" SET DATA TYPE VARCHAR(280),
ALTER COLUMN "answer" SET DATA TYPE VARCHAR(280);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "currentLinkLabel" SET DATA TYPE VARCHAR(50);
