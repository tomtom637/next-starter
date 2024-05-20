import type { GetRestaurantsQueryRelated } from "@/db/queries/restaurant";

export async function getRestaurants() {
  try {
    const response = await fetch("http://localhost:3000/api/restaurants", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: GetRestaurantsQueryRelated = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
