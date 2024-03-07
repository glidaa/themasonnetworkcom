// pages/test.tsx
import React, { useEffect, useState } from 'react';

const TestPage = () => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('/api/newsApi'); // Make a request to the API route
        if (!response.ok) {
          throw new Error(`Failed to fetch news data. The server responded with an error: ${response.statusText}`); // Display server error message
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
      {newsData && (
        <div>
          <h2>News Data</h2>
          <pre>{JSON.stringify(newsData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;
