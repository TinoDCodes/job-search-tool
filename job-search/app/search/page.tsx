interface SearchPageProps {
  searchParams: {
    keywords: string;
    location: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  return (
    <div className="wrapper">Showing results for: {searchParams.keywords}</div>
  );
};

export default SearchPage;
