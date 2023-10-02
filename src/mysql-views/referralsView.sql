-- define20_smarterbeta2.referralsview source

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `define20_smarterbeta2`.`referralsview` AS
select
    `define20_smarterbeta2`.`referralsNotification`.`referralId` AS `referralId`,
    `define20_smarterbeta2`.`referralsNotification`.`rrLastLastWorked` AS `rrLastLastWorked`,
    `define20_smarterbeta2`.`referralsNotification`.`rrLastWorked` AS `rrLastWorked`,
    `define20_smarterbeta2`.`referralsNotification`.`ccWorked` AS `ccWorked`,
    `define20_smarterbeta2`.`referralsNotification`.`rrFaxReceived` AS `rrFaxReceived`,
    `define20_smarterbeta2`.`referralsNotification`.`fceId` AS `fceId`,
    `define20_smarterbeta2`.`referralsNotification`.`ptAuthId` AS `ptAuthId`,
    `define20_smarterbeta2`.`referralsNotification`.`ptMaxAuthId` AS `ptMaxAuthId`,
    `define20_smarterbeta2`.`referralsNotification`.`odgAttendance` AS `odgAttendance`,
    `define20_smarterbeta2`.`referralsNotification`.`TotalAuthVisits` AS `TotalAuthVisits`,
    `define20_smarterbeta2`.`referralsNotification`.`referralStatus` AS `referralStatus`,
    `define20_smarterbeta2`.`referralsNotification`.`ptStatus` AS `ptStatus`,
    `define20_smarterbeta2`.`referralsNotification`.`fuHoldNotes` AS `fuHoldNotes`,
    `define20_smarterbeta2`.`referralsNotification`.`billingStatus` AS `billingStatus`,
    `define20_smarterbeta2`.`referralsNotification`.`assign` AS `assign`,
    `define20_smarterbeta2`.`users`.`firstName` AS `assignFirst`,
    `define20_smarterbeta2`.`users`.`lastName` AS `assignLast`,
    `define20_smarterbeta2`.`users`.`phone` AS `assignPhone`,
    `define20_smarterbeta2`.`users`.`email` AS `assignEmail`,
    `define20_smarterbeta2`.`referralsNotification`.`referralDate` AS `referralDate`,
    `define20_smarterbeta2`.`referralsNotification`.`scheduleDate` AS `scheduleDate`,
    `define20_smarterbeta2`.`referralsNotification`.`spanishSpeaking` AS `spanishSpeaking`,
    `define20_smarterbeta2`.`referralsNotification`.`translationNeeded` AS `translationNeeded`,
    `define20_smarterbeta2`.`referralsNotification`.`transportNeeded` AS `transportNeeded`,
    `define20_smarterbeta2`.`referralsNotification`.`postOp` AS `postOp`,
    `define20_smarterbeta2`.`referralsNotification`.`service` AS `service`,
    `define20_smarterbeta2`.`referralsNotification`.`jurisdiction` AS `jurisdiction`,
    `define20_smarterbeta2`.`referralsNotification`.`bodyPart` AS `bodyPart`,
    `define20_smarterbeta2`.`referralsNotification`.`icd10` AS `icd10`,
    `define20_smarterbeta2`.`referralsNotification`.`approvedVisits` AS `approvedVisits`,
    `define20_smarterbeta2`.`referralsNotification`.`odg` AS `odg`,
    `define20_smarterbeta2`.`referralsNotification`.`odgLimitReached` AS `odgLimitReached`,
    `define20_smarterbeta2`.`referralsNotification`.`odgLimitEmailSent` AS `odgLimitEmailSent`,
    `define20_smarterbeta2`.`referralsNotification`.`evalAndTreat` AS `evalAndTreat`,
    `define20_smarterbeta2`.`referralsNotification`.`apptDate` AS `apptDate`,
    `define20_smarterbeta2`.`referralsNotification`.`apptTime` AS `apptTime`,
    `define20_smarterbeta2`.`referralsNotification`.`originalApptDates` AS `originalApptDates`,
    `define20_smarterbeta2`.`referralsNotification`.`claimNumber` AS `claimNumber`,
    `define20_smarterbeta2`.`referralsNotification`.`claimantId` AS `claimantId`,
    `define20_smarterbeta2`.`claimants`.`firstName` AS `claimantFirst`,
    `define20_smarterbeta2`.`claimants`.`lastName` AS `claimantLast`,
    concat(`define20_smarterbeta2`.`claimants`.`lastName`, ', ', `define20_smarterbeta2`.`claimants`.`firstName`) AS `claimant`,
    `define20_smarterbeta2`.`claimants`.`gender` AS `claimantGender`,
    `define20_smarterbeta2`.`claimants`.`birthDate` AS `claimantBirthDate`,
    `define20_smarterbeta2`.`claimants`.`injuryDate1` AS `claimantInjuryDate1`,
    `define20_smarterbeta2`.`claimants`.`address` AS `claimantAddress`,
    `define20_smarterbeta2`.`claimants`.`city` AS `claimantCity`,
    `define20_smarterbeta2`.`claimants`.`state` AS `claimantState`,
    `define20_smarterbeta2`.`claimants`.`zip` AS `claimantZip`,
    `define20_smarterbeta2`.`claimants`.`phone` AS `claimantPhone`,
    `define20_smarterbeta2`.`claimants`.`employerId` AS `claimantEmployerId`,
    `define20_smarterbeta2`.`employers`.`name` AS `employer`,
    `define20_smarterbeta2`.`employers`.`address` AS `employerAddress`,
    `define20_smarterbeta2`.`employers`.`city` AS `employerCity`,
    `define20_smarterbeta2`.`employers`.`state` AS `employerState`,
    `define20_smarterbeta2`.`employers`.`zip` AS `employerZip`,
    `define20_smarterbeta2`.`referralsNotification`.`therapistId` AS `therapistId`,
    `define20_smarterbeta2`.`therapists`.`name` AS `therapist`,
    `define20_smarterbeta2`.`therapists`.`address` AS `therapistAddress`,
    `define20_smarterbeta2`.`therapists`.`suite` AS `therapistSuite`,
    `define20_smarterbeta2`.`therapists`.`city` AS `therapistCity`,
    `define20_smarterbeta2`.`therapists`.`state` AS `therapistState`,
    `define20_smarterbeta2`.`therapists`.`zip` AS `therapistZip`,
    `define20_smarterbeta2`.`therapists`.`phone` AS `therapistPhone`,
    `define20_smarterbeta2`.`therapists`.`phoneExt` AS `therapistPhoneExt`,
    `define20_smarterbeta2`.`therapists`.`fax` AS `therapistFax`,
    concat(`define20_smarterbeta2`.`therapists`.`name`, ' :: ', `define20_smarterbeta2`.`therapists`.`address`, ', ', `define20_smarterbeta2`.`therapists`.`city`, ', ', `define20_smarterbeta2`.`therapists`.`state`, ' ', `define20_smarterbeta2`.`therapists`.`zip`) AS `therapistBeaver`,
    `define20_smarterbeta2`.`referralsNotification`.`adjusterId` AS `adjusterId`,
    concat(`define20_smarterbeta2`.`adjusters`.`lastName`, ', ', `define20_smarterbeta2`.`adjusters`.`firstName`) AS `adjuster`,
    concat(`define20_smarterbeta2`.`adjusters`.`lastName`, ', ', `define20_smarterbeta2`.`adjusters`.`firstName`, ' | ', `define20_smarterbeta2`.`clients`.`client`) AS `adjusterBeaver`,
    `define20_smarterbeta2`.`clients`.`clientId` AS `adjusterClientId`,
    `define20_smarterbeta2`.`clients`.`client` AS `adjusterClient`,
    `define20_smarterbeta2`.`clients`.`client` AS `adjusterClientMailingAddress`,
    `define20_smarterbeta2`.`referralsNotification`.`casemanagerId` AS `casemanagerId`,
    concat(`define20_smarterbeta2`.`casemanagers`.`lastName`, ', ', `define20_smarterbeta2`.`casemanagers`.`firstName`) AS `casemanager`,
    `clients2`.`client` AS `casemanagerClient`,
    `define20_smarterbeta2`.`referralsNotification`.`casemanager2Id` AS `casemanager2Id`,
    concat(`casemanagers2`.`lastName`, ', ', `casemanagers2`.`firstName`) AS `casemanager2`,
    `clients3`.`client` AS `casemanager2Client`,
    `define20_smarterbeta2`.`referralsNotification`.`physicianId` AS `physicianId`,
    `define20_smarterbeta2`.`physicians`.`lastName` AS `physicianLast`,
    `define20_smarterbeta2`.`physicians`.`firstName` AS `physicianFirst`,
    `define20_smarterbeta2`.`physicians`.`npi` AS `physicianNPI`,
    `define20_smarterbeta2`.`physicians`.`facility` AS `physicianFacility`,
    `define20_smarterbeta2`.`referralsNotification`.`plaintiffAttorneyId` AS `plaintiffAttorneyId`,
    concat(`define20_smarterbeta2`.`attorneys`.`lastName`, ', ', `define20_smarterbeta2`.`attorneys`.`firstName`) AS `plaintiffAttorney`,
    `define20_smarterbeta2`.`attorneys`.`firm` AS `plaintiffAttorneyFirm`,
    `define20_smarterbeta2`.`referralsNotification`.`defenseAttorneyId` AS `defenseAttorneyId`,
    concat(`attorneys2`.`lastName`, ', ', `attorneys2`.`firstName`) AS `defenseAttorney`,
    `attorneys2`.`firm` AS `defenseAttorneyFirm`,
    `define20_smarterbeta2`.`referralsNotification`.`fuDrDate` AS `fuDrDate`,
    `define20_smarterbeta2`.`referralsNotification`.`billingNotes` AS `billingNotes`,
    `define20_smarterbeta2`.`referralsNotification`.`reminderDate` AS `reminderDate`,
    `define20_smarterbeta2`.`referralsNotification`.`reminderNote` AS `reminderNote`,
    `define20_smarterbeta2`.`referralsNotification`.`reminderSent` AS `reminderSent`,
    `define20_smarterbeta2`.`referralsNotification`.`lastDOS` AS `lastDOS`,
    `define20_smarterbeta2`.`referralsNotification`.`fuHoldTimestamp` AS `fuHoldTimeStamp`,
    `define20_smarterbeta2`.`referralsNotification`.`lastAdjUpdateSent` AS `lastAdjUpdateSent`,
    `define20_smarterbeta2`.`referralsNotification`.`rrIADailyWorked` AS `rrIADailyWorked`,
    `define20_smarterbeta2`.`referralsNotification`.`reportStatus` AS `reportStatus`,
    `define20_smarterbeta2`.`referralsNotification`.`rescheduled` AS `rescheduled`,
    `define20_smarterbeta2`.`referralsNotification`.`rescheduleFlag` AS `rescheduleFlag`,
    `define20_smarterbeta2`.`referralsNotification`.`rescheduleDOS` AS `rescheduleDOS`,
    `define20_smarterbeta2`.`referralsNotification`.`rescheduleTime` AS `rescheduleTime`,
    `define20_smarterbeta2`.`referralsNotification`.`claimantInfoFromAdjuster` AS `claimantInfoFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`rxFromAdjuster` AS `rxFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`demosFromAdjuster` AS `demosFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`ovnFromAdjuster` AS `ovnFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`ptNotesFromAdjuster` AS `ptNotesFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`jdFromAdjuster` AS `jdFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`mriFromAdjuster` AS `mriFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`postOpFromAdjuster` AS `postOpFromAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`claimantVerbalConfirm` AS `claimantVerbalConfirm`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmLetterToClaimant` AS `confirmLetterToClaimant`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmLetterToClaimantFormat` AS `confirmLetterToClaimantFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmLetterToAdjuster` AS `confirmLetterToAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmLetterToAdjusterFormat` AS `confirmLetterToAdjusterFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmLetterToAttorney` AS `confirmLetterToAttorney`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmLetterToAttorneyFormat` AS `confirmLetterToAttorneyFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`medNotesToPT` AS `medNotesToPT`,
    `define20_smarterbeta2`.`referralsNotification`.`medNotesToPTFormat` AS `medNotesToPTFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`claimantConfirmDayBefore` AS `claimantConfirmDayBefore`,
    `define20_smarterbeta2`.`referralsNotification`.`ptConfirmDayBefore` AS `ptConfirmDayBefore`,
    `define20_smarterbeta2`.`referralsNotification`.`confirmAttend` AS `confirmAttend`,
    `define20_smarterbeta2`.`referralsNotification`.`reportReceivedDate` AS `reportReceivedDate`,
    `define20_smarterbeta2`.`referralsNotification`.`fceApproved` AS `fceApproved`,
    `define20_smarterbeta2`.`referralsNotification`.`invoiceRequested` AS `invoiceRequested`,
    `define20_smarterbeta2`.`referralsNotification`.`reportToAdjuster` AS `reportToAdjuster`,
    `define20_smarterbeta2`.`referralsNotification`.`reportToAdjusterFormat` AS `reportToAdjusterFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`reportToPhysician` AS `reportToPhysician`,
    `define20_smarterbeta2`.`referralsNotification`.`reportToPhysicianFormat` AS `reportToPhysicianFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`reportToAttorney` AS `reportToAttorney`,
    `define20_smarterbeta2`.`referralsNotification`.`reportToAttorneyFormat` AS `reportToAttorneyFormat`,
    `define20_smarterbeta2`.`referralsNotification`.`requestRecords` AS `requestRecords`
from
    (((((((((((((`define20_smarterbeta2`.`referralsNotification`
left join `define20_smarterbeta2`.`claimants` on
    ((`define20_smarterbeta2`.`referralsNotification`.`claimantId` = `define20_smarterbeta2`.`claimants`.`claimantId`)))
left join `define20_smarterbeta2`.`employers` on
    ((`define20_smarterbeta2`.`claimants`.`employerId` = `define20_smarterbeta2`.`employers`.`employerId`)))
left join `define20_smarterbeta2`.`adjusters` on
    ((`define20_smarterbeta2`.`referralsNotification`.`adjusterId` = `define20_smarterbeta2`.`adjusters`.`adjusterId`)))
left join `define20_smarterbeta2`.`clients` on
    ((`define20_smarterbeta2`.`adjusters`.`clientId` = `define20_smarterbeta2`.`clients`.`clientId`)))
left join `define20_smarterbeta2`.`casemanagers` on
    ((`define20_smarterbeta2`.`referralsNotification`.`casemanagerId` = `define20_smarterbeta2`.`casemanagers`.`casemanagerId`)))
left join `define20_smarterbeta2`.`casemanagers` `casemanagers2` on
    ((`define20_smarterbeta2`.`referralsNotification`.`casemanager2Id` = `casemanagers2`.`casemanagerId`)))
left join `define20_smarterbeta2`.`clients` `clients2` on
    ((`define20_smarterbeta2`.`casemanagers`.`clientId` = `clients2`.`clientId`)))
left join `define20_smarterbeta2`.`clients` `clients3` on
    ((`casemanagers2`.`clientId` = `clients3`.`clientId`)))
left join `define20_smarterbeta2`.`physicians` on
    ((`define20_smarterbeta2`.`referralsNotification`.`physicianId` = `define20_smarterbeta2`.`physicians`.`physicianId`)))
left join `define20_smarterbeta2`.`attorneys` on
    ((`define20_smarterbeta2`.`referralsNotification`.`plaintiffAttorneyId` = `define20_smarterbeta2`.`attorneys`.`attorneyId`)))
left join `define20_smarterbeta2`.`attorneys` `attorneys2` on
    ((`define20_smarterbeta2`.`referralsNotification`.`defenseAttorneyId` = `attorneys2`.`attorneyId`)))
left join `define20_smarterbeta2`.`therapists` on
    ((`define20_smarterbeta2`.`referralsNotification`.`therapistId` = `define20_smarterbeta2`.`therapists`.`therapistId`)))
left join `define20_smarterbeta2`.`users` on
    ((`define20_smarterbeta2`.`referralsNotification`.`assign` = `define20_smarterbeta2`.`users`.`initials`)));