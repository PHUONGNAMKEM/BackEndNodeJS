-- AlterTable
ALTER TABLE `task` ADD COLUMN `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low',
    ADD COLUMN `startDate` DATETIME(3) NULL;
