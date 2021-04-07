-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 12, 2021 at 07:29 AM
-- Server version: 8.0.18
-- PHP Version: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_local_hiddengem`
--
CREATE DATABASE IF NOT EXISTS `travel_local_hiddengem` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `travel_local_hiddengem`;

-- --------------------------------------------------------

--
-- Table structure for table `hiddengem`
--

DROP TABLE IF EXISTS `hiddengem`;
CREATE TABLE IF NOT EXISTS `hiddengem` (
  `poiUUID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `postalCode` int(11) NOT NULL,
  `description` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `locCategory` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `imageUrl` varchar(256) NOT NULL,
  `latitude` float(18,14) NOT NULL,
  `longitude` float(18,14) NOT NULL,
  `theme` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `businessContact` int(11) NOT NULL,
  `businessEmail` varchar(256) NOT NULL,
  `openTime` time NOT NULL,
  `closeTime` time NOT NULL,
  `businessWeb` varchar(256) NOT NULL,
  PRIMARY KEY (`poiUUID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hiddengem`
--

INSERT INTO `hiddengem` (`poiUUID`, `name`, `address`, `postalCode`, `description`, `locCategory`, `rating`, `imageUrl`, `latitude`, `longitude`, `theme`, `businessContact`, `businessEmail`, `openTime`, `closeTime`, `businessWeb`) VALUES
(1, 'Singapore Last Village', '23E LORONG BUANG KOK KAMPONG LORONG BUANG KOK SINGAPORE 547578', 547578, 'Kampong Lorong Buangkok is a residential area so be respectful by avoiding taking photographs of private homes and make too much noise', 'walking_trail', 5, 'Kampong_Lorong_Buangkok.jpg', 1.38420081138611, 103.87859344482422, 'Family', 0, 'NIL', '09:00:00', '21:00:00', 'NIL'),
(2, 'Last surviving Hakka cemetery', '9 COMMONWEALTH LANE SINGAPORE 149551', 149551, 'Take a view from one of the surrounding flats and be wowed by the sheer magnitude of this place.', 'venue', 5, 'Hakka_cemetery.jpg', 1.30572843551636, 103.79593658447266, 'Casual', 149551, 'Hcemetery@live.com', '09:00:00', '21:00:00', 'NIL'),
(3, 'Sembawang Hotspring', '500 GAMBAS AVENUE SINGAPORE 756952', 756952, 'Nice place for a Sunday family outing', 'venue', 4, 'sembawang-pool.jpg', 1.43447697162628, 103.82334136962890, 'Family', 0, 'NIL', '07:00:00', '19:00:00', 'npark.gov.sg'),
(4, 'Water tank that looks like a space ship', '3 WESTBOURNE ROAD WESSEX SINGAPORE 138943', 138943, 'There is an abundance of cafes around Portsdown Road. Instagram worthy place!', 'walking_trail', 3, 'water_tank.jpg', 1.29476535320282, 103.79651641845703, 'Nature', 0, 'NIL', '12:00:00', '12:00:00', 'NIL'),
(5, 'Incredible street art of Singapore’s history at Everton Park', '17 EVERTON ROAD EVERTON COURT SINGAPORE 089373', 89373, 'Learn about the history of Singapore!', 'attractions', 4, 'evertonpark.jpg', 1.27673375606537, 103.83755493164062, 'Casual', 0, 'NIL', '08:00:00', '22:00:00', 'NIL'),
(6, 'HUGE naval gun installed by the British', '27 COSFORD ROAD SINGAPORE 499549', 499549, 'If you like big guns, pay the Johore Battery a visit because this is definitely one of the biggest guns we’ve ever seen in our lives, let alone in Singapore. ', 'attractions', 3, 'Naval_gun.jpg', 1.36532115936279, 103.98001098632812, 'Family', 0, 'NIL', '12:00:00', '12:00:00', 'NIL'),
(7, 'Abandoned school in Braddell', '321 Braddell Rd, Singapore 579708', 579708, 'The former Braddell-Westlake Secondary School has been abandoned since 2005, and similar to other abandoned places, eerie vibes here are at an all time high. Graffitied walls, shattered windows and dusty floors are a dead giveaway on this place’s inhabitan', 'walking_trail', 4, 'school.jpg', 0.00000000000000, 0.00000000000000, 'Family', 0, 'NIL', '08:00:00', '22:00:00', 'NIL'),
(8, 'Mysterious figurines', '27A LOEWEN ROAD SINGAPORE 248839', 248839, 'You’ve heard of Da Vinci and Van Gogh, but how well do you know our Asian artists? Well, now you can do so for free at MOCA. A one-of-a-kind museum, this place has a number of tall sculptures dancing and standing at attention out in the open.', 'attractions', 4, 'Mystery_figure.jpg', 1.30355000495911, 103.81221008300781, 'Casual', 0, 'NIL', '12:00:00', '12:00:00', 'NIL'),
(9, 'Toa Payoh Dragon Playground', '28 Lor 6 Toa Payoh, Singapore ', 310028, 'One of the early playgrounds designed by the Housing & Development Board, Toa Payoh\'s Dragon Playground is one of two remaining playgrounds with this dragon design in Singapore.', 'venue', 5, 'toa-payoh-dragon-playground.png', 0.00000000000000, 0.00000000000000, 'Family', 0, 'NIL', '10:00:00', '22:00:00', 'NIL'),
(10, 'Japanese cemetery', '825B CHUAN HOE AVENUE LAM HAI POH TOH SAN TEMPLE SINGAPORE 549853', 549853, 'This cemetery houses 910 tombstones that contain the remains of members of the Japanese community in Singapore, including civilians, soldiers and convicted war criminals executed in Changi Prison. Walking around the place, I couldn’t help but notice how th', 'walking_trail', 5, 'Jap_cemetery.jpg', 1.36510658264160, 103.87596130371094, 'Casual', 0, 'NIL', '09:00:00', '21:00:00', 'NIL'),
(11, 'Giant fruits playground', '856F TAMPINES STREET 82 TAMPINES ARCADIA SINGAPORE 526856', 526856, 'A relic from the past, this old school watermelon playground will bring back the feels as you reminisce about playing catching and blind-mice at your void deck playground.\n', 'attractions', 4, 'fruit_playground.jpg', 1.35291278362274, 103.93835449218750, 'Family', 0, 'NIL', '09:30:00', '21:30:00', 'NIL'),
(12, 'Monastery that will make you feel like you’re in Taiwan', '88 BRIGHT HILL ROAD BRIGHT HILL COLUMBARIUM SINGAPORE 574117', 574117, 'Bright Hill Temple is the largest monastery in Singapore, with more than 90 years of history. The entire temple felt like a beautiful maze, where getting lost in the sculptures, paintings and architecture was a blessing.', 'venue', 5, 'monastery.jpg', 1.36051988601685, 103.83651733398438, 'Casual', 68495300, 'NIL', '08:00:00', '21:00:00', 'www.kmspks.org'),
(13, 'Raffles Marina Lighthouse', '10 TUAS WEST DRIVE RAFFLES MARINA SINGAPORE 638404', 638404, 'If you think Singapore doesn’t have a lighthouse, think again – we have Raffles Marina Lighthouse. It is located within the Raffles Marina Club compound, which was built in 1994 and overlooks the Tuas Second Link. It is a hotspot for wedding photoshoots, a', 'venue', 4, 'Raffles_Marina_Lighthouse.png', 1.34158802032471, 103.63508605957031, 'Casual', 0, 'NIL', '08:00:00', '23:00:00', 'NIL'),
(18, 'Syonan Jinja', '182 LORNIE ROAD SINGAPORE 298717', 298717, '', 'walking_trail', 5, 'shrine.jpg', 1.33997476100922, 103.83297729492188, 'Casual', 0, '', '06:00:00', '22:00:00', '');
--
-- Database: `travel_local_itinerary`
--
CREATE DATABASE IF NOT EXISTS `travel_local_itinerary` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `travel_local_itinerary`;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `eventID` int(11) NOT NULL AUTO_INCREMENT,
  `poiUUID` varchar(256) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `eventDate` date NOT NULL,
  `locType` varchar(256) NOT NULL,
  `locCategory` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `itineraryID` int(11) NOT NULL,
  PRIMARY KEY (`eventID`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventID`, `poiUUID`, `startTime`, `endTime`, `eventDate`, `locType`, `locCategory`, `itineraryID`) VALUES
(61, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '09:00:00', '15:30:00', '2021-11-18', 'TA', 'attractions', 9),
(62, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '18:00:00', '2021-11-19', 'TA', 'food_beverages', 9),
(63, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '13:00:00', '2021-11-19', 'TA', 'attractions', 9),
(64, '00263e942d6b94a4cfd8b6ecd6f8fe41f59', '14:00:00', '18:00:00', '2021-11-18', 'TA', 'attractions', 9),
(65, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '19:00:00', '2021-12-16', 'TA', 'attractions', 15),
(66, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2021-11-14', 'TA', 'attractions', 8),
(67, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2021-11-14', 'TA', 'food_beverages', 8),
(68, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2021-11-15', 'TA', 'attractions', 8),
(69, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2021-11-15', 'TA', 'food_beverages', 8),
(70, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2021-11-16', 'TA', 'attractions', 8),
(71, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2021-11-26', 'TA', 'attractions', 10),
(72, '3', '15:00:00', '19:00:00', '2021-11-26', 'HG', 'venue', 10),
(73, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2021-11-14', 'TA', 'attractions', 22),
(74, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2021-11-14', 'TA', 'food_beverages', 22),
(75, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2021-11-15', 'TA', 'attractions', 22),
(76, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2021-11-15', 'TA', 'food_beverages', 22),
(77, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2021-11-16', 'TA', 'attractions', 22),
(78, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2021-11-26', 'TA', 'attractions', 23),
(79, '3', '15:00:00', '19:00:00', '2021-11-26', 'HG', 'venue', 23),
(80, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2021-11-14', 'TA', 'attractions', 7),
(81, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2021-11-14', 'TA', 'food_beverages', 7),
(82, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2021-11-15', 'TA', 'attractions', 7),
(83, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2021-11-15', 'TA', 'food_beverages', 7),
(84, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2021-11-16', 'TA', 'attractions', 7),
(85, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2021-11-26', 'TA', 'attractions', 18),
(86, '3', '15:00:00', '19:00:00', '2021-11-26', 'HG', 'venue', 18),
(87, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2021-11-14', 'TA', 'attractions', 19),
(88, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2021-11-14', 'TA', 'food_beverages', 19),
(89, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2021-11-15', 'TA', 'attractions', 19),
(90, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2021-11-15', 'TA', 'food_beverages', 19),
(91, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2021-11-16', 'TA', 'attractions', 19),
(92, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2021-11-26', 'TA', 'attractions', 35),
(93, '3', '15:00:00', '19:00:00', '2021-11-26', 'HG', 'venue', 35),
(94, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2021-11-14', 'TA', 'attractions', 5),
(95, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2021-11-14', 'TA', 'food_beverages', 5),
(96, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2021-11-15', 'TA', 'attractions', 5),
(97, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2021-11-15', 'TA', 'food_beverages', 5),
(98, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2021-11-16', 'TA', 'attractions', 5),
(99, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2021-11-26', 'TA', 'attractions', 6),
(100, '3', '15:00:00', '19:00:00', '2021-11-26', 'HG', 'venue', 6),
(128, '0055c53bc7c6b41485e8a131e31d7119e41', '10:00:00', '12:30:00', '2021-12-25', 'TA', 'food_beverages', 81),
(129, '3', '13:45:00', '16:00:00', '2021-12-25', 'HG', 'venue', 81),
(130, '002f7ff7096635b4a698fead4a60518ad23', '17:15:00', '20:00:00', '2021-12-25', 'TA', 'attractions', 81),
(131, '0055c53bc7c6b41485e8a131e31d7119e41', '09:00:00', '11:00:00', '2021-12-25', 'TA', 'food_beverages', 82),
(132, '3', '12:45:00', '15:00:00', '2021-12-25', 'HG', 'venue', 82),
(134, '14', '18:00:00', '20:00:00', '2021-12-25', 'HG', 'walking_trail', 82),
(135, '0055c53bc7c6b41485e8a131e31d7119e41', '10:00:00', '12:30:00', '2021-12-25', 'TA', 'food_beverages', 83),
(136, '3', '13:45:00', '16:00:00', '2021-12-25', 'HG', 'venue', 83),
(137, '002f7ff7096635b4a698fead4a60518ad23', '17:15:00', '20:00:00', '2021-12-25', 'TA', 'attractions', 83),
(138, '0055c53bc7c6b41485e8a131e31d7119e41', '09:00:00', '11:30:00', '2021-12-25', 'TA', 'food_beverages', 84),
(139, '3', '12:45:00', '15:00:00', '2021-12-25', 'HG', 'venue', 84),
(141, '15', '18:00:00', '22:00:00', '2021-12-25', 'HG', 'walking_trail', 84),
(142, '0055c53bc7c6b41485e8a131e31d7119e41', '10:00:00', '12:30:00', '2021-12-25', 'TA', 'food_beverages', 85),
(143, '3', '13:45:00', '16:00:00', '2021-12-25', 'HG', 'venue', 85),
(144, '002f7ff7096635b4a698fead4a60518ad23', '17:15:00', '20:00:00', '2021-12-25', 'TA', 'attractions', 85),
(145, '0055c53bc7c6b41485e8a131e31d7119e41', '09:00:00', '11:30:00', '2021-12-25', 'TA', 'food_beverages', 86),
(146, '3', '12:45:00', '15:00:00', '2021-12-25', 'HG', 'venue', 86),
(148, '16', '16:00:00', '22:00:00', '2021-12-25', 'HG', 'walking_trail', 86),
(149, '0055c53bc7c6b41485e8a131e31d7119e41', '10:00:00', '12:30:00', '2021-12-25', 'TA', 'food_beverages', 87),
(150, '3', '13:45:00', '16:00:00', '2021-12-25', 'HG', 'venue', 87),
(151, '002f7ff7096635b4a698fead4a60518ad23', '17:15:00', '20:00:00', '2021-12-25', 'TA', 'attractions', 87),
(152, '0055c53bc7c6b41485e8a131e31d7119e41', '10:00:00', '12:30:00', '2021-12-25', 'TA', 'food_beverages', 88),
(153, '3', '13:45:00', '16:00:00', '2021-12-25', 'HG', 'venue', 88),
(154, '002f7ff7096635b4a698fead4a60518ad23', '17:15:00', '20:00:00', '2021-12-25', 'TA', 'attractions', 88),
(155, '0055c53bc7c6b41485e8a131e31d7119e41', '09:00:00', '11:30:00', '2021-12-25', 'TA', 'food_beverages', 89),
(156, '3', '12:45:00', '15:00:00', '2021-12-25', 'HG', 'venue', 89),
(158, '17', '16:00:00', '22:00:00', '2021-12-25', 'HG', 'walking_trail', 89),
(159, '0055c53bc7c6b41485e8a131e31d7119e41', '10:00:00', '12:30:00', '2021-12-25', 'TA', 'food_beverages', 90),
(160, '3', '13:45:00', '16:00:00', '2021-12-25', 'HG', 'venue', 90),
(161, '002f7ff7096635b4a698fead4a60518ad23', '17:15:00', '20:00:00', '2021-12-25', 'TA', 'attractions', 90),
(162, '0055c53bc7c6b41485e8a131e31d7119e41', '09:00:00', '11:30:00', '2021-12-25', 'TA', 'food_beverages', 91),
(163, '3', '12:45:00', '15:00:00', '2021-12-25', 'HG', 'venue', 91),
(165, '18', '16:00:00', '22:00:00', '2021-12-25', 'HG', 'walking_trail', 91),
(167, '00247a2707af0134f6ab71e50c29285cedf', '14:00:00', '17:30:00', '2021-03-03', 'TA', 'attractions', 92);

-- --------------------------------------------------------

--
-- Table structure for table `itinerary`
--

DROP TABLE IF EXISTS `itinerary`;
CREATE TABLE IF NOT EXISTS `itinerary` (
  `itineraryID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `theme` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userID` int(11) NOT NULL,
  `shared` int(11) NOT NULL,
  PRIMARY KEY (`itineraryID`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `itinerary`
--

INSERT INTO `itinerary` (`itineraryID`, `name`, `startDate`, `endDate`, `theme`, `userID`, `shared`) VALUES
(5, 'Proof That TRIP Really Fun', '2021-11-14', '2021-11-16', 'Nature', 6, 43),
(6, 'Easy and Faster TRIP', '2021-11-26', '2021-11-26', 'Romantic', 6, 152),
(7, 'Fast-Track Your TRIP', '2021-11-14', '2021-11-16', 'Family', 4, 123),
(9, '15 Tips For TRIP Success', '2021-11-18', '2021-11-19', 'Romantic', 3, 160),
(10, 'No More Mistakes With TRIP', '2021-11-26', '2021-11-26', 'family', 1, 111),
(15, 'TRIP: What A Mistake!', '2021-12-16', '2021-12-16', 'Nature', 3, 57),
(18, 'Who Else Wants To Enjoy TRIP', '2021-11-26', '2021-11-26', 'Family', 4, 118),
(19, 'Unforgivable TRIP', '2021-11-14', '2021-11-16', 'Romantic', 5, 179),
(22, 'How To Turn TRIP Into Success', '2021-11-14', '2021-11-16', 'Nature', 2, 114),
(23, 'Here Is What You Should Do For Your TRIP', '2021-11-26', '2021-11-26', 'Casual', 2, 101),
(35, 'How To Turn Your TRIP From Zero To Hero', '2021-11-26', '2021-11-26', 'Family', 5, 40),
(90, 'A sweet date with Ri Sol-ju', '2021-12-25', '2021-12-25', 'nature', 23, 1),
(91, 'A sweet date with Son Ye Jin', '2021-12-25', '2021-12-25', 'casual', 1, 0),
(92, 'Manihom', '2021-03-03', '2021-03-12', 'casual', 1, 0);
--
-- Database: `travel_local_log`
--
CREATE DATABASE IF NOT EXISTS `travel_local_log` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `travel_local_log`;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
CREATE TABLE IF NOT EXISTS `log` (
  `logID` int(11) NOT NULL AUTO_INCREMENT,
  `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int(11) NOT NULL,
  `action` varchar(256) NOT NULL,
  `logDetails` varchar(256) NOT NULL,
  `status` varchar(256) NOT NULL,
  PRIMARY KEY (`logID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Database: `travel_local_recommendation`
--
CREATE DATABASE IF NOT EXISTS `travel_local_recommendation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `travel_local_recommendation`;

-- --------------------------------------------------------

--
-- Table structure for table `recommendation`
--

DROP TABLE IF EXISTS `recommendation`;
CREATE TABLE IF NOT EXISTS `recommendation` (
  `theme` varchar(256) NOT NULL,
  `poiUUID` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `postalCode` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `locCategory` varchar(256) NOT NULL,
  `rating` int(11) NOT NULL,
  `imageURL` varchar(256) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `businessContact` int(11) DEFAULT NULL,
  `businessEmail` int(11) DEFAULT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `businessWeb` varchar(256) DEFAULT NULL,
  `locType` varchar(256) NOT NULL,
  PRIMARY KEY (`theme`,`poiUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recommendation`
--


INSERT INTO `recommendation` (`theme`, `poiUUID`, `name`, `address`, `postalCode`, `description`, `locCategory`, `rating`, `imageURL`, `latitude`, `longitude`, `businessContact`, `businessEmail`, `startTime`, `endTime`, `businessWeb`, `locType`) VALUES
('Casual', '002e9e0c7deeb274ef989487d795f6e5c12', 'ArtScience Museum', '6 Bayfront Ave, Singapore 018974', 18974, 'ArtScience Museum is a museum within the integrated resort of Marina Bay Sands in the Downtown Core of the Central Area in Singapore.', 'attractions', 4, 'artscience_museum.jpg', 1.28099, 103.858, 66888888, NULL, '10:00:00', '19:00:00', 'https://www.marinabaysands.com/museum.html', 'TA'),
('Casual', '10', 'Japanese cemetery', '825B CHUAN HOE AVENUE LAM HAI POH TOH SAN TEMPLE SINGAPORE 549853', 549853, 'This cemetery houses 910 tombstones that contain the remains of members of the Japanese community in Singapore, including civilians, soldiers and convicted war criminals executed in Changi Prison.', 'walking_trail', 5, 'Jap_cemetery.jpg', 1.36511, 103.876, NULL, NULL, '09:00:00', '21:00:00', NULL, 'HG'),
('Casual', '5', 'Incredible street art of Singapore’s history at Everton Park', '17 EVERTON ROAD EVERTON COURT SINGAPORE 089373', 89373, 'Learn about the history of Singapore!', 'attractions', 4, 'evertonpark.jpg', 1.27673, 103.838, NULL, NULL, '08:00:00', '22:00:00', NULL, 'HG'),
('Family', '0021215eb07ce95451b8f31ece6750e2269', 'Wild Wild Wet', '1 Pasir Ris Cl, Singapore 519599', 519599, 'Wild Wild Wet is one of Singapore’s largest water parks that promises a day of thrills and spills for the whole family. Situated in Downtown East, it remains one of the most popular attractions and was voted Top 5 Water Parks in Asia under TripAdvisor Trav', 'attractions', 4, 'wild_wild_wet.jpg', 1.37669, 103.956, 65819128, NULL, '12:00:00', '18:00:00', 'www.wildwildwet.com', 'TA'),
('Family', '1', 'Singapore Last Village', '23E LORONG BUANG KOK KAMPONG LORONG BUANG KOK SINGAPORE 547578', 547578, 'Kampong Lorong Buangkok is a residential area so be respectful by avoiding taking photographs of private homes and make too much noise', 'walking_trail', 5, 'Kampong_Lorong_Buangkok.jpg', 1.3842, 103.879, NULL, NULL, '09:00:00', '21:00:00', NULL, 'HG'),
('Family', '9', 'Toa Payoh Dragon Playground', '28 Lor 6 Toa Payoh, Singapore 310028', 310028, 'One of the early playgrounds designed by the Housing & Development Board, Toa Payoh\'s Dragon Playground is one of two remaining playgrounds with this dragon design in Singapore.', 'venue', 5, 'toa-payoh-dragon-playground.png', 1.33752, 103.852, NULL, NULL, '10:00:00', '22:00:00', NULL, 'HG'),
('Nature', '00244ad68d5de1b4d17a5eb57ed97c2bdd0', 'Bukit Timah Nature Reserve', 'Hindhede Dr, Singapore 589318', 589318, 'Bukit Timah Nature Reserve is the second ASEAN Heritage Park here, after Sungei Buloh Wetland Reserve, giving it recognition for its regional importance and conservational value. As one of the largest patches of primary forest in Singapore, it is home to a', 'walking_trail', 4, 'bukit_timah_reserve.jpg', 1.34709, 103.776, NULL, NULL, '07:00:00', '19:00:00', 'www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/bukit-timah-nature-reserve', 'TA'),
('Nature', '18', 'Syonan Jinja', '182 LORNIE ROAD SINGAPORE 298717', 298717, 'Syonan Jinja was a Shinto shrine at MacRitchie Reservoir, Singapore. Built by the Japanese Imperial Army during the Japanese Occupation of Singapore in World War II, the shrine was destroyed directly before British forces re-occupied Singapore.', 'walking_trail', 5, 'shrine.jpg', 1.33997, 103.833, NULL, NULL, '06:00:00', '22:00:00', NULL, 'HG'),
('Nature', '4', 'Water tank that looks like a space ship', '3 WESTBOURNE ROAD WESSEX SINGAPORE 138943', 138943, 'There is an abundance of cafes around Portsdown Road. Instagram worthy place!', 'walking_trail', 3, 'water_tank.jpg', 1.29477, 103.797, NULL, NULL, '12:00:00', '12:00:00', NULL, 'HG'),
('Romantic', '002939f36de04ec48e3bbf76a97cb785fc4', 'Gardens by the Bay', '18 Marina Gardens Dr, Singapore 018953', 18953, 'The Gardens by the Bay is an urban nature park spanning 110 hectares within the Marina Bay district of the Central Region of Singapore, adjacent to the Marina Reservoir. The park consists of three waterfront gardens: Bay South Garden, Bay East Garden and B', 'venue', 4, 'gardenbtb.jpg', 1.27978, 103.865, 64206848, 'feedback@gardensbythebay.com.sg', '05:00:00', '02:00:00', 'www.gardensbythebay.com.sg', 'TA'),
('Romantic', '13', 'Raffles Marina Lighthouse', '10 TUAS WEST DRIVE RAFFLES MARINA SINGAPORE 638404', 638404, 'If you think Singapore doesn’t have a lighthouse, think again – we have Raffles Marina Lighthouse. It is located within the Raffles Marina Club compound, which was built in 1994 and overlooks the Tuas Second Link. It is a hotspot for wedding photoshoots, a', 'venue', 4, 'Raffles_Marina_Lighthouse.png', 1.34159, 103.635, NULL, NULL, '08:00:00', '23:00:00', NULL, 'HG'),
('Romantic', '3', 'Sembawang Hotspring', '500 GAMBAS AVENUE SINGAPORE 756952', 756952, 'Located off Gambas Avenue, Sembawang Hot Spring Park features new cascading pools and a water collection point, enhanced accessibility for wheelchair users, and educational panels where visitors can learn about Singapore’s only hot spring park’s history an', 'venue', 5, 'sembawang-pool.jpg', 1.43448, 103.823, NULL, NULL, '07:00:00', '19:00:00', 'https://www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/sembawang-hot-spring-park', 'HG');
--
-- Database: `travel_local_user`
--
CREATE DATABASE IF NOT EXISTS `travel_local_user` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `travel_local_user`;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `emailAddress` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `firstName`, `lastName`, `emailAddress`, `password`) VALUES
(1, 'Ellia', 'Ryan', 'htht@gmail.com', '$2y$10$H/.Rf6DeIEJo9hw24ST1sec3vrdgro8HjYyaWiEH3iZOEfKgUy.oK'),
(2, 'Amanda', 'Ryan', 'a.ryan@randatmail.com', '$2y$10$3804SQObpgDzzy51L04WlOa5Mk53gVrektWd1t56xjb7lDLaCX0di'),
(3, 'George', 'Chapman', 'g.chapman@randatmail.com', '$2y$10$QwwOPXClJ9tRBK4DaXCIZ.xV0M2AfFx4Mrn.EH11c12LgQGRz8zey'),
(4, 'Maya', 'Douglas', 'm.douglas@randatmail.com', '$2y$10$ekphra/mWrXI3ftIEJ5LmObuzaMfmt./BVL41.q5tJnFCBK1MATXe'),
(5, 'Oscar', 'Wells', 'o.wells@randatmail.com', '$2y$10$269qH0BFWDNrGTam1qidFu4ZfhkkdCnHo4NfLzRAHlIn42Oi0uoJ2'),
(6, 'Eric', 'Mason', 'e.mason@randatmail.com', '$2y$10$7QuXU13uX4Sec4./Ox7faemG0v7IB3owSv19e0ReBBmK1awEtRwBa'),
(17, 'G2', 'T8', 'g2t28@hotmail.com', '$2y$10$J/sODzuHJNvxfYfSR.0Cv.nYgzG4SJTrjB27HN4ZkwFJG8orEphT.'),
(23, 'Kim', 'Jong Un', 'kim@gmail.com', '$2y$10$Bg77x7UnkeqhsUyq0qhpy.0jQRK6ivmg.SW..e.IsbiFWpF7DcBxu'),
(25, 'Alvin', 'Ang', 'LeLand096@hotmail.com', '$2y$10$H/.Rf6DeIEJo9hw24ST1sec3vrdgro8HjYyaWiEH3iZOEfKgUy.oK');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
