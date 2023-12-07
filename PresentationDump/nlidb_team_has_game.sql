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
-- Table structure for table `team_has_game`
--

DROP TABLE IF EXISTS `team_has_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_has_game` (
  `team_teamID` int NOT NULL,
  `team_sport_idSport` int NOT NULL,
  `game_gameID` int NOT NULL,
  `score` int DEFAULT '0',
  `forfeited` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`team_teamID`,`team_sport_idSport`,`game_gameID`),
  UNIQUE KEY `team_game_unique` (`team_teamID`,`game_gameID`),
  KEY `fk_team_has_game_game1_idx` (`game_gameID`),
  KEY `fk_team_has_game_team1_idx` (`team_teamID`,`team_sport_idSport`),
  CONSTRAINT `fk_team_has_game_game1` FOREIGN KEY (`game_gameID`) REFERENCES `game` (`gameID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_has_game`
--

LOCK TABLES `team_has_game` WRITE;
/*!40000 ALTER TABLE `team_has_game` DISABLE KEYS */;
INSERT INTO `team_has_game` VALUES (5,1,61,12,0),(8,1,61,7,0),(9,2,58,0,0),(9,2,59,0,0),(10,2,59,0,1),(11,2,58,0,0);
/*!40000 ALTER TABLE `team_has_game` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-06 21:11:43
