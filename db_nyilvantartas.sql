-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Feb 28. 09:39
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

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

DROP TABLE IF EXISTS `alkalmazott`;
CREATE TABLE IF NOT EXISTS `alkalmazott` (
  `aazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Alkalmazott azonosítója',
  `anev` varchar(20) NOT NULL COMMENT 'Alkalmazott teljes neve',
  `amunka` varchar(20) NOT NULL DEFAULT 'kasszás' COMMENT 'Alkalmazott munkaköre',
  `aszul` date DEFAULT NULL COMMENT 'Alkalmazott születési dátuma',
  `abelepes` date NOT NULL COMMENT 'Alkalmazott felvételének dátuma',
  `aber` int(10) UNSIGNED NOT NULL COMMENT 'Alkalmazott bruttó havi fizetése forintban',
  `awebjog` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Alkalmazott hozzáférési jogosultsága a webes felülethez',
  `agepjog` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Alkalmazott hozzáférési jogosultsága az asztali felülethez',
  PRIMARY KEY (`aazon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Alkalmazottak adatai';

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `beszallito`
--

DROP TABLE IF EXISTS `beszallito`;
CREATE TABLE IF NOT EXISTS `beszallito` (
  `bazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Beszállító azonosítója',
  `bnev` varchar(50) NOT NULL COMMENT 'Beszállító megnevezése',
  `bcim` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Beszállító címének azonosítója',
  `bemail` varchar(50) NOT NULL COMMENT 'Beszállító kapcsolattartási e-mail címe',
  PRIMARY KEY (`bazon`),
  KEY `beszallito - cim` (`bcim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Beszállítók adatai';

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cim`
--

DROP TABLE IF EXISTS `cim`;
CREATE TABLE IF NOT EXISTS `cim` (
  `cazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Címek azonosítója (az első cím az üzlet azonosítója) ',
  `orszag` varchar(100) NOT NULL DEFAULT 'magyarország' COMMENT 'Címhez tartozó ország neve',
  `iranyitoszam` varchar(20) NOT NULL COMMENT 'Címhez tartozó irányítószám',
  `telepules` varchar(100) NOT NULL DEFAULT 'Budapest' COMMENT 'Címhez tartozó település neve',
  `kozterulet` varchar(100) NOT NULL COMMENT 'Címhez tartozó közterület neve és típusa',
  `hazszam` varchar(10) NOT NULL COMMENT 'Címhez tartozó házszám (pl 12-14)',
  PRIMARY KEY (`cazon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Címek adatai';

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szamla`
--

DROP TABLE IF EXISTS `szamla`;
CREATE TABLE IF NOT EXISTS `szamla` (
  `sazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Számla azonosítója',
  `skiallitas` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Számla kiállítási címének azonosítója',
  `scim` bigint(20) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Számla kiállításának az időpontja',
  `spenztar` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Számlát kiállító pénztárgép sorszáma ',
  `selado` bigint(20) UNSIGNED NOT NULL COMMENT 'Számlát kiállító alkalmazott azonosítója',
  `sfizetesimod` varchar(20) NOT NULL DEFAULT 'készpénz' COMMENT 'Választott fizetési mód ',
  PRIMARY KEY (`sazon`),
  KEY `szamla - cim` (`scim`),
  KEY `szamla - alkalmazott` (`selado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Számla / Tranzakció adatai';

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

DROP TABLE IF EXISTS `termek`;
CREATE TABLE IF NOT EXISTS `termek` (
  `tazon` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Termékek azonosítója',
  `tnev` varchar(100) NOT NULL COMMENT 'Termék neve ',
  `tkategoria` varchar(50) NOT NULL COMMENT 'Termék kategóriája',
  `tar` int(10) UNSIGNED NOT NULL COMMENT 'Termék egységenkénti ára',
  `tmennyiseg` double UNSIGNED NOT NULL COMMENT 'Készlet mennyiség',
  `tmennyisegiegyseg` varchar(10) NOT NULL DEFAULT 'db' COMMENT 'Termék mennyiségi egysége (pl db,kg)',
  `tminkeszlet` double UNSIGNED NOT NULL DEFAULT 0,
  `tkoros` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Nagykorúsághoz kötött-e a termék',
  `bazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Termék beszállítójának azonosítója',
  PRIMARY KEY (`tazon`),
  KEY `termek - beszallito` (`bazon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='termékek adatai';

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tetel`
--

DROP TABLE IF EXISTS `tetel`;
CREATE TABLE IF NOT EXISTS `tetel` (
  `sazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Számla azonosítója',
  `tazon` bigint(20) UNSIGNED NOT NULL COMMENT 'Termék azonosítója',
  `mennyiseg` double UNSIGNED NOT NULL COMMENT 'Vásárolt mennyiség',
  KEY `tetel - szamla` (`sazon`),
  KEY `tetel - termek` (`tazon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci COMMENT='Tételek adatai';

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `beszallito`
--
ALTER TABLE `beszallito`
  ADD CONSTRAINT `beszallito - cim` FOREIGN KEY (`bcim`) REFERENCES `cim` (`cazon`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `szamla`
--
ALTER TABLE `szamla`
  ADD CONSTRAINT `szamla - alkalmazott` FOREIGN KEY (`selado`) REFERENCES `alkalmazott` (`aazon`) ON UPDATE CASCADE,
  ADD CONSTRAINT `szamla - cim` FOREIGN KEY (`scim`) REFERENCES `cim` (`cazon`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `termek`
--
ALTER TABLE `termek`
  ADD CONSTRAINT `termek - beszallito` FOREIGN KEY (`bazon`) REFERENCES `beszallito` (`bazon`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `tetel`
--
ALTER TABLE `tetel`
  ADD CONSTRAINT `tetel - szamla` FOREIGN KEY (`sazon`) REFERENCES `szamla` (`sazon`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tetel - termek` FOREIGN KEY (`tazon`) REFERENCES `termek` (`tazon`) ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
