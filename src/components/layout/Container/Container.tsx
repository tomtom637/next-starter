import { cn } from "@/lib/utils";

export default function Container({ children, className }: { children: React.ReactNode, className?: string}) {
  return <div className={cn("px-8 py-4", className)}>{children}</div>;
}