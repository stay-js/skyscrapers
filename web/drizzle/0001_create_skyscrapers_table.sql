CREATE TABLE `skyscrapers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`city_id` bigint unsigned NOT NULL,
	`height` float NOT NULL,
	`stories` int,
	`finished` int,
	CONSTRAINT `skyscrapers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `skyscrapers` ADD CONSTRAINT `skyscrapers_city_id_cities_id_fk` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE restrict ON UPDATE restrict;