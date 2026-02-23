/*
  Warnings:

  - You are about to drop the column `training_id` on the `detail_jadwal_training` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "detail_jadwal_training" DROP CONSTRAINT "detail_jadwal_training_training_id_fkey";

-- AlterTable
ALTER TABLE "detail_jadwal_training" DROP COLUMN "training_id";
