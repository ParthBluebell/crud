-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2021 at 11:32 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bluebell`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_01_26_170446_add_votes_to_users_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userimage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthdate` date NOT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isPermanent` enum('1','0') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `gender` enum('M','F','O') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usertype` enum('U','A') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'U',
  `is_deleted` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `userimage`, `birthdate`, `department`, `isPermanent`, `gender`, `usertype`, `is_deleted`, `created_at`, `updated_at`) VALUES
(25, 'A', 'Cary', 'alex@gmail.com', '1611856701.jpg', '2021-01-27', 'Mobile', '1', 'F', 'U', 'N', '2021-01-28 00:28:21', '2021-01-28 00:28:21'),
(29, 'C', 'Khunt', 'parth@bluebell.dk', '1611889716.jpg', '1996-04-18', 'Web', '1', 'M', 'U', 'N', '2021-01-28 21:38:36', '2021-01-28 22:16:16'),
(30, 'M', 'Padmani', 'mp@gmail.com', '1611906919.jpg', '2021-01-28', 'Bussiness', '1', 'M', 'U', 'N', '2021-01-29 02:13:48', '2021-01-29 02:48:37'),
(31, 'J', 'Jogani', 'cr@gmail.com', '1611906267.jpg', '2021-01-19', 'Mobile', '1', 'M', 'U', 'N', '2021-01-29 02:14:27', '2021-01-29 02:14:27'),
(32, 'B', 'Patel', 'dk@gmail.com', '1611909229.jpg', '2021-01-28', 'Mobile', '1', 'M', 'U', 'N', '2021-01-29 03:03:49', '2021-01-29 03:03:49'),
(36, 'G', 'Khunt', 'parth11@bluebell.dk', '1611912862.jpg', '2021-01-28', 'Mobile', '1', 'M', 'U', 'N', '2021-01-29 04:04:22', '2021-01-29 04:04:22'),
(37, 'H', 'Test', 'teet@gmail.com', '1611940603.jpg', '2021-01-07', 'Mobile', '1', 'M', 'U', 'N', '2021-01-28 23:46:43', '2021-01-29 01:12:55'),
(38, 'D', 'Last', 'user@gmail.com', '1612243380.jpg', '1996-02-01', 'Web', '1', 'F', 'U', 'N', '2021-02-01 23:53:00', '2021-02-01 23:53:00'),
(39, 'E', 'PQR', 'xyz@gmail.com', '1612243670.jpg', '1997-02-01', 'Mobile', '1', 'M', 'U', 'N', '2021-02-01 23:57:50', '2021-02-01 23:57:50'),
(40, 'N', 'CDE', 'usp@gmail.com', '1612243774.jpg', '1990-02-01', 'Mobile', '1', 'O', 'U', 'N', '2021-02-01 23:59:34', '2021-02-01 23:59:34'),
(41, 'K', 'AWS', 'aws@gmail.com', '1612243816.jpg', '1998-02-01', 'Bussiness', '1', 'F', 'U', 'N', '2021-02-02 00:00:16', '2021-02-02 00:00:16'),
(42, 'F', 'my', 'my@gmail.com', '1612292252.jpg', '2021-02-02', 'Mobile', '1', 'M', 'U', 'N', '2021-02-02 01:27:32', '2021-02-02 01:27:32'),
(43, 'O', 'ABC', 'sarubh@gmail.com', '1612292600.jpg', '2021-02-02', 'Mobile', '1', 'M', 'U', 'N', '2021-02-02 01:33:20', '2021-02-02 01:33:20'),
(44, 'Imp', 'Imp', 'imp@gmail.com', '1612348125.jpg', '2021-01-31', 'Bussiness', '1', 'M', 'U', 'N', '2021-02-02 01:39:07', '2021-02-03 04:58:45'),
(45, 'Bunty', 'Khunt', 'bunty@gmail.com', '1612336128.jpg', '2021-02-02', 'Mobile', '0', 'M', 'U', 'N', '2021-02-03 01:38:48', '2021-02-03 01:38:48'),
(46, 'fdfdf', 'dfdfd', 'fdfz2@gmail.com', '1612338730.jpg', '2021-02-01', 'Mobile', '1', 'M', 'U', 'N', '2021-02-03 02:22:10', '2021-02-03 02:22:10'),
(47, 'ABCDEF', 'GHIJK', 'abcdef@gmail.com', '1612346915.jpg', '2021-01-31', 'Bussiness', '1', 'M', 'U', 'N', '2021-02-03 04:37:46', '2021-02-03 04:38:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
