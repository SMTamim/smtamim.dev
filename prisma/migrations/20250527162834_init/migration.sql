/*
  Warnings:

  - Added the required column `updatedAt` to the `work_experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_experience" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
