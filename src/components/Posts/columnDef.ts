"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Post } from "@/app/posts/page";

export const columnDef: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 280,
  },
  {
    accessorKey: "content",
    header: "Content",
    size: 350,
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 200,
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 150,
    enableResizing: false,
  },
];
