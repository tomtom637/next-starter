import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// QUERIES
import { getRestaurants } from "@/queries/restaurants";

// COMPONENTS
import Container from "@/components/layout/Container/Container";
import RestaurantsTable from "@/components/RestaurantsTable/RestaurantsTable";

export default async function PostsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container>
          <h1>Restaurant page</h1>
          <br />
          <RestaurantsTable />
        </Container>
      </HydrationBoundary>
    </main>
  );
}
