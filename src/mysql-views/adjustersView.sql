-- define20_smarterbeta120623.adjustersview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`adjustersview` AS
select
    `define20_smarterbeta120623`.`adjusters`.`adjusterId` AS `adjusterId`,
    `define20_smarterbeta120623`.`adjusters`.`lastName` AS `lastName`,
    `define20_smarterbeta120623`.`adjusters`.`firstName` AS `firstName`,
    concat(`define20_smarterbeta120623`.`adjusters`.`lastName`, ', ', `define20_smarterbeta120623`.`adjusters`.`firstName`) AS `lastFirst`,
    concat(`define20_smarterbeta120623`.`adjusters`.`lastName`, ', ', `define20_smarterbeta120623`.`adjusters`.`firstName`, ' | ', `define20_smarterbeta120623`.`clients`.`client`) AS `adjusterBeaver`,
    `define20_smarterbeta120623`.`clients`.`client` AS `client`,
    `define20_smarterbeta120623`.`adjusters`.`clientId` AS `clientId`,
    `define20_smarterbeta120623`.`adjusters`.`address` AS `address`,
    `define20_smarterbeta120623`.`adjusters`.`suite` AS `suite`,
    `define20_smarterbeta120623`.`adjusters`.`city` AS `city`,
    `define20_smarterbeta120623`.`adjusters`.`state` AS `state`,
    `define20_smarterbeta120623`.`adjusters`.`zip` AS `zip`,
    `define20_smarterbeta120623`.`adjusters`.`phone` AS `phone`,
    `define20_smarterbeta120623`.`adjusters`.`phoneExt` AS `phoneExt`,
    `define20_smarterbeta120623`.`adjusters`.`phone2` AS `phone2`,
    `define20_smarterbeta120623`.`adjusters`.`phone2Ext` AS `phone2Ext`,
    `define20_smarterbeta120623`.`adjusters`.`fax` AS `fax`,
    `define20_smarterbeta120623`.`adjusters`.`email` AS `email`,
    `define20_smarterbeta120623`.`adjusters`.`email2` AS `email2`,
    `define20_smarterbeta120623`.`adjusters`.`fceRate` AS `fceRate`,
    `define20_smarterbeta120623`.`adjusters`.`ppdRate` AS `ppdRate`,
    `define20_smarterbeta120623`.`adjusters`.`ppdDiscountRate` AS `ppdDiscountRate`,
    `define20_smarterbeta120623`.`adjusters`.`status` AS `status`,
    `define20_smarterbeta120623`.`adjusters`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta120623`.`adjusters`.`ptInstructions` AS `ptInstructions`,
    `define20_smarterbeta120623`.`adjusters`.`fceppdInstructions` AS `fceppdInstructions`,
    `define20_smarterbeta120623`.`adjusters`.`billingInstructions` AS `billingInstructions`
from
    (`define20_smarterbeta120623`.`adjusters`
left join `define20_smarterbeta120623`.`clients` on
    ((`define20_smarterbeta120623`.`adjusters`.`clientId` = `define20_smarterbeta120623`.`clients`.`clientId`)));