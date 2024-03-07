// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchNews } from './newsApi';
import { generateJokes } from './jokesApi';
import { readData, writeData, filterNew, readCache, writeCache } from './storeApi';

interface NewsItem {
  id: number;
  sourceName: string;
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  description: string;
  author: string;
  content: string;
  jokes: string[] | string; // Change type to string[] | string
}

const validNewsItem = (newsItem: any) => {
  const keys = ['source', 'title', 'url', 'urlToImage', 'publishedAt', 'description'];

  for (const key of keys) {
    if (!newsItem[key] || newsItem[key] == '[Removed]') {
      console.log(`${key}: ${newsItem[key]}`);
      return false;
    }
  }

  return true;
};

const fiveMinutes = 300000;

// Handler function for the news API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Trying to read cached data if any, else request new data
  try {
    const cache = readCache();
    if (cache.data && cache.data.length != 0 && Date.now() - cache.lastFetch < fiveMinutes) {
      console.log('from cache')
      res.status(200).json(cache.data);
    }
    else {
      throw new Error('No cache data');
    }
  }
  catch (error: unknown) {
    try {
      console.log('requesting')
      // Fetch news
      const newData = await fetchNews();
      const existingData = readData();
      const filteredData = filterNew(newData.articles.filter((item) => validNewsItem(item)), existingData);

      // Generate jokes for each news item
      const jokesPromises = filteredData.map(async (article) => {
        try {
          const jokes = await generateJokes(article.title, article.content);
          // Check if jokes are returned
          if (jokes && jokes.length > 0) {
            return {
              sourceName: article.source.name, // Extracting source name from article object
              title: article.title,
              url: article.url,
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,
              description: article.description,
              author: article.author,
              content: article.content,
              jokes
            };
          } else {
            return {
              sourceName: article.source.name, // Extracting source name from article object
              title: article.title,
              url: article.url,
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,
              description: article.description,
              author: article.author,
              content: article.content,
              jokes: 'No joke available' // Store error message directly
            };
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            res.status(500).json({ message: error.message });
          }
        }
      });

      // Wait for all joke generation promises to resolve
      const newsWithJokes: NewsItem[] = await Promise.all(jokesPromises);
      const totalNews = [...existingData, ...newsWithJokes];


      writeData(totalNews);
      // Cache the news data
      writeCache(totalNews);

      // Respond success
      res.status(200).json(totalNews);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // res.status(500).json({ message: `Could not load news. Please try again later.` });
        // Respond with error instead
        res.status(500).json({ message: error.message });
      }
    }
  }

}
