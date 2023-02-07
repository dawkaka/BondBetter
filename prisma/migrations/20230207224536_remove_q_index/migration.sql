/*
  Warnings:

  - You are about to drop the column `questionIndex` on the `CoupleAnswer` table. All the data in the column will be lost.
  - Changed the type of `questionID` on the `CoupleAnswer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CoupleAnswer" DROP COLUMN "questionIndex",
DROP COLUMN "questionID",
ADD COLUMN     "questionID" INTEGER NOT NULL;
