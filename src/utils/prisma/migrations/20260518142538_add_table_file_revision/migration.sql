-- CreateEnum
CREATE TYPE "status_revisi" AS ENUM ('pending', 'disetujui', 'ditolak');

-- CreateTable
CREATE TABLE "revisi_file" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_revisi" TEXT NOT NULL,
    "catatan" TEXT,
    "status" "status_revisi" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revisi_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "revisi_file" ADD CONSTRAINT "revisi_file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
