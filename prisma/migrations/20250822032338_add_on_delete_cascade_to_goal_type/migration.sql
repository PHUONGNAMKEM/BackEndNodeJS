-- DropForeignKey
ALTER TABLE `goaltype` DROP FOREIGN KEY `GoalType_idGoal_fkey`;

-- DropForeignKey
ALTER TABLE `goaltype` DROP FOREIGN KEY `GoalType_idTypeGoal_fkey`;

-- DropIndex
DROP INDEX `GoalType_idTypeGoal_fkey` ON `goaltype`;

-- AddForeignKey
ALTER TABLE `GoalType` ADD CONSTRAINT `GoalType_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GoalType` ADD CONSTRAINT `GoalType_idTypeGoal_fkey` FOREIGN KEY (`idTypeGoal`) REFERENCES `TypeofGoal`(`idTypeGoal`) ON DELETE CASCADE ON UPDATE CASCADE;
