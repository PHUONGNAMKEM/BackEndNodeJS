/*
  Warnings:

  - You are about to drop the column `idGoal` on the `typeofgoal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `typeofgoal` DROP FOREIGN KEY `TypeofGoal_idGoal_fkey`;

-- DropIndex
DROP INDEX `TypeofGoal_idGoal_fkey` ON `typeofgoal`;

-- AlterTable
ALTER TABLE `typeofgoal` DROP COLUMN `idGoal`;
