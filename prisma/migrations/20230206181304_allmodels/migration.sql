-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "highestStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastAnswered" TIMESTAMP(3),
ADD COLUMN     "partnerID" TEXT,
ADD COLUMN     "timeOfLastAnswered" TIMESTAMP(3),
ALTER COLUMN "currentLinkLabel" SET DATA TYPE VARCHAR(69);

-- CreateTable
CREATE TABLE "Couple" (
    "id" SERIAL NOT NULL,
    "initiated" TEXT NOT NULL,
    "accepted" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoupleAnswer" (
    "id" SERIAL NOT NULL,
    "coupleID" INTEGER NOT NULL,
    "questionID" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "CoupleAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionBank" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(256) NOT NULL,
    "options" JSONB NOT NULL,
    "hasInput" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionBank_pkey" PRIMARY KEY ("id")
);
