drop database if exists travel_local;

create database travel_local;

use travel_local;

CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(256) NOT NULL,
  `lastName` varchar(256) NOT NULL,
  `emailAddress` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `itinerary` (
  `itineraryID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `itineraryType` varchar(256) NOT NULL,
  `userID` int(11) NOT NULL,
  `shared` int(11) NOT NULL,
  PRIMARY KEY (`itineraryID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `activity` (
  `activityID` int(11) NOT NULL AUTO_INCREMENT,
  `poiUUID` varchar(256) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `activityDate` date NOT NULL,
  `locType` varchar(256) NOT NULL,
  `locDataset` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `itineraryID` int(11) NOT NULL,
  PRIMARY KEY (`activityID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `custom_loc` (
  `locID` int(11) NOT NULL AUTO_INCREMENT,
  `locTitle` varchar(256) NOT NULL,
  `locAddress` varchar(256) NOT NULL,
  `locPostalCode` int(11) NOT NULL,
  `locDesc` varchar(256) DEFAULT NULL,
  `categories` varchar(256) NOT NULL,
  `rating` int(11) NOT NULL,
  `imageUrl` varchar(256) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `latitude` float(18,14) NOT NULL,
  `longitude` float(18,14) NOT NULL,
  `venueType` varchar(256) NOT NULL,
  `businessContact` int(11) NOT NULL,
  `businessEmail` varchar(256) NOT NULL,
  `startTime` varchar(256) NOT NULL,
  `endTime` varchar(256) NOT NULL,
  `businessWeb` varchar(256) NOT NULL,
  PRIMARY KEY (`locID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`userID`, `firstName`, `lastName`, `emailAddress`, `password`) VALUES
(1, 'Ellia', 'Ryan', 'htht@gmail.com', '$2y$10$PyLCwxuEvDx8RVRj/ZzaSOGtdvHKhwI5EozYEIRiVeCV111f42jJ2'),
(2, 'Amanda', 'Ryan', 'a.ryan@randatmail.com', '$2y$10$3804SQObpgDzzy51L04WlOa5Mk53gVrektWd1t56xjb7lDLaCX0di'),
(3, 'George', 'Chapman', 'g.chapman@randatmail.com', '$2y$10$QwwOPXClJ9tRBK4DaXCIZ.xV0M2AfFx4Mrn.EH11c12LgQGRz8zey'),
(4, 'Maya', 'Douglas', 'm.douglas@randatmail.com', '$2y$10$ekphra/mWrXI3ftIEJ5LmObuzaMfmt./BVL41.q5tJnFCBK1MATXe'),
(5, 'Oscar', 'Wells', 'o.wells@randatmail.com', '$2y$10$269qH0BFWDNrGTam1qidFu4ZfhkkdCnHo4NfLzRAHlIn42Oi0uoJ2'),
(6, 'Eric', 'Mason', 'e.mason@randatmail.com', '$2y$10$7QuXU13uX4Sec4./Ox7faemG0v7IB3owSv19e0ReBBmK1awEtRwBa'),
(7, 'G2', 'T8', 'g2t28@hotmail.com', '$2y$10$J/sODzuHJNvxfYfSR.0Cv.nYgzG4SJTrjB27HN4ZkwFJG8orEphT.');

INSERT INTO `itinerary` (`itineraryID`, `name`, `startDate`, `endDate`, `itineraryType`, `userID`, `shared`) VALUES
(1, 'Proof That TRIP Really Fun', '2020-11-14', '2020-11-16', 'Nature', 6, 43),
(2, 'Easy and Faster TRIP', '2020-11-26', '2020-11-26', 'Romantic', 6, 152),
(3, 'Fast-Track Your TRIP', '2020-11-14', '2020-11-16', 'Family', 4, 123),
(4, 'All About TRIP', '2020-11-14', '2020-11-16', 'Casual', 1, 112),
(5, '15 Tips For TRIP Success', '2020-11-18', '2020-11-19', 'Romantic', 3, 160),
(6, 'No More Mistakes With TRIP', '2020-11-26', '2020-11-26', 'Nature', 1, 111),
(7, 'TRIP: What A Mistake!', '2020-12-16', '2020-12-16', 'Nature', 3, 57),
(8, 'Who Else Wants To Enjoy TRIP', '2020-11-26', '2020-11-26', 'Family', 4, 118),
(9, 'Unforgivable TRIP', '2020-11-14', '2020-11-16', 'Romantic', 5, 179),
(10, 'How To Turn TRIP Into Success', '2020-11-14', '2020-11-16', 'Nature', 2, 114),
(11, 'Here Is What You Should Do For Your TRIP', '2020-11-26', '2020-11-26', 'Casual', 2, 101),
(12, 'How To Turn Your TRIP From Zero To Hero', '2020-11-26', '2020-11-26', 'Family', 5, 40);

INSERT INTO `activity` (`activityID`, `poiUUID`, `startTime`, `endTime`, `activityDate`, `locType`, `locDataset`, `itineraryID`) VALUES
(1, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '09:00:00', '15:30:00', '2020-11-18', 'TA', 'attractions', 5),
(2, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '18:00:00', '2020-11-19', 'TA', 'food-beverages', 5),
(3, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '13:00:00', '2020-11-19', 'TA', 'attractions', 5),
(4, '00263e942d6b94a4cfd8b6ecd6f8fe41f59', '14:00:00', '18:00:00', '2020-11-18', 'TA', 'attractions', 5),
(5, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '19:00:00', '2020-12-16', 'TA', 'attractions', 7),
(6, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2020-11-14', 'TA', 'attractions', 4),
(7, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2020-11-14', 'TA', 'food-beverages', 4),
(8, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2020-11-15', 'TA', 'attractions', 4),
(9, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2020-11-15', 'TA', 'food-beverages', 4),
(10, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2020-11-16', 'TA', 'attractions', 4),
(11, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2020-11-26', 'TA', 'attractions', 6),
(12, '3', '15:00:00', '19:00:00', '2020-11-26', 'HG', 'venue', 6),
(13, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2020-11-14', 'TA', 'attractions', 10),
(14, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2020-11-14', 'TA', 'food-beverages', 10),
(15, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2020-11-15', 'TA', 'attractions', 10),
(16, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2020-11-15', 'TA', 'food-beverages', 10),
(17, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2020-11-16', 'TA', 'attractions', 10),
(18, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2020-11-26', 'TA', 'attractions', 11),
(19, '3', '15:00:00', '19:00:00', '2020-11-26', 'HG', 'venue', 11),
(20, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2020-11-14', 'TA', 'attractions', 3),
(21, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2020-11-14', 'TA', 'food-beverages', 3),
(22, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2020-11-15', 'TA', 'attractions', 3),
(23, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2020-11-15', 'TA', 'food-beverages', 3),
(24, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2020-11-16', 'TA', 'attractions', 3),
(25, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2020-11-26', 'TA', 'attractions', 8),
(26, '3', '15:00:00', '19:00:00', '2020-11-26', 'HG', 'venue', 8),
(27, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2020-11-14', 'TA', 'attractions', 9),
(28, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2020-11-14', 'TA', 'food-beverages', 9),
(29, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2020-11-15', 'TA', 'attractions', 9),
(30, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2020-11-15', 'TA', 'food-beverages', 9),
(31, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2020-11-16', 'TA', 'attractions', 9),
(32, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2020-11-26', 'TA', 'attractions', 12),
(33, '3', '15:00:00', '19:00:00', '2020-11-26', 'HG', 'venue', 12),
(34, '0026b87ef8b8e3344c4b24e7960fa436104', '09:00:00', '14:00:00', '2020-11-14', 'TA', 'attractions', 1),
(35, '0055c53bc7c6b41485e8a131e31d7119e41', '15:00:00', '19:30:00', '2020-11-14', 'TA', 'food-beverages', 1),
(36, '00244ad68d5de1b4d17a5eb57ed97c2bdd0', '08:30:00', '15:45:00', '2020-11-15', 'TA', 'attractions', 1),
(37, '0050fb1290867a04daa9d15b220a4f133f0', '16:00:00', '21:00:00', '2020-11-15', 'TA', 'food-beverages', 1),
(38, '002f7ff7096635b4a698fead4a60518ad23', '09:00:00', '20:00:00', '2020-11-16', 'TA', 'attractions', 1),
(39, '0023e6d162bfc0842dfad98e7e5bca18fbc', '10:00:00', '14:30:00', '2020-11-26', 'TA', 'attractions', 2),
(40, '3', '15:00:00', '19:00:00', '2020-11-26', 'HG', 'venue', 2);

INSERT INTO `custom_loc` (`locID`, `locTitle`, `locAddress`, `locPostalCode`, `locDesc`, `categories`, `rating`, `imageUrl`, `createdBy`, `latitude`, `longitude`, `venueType`, `businessContact`, `businessEmail`, `startTime`, `endTime`, `businessWeb`) VALUES
(1, 'Singapore Last Village', '23E LORONG BUANG KOK KAMPONG LORONG BUANG KOK SINGAPORE 547578', 547578, 'Kampong Lorong Buangkok is a residential area so be respectful by avoiding taking photographs of private homes and make too much noise', 'walking_trail', 5, 'Kampong_Lorong_Buangkok.jpg', 0, 1.38420081138611, 103.87859344482422, 'Family', 0, 'NIL', '09:00 AM', '09:00 PM', 'NIL'),
(2, 'Last surviving Hakka cemetery', '9 COMMONWEALTH LANE SINGAPORE 149551', 149551, 'Take a view from one of the surrounding flats and be wowed by the sheer magnitude of this place.', 'venue', 5, 'Hakka_cemetery.jpg', 0, 1.30572843551636, 103.79593658447266, 'Casual', 149551, 'Hcemetery@live.com', '09:00 AM', '09:00 PM', 'NIL'),
(3, 'Sembawang Hotspring', '500 GAMBAS AVENUE SINGAPORE 756952', 756952, 'Nice place for a Sunday family outing', 'venue', 4, 'sembawang-pool.jpg', 0, 1.43447697162628, 103.82334136962890, 'Family', 0, 'NIL', '07:00 AM', '07:00 PM', 'npark.gov.sg'),
(4, 'Water tank that looks like a space ship', '3 WESTBOURNE ROAD WESSEX SINGAPORE 138943', 138943, 'There is an abundance of cafes around Portsdown Road. Instagram worthy place!', 'walking_trail', 3, 'water_tank.jpg', 0, 1.29476535320282, 103.79651641845703, 'Nature', 0, 'NIL', '12:00 AM', '12:00 AM', 'NIL'),
(5, 'Incredible street art of Singapore’s history at Everton Park', '17 EVERTON ROAD EVERTON COURT SINGAPORE 089373', 89373, 'Learn about the history of Singapore!', 'attractions', 4, 'evertonpark.jpg', 0, 1.27673375606537, 103.83755493164062, 'Casual', 0, 'NIL', '08:00 AM', '10:00 PM', 'NIL'),
(6, 'HUGE naval gun installed by the British', '27 COSFORD ROAD SINGAPORE 499549', 499549, 'If you like big guns, pay the Johore Battery a visit because this is definitely one of the biggest guns we’ve ever seen in our lives, let alone in Singapore. ', 'attractions', 3, 'Naval_gun.jpg', 0, 1.36532115936279, 103.98001098632812, 'Family', 0, 'NIL', '12:00 AM', '12:00 AM', 'NIL'),
(7, 'Abandoned school in Braddell', '321 Braddell Rd, Singapore 579708', 579708, 'The former Braddell-Westlake Secondary School has been abandoned since 2005, and similar to other abandoned places, eerie vibes here are at an all time high. Graffitied walls, shattered windows and dusty floors are a dead giveaway on this place’s inhabitan', 'walking_trail', 4, 'school.jpg', 0, 0.00000000000000, 0.00000000000000, 'Family', 0, 'NIL', '08:00 AM', '10:00 PM', 'NIL'),
(8, 'Mysterious figurines', '27A LOEWEN ROAD SINGAPORE 248839', 248839, 'You’ve heard of Da Vinci and Van Gogh, but how well do you know our Asian artists? Well, now you can do so for free at MOCA. A one-of-a-kind museum, this place has a number of tall sculptures dancing and standing at attention out in the open.', 'attractions', 4, 'Mystery_figure.jpg', 0, 1.30355000495911, 103.81221008300781, 'Casual', 0, 'NIL', '12:00 AM', '12:00 AM', 'NIL'),
(9, 'Toa Payoh Dragon Playground', '28 Lor 6 Toa Payoh, Singapore ', 310028, 'One of the early playgrounds designed by the Housing & Development Board, Toa Payoh\'s Dragon Playground is one of two remaining playgrounds with this dragon design in Singapore.', 'venue', 5, 'toa-payoh-dragon-playground.png', 0, 0.00000000000000, 0.00000000000000, 'Family', 0, 'NIL', '10:00 AM', '10:00 PM', 'NIL'),
(10, 'Japanese cemetery', '825B CHUAN HOE AVENUE LAM HAI POH TOH SAN TEMPLE SINGAPORE 549853', 549853, 'This cemetery houses 910 tombstones that contain the remains of members of the Japanese community in Singapore, including civilians, soldiers and convicted war criminals executed in Changi Prison. Walking around the place, I couldn’t help but notice how th', 'walking_trail', 5, 'Jap_cemetery.jpg', 0, 1.36510658264160, 103.87596130371094, 'Casual', 0, 'NIL', '09:00 AM', '09:00 PM', 'NIL'),
(11, 'Giant fruits playground', '856F TAMPINES STREET 82 TAMPINES ARCADIA SINGAPORE 526856', 526856, 'A relic from the past, this old school watermelon playground will bring back the feels as you reminisce about playing catching and blind-mice at your void deck playground.\n', 'attractions', 4, 'fruit_playground.jpg', 0, 1.35291278362274, 103.93835449218750, 'Family', 0, 'NIL', '09:30 AM', '09:30 PM', 'NIL'),
(12, 'Monastery that will make you feel like you’re in Taiwan', '88 BRIGHT HILL ROAD BRIGHT HILL COLUMBARIUM SINGAPORE 574117', 574117, 'Bright Hill Temple is the largest monastery in Singapore, with more than 90 years of history. The entire temple felt like a beautiful maze, where getting lost in the sculptures, paintings and architecture was a blessing.', 'venue', 5, 'monastery.jpg', 0, 1.36051988601685, 103.83651733398438, 'Casual', 68495300, 'NIL', '08:00 AM', '09:00 PM', 'www.kmspks.org'),
(13, 'Raffles Marina Lighthouse', '10 TUAS WEST DRIVE RAFFLES MARINA SINGAPORE 638404', 638404, 'If you think Singapore doesn’t have a lighthouse, think again – we have Raffles Marina Lighthouse. It is located within the Raffles Marina Club compound, which was built in 1994 and overlooks the Tuas Second Link. It is a hotspot for wedding photoshoots, a', 'venue', 4, 'Raffles_Marina_Lighthouse.png', 0, 1.34158802032471, 103.63508605957031, 'Casual', 0, 'NIL', '08:00 AM', '11:00 PM', 'NIL');