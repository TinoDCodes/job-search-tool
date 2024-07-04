import Image from "next/image";

const EmptyJobsScreen = () => {
  return (
    <section>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center mt-32">
        <Image
          src="/search-globe.svg"
          alt="empty search"
          height="0"
          width="0"
          sizes="100vw"
          className="h-[6rem] w-[6rem] opacity-15 mb-6"
        />
        <h3 className="font-bold text-xl opacity-25">No Jobs Found</h3>
      </div>
    </section>
  );
};

export default EmptyJobsScreen;
