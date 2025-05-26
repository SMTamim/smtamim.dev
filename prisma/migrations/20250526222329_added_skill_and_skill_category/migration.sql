-- AlterTable
ALTER TABLE "skill" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "skill_category" ADD COLUMN     "deletedAt" TIMESTAMP(3);
