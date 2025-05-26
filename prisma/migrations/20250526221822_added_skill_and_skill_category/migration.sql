-- CreateTable
CREATE TABLE "skill_category" (
    "s_cat_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "skill" (
    "s_id" TEXT NOT NULL,
    "s_category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "skill_category_s_cat_id_key" ON "skill_category"("s_cat_id");

-- CreateIndex
CREATE UNIQUE INDEX "skill_s_id_key" ON "skill"("s_id");

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_s_category_fkey" FOREIGN KEY ("s_category") REFERENCES "skill_category"("s_cat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
