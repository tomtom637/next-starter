"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  type Table as TTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// TYPES
import type { TableData } from "./useRestaurantsTableColumns";

// HOOKS
import useRestaurantsTableColumns from "./useRestaurantsTableColumns";

// COMPONENTS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RestaurantsTable() {
  const { columnDef, tableData } = useRestaurantsTableColumns();

  const table = useReactTable({
    columns: columnDef,
    data: tableData,
    getCoreRowModel: getCoreRowModel<TableData>(),
    columnResizeMode: "onChange",
  });

  const sizingDependency = table.getState().columnSizingInfo;

  const columnSizeVars = useMemo(() => {
    if (!sizingDependency) return {};
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [sizingDependency, table]);

  return (
    <div className="rounded-md border">
      <Table
        {...{
          style: {
            ...columnSizeVars,
            width: "100%",
          },
        }}
      >
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow
              key={headerGroup.id}
              className="bg-slate-100 dark:bg-slate-900"
            >
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    {...{
                      className: cn(
                        "relative",
                        header.column.getCanResize() && "grow"
                      ),
                      style: {
                        width: `calc(var(--header-${header?.id}-size) * 1px)`,
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: cn(
                            "absolute right-0 top-0 h-full w-1 bg-slate-200 dark:bg-slate-800 cursor-col-resize select-none",
                            header.column.getIsResizing() && "opacity-0",
                            header.column.getIsResizing() && "opacity-100"
                          ),
                        }}
                      />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="even:bg-slate-100 dark:even:bg-slate-900"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    {...{
                      style: {
                        width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnDef.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
