IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ToDoList')
BEGIN
	CREATE DATABASE ToDoList;
END
GO

USE [ToDoList]
GO

/****** Object:  Table [dbo].[ToDos]    Script Date: 3/9/2023 3:50:06 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ToDos](
	[Id] [int] NOT NULL IDENTITY(1,1),
	[Description] [nvarchar](50) NOT NULL,
	[DueDate] [datetime2](7) NOT NULL,
	[Done] [bit] NOT NULL DEFAULT(0),
	CONSTRAINT [PK_ToDos] PRIMARY KEY (Id)
)
GO



