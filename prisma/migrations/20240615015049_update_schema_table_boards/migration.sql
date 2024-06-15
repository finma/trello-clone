/*
  Warnings:

  - Added the required column `imageFullUrl` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLinkHTML` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageThumbUrl` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUserName` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `boards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boards` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageFullUrl` TEXT NOT NULL,
    ADD COLUMN `imageId` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageLinkHTML` TEXT NOT NULL,
    ADD COLUMN `imageThumbUrl` TEXT NOT NULL,
    ADD COLUMN `imageUserName` TEXT NOT NULL,
    ADD COLUMN `orgId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
