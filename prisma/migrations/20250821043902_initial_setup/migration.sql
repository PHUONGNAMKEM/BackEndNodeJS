/*
  Warnings:

  - You are about to drop the column `idGoal` on the `typeofgoal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameType]` on the table `TypeofGoal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `typeofgoal` DROP FOREIGN KEY `TypeofGoal_idGoal_fkey`;

-- DropIndex
DROP INDEX `TypeofGoal_idGoal_fkey` ON `typeofgoal`;

-- AlterTable
ALTER TABLE `typeofgoal` DROP COLUMN `idGoal`;

-- CreateTable
CREATE TABLE `GoalType` (
    `idGoal` INTEGER NOT NULL,
    `idTypeGoal` INTEGER NOT NULL,

    PRIMARY KEY (`idGoal`, `idTypeGoal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `TypeofGoal_nameType_key` ON `TypeofGoal`(`nameType`);

-- AddForeignKey
ALTER TABLE `GoalType` ADD CONSTRAINT `GoalType_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoalType` ADD CONSTRAINT `GoalType_idTypeGoal_fkey` FOREIGN KEY (`idTypeGoal`) REFERENCES `TypeofGoal`(`idTypeGoal`) ON DELETE RESTRICT ON UPDATE CASCADE;
