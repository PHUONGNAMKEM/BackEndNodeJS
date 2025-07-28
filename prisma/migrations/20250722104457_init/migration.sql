/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `address`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `password` VARCHAR(200) NOT NULL,
    ADD COLUMN `point` INTEGER NOT NULL,
    ADD COLUMN `rank` ENUM('bronze', 'silver', 'gold', 'diamond', 'elite', 'master', 'warlord') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(200) NOT NULL,
    MODIFY `email` VARCHAR(200) NOT NULL,
    ADD PRIMARY KEY (`idUser`);

-- CreateTable
CREATE TABLE `Goal` (
    `idGoal` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('active', 'completed', 'overdue') NOT NULL,
    `progress` INTEGER NOT NULL,
    `isPublic` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`idGoal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `idTask` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `isDone` BOOLEAN NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `idGoal` INTEGER NOT NULL,

    PRIMARY KEY (`idTask`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE RESTRICT ON UPDATE CASCADE;
