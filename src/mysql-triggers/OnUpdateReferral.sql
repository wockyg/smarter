CREATE TRIGGER `OnUpdateReferral` BEFORE UPDATE ON `referralsNotification` FOR EACH ROW BEGIN
	-- Complete referral status
	IF (NEW.referralStatus = "Open" OR (NEW.referralStatus = "Reschedule" AND NEW.rescheduleFlag IS NOT NULL)) AND NEW.confirmLetterToClaimant IS NOT NULL AND NEW.confirmLetterToAdjuster IS NOT NULL AND NEW.medNotesToPT IS NOT NULL THEN
		SET NEW.referralStatus = "Complete";
		SET NEW.scheduleDate = CURDATE();
		IF NEW.rescheduleFlag IS NOT NULL THEN
			SET NEW.rescheduleFlag = NULL;
		END IF;
	END IF;
	-- IW did attend
	IF NEW.referralStatus = "Complete" AND NEW.ptStatus IS NULL THEN
		IF NEW.confirmAttend = "Yes" THEN
			IF NEW.service LIKE 'DPT%' THEN
				SET NEW.ptStatus = "Active";
				INSERT INTO dptAuthorization (referralId, approvedVisits, firstAuth, dateAdded) VALUES (NEW.referralId, NEW.approvedVisits, "Yes", CURDATE());
			ELSEIF NEW.service LIKE '%FCE%' OR NEW.service LIKE '%PPD%' THEN
				SET NEW.ptStatus = "Limbo";
				CASE
					WHEN NEW.service = "FCE" THEN
						SET @adjRate =
							(SELECT fceRate FROM adjusters a
							 INNER JOIN referralsNotification rn ON a.adjusterId = rn.adjusterId
							 WHERE referralId = NEW.referralId);
						SET @facilityRate =
							(SELECT fceRate FROM therapists t
							 INNER JOIN referralsNotification rn ON t.therapistId = rn.therapistId
							 WHERE referralId = NEW.referralId);
					WHEN NEW.service = "FCE | PPD" THEN
						SET @adjRate =
							(SELECT fceRate + ppdDiscountRate FROM adjusters a
							 INNER JOIN referralsNotification rn ON a.adjusterId = rn.adjusterId
							 WHERE referralId = NEW.referralId);
						SET @facilityRate =
							(SELECT fceRate + ppdRate FROM therapists t
							 INNER JOIN referralsNotification rn ON t.therapistId = rn.therapistId
							 WHERE referralId = NEW.referralId);
					WHEN NEW.service = "PPD" OR NEW.service = "PPD-GL" THEN
						SET @adjRate =
							(SELECT ppdRate FROM adjusters a
							 INNER JOIN referralsNotification rn ON a.adjusterId = rn.adjusterId
							 WHERE referralId = NEW.referralId);
						SET @facilityRate =
							(SELECT ppdRate FROM therapists t
							 INNER JOIN referralsNotification rn ON t.therapistId = rn.therapistId
							 WHERE referralId = NEW.referralId);
				END CASE;
				INSERT INTO fceppdBilling (referralId, adjusterRate, facilityRate, dateAdded) VALUES (NEW.referralId, @adjRate, @facilityRate, CURDATE());
			END IF;
			SET NEW.billingStatus = "Active";
		END IF;
		IF NEW.confirmAttend = "No" THEN
			SET NEW.referralStatus = "Reschedule";
		END IF;
	END IF;
	-- IW did not attend
	IF ((OLD.apptDate IS NOT NULL) AND (OLD.apptDate != NEW.apptDate) AND (OLD.referralStatus = "Complete") AND (NEW.confirmAttend IS NULL)) THEN
		SET NEW.referralStatus = "Open";
		SET NEW.scheduleDate = NULL;
		SET NEW.claimantVerbalConfirm = NULL;
		SET NEW.claimantConfirmDayBefore = NULL;
		SET NEW.ptConfirmDayBefore = NULL;
		SET NEW.confirmLetterToClaimant = NULL;
		SET NEW.confirmLetterToClaimantFormat = NULL;
		SET NEW.confirmLetterToAdjuster = NULL;
		SET NEW.confirmLetterToAdjusterFormat = NULL;
	END IF;
	-- IW has been rescheduled
	IF OLD.rescheduleDOS IS NULL AND NEW.rescheduleDOS IS NOT NULL THEN
		SET @oldDOS = NEW.apptDate;
		SET NEW.apptDate = NEW.rescheduleDOS;
		SET NEW.apptTime = NEW.rescheduleTime;
		SET NEW.rescheduled = "*RESCHEDULED*";
		SET NEW.originalApptDates = CONCAT(NEW.originalApptDates, @oldDOS);
		SET NEW.confirmAttend = NULL;
		SET NEW.rescheduleDOS = NULL;
		SET NEW.rescheduleTime = NULL;
		SET NEW.claimantVerbalConfirm = NULL;
		SET NEW.ptConfirmDayBefore = NULL;
		SET NEW.claimantConfirmDayBefore = NULL;
		SET NEW.confirmLetterToClaimant = NULL;
		SET NEW.confirmLetterToClaimantFormat = NULL;
		SET NEW.confirmLetterToAdjuster = NULL;
		SET NEW.confirmLetterToAdjusterFormat = NULL;
		SET NEW.rescheduleFlag = 'Y';
	END IF;
	-- service type was updated (FCE/PPD only)
	IF OLD.service != NEW.service AND NEW.billingStatus IS NOT NULL THEN
		CASE
			WHEN NEW.service = "FCE" THEN
				SET @adjRate =
					(SELECT fceRate FROM adjusters a
					 INNER JOIN referralsNotification rn ON a.adjusterId = rn.adjusterId
					 WHERE referralId = NEW.referralId);
				SET @facilityRate =
					(SELECT fceRate FROM therapists t
					 INNER JOIN referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				UPDATE fceppdBilling SET adjusterRate = @adjRate, facilityRate  = @facilityRate WHERE referralId  = NEW.referralId;
			WHEN NEW.service = "FCE | PPD" THEN
				SET @adjRate =
					(SELECT fceRate + ppdDiscountRate FROM adjusters a
					 INNER JOIN referralsNotification rn ON a.adjusterId = rn.adjusterId
					 WHERE referralId = NEW.referralId);
				SET @facilityRate =
					(SELECT fceRate + ppdRate FROM therapists t
					 INNER JOIN referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				UPDATE fceppdBilling SET adjusterRate = @adjRate, facilityRate  = @facilityRate WHERE referralId  = NEW.referralId;
			WHEN NEW.service = "PPD" OR NEW.service = "PPD-GL" THEN
				SET @adjRate =
					(SELECT ppdRate FROM adjusters a
					 INNER JOIN referralsNotification rn ON a.adjusterId = rn.adjusterId
					 WHERE referralId = NEW.referralId);
				SET @facilityRate =
					(SELECT ppdRate FROM therapists t
					 INNER JOIN referralsNotification rn ON t.therapistId = rn.therapistId
					 WHERE referralId = NEW.referralId);
				UPDATE fceppdBilling SET adjusterRate = @adjRate, facilityRate  = @facilityRate WHERE referralId  = NEW.referralId;
		END CASE;
	END IF;
	-- report sent to adj and md (FCE/PPD only)
	IF NEW.ptStatus = "Limbo" AND NEW.reportToAdjuster IS NOT NULL AND AND NEW.reportToPhysician IS NOT NULL THEN
		SET NEW.ptStatus = "Complete";
	END IF;
	
END