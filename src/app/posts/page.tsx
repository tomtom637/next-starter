import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// QUERIES
import { getPosts } from "@/queries/post";

// COMPONENTS
import Container from "@/components/layout/Container/Container";
import Posts from "@/components/Posts/Posts";

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export default async function PostsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Container>
          <h1>Posts page</h1>
          <br />
          <Posts />
        </Container>
      </HydrationBoundary>
    </main>
  );
}
