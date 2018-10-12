DELIMITER $$

    DROP TRIGGER IF EXISTS `letsplaywar`.`game_insert_trigger` $$

    CREATE TRIGGER `game_insert_trigger` BEFORE INSERT ON `letsplaywar`.`game`
    FOR EACH ROW
    BEGIN
        IF NEW.uuid IS NULL THEN
            SET NEW.uuid = UUID();
        END IF;
    END; $$

DELIMITER ;