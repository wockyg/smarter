-- define20_smarter2.referralsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarter2`.`referralsview` AS
select
    `define20_smarter2`.`referralsNotification`.`referralId` AS `referralId`,
    `define20_smarter2`.`referralsNotification`.`rrLastLastWorked` AS `rrLastLastWorked`,
    `define20_smarter2`.`referralsNotification`.`rrLastWorked` AS `rrLastWorked`,
    `define20_smarter2`.`referralsNotification`.`ccWorked` AS `ccWorked`,
    `define20_smarter2`.`referralsNotification`.`rrFaxReceived` AS `rrFaxReceived`,
    `define20_smarter2`.`referralsNotification`.`fceId` AS `fceId`,
    `define20_smarter2`.`referralsNotification`.`ptAuthId` AS `ptAuthId`,
    `define20_smarter2`.`referralsNotification`.`ptMaxAuthId` AS `ptMaxAuthId`,
    `define20_smarter2`.`referralsNotification`.`odgAttendance` AS `odgAttendance`,
    `define20_smarter2`.`referralsNotification`.`TotalAuthVisits` AS `TotalAuthVisits`,
    `define20_smarter2`.`referralsNotification`.`referralStatus` AS `referralStatus`,
    `define20_smarter2`.`referralsNotification`.`ptStatus` AS `ptStatus`,
    `define20_smarter2`.`referralsNotification`.`ptStatusPrev` AS `ptStatusPrev`,
    `define20_smarter2`.`referralsNotification`.`fuHoldNotes` AS `fuHoldNotes`,
    `define20_smarter2`.`referralsNotification`.`fuHoldNotesPrev` AS `fuHoldNotesPrev`,
    `define20_smarter2`.`referralsNotification`.`billingStatus` AS `billingStatus`,
    `define20_smarter2`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarter2`.`users`.`firstName` AS `assignFirst`,
    `define20_smarter2`.`users`.`lastName` AS `assignLast`,
    `define20_smarter2`.`users`.`phone` AS `assignPhone`,
    `define20_smarter2`.`users`.`email` AS `assignEmail`,
    `define20_smarter2`.`referralsNotification`.`referralDate` AS `referralDate`,
    `define20_smarter2`.`referralsNotification`.`scheduleDate` AS `scheduleDate`,
    `define20_smarter2`.`referralsNotification`.`spanishSpeaking` AS `spanishSpeaking`,
    `define20_smarter2`.`referralsNotification`.`translationNeeded` AS `translationNeeded`,
    `define20_smarter2`.`referralsNotification`.`transportNeeded` AS `transportNeeded`,
    `define20_smarter2`.`referralsNotification`.`postOp` AS `postOp`,
    `define20_smarter2`.`referralsNotification`.`service` AS `service`,
    `define20_smarter2`.`referralsNotification`.`jurisdiction` AS `jurisdiction`,
    `define20_smarter2`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    `define20_smarter2`.`referralsNotification`.`icd10` AS `icd10`,
    `define20_smarter2`.`referralsNotification`.`approvedVisits` AS `approvedVisits`,
    `define20_smarter2`.`referralsNotification`.`odg` AS `odg`,
    `define20_smarter2`.`referralsNotification`.`odgLimitReached` AS `odgLimitReached`,
    `define20_smarter2`.`referralsNotification`.`odgLimitEmailSent` AS `odgLimitEmailSent`,
    `define20_smarter2`.`referralsNotification`.`evalAndTreat` AS `evalAndTreat`,
    `define20_smarter2`.`referralsNotification`.`apptDate` AS `apptDate`,
    `define20_smarter2`.`referralsNotification`.`apptTime` AS `apptTime`,
    `define20_smarter2`.`referralsNotification`.`originalApptDates` AS `originalApptDates`,
    `define20_smarter2`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarter2`.`referralsNotification`.`claimantId` AS `claimantId`,
    `define20_smarter2`.`claimants`.`firstName` AS `claimantFirst`,
    `define20_smarter2`.`claimants`.`lastName` AS `claimantLast`,
    concat(`define20_smarter2`.`claimants`.`lastName`, ', ', `define20_smarter2`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarter2`.`claimants`.`gender` AS `claimantGender`,
    `define20_smarter2`.`claimants`.`birthDate` AS `claimantBirthDate`,
    `define20_smarter2`.`claimants`.`injuryDate1` AS `claimantInjuryDate1`,
    `define20_smarter2`.`claimants`.`address` AS `claimantAddress`,
    `define20_smarter2`.`claimants`.`city` AS `claimantCity`,
    `define20_smarter2`.`claimants`.`state` AS `claimantState`,
    `define20_smarter2`.`claimants`.`zip` AS `claimantZip`,
    `define20_smarter2`.`claimants`.`phone` AS `claimantPhone`,
    `define20_smarter2`.`claimants`.`employerId` AS `claimantEmployerId`,
    `define20_smarter2`.`referralsNotification`.`therapistId` AS `therapistId`,
    `define20_smarter2`.`therapists`.`name` AS `therapist`,
    `define20_smarter2`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarter2`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarter2`.`therapists`.`city` AS `therapistCity`,
    `define20_smarter2`.`therapists`.`state` AS `therapistState`,
    `define20_smarter2`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarter2`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarter2`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarter2`.`therapists`.`fax` AS `therapistFax`,
    `define20_smarter2`.`referralsNotification`.`adjusterId` AS `adjusterId`,
    concat(`define20_smarter2`.`adjusters`.`lastName`, ', ', `define20_smarter2`.`adjusters`.`firstName`) AS `adjuster`,
    `define20_smarter2`.`clients`.`clientId` AS `adjusterClientId`,
    `define20_smarter2`.`clients`.`client` AS `adjusterClient`,
    `define20_smarter2`.`referralsNotification`.`casemanagerId` AS `casemanagerId`,
    concat(`define20_smarter2`.`casemanagers`.`lastName`, ', ', `define20_smarter2`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarter2`.`referralsNotification`.`casemanager2Id` AS `casemanager2Id`,
    concat(`casemanagers2`.`lastName`, ', ', `casemanagers2`.`firstName`) AS `casemanager2`,
    `clients3`.`client` AS `casemanager2Client`,
    `define20_smarter2`.`referralsNotification`.`physicianId` AS `physicianId`,
    `define20_smarter2`.`physicians`.`lastName` AS `physicianLast`,
    `define20_smarter2`.`physicians`.`firstName` AS `physicianFirst`,
    `define20_smarter2`.`physicians`.`facility` AS `physicianFacility`,
    `define20_smarter2`.`referralsNotification`.`plaintiffAttorneyId` AS `plaintiffAttorneyId`,
    concat(`define20_smarter2`.`attorneys`.`lastName`, ', ', `define20_smarter2`.`attorneys`.`firstName`) AS `plaintiffAttorney`,
    `define20_smarter2`.`attorneys`.`firm` AS `plaintiffAttorneyFirm`,
    `define20_smarter2`.`referralsNotification`.`defenseAttorneyId` AS `defenseAttorneyId`,
    concat(`attorneys2`.`lastName`, ', ', `attorneys2`.`firstName`) AS `defenseAttorney`,
    `attorneys2`.`firm` AS `defenseAttorneyFirm`,
    `define20_smarter2`.`referralsNotification`.`fuDrDate` AS `fuDrDate`,
    `define20_smarter2`.`referralsNotification`.`billingNotes` AS `billingNotes`,
    `define20_smarter2`.`referralsNotification`.`reminderDate` AS `reminderDate`,
    `define20_smarter2`.`referralsNotification`.`reminderNote` AS `reminderNote`,
    `define20_smarter2`.`referralsNotification`.`reminderSent` AS `reminderSent`,
    `define20_smarter2`.`referralsNotification`.`lastDOS` AS `lastDOS`,
    `define20_smarter2`.`referralsNotification`.`fuHoldTimestamp` AS `fuHoldTimeStamp`,
    `define20_smarter2`.`referralsNotification`.`lastAdjUpdateSent` AS `lastAdjUpdateSent`,
    `define20_smarter2`.`referralsNotification`.`rrIADailyWorked` AS `rrIADailyWorked`,
    `define20_smarter2`.`referralsNotification`.`reportStatus` AS `reportStatus`,
    `define20_smarter2`.`referralsNotification`.`rescheduled` AS `rescheduled`,
    `define20_smarter2`.`referralsNotification`.`rescheduleFlag` AS `rescheduleFlag`,
    `define20_smarter2`.`referralsNotification`.`rescheduleDOS` AS `rescheduleDOS`,
    `define20_smarter2`.`referralsNotification`.`rescheduleDOSPrev` AS `rescheduleDOSPrev`,
    `define20_smarter2`.`referralsNotification`.`rescheduleTime` AS `rescheduleTime`,
    `define20_smarter2`.`referralsNotification`.`claimantInfoFromAdjuster` AS `claimantInfoFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`rxFromAdjuster` AS `rxFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`demosFromAdjuster` AS `demosFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`ovnFromAdjuster` AS `ovnFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`ptNotesFromAdjuster` AS `ptNotesFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`jdFromAdjuster` AS `jdFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`mriFromAdjuster` AS `mriFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`postOpFromAdjuster` AS `postOpFromAdjuster`,
    `define20_smarter2`.`referralsNotification`.`claimantVerbalConfirm` AS `claimantVerbalConfirm`,
    `define20_smarter2`.`referralsNotification`.`confirmLetterToClaimant` AS `confirmLetterToClaimant`,
    `define20_smarter2`.`referralsNotification`.`confirmLetterToClaimantFormat` AS `confirmLetterToClaimantFormat`,
    `define20_smarter2`.`referralsNotification`.`confirmLetterToAdjuster` AS `confirmLetterToAdjuster`,
    `define20_smarter2`.`referralsNotification`.`confirmLetterToAdjusterFormat` AS `confirmLetterToAdjusterFormat`,
    `define20_smarter2`.`referralsNotification`.`confirmLetterToAttorney` AS `confirmLetterToAttorney`,
    `define20_smarter2`.`referralsNotification`.`confirmLetterToAttorneyFormat` AS `confirmLetterToAttorneyFormat`,
    `define20_smarter2`.`referralsNotification`.`medNotesToPT` AS `medNotesToPT`,
    `define20_smarter2`.`referralsNotification`.`medNotesToPTFormat` AS `medNotesToPTFormat`,
    `define20_smarter2`.`referralsNotification`.`claimantConfirmDayBefore` AS `claimantConfirmDayBefore`,
    `define20_smarter2`.`referralsNotification`.`ptConfirmDayBefore` AS `ptConfirmDayBefore`,
    `define20_smarter2`.`referralsNotification`.`confirmAttend` AS `confirmAttend`,
    `define20_smarter2`.`referralsNotification`.`confirmAttendPrev` AS `confirmAttendPrev`,
    `define20_smarter2`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarter2`.`referralsNotification`.`fceApproved` AS `fceApproved`,
    `define20_smarter2`.`referralsNotification`.`invoiceRequested` AS `invoiceRequested`,
    `define20_smarter2`.`referralsNotification`.`reportToAdjuster` AS `reportToAdjuster`,
    `define20_smarter2`.`referralsNotification`.`reportToAdjusterFormat` AS `reportToAdjusterFormat`,
    `define20_smarter2`.`referralsNotification`.`reportToPhysician` AS `reportToPhysician`,
    `define20_smarter2`.`referralsNotification`.`reportToPhysicianFormat` AS `reportToPhysicianFormat`,
    `define20_smarter2`.`referralsNotification`.`reportToAttorney` AS `reportToAttorney`,
    `define20_smarter2`.`referralsNotification`.`reportToAttorneyFormat` AS `reportToAttorneyFormat`,
    `define20_smarter2`.`referralsNotification`.`requestRecords` AS `requestRecords`
from
    ((((((((((((`define20_smarter2`.`referralsNotification`
left join `define20_smarter2`.`claimants` on
    ((`define20_smarter2`.`referralsNotification`.`claimantId` = `define20_smarter2`.`claimants`.`claimantId`)))
left join `define20_smarter2`.`adjusters` on
    ((`define20_smarter2`.`referralsNotification`.`adjusterId` = `define20_smarter2`.`adjusters`.`adjusterId`)))
left join `define20_smarter2`.`clients` on
    ((`define20_smarter2`.`adjusters`.`clientId` = `define20_smarter2`.`clients`.`clientId`)))
left join `define20_smarter2`.`casemanagers` on
    ((`define20_smarter2`.`referralsNotification`.`casemanagerId` = `define20_smarter2`.`casemanagers`.`casemanagerId`)))
left join `define20_smarter2`.`casemanagers` `casemanagers2` on
    ((`define20_smarter2`.`referralsNotification`.`casemanager2Id` = `casemanagers2`.`casemanagerId`)))
left join `define20_smarter2`.`clients` `clients2` on
    ((`define20_smarter2`.`casemanagers`.`clientId` = `clients2`.`clientId`)))
left join `define20_smarter2`.`clients` `clients3` on
    ((`casemanagers2`.`clientId` = `clients3`.`clientId`)))
left join `define20_smarter2`.`physicians` on
    ((`define20_smarter2`.`referralsNotification`.`physicianId` = `define20_smarter2`.`physicians`.`physicianId`)))
left join `define20_smarter2`.`attorneys` on
    ((`define20_smarter2`.`referralsNotification`.`plaintiffAttorneyId` = `define20_smarter2`.`attorneys`.`attorneyId`)))
left join `define20_smarter2`.`attorneys` `attorneys2` on
    ((`define20_smarter2`.`referralsNotification`.`defenseAttorneyId` = `attorneys2`.`attorneyId`)))
left join `define20_smarter2`.`therapists` on
    ((`define20_smarter2`.`referralsNotification`.`therapistId` = `define20_smarter2`.`therapists`.`therapistId`)))
left join `define20_smarter2`.`users` on
    ((`define20_smarter2`.`referralsNotification`.`assign` = `define20_smarter2`.`users`.`initials`)));