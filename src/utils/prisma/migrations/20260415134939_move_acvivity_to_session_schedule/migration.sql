/*
  Warnings:

  - You are about to drop the column `aktivitas` on the `detail_jadwal_training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "detail_jadwal_training" DROP COLUMN "aktivitas";

-- DropEnum
DROP TYPE "aktivitas";
