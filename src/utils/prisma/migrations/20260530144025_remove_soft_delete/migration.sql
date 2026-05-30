/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `materi_training` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `penilaian` table. All the data in the column will be lost.
  - You are about to drop the column `catatan` on the `revisi_file` table. All the data in the column will be lost.
  - You are about to drop the column `file_revisi` on the `revisi_file` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `revisi_file` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `sertifikat` table. All the data in the column will be lost.
  - You are about to drop the column `jadwal_training_id` on the `sertifikat` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sertifikat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[penilaian_id]` on the table `revisi_file` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `materi_training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `penilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penilaian_id` to the `revisi_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_sertifikat` to the `sertifikat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penilaian_id` to the `sertifikat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sertifikat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "revisi_file" DROP CONSTRAINT "revisi_file_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sertifikat" DROP CONSTRAINT "sertifikat_jadwal_training_id_fkey";

-- DropForeignKey
ALTER TABLE "sertifikat" DROP CONSTRAINT "sertifikat_user_id_fkey";

-- AlterTable
ALTER TABLE "materi_training" DROP COLUMN "deleted_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "penilaian" DROP COLUMN "deleted_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "revisi_file" DROP COLUMN "catatan",
DROP COLUMN "file_revisi",
DROP COLUMN "user_id",
ADD COLUMN     "file_revisi_admin" TEXT,
ADD COLUMN     "file_revisi_peserta" TEXT,
ADD COLUMN     "penilaian_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sertifikat" DROP COLUMN "deleted_at",
DROP COLUMN "jadwal_training_id",
DROP COLUMN "user_id",
ADD COLUMN     "nama_sertifikat" VARCHAR(200) NOT NULL,
ADD COLUMN     "penilaian_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "revisi_file_penilaian_id_key" ON "revisi_file"("penilaian_id");

-- CreateIndex
CREATE INDEX "revisi_file_status_idx" ON "revisi_file"("status");

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_penilaian_id_fkey" FOREIGN KEY ("penilaian_id") REFERENCES "penilaian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisi_file" ADD CONSTRAINT "revisi_file_penilaian_id_fkey" FOREIGN KEY ("penilaian_id") REFERENCES "penilaian"("id") ON DELETE CASCADE ON UPDATE CASCADE;
