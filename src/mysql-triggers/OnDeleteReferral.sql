CREATE TRIGGER `OnDeleteReferral` AFTER DELETE ON `referralsNotification` FOR EACH ROW BEGIN 
	DELETE FROM define20_smarterbeta2.referralNotes WHERE referralId = OLD.referralId;
END