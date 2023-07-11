-- define20_smarter2.adjustersview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarter2`.`adjustersview` AS
select
    `define20_smarter2`.`adjusters`.`adjusterId` AS `adjusterId`,
    `define20_smarter2`.`adjusters`.`lastName` AS `lastName`,
    `define20_smarter2`.`adjusters`.`firstName` AS `firstName`,
    concat(`define20_smarter2`.`adjusters`.`lastName`, ', ', `define20_smarter2`.`adjusters`.`firstName`) AS `lastFirst`,
    `define20_smarter2`.`clients`.`client` AS `client`,
    `define20_smarter2`.`adjusters`.`clientId` AS `clientId`,
    `define20_smarter2`.`adjusters`.`address` AS `address`,
    `define20_smarter2`.`adjusters`.`suite` AS `suite`,
    `define20_smarter2`.`adjusters`.`city` AS `city`,
    `define20_smarter2`.`adjusters`.`state` AS `state`,
    `define20_smarter2`.`adjusters`.`zip` AS `zip`,
    `define20_smarter2`.`adjusters`.`phone` AS `phone`,
    `define20_smarter2`.`adjusters`.`phoneExt` AS `phoneExt`,
    `define20_smarter2`.`adjusters`.`phone2` AS `phone2`,
    `define20_smarter2`.`adjusters`.`phone2Ext` AS `phone2Ext`,
    `define20_smarter2`.`adjusters`.`fax` AS `fax`,
    `define20_smarter2`.`adjusters`.`email` AS `email`,
    `define20_smarter2`.`adjusters`.`email2` AS `email2`,
    `define20_smarter2`.`adjusters`.`fceRate` AS `fceRate`,
    `define20_smarter2`.`adjusters`.`ppdRate` AS `ppdRate`,
    `define20_smarter2`.`adjusters`.`ppdDiscountRate` AS `ppdDiscountRate`,
    `define20_smarter2`.`adjusters`.`status` AS `status`,
    `define20_smarter2`.`adjusters`.`dateAdded` AS `dateAdded`,
    `define20_smarter2`.`adjusters`.`ptInstructions` AS `ptInstructions`,
    `define20_smarter2`.`adjusters`.`fceppdInstructions` AS `fceppdInstructions`,
    `define20_smarter2`.`adjusters`.`billingInstructions` AS `billingInstructions`
from
    (`define20_smarter2`.`adjusters`
join `define20_smarter2`.`clients` on
    ((`define20_smarter2`.`adjusters`.`clientId` = `define20_smarter2`.`clients`.`clientId`)));