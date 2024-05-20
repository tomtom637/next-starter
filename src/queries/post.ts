import type { Post } from "@/app/posts/page";

export type PaginatedPostsResponse = {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Post[];
};

export async function getPosts() {
  try {
    const response = await fetch("http://localhost:3001/posts?_page=2", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: PaginatedPostsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
