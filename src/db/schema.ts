import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  jsonb,
  serial,
  timestamp,
  bigint,
  varchar
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", {length: 255}).notNull(),
  lastName: varchar("last_name", {length: 255}).notNull(),
  city: varchar("city", {length: 255}).notNull(),
  degree: varchar("degree", {length: 255}).notNull(),
  specialties: jsonb("specialties").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export { advocates };
