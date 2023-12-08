-- define20_smarterbeta120623.fceppdBillingview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`fceppdBillingview` AS
select
    `define20_smarterbeta120623`.`fceppdBilling`.`fceId` AS `fceId`,
    `define20_smarterbeta120623`.`fceppdBilling`.`referralId` AS `referralId`,
    `define20_smarterbeta120623`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta120623`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta120623`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    concat(`define20_smarterbeta120623`.`claimants`.`lastName`, ', ', `define20_smarterbeta120623`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta120623`.`claimants`.`birthDate` AS `claimantBirthDate`,
    concat(`define20_smarterbeta120623`.`adjusters`.`lastName`, ', ', `define20_smarterbeta120623`.`adjusters`.`firstName`) AS `adjuster`,
    `clients1`.`client` AS `adjusterClient`,
    concat(`define20_smarterbeta120623`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta120623`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarterbeta120623`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta120623`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta120723`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta120623`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta120623`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta120623`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta120623`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta120623`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta120623`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta120623`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta120623`.`referralsNotification`.`apptDate` AS `dos`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarterbeta120623`.`fceppdBilling`.`v1500` AS `v1500`,
    `define20_smarterbeta120623`.`fceppdBilling`.`d1500Sent` AS `d1500Sent`,
    `define20_smarterbeta120623`.`fceppdBilling`.`d1500SendFormat` AS `d1500SendFormat`,
    `define20_smarterbeta120623`.`fceppdBilling`.`adjusterRate` AS `adjusterRate`,
    `define20_smarterbeta120623`.`fceppdBilling`.`adjusterRateAdjustment` AS `adjusterRateAdjustment`,
    `define20_smarterbeta120623`.`fceppdBilling`.`paymentStatusDate` AS `paymentStatusDate`,
    `define20_smarterbeta120623`.`fceppdBilling`.`paymentStatus` AS `paymentStatus`,
    `define20_smarterbeta120623`.`fceppdBilling`.`rebillNeeded` AS `rebillNeeded`,
    `define20_smarterbeta120623`.`fceppdBilling`.`dateRebilled` AS `dateRebilled`,
    `define20_smarterbeta120623`.`fceppdBilling`.`rebillFormat` AS `rebillFormat`,
    `define20_smarterbeta120623`.`fceppdBilling`.`adjusterDatePaid` AS `adjusterDatePaid`,
    `define20_smarterbeta120623`.`fceppdBilling`.`adjusterAmountPaid` AS `adjusterAmountPaid`,
    `define20_smarterbeta120623`.`fceppdBilling`.`facilityRate` AS `facilityRate`,
    `define20_smarterbeta120623`.`fceppdBilling`.`facilityDatePaid` AS `facilityDatePaid`,
    `define20_smarterbeta120623`.`fceppdBilling`.`facilityAmountPaid` AS `facilityAmountPaid`,
    `define20_smarterbeta120623`.`fceppdBilling`.`checkNumber` AS `checkNumber`,
    `define20_smarterbeta120623`.`fceppdBilling`.`writeOff` AS `writeOff`,
    `define20_smarterbeta120623`.`fceppdBilling`.`dateAdded` AS `dateAdded`
from
    (((((((`define20_smarterbeta120623`.`fceppdBilling`
left join `define20_smarterbeta120623`.`referralsNotification` on
    ((`define20_smarterbeta120623`.`fceppdBilling`.`referralId` = `define20_smarterbeta120623`.`referralsNotification`.`referralId`)))
left join `define20_smarterbeta120623`.`claimants` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`claimantId` = `define20_smarterbeta120623`.`claimants`.`claimantId`)))
left join `define20_smarterbeta120623`.`adjusters` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`adjusterId` = `define20_smarterbeta120623`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta120623`.`casemanagers` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`casemanagerId` = `define20_smarterbeta120623`.`casemanagers`.`casemanagerId`)))
left join `define20_smarterbeta120623`.`therapists` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`therapistId` = `define20_smarterbeta120623`.`therapists`.`therapistId`)))
left join `define20_smarterbeta120623`.`clients` `clients1` on
    ((`define20_smarterbeta120623`.`adjusters`.`clientId` = `clients1`.`clientId`)))
left join `define20_smarterbeta120623`.`clients` `clients2` on
    ((`define20_smarterbeta120623`.`casemanagers`.`clientId` = `clients2`.`clientId`)));