import { challengeOptions, challenges } from "../../../db/schema";

export type challengeOptionsType = (typeof challenges.$inferSelect & {
  completed: boolean;
  challengeOptions: (typeof challengeOptions.$inferSelect)[];
})[];
