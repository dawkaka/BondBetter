/*
  Warnings:

  - You are about to drop the column `lastAnswered` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" RENAME COLUMN "lastAnswered" TO "nextQuestionsTime";
