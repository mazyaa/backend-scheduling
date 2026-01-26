/*
  Warnings:

  - You are about to drop the column `user_id` on the `jadwal_training` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "jadwal_training" DROP CONSTRAINT "jadwal_training_user_id_fkey";

-- AlterTable
ALTER TABLE "jadwal_training" DROP COLUMN "user_id";
