/*
  Warnings:

  - A unique constraint covering the columns `[nameType]` on the table `TypeofGoal` will be added. If there are existing duplicate values, this will fail.

*/
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
