import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (size: number, offset: number): Array<number> =>
  [...Array(size).keys()].map((i) => i + offset);
