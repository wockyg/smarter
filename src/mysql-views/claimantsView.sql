-- define20_smarterbeta.claimantsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta`.`claimantsview` AS
select
    `define20_smarterbeta`.`claimants`.`claimantId` AS `claimantId`,
    `define20_smarterbeta`.`claimants`.`firstName` AS `firstName`,
    `define20_smarterbeta`.`claimants`.`lastName` AS `lastName`,
    `define20_smarterbeta`.`claimants`.`employerId` AS `employerId`,
    `define20_smarterbeta`.`employers`.`name` AS `employer`,
    `define20_smarterbeta`.`claimants`.`gender` AS `gender`,
    `define20_smarterbeta`.`claimants`.`birthDate` AS `birthDate`,
    `define20_smarterbeta`.`claimants`.`injuryDate1` AS `injuryDate1`,
    `define20_smarterbeta`.`claimants`.`injuryDate2` AS `injuryDate2`,
    `define20_smarterbeta`.`claimants`.`address` AS `address`,
    `define20_smarterbeta`.`claimants`.`city` AS `city`,
    `define20_smarterbeta`.`claimants`.`state` AS `state`,
    `define20_smarterbeta`.`claimants`.`zip` AS `zip`,
    `define20_smarterbeta`.`claimants`.`phone` AS `phone`,
    `define20_smarterbeta`.`claimants`.`alternatePhone` AS `alternatePhone`,
    `define20_smarterbeta`.`claimants`.`email` AS `email`,
    `define20_smarterbeta`.`claimants`.`email2` AS `email2`,
    `define20_smarterbeta`.`claimants`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta`.`claimants`.`notes` AS `notes`
from
    (`define20_smarterbeta`.`claimants`
left join `define20_smarterbeta`.`employers` on
    ((`define20_smarterbeta`.`claimants`.`employerId` = `define20_smarterbeta`.`employers`.`employerId`)));