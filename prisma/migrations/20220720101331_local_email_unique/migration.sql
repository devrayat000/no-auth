/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `LocalUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LocalUser_email_key" ON "LocalUser"("email");
