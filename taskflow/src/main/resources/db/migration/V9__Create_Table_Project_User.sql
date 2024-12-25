CREATE TABLE IF NOT EXISTS `project_user` (
    `id_project` BIGINT NOT NULL,
    `id_user` BIGINT NOT NULL,
    PRIMARY KEY (`id_project`, `id_user`),
    CONSTRAINT `fk_project` FOREIGN KEY (`id_project`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) 
) ENGINE=InnoDB;
