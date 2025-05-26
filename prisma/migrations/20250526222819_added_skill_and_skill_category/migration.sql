/*
  Warnings:

  - You are about to drop the column `s_category` on the `skill` table. All the data in the column will be lost.
  - Added the required column `s_category_id` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "skill" DROP CONSTRAINT "skill_s_category_fkey";

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "s_category",
ADD COLUMN     "s_category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_s_category_id_fkey" FOREIGN KEY ("s_category_id") REFERENCES "skill_category"("s_cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
