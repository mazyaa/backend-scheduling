-- CreateTable
CREATE TABLE "sesi_jadwal_training" (
    "id" TEXT NOT NULL,
    "detail_jadwal_training_id" TEXT NOT NULL,
    "jam_mulai" TIME NOT NULL,
    "jam_selesai" TIME NOT NULL,
    "aktivitas" VARCHAR(100) NOT NULL,
    "urutan" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sesi_jadwal_training_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sesi_jadwal_training_detail_jadwal_training_id_idx" ON "sesi_jadwal_training"("detail_jadwal_training_id");

-- AddForeignKey
ALTER TABLE "sesi_jadwal_training" ADD CONSTRAINT "sesi_jadwal_training_detail_jadwal_training_id_fkey" FOREIGN KEY ("detail_jadwal_training_id") REFERENCES "detail_jadwal_training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
