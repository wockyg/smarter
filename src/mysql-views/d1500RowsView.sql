CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `smarter113023`.`d1500rowsview` AS
select
    `smarter113023`.`d1500rows`.`rowId` AS `rowId`,
    `smarter113023`.`d1500`.`hcfaId` AS `hcfaId`,
    `smarter113023`.`d1500`.`referralId` AS `referralId`,
    `smarter113023`.`d1500`.`sendFormat` AS `sendFormat`,
    `smarter113023`.`d1500rows`.`dos` AS `dos`,
    `smarter113023`.`d1500rows`.`pos` AS `pos`,
    `smarter113023`.`d1500rows`.`cpt` AS `cpt`,
    `smarter113023`.`d1500rows`.`mod1` AS `mod1`,
    `smarter113023`.`d1500rows`.`mod2` AS `mod2`,
    `smarter113023`.`d1500rows`.`mod3` AS `mod3`,
    `smarter113023`.`d1500rows`.`mod4` AS `mod4`,
    `smarter113023`.`d1500rows`.`diag` AS `diag`,
    `smarter113023`.`d1500rows`.`charges` AS `charges`,
    `smarter113023`.`d1500rows`.`units` AS `units`,
    `smarter113023`.`d1500rows`.`provider_npi` AS `provider_npi`,
    `smarter113023`.`d1500`.`dateAdded` AS `dateAdded`,
    `smarter113023`.`d1500`.`dateApproved` AS `dateApproved`
from
    (`smarter113023`.`d1500`
left join `smarter113023`.`d1500rows` on
    ((`smarter113023`.`d1500`.`hcfaId` = `smarter113023`.`d1500rows`.`hcfaId`)));