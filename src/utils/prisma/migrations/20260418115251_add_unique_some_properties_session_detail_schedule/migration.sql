/*
  Warnings:

  - A unique constraint covering the columns `[detail_jadwal_training_id,jam_mulai,jam_selesai]` on the table `sesi_jadwal_training` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sesi_jadwal_training_detail_jadwal_training_id_jam_mulai_ja_key" ON "sesi_jadwal_training"("detail_jadwal_training_id", "jam_mulai", "jam_selesai");
