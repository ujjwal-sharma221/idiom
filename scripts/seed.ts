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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/images/spanish-flag.svg" },
      { id: 2, title: "English", imageSrc: "/images/english-flag.svg" },
      { id: 3, title: "French", imageSrc: "/images/french-flag.svg" },
      { id: 4, title: "German", imageSrc: "/images/german-flag.svg" },
      { id: 5, title: "Japnese", imageSrc: "/images/japanese-flag.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit one",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Nouns" },
      { id: 2, unitId: 1, order: 2, title: "Verbs" },
      { id: 3, unitId: 1, order: 3, title: "Verbs" },
      { id: 4, unitId: 1, order: 4, title: "Verbs" },
      { id: 5, unitId: 1, order: 5, title: "Verbs" },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which of these is a "man"?',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"man"?',
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/challenge-items/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/audio/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/challenge-items/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/audio/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/challenge-items/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/audio/el_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "el hombre",
        audioSrc: "/audio/es_man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "la mujer",
        audioSrc: "/audio/es_woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
        audioSrc: "/audio/el_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        correct: false,
        text: "el hombre",
        audioSrc: "/audio/es_man.mp3",
        imageSrc: "/challenge-items/man.svg",
      },
      {
        challengeId: 3,
        correct: false,
        text: "la mujer",
        audioSrc: "/audio/es_woman.mp3",
        imageSrc: "/challenge-items/woman.svg",
      },
      {
        challengeId: 3,
        correct: true,
        text: "el robot",
        audioSrc: "/audio/el_robot.mp3",
        imageSrc: "/challenge-items/robot.svg",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: 'Which of these is a "man"?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: '"man"?',
      },
      {
        id: 6,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        question: 'Which one of these is the "robot"?',
      },
    ]);

    console.log("seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the db");
  }
};

main();
