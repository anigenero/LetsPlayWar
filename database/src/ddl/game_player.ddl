CREATE TABLE IF NOT EXISTS `letsplaywar`.`game_player` (

    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    
    `game` CHAR(36) NOT NULL,
    `player` INT UNSIGNED NOT NULL,

    `score` SMALLINT UNSIGNED NOT NULL DEFAULT 0,

    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modified` DATETIME ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),

    INDEX `game_player_game_fk_ix` (`game`),
    INDEX `game_player_player_fk_ix` (`player`),
    INDEX `game_player_score_ix` (`score`),

    CONSTRAINT FOREIGN KEY `game_player_game_fk` (`game`)
    REFERENCES `game` (`id`)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT FOREIGN KEY `game_player_player_fk` (`player`)
    REFERENCES `player` (`id`)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE = Aria
  TRANSACTIONAL = 1
  COMMENT 'Holds the association of game players and their scores';