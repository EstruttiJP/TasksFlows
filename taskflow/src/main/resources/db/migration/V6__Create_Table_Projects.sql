CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `creator` varchar(180) NOT NULL,
  `deadline` datetime(6) NOT NULL,
  `description` varchar(280) NOT NULL,
  `launch_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(180) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB;