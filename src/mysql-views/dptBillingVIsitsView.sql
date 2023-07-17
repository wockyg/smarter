-- define20_smarterbeta.dptBillingVisitsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta`.`dptBillingVisitsview` AS
select
    `define20_smarterbeta`.`dptBillingVisits`.`billingId` AS `billingId`,
    `define20_smarterbeta`.`dptBillingVisits`.`referralId` AS `referralId`,
    `define20_smarterbeta`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    concat(`define20_smarterbeta`.`claimants`.`lastName`, ', ', `define20_smarterbeta`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta`.`claimants`.`birthDate` AS `claimantBirthDate`,
    concat(`define20_smarterbeta`.`adjusters`.`lastName`, ', ', `define20_smarterbeta`.`adjusters`.`firstName`) AS `adjuster`,
    `define20_smarterbeta`.`clients`.`client` AS `adjusterClient`,
    `define20_smarterbeta`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta`.`dptBillingVisits`.`dos` AS `dos`,
    `define20_smarterbeta`.`dptBillingVisits`.`dosTime` AS `dosTime`,
    `define20_smarterbeta`.`dptBillingVisits`.`attend` AS `attend`,
    `define20_smarterbeta`.`dptBillingVisits`.`serviceType` AS `serviceType`,
    `define20_smarterbeta`.`dptBillingVisits`.`dosNotes` AS `dosNotes`,
    `define20_smarterbeta`.`dptBillingVisits`.`notesReceived` AS `notesReceived`,
    `define20_smarterbeta`.`dptBillingVisits`.`needPN` AS `needPN`,
    `define20_smarterbeta`.`dptBillingVisits`.`v1500` AS `v1500`,
    `define20_smarterbeta`.`dptBillingVisits`.`requestV1500` AS `requestV1500`,
    `define20_smarterbeta`.`dptBillingVisits`.`v1500RequestGenerated` AS `v1500RequestGenerated`,
    `define20_smarterbeta`.`dptBillingVisits`.`v1500LastRequested` AS `v1500LastRequested`,
    `define20_smarterbeta`.`dptBillingVisits`.`d1500Generated` AS `d1500Generated`,
    `define20_smarterbeta`.`dptBillingVisits`.`d1500Sent` AS `d1500Sent`,
    `define20_smarterbeta`.`dptBillingVisits`.`d1500SendFormat` AS `d1500SendFormat`,
    `define20_smarterbeta`.`dptBillingVisits`.`hcfaId` AS `hcfaId`,
    `define20_smarterbeta`.`dptBillingVisits`.`hcfaGenerated` AS `hcfaGenerated`,
    `define20_smarterbeta`.`dptBillingVisits`.`hcfaSendFormat` AS `hcfaSendFormat`,
    `define20_smarterbeta`.`dptBillingVisits`.`adjusterRate` AS `adjusterRate`,
    `define20_smarterbeta`.`dptBillingVisits`.`adjusterDatePaid` AS `adjusterDatePaid`,
    `define20_smarterbeta`.`dptBillingVisits`.`adjusterAmountPaid` AS `adjusterAmountPaid`,
    `define20_smarterbeta`.`dptBillingVisits`.`paymentStatusDate` AS `paymentStatusDate`,
    `define20_smarterbeta`.`dptBillingVisits`.`paymentStatus` AS `paymentStatus`,
    `define20_smarterbeta`.`dptBillingVisits`.`paymentStatusIssue` AS `paymentStatusIssue`,
    `define20_smarterbeta`.`dptBillingVisits`.`rebillNeeded` AS `rebillNeeded`,
    `define20_smarterbeta`.`dptBillingVisits`.`dateRebilled` AS `dateRebilled`,
    `define20_smarterbeta`.`dptBillingVisits`.`rebillFormat` AS `rebillFormat`,
    `define20_smarterbeta`.`dptBillingVisits`.`facilityRate` AS `facilityRate`,
    `define20_smarterbeta`.`dptBillingVisits`.`facilityDatePaid` AS `facilityDatePaid`,
    `define20_smarterbeta`.`dptBillingVisits`.`facilityAmountPaid` AS `facilityAmountPaid`,
    `define20_smarterbeta`.`dptBillingVisits`.`checkNumber` AS `checkNumber`,
    `define20_smarterbeta`.`dptBillingVisits`.`writeOff` AS `writeOff`,
    `define20_smarterbeta`.`dptBillingVisits`.`dateAdded` AS `dateAdded`
from
    (((((`define20_smarterbeta`.`dptBillingVisits`
left join `define20_smarterbeta`.`referralsNotification` on
    ((`define20_smarterbeta`.`dptBillingVisits`.`referralId` = `define20_smarterbeta`.`referralsNotification`.`referralId`)))
left join `define20_smarterbeta`.`claimants` on
    ((`define20_smarterbeta`.`referralsNotification`.`claimantId` = `define20_smarterbeta`.`claimants`.`claimantId`)))
left join `define20_smarterbeta`.`adjusters` on
    ((`define20_smarterbeta`.`referralsNotification`.`adjusterId` = `define20_smarterbeta`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta`.`clients` on
    ((`define20_smarterbeta`.`adjusters`.`clientId` = `define20_smarterbeta`.`clients`.`clientId`)))
left join `define20_smarterbeta`.`therapists` on
    ((`define20_smarterbeta`.`referralsNotification`.`therapistId` = `define20_smarterbeta`.`therapists`.`therapistId`)));