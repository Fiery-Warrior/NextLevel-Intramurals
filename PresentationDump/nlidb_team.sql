-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 47.186.237.244    Database: nlidb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `teamID` int NOT NULL AUTO_INCREMENT,
  `TeamName` varchar(45) NOT NULL,
  `Captain` varchar(45) DEFAULT NULL,
  `sport_idSport` int NOT NULL,
  PRIMARY KEY (`teamID`,`sport_idSport`),
  UNIQUE KEY `TeamName_UNIQUE` (`TeamName`),
  UNIQUE KEY `teamID_UNIQUE` (`teamID`),
  KEY `fk_team_sport1_idx` (`sport_idSport`),
  CONSTRAINT `fk_team_sport1` FOREIGN KEY (`sport_idSport`) REFERENCES `sport` (`idSport`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (2,'Heat','2222222',2),(5,'Beagles','1033662',2),(6,'Bengals','2148576',5),(8,'New York Giants','9103662',1),(9,'Mavericks','1123476',2),(10,'Feat','2132838',5),(11,'Lakers','7932212',2),(12,'Warriors','7847612',2),(13,'Celtics','1935135',2),(14,'Supernovas','7777777',3),(15,'Vibe','7587581',3),(16,'Fury','7514077',3),(17,'Rise','7587581',3),(18,'Valkyries','7514077',3),(20,'Paddle Masters','6305774',4),(22,'Spin Wizards','5555555',4),(23,'Net Ninjas','2006549',4),(24,'Rally Raiders','4444444',4),(25,'Smash Squad','4436638',4),(28,'Ace Achievers','1059110',5),(29,'Rally Royals','3912068',5),(30,'Serve Sentries','3436619',5),(31,'Court Conquerors','3333333',5),(32,'Baseline Brigade','2948135',5),(33,'Diamond Divas','000601724',6),(34,'Strikeout Stars','2222222',6),(35,'Homerun Heroes','2136582',6),(36,'Batting Belles','2124450',6),(37,'Pitch Perfect','1833960',6),(38,'My new team',NULL,4),(39,'New Football Team','1075785',1);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 21:11:44
