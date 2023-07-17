CREATE DEFINER=`root`@`localhost` TRIGGER `OnUpdateDptBillingVisits` BEFORE UPDATE ON `dptbillingvisits` FOR EACH ROW BEGIN 
	IF OLD.serviceType <> NEW.serviceType OR (OLD.serviceType IS NULL AND NEW.serviceType IS NOT NULL) THEN
		IF NEW.serviceType = "Daily" OR NEW.serviceType = "Re-Eval" THEN
			SET @daily = 
				(SELECT dailyRate FROM define20_smarterbeta.therapists t
				 INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId = rn.therapistId
				 WHERE referralId = NEW.referralId);
			SET NEW.facilityRate = @daily;
			ELSEIF NEW.serviceType = "Combined" THEN
				SET @combined = 
					(SELECT combinedRate FROM define20_smarterbeta.therapists t
					 INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				SET NEW.facilityRate = @combined;
			ELSEIF NEW.serviceType = "InitialEval" THEN
				SET @ia = 
					(SELECT evalRate FROM define20_smarterbeta.therapists t
					 INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				SET NEW.facilityRate = @ia;
			ELSEIF NEW.serviceType = "WC (2hr.)" OR NEW.serviceType = "WH (2hr.)" THEN
				SET @wc2 = 
					(SELECT wcwhFirst2Hrs FROM define20_smarterbeta.therapists t
					 INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				SET NEW.facilityRate = @wc2;
			ELSEIF NEW.serviceType = "WC (3hr.)" OR NEW.serviceType = "WH (3hr.)" THEN
				SET @wc2 = 
					(SELECT wcwhFirst2Hrs FROM define20_smarterbeta.therapists t
					 INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				SET @wc1 = 
					(SELECT wcwhAdditionalHour FROM define20_smarterbeta.therapists t
					 INNER JOIN define20_smarterbeta.referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				SET NEW.facilityRate = @wc2 + @wc1;
		END IF;
	END IF;
	SET @ptStatus = (SELECT ptStatus FROM define20_smarterbeta.referralsNotification WHERE referralId = NEW.referralId);
	SET @billingStatus = (SELECT billingStatus FROM define20_smarterbeta.referralsNotification WHERE referralId = NEW.referralId);
	IF @ptStatus = "Discharge" AND @billingStatus = "Active" THEN 
		SET @numYes = 
			(SELECT COUNT(referralId) FROM define20_smarterbeta.dptBillingVisits
			WHERE referralId = NEW.referralId AND NEW.attend = "Yes" AND NEW.v1500 IS NOT NULL);
		SET @numPaid = 
			(SELECT COUNT(referralId) FROM define20_smarterbeta.dptBillingVisits
			WHERE referralId = NEW.referralId AND NEW.adjusterAmountPaid IS NOT NULL AND NEW.facilityAmountPaid IS NOT NULL);
		IF @numYes = @numPaid THEN
			UPDATE define20_smarterbeta.referralsNotification SET billingStatus = "Complete" WHERE referralId = NEW.referralId;
		END IF;
	END IF;
END