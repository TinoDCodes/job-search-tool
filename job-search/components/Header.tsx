import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import SearchHistory from "./SearchHistory";

export const Header = () => {
  return (
    <header className="wrapper w-full h-fit flex items-center justify-between">
      <Link href="/">
        <Image
          src="/logos/logo-image.png"
          alt="logo"
          height="193"
          width="1500"
          sizes="1500px"
          className="h-8 md:h-10 lg:h-12 2xl:h-14 w-auto dark:invert"
        />
      </Link>

      <section className="flex items-center gap-2 lg:gap-4">
        <ThemeSwitcher />

        <SearchHistory />
      </section>
    </header>
  );
};
