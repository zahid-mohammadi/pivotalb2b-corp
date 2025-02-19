import { z } from "zod";

export const themeSchema = z.object({
  primary: z.string(),
  variant: z.enum(["professional", "tint", "vibrant"]),
  appearance: z.enum(["light", "dark", "system"]),
  radius: z.number(),
});

export type Theme = z.infer<typeof themeSchema>;

export const defaultTheme: Theme = {
  primary: "#0066CC", // Default brand blue
  variant: "professional",
  appearance: "system",
  radius: 0.5,
};

export const brandColors = {
  blue: "#0066CC",
  purple: "#6B46C1",
  green: "#059669",
  orange: "#D97706",
  red: "#DC2626",
} as const;

export type BrandColor = keyof typeof brandColors;

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
