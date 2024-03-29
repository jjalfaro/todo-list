IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ToDoDB')
BEGIN
	CREATE DATABASE ToDoDB;
	CREATE DATABASE ToDoDB;
END
GO

USE [ToDoDB]
USE [ToDoDB]
GO

/****** Object:  Table [dbo].[ToDos]    Script Date: 3/9/2023 3:50:06 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ToDo](
CREATE TABLE [dbo].[ToDo](
	[Id] [int] NOT NULL IDENTITY(1,1),
	[Description] [nvarchar](250) NOT NULL,
	[DueDate] [datetimeoffset](7) NOT NULL,
	[Done] [bit] NOT NULL DEFAULT(0),
	CONSTRAINT [PK_ToDos] PRIMARY KEY (Id)
)
GO



