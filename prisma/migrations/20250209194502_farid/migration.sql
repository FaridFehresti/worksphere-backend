/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `parentTaskId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_parentTaskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "categoryId",
DROP COLUMN "color",
DROP COLUMN "completed",
DROP COLUMN "name",
DROP COLUMN "parentTaskId",
DROP COLUMN "tags",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "hardness" INTEGER,
ADD COLUMN     "priority" INTEGER,
ADD COLUMN     "taskCategoryId" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "TaskCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TaskCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskCategory_title_key" ON "TaskCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_TaskTags_AB_unique" ON "_TaskTags"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskTags_B_index" ON "_TaskTags"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskCategoryId_fkey" FOREIGN KEY ("taskCategoryId") REFERENCES "TaskCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTags" ADD CONSTRAINT "_TaskTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTags" ADD CONSTRAINT "_TaskTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
