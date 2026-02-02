CREATE TABLE `cities` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`country_code` varchar(2) NOT NULL,
	`name` varchar(25) NOT NULL,
	CONSTRAINT `cities_id` PRIMARY KEY(`id`)
);
