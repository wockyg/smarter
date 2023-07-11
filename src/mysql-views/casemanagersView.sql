CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarter2`.`casemanagersview` AS
select
    `define20_smarter2`.`casemanagers`.`casemanagerId` AS `casemanagerId`,
    `define20_smarter2`.`casemanagers`.`firstName` AS `firstName`,
    `define20_smarter2`.`casemanagers`.`lastName` AS `lastName`,
    concat(`define20_smarter2`.`casemanagers`.`lastName`, ', ', `define20_smarter2`.`casemanagers`.`firstName`) AS `lastFirst`,
    `define20_smarter2`.`casemanagers`.`clientId` AS `clientId`,
    `define20_smarter2`.`clients`.`client` AS `client`,
    `define20_smarter2`.`casemanagers`.`address` AS `address`,
    `define20_smarter2`.`casemanagers`.`suite` AS `suite`,
    `define20_smarter2`.`casemanagers`.`city` AS `city`,
    `define20_smarter2`.`casemanagers`.`state` AS `state`,
    `define20_smarter2`.`casemanagers`.`zip` AS `zip`,
    `define20_smarter2`.`casemanagers`.`phone` AS `phone`,
    `define20_smarter2`.`casemanagers`.`phoneExt` AS `phoneExt`,
    `define20_smarter2`.`casemanagers`.`fax` AS `fax`,
    `define20_smarter2`.`casemanagers`.`email` AS `email`,
    `define20_smarter2`.`casemanagers`.`fceRate` AS `fceRate`,
    `define20_smarter2`.`casemanagers`.`ppdRate` AS `ppdRate`,
    `define20_smarter2`.`casemanagers`.`ppdDiscountRate` AS `ppdDiscountRate`,
    `define20_smarter2`.`casemanagers`.`status` AS `status`,
    `define20_smarter2`.`casemanagers`.`dateAdded` AS `dateAdded`,
    `define20_smarter2`.`casemanagers`.`ptInstructions` AS `ptInstructions`,
    `define20_smarter2`.`casemanagers`.`fceppdInstructions` AS `fceppdInstructions`,
    `define20_smarter2`.`casemanagers`.`billingInstructions` AS `billingInstructions`
from
    (`define20_smarter2`.`casemanagers`
join `define20_smarter2`.`clients` on
    ((`define20_smarter2`.`casemanagers`.`clientId` = `define20_smarter2`.`clients`.`clientId`)));