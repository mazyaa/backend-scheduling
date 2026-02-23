-- DropForeignKey
ALTER TABLE "detail_jadwal_training" DROP CONSTRAINT "detail_jadwal_training_jadwal_training_id_fkey";

-- DropForeignKey
ALTER TABLE "jadwal_training" DROP CONSTRAINT "jadwal_training_training_id_fkey";

-- DropForeignKey
ALTER TABLE "jadwal_training" DROP CONSTRAINT "jadwal_training_user_id_fkey";

-- DropForeignKey
ALTER TABLE "materi_training" DROP CONSTRAINT "materi_training_detail_jadwal_training_id_fkey";

-- DropForeignKey
ALTER TABLE "materi_training" DROP CONSTRAINT "materi_training_diupload_oleh_fkey";

-- DropForeignKey
ALTER TABLE "penilaian" DROP CONSTRAINT "penilaian_jadwal_training_id_fkey";

-- DropForeignKey
ALTER TABLE "penilaian" DROP CONSTRAINT "penilaian_user_id_fkey";

-- DropForeignKey
ALTER TABLE "peserta_training" DROP CONSTRAINT "peserta_training_jadwal_training_id_fkey";

-- DropForeignKey
ALTER TABLE "peserta_training" DROP CONSTRAINT "peserta_training_user_id_fkey";

-- DropForeignKey
ALTER TABLE "profil_peserta" DROP CONSTRAINT "profil_peserta_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sertifikat" DROP CONSTRAINT "sertifikat_jadwal_training_id_fkey";

-- DropForeignKey
ALTER TABLE "sertifikat" DROP CONSTRAINT "sertifikat_user_id_fkey";

-- AddForeignKey
ALTER TABLE "jadwal_training" ADD CONSTRAINT "jadwal_training_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_training" ADD CONSTRAINT "jadwal_training_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_jadwal_training" ADD CONSTRAINT "detail_jadwal_training_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil_peserta" ADD CONSTRAINT "profil_peserta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peserta_training" ADD CONSTRAINT "peserta_training_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peserta_training" ADD CONSTRAINT "peserta_training_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materi_training" ADD CONSTRAINT "materi_training_detail_jadwal_training_id_fkey" FOREIGN KEY ("detail_jadwal_training_id") REFERENCES "detail_jadwal_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materi_training" ADD CONSTRAINT "materi_training_diupload_oleh_fkey" FOREIGN KEY ("diupload_oleh") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaian" ADD CONSTRAINT "penilaian_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penilaian" ADD CONSTRAINT "penilaian_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_jadwal_training_id_fkey" FOREIGN KEY ("jadwal_training_id") REFERENCES "jadwal_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
