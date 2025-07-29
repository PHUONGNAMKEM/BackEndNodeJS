-- CreateTable
CREATE TABLE `TypeofGoal` (
    `idTypeGoal` INTEGER NOT NULL AUTO_INCREMENT,
    `nameType` VARCHAR(100) NOT NULL,
    `idGoal` INTEGER NOT NULL,

    PRIMARY KEY (`idTypeGoal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TypeofGoal` ADD CONSTRAINT `TypeofGoal_idGoal_fkey` FOREIGN KEY (`idGoal`) REFERENCES `Goal`(`idGoal`) ON DELETE RESTRICT ON UPDATE CASCADE;
