-- define20_smarterbeta.fceppdBillingview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta`.`fceppdBillingview` AS
select
    `define20_smarterbeta`.`fceppdBilling`.`fceId` AS `fceId`,
    `define20_smarterbeta`.`fceppdBilling`.`referralId` AS `referralId`,
    `define20_smarterbeta`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    concat(`define20_smarterbeta`.`claimants`.`lastName`, ', ', `define20_smarterbeta`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta`.`claimants`.`birthDate` AS `claimantBirthDate`,
    concat(`define20_smarterbeta`.`adjusters`.`lastName`, ', ', `define20_smarterbeta`.`adjusters`.`firstName`) AS `adjuster`,
    `clients1`.`client` AS `adjusterClient`,
    concat(`define20_smarterbeta`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarterbeta`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta`.`referralsNotification`.`apptDate` AS `dos`,
    `define20_smarterbeta`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarterbeta`.`fceppdBilling`.`v1500` AS `v1500`,
    `define20_smarterbeta`.`fceppdBilling`.`d1500Sent` AS `d1500Sent`,
    `define20_smarterbeta`.`fceppdBilling`.`d1500SendFormat` AS `d1500SendFormat`,
    `define20_smarterbeta`.`fceppdBilling`.`adjusterRate` AS `adjusterRate`,
    `define20_smarterbeta`.`fceppdBilling`.`adjusterRateAdjustment` AS `adjusterRateAdjustment`,
    `define20_smarterbeta`.`fceppdBilling`.`paymentStatusDate` AS `paymentStatusDate`,
    `define20_smarterbeta`.`fceppdBilling`.`paymentStatus` AS `paymentStatus`,
    `define20_smarterbeta`.`fceppdBilling`.`rebillNeeded` AS `rebillNeeded`,
    `define20_smarterbeta`.`fceppdBilling`.`dateRebilled` AS `dateRebilled`,
    `define20_smarterbeta`.`fceppdBilling`.`rebillFormat` AS `rebillFormat`,
    `define20_smarterbeta`.`fceppdBilling`.`adjusterDatePaid` AS `adjusterDatePaid`,
    `define20_smarterbeta`.`fceppdBilling`.`adjusterAmountPaid` AS `adjusterAmountPaid`,
    `define20_smarterbeta`.`fceppdBilling`.`facilityRate` AS `facilityRate`,
    `define20_smarterbeta`.`fceppdBilling`.`facilityDatePaid` AS `facilityDatePaid`,
    `define20_smarterbeta`.`fceppdBilling`.`facilityAmountPaid` AS `facilityAmountPaid`,
    `define20_smarterbeta`.`fceppdBilling`.`checkNumber` AS `checkNumber`,
    `define20_smarterbeta`.`fceppdBilling`.`writeOff` AS `writeOff`,
    `define20_smarterbeta`.`fceppdBilling`.`dateAdded` AS `dateAdded`
from
    (((((((`define20_smarterbeta`.`fceppdBilling`
left join `define20_smarterbeta`.`referralsNotification` on
    ((`define20_smarterbeta`.`fceppdBilling`.`referralId` = `define20_smarterbeta`.`referralsNotification`.`referralId`)))
left join `define20_smarterbeta`.`claimants` on
    ((`define20_smarterbeta`.`referralsNotification`.`claimantId` = `define20_smarterbeta`.`claimants`.`claimantId`)))
left join `define20_smarterbeta`.`adjusters` on
    ((`define20_smarterbeta`.`referralsNotification`.`adjusterId` = `define20_smarterbeta`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta`.`casemanagers` on
    ((`define20_smarterbeta`.`referralsNotification`.`casemanagerId` = `define20_smarterbeta`.`casemanagers`.`casemanagerId`)))
left join `define20_smarterbeta`.`therapists` on
    ((`define20_smarterbeta`.`referralsNotification`.`therapistId` = `define20_smarterbeta`.`therapists`.`therapistId`)))
left join `define20_smarterbeta`.`clients` `clients1` on
    ((`define20_smarterbeta`.`adjusters`.`clientId` = `clients1`.`clientId`)))
left join `define20_smarterbeta`.`clients` `clients2` on
    ((`define20_smarterbeta`.`casemanagers`.`clientId` = `clients2`.`clientId`)));