CREATE DEFINER=`root`@`localhost` TRIGGER `OnDeleteReferral` AFTER DELETE ON `referralsnotification` FOR EACH ROW BEGIN 
	DELETE FROM define20_smarterbeta.referralNotes WHERE referralId = OLD.referralId;
END