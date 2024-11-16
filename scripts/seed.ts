import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding db");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/images/spanish-flag.svg" },
      { id: 2, title: "English", imageSrc: "/images/english-flag.svg" },
      { id: 3, title: "French", imageSrc: "/images/french-flag.svg" },
      { id: 4, title: "German", imageSrc: "/images/german-flag.svg" },
      { id: 5, title: "Japnese", imageSrc: "/images/japanese-flag.svg" },
    ]);

    console.log("seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the db");
  }
};

main();
