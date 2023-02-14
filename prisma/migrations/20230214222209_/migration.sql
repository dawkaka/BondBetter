/*
  Warnings:

  - A unique constraint covering the columns `[id,userID]` on the table `CoupleAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoupleAnswer_id_userID_key" ON "CoupleAnswer"("id", "userID");
