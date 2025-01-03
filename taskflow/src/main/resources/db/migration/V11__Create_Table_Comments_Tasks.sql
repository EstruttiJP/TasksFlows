CREATE TABLE IF NOT EXISTS `comments_tasks` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `id_task` BIGINT NOT NULL,
    `id_user` BIGINT NOT NULL,
    `comment` TEXT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
   	FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
   	FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
