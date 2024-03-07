const OpenAI = require("openai");
require('dotenv').config();

const generateJokes = (title: string, content: string) => {
  return new Promise((resolve, reject) => {
    const CHATGTP_API_KEY = process.env.CHATGTP_API_KEY;
    if (!CHATGTP_API_KEY) {
      return reject(new Error("CHATGTP_API_KEY environment variable is missing."));
    }

    console.log("Request data:", CHATGTP_API_KEY);
    const openai = new OpenAI({
      apiKey: CHATGTP_API_KEY
    });

    const requestOptions = {
      model: "gpt-4",
      // max_tokens: 50,
      temperature: 0.7
    };

    // Log request data
    console.log("Request data:", requestOptions);

    let resp = null
    openai.chat.completions.create({
      ...requestOptions,
      // Prompt for joke generation
      messages: [
        {
          role: 'system',
          content: "You're a late night host like Jimmy Kimmel and write a 2 sentences long joke related to the news I give you."
        },
        {
          role: 'user',
          content: `${title} ${content}`
        }
      ],
    }).then((response: any) => {
      // Log response data
      console.log("Response data:", response);
      resp = response

      const jokeText: string = resp.choices[0].message.content.trim();
      resolve(jokeText.split('\n'));
    })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          // Log request error
          console.error("Error generating joke:", error);
          reject(new Error(`Error generating joke: ${error.message}`));
        }
      });
  });
};

export { generateJokes };
