/*
  Warnings:

  - You are about to drop the column `file_materi` on the `detail_jadwal_training` table. All the data in the column will be lost.
  - Added the required column `training_id` to the `detail_jadwal_training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detail_jadwal_training" DROP COLUMN "file_materi",
ADD COLUMN     "training_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "detail_jadwal_training" ADD CONSTRAINT "detail_jadwal_training_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
