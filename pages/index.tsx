import { NextPage } from "next";
import { useEffect, useState } from "react";
import LargeNewsBanner from "../components/LargeNewsBanner";
import DynamicGrid from "../components/DynamicGrid";

interface NewsItem {
  id: number;
  sourceName: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  content: string;
  jokes: string[];
}

const Home: NextPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]); // Initialize news state with an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Fetch news data from API
        const response = await fetch("/api/news");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const data = await response.json();

        console.log(data);

        setNews(data); // Update news state with fetched data
      } catch (error) {
        setError(error.message); // Set error state if fetching data fails
      } finally {
        setIsLoading(false); // Update loading state after fetching data
      }
    };

    fetchNewsData();
  }, []); // Fetch news data only once on component mount

  if (isLoading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error state if fetching data fails
  }

  return (
    <div className="container mx-auto p-6 bg-[#F1F8FE]">
      <LargeNewsBanner className="" newsItem={news[0]} />
      <h1 className="text-3xl font-bold mt-12 mb-6">Latest News</h1>
      <DynamicGrid apiData={news.slice(1)} />
    </div>
  );
};

export default Home;
