DROP TABLE IF EXISTS healthcare;

CREATE TABLE healthcare(
	EmployeeID INTEGER PRIMARY KEY NOT NULL,
	Age INTEGER NOT NULL,
	Attrition VARCHAR(10) NOT NULL,
	Department VARCHAR(40) NOT NULL,
	DistanceFromHome INTEGER NOT NULL,
	Gender VARCHAR(40) NOT NULL,
	HourlyRate INTEGER NOT NULL,
	JobSatisfaction INTEGER NOT NULL,
	MaritalStatus VARCHAR(40) NOT NULL,
	TotalWorkingYears INTEGER NOT NULL
	);
	
select * FROM healthcare;