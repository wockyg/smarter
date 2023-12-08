-- define20_smarterbeta120623.referralsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta120623`.`referralsview` AS
select
    `define20_smarterbeta120623`.`referralsNotification`.`referralId` AS `referralId`,
    `define20_smarterbeta120623`.`referralsNotification`.`rrLastLastWorked` AS `rrLastLastWorked`,
    `define20_smarterbeta120623`.`referralsNotification`.`rrLastWorked` AS `rrLastWorked`,
    `define20_smarterbeta120623`.`referralsNotification`.`ccWorked` AS `ccWorked`,
    `define20_smarterbeta120623`.`referralsNotification`.`rrFaxReceived` AS `rrFaxReceived`,
    `define20_smarterbeta120623`.`referralsNotification`.`fceId` AS `fceId`,
    `define20_smarterbeta120623`.`referralsNotification`.`ptAuthId` AS `ptAuthId`,
    `define20_smarterbeta120623`.`referralsNotification`.`ptMaxAuthId` AS `ptMaxAuthId`,
    `define20_smarterbeta120623`.`referralsNotification`.`odgAttendance` AS `odgAttendance`,
    `define20_smarterbeta120623`.`referralsNotification`.`TotalAuthVisits` AS `TotalAuthVisits`,
    `define20_smarterbeta120623`.`referralsNotification`.`referralStatus` AS `referralStatus`,
    `define20_smarterbeta120623`.`referralsNotification`.`ptStatus` AS `ptStatus`,
    `define20_smarterbeta120623`.`referralsNotification`.`fuHoldNotes` AS `fuHoldNotes`,
    `define20_smarterbeta120623`.`referralsNotification`.`billingStatus` AS `billingStatus`,
    `define20_smarterbeta120623`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta120623`.`users`.`firstName` AS `assignFirst`,
    `define20_smarterbeta120623`.`users`.`lastName` AS `assignLast`,
    `define20_smarterbeta120623`.`users`.`phone` AS `assignPhone`,
    `define20_smarterbeta120623`.`users`.`email` AS `assignEmail`,
    `define20_smarterbeta120623`.`referralsNotification`.`referralDate` AS `referralDate`,
    `define20_smarterbeta120623`.`referralsNotification`.`scheduleDate` AS `scheduleDate`,
    `define20_smarterbeta120623`.`referralsNotification`.`spanishSpeaking` AS `spanishSpeaking`,
    `define20_smarterbeta120623`.`referralsNotification`.`translationNeeded` AS `translationNeeded`,
    `define20_smarterbeta120623`.`referralsNotification`.`transportNeeded` AS `transportNeeded`,
    `define20_smarterbeta120623`.`referralsNotification`.`postOp` AS `postOp`,
    `define20_smarterbeta120623`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta120623`.`referralsNotification`.`jurisdiction` AS `jurisdiction`,
    `define20_smarterbeta120623`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    `define20_smarterbeta120623`.`referralsNotification`.`icd10` AS `icd10`,
    `define20_smarterbeta120623`.`referralsNotification`.`approvedVisits` AS `approvedVisits`,
    `define20_smarterbeta120623`.`referralsNotification`.`odg` AS `odg`,
    `define20_smarterbeta120623`.`referralsNotification`.`odgLimitReached` AS `odgLimitReached`,
    `define20_smarterbeta120623`.`referralsNotification`.`odgLimitEmailSent` AS `odgLimitEmailSent`,
    `define20_smarterbeta120623`.`referralsNotification`.`evalAndTreat` AS `evalAndTreat`,
    `define20_smarterbeta120623`.`referralsNotification`.`apptDate` AS `apptDate`,
    `define20_smarterbeta120623`.`referralsNotification`.`apptTime` AS `apptTime`,
    `define20_smarterbeta120623`.`referralsNotification`.`originalApptDates` AS `originalApptDates`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimantId` AS `claimantId`,
    `define20_smarterbeta120623`.`claimants`.`firstName` AS `claimantFirst`,
    `define20_smarterbeta120623`.`claimants`.`lastName` AS `claimantLast`,
    concat(`define20_smarterbeta120623`.`claimants`.`lastName`, ', ', `define20_smarterbeta120623`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta120623`.`claimants`.`gender` AS `claimantGender`,
    `define20_smarterbeta120623`.`claimants`.`birthDate` AS `claimantBirthDate`,
    `define20_smarterbeta120623`.`claimants`.`injuryDate1` AS `claimantInjuryDate1`,
    `define20_smarterbeta120623`.`claimants`.`address` AS `claimantAddress`,
    `define20_smarterbeta120623`.`claimants`.`city` AS `claimantCity`,
    `define20_smarterbeta120623`.`claimants`.`state` AS `claimantState`,
    `define20_smarterbeta120623`.`claimants`.`zip` AS `claimantZip`,
    `define20_smarterbeta120623`.`claimants`.`phone` AS `claimantPhone`,
    `define20_smarterbeta120623`.`claimants`.`employerId` AS `claimantEmployerId`,
    `define20_smarterbeta120623`.`employers`.`name` AS `employer`,
    `define20_smarterbeta120623`.`employers`.`address` AS `employerAddress`,
    `define20_smarterbeta120623`.`employers`.`city` AS `employerCity`,
    `define20_smarterbeta120623`.`employers`.`state` AS `employerState`,
    `define20_smarterbeta120623`.`employers`.`zip` AS `employerZip`,
    `define20_smarterbeta120623`.`referralsNotification`.`therapistId` AS `therapistId`,
    `define20_smarterbeta120623`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta120623`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta120623`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta120623`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta120623`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta120623`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta120623`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta120623`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta120623`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta120623`.`therapists`.`rrFaxPreference` AS `rrFaxPreference`,
    `define20_smarterbeta120623`.`therapists`.`rrFax` AS `rrFax`,
    `define20_smarterbeta120623`.`therapists`.`rrEmailPreference` AS `rrEmailPreference`,
    `define20_smarterbeta120623`.`therapists`.`rrEmail` AS `rrEmail`,
    `define20_smarterbeta120623`.`therapists`.`rrPhonePreference` AS `rrPhonePreference`,
    `define20_smarterbeta120623`.`therapists`.`rrPhone` AS `rrPhone`,
    concat(`define20_smarterbeta120623`.`therapists`.`name`, ' :: ', `define20_smarterbeta120623`.`therapists`.`address`, ', ', `define20_smarterbeta120623`.`therapists`.`city`, ', ', `define20_smarterbeta120623`.`therapists`.`state`, ' ', `define20_smarterbeta120623`.`therapists`.`zip`) AS `therapistBeaver`,
    `define20_smarterbeta120623`.`referralsNotification`.`adjusterId` AS `adjusterId`,
    concat(`define20_smarterbeta120623`.`adjusters`.`lastName`, ', ', `define20_smarterbeta120623`.`adjusters`.`firstName`) AS `adjuster`,
    concat(`define20_smarterbeta120623`.`adjusters`.`lastName`, ', ', `define20_smarterbeta120623`.`adjusters`.`firstName`, ' | ', `define20_smarterbeta120623`.`clients`.`client`) AS `adjusterBeaver`,
    `define20_smarterbeta120623`.`clients`.`clientId` AS `adjusterClientId`,
    `define20_smarterbeta120623`.`clients`.`client` AS `adjusterClient`,
    `define20_smarterbeta120623`.`clients`.`client` AS `adjusterClientMailingAddress`,
    `define20_smarterbeta120623`.`referralsNotification`.`casemanagerId` AS `casemanagerId`,
    concat(`define20_smarterbeta120623`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta120623`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarterbeta120623`.`referralsNotification`.`casemanager2Id` AS `casemanager2Id`,
    concat(`casemanagers2`.`lastName`, ', ', `casemanagers2`.`firstName`) AS `casemanager2`,
    `clients3`.`client` AS `casemanager2Client`,
    `define20_smarterbeta120623`.`referralsNotification`.`physicianId` AS `physicianId`,
    `define20_smarterbeta120623`.`physicians`.`lastName` AS `physicianLast`,
    `define20_smarterbeta120623`.`physicians`.`firstName` AS `physicianFirst`,
    `define20_smarterbeta120623`.`physicians`.`npi` AS `physicianNPI`,
    `define20_smarterbeta120623`.`physicians`.`facility` AS `physicianFacility`,
    `define20_smarterbeta120623`.`referralsNotification`.`plaintiffAttorneyId` AS `plaintiffAttorneyId`,
    concat(`define20_smarterbeta120623`.`attorneys`.`lastName`, ', ', `define20_smarterbeta120623`.`attorneys`.`firstName`) AS `plaintiffAttorney`,
    `define20_smarterbeta120623`.`attorneys`.`firm` AS `plaintiffAttorneyFirm`,
    `define20_smarterbeta120623`.`referralsNotification`.`defenseAttorneyId` AS `defenseAttorneyId`,
    concat(`attorneys2`.`lastName`, ', ', `attorneys2`.`firstName`) AS `defenseAttorney`,
    `attorneys2`.`firm` AS `defenseAttorneyFirm`,
    `define20_smarterbeta120623`.`referralsNotification`.`fuDrDate` AS `fuDrDate`,
    `define20_smarterbeta120623`.`referralsNotification`.`billingNotes` AS `billingNotes`,
    `define20_smarterbeta120623`.`referralsNotification`.`reminderDate` AS `reminderDate`,
    `define20_smarterbeta120623`.`referralsNotification`.`reminderNote` AS `reminderNote`,
    `define20_smarterbeta120623`.`referralsNotification`.`reminderWorked` AS `reminderWorked`,
    `define20_smarterbeta120623`.`referralsNotification`.`lastDOS` AS `lastDOS`,
    `define20_smarterbeta120623`.`referralsNotification`.`fuHoldTimestamp` AS `fuHoldTimeStamp`,
    `define20_smarterbeta120623`.`referralsNotification`.`lastAdjUpdateSent` AS `lastAdjUpdateSent`,
    `define20_smarterbeta120623`.`referralsNotification`.`rrIADailyWorked` AS `rrIADailyWorked`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportStatus` AS `reportStatus`,
    `define20_smarterbeta120623`.`referralsNotification`.`rescheduled` AS `rescheduled`,
    `define20_smarterbeta120623`.`referralsNotification`.`rescheduleFlag` AS `rescheduleFlag`,
    `define20_smarterbeta120623`.`referralsNotification`.`rescheduleDOS` AS `rescheduleDOS`,
    `define20_smarterbeta120623`.`referralsNotification`.`rescheduleTime` AS `rescheduleTime`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimantInfoFromAdjuster` AS `claimantInfoFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`rxFromAdjuster` AS `rxFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`demosFromAdjuster` AS `demosFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`ovnFromAdjuster` AS `ovnFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`ptNotesFromAdjuster` AS `ptNotesFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`jdFromAdjuster` AS `jdFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`mriFromAdjuster` AS `mriFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`postOpFromAdjuster` AS `postOpFromAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimantVerbalConfirm` AS `claimantVerbalConfirm`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmLetterToClaimant` AS `confirmLetterToClaimant`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmLetterToClaimantFormat` AS `confirmLetterToClaimantFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmLetterToAdjuster` AS `confirmLetterToAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmLetterToAdjusterFormat` AS `confirmLetterToAdjusterFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmLetterToAttorney` AS `confirmLetterToAttorney`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmLetterToAttorneyFormat` AS `confirmLetterToAttorneyFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`medNotesToPT` AS `medNotesToPT`,
    `define20_smarterbeta120623`.`referralsNotification`.`medNotesToPTFormat` AS `medNotesToPTFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`claimantConfirmDayBefore` AS `claimantConfirmDayBefore`,
    `define20_smarterbeta120623`.`referralsNotification`.`ptConfirmDayBefore` AS `ptConfirmDayBefore`,
    `define20_smarterbeta120623`.`referralsNotification`.`confirmAttend` AS `confirmAttend`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarterbeta120623`.`referralsNotification`.`fceApproved` AS `fceApproved`,
    `define20_smarterbeta120623`.`referralsNotification`.`invoiceRequested` AS `invoiceRequested`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportToAdjuster` AS `reportToAdjuster`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportToAdjusterFormat` AS `reportToAdjusterFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportToPhysician` AS `reportToPhysician`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportToPhysicianFormat` AS `reportToPhysicianFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportToAttorney` AS `reportToAttorney`,
    `define20_smarterbeta120623`.`referralsNotification`.`reportToAttorneyFormat` AS `reportToAttorneyFormat`,
    `define20_smarterbeta120623`.`referralsNotification`.`requestRecords` AS `requestRecords`
from
    (((((((((((((`define20_smarterbeta120623`.`referralsNotification`
left join `define20_smarterbeta120623`.`claimants` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`claimantId` = `define20_smarterbeta120623`.`claimants`.`claimantId`)))
left join `define20_smarterbeta120623`.`employers` on
    ((`define20_smarterbeta120623`.`claimants`.`employerId` = `define20_smarterbeta120623`.`employers`.`employerId`)))
left join `define20_smarterbeta120623`.`adjusters` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`adjusterId` = `define20_smarterbeta120623`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta120623`.`clients` on
    ((`define20_smarterbeta120623`.`adjusters`.`clientId` = `define20_smarterbeta120623`.`clients`.`clientId`)))
left join `define20_smarterbeta120623`.`casemanagers` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`casemanagerId` = `define20_smarterbeta120623`.`casemanagers`.`casemanagerId`)))
left join `define20_smarterbeta120623`.`casemanagers` `casemanagers2` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`casemanager2Id` = `casemanagers2`.`casemanagerId`)))
left join `define20_smarterbeta120623`.`clients` `clients2` on
    ((`define20_smarterbeta120623`.`casemanagers`.`clientId` = `clients2`.`clientId`)))
left join `define20_smarterbeta120623`.`clients` `clients3` on
    ((`casemanagers2`.`clientId` = `clients3`.`clientId`)))
left join `define20_smarterbeta120623`.`physicians` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`physicianId` = `define20_smarterbeta120623`.`physicians`.`physicianId`)))
left join `define20_smarterbeta120623`.`attorneys` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`plaintiffAttorneyId` = `define20_smarterbeta120623`.`attorneys`.`attorneyId`)))
left join `define20_smarterbeta120623`.`attorneys` `attorneys2` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`defenseAttorneyId` = `attorneys2`.`attorneyId`)))
left join `define20_smarterbeta120623`.`therapists` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`therapistId` = `define20_smarterbeta120623`.`therapists`.`therapistId`)))
left join `define20_smarterbeta120623`.`users` on
    ((`define20_smarterbeta120623`.`referralsNotification`.`assign` = `define20_smarterbeta120623`.`users`.`initials`)));