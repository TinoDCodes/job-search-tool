const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 lg:gap-7 mt-36 lg:mt-44 mb-8 lg:mb-12">
      <h1 className="font-bold text-center text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
        The Smart Way to{" "}
        <span className="text-teal-400 dark:text-shadow-same">
          Search for Jobs
        </span>
      </h1>
      <p className="text-center font-medium text-zinc-500 max-w-[35rem] text-sm xl:text-lg xl:max-w-[55rem] dark:text-zinc-100">
        Streamline your job search by compiling listings from top sites such as
        LinkedIn, Indeed, Upwork, Toptal, OfferZen, and more.
      </p>
    </div>
  );
};

export default Hero;
