CREATE TABLE IF NOT EXISTS `letsplaywar`.`game` (

    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)

) ENGINE = Aria
  TRANSACTIONAL = 1
  COMMENT 'Holds historical records of games played';