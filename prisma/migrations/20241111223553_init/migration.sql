-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "role" DROP DEFAULT,
ALTER COLUMN "role" SET DATA TYPE TEXT;
