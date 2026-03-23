"use client";

import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  accentColor?: string;
  className?: string;
};
export function CalendarTheme({ children, accentColor, className }: Props) {
  const style: CSSProperties | undefined = accentColor
    ? { ["--calendar-accent" as string]: accentColor }
    : undefined;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
