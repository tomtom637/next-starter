import db from "@/db";
import { category, city, menuItem, order, restaurant, user } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

export async function getRestaurantsQueryRelated() {
  return db.query.restaurant.findMany({
    with: {
      city: {
        with: {
          state: true,
        },
      },
    },
  });
}

export type GetRestaurantsQueryRelated = Awaited<
  ReturnType<typeof getRestaurantsQueryRelated>
>;
