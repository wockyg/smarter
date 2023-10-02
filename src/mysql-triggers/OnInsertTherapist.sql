CREATE TRIGGER `OnInsertTherapist` BEFORE INSERT ON `therapists` FOR EACH ROW BEGIN
	IF NEW.name LIKE "%Benchmark%" THEN 
		SET NEW.fceRate = 600;
		SET NEW.ppdRate = 200;
		SET NEW.dailyRate = 89;
		SET NEW.evalRate = 120;
		SET NEW.evalRate = 199;
		SET NEW.wcwhFirst2Hrs = 89;
		SET NEW.wcwhAgreement = "Network";
		SET NEW.wcwhAgreementStatus = "Agreed";
		SET NEW.dptAgreement = "Network";
		SET NEW.dptAgreementStatus = "Agreed";
		SET NEW.fceAgreement = "Network";
		SET NEW.fceAgreementStatus = "Agreed";
		SET NEW.dpt = "DPT";
		SET NEW.bulkBillingId = 8;
	END IF;
END