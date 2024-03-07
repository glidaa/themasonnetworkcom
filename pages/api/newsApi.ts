// pages/api/newsApi.ts
import https from 'https';

// Function to fetch news from an external API
const fetchNews = () => {
    // API URL for fetching news
    const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

    const options = {
        headers: {
            'User-Agent': 'YourAppName' // Replace 'YourAppName' with your application name
        }
    };

    // TODO: Fetch news from the API
    return new Promise((resolve, reject) => {
        // Make an HTTP GET request to the API with the specified options
        https.get(API_URL, options, (res) => {
            let data = '';
            // Accumulate data as it streams in
            res.on('data', (chunk) => data += chunk);
            // Once data streaming is complete
            res.on('end', () => {
                try {
                    const newsData = JSON.parse(data);

                    // Check if the response is successful
                    if (newsData.status === 'ok') {
                        // Resolve with the news data
                        console.log("ok")
                        resolve(newsData);
                    } else {
                        // Reject with the error message from the API
                        reject(new Error(`Failed to fetch news: ${newsData.message}`));
                    }
                } catch (error) {
                    // Reject if there's an error parsing the data
                    reject(new Error(`Error parsing news data: ${error.message}`));
                }
            });
        }).on('error', (err) => {
            // Reject if there's an error with the HTTP request
            reject(new Error(`Error fetching news data: ${err.message}`));
        });
    });

    // return {
    //     "status": "ok",
    //     "totalResults": 11135,
    //     "articles": [
    //         {
    //             "source": {
    //                 "id": "wired",
    //                 "name": "Wired"
    //             },
    //             "author": "Joel Khalili",
    //             "title": "The Trial Over Bitcoin’s True Creator Is in Session",
    //             "description": "A UK High Court will settle a long-running debate over whether Craig Wright really is Satoshi Nakamoto, inventor of Bitcoin. Monday’s opening arguments laid the groundwork for both sides.",
    //             "url": "https://www.wired.com/story/craig-wright-bitcoin-satoshi-nakamoto-trial/",
    //             "urlToImage": "https://media.wired.com/photos/65bd7e2524c06ba3ede91a33/191:100/w_1280,c_limit/Craig-Wright-Trial-Day-1-Business-Yellow-1494808061.jpg",
    //             "publishedAt": "2024-02-05T21:07:04Z",
    //             "content": "For eight years, Craig Wright has claimed to be the elusive Bitcoin creator Satoshi Nakamoto. On Monday, in the swelling heat of a UK courtroom, a trial began that will finally settle the question.\r\n… [+3163 chars]"
    //         },
    //         {
    //             "source": {
    //                 "id": null,
    //                 "name": "Gizmodo.com"
    //             },
    //             "author": "Artem Golub and Thomas Germain",
    //             "title": "Why Bitcoin Won’t Reach $1,000,000",
    //             "description": "Coindesk’s Andy Baehr says Bitcoin is just a normal, bread and butter investment now.",
    //             "url": "https://gizmodo.com/why-bitcoin-won-t-reach-1-000-000-1851252185",
    //             "urlToImage": "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/d27f57afb7ac3501d4d69ce6afff190b.jpg",
    //             "publishedAt": "2024-02-13T18:15:00Z",
    //             "content": "Coindesks Andy Baehr says Bitcoin is just a normal, bread and butter investment now."
    //         },
    //         {
    //             "source": {
    //                 "id": "business-insider",
    //                 "name": "Business Insider"
    //             },
    //             "author": "prosen@insider.com (Phil Rosen)",
    //             "title": "El Salvador's millennial crypto-loving president says the country's bitcoin holdings are up more than 40%",
    //             "description": "Nayib Bukele said if El Salvador sold all of the bitcoin in its coffers today, it would bank roughly $41.6 million in profit.",
    //             "url": "https://markets.businessinsider.com/news/currencies/bitcoin-price-el-salvador-millennial-president-bukele-investment-cryptocurrency-finance-2024-2",
    //             "urlToImage": "https://i.insider.com/65df846290413ab8e1d796e4?width=1200&format=jpeg",
    //             "publishedAt": "2024-02-29T12:46:09Z",
    //             "content": "President Nayib Bukele said El Salvador won't sell its bitcoin investment.\r\nEmerson Flores/APHOTOGRAFIA/Getty Images\r\nEl Salvador is up big on its bitcoin bet, according to its millennial president N… [+2026 chars]"
    //         },
    //         {
    //             "source": {
    //                 "id": "business-insider",
    //                 "name": "Business Insider"
    //             },
    //             "author": "Lloyd Lee",
    //             "title": "Merrill and Wells Fargo are taking Bitcoin ETFs even more mainstream",
    //             "description": "Bank of America's Merill and Wells Fargo are offering some of their clients bitcoin exchange-traded funds, which have recently seen a surge in demand.",
    //             "url": "https://www.businessinsider.com/merill-wells-fargo-bitcoin-etf-mainstream-products-wealth-management-2024-2",
    //             "urlToImage": "https://i.insider.com/65e10465ce7f1785b2e51ea7?width=1200&format=jpeg",
    //             "publishedAt": "2024-02-29T23:04:54Z",
    //             "content": "Bank of America's Merrill and Wells Fargo are offering spot bitcoin ETF's to some of their clients as the investment vehicle surges in demand, Bloomberg ReportedHannes P Albert/picture alliance via G… [+2414 chars]"
    //         },
    //     ]
    // }
};

export { fetchNews };
