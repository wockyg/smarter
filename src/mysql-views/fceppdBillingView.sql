-- define20_smarterbeta2.fceppdBillingview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta2`.`fceppdBillingview` AS
select
    `define20_smarterbeta2`.`fceppdBilling`.`fceId` AS `fceId`,
    `define20_smarterbeta2`.`fceppdBilling`.`referralId` AS `referralId`,
    `define20_smarterbeta2`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta2`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta2`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta2`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    concat(`define20_smarterbeta2`.`claimants`.`lastName`, ', ', `define20_smarterbeta2`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta2`.`claimants`.`birthDate` AS `claimantBirthDate`,
    concat(`define20_smarterbeta2`.`adjusters`.`lastName`, ', ', `define20_smarterbeta2`.`adjusters`.`firstName`) AS `adjuster`,
    `clients1`.`client` AS `adjusterClient`,
    concat(`define20_smarterbeta2`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta2`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarterbeta2`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta2`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta2`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta2`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta2`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta2`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta2`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta2`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta2`.`referralsNotification`.`apptDate` AS `dos`,
    `define20_smarterbeta2`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarterbeta2`.`fceppdBilling`.`v1500` AS `v1500`,
    `define20_smarterbeta2`.`fceppdBilling`.`d1500Sent` AS `d1500Sent`,
    `define20_smarterbeta2`.`fceppdBilling`.`d1500SendFormat` AS `d1500SendFormat`,
    `define20_smarterbeta2`.`fceppdBilling`.`adjusterRate` AS `adjusterRate`,
    `define20_smarterbeta2`.`fceppdBilling`.`adjusterRateAdjustment` AS `adjusterRateAdjustment`,
    `define20_smarterbeta2`.`fceppdBilling`.`paymentStatusDate` AS `paymentStatusDate`,
    `define20_smarterbeta2`.`fceppdBilling`.`paymentStatus` AS `paymentStatus`,
    `define20_smarterbeta2`.`fceppdBilling`.`rebillNeeded` AS `rebillNeeded`,
    `define20_smarterbeta2`.`fceppdBilling`.`dateRebilled` AS `dateRebilled`,
    `define20_smarterbeta2`.`fceppdBilling`.`rebillFormat` AS `rebillFormat`,
    `define20_smarterbeta2`.`fceppdBilling`.`adjusterDatePaid` AS `adjusterDatePaid`,
    `define20_smarterbeta2`.`fceppdBilling`.`adjusterAmountPaid` AS `adjusterAmountPaid`,
    `define20_smarterbeta2`.`fceppdBilling`.`facilityRate` AS `facilityRate`,
    `define20_smarterbeta2`.`fceppdBilling`.`facilityDatePaid` AS `facilityDatePaid`,
    `define20_smarterbeta2`.`fceppdBilling`.`facilityAmountPaid` AS `facilityAmountPaid`,
    `define20_smarterbeta2`.`fceppdBilling`.`checkNumber` AS `checkNumber`,
    `define20_smarterbeta2`.`fceppdBilling`.`writeOff` AS `writeOff`,
    `define20_smarterbeta2`.`fceppdBilling`.`dateAdded` AS `dateAdded`
from
    (((((((`define20_smarterbeta2`.`fceppdBilling`
left join `define20_smarterbeta2`.`referralsNotification` on
    ((`define20_smarterbeta2`.`fceppdBilling`.`referralId` = `define20_smarterbeta2`.`referralsNotification`.`referralId`)))
left join `define20_smarterbeta2`.`claimants` on
    ((`define20_smarterbeta2`.`referralsNotification`.`claimantId` = `define20_smarterbeta2`.`claimants`.`claimantId`)))
left join `define20_smarterbeta2`.`adjusters` on
    ((`define20_smarterbeta2`.`referralsNotification`.`adjusterId` = `define20_smarterbeta2`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta2`.`casemanagers` on
    ((`define20_smarterbeta2`.`referralsNotification`.`casemanagerId` = `define20_smarterbeta2`.`casemanagers`.`casemanagerId`)))
left join `define20_smarterbeta2`.`therapists` on
    ((`define20_smarterbeta2`.`referralsNotification`.`therapistId` = `define20_smarterbeta2`.`therapists`.`therapistId`)))
left join `define20_smarterbeta2`.`clients` `clients1` on
    ((`define20_smarterbeta2`.`adjusters`.`clientId` = `clients1`.`clientId`)))
left join `define20_smarterbeta2`.`clients` `clients2` on
    ((`define20_smarterbeta2`.`casemanagers`.`clientId` = `clients2`.`clientId`)));