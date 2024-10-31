import { extendVariants, Button } from "@nextui-org/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      teal: "font-medium text-white bg-teal-400 hover:bg-teal-500 dark:hover:bg-teal-600",
      tealLight:
        "text-teal-400 bg-transparent hover:bg-teal-200/30 dark:hover:bg-teal-900/50",
      "teal-shadow":
        "font-medium text-white bg-teal-400 hover:bg-teal-500 shadow-lg shadow-teal-500/40 dark:shadow-teal-900/80 dark:hover:bg-teal-600",
    },
    size: {
      history: "h-8 lg:h-9 min-w-14",
    },
  },
  compoundVariants: [
    {
      color: "teal",
      className: "text-white",
    },
  ],
});
