import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { brandColors } from "@/lib/theme";
import type { BrandColor } from "@/lib/theme";

export function ThemeSwitcher() {
  const { theme, setTheme, setBrandColor } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          {theme.appearance === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
          ) : theme.appearance === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
          ) : (
            <Laptop className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={theme.appearance}
          onValueChange={(value) =>
            setTheme({ ...theme, appearance: value as "light" | "dark" | "system" })
          }
        >
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Laptop className="mr-2 h-4 w-4" />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            Brand Color
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {(Object.keys(brandColors) as BrandColor[]).map((color) => (
              <DropdownMenuItem
                key={color}
                onClick={() => setBrandColor(color)}
              >
                <div className="flex items-center">
                  <div
                    className="mr-2 h-4 w-4 rounded-full"
                    style={{ backgroundColor: brandColors[color] }}
                  />
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}