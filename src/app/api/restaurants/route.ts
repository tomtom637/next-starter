import { NextResponse } from "next/server";
import { getRestaurantsQueryRelated } from "@/db/queries/restaurant";

export async function GET() {
  const restaurants = await getRestaurantsQueryRelated();
  return NextResponse.json(restaurants);
}
