CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta`.`casemanagersview` AS
select
    `define20_smarterbeta`.`casemanagers`.`casemanagerId` AS `casemanagerId`,
    `define20_smarterbeta`.`casemanagers`.`firstName` AS `firstName`,
    `define20_smarterbeta`.`casemanagers`.`lastName` AS `lastName`,
    concat(`define20_smarterbeta`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta`.`casemanagers`.`firstName`) AS `lastFirst`,
    `define20_smarterbeta`.`casemanagers`.`clientId` AS `clientId`,
    `define20_smarterbeta`.`clients`.`client` AS `client`,
    `define20_smarterbeta`.`casemanagers`.`address` AS `address`,
    `define20_smarterbeta`.`casemanagers`.`suite` AS `suite`,
    `define20_smarterbeta`.`casemanagers`.`city` AS `city`,
    `define20_smarterbeta`.`casemanagers`.`state` AS `state`,
    `define20_smarterbeta`.`casemanagers`.`zip` AS `zip`,
    `define20_smarterbeta`.`casemanagers`.`phone` AS `phone`,
    `define20_smarterbeta`.`casemanagers`.`phoneExt` AS `phoneExt`,
    `define20_smarterbeta`.`casemanagers`.`fax` AS `fax`,
    `define20_smarterbeta`.`casemanagers`.`email` AS `email`,
    `define20_smarterbeta`.`casemanagers`.`fceRate` AS `fceRate`,
    `define20_smarterbeta`.`casemanagers`.`ppdRate` AS `ppdRate`,
    `define20_smarterbeta`.`casemanagers`.`ppdDiscountRate` AS `ppdDiscountRate`,
    `define20_smarterbeta`.`casemanagers`.`status` AS `status`,
    `define20_smarterbeta`.`casemanagers`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta`.`casemanagers`.`ptInstructions` AS `ptInstructions`,
    `define20_smarterbeta`.`casemanagers`.`fceppdInstructions` AS `fceppdInstructions`,
    `define20_smarterbeta`.`casemanagers`.`billingInstructions` AS `billingInstructions`
from
    (`define20_smarterbeta`.`casemanagers`
join `define20_smarterbeta`.`clients` on
    ((`define20_smarterbeta`.`casemanagers`.`clientId` = `define20_smarterbeta`.`clients`.`clientId`)));