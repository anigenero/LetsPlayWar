CREATE TABLE IF NOT EXISTS `letsplaywar`.`game` (

    `uuid` CHAR(36) NOT NULL,

    `deck` JSON NOT NULL,

    `turn` TINYINT(2) UNSIGNED DEFAULT 0,

    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modified` DATETIME ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`uuid`)

) ENGINE = Aria
  TRANSACTIONAL = 1
  COMMENT 'Holds historical records of games played';