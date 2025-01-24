import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn =(...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price) => {
  return `$${(Math.round(Math.abs(price) * 100) / 100).toFixed(2)}`
}