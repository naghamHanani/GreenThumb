-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 10:28 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greenthumb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `AID` int(20) NOT NULL,
  `ActivityName` varchar(50) NOT NULL,
  `Period_of_time` int(20) NOT NULL,
  `gardenID` int(20) NOT NULL,
  `Event_manage_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`AID`, `ActivityName`, `Period_of_time`, `gardenID`, `Event_manage_id`) VALUES
(2, 'Garden cleaning', 8, 8, 3),
(4, 'Watering plants', 3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `localpartnership`
--

CREATE TABLE `localpartnership` (
  `idProduct` int(20) NOT NULL,
  `Product` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `CostPrice` int(20) NOT NULL,
  `AdvertisementDuration` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `localpartnership`
--

INSERT INTO `localpartnership` (`idProduct`, `Product`, `company`, `CostPrice`, `AdvertisementDuration`) VALUES
(12, 'cheese', 'zw', 20, 1);

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

CREATE TABLE `volunteer` (
  `id` int(20) NOT NULL,
  `AID` int(20) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`id`, `AID`, `Name`) VALUES
(3, 3, 'sara');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`AID`);

--
-- Indexes for table `localpartnership`
--
ALTER TABLE `localpartnership`
  ADD PRIMARY KEY (`idProduct`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `AID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `localpartnership`
--
ALTER TABLE `localpartnership`
  MODIFY `idProduct` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `volunteer`
--
ALTER TABLE `volunteer`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
