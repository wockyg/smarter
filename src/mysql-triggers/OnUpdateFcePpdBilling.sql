CREATE DEFINER=`root`@`localhost` TRIGGER `OnUpdateFcePpdBilling` BEFORE UPDATE ON `fceppdbilling` FOR EACH ROW BEGIN
	SET @billingStatus = (SELECT billingStatus FROM define20_smarterbeta.referralsNotification WHERE referralId = NEW.referralId);
	IF @billingStatus = "Active" AND NEW.adjusterAmountPaid IS NOT NULL AND NEW.facilityAmountPaid IS NOT NULL THEN
		UPDATE define20_smarterbeta.referralsNotification SET billingStatus = "Complete" WHERE referralId = NEW.referralId;
	END IF;
END