-- CreateTable
CREATE TABLE `org_subscriptions` (
    `id` VARCHAR(191) NOT NULL,
    `orgId` VARCHAR(191) NOT NULL,
    `string_customer_id` VARCHAR(191) NULL,
    `string_subscription_id` VARCHAR(191) NULL,
    `string_price_id` VARCHAR(191) NULL,
    `string_current_period_end` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `org_subscriptions_orgId_key`(`orgId`),
    UNIQUE INDEX `org_subscriptions_string_customer_id_key`(`string_customer_id`),
    UNIQUE INDEX `org_subscriptions_string_subscription_id_key`(`string_subscription_id`),
    UNIQUE INDEX `org_subscriptions_string_price_id_key`(`string_price_id`),
    UNIQUE INDEX `org_subscriptions_string_current_period_end_key`(`string_current_period_end`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
