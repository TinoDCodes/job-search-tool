import { extendVariants, Button } from "@nextui-org/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      teal: "text-teal-400 bg-teal-500 hover:bg-teal-600",
      tealLight:
        "text-teal-500 bg-transparent hover:bg-teal-200/30 dark:hover:bg-teal-900/50",
    },
  },
  compoundVariants: [
    {
      color: "teal",
      className: "text-white",
    },
  ],
});
