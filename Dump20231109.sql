-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sys
-- ------------------------------------------------------
-- Server version	8.1.0
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `sport`
--
CREATE DATABASE IF NOT EXISTS sys;
USE sys;
DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `sport` (
  `idSport` int NOT NULL AUTO_INCREMENT,
  `sportName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idSport`),
  UNIQUE KEY `idSport_UNIQUE` (`idSport`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `sport`
--
LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */
;
INSERT INTO `sport`
VALUES (1, 'Football'),
  (2, 'Basketball');
/*!40000 ALTER TABLE `sport` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `team`
--
DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `team` (
  `teamID` int NOT NULL AUTO_INCREMENT,
  `TeamName` varchar(45) NOT NULL,
  `Captain` varchar(45) DEFAULT NULL,
  `sport_idSport` int NOT NULL,
  PRIMARY KEY (`teamID`, `sport_idSport`),
  UNIQUE KEY `TeamName_UNIQUE` (`TeamName`),
  UNIQUE KEY `teamID_UNIQUE` (`teamID`),
  KEY `fk_team_sport1_idx` (`sport_idSport`),
  CONSTRAINT `fk_team_sport1` FOREIGN KEY (`sport_idSport`) REFERENCES `sport` (`idSport`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `team`
--
LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */
;
INSERT INTO `team`
VALUES (1, 'Cowboys', '1111111', 1),
  (2, 'Eagles', '2222222', 0);
/*!40000 ALTER TABLE `team` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `team_has_user`
--
DROP TABLE IF EXISTS `team_has_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `team_has_user` (
  `team_teamID` int NOT NULL,
  `user_stuID` varchar(45) NOT NULL,
  PRIMARY KEY (`team_teamID`, `user_stuID`),
  KEY `fk_team_has_user_user1_idx` (`user_stuID`),
  KEY `fk_team_has_user_team1_idx` (`team_teamID`),
  CONSTRAINT `fk_team_has_user_team1` FOREIGN KEY (`team_teamID`) REFERENCES `team` (`teamID`),
  CONSTRAINT `fk_team_has_user_user1` FOREIGN KEY (`user_stuID`) REFERENCES `user` (`stuID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `team_has_user`
--
LOCK TABLES `team_has_user` WRITE;
/*!40000 ALTER TABLE `team_has_user` DISABLE KEYS */
;
INSERT INTO `team_has_user`
VALUES (1, '3333333'),
  (1, '4444444'),
  (1, '7777777');
/*!40000 ALTER TABLE `team_has_user` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `user`
--
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user` (
  `role` int DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `sex` varchar(1) NOT NULL,
  `stuID` varchar(45) NOT NULL,
  `profPicture` varchar(99) DEFAULT NULL,
  PRIMARY KEY (`stuID`),
  UNIQUE KEY `Username_UNIQUE` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `user`
--
LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */
;
INSERT INTO `user`
VALUES (
    1,
    'user@dbu.edu',
    '$2b$10$xwK7hODzOnW9x9UHpUaeGefI1besrtaIfRmmiDvfft9kfNOwDVedi',
    'User',
    '1',
    'M',
    '1111111',
    NULL
  ),
  (
    2,
    'captain@dbu.edu',
    '$2b$10$CLEmkNRhH3lXjYSCQOYszexm/oWFqOnxroQ954hjJLgaq0D4BZOSi',
    'Captain',
    '1',
    'M',
    '2222222',
    NULL
  ),
  (
    3,
    'admin@dbu.edu',
    '$2b$10$/.LygEJ9icOn0ke/Rc68B.tx7u9Ew2RoN04eU8LIULkqLkkaaE6ne',
    'Admin',
    '1',
    'F',
    '3333333',
    NULL
  ),
  (
    4,
    'superadmin@dbu.edu',
    '$2b$10$9o/zWYadi9etZOkNGhf.UuGTnA3/v6cbim8uJ8pauvCHC/3SpA3ne',
    'Super',
    'Admin',
    'F',
    '4444444',
    NULL
  ),
  (
    1,
    'test@dbu.edu',
    '$2b$10$cHPW/yVxruSwCvPcLbRQwekGf/EImqpK8rQ8UpeIvtMSTgQnipugq',
    'Test',
    'User',
    'M',
    '5555555',
    NULL
  ),
  (
    1,
    'johnsmith@dbu.edu',
    '$2b$10$Qgqh5MWdmWaqc1LT6bctMOfCj70.BG/5gKfvuvwvVrYh0Tx2Sn8ne',
    'John',
    'Smith',
    'M',
    '7777777',
    NULL
  );
/*!40000 ALTER TABLE `user` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2023-11-09 15:22:21