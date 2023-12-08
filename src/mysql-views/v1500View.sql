-- define20_smarterbeta120623.v1500view source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`v1500view` AS
select
    `define20_smarterbeta120623`.`v1500`.`v1500Id` AS `v1500Id`,
    `define20_smarterbeta120623`.`v1500`.`hcfaId` AS `hcfaId`,
    `define20_smarterbeta120623`.`v1500`.`referralId` AS `referralId`,
    `define20_smarterbeta120623`.`v1500`.`dateAdded` AS `dateAdded`,
    `define20_smarterbeta120623`.`v1500`.`method` AS `method`,
    `define20_smarterbeta120623`.`v1500`.`v1500_filename` AS `v1500_filename`,
    `define20_smarterbeta120623`.`v1500`.`d1500_filename` AS `d1500_filename`,
    `define20_smarterbeta120623`.`v1500`.`original_dos` AS `original_dos`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_a` AS `diagnosis_a`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_b` AS `diagnosis_b`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_c` AS `diagnosis_c`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_d` AS `diagnosis_d`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_e` AS `diagnosis_e`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_f` AS `diagnosis_f`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_g` AS `diagnosis_g`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_h` AS `diagnosis_h`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_i` AS `diagnosis_i`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_j` AS `diagnosis_j`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_k` AS `diagnosis_k`,
    `define20_smarterbeta120623`.`v1500`.`diagnosis_l` AS `diagnosis_l`,
    `define20_smarterbeta120623`.`v1500`.`physician_npi` AS `physician_npi`,
    `define20_smarterbeta120623`.`v1500`.`physician_name` AS `physician_name`,
    `define20_smarterbeta120623`.`v1500`.`patient_account_no` AS `patient_account_no`,
    `define20_smarterbeta120623`.`referralsview`.`claimant` AS `claimant`,
    `define20_smarterbeta120623`.`referralsview`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta120623`.`referralsview`.`service` AS `service`,
    `define20_smarterbeta120623`.`referralsview`.`adjuster` AS `adjuster`,
    `define20_smarterbeta120623`.`referralsview`.`adjusterClient` AS `adjusterClient`,
    `define20_smarterbeta120623`.`v1500`.`d1500Approved` AS `d1500Approved`
from
    (`define20_smarterbeta120623`.`v1500`
left join `define20_smarterbeta120623`.`referralsview` on
    ((`define20_smarterbeta120623`.`v1500`.`referralId` = `define20_smarterbeta120623`.`referralsview`.`referralId`)));