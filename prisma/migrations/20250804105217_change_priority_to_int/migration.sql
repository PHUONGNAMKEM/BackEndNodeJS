/*
  Warnings:

  - You are about to alter the column `priority` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Int`.
  - Made the column `startDate` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `priority` INTEGER NOT NULL DEFAULT 0,
    MODIFY `startDate` DATETIME(3) NOT NULL;
