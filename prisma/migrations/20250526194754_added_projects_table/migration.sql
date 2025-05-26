-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ONGOING', 'COMPLETE');

-- CreateTable
CREATE TABLE "projects" (
    "pId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "images" TEXT[],
    "technologies" TEXT[],
    "features" TEXT[],
    "challenges" TEXT[],
    "frontend_demo_url" TEXT,
    "backend_demo_url" TEXT,
    "frontend_git_url" TEXT,
    "backend_git_url" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("pId")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
