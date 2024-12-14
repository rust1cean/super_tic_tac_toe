import type { ReactNode } from "react";

export function Grid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-2 grid-cols-3 grid-rows-3 ${className}`}>
      {children}
    </div>
  );
}
