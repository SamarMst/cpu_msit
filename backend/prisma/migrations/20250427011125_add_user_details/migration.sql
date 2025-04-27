/*
  Warnings:

  - A unique constraint covering the columns `[countryCode,phoneNumber]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `countryCode` VARCHAR(10) NULL,
    ADD COLUMN `firstName` VARCHAR(100) NULL,
    ADD COLUMN `lastName` VARCHAR(100) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(50) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_countryCode_phoneNumber_key` ON `Users`(`countryCode`, `phoneNumber`);
