-- define20_smarter2.claimantsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarter2`.`claimantsview` AS
select
    `define20_smarter2`.`claimants`.`claimantId` AS `claimantId`,
    `define20_smarter2`.`claimants`.`firstName` AS `firstName`,
    `define20_smarter2`.`claimants`.`lastName` AS `lastName`,
    `define20_smarter2`.`claimants`.`employerId` AS `employerId`,
    `define20_smarter2`.`employers`.`name` AS `employer`,
    `define20_smarter2`.`claimants`.`gender` AS `gender`,
    `define20_smarter2`.`claimants`.`birthDate` AS `birthDate`,
    `define20_smarter2`.`claimants`.`injuryDate1` AS `injuryDate1`,
    `define20_smarter2`.`claimants`.`injuryDate2` AS `injuryDate2`,
    `define20_smarter2`.`claimants`.`address` AS `address`,
    `define20_smarter2`.`claimants`.`city` AS `city`,
    `define20_smarter2`.`claimants`.`state` AS `state`,
    `define20_smarter2`.`claimants`.`zip` AS `zip`,
    `define20_smarter2`.`claimants`.`phone` AS `phone`,
    `define20_smarter2`.`claimants`.`alternatePhone` AS `alternatePhone`,
    `define20_smarter2`.`claimants`.`email` AS `email`,
    `define20_smarter2`.`claimants`.`email2` AS `email2`,
    `define20_smarter2`.`claimants`.`dateAdded` AS `dateAdded`,
    `define20_smarter2`.`claimants`.`notes` AS `notes`
from
    (`define20_smarter2`.`claimants`
left join `define20_smarter2`.`employers` on
    ((`define20_smarter2`.`claimants`.`employerId` = `define20_smarter2`.`employers`.`employerId`)));