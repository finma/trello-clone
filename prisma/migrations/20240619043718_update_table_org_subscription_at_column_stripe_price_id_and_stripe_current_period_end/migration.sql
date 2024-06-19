/*
  Warnings:

  - You are about to alter the column `string_current_period_end` on the `org_subscriptions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- DropIndex
DROP INDEX `org_subscriptions_string_current_period_end_key` ON `org_subscriptions`;

-- DropIndex
DROP INDEX `org_subscriptions_string_price_id_key` ON `org_subscriptions`;

-- AlterTable
ALTER TABLE `org_subscriptions` MODIFY `string_current_period_end` DATETIME(3) NULL;
