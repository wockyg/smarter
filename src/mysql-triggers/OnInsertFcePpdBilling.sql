CREATE DEFINER=`root`@`localhost` TRIGGER `OnInsertFcePpdBilling` BEFORE INSERT ON `fceppdbilling` FOR EACH ROW BEGIN 
	SET @service = (SELECT service FROM define20_smarterbeta.referralsNotification WHERE referralId = NEW.referralId);
	IF @service = "FCE" THEN
		SET @fceRate = (
			SELECT fceRate
			FROM define20_smarterbeta.adjusters a
			INNER JOIN define20_smarterbeta.referralsNotification rn ON a.adjusterId = rn.adjusterId 
			WHERE rn.referralId = NEW.referralId);
		SET @facilityRate = (
			SELECT fceRate
			FROM define20_smarterbeta.therapists t
			INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId  = rn.therapistId  
			WHERE rn.referralId = NEW.referralId);
		SET NEW.adjusterRate = @fceRate;
		SET NEW.facilityRate = @facilityRate;
		ELSEIF @service = "FCE | PPD" THEN
			SET @fceRate = (
				SELECT fceRate
				FROM define20_smarterbeta.adjusters a
				INNER JOIN define20_smarterbeta.referralsNotification rn ON a.adjusterId = rn.adjusterId 
				WHERE rn.referralId = NEW.referralId);
			SET @ppdRate = (
				SELECT ppdDiscountRate
				FROM define20_smarterbeta.adjusters a
				INNER JOIN define20_smarterbeta.referralsNotification rn ON a.adjusterId = rn.adjusterId 
				WHERE rn.referralId = NEW.referralId);
			SET @facilityRateFCE = (
				SELECT fceRate
				FROM define20_smarterbeta.therapists t
				INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId  = rn.therapistId  
				WHERE rn.referralId = NEW.referralId);
			SET @facilityRatePPD = (
				SELECT ppdRate
				FROM define20_smarterbeta.therapists t
				INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId  = rn.therapistId  
				WHERE rn.referralId = NEW.referralId);
			SET NEW.adjusterRate = @fceRate + @ppdRate;
			SET NEW.facilityRate = @facilityRateFCE + @facilityRatePPD;
		ELSEIF @service = "PPD" OR @service = "PPD-GL" THEN
			SET @ppdRate = (
				SELECT ppdRate
				FROM define20_smarterbeta.adjusters a
				INNER JOIN define20_smarterbeta.referralsNotification rn ON a.adjusterId = rn.adjusterId 
				WHERE rn.referralId = NEW.referralId);
			SET @facilityRate = (
				SELECT ppdRate
				FROM define20_smarterbeta.therapists t
				INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId  = rn.therapistId  
				WHERE rn.referralId = NEW.referralId);
			SET NEW.adjusterRate = @ppdRate;
			SET NEW.facilityRate = @facilityRate;
	END IF;
END