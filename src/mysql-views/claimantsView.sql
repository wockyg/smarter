-- define20_smarterbeta120623.claimantsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`claimantsview` AS
select
    `define20_smarterbeta120623`.`claimants`.`claimantId` AS `claimantId`,
    `define20_smarterbeta120623`.`claimants`.`firstName` AS `firstName`,
    `define20_smarterbeta120623`.`claimants`.`lastName` AS `lastName`,
    concat(`define20_smarterbeta120623`.`claimants`.`lastName`, ', ', `define20_smarterbeta120623`.`claimants`.`firstName`) AS `lastFirst`,
    `define20_smarterbeta120623`.`claimants`.`employerId` AS `employerId`,
    `define20_smarterbeta120623`.`employers`.`name` AS `employer`,
    `define20_smarterbeta120623`.`claimants`.`gender` AS `gender`,
    `define20_smarterbeta120623`.`claimants`.`birthDate` AS `birthDate`,
    `define20_smarterbeta120623`.`claimants`.`injuryDate1` AS `injuryDate1`,
    `define20_smarterbeta120623`.`claimants`.`injuryDate2` AS `injuryDate2`,
    `define20_smarterbeta120623`.`claimants`.`address` AS `address`,
    `define20_smarterbeta120623`.`claimants`.`city` AS `city`,
    `define20_smarterbeta120623`.`claimants`.`state` AS `state`,
    `define20_smarterbeta120623`.`claimants`.`zip` AS `zip`,
    `define20_smarterbeta120623`.`claimants`.`phone` AS `phone`,
    `define20_smarterbeta120623`.`claimants`.`alternatePhone` AS `alternatePhone`,
    `define20_smarterbeta120623`.`claimants`.`email` AS `email`,
    `define20_smarterbeta120623`.`claimants`.`email2` AS `email2`,
    `define20_smarterbeta120623`.`claimants`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta120623`.`claimants`.`notes` AS `notes`
from
    (`define20_smarterbeta120623`.`claimants`
left join `define20_smarterbeta120623`.`employers` on
    ((`define20_smarterbeta120623`.`claimants`.`employerId` = `define20_smarterbeta120623`.`employers`.`employerId`)));