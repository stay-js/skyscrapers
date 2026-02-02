import { mysqlTable as table } from 'drizzle-orm/mysql-core';

export const cities = table('cities', (d) => ({
  id: d.bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  countryCode: d.varchar('country_code', { length: 2 }).notNull(),
  name: d.varchar('name', { length: 25 }).notNull(),
}));

export const skyscrapers = table('skyscrapers', (d) => ({
  id: d.bigint('id', { mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  name: d.varchar('name', { length: 50 }).notNull(),
  cityId: d
    .bigint('city_id', { mode: 'number', unsigned: true })
    .notNull()
    .references(() => cities.id, { onDelete: 'restrict', onUpdate: 'restrict' }),
  height: d.float('height').notNull(),
  stories: d.int('stories'),
  finished: d.int('finished'),
}));
