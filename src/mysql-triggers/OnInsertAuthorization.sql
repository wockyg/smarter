CREATE TRIGGER `OnInsertAuthorization` AFTER INSERT ON `dptAuthorization` FOR EACH ROW BEGIN
	SET @i = 1;
	WHILE @i <= NEW.approvedVisits DO
		IF @i = 1 AND NEW.firstAuth = "Yes" THEN
			SET @dos1 = (SELECT apptDate FROM define20_smarterbeta2.referralsNotification WHERE referralId = NEW.referralId);
			SET @time1 = (SELECT apptTime FROM define20_smarterbeta2.referralsNotification WHERE referralId = NEW.referralId);
			INSERT INTO dptBillingVisits (referralId, dos, dosTime, attend, dateAdded) VALUES (NEW.referralId, @dos1, @time1, "Yes", CURDATE());
		ELSE
			INSERT INTO dptBillingVisits (referralId, dateAdded) VALUES (NEW.referralId, CURDATE());
		END IF;
		SET @i = @i+1;
	END WHILE;
END