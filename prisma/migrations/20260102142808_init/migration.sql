-- CreateEnum
CREATE TYPE "role_user" AS ENUM ('admin', 'peserta', 'instruktur', 'asesor', 'direktur');

-- CreateEnum
CREATE TYPE "aktivitas" AS ENUM ('materi', 'uji_kompetensi');

-- CreateEnum
CREATE TYPE "status_kompetensi" AS ENUM ('kompeten', 'belum_kompeten');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "no_wa" VARCHAR(20) NOT NULL,
    "role" "role_user" NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "keahlian" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training" (
    "id" TEXT NOT NULL,
    "nama_training" VARCHAR(150) NOT NULL,
    "description" TEXT,

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwal_training" (
    "id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "meeting_link" TEXT NOT NULL,
    "batch" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jadwal_training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_jadwal_training" (
    "id" TEXT NOT NULL,
    "jadwal_training_id" TEXT NOT NULL,
    "hari" TIMESTAMP(3) NOT NULL,
    "hari_ke" INTEGER NOT NULL,
    "aktivitas" "aktivitas",
    "file_materi" TEXT,
    "instruktur_id" TEXT,
    "asesor_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detail_jadwal_training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profil_peserta" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "instansi" VARCHAR(200) NOT NULL,
    "file_cv" TEXT NOT NULL,
    "file_ijazah" TEXT NOT NULL,
    "file_surat_rekomendasi" TEXT,
    "file_ktp" TEXT NOT NULL,
    "file_foto" TEXT,
    "file_bukti_bayar" TEXT,
    "file_bukti_follow" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profil_peserta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peserta_training" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "jadwal_training_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "peserta_training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materi_training" (
    "id" TEXT NOT NULL,
    "detail_jadwal_training_id" TEXT NOT NULL,
    "judul" VARCHAR(200) NOT NULL,
    "file_materi" TEXT,
    "diupload_oleh" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "materi_training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penilaian" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "jadwal_training_id" TEXT NOT NULL,
    "status_kompetensi" "status_kompetensi" NOT NULL,
    "catatan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "penilaian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sertifikat" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "jadwal_training_id" TEXT NOT NULL,
    "nomor_sertifikat" VARCHAR(150) NOT NULL,
    "file_sertifikat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sertifikat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_no_wa_key" ON "users"("no_wa");

-- CreateIndex
CREATE UNIQUE INDEX "training_nama_training_key" ON "training"("nama_training");

-- CreateIndex
CREATE UNIQUE INDEX "profil_peserta_user_id_key" ON "profil_peserta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "peserta_training_user_id_jadwal_training_id_key" ON "peserta_training"("user_id", "jadwal_training_id");

-- CreateIndex
CREATE UNIQUE INDEX "penilaian_user_id_jadwal_training_id_key" ON "penilaian"("user_id", "jadwal_training_id");

-- CreateIndex
CREATE UNIQUE INDEX "sertifikat_nomor_sertifikat_key" ON "sertifikat"("nomor_sertifikat");

-- AddForeignKey
ALTER TABLE "jadwal_training" ADD CONSTRAINT "jadwal_training_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_training" ADD CONSTRAINT "jadwal_training_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_jadwal_training" ADD CONSTRAINT "detail_jadwal_training_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_jadwal_training" ADD CONSTRAINT "detail_jadwal_training_instruktur_id_fkey" FOREIGN KEY ("instruktur_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_jadwal_training" ADD CONSTRAINT "detail_jadwal_training_asesor_id_fkey" FOREIGN KEY ("asesor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil_peserta" ADD CONSTRAINT "profil_peserta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peserta_training" ADD CONSTRAINT "peserta_training_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peserta_training" ADD CONSTRAINT "peserta_training_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materi_training" ADD CONSTRAINT "materi_training_detail_jadwal_training_id_fkey" FOREIGN KEY ("detail_jadwal_training_id") REFERENCES "detail_jadwal_training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materi_training" ADD CONSTRAINT "materi_training_diupload_oleh_fkey" FOREIGN KEY ("diupload_oleh") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaian" ADD CONSTRAINT "penilaian_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaian" ADD CONSTRAINT "penilaian_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
