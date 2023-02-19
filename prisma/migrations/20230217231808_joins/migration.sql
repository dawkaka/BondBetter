-- AddForeignKey
ALTER TABLE "CoupleAnswer" ADD CONSTRAINT "CoupleAnswer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "QuestionBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
