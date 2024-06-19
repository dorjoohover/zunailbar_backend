CREATE DATABASE  IF NOT EXISTS `zunailbar_v1` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zunailbar_v1`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: zunailbar_v1
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `additional_services`
--

DROP TABLE IF EXISTS `additional_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `additional_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `additional_serviceName` varchar(255) DEFAULT NULL,
  `default_price` decimal(12,0) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `additional_service_ibfk_2_idx` (`serviceId`) /*!80000 INVISIBLE */,
  CONSTRAINT `additional_service_ibfk_1` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `additional_services`
--

LOCK TABLES `additional_services` WRITE;
/*!40000 ALTER TABLE `additional_services` DISABLE KEYS */;
INSERT INTO `additional_services` VALUES (1,'Нөхөлт',5000,NULL,2,NULL,NULL),(2,'Арилгалт',6000,NULL,2,NULL,NULL),(3,'Хамгаалалтын гель',7000,NULL,2,NULL,NULL);
/*!40000 ALTER TABLE `additional_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_ratings`
--

DROP TABLE IF EXISTS `artist_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `artistId` int NOT NULL,
  `ratingPoint` varchar(45) NOT NULL,
  `ratingComment` varchar(455) DEFAULT NULL,
  `approval` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_ratings`
--

LOCK TABLES `artist_ratings` WRITE;
/*!40000 ALTER TABLE `artist_ratings` DISABLE KEYS */;
INSERT INTO `artist_ratings` VALUES (1,4,1,'5','test',NULL,'2024-05-21 21:53:35','2024-05-21 21:53:35'),(2,4,2,'5','test comment',NULL,'2024-05-22 19:39:22','2024-05-22 19:39:22'),(3,4,1,'5','Баярлалаа',NULL,'2024-05-25 20:17:29','2024-05-25 20:17:29'),(4,4,1,'4','test123',NULL,'2024-05-30 16:33:37','2024-05-30 16:33:37'),(5,4,2,'3','test',NULL,'2024-05-30 22:15:20','2024-05-30 22:15:20');
/*!40000 ALTER TABLE `artist_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_services`
--

DROP TABLE IF EXISTS `artist_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artistId` int NOT NULL,
  `serviceId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_services`
--

LOCK TABLES `artist_services` WRITE;
/*!40000 ALTER TABLE `artist_services` DISABLE KEYS */;
INSERT INTO `artist_services` VALUES (1,1,1,NULL,NULL),(2,1,2,NULL,NULL),(3,1,3,NULL,NULL),(4,2,1,NULL,NULL),(5,2,2,NULL,NULL),(6,2,4,NULL,NULL),(7,2,5,NULL,NULL),(8,3,6,NULL,NULL),(9,3,8,NULL,NULL),(10,3,1,NULL,NULL);
/*!40000 ALTER TABLE `artist_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_timetables`
--

DROP TABLE IF EXISTS `artist_timetables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_timetables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artistId` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_timetables`
--

LOCK TABLES `artist_timetables` WRITE;
/*!40000 ALTER TABLE `artist_timetables` DISABLE KEYS */;
INSERT INTO `artist_timetables` VALUES (1,1,'2024-05-10','12:00:00','16:00:00',NULL,NULL),(2,1,'2024-05-12','17:00:00','19:00:00',NULL,NULL),(3,1,'2024-05-19','10:00:00','12:00:00',NULL,NULL),(4,1,'2024-05-14','10:00:00','16:00:00',NULL,NULL),(5,2,'2024-05-14','08:00:00','14:00:00',NULL,NULL),(6,1,'2024-05-21','08:00:00','14:00:00',NULL,NULL),(7,2,'2024-05-21','08:00:00','14:00:00',NULL,NULL),(8,1,'2024-05-20','08:00:00','17:00:00',NULL,NULL),(9,3,'2024-05-20','10:00:00','16:00:00',NULL,NULL),(10,1,'2024-05-25','10:00:00','14:00:00',NULL,NULL),(11,2,'2024-05-26','08:00:00','17:00:00',NULL,NULL),(12,1,'2024-05-26','08:00:00','15:00:00',NULL,NULL),(13,3,'2024-05-27','08:00:00','14:00:00',NULL,NULL),(14,4,'2024-05-24','08:00:00','17:00:00',NULL,NULL),(15,1,'2024-06-01','08:00:00','14:00:00',NULL,NULL),(16,2,'2024-06-02','08:00:00','16:00:00',NULL,NULL),(17,3,'2024-06-03','08:00:00','18:00:00',NULL,NULL),(18,2,'2024-06-05','10:00:00','14:00:00',NULL,NULL),(19,2,'2024-06-03','10:00:00','16:00:00',NULL,NULL),(20,2,'2024-06-04','12:00:00','18:00:00',NULL,NULL),(21,1,'2024-06-07','12:00:00','18:00:00',NULL,NULL),(22,2,'2024-06-18','13:00:00','19:00:00',NULL,NULL),(23,2,'2024-06-19','13:00:00','19:00:00',NULL,NULL),(24,2,'2024-06-20','13:00:00','19:00:00',NULL,NULL),(25,2,'2024-06-24','13:00:00','19:00:00',NULL,NULL),(26,1,'2024-06-24','08:00:00','17:00:00',NULL,NULL),(27,1,'2024-06-25','08:00:00','17:00:00',NULL,NULL),(28,1,'2024-06-27','08:00:00','17:00:00',NULL,NULL),(29,1,'2024-06-28','08:00:00','17:00:00',NULL,NULL),(30,1,'2024-07-01','08:00:00','17:00:00',NULL,NULL),(31,1,'2024-07-02','08:00:00','17:00:00',NULL,NULL),(32,1,'2024-07-04','08:00:00','17:00:00',NULL,NULL),(33,1,'2024-07-05','08:00:00','17:00:00',NULL,NULL),(34,1,'2024-07-08','08:00:00','17:00:00',NULL,NULL),(35,1,'2024-07-09','08:00:00','17:00:00',NULL,NULL);
/*!40000 ALTER TABLE `artist_timetables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `salary_percent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `branchId` int NOT NULL,
  `jobStartDate` date DEFAULT NULL,
  `jobEndDate` date DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resetToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resetTokenExpire` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Ганболд','Ганцэцэг','1','95802438','bataa5458@gmail.com','bataa',NULL,NULL,NULL,1,NULL,NULL,'d9ba3f472cad62800bbd8423de72af6ce7bbb6abd48e7c5bf4d2e36154cc919b168b08b612f206636fefbd322a52541b568e04539d3db597d1f8079fd653e80b','a105e9dba4ee7306bd01b60835b4db4b',NULL,NULL,NULL,NULL),(2,'Эрдэнэ','Халиун','1','95802438','b20fa1703@ufe.edu.mn','ganaa',NULL,NULL,NULL,1,NULL,NULL,'d9ba3f472cad62800bbd8423de72af6ce7bbb6abd48e7c5bf4d2e36154cc919b168b08b612f206636fefbd322a52541b568e04539d3db597d1f8079fd653e80b','a105e9dba4ee7306bd01b60835b4db4b',NULL,NULL,NULL,NULL),(3,'Мөнх-эрдэнэ','Энхжин','1','95802438','bbatka034@gmail.com','Artist 3',NULL,NULL,NULL,1,NULL,NULL,'d9ba3f472cad62800bbd8423de72af6ce7bbb6abd48e7c5bf4d2e36154cc919b168b08b612f206636fefbd322a52541b568e04539d3db597d1f8079fd653e80b','a105e9dba4ee7306bd01b60835b4db4b',NULL,NULL,NULL,NULL),(4,'Болд','Мягмар','1','95802438','bold@gmail.com','Artist-4',NULL,NULL,NULL,1,'2024-05-16',NULL,'d9ba3f472cad62800bbd8423de72af6ce7bbb6abd48e7c5bf4d2e36154cc919b168b08b612f206636fefbd322a52541b568e04539d3db597d1f8079fd653e80b','a105e9dba4ee7306bd01b60835b4db4b',NULL,NULL,'2024-05-18 18:01:37','2024-05-18 18:01:37');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_details`
--

DROP TABLE IF EXISTS `booking_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookingId` int NOT NULL,
  `custom_price` decimal(12,0) DEFAULT NULL,
  `additionalServiceId` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_details`
--

LOCK TABLES `booking_details` WRITE;
/*!40000 ALTER TABLE `booking_details` DISABLE KEYS */;
INSERT INTO `booking_details` VALUES (6,8,4500,3,NULL,'2024-05-25 16:17:35','2024-05-25 16:21:49'),(7,8,200,2,NULL,'2024-05-25 16:21:49','2024-05-25 16:21:49'),(8,8,100,1,NULL,'2024-05-25 16:21:49','2024-05-25 16:21:49'),(9,3,500,3,NULL,'2024-05-25 17:30:05','2024-05-25 17:30:05');
/*!40000 ALTER TABLE `booking_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `confirmation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `customerId` int DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  `artistId` int DEFAULT NULL,
  `managerId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (4,'2024-05-21','12:00:00','13:00:00',NULL,NULL,4,1,1,NULL,'2024-05-18 14:46:38','2024-05-18 14:46:38'),(5,'2024-05-21','13:00:00','14:00:00',NULL,NULL,4,1,1,NULL,'2024-05-18 14:59:54','2024-05-18 14:59:54'),(6,'2024-05-21','14:00:00','15:00:00',NULL,NULL,4,1,1,NULL,'2024-05-18 15:49:53','2024-05-18 15:49:53'),(7,'2024-05-20','08:00:00','09:00:00',NULL,NULL,4,1,1,NULL,'2024-05-19 11:53:04','2024-05-19 11:53:04'),(8,'2024-05-19','11:00:00','12:00:00',NULL,NULL,4,1,1,NULL,'2024-05-19 11:54:27','2024-05-19 11:54:27'),(9,'2024-05-20','10:00:00','11:00:00',NULL,NULL,3,8,3,NULL,'2024-05-19 21:08:55','2024-05-19 21:08:55'),(10,'2024-05-21','08:00:00','09:00:00',NULL,NULL,4,1,1,NULL,'2024-05-20 11:15:57','2024-05-20 11:15:57'),(11,'2024-05-21','09:00:00','10:00:00',NULL,NULL,4,2,1,NULL,'2024-05-20 11:16:11','2024-05-20 11:16:11'),(13,'2024-05-21','10:00:00','11:00:00',NULL,NULL,4,2,2,NULL,'2024-05-21 19:01:20','2024-05-21 19:01:20'),(14,'2024-05-21','14:00:00','15:00:00',NULL,NULL,4,2,2,NULL,'2024-05-21 19:05:44','2024-05-21 19:05:44'),(15,'2024-05-25','12:00:00','13:00:00',NULL,NULL,4,1,1,NULL,'2024-05-21 19:07:00','2024-05-21 19:07:00'),(16,'2024-05-25','13:00:00','14:00:00',NULL,NULL,4,1,1,NULL,'2024-05-23 17:14:57','2024-05-23 17:14:57'),(20,'2024-05-26','08:00:00','10:00:00',NULL,NULL,4,2,2,NULL,'2024-05-25 20:33:49','2024-05-25 20:33:49'),(21,'2024-06-01','08:00:00','09:00:00',NULL,NULL,4,1,1,NULL,'2024-05-28 14:39:28','2024-05-28 14:39:28'),(22,'2024-06-01','09:00:00','10:00:00',NULL,NULL,4,1,1,NULL,'2024-05-30 19:27:37','2024-05-30 19:27:37'),(23,'2024-06-02','08:00:00','10:00:00',NULL,NULL,4,4,2,NULL,'2024-05-30 22:14:38','2024-05-30 22:14:38'),(24,'2024-06-01','10:00:00','11:00:00',NULL,NULL,4,1,1,NULL,'2024-05-31 15:35:58','2024-05-31 15:35:58'),(25,'2024-06-01','11:00:00','12:00:00',NULL,NULL,4,1,1,NULL,'2024-05-31 15:44:39','2024-05-31 15:44:39'),(26,'2024-06-07','12:00:00','13:00:00',NULL,NULL,4,1,1,NULL,'2024-06-05 13:50:18','2024-06-05 13:50:18'),(27,'2024-06-07','13:00:00','15:00:00',NULL,NULL,4,2,1,NULL,'2024-06-05 14:11:34','2024-06-05 14:11:34');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branch` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'ZuNailbar_1','ZuNailbar_1',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` int DEFAULT NULL,
  `serviceId` int DEFAULT NULL,
  `artistId` int DEFAULT NULL,
  `commentText` varchar(455) DEFAULT NULL,
  `approval` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `confirm` varchar(255) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `membership` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `confirmationToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `confirmationTokenExpire` datetime DEFAULT NULL,
  `resetToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `resetTokenExpire` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Мөнхбуян','Хонгор','9','90460052','test@gmail.com','1','0de84ad4223e79df768279b4d442e12eb7666019513ff75113d8b5206d2c75e47e210845842aeed9cd82bea0fd5d46ac7f2e5707fea38272221ee4f60cf9ab7d','f8268a5c6e0bf1ff277e8326d1ed0698',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-01 01:05:39','2024-05-01 01:05:39'),(3,'Батболд','Ганбат','9','99460052','bbatka034@gmail.com','1','a09f6ef8ed1b8e028a61080fce087ba32edaad4fd3eddb462a59945b99f21e4bf6c7948f3e09497d02ad8b17802c63058b0b49a0ae80d028ed25ca1190646b59','c9866656afcb968348491d6e58d00878',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-01 01:05:39','2024-05-01 01:05:39'),(4,'Батхишиг','Батнасан','9','95802438','b20fa1703@ufe.edu.mn','1','0de84ad4223e79df768279b4d442e12eb7666019513ff75113d8b5206d2c75e47e210845842aeed9cd82bea0fd5d46ac7f2e5707fea38272221ee4f60cf9ab7d','f8268a5c6e0bf1ff277e8326d1ed0698',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-09 21:51:52','2024-05-09 22:46:43'),(8,'Ханбогд','Хангал','9','90304025','s@gmail.com',NULL,'4cab06a8e3be578b987ece1a7d1d08b1791b14a3b02aa7999774a89a45011e593e7e25da397befb34ee635284e8ebed57c92de13fce6c45cded9c61e39eff118','6a93e565cfead89bc056ee59793337f9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-05-24 21:29:35','2024-05-24 21:29:35'),(9,'TEST','TEST','9','99460052','bataa5458@gmail.com','1','c38b83370bb4ed13fb3347c3b9e9f457956dab0a5ba8f1a51034cae8c3dbab516b2cb554a227ea11d236ef8956812bf16239c3bd9b41909efb169d0f2e59c633','ef2bac08ec73d64eb1d5aec34498a0c2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-06-19 22:54:12','2024-06-19 23:00:50');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `salary_percent` varchar(255) DEFAULT NULL,
  `branchId` int NOT NULL,
  `jobStartDate` date DEFAULT NULL,
  `jobEndDate` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpire` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
INSERT INTO `managers` VALUES (1,'Батхишиг','Батнасан','0','95802438','b20fa1703@ufe.edu.mn','adminUser',NULL,'manager',NULL,1,'2024-05-16',NULL,'29bfedee7dd7367646f66ed28c1ab46d300bfe567680d37696776941b62ea8ead7e0fc653cf5b349a840dfe1223e742a42cfab1e56b540ab14fd02373a1b91dd','af65ffafe4f2d247db5c6324547b0ae2',NULL,NULL,'2024-05-18 17:07:12','2024-05-18 17:07:12');
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branchId` int DEFAULT NULL,
  `income` decimal(12,0) DEFAULT NULL,
  `serviceTakenCount` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_groups`
--

DROP TABLE IF EXISTS `service_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceGroupName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(12,0) DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_groups`
--

LOCK TABLES `service_groups` WRITE;
/*!40000 ALTER TABLE `service_groups` DISABLE KEYS */;
INSERT INTO `service_groups` VALUES (1,'MANICURE, PEDICURE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'LASH',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'WAX',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `service_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` decimal(12,0) NOT NULL,
  `duration` int NOT NULL DEFAULT '1',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isDefault` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `serviceGroupId` int DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servicel_type_ibfk_2_idx` (`serviceGroupId`),
  CONSTRAINT `servicel_type_ibfk_2` FOREIGN KEY (`serviceGroupId`) REFERENCES `service_groups` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Педикюр спатай',55000,1,NULL,NULL,'http://localhost:4001/api/v1/1718782706912.jpg',NULL,NULL,1,NULL,NULL,'2024-06-19 15:38:28'),(2,'гелэн будалт',40000,2,NULL,NULL,'http://localhost:3000/img/manicure-1.jpg',NULL,NULL,1,NULL,NULL,NULL),(4,'Маникюр хэлбэр засалт, цэвэрлэгээ',20000,2,NULL,NULL,'http://localhost:3000/img/manicure-2.jpg',NULL,NULL,1,NULL,NULL,'2024-05-25 20:51:29'),(5,'Педикюр хэлбэр засалт, цэвэрлэгээ',30000,1,NULL,NULL,'http://localhost:3000/img/manicure-3.jpg',NULL,NULL,1,NULL,NULL,NULL),(6,'смарт хумстай будалт',60000,1,NULL,NULL,'http://localhost:3000/img/manicure-4.jpg',NULL,NULL,1,NULL,NULL,NULL),(8,'гелэн будаг арилгалт, хумс салгалт',7000,1,NULL,NULL,'http://localhost:3000/img/manicure-5.jpg',NULL,NULL,1,NULL,NULL,NULL),(10,'Классик',40000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,2,NULL,NULL,NULL),(11,'2D',50000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,2,NULL,NULL,NULL),(12,'3D',60000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,2,NULL,NULL,NULL),(13,'Хөмсөг сормуус хими',40000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,2,NULL,NULL,NULL),(14,'Сормуус хими',25000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,2,NULL,NULL,NULL),(15,'Бүтэн бие',60000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,3,NULL,NULL,NULL),(16,'Бикини',30000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,3,NULL,NULL,NULL),(17,'Суга',10000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,3,NULL,NULL,NULL),(18,'Хөл бүтэн',30000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,3,NULL,NULL,NULL),(19,'Гар бүтэн',30000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,3,NULL,NULL,NULL),(20,'Нүүр',35000,1,NULL,NULL,'http://localhost:3000/img/zunailbar_logo.jpg',NULL,NULL,3,NULL,NULL,NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-19 23:02:23
