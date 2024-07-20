import db from "./db.server";
import { json } from "@remix-run/node";

export async function createOrUpdateBanner(arrayToIterate) {
    try {
        for (const obj of arrayToIterate) { // Iterate through each object in the array
            const data = {
                id: 1,
                topValue: obj.topValue,
                leftValue: obj.leftValue,
                displayPosition: obj.displayPosition,
                shop: obj.shop,
              };
              console.log("data in createOrUpdateBanner ",obj, data)
              const createdMapping = await db.banner.create({ data });
              console.log(
                "Creating new mapping of badge and product",
                createdMapping,
              );
        }
    return json({
        ok: true,
        msg: "POST from API",
      });
    } catch (error) {
      console.error("Error processing POST request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }