"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// COMPONENTS
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Container from "../layout/Container/Container";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-bold hover:text-slate-900 dark:hover:text-slate-100",
        usePathname() === href && "text-slate-900 dark:text-slate-100"
      )}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-slate-200 dark:bg-slate-800">
      <Container className="flex justify-between items-center">
        <ul className="flex gap-6 text-slate-500">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/restaurants">Restaurants</NavLink>
          </li>
        </ul>
        <ThemeToggle />
      </Container>
    </nav>
  );
}
