CREATE TABLE IF NOT EXISTS `tasks` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `creator` VARCHAR(180) NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `name` VARCHAR(180) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `launch_date` DATETIME(6) NOT NULL,
  `deadline` DATETIME(6) NOT NULL,
  `project_id` BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_project` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;