import Hero from "@/components/Hero";
import { LandingPageDecoration } from "@/components/LandingPageDecoration";
import SearchInputsArea from "@/components/SearchInputsArea";

const LandingPage = () => {
  return (
    <main className="wrapper h-full flex flex-col items-center justify-center">
      <Hero />
      <SearchInputsArea />
      <LandingPageDecoration />
    </main>
  );
};

export default LandingPage;
