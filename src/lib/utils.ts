import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Smooth satin spring — used everywhere for unified feel
export const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

// Extra soft spring for large entrance / overlay
export const smoothSpring = {
  type: "spring" as const,
  stiffness: 180,
  damping: 24,
  mass: 1,
};

// Gentle ease for opacity / translate (cubic-bezier)
export const smoothEase = [0.22, 1, 0.36, 1] as const;
