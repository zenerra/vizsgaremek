-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 11. 19:16
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `db_nyilvantartas`
--
CREATE DATABASE IF NOT EXISTS `db_nyilvantartas` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `db_nyilvantartas`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkalmazott`
--
ALTER TABLE `szamla`
  DROP FOREIGN KEY IF EXISTS `szamla - alkalmazott`;
DROP TABLE IF EXISTS `alkalmazott`; 
CREATE TABLE `alkalmazott` (
  `aazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Alkalmazott azonosítója',
  `anev` varchar(20) NOT NULL COMMENT 'Alkalmazott teljes neve',
  `amunka` varchar(20) NOT NULL DEFAULT 'kasszás' COMMENT 'Alkalmazott munkaköre',
  `aszul` date DEFAULT NULL COMMENT 'Alkalmazott születési dátuma',
  `abelepes` date NOT NULL COMMENT 'Alkalmazott felvételének dátuma',
  `aber` int(10) UNSIGNED NOT NULL COMMENT 'Alkalmazott bruttó havi fizetése forintban',
  `awebjog` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Alkalmazott hozzáférési jogosultsága a webes felülethez',
  `agepjog` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Alkalmazott hozzáférési jogosultsága az asztali felülethez'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Alkalmazottak adatai';

--
-- A tábla adatainak kiíratása `alkalmazott`
--

INSERT INTO `alkalmazott` (`aazon`, `anev`, `amunka`, `aszul`, `abelepes`, `aber`, `awebjog`, `agepjog`) VALUES
(1, 'Nagy Péter', 'üzletvezető', '1985-03-12', '2010-06-01', 650000, 1, 1),
(2, 'Kovács Anna', 'kasszás', '1992-07-23', '2018-09-15', 280000, 0, 1),
(3, 'Balog Kevin', 'kasszás', '2005-07-26', '2019-04-20', 290000, 0, 1),
(4, 'Tóth Éva', 'kasszás', '1998-11-30', '2021-01-10', 270000, 0, 1),
(5, 'Farkas Zoltán', 'raktáros', '1989-05-18', '2015-03-05', 320000, 1, 0),
(6, 'Varga István', 'raktáros', '1991-08-22', '2016-07-11', 310000, 1, 0),
(7, 'Boros Sándor', 'raktáros', '1994-12-03', '2017-10-30', 300000, 1, 0),
(8, 'Kiss Gabriella', 'takarító', '2000-04-14', '2022-05-18', 260000, 0, 0),
(9, 'Molnár Dóra', 'kasszás', '1997-09-09', '2020-08-25', 275000, 0, 1),
(10, 'Juhász Tamás', 'raktáros', '1987-06-05', '2013-02-17', 330000, 1, 0),
(11, 'Horváth Sándor', 'raktáros', '1993-01-29', '2018-12-01', 315000, 1, 0),
(12, 'Lakatos Béla', 'kasszás', '1999-07-17', '2021-11-10', 265000, 0, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `beszallito`
--
DROP TABLE IF EXISTS `beszallito`; 
CREATE TABLE `beszallito` (
  `bazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Beszállító azonosítója',
  `bnev` varchar(50) NOT NULL COMMENT 'Beszállító megnevezése',
  `bcim` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Beszállító címének azonosítója',
  `bemail` varchar(50) NOT NULL COMMENT 'Beszállító kapcsolattartási e-mail címe'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Beszállítók adatai';

--
-- A tábla adatainak kiíratása `beszallito`
--

INSERT INTO `beszallito` (`bazon`, `bnev`, `bcim`, `bemail`) VALUES
(1, 'Berlin Logistics GmbH', 2, 'contact@berlinlogistics.de'),
(2, 'Paris Wholesale Ltd.', 3, 'sales@pariswholesale.fr'),
(3, 'Rome Imports S.p.A.', 4, 'orders@romeimports.it'),
(4, 'London Trade Co.', 5, 'info@londontrade.co.uk'),
(5, 'Madrid Supplies SL', 6, 'support@madridsupplies.es'),
(6, 'Amsterdam Goods BV', 7, 'service@amsterdamgoods.nl'),
(7, 'Warsaw Distribution Sp. z o.o.', 8, 'sales@warsawdistribution.pl'),
(8, 'NYC Global Export Inc.', 9, 'contact@nycglobalexport.com'),
(9, 'Tokyo Wholesale KK', 10, 'info@tokyowholesale.jp');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cim`
--
ALTER TABLE `szamla`
  DROP FOREIGN KEY IF EXISTS `szamla - cim`;

DROP TABLE IF EXISTS `cim`; 
CREATE TABLE `cim` (
  `cazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Címek azonosítója (az első cím az üzlet azonosítója) ',
  `orszag` varchar(100) NOT NULL DEFAULT 'magyarország' COMMENT 'Címhez tartozó ország neve',
  `iranyitoszam` varchar(20) NOT NULL COMMENT 'Címhez tartozó irányítószám',
  `telepules` varchar(100) NOT NULL DEFAULT 'Budapest' COMMENT 'Címhez tartozó település neve',
  `kozterulet` varchar(100) NOT NULL COMMENT 'Címhez tartozó közterület neve és típusa',
  `hazszam` varchar(10) NOT NULL COMMENT 'Címhez tartozó házszám (pl 12-14)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Címek adatai';

--
-- A tábla adatainak kiíratása `cim`
--

INSERT INTO `cim` (`cazon`, `orszag`, `iranyitoszam`, `telepules`, `kozterulet`, `hazszam`) VALUES
(1, 'Magyarország', '1051', 'Budapest', 'Váci utca', '12'),
(2, 'Németország', 'D-10115', 'Berlin', 'Friedrichstraße', '45'),
(3, 'Franciaország', '75001', 'Párizs', 'Rue de Rivoli', '23B'),
(4, 'Olaszország', 'I-00184', 'Róma', 'Via del Corso', '99/A'),
(5, 'Egyesült Királyság', 'EC1A 1BB', 'London', 'Baker Street', '221B'),
(6, 'Spanyolország', '28013', 'Madrid', 'Gran Vía', '8-10'),
(7, 'Hollandia', 'NL-1012', 'Amszterdam', 'Damrak', '50C'),
(8, 'Lengyelország', 'PL-00-001', 'Varsó', 'Nowy Świat', '15/3'),
(9, 'USA', 'NY 10001', 'New York', '5th Avenue', '350'),
(10, 'Japán', 'JP-100-0001', 'Tokió', 'Chiyoda', '1-1-1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szamla`
--
ALTER TABLE `tetel`
  DROP FOREIGN KEY IF EXISTS `tetel - szamla`;
DROP TABLE IF EXISTS `szamla`; 

CREATE TABLE `szamla` (
  `sazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Számla azonosítója',
  `skiallitas` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Számla kiállítási címének azonosítója',
  `scim` bigint(20) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Számla kiállításának az időpontja',
  `spenztar` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Számlát kiállító pénztárgép sorszáma ',
  `selado` bigint(20) UNSIGNED NOT NULL COMMENT 'Számlát kiállító alkalmazott azonosítója',
  `sfizetesimod` varchar(20) NOT NULL DEFAULT 'készpénz' COMMENT 'Választott fizetési mód '
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Számla / Tranzakció adatai';

--
-- A tábla adatainak kiíratása `szamla`
--

INSERT INTO `szamla` (`sazon`, `skiallitas`, `scim`, `spenztar`, `selado`, `sfizetesimod`) VALUES
(1, '2024-04-10 08:15:32', 1, 1, 3, 'készpénz'),
(2, '2024-04-10 08:45:12', 1, 2, 3, 'kártya'),
(3, '2024-07-10 09:05:50', 1, 3, 3, 'kártya'),
(4, '2024-08-10 09:35:27', 1, 1, 9, 'kártya'),
(5, '2024-08-10 10:10:14', 1, 2, 12, 'kártya'),
(6, '2024-08-10 10:40:49', 1, 3, 1, 'kártya'),
(7, '2024-11-10 11:20:33', 1, 1, 2, 'kártya'),
(8, '2025-01-10 12:00:20', 1, 2, 3, 'kártya'),
(9, '2025-01-10 12:45:15', 1, 3, 4, 'készpénz'),
(10, '2025-01-10 13:10:05', 1, 1, 9, 'kártya'),
(11, '2025-02-10 14:05:40', 1, 2, 12, 'készpénz'),
(12, '2025-04-10 15:30:55', 1, 3, 12, 'kártya'),
(17, '2025-04-27 14:30:00', 1, 1, 12, 'kártya'),
(18, '2024-04-12 08:30:00', 1, 1, 9, 'kártya'),
(19, '2024-04-15 09:00:00', 1, 2, 9, 'készpénz'),
(20, '2024-04-20 10:15:00', 1, 3, 3, 'kártya'),
(21, '2024-04-25 11:30:00', 1, 1, 4, 'készpénz'),
(22, '2024-05-01 12:00:00', 1, 2, 9, 'kártya'),
(23, '2024-05-05 13:15:00', 1, 3, 12, 'készpénz'),
(24, '2024-05-10 14:00:00', 1, 1, 12, 'kártya'),
(25, '2024-05-15 08:45:00', 1, 2, 2, 'készpénz'),
(26, '2024-05-20 09:30:00', 1, 3, 3, 'kártya'),
(27, '2024-05-25 10:00:00', 1, 1, 3, 'készpénz'),
(28, '2024-06-01 11:15:00', 1, 2, 9, 'kártya'),
(29, '2024-06-05 12:30:00', 1, 3, 12, 'készpénz'),
(30, '2024-06-10 13:45:00', 1, 1, 1, 'kártya'),
(31, '2024-06-15 14:00:00', 1, 2, 2, 'készpénz'),
(32, '2024-06-20 08:30:00', 1, 3, 3, 'kártya'),
(33, '2024-06-25 09:15:00', 1, 1, 3, 'készpénz'),
(34, '2024-07-01 10:00:00', 1, 2, 9, 'kártya'),
(35, '2024-07-05 11:30:00', 1, 3, 12, 'készpénz'),
(36, '2024-07-10 12:45:00', 1, 1, 3, 'kártya'),
(37, '2024-07-15 13:00:00', 1, 2, 2, 'készpénz'),
(38, '2024-07-20 14:15:00', 1, 3, 3, 'kártya'),
(39, '2024-07-25 08:45:00', 1, 1, 3, 'készpénz'),
(40, '2024-08-01 09:30:00', 1, 2, 9, 'kártya'),
(41, '2024-08-05 10:00:00', 1, 3, 12, 'készpénz'),
(42, '2024-08-10 11:15:00', 1, 1, 4, 'kártya'),
(43, '2024-08-15 12:30:00', 1, 2, 2, 'készpénz'),
(44, '2024-08-20 13:45:00', 1, 3, 3, 'kártya'),
(45, '2024-08-25 14:00:00', 1, 1, 3, 'készpénz'),
(46, '2024-09-01 08:30:00', 1, 2, 9, 'kártya'),
(47, '2024-09-05 09:15:00', 1, 3, 9, 'készpénz'),
(48, '2024-09-10 10:30:00', 1, 1, 4, 'kártya'),
(49, '2024-09-15 11:45:00', 1, 2, 2, 'készpénz'),
(50, '2024-09-20 12:00:00', 1, 3, 3, 'kártya'),
(51, '2024-09-25 13:15:00', 1, 1, 4, 'készpénz'),
(52, '2024-10-01 14:30:00', 1, 2, 9, 'kártya'),
(53, '2024-10-05 08:45:00', 1, 3, 9, 'készpénz'),
(54, '2024-10-10 09:30:00', 1, 1, 9, 'kártya'),
(55, '2024-10-15 10:00:00', 1, 2, 2, 'készpénz'),
(56, '2024-10-20 11:15:00', 1, 3, 9, 'kártya'),
(57, '2024-10-25 12:30:00', 1, 1, 4, 'készpénz'),
(58, '2024-11-01 13:45:00', 1, 2, 9, 'kártya'),
(59, '2024-11-05 14:00:00', 1, 3, 12, 'készpénz'),
(60, '2024-11-10 08:30:00', 1, 1, 3, 'kártya'),
(61, '2024-11-15 09:15:00', 1, 2, 2, 'készpénz'),
(62, '2024-11-20 10:30:00', 1, 3, 3, 'kártya'),
(63, '2024-11-25 11:45:00', 1, 1, 4, 'készpénz'),
(64, '2024-12-01 12:00:00', 1, 2, 9, 'kártya'),
(65, '2024-12-05 13:15:00', 1, 3, 12, 'készpénz'),
(66, '2024-12-10 14:30:00', 1, 1, 12, 'kártya'),
(67, '2024-12-15 08:45:00', 1, 2, 2, 'készpénz'),
(68, '2024-12-20 09:30:00', 1, 3, 2, 'kártya'),
(69, '2024-12-25 10:00:00', 1, 1, 4, 'készpénz'),
(70, '2025-01-01 11:15:00', 1, 2, 9, 'kártya'),
(71, '2025-01-05 12:30:00', 1, 3, 9, 'készpénz'),
(72, '2025-01-10 13:45:00', 1, 1, 3, 'kártya'),
(73, '2025-01-15 14:00:00', 1, 2, 2, 'készpénz'),
(74, '2025-01-20 08:30:00', 1, 3, 4, 'kártya'),
(75, '2025-01-25 09:15:00', 1, 1, 12, 'készpénz'),
(76, '2025-01-30 10:30:00', 1, 2, 9, 'kártya'),
(77, '2025-02-01 11:45:00', 1, 3, 12, 'készpénz'),
(78, '2025-02-05 12:00:00', 1, 1, 12, 'kártya'),
(79, '2025-02-10 13:15:00', 1, 2, 2, 'készpénz'),
(80, '2025-02-15 14:30:00', 1, 3, 3, 'kártya'),
(81, '2025-02-20 08:45:00', 1, 1, 4, 'készpénz'),
(82, '2025-02-25 09:30:00', 1, 2, 2, 'kártya'),
(83, '2025-03-01 10:00:00', 1, 3, 12, 'készpénz'),
(84, '2025-03-05 11:15:00', 1, 1, 9, 'kártya'),
(85, '2025-03-10 12:30:00', 1, 2, 2, 'készpénz'),
(86, '2025-03-15 13:45:00', 1, 3, 3, 'kártya'),
(87, '2025-03-20 14:00:00', 1, 1, 4, 'készpénz'),
(88, '2025-03-25 08:30:00', 1, 2, 2, 'kártya'),
(89, '2025-03-30 09:15:00', 1, 3, 12, 'készpénz'),
(90, '2025-04-01 10:30:00', 1, 1, 3, 'kártya'),
(91, '2025-04-05 11:45:00', 1, 2, 2, 'készpénz'),
(92, '2025-04-10 12:00:00', 1, 3, 3, 'kártya'),
(93, '2025-04-15 13:15:00', 1, 1, 4, 'készpénz'),
(94, '2025-04-20 14:30:00', 1, 2, 3, 'kártya'),
(95, '2025-04-25 08:45:00', 1, 3, 2, 'készpénz'),
(96, '2025-04-26 09:30:00', 1, 1, 12, 'kártya'),
(97, '2025-04-27 10:00:00', 1, 2, 2, 'készpénz'),
(98, '2025-04-28 11:15:00', 1, 3, 3, 'kártya'),
(99, '2025-04-29 12:30:00', 1, 1, 12, 'készpénz'),
(100, '2025-04-29 13:45:00', 1, 2, 2, 'kártya');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--
ALTER TABLE `tetel`
  DROP FOREIGN KEY IF EXISTS `tetel - termek`;

DROP TABLE IF EXISTS `termek`;
CREATE TABLE `termek` (
  `tazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Termékek azonosítója',
  `tnev` varchar(100) NOT NULL COMMENT 'Termék neve ',
  `tkategoria` varchar(50) NOT NULL COMMENT 'Termék kategóriája',
  `tar` int(10) UNSIGNED NOT NULL COMMENT 'Termék egységenkénti ára',
  `tmennyiseg` double UNSIGNED NOT NULL COMMENT 'Készletmennyiség',
  `tmennyisegiegyseg` varchar(10) NOT NULL DEFAULT 'db' COMMENT 'Termék mennyiségi egysége (pl db,kg)',
  `tminkeszlet` double UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Az a minimum készletmennyiség ami alatt rendelni kell az adott termékből.',
  `trendeles` double UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Az a mennyiség ami alkalmankéntrendelésre kerül az adott termékből.',
  `tkoros` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Nagykorúsághoz kötött-e a termék',
  `bazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Termék beszállítójának azonosítója'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='termékek adatai';

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`tazon`, `tnev`, `tkategoria`, `tar`, `tmennyiseg`, `tmennyisegiegyseg`, `tminkeszlet`, `trendeles`, `tkoros`, `bazon`) VALUES
(1, 'Teljes kiőrlésű kenyér', 'Pékáru', 450, 30, 'db', 5, 20, 0, 1),
(2, 'Bagett', 'Pékáru', 350, 25, 'db', 5, 15, 0, 1),
(3, 'Rozskenyér', 'Pékáru', 500, 20, 'db', 5, 10, 0, 1),
(4, 'Croissant', 'Pékáru', 300, 40, 'db', 10, 25, 0, 1),
(5, 'Magos zsemle', 'Pékáru', 150, 50, 'db', 10, 30, 0, 1),
(6, 'Vajaskifli', 'Pékáru', 180, 60, 'db', 15, 40, 0, 1),
(7, 'Kalács', 'Pékáru', 700, 15, 'db', 5, 10, 0, 1),
(8, 'Ciabatta', 'Pékáru', 550, 18, 'db', 5, 10, 0, 1),
(9, 'Foszlós briós', 'Pékáru', 400, 30, 'db', 10, 20, 0, 1),
(10, 'Focaccia', 'Pékáru', 600, 12, 'db', 5, 10, 0, 1),
(11, 'Vörösbor - Merlot', 'Szeszesital', 3200, 25, 'db', 5, 10, 1, 2),
(12, 'Fehérbor - Chardonnay', 'Szeszesital', 2900, 30, 'db', 5, 15, 1, 2),
(13, 'Pezsgő', 'Szeszesital', 4500, 20, 'db', 5, 10, 1, 2),
(14, 'Whiskey', 'Szeszesital', 9800, 10, 'db', 2, 5, 1, 2),
(15, 'Vodka', 'Szeszesital', 7200, 15, 'db', 3, 8, 1, 2),
(16, 'Rum', 'Szeszesital', 8300, 12, 'db', 3, 6, 1, 2),
(17, 'Gin', 'Szeszesital', 7800, 18, 'db', 4, 8, 1, 2),
(18, 'Sör - IPA', 'Szeszesital', 1100, 50, 'db', 10, 30, 1, 2),
(19, 'Sör - Lager', 'Szeszesital', 900, 60, 'db', 15, 35, 1, 2),
(20, 'Cognac', 'Szeszesital', 12500, 5, 'db', 1, 3, 1, 2),
(21, 'Parmezán sajt', 'Tejtermék', 5600, 20, 'kg', 5, 10, 0, 3),
(22, 'Mozzarella sajt', 'Tejtermék', 3200, 25, 'kg', 5, 12, 0, 3),
(23, 'Ricotta sajt', 'Tejtermék', 2800, 30, 'kg', 5, 15, 0, 3),
(24, 'Gorgonzola sajt', 'Tejtermék', 4800, 18, 'kg', 4, 8, 0, 3),
(25, 'Pecorino sajt', 'Tejtermék', 5100, 22, 'kg', 5, 10, 0, 3),
(26, 'Burrata sajt', 'Tejtermék', 5500, 12, 'kg', 3, 6, 0, 3),
(27, 'Taleggio sajt', 'Tejtermék', 4900, 15, 'kg', 4, 7, 0, 3),
(29, 'Fontina sajt', 'Tejtermék', 4600, 18, 'kg', 5, 9, 0, 3),
(30, 'Asiago sajt', 'Tejtermék', 4200, 16, 'kg', 4, 8, 0, 3),
(31, 'Bio Zöldtea', 'Italok', 1200, 50, 'db', 5, 10, 0, 4),
(32, 'Fekete Kávé', 'Italok', 1500, 40, 'db', 5, 10, 0, 4),
(33, 'Narancslé', 'Italok', 900, 60, 'db', 5, 10, 0, 4),
(34, 'Citromos Üdítő', 'Italok', 800, 55, 'db', 5, 10, 0, 4),
(35, 'Kókusztej', 'Italok', 2000, 30, 'db', 5, 10, 0, 4),
(36, 'Piros Alma', 'Gyümölcs', 500, 100, 'kg', 10, 20, 0, 4),
(37, 'Banán', 'Gyümölcs', 600, 90, 'kg', 10, 20, 0, 4),
(38, 'Körte', 'Gyümölcs', 700, 80, 'kg', 10, 20, 0, 4),
(40, 'Sárgadinnye', 'Gyümölcs', 1500, 60, 'kg', 10, 20, 0, 4),
(41, 'Sertéstarja', 'Húsáru', 2500, 50, 'kg', 5, 10, 0, 5),
(42, 'Csirkemell', 'Húsáru', 1800, 60, 'kg', 5, 10, 0, 5),
(43, 'Marhahús', 'Húsáru', 3200, 40, 'kg', 5, 10, 0, 5),
(44, 'Pulykamell', 'Húsáru', 2000, 50, 'kg', 5, 10, 0, 5),
(45, 'Kolbász', 'Húsáru', 2800, 30, 'kg', 5, 10, 0, 5),
(47, 'Téliszalámi', 'Húsáru', 4000, 25, 'kg', 5, 10, 0, 5),
(48, 'Füstölt sonka', 'Húsáru', 3500, 30, 'kg', 5, 10, 0, 5),
(49, 'Bacon szeletek', 'Húsáru', 3200, 40, 'kg', 5, 10, 0, 5),
(50, 'Sertéspörkölt kocka', 'Húsáru', 2600, 50, 'kg', 5, 10, 0, 5),
(51, 'Paradicsom', 'Zöldség', 600, 90, 'kg', 10, 20, 0, 6),
(52, 'Paprika', 'Zöldség', 700, 80, 'kg', 10, 20, 0, 6),
(53, 'Uborka', 'Zöldség', 500, 100, 'kg', 10, 20, 0, 6),
(54, 'Saláta', 'Zöldség', 800, 70, 'kg', 10, 20, 0, 6),
(55, 'Hagyma', 'Zöldség', 400, 120, 'kg', 10, 20, 0, 6),
(56, 'SárgarépaLLOL', 'Zöldség', 450, 110, 'kg', 10, 20, 1, 6),
(57, 'a', 'Pékáru', 1, 2.1, 'kg', 2, 1, 0, 6),
(58, 'Burgonya', 'Zöldség', 300, 150, 'kg', 10, 20, 0, 100),
(74, '', 'Pékáru', 0, 0, 'db', 0, 0, 0, 0),
(75, '', 'Pékáru', 0, 0, 'db', 0, 0, 0, 0),
(1745935862944, 'test', 'Szeszesital', 500, 20, 'db', 5, 10, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tetel`
--
DROP TABLE IF EXISTS `tetel`; 
CREATE TABLE `tetel` (
  `sazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Számla azonosítója',
  `tazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Termék azonosítója',
  `mennyiseg` double UNSIGNED NOT NULL COMMENT 'Vásárolt mennyiség'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Tételek adatai';

--
-- A tábla adatainak kiíratása `tetel`
--

INSERT INTO `tetel` (`sazon`, `tazon`, `mennyiseg`) VALUES
(1, 34, 3),
(1, 50, 1.5),
(2, 38, 2.5),
(2, 49, 3),
(2, 30, 1),
(3, 27, 1),
(3, 55, 2),
(4, 45, 1.2),
(4, 58, 3.5),
(6, 42, 1.8),
(7, 37, 2.5),
(7, 52, 1.5),
(8, 32, 3),
(9, 44, 1.5),
(10, 29, 1),
(11, 41, 1.7),
(11, 54, 3),
(12, 26, 1),
(12, 33, 4),
(17, 25, 2.5),
(18, 3, 2),
(18, 22, 1.8),
(19, 12, 1),
(20, 6, 3),
(20, 41, 2.5),
(20, 33, 2),
(21, 24, 1.2),
(22, 1, 2),
(22, 51, 3),
(23, 15, 1),
(23, 43, 2.8),
(24, 7, 1),
(25, 19, 4),
(25, 36, 1.5),
(25, 32, 2),
(26, 25, 2.2),
(27, 2, 3),
(27, 52, 3.5),
(28, 11, 2),
(28, 45, 1.8),
(28, 34, 1),
(29, 27, 1.5),
(30, 4, 2),
(30, 53, 2),
(31, 16, 1),
(32, 8, 2),
(32, 47, 3.2),
(32, 35, 3),
(33, 29, 1.8),
(34, 9, 1),
(34, 54, 2.5),
(35, 13, 2),
(35, 48, 1.5),
(35, 31, 1),
(36, 23, 2),
(37, 5, 3),
(37, 55, 3),
(38, 17, 1),
(39, 30, 1.2),
(39, 32, 2),
(39, 40, 2.8),
(40, 10, 1),
(41, 14, 2),
(41, 49, 3.5),
(42, 26, 1.8),
(43, 3, 2),
(43, 56, 2),
(43, 33, 1),
(44, 20, 1),
(45, 21, 2.5),
(45, 35, 2),
(46, 6, 3),
(47, 24, 1.5),
(47, 50, 3),
(47, 31, 1),
(48, 9, 2),
(49, 15, 1),
(49, 53, 2.8),
(50, 27, 1.2),
(51, 1, 3),
(51, 44, 2),
(51, 34, 2),
(52, 12, 1),
(53, 25, 3),
(53, 32, 1),
(54, 7, 2),
(54, 48, 1.8),
(55, 16, 1),
(56, 4, 3),
(56, 52, 2.5),
(56, 35, 1),
(57, 22, 1.5),
(58, 8, 1),
(58, 41, 3),
(59, 13, 2),
(60, 29, 2),
(60, 33, 3),
(60, 43, 1.8),
(61, 5, 1),
(62, 17, 2),
(62, 54, 2.5),
(63, 26, 1.2),
(64, 2, 3),
(64, 47, 3),
(64, 31, 1),
(65, 10, 1),
(66, 23, 2.5),
(66, 34, 2),
(67, 6, 1),
(68, 19, 4),
(68, 40, 1.8),
(69, 25, 2),
(70, 1, 2),
(70, 51, 3.2),
(70, 32, 1),
(71, 14, 1),
(72, 27, 1.5),
(72, 35, 2),
(73, 4, 3),
(74, 21, 2),
(74, 53, 3),
(74, 31, 1),
(75, 8, 2),
(76, 16, 1),
(76, 48, 1.8),
(77, 23, 2.5),
(78, 2, 3),
(78, 54, 3),
(78, 33, 1),
(79, 10, 1),
(80, 25, 2),
(80, 35, 2),
(81, 6, 1),
(82, 19, 4),
(82, 40, 1.8),
(82, 31, 1),
(83, 27, 1.5),
(84, 1, 2),
(84, 51, 3),
(85, 14, 1),
(86, 21, 2.5),
(86, 35, 2),
(87, 4, 3),
(88, 23, 1.8),
(88, 53, 3),
(88, 31, 1),
(89, 8, 2),
(90, 16, 1),
(90, 48, 1.8),
(91, 25, 2),
(92, 2, 3),
(92, 54, 3),
(92, 33, 1),
(93, 10, 1),
(94, 21, 2.5),
(94, 35, 2),
(95, 4, 3),
(96, 23, 1.8),
(96, 53, 3),
(96, 31, 1),
(97, 8, 2),
(98, 16, 1),
(98, 48, 1.8),
(99, 25, 2),
(100, 2, 3),
(100, 54, 3),
(100, 33, 1),
(18, 3, 2),
(18, 22, 1.8),
(19, 12, 1),
(20, 6, 3),
(20, 41, 2.5),
(20, 33, 2),
(21, 24, 1.2),
(22, 1, 2),
(22, 51, 3),
(23, 15, 1),
(23, 43, 2.8),
(24, 7, 1),
(25, 19, 4),
(25, 36, 1.5),
(25, 32, 2),
(26, 25, 2.2),
(27, 2, 3),
(27, 52, 3.5),
(28, 11, 2),
(28, 45, 1.8),
(28, 34, 1),
(29, 27, 1.5),
(30, 4, 2),
(30, 53, 2),
(31, 16, 1),
(32, 8, 2),
(32, 47, 3.2),
(32, 35, 3),
(33, 29, 1.8),
(34, 9, 1),
(34, 54, 2.5),
(35, 13, 2),
(35, 48, 1.5),
(35, 31, 1),
(36, 23, 2),
(37, 5, 3),
(37, 55, 3),
(38, 17, 1),
(39, 30, 1.2),
(39, 32, 2),
(39, 40, 2.8),
(40, 10, 1),
(41, 14, 2),
(41, 49, 3.5),
(42, 26, 1.8),
(19, 12, 1),
(20, 6, 3),
(20, 41, 2.5),
(20, 33, 2),
(21, 24, 1.2),
(22, 1, 2),
(22, 51, 3),
(23, 15, 1),
(23, 43, 2.8),
(24, 7, 1),
(25, 19, 4),
(25, 36, 1.5),
(25, 32, 2),
(26, 25, 2.2),
(27, 2, 3),
(27, 52, 3.5),
(28, 11, 2),
(28, 45, 1.8),
(28, 34, 1),
(29, 27, 1.5),
(30, 4, 2),
(30, 53, 2),
(31, 16, 1),
(32, 8, 2),
(32, 47, 3.2),
(32, 35, 3),
(33, 29, 1.8),
(34, 9, 1),
(34, 54, 2.5),
(35, 13, 2),
(35, 48, 1.5),
(35, 31, 1),
(36, 23, 2),
(37, 5, 3),
(37, 55, 3),
(38, 17, 1),
(39, 30, 1.2),
(39, 32, 2),
(39, 40, 2.8),
(40, 10, 1),
(41, 14, 2),
(41, 49, 3.5),
(42, 26, 1.8),
(43, 3, 2),
(43, 56, 2),
(43, 33, 1),
(68, 19, 4),
(68, 40, 1.8),
(69, 25, 2),
(70, 1, 2),
(70, 51, 3.2),
(70, 32, 1),
(71, 14, 1),
(72, 27, 1.5),
(72, 35, 2),
(73, 4, 3),
(74, 21, 2),
(74, 53, 3),
(74, 31, 1),
(75, 8, 2),
(76, 16, 1),
(76, 48, 1.8),
(77, 23, 2.5),
(78, 2, 3),
(78, 54, 3),
(78, 33, 1),
(79, 10, 1),
(80, 25, 2),
(80, 35, 2),
(81, 6, 1),
(82, 19, 4),
(82, 40, 1.8),
(82, 31, 1),
(83, 27, 1.5),
(84, 1, 2),
(84, 51, 3),
(85, 14, 1),
(86, 21, 2.5),
(86, 35, 2),
(87, 4, 3),
(88, 23, 1.8),
(88, 53, 3),
(88, 31, 1),
(89, 8, 2),
(90, 16, 1),
(90, 48, 1.8),
(91, 25, 2),
(92, 2, 3),
(92, 54, 3),
(92, 33, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkalmazott`
--
ALTER TABLE `alkalmazott`
  ADD PRIMARY KEY (`aazon`);

--
-- A tábla indexei `beszallito`
--
ALTER TABLE `beszallito`
  ADD PRIMARY KEY (`bazon`),
  ADD KEY `beszallito - cim` (`bcim`);

--
-- A tábla indexei `cim`
--
ALTER TABLE `cim`
  ADD PRIMARY KEY (`cazon`);

--
-- A tábla indexei `szamla`
--
ALTER TABLE `szamla`
  ADD PRIMARY KEY (`sazon`),
  ADD KEY `szamla - cim` (`scim`),
  ADD KEY `szamla - alkalmazott` (`selado`);

--
-- A tábla indexei `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`tazon`),
  ADD KEY `termek - beszallito` (`bazon`);

--
-- A tábla indexei `tetel`
--
ALTER TABLE `tetel`
  ADD KEY `tetel - szamla` (`sazon`),
  ADD KEY `tetel - termek` (`tazon`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkalmazott`
--
ALTER TABLE `alkalmazott`
  MODIFY `aazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Alkalmazott azonosítója', AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `beszallito`
--
ALTER TABLE `beszallito`
  MODIFY `bazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Beszállító azonosítója', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `cim`
--
ALTER TABLE `cim`
  MODIFY `cazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Címek azonosítója (az első cím az üzlet azonosítója) ', AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `szamla`
--
ALTER TABLE `szamla`
  MODIFY `sazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Számla azonosítója', AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `tazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Termékek azonosítója', AUTO_INCREMENT=1745935862945;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `beszallito`
--
ALTER TABLE `beszallito`
  ADD CONSTRAINT `beszallito - cim` FOREIGN KEY (`bcim`) REFERENCES `cim` (`cazon`) ON DELETE CASCADE ON UPDATE SET NULL;

--
-- Megkötések a táblához `szamla`
--
ALTER TABLE `szamla`
  ADD CONSTRAINT `szamla - alkalmazott` FOREIGN KEY (`selado`) REFERENCES `alkalmazott` (`aazon`) ON UPDATE CASCADE,
  ADD CONSTRAINT `szamla - cim` FOREIGN KEY (`scim`) REFERENCES `cim` (`cazon`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `tetel`
--
ALTER TABLE `tetel`
  ADD CONSTRAINT `tetel - szamla` FOREIGN KEY (`sazon`) REFERENCES `szamla` (`sazon`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tetel - termek` FOREIGN KEY (`tazon`) REFERENCES `termek` (`tazon`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;