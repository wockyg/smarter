-- define20_smarterbeta.referralsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta`.`referralsview` AS
select
    `define20_smarterbeta`.`referralsNotification`.`referralId` AS `referralId`,
    `define20_smarterbeta`.`referralsNotification`.`rrLastLastWorked` AS `rrLastLastWorked`,
    `define20_smarterbeta`.`referralsNotification`.`rrLastWorked` AS `rrLastWorked`,
    `define20_smarterbeta`.`referralsNotification`.`ccWorked` AS `ccWorked`,
    `define20_smarterbeta`.`referralsNotification`.`rrFaxReceived` AS `rrFaxReceived`,
    `define20_smarterbeta`.`referralsNotification`.`fceId` AS `fceId`,
    `define20_smarterbeta`.`referralsNotification`.`ptAuthId` AS `ptAuthId`,
    `define20_smarterbeta`.`referralsNotification`.`ptMaxAuthId` AS `ptMaxAuthId`,
    `define20_smarterbeta`.`referralsNotification`.`odgAttendance` AS `odgAttendance`,
    `define20_smarterbeta`.`referralsNotification`.`TotalAuthVisits` AS `TotalAuthVisits`,
    `define20_smarterbeta`.`referralsNotification`.`referralStatus` AS `referralStatus`,
    `define20_smarterbeta`.`referralsNotification`.`ptStatus` AS `ptStatus`,
    `define20_smarterbeta`.`referralsNotification`.`fuHoldNotes` AS `fuHoldNotes`,
    `define20_smarterbeta`.`referralsNotification`.`billingStatus` AS `billingStatus`,
    `define20_smarterbeta`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta`.`users`.`firstName` AS `assignFirst`,
    `define20_smarterbeta`.`users`.`lastName` AS `assignLast`,
    `define20_smarterbeta`.`users`.`phone` AS `assignPhone`,
    `define20_smarterbeta`.`users`.`email` AS `assignEmail`,
    `define20_smarterbeta`.`referralsNotification`.`referralDate` AS `referralDate`,
    `define20_smarterbeta`.`referralsNotification`.`scheduleDate` AS `scheduleDate`,
    `define20_smarterbeta`.`referralsNotification`.`spanishSpeaking` AS `spanishSpeaking`,
    `define20_smarterbeta`.`referralsNotification`.`translationNeeded` AS `translationNeeded`,
    `define20_smarterbeta`.`referralsNotification`.`transportNeeded` AS `transportNeeded`,
    `define20_smarterbeta`.`referralsNotification`.`postOp` AS `postOp`,
    `define20_smarterbeta`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta`.`referralsNotification`.`jurisdiction` AS `jurisdiction`,
    `define20_smarterbeta`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    `define20_smarterbeta`.`referralsNotification`.`icd10` AS `icd10`,
    `define20_smarterbeta`.`referralsNotification`.`approvedVisits` AS `approvedVisits`,
    `define20_smarterbeta`.`referralsNotification`.`odg` AS `odg`,
    `define20_smarterbeta`.`referralsNotification`.`odgLimitReached` AS `odgLimitReached`,
    `define20_smarterbeta`.`referralsNotification`.`odgLimitEmailSent` AS `odgLimitEmailSent`,
    `define20_smarterbeta`.`referralsNotification`.`evalAndTreat` AS `evalAndTreat`,
    `define20_smarterbeta`.`referralsNotification`.`apptDate` AS `apptDate`,
    `define20_smarterbeta`.`referralsNotification`.`apptTime` AS `apptTime`,
    `define20_smarterbeta`.`referralsNotification`.`originalApptDates` AS `originalApptDates`,
    `define20_smarterbeta`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta`.`referralsNotification`.`claimantId` AS `claimantId`,
    `define20_smarterbeta`.`claimants`.`firstName` AS `claimantFirst`,
    `define20_smarterbeta`.`claimants`.`lastName` AS `claimantLast`,
    concat(`define20_smarterbeta`.`claimants`.`lastName`, ', ', `define20_smarterbeta`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta`.`claimants`.`gender` AS `claimantGender`,
    `define20_smarterbeta`.`claimants`.`birthDate` AS `claimantBirthDate`,
    `define20_smarterbeta`.`claimants`.`injuryDate1` AS `claimantInjuryDate1`,
    `define20_smarterbeta`.`claimants`.`address` AS `claimantAddress`,
    `define20_smarterbeta`.`claimants`.`city` AS `claimantCity`,
    `define20_smarterbeta`.`claimants`.`state` AS `claimantState`,
    `define20_smarterbeta`.`claimants`.`zip` AS `claimantZip`,
    `define20_smarterbeta`.`claimants`.`phone` AS `claimantPhone`,
    `define20_smarterbeta`.`claimants`.`employerId` AS `claimantEmployerId`,
    `define20_smarterbeta`.`referralsNotification`.`therapistId` AS `therapistId`,
    `define20_smarterbeta`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarterbeta`.`referralsNotification`.`adjusterId` AS `adjusterId`,
    concat(`define20_smarterbeta`.`adjusters`.`lastName`, ', ', `define20_smarterbeta`.`adjusters`.`firstName`) AS `adjuster`,
    `define20_smarterbeta`.`clients`.`clientId` AS `adjusterClientId`,
    `define20_smarterbeta`.`clients`.`client` AS `adjusterClient`,
    `define20_smarterbeta`.`referralsNotification`.`casemanagerId` AS `casemanagerId`,
    concat(`define20_smarterbeta`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarterbeta`.`referralsNotification`.`casemanager2Id` AS `casemanager2Id`,
    concat(`casemanagers2`.`lastName`, ', ', `casemanagers2`.`firstName`) AS `casemanager2`,
    `clients3`.`client` AS `casemanager2Client`,
    `define20_smarterbeta`.`referralsNotification`.`physicianId` AS `physicianId`,
    `define20_smarterbeta`.`physicians`.`lastName` AS `physicianLast`,
    `define20_smarterbeta`.`physicians`.`firstName` AS `physicianFirst`,
    `define20_smarterbeta`.`physicians`.`facility` AS `physicianFacility`,
    `define20_smarterbeta`.`referralsNotification`.`plaintiffAttorneyId` AS `plaintiffAttorneyId`,
    concat(`define20_smarterbeta`.`attorneys`.`lastName`, ', ', `define20_smarterbeta`.`attorneys`.`firstName`) AS `plaintiffAttorney`,
    `define20_smarterbeta`.`attorneys`.`firm` AS `plaintiffAttorneyFirm`,
    `define20_smarterbeta`.`referralsNotification`.`defenseAttorneyId` AS `defenseAttorneyId`,
    concat(`attorneys2`.`lastName`, ', ', `attorneys2`.`firstName`) AS `defenseAttorney`,
    `attorneys2`.`firm` AS `defenseAttorneyFirm`,
    `define20_smarterbeta`.`referralsNotification`.`fuDrDate` AS `fuDrDate`,
    `define20_smarterbeta`.`referralsNotification`.`billingNotes` AS `billingNotes`,
    `define20_smarterbeta`.`referralsNotification`.`reminderDate` AS `reminderDate`,
    `define20_smarterbeta`.`referralsNotification`.`reminderNote` AS `reminderNote`,
    `define20_smarterbeta`.`referralsNotification`.`reminderSent` AS `reminderSent`,
    `define20_smarterbeta`.`referralsNotification`.`lastDOS` AS `lastDOS`,
    `define20_smarterbeta`.`referralsNotification`.`fuHoldTimestamp` AS `fuHoldTimeStamp`,
    `define20_smarterbeta`.`referralsNotification`.`lastAdjUpdateSent` AS `lastAdjUpdateSent`,
    `define20_smarterbeta`.`referralsNotification`.`rrIADailyWorked` AS `rrIADailyWorked`,
    `define20_smarterbeta`.`referralsNotification`.`reportStatus` AS `reportStatus`,
    `define20_smarterbeta`.`referralsNotification`.`rescheduled` AS `rescheduled`,
    `define20_smarterbeta`.`referralsNotification`.`rescheduleFlag` AS `rescheduleFlag`,
    `define20_smarterbeta`.`referralsNotification`.`rescheduleDOS` AS `rescheduleDOS`,
    `define20_smarterbeta`.`referralsNotification`.`rescheduleTime` AS `rescheduleTime`,
    `define20_smarterbeta`.`referralsNotification`.`claimantInfoFromAdjuster` AS `claimantInfoFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`rxFromAdjuster` AS `rxFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`demosFromAdjuster` AS `demosFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`ovnFromAdjuster` AS `ovnFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`ptNotesFromAdjuster` AS `ptNotesFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`jdFromAdjuster` AS `jdFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`mriFromAdjuster` AS `mriFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`postOpFromAdjuster` AS `postOpFromAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`claimantVerbalConfirm` AS `claimantVerbalConfirm`,
    `define20_smarterbeta`.`referralsNotification`.`confirmLetterToClaimant` AS `confirmLetterToClaimant`,
    `define20_smarterbeta`.`referralsNotification`.`confirmLetterToClaimantFormat` AS `confirmLetterToClaimantFormat`,
    `define20_smarterbeta`.`referralsNotification`.`confirmLetterToAdjuster` AS `confirmLetterToAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`confirmLetterToAdjusterFormat` AS `confirmLetterToAdjusterFormat`,
    `define20_smarterbeta`.`referralsNotification`.`confirmLetterToAttorney` AS `confirmLetterToAttorney`,
    `define20_smarterbeta`.`referralsNotification`.`confirmLetterToAttorneyFormat` AS `confirmLetterToAttorneyFormat`,
    `define20_smarterbeta`.`referralsNotification`.`medNotesToPT` AS `medNotesToPT`,
    `define20_smarterbeta`.`referralsNotification`.`medNotesToPTFormat` AS `medNotesToPTFormat`,
    `define20_smarterbeta`.`referralsNotification`.`claimantConfirmDayBefore` AS `claimantConfirmDayBefore`,
    `define20_smarterbeta`.`referralsNotification`.`ptConfirmDayBefore` AS `ptConfirmDayBefore`,
    `define20_smarterbeta`.`referralsNotification`.`confirmAttend` AS `confirmAttend`,
    `define20_smarterbeta`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarterbeta`.`referralsNotification`.`fceApproved` AS `fceApproved`,
    `define20_smarterbeta`.`referralsNotification`.`invoiceRequested` AS `invoiceRequested`,
    `define20_smarterbeta`.`referralsNotification`.`reportToAdjuster` AS `reportToAdjuster`,
    `define20_smarterbeta`.`referralsNotification`.`reportToAdjusterFormat` AS `reportToAdjusterFormat`,
    `define20_smarterbeta`.`referralsNotification`.`reportToPhysician` AS `reportToPhysician`,
    `define20_smarterbeta`.`referralsNotification`.`reportToPhysicianFormat` AS `reportToPhysicianFormat`,
    `define20_smarterbeta`.`referralsNotification`.`reportToAttorney` AS `reportToAttorney`,
    `define20_smarterbeta`.`referralsNotification`.`reportToAttorneyFormat` AS `reportToAttorneyFormat`,
    `define20_smarterbeta`.`referralsNotification`.`requestRecords` AS `requestRecords`
from
    ((((((((((((`define20_smarterbeta`.`referralsNotification`
left join `define20_smarterbeta`.`claimants` on
    ((`define20_smarterbeta`.`referralsNotification`.`claimantId` = `define20_smarterbeta`.`claimants`.`claimantId`)))
left join `define20_smarterbeta`.`adjusters` on
    ((`define20_smarterbeta`.`referralsNotification`.`adjusterId` = `define20_smarterbeta`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta`.`clients` on
    ((`define20_smarterbeta`.`adjusters`.`clientId` = `define20_smarterbeta`.`clients`.`clientId`)))
left join `define20_smarterbeta`.`casemanagers` on
    ((`define20_smarterbeta`.`referralsNotification`.`casemanagerId` = `define20_smarterbeta`.`casemanagers`.`casemanagerId`)))
left join `define20_smarterbeta`.`casemanagers` `casemanagers2` on
    ((`define20_smarterbeta`.`referralsNotification`.`casemanager2Id` = `casemanagers2`.`casemanagerId`)))
left join `define20_smarterbeta`.`clients` `clients2` on
    ((`define20_smarterbeta`.`casemanagers`.`clientId` = `clients2`.`clientId`)))
left join `define20_smarterbeta`.`clients` `clients3` on
    ((`casemanagers2`.`clientId` = `clients3`.`clientId`)))
left join `define20_smarterbeta`.`physicians` on
    ((`define20_smarterbeta`.`referralsNotification`.`physicianId` = `define20_smarterbeta`.`physicians`.`physicianId`)))
left join `define20_smarterbeta`.`attorneys` on
    ((`define20_smarterbeta`.`referralsNotification`.`plaintiffAttorneyId` = `define20_smarterbeta`.`attorneys`.`attorneyId`)))
left join `define20_smarterbeta`.`attorneys` `attorneys2` on
    ((`define20_smarterbeta`.`referralsNotification`.`defenseAttorneyId` = `attorneys2`.`attorneyId`)))
left join `define20_smarterbeta`.`therapists` on
    ((`define20_smarterbeta`.`referralsNotification`.`therapistId` = `define20_smarterbeta`.`therapists`.`therapistId`)))
left join `define20_smarterbeta`.`users` on
    ((`define20_smarterbeta`.`referralsNotification`.`assign` = `define20_smarterbeta`.`users`.`initials`)));