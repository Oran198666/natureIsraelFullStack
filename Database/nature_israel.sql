CREATE DATABASE  IF NOT EXISTS `nature_israel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nature_israel`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: nature_israel
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `regionId` int NOT NULL AUTO_INCREMENT,
  `regionName` varchar(100) NOT NULL,
  PRIMARY KEY (`regionId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'North'),(2,'Galilee'),(3,'Golan Heights'),(4,'Coastal Plain'),(5,'Center'),(6,'Jerusalem Hills'),(7,'Shephelah'),(8,'Dead Sea'),(9,'Negev'),(10,'Eilat and Arava');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sites` (
  `siteId` int NOT NULL AUTO_INCREMENT,
  `siteName` varchar(100) NOT NULL,
  `siteDescription` varchar(2000) NOT NULL,
  `regionId` int NOT NULL,
  `entryPrice` decimal(6,2) NOT NULL DEFAULT '0.00',
  `childEntryPrice` decimal(6,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`siteId`),
  KEY `fk_region_list` (`regionId`),
  CONSTRAINT `fk_region_list` FOREIGN KEY (`regionId`) REFERENCES `regions` (`regionId`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sites`
--

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` VALUES (1,'Nahal Taninim','A short riverside walk along a Roman-era aqueduct and dam. Shaded for most of the route and suitable for strollers. Best in spring when the water level is high.',1,22.00,9.00),(2,'Mount Carmel Ridge','Panoramic ridge trail with views toward Haifa Bay. Marked circular route of about four kilometres with a steep final ascent.',1,0.00,0.00),(3,'Nahal Amud','Stream trail through the Upper Galilee passing old flour mills. The lower section stays wet year-round and requires water shoes.',2,28.00,14.00),(4,'Montfort Castle','Crusader fortress ruins reached by a descending path through oak woodland. Allow two hours for the round trip.',2,18.00,8.00),(5,'Banias Waterfall','The largest waterfall in the country, reached by a boardwalk over the stream. Combine with the nearby springs and temple ruins.',3,35.00,21.00),(6,'Mount Bental','Former military outpost with bunkers open to visitors and views across the border. Very exposed, so avoid midday in summer.',3,0.00,0.00),(7,'Caesarea Harbour','Coastal archaeological park with a Roman theatre, hippodrome and harbour ruins. Paths are flat and mostly paved.',4,45.00,27.00),(8,'Nahal Alexander','Riverside path known for its soft-shell turtles. Level ground throughout, with a wooden viewing bridge at the midpoint.',4,0.00,0.00),(9,'Yarkon Park Springs','Urban park section following the river, with rental boats and shaded lawns. Popular for family picnics on weekends.',5,0.00,0.00),(10,'Apollonia National Park','Cliffside fortress overlooking the sea, with a short loop past the moat and gatehouse. Sunset views are the main draw.',5,22.00,9.00),(11,'Sataf','Terraced hillside with restored ancient springs and irrigation channels. Two marked loops of varying difficulty through fruit orchards.',6,0.00,0.00),(12,'Ein Hemed','Small park around a Crusader farmhouse with a stream and lawns. Fully accessible and a good option with young children.',6,28.00,14.00),(13,'Beit Guvrin Caves','Complex of bell caves, columbaria and burial chambers carved into soft chalk. Bring a light for the deeper sections.',7,39.00,24.00),(14,'Tel Lachish','Excavated biblical-period city gate and palace platform. Open ground with little shade and a short walk from the car park.',7,14.00,7.00),(15,'Ein Gedi Nature Reserve','Desert oasis with waterfalls and ibex along the trail. Start early in summer and carry more water than you expect to need.',8,29.00,15.00),(16,'Masada Snake Path','Steep ascent to the fortress plateau, best begun before sunrise. A cable car operates for those who prefer not to climb.',8,31.00,17.00),(17,'Makhtesh Ramon','The largest erosion crater in the world, with viewpoints along the rim and marked routes descending to the floor.',9,28.00,14.00),(18,'Ein Avdat','Canyon walk between chalk cliffs to a spring-fed pool. One-way route with a ladder section near the end.',9,28.00,14.00),(19,'Timna Park','Ancient copper mines and rock formations including Solomon Pillars. Driving route with short walks at each stop.',10,49.00,39.00),(20,'Red Canyon','Narrow sandstone gorge with handholds and ladders through the tightest sections. Roughly ninety minutes for the full loop.',10,0.00,0.00);
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-16 12:36:37
