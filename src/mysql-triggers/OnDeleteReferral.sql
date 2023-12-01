CREATE TRIGGER `OnDeleteReferral` AFTER DELETE ON `referralsNotification` FOR EACH ROW BEGIN 
	DELETE FROM referralNotes WHERE referralId = OLD.referralId;
END