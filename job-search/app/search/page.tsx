import DisplayJobListings from "@/components/DisplayJobListings";
import SearchInputsArea from "@/components/SearchInputsArea";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    keywords: string;
    location: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  if (!searchParams.keywords) redirect("/");

  return (
    <div className="wrapper mb-4">
      <section className="w-full flex flex-col items-center gap-4 mb-4">
        <h1 className="text-center font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
          One Search, Endless Opportunities
        </h1>

        <SearchInputsArea />
      </section>

      <section>
        <DisplayJobListings searchParams={searchParams} />
      </section>
    </div>
  );
};

export default SearchPage;
