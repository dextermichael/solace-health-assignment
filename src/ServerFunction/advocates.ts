
import db from "@/db";
import { advocates } from "@/db/schema";
import { advocateData } from "@/db/seed/advocates"

export const getAdvocates = () => {
    // Uncomment this line to use a database
    // const data = await db.select().from(advocates);
    const data = advocateData;
    return data;
}