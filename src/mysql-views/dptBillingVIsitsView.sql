-- define20_smarterbeta120623.dptBillingVisitsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`dptBillingVisitsview` AS
select
    `define20_smarterbeta120623`.`dptBillingVisits`.`billingId` AS `billingId`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`referralId` AS `referralId`,
    `define20_smarterbeta120623`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta120623`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta120623`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    concat(`define20_smarterbeta120623`.`claimants`.`lastName`, ', ', `define20_smarterbeta120623`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta120623`.`claimants`.`birthDate` AS `claimantBirthDate`,
    concat(`define20_smarterbeta120623`.`adjusters`.`lastName`, ', ', `define20_smarterbeta120623`.`adjusters`.`firstName`) AS `adjuster`,
    `define20_smarterbeta120623`.`clients`.`client` AS `adjusterClient`,
    `define20_smarterbeta120623`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta120623`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta120623`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta120623`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta120623`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta120623`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta120623`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta120623`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta120623`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta120623`.`therapists`.`bulkBillingId` AS `bulkBillingId`,
    `define20_smarterbeta120623`.`bulkBilling`.`name` AS `bulkBillingName`,
    `define20_smarterbeta120623`.`bulkBilling`.`billsMonthly` AS `billsMonthly`,
    `define20_smarterbeta120623`.`bulkBilling`.`billingContact` AS `bulkBillingContact`,
    `define20_smarterbeta120623`.`bulkBilling`.`billingEmail` AS `bulkBillingEmail`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`dos` AS `dos`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`dosTime` AS `dosTime`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`attend` AS `attend`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`serviceType` AS `serviceType`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`dosNotes` AS `dosNotes`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`notesReceived` AS `notesReceived`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`needPN` AS `needPN`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`v1500` AS `v1500`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`v1500Status` AS `v1500Status`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`requestV1500` AS `requestV1500`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`v1500RequestGenerated` AS `v1500RequestGenerated`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`v1500LastRequested` AS `v1500LastRequested`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`d1500Generated` AS `d1500Generated`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`d1500Sent` AS `d1500Sent`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`d1500SendFormat` AS `d1500SendFormat`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`hcfaId` AS `hcfaId`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`hcfaGenerated` AS `hcfaGenerated`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`hcfaSendFormat` AS `hcfaSendFormat`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`adjusterRate` AS `adjusterRate`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`adjusterDatePaid` AS `adjusterDatePaid`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`adjusterAmountPaid` AS `adjusterAmountPaid`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`paymentStatusDate` AS `paymentStatusDate`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`paymentStatus` AS `paymentStatus`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`paymentStatusIssue` AS `paymentStatusIssue`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`rebillNeeded` AS `rebillNeeded`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`dateRebilled` AS `dateRebilled`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`rebillFormat` AS `rebillFormat`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`facilityRate` AS `facilityRate`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`facilityDatePaid` AS `facilityDatePaid`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`facilityAmountPaid` AS `facilityAmountPaid`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`checkNumber` AS `checkNumber`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`writeOff` AS `writeOff`,
    `define20_smarterbeta120623`.`dptBillingVisits`.`dateAdded` AS `dateAdded`
from
    ((((((`define20_smarterbeta120623`.`dptBillingVisits`
left join `define20_smarterbeta120623`.`referralsNotification` on
    ((`define20_smarterbeta120623`.`dptBillingVisits`.`referralId` = `define20_smarterbeta120623`.`referralsNotification`.`referralId`)))
left join `define20_smarterbeta120623`.`claimants` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`claimantId` = `define20_smarterbeta120623`.`claimants`.`claimantId`)))
left join `define20_smarterbeta120623`.`adjusters` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`adjusterId` = `define20_smarterbeta120623`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta120623`.`clients` on
    ((`define20_smarterbeta120623`.`adjusters`.`clientId` = `define20_smarterbeta120623`.`clients`.`clientId`)))
left join `define20_smarterbeta120623`.`therapists` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`therapistId` = `define20_smarterbeta120623`.`therapists`.`therapistId`)))
left join `define20_smarterbeta120623`.`bulkBilling` on
    ((`define20_smarterbeta120623`.`therapists`.`bulkBillingId` = `define20_smarterbeta120623`.`bulkBilling`.`bulkBillingId`)));