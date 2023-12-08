-- define20_smarterbeta120623.casemanagersview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`casemanagersview` AS
select
    `define20_smarterbeta120623`.`casemanagers`.`casemanagerId` AS `casemanagerId`,
    `define20_smarterbeta120623`.`casemanagers`.`firstName` AS `firstName`,
    `define20_smarterbeta120623`.`casemanagers`.`lastName` AS `lastName`,
    concat(`define20_smarterbeta120623`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta120623`.`casemanagers`.`firstName`) AS `lastFirst`,
    `define20_smarterbeta120623`.`casemanagers`.`clientId` AS `clientId`,
    `define20_smarterbeta120623`.`clients`.`client` AS `client`,
    `define20_smarterbeta120623`.`casemanagers`.`address` AS `address`,
    `define20_smarterbeta120623`.`casemanagers`.`suite` AS `suite`,
    `define20_smarterbeta120623`.`casemanagers`.`city` AS `city`,
    `define20_smarterbeta120623`.`casemanagers`.`state` AS `state`,
    `define20_smarterbeta120623`.`casemanagers`.`zip` AS `zip`,
    `define20_smarterbeta120623`.`casemanagers`.`phone` AS `phone`,
    `define20_smarterbeta120623`.`casemanagers`.`phoneExt` AS `phoneExt`,
    `define20_smarterbeta120623`.`casemanagers`.`fax` AS `fax`,
    `define20_smarterbeta120623`.`casemanagers`.`email` AS `email`,
    `define20_smarterbeta120623`.`casemanagers`.`fceRate` AS `fceRate`,
    `define20_smarterbeta120623`.`casemanagers`.`ppdRate` AS `ppdRate`,
    `define20_smarterbeta120623`.`casemanagers`.`ppdDiscountRate` AS `ppdDiscountRate`,
    `define20_smarterbeta120623`.`casemanagers`.`status` AS `status`,
    `define20_smarterbeta120623`.`casemanagers`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta120623`.`casemanagers`.`ptInstructions` AS `ptInstructions`,
    `define20_smarterbeta120623`.`casemanagers`.`fceppdInstructions` AS `fceppdInstructions`,
    `define20_smarterbeta120623`.`casemanagers`.`billingInstructions` AS `billingInstructions`
from
    (`define20_smarterbeta120623`.`casemanagers`
left join `define20_smarterbeta120623`.`clients` on
    ((`define20_smarterbeta120623`.`casemanagers`.`clientId` = `define20_smarterbeta120623`.`clients`.`clientId`)));