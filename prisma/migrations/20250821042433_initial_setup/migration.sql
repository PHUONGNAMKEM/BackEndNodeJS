/*
  Warnings:

  - You are about to drop the `goaltype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idGoal` to the `TypeofGoal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `goaltype` DROP FOREIGN KEY `GoalType_idGoal_fkey`;

-- DropForeignKey
ALTER TABLE `goaltype` DROP FOREIGN KEY `GoalType_idTypeGoal_fkey`;

-- DropIndex
DROP INDEX `TypeofGoal_nameType_key` ON `typeofgoal`;

-- AlterTable
ALTER TABLE `typeofgoal` ADD COLUMN `idGoal` INTEGER NOT NULL;

-- DropTable
DROP TABLE `goaltype`;

-- AddForeignKey
ALTER TABLE `TypeofGoal` ADD CONSTRAINT `TypeofGoal_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE RESTRICT ON UPDATE CASCADE;
