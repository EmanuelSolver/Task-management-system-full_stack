CREATE DATABASE TManagerDb;

CREATE TABLE users (
    Id INT IDENTITY (1, 1),
    UserName VARCHAR (50) NOT NULL,
	Email VARCHAR (255) NOT NULL,
    Password VARCHAR (255) NOT NULL,
    PRIMARY KEY(Id)
);

CREATE TABLE Projects(
    Id INT IDENTITY(1,1),
    ProjectName VARCHAR(50) NOT NULL,
    ManagerId INT NOT NULL,
    CreatedDate DATE NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY (ManagerId) REFERENCES users(Id)  ON DELETE CASCADE
)

CREATE TABLE Tasks(
    Id INT IDENTITY(1,1),
    TaskName VARCHAR(50) NOT NULL,
    StartDate DATE,
    CloseDate DATE,
    ProjectId INT NOT NULL,
    UserId INT NOT NULL,
    Priority VARCHAR (50) NOT NULL, 
    Progress INT NOT NULL,
    PRIMARY KEY(Id),
    FOREIGN KEY (ProjectId) REFERENCES Projects(Id)  ON DELETE CASCADE, 
	FOREIGN KEY (UserId) REFERENCES Users(Id)  ON DELETE CASCADE
)

INSERT INTO projects
	VALUES('University website', 3, '2023-08-02'),
	('Task Management', 'G. Peters'),
	('E-commerce system', 'P. Thompson'),
	('Expense Tracker', 'L. Jane'),
	('Weather Forecaster', 'Mil Tonne'),
	('Library Manager', 'Lossy Tye'),
	('Accounting system', 'Gilbert J')