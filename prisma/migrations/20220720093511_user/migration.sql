-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('local', 'google', 'twitter', 'facebook', 'discord');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'local',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
