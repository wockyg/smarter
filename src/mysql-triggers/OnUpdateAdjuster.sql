CREATE TRIGGER `OnUpdateAdjuster` BEFORE UPDATE ON `adjusters` FOR EACH ROW BEGIN
	IF (OLD.fceRate IS NULL AND NEW.fceRate IS NOT NULL) OR (OLD.ppdRate IS NULL AND NEW.ppdRate IS NOT NULL) OR (OLD.ppdDiscountRate IS NULL AND NEW.ppdDiscountRate IS NOT NULL) THEN
		UPDATE fceppdBilling fceb
		LEFT JOIN referralsNotification rn on fceb.referralId = rn.referralId
		SET fceb.adjusterRate = 
		CASE
			WHEN serviceType = "FCE" THEN NEW.fceRate
			WHEN serviceType = "PPD" OR serviceType = "PPD_GL" THEN NEW.ppdRate
			WHEN serviceType = "FCE_PPD" THEN NEW.fceRate + NEW.ppdDiscountRate
		END
		WHERE rn.adjusterId = NEW.adjusterId;
	END IF;
	
END