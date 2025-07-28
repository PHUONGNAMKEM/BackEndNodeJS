-- AlterTable
ALTER TABLE `goal` MODIFY `status` ENUM('pending', 'active', 'completed', 'overdue', 'archived') NOT NULL;
