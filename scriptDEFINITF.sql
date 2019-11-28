USE [master]
GO
/****** Object:  Database [cou_project]    Script Date: 07-11-19 15:11:28 ******/
CREATE DATABASE [cou_project]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'cou_project', FILENAME = N'D:\Program Files (x86)\MSSQL14.MSSQLSERVER\MSSQL\DATA\cou_project.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'cou_project_log', FILENAME = N'D:\Program Files (x86)\MSSQL14.MSSQLSERVER\MSSQL\DATA\cou_project_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [cou_project] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [cou_project].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [cou_project] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [cou_project] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [cou_project] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [cou_project] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [cou_project] SET ARITHABORT OFF 
GO
ALTER DATABASE [cou_project] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [cou_project] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [cou_project] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [cou_project] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [cou_project] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [cou_project] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [cou_project] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [cou_project] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [cou_project] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [cou_project] SET  DISABLE_BROKER 
GO
ALTER DATABASE [cou_project] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [cou_project] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [cou_project] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [cou_project] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [cou_project] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [cou_project] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [cou_project] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [cou_project] SET RECOVERY FULL 
GO
ALTER DATABASE [cou_project] SET  MULTI_USER 
GO
ALTER DATABASE [cou_project] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [cou_project] SET DB_CHAINING OFF 
GO
ALTER DATABASE [cou_project] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [cou_project] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [cou_project] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'cou_project', N'ON'
GO
ALTER DATABASE [cou_project] SET QUERY_STORE = OFF
GO
USE [cou_project]
GO
/****** Object:  Table [dbo].[Adresse]    Script Date: 07-11-19 15:11:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Adresse](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ville] [varchar](50) NOT NULL,
	[rue] [varchar](50) NOT NULL,
	[num] [int] NOT NULL,
	[cp] [int] NOT NULL,
 CONSTRAINT [PK_Adresse] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Avis]    Script Date: 07-11-19 15:11:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Avis](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[note] [float] NOT NULL,
	[commentaire] [varchar](max) NOT NULL,
	[valider] [int] NOT NULL,
	[idutil] [int] NOT NULL,
	[idlieu] [int] NOT NULL,
 CONSTRAINT [PK_Avis] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favoris]    Script Date: 07-11-19 15:11:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favoris](
	[idutil] [int] NOT NULL,
	[idlieu] [int] NOT NULL,
 CONSTRAINT [PK_Favoris] PRIMARY KEY CLUSTERED 
(
	[idutil] ASC,
	[idlieu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lieu]    Script Date: 07-11-19 15:11:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lieu](
	[id] [int] NOT NULL,
	[nom] [varchar](50) NOT NULL,
	[type] [varchar](50) NOT NULL,
	[description] [varchar](max) NOT NULL,
	[idadr] [int] NOT NULL,
 CONSTRAINT [PK_Lieu] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Utilisateur]    Script Date: 07-11-19 15:11:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Utilisateur](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](20) NOT NULL,
	[prenom] [varchar](20) NOT NULL,
	[pseudo] [varchar](20) NOT NULL,
	[type] [varchar](1) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[hashpwd] [varchar](50) NOT NULL,
	[idadr] [int] NOT NULL,
 CONSTRAINT [PK_Utilisateur] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Utilisateur] ADD  CONSTRAINT [DF_Utilisateur_type]  DEFAULT ('U') FOR [type]
GO
ALTER TABLE [dbo].[Avis]  WITH CHECK ADD  CONSTRAINT [FK_Avis_Lieu] FOREIGN KEY([idlieu])
REFERENCES [dbo].[Lieu] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Avis] CHECK CONSTRAINT [FK_Avis_Lieu]
GO
ALTER TABLE [dbo].[Avis]  WITH CHECK ADD  CONSTRAINT [FK_Avis_Util] FOREIGN KEY([idutil])
REFERENCES [dbo].[Utilisateur] ([id])
GO
ALTER TABLE [dbo].[Avis] CHECK CONSTRAINT [FK_Avis_Util]
GO
ALTER TABLE [dbo].[Favoris]  WITH CHECK ADD  CONSTRAINT [FK_Favoris_Lieu] FOREIGN KEY([idlieu])
REFERENCES [dbo].[Lieu] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Favoris] CHECK CONSTRAINT [FK_Favoris_Lieu]
GO
ALTER TABLE [dbo].[Lieu]  WITH CHECK ADD  CONSTRAINT [FK_Lieu_Adresse] FOREIGN KEY([idadr])
REFERENCES [dbo].[Adresse] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Lieu] CHECK CONSTRAINT [FK_Lieu_Adresse]
GO
ALTER TABLE [dbo].[Utilisateur]  WITH CHECK ADD  CONSTRAINT [FK_Utilisateur_Adresse] FOREIGN KEY([idadr])
REFERENCES [dbo].[Adresse] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Utilisateur] CHECK CONSTRAINT [FK_Utilisateur_Adresse]
GO
USE [master]
GO
ALTER DATABASE [cou_project] SET  READ_WRITE 
GO
