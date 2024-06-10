"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [linkedInData, setLinkedInData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/linkedin");
        const result = await response.json();
        setLinkedInData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="h-screen w-full">
      Welcome to Job Discover
      <p>{JSON.stringify(linkedInData)}</p>
    </main>
  );
};

export default Home;
