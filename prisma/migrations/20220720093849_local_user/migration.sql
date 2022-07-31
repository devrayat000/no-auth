/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "updatedAt",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "LocalUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalUser_pkey" PRIMARY KEY ("id")
);
