import { getRestaurantsQueryRelated } from "@/db/queries/restaurant";

export async function GET() {
  const restaurants = await getRestaurantsQueryRelated();
  return new Response(JSON.stringify(restaurants));
}
