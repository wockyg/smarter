-- define20_smarterbeta2.dptBillingVisitsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta2`.`dptBillingVisitsview` AS
select
    `define20_smarterbeta2`.`dptBillingVisits`.`billingId` AS `billingId`,
    `define20_smarterbeta2`.`dptBillingVisits`.`referralId` AS `referralId`,
    `define20_smarterbeta2`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta2`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta2`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta2`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    concat(`define20_smarterbeta2`.`claimants`.`lastName`, ', ', `define20_smarterbeta2`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta2`.`claimants`.`birthDate` AS `claimantBirthDate`,
    concat(`define20_smarterbeta2`.`adjusters`.`lastName`, ', ', `define20_smarterbeta2`.`adjusters`.`firstName`) AS `adjuster`,
    `define20_smarterbeta2`.`clients`.`client` AS `adjusterClient`,
    `define20_smarterbeta2`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta2`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta2`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta2`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta2`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta2`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta2`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta2`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta2`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta2`.`therapists`.`bulkBillingId` AS `bulkBillingId`,
    `define20_smarterbeta2`.`bulkBilling`.`name` AS `bulkBillingName`,
    `define20_smarterbeta2`.`bulkBilling`.`billsMonthly` AS `billsMonthly`,
    `define20_smarterbeta2`.`bulkBilling`.`billingContact` AS `bulkBillingContact`,
    `define20_smarterbeta2`.`bulkBilling`.`billingEmail` AS `bulkBillingEmail`,
    `define20_smarterbeta2`.`dptBillingVisits`.`dos` AS `dos`,
    `define20_smarterbeta2`.`dptBillingVisits`.`dosTime` AS `dosTime`,
    `define20_smarterbeta2`.`dptBillingVisits`.`attend` AS `attend`,
    `define20_smarterbeta2`.`dptBillingVisits`.`serviceType` AS `serviceType`,
    `define20_smarterbeta2`.`dptBillingVisits`.`dosNotes` AS `dosNotes`,
    `define20_smarterbeta2`.`dptBillingVisits`.`notesReceived` AS `notesReceived`,
    `define20_smarterbeta2`.`dptBillingVisits`.`needPN` AS `needPN`,
    `define20_smarterbeta2`.`dptBillingVisits`.`v1500` AS `v1500`,
    `define20_smarterbeta2`.`dptBillingVisits`.`v1500Status` AS `v1500Status`,
    `define20_smarterbeta2`.`dptBillingVisits`.`requestV1500` AS `requestV1500`,
    `define20_smarterbeta2`.`dptBillingVisits`.`v1500RequestGenerated` AS `v1500RequestGenerated`,
    `define20_smarterbeta2`.`dptBillingVisits`.`v1500LastRequested` AS `v1500LastRequested`,
    `define20_smarterbeta2`.`dptBillingVisits`.`d1500Generated` AS `d1500Generated`,
    `define20_smarterbeta2`.`dptBillingVisits`.`d1500Sent` AS `d1500Sent`,
    `define20_smarterbeta2`.`dptBillingVisits`.`d1500SendFormat` AS `d1500SendFormat`,
    `define20_smarterbeta2`.`dptBillingVisits`.`hcfaId` AS `hcfaId`,
    `define20_smarterbeta2`.`dptBillingVisits`.`hcfaGenerated` AS `hcfaGenerated`,
    `define20_smarterbeta2`.`dptBillingVisits`.`hcfaSendFormat` AS `hcfaSendFormat`,
    `define20_smarterbeta2`.`dptBillingVisits`.`adjusterRate` AS `adjusterRate`,
    `define20_smarterbeta2`.`dptBillingVisits`.`adjusterDatePaid` AS `adjusterDatePaid`,
    `define20_smarterbeta2`.`dptBillingVisits`.`adjusterAmountPaid` AS `adjusterAmountPaid`,
    `define20_smarterbeta2`.`dptBillingVisits`.`paymentStatusDate` AS `paymentStatusDate`,
    `define20_smarterbeta2`.`dptBillingVisits`.`paymentStatus` AS `paymentStatus`,
    `define20_smarterbeta2`.`dptBillingVisits`.`paymentStatusIssue` AS `paymentStatusIssue`,
    `define20_smarterbeta2`.`dptBillingVisits`.`rebillNeeded` AS `rebillNeeded`,
    `define20_smarterbeta2`.`dptBillingVisits`.`dateRebilled` AS `dateRebilled`,
    `define20_smarterbeta2`.`dptBillingVisits`.`rebillFormat` AS `rebillFormat`,
    `define20_smarterbeta2`.`dptBillingVisits`.`facilityRate` AS `facilityRate`,
    `define20_smarterbeta2`.`dptBillingVisits`.`facilityDatePaid` AS `facilityDatePaid`,
    `define20_smarterbeta2`.`dptBillingVisits`.`facilityAmountPaid` AS `facilityAmountPaid`,
    `define20_smarterbeta2`.`dptBillingVisits`.`checkNumber` AS `checkNumber`,
    `define20_smarterbeta2`.`dptBillingVisits`.`writeOff` AS `writeOff`,
    `define20_smarterbeta2`.`dptBillingVisits`.`dateAdded` AS `dateAdded`
from
    ((((((`define20_smarterbeta2`.`dptBillingVisits`
left join `define20_smarterbeta2`.`referralsNotification` on
    ((`define20_smarterbeta2`.`dptBillingVisits`.`referralId` = `define20_smarterbeta2`.`referralsNotification`.`referralId`)))
left join `define20_smarterbeta2`.`claimants` on
    ((`define20_smarterbeta2`.`referralsNotification`.`claimantId` = `define20_smarterbeta2`.`claimants`.`claimantId`)))
left join `define20_smarterbeta2`.`adjusters` on
    ((`define20_smarterbeta2`.`referralsNotification`.`adjusterId` = `define20_smarterbeta2`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta2`.`clients` on
    ((`define20_smarterbeta2`.`adjusters`.`clientId` = `define20_smarterbeta2`.`clients`.`clientId`)))
left join `define20_smarterbeta2`.`therapists` on
    ((`define20_smarterbeta2`.`referralsNotification`.`therapistId` = `define20_smarterbeta2`.`therapists`.`therapistId`)))
left join `define20_smarterbeta2`.`bulkBilling` on
    ((`define20_smarterbeta2`.`therapists`.`bulkBillingId` = `define20_smarterbeta2`.`bulkBilling`.`bulkBillingId`)));