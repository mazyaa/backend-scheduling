-- CreateIndex
CREATE INDEX "materi_training_judul_idx" ON "materi_training"("judul");

-- CreateIndex
CREATE INDEX "sertifikat_nomor_sertifikat_idx" ON "sertifikat"("nomor_sertifikat");

-- CreateIndex
CREATE INDEX "training_nama_training_idx" ON "training"("nama_training");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");
