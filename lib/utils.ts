import { type SubjectValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: SubjectValue[]) {
  return twMerge(clsx(inputs));
}
