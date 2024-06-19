/*
  Warnings:

  - Added the required column `entityTitle` to the `audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `audit_logs` ADD COLUMN `entityTitle` VARCHAR(191) NOT NULL;
