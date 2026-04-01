/*
  Warnings:

  - You are about to drop the column `used` on the `PasswordReset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "used",
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false;
