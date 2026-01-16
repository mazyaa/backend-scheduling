-- DropForeignKey
ALTER TABLE "jadwal_training" DROP CONSTRAINT "jadwal_training_user_id_fkey";

-- AlterTable
ALTER TABLE "jadwal_training" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "jadwal_training" ADD CONSTRAINT "jadwal_training_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
