-- define20_smarterbeta120623.v1500Rowsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`v1500Rowsview` AS
select
    `define20_smarterbeta120623`.`v1500Rows`.`rowId` AS `rowId`,
    `define20_smarterbeta120623`.`v1500`.`v1500Id` AS `v1500Id`,
    `define20_smarterbeta120623`.`v1500`.`hcfaId` AS `hcfaId`,
    `define20_smarterbeta120623`.`v1500`.`referralId` AS `referralId`,
    `define20_smarterbeta120623`.`v1500Rows`.`dos` AS `dos`,
    `define20_smarterbeta120623`.`v1500Rows`.`pos` AS `pos`,
    `define20_smarterbeta120623`.`v1500Rows`.`cpt` AS `cpt`,
    `define20_smarterbeta120623`.`v1500Rows`.`mod1` AS `mod1`,
    `define20_smarterbeta120623`.`v1500Rows`.`mod2` AS `mod2`,
    `define20_smarterbeta120623`.`v1500Rows`.`mod3` AS `mod3`,
    `define20_smarterbeta120623`.`v1500Rows`.`mod4` AS `mod4`,
    `define20_smarterbeta120623`.`v1500Rows`.`diag` AS `diag`,
    `define20_smarterbeta120623`.`v1500Rows`.`charges` AS `charges`,
    `define20_smarterbeta120623`.`v1500Rows`.`units` AS `units`,
    `define20_smarterbeta120623`.`v1500Rows`.`provider_npi` AS `provider_npi`,
    `define20_smarterbeta120623`.`v1500`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta120623`.`v1500`.`d1500Approved` AS `d1500Approved`
from
    (`define20_smarterbeta120623`.`v1500`
left join `define20_smarterbeta120623`.`v1500Rows` on
    ((`define20_smarterbeta120623`.`v1500`.`v1500Id` = `define20_smarterbeta120623`.`v1500Rows`.`v1500Id`)));