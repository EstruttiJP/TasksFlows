CREATE TABLE IF NOT EXISTS `task_users` (
    `id_task` BIGINT NOT NULL,
    `id_user` BIGINT NOT NULL,
    PRIMARY KEY (`id_task`, `id_user`),
    CONSTRAINT `fk_task` FOREIGN KEY (`id_task`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
