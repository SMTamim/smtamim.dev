-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('PUBLISHED', 'PENDING', 'UNPUBLISHED');

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "status" "BlogStatus" NOT NULL DEFAULT 'PENDING';
