-- define20_smarterbeta.adjustersview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta`.`adjustersview` AS
select
    `define20_smarterbeta`.`adjusters`.`adjusterId` AS `adjusterId`,
    `define20_smarterbeta`.`adjusters`.`lastName` AS `lastName`,
    `define20_smarterbeta`.`adjusters`.`firstName` AS `firstName`,
    concat(`define20_smarterbeta`.`adjusters`.`lastName`, ', ', `define20_smarterbeta`.`adjusters`.`firstName`) AS `lastFirst`,
    `define20_smarterbeta`.`clients`.`client` AS `client`,
    `define20_smarterbeta`.`adjusters`.`clientId` AS `clientId`,
    `define20_smarterbeta`.`adjusters`.`address` AS `address`,
    `define20_smarterbeta`.`adjusters`.`suite` AS `suite`,
    `define20_smarterbeta`.`adjusters`.`city` AS `city`,
    `define20_smarterbeta`.`adjusters`.`state` AS `state`,
    `define20_smarterbeta`.`adjusters`.`zip` AS `zip`,
    `define20_smarterbeta`.`adjusters`.`phone` AS `phone`,
    `define20_smarterbeta`.`adjusters`.`phoneExt` AS `phoneExt`,
    `define20_smarterbeta`.`adjusters`.`phone2` AS `phone2`,
    `define20_smarterbeta`.`adjusters`.`phone2Ext` AS `phone2Ext`,
    `define20_smarterbeta`.`adjusters`.`fax` AS `fax`,
    `define20_smarterbeta`.`adjusters`.`email` AS `email`,
    `define20_smarterbeta`.`adjusters`.`email2` AS `email2`,
    `define20_smarterbeta`.`adjusters`.`fceRate` AS `fceRate`,
    `define20_smarterbeta`.`adjusters`.`ppdRate` AS `ppdRate`,
    `define20_smarterbeta`.`adjusters`.`ppdDiscountRate` AS `ppdDiscountRate`,
    `define20_smarterbeta`.`adjusters`.`status` AS `status`,
    `define20_smarterbeta`.`adjusters`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta`.`adjusters`.`ptInstructions` AS `ptInstructions`,
    `define20_smarterbeta`.`adjusters`.`fceppdInstructions` AS `fceppdInstructions`,
    `define20_smarterbeta`.`adjusters`.`billingInstructions` AS `billingInstructions`
from
    (`define20_smarterbeta`.`adjusters`
join `define20_smarterbeta`.`clients` on
    ((`define20_smarterbeta`.`adjusters`.`clientId` = `define20_smarterbeta`.`clients`.`clientId`)));