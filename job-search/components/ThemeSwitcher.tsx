"use client";

import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { CustomButton } from "./custom/CustomButton";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CustomButton
      isIconOnly
      variant="light"
      color="tealLight"
      aria-label="Theme toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <MoonIcon
          strokeWidth={2}
          className="h-5 w-5 lg:h-6 lg:w-6 group-hover:fill-teal-400 transition"
        />
      ) : (
        <SunIcon
          strokeWidth={2}
          className="h-5 w-5 lg:h-6 lg:w-6 group-hover:fill-teal-400 transition"
        />
      )}
    </CustomButton>
  );
};
