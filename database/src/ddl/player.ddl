CREATE TABLE IF NOT EXISTS `letsplaywar`.`player` (

    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(25) NOT NULL,

    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),

    INDEX `player_username_ix` (`username`),

    CONSTRAINT UNIQUE `player_username_uq` (`username`)

) ENGINE = Aria
  TRANSACTIONAL = 1
  COMMENT 'Players';