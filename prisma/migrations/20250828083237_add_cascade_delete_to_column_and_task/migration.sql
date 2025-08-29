-- DropForeignKey
ALTER TABLE `column` DROP FOREIGN KEY `Column_idGoal_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_idGoal_fkey`;

-- DropIndex
DROP INDEX `Column_idGoal_fkey` ON `column`;

-- DropIndex
DROP INDEX `Task_idGoal_fkey` ON `task`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Column` ADD CONSTRAINT `Column_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE CASCADE ON UPDATE CASCADE;
