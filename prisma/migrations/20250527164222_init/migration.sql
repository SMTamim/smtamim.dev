/*
  Warnings:

  - Added the required column `position` to the `work_experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_experience" ADD COLUMN     "position" TEXT NOT NULL;
