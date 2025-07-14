import db from "..";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

const main = async () => {
  console.log("Seed start");
  await db.insert(advocates).values(advocateData).returning();
  console.log("Seed done");
};

main();