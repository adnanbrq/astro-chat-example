CREATE TABLE `User` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(191) NOT NULL,
    `password` varchar(191) NOT NULL,
    `name` varchar(191) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `User_email_key` (`email`)
);
CREATE TABLE `Channel` (
    `id` varchar(191) NOT NULL,
    `name` varchar(191) NOT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `Channel_name_key` (`name`)
);
CREATE TABLE `Message` (
    `id` int NOT NULL AUTO_INCREMENT,
    `content` varchar(191) NOT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL,
    `deletedAt` datetime(3),
    `userId` int NOT NULL,
    `channelId` varchar(191) NOT NULL,
    PRIMARY KEY (`id`)
);