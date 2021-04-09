/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

SET IDENTITY_INSERT [Items] ON;

MERGE INTO [Items] AS Target 
USING (VALUES 
	(1,'ITEM 1', 100),
	(2,'ITEM 2', 200),
	(3,'ITEM 1', 250),
	(4,'ITEM 3', 300),
	(5,'ITEM 4', 50),
	(6,'ITEM 4', 40),
	(7,'ITEM 2',200)
) 
AS Source (Id, ItemName, Cost)
	ON Target.Id = Source.Id 
WHEN MATCHED THEN 
	UPDATE SET ItemName = Source.ItemName,
	Cost = Source.Cost
WHEN NOT MATCHED BY TARGET THEN 
	INSERT (Id, ItemName, Cost) 
	VALUES (Id, ItemName, Cost) 
WHEN NOT MATCHED BY SOURCE THEN 
	DELETE
;

SET IDENTITY_INSERT [Items] OFF;