"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import type { ColumnDef } from "@tanstack/react-table";
import type { GetRestaurantsQueryRelated } from "@/db/queries/restaurant";

import { getRestaurants } from "@/queries/restaurants";

type Restaurant = GetRestaurantsQueryRelated[number];

export type TableData = {
  index: number;
  id: Restaurant["id"];
  name: Restaurant["name"];
  city: Restaurant["city"]["name"];
  state: Restaurant["city"]["state"]["name"];
  zipCode: Restaurant["zipCode"];
  streetAddress: Restaurant["streetAddress"];
  createdAt: Restaurant["createdAt"];
};

export default function useRestaurantsTableColumns() {
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
    staleTime: 1000 * 60,
  });

  const tableData: TableData[] = useMemo(() => {
    if (!restaurants) return [];
    return restaurants.map((restaurant, index) => ({
      index,
      id: restaurant.id,
      name: restaurant.name,
      city: restaurant.city.name,
      state: restaurant.city.state.name,
      zipCode: restaurant.zipCode,
      streetAddress: restaurant.streetAddress,
      createdAt: restaurant.createdAt.split(" ")[0],
    }));
  }, [restaurants]);

  const columnDef: ColumnDef<TableData>[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 280,
    },
    {
      accessorKey: "city",
      header: "City",
      size: 200,
    },
    {
      accessorKey: "state",
      header: "State",
      size: 200,
    },
    {
      accessorKey: "zipCode",
      header: "Zip Code",
      size: 90,
    },
    {
      accessorKey: "streetAddress",
      header: "Street Address",
      size: 350,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      size: 150,
      enableResizing: false,
    },
  ];

  return { columnDef, tableData };
}
