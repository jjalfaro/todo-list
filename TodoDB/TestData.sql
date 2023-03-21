USE [ToDoDB]
GO

INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate])
     VALUES
           ('Tarea 1',
           DATEADD(DAY,1,CAST(GETUTCDATE() AS DATETIMEOFFSET))
		   )
GO

INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate])
     VALUES
           ('Tarea 2',
           DATEADD(HOUR,3,CAST(GETUTCDATE() AS DATETIMEOFFSET))
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate])
     VALUES
           ('Tarea 3',
           DATEADD(HOUR,-3,CAST(GETUTCDATE() AS DATETIMEOFFSET))
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate])
     VALUES
           ('Tarea 4',
           DATEADD(MONTH,1,CAST(GETUTCDATE() AS DATETIMEOFFSET))
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 5',
           DATEADD(hour,-5,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   1
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 6',
           DATEADD(day,-1,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   1
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 7',
           DATEADD(day,-4,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   1
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 8',
           DATEADD(day,2,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   1
		   )
GO

INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 9',
           DATEADD(hour,10,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   1
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 10',
           DATEADD(hour,12,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   0
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 11',
           DATEADD(hour,6,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   0
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 12',
           DATEADD(hour,23,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   0
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 13',
           DATEADD(hour,65,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   0
		   )
GO
INSERT INTO [dbo].[ToDo]
           ([Description]
           ,[DueDate]
		   ,[Done])
     VALUES
           ('Tarea 14',
           DATEADD(hour,79,CAST(GETUTCDATE() AS DATETIMEOFFSET)),
		   0
		   )
GO
