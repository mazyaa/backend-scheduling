/*
  Warnings:

  - You are about to drop the column `nama_sertifikat` on the `sertifikat` table. All the data in the column will be lost.
  - Added the required column `materi_training_id` to the `sertifikat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sertifikat" DROP COLUMN "nama_sertifikat",
ADD COLUMN     "materi_training_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_materi_training_id_fkey" FOREIGN KEY ("materi_training_id") REFERENCES "materi_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
