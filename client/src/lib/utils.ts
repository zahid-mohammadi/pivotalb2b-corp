import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  return title
    .toLowerCase() 
    .trim() 
    .replace(/[^\w\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-') + 
    '-' + timestamp;
}