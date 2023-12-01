CREATE TRIGGER `OnUpdateFcePpdBilling` BEFORE UPDATE ON `fceppdBilling` FOR EACH ROW BEGIN
	SET @billingStatus = (SELECT billingStatus FROM referralsNotification WHERE referralId = NEW.referralId);
	IF @billingStatus = "Active" AND NEW.adjusterAmountPaid IS NOT NULL AND NEW.facilityAmountPaid IS NOT NULL THEN
		UPDATE referralsNotification SET billingStatus = "Complete" WHERE referralId = NEW.referralId;
	END IF;
END