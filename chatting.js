const OpenAI = require("openai");
require("dotenv").config();

// Initialize the OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_DISCORDBOT, // Ensure this API key is valid
});

async function generateResponse() {
    try {
        // Use the `createChatCompletion` method for ChatGPT models
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Essay on global warming" }], // `messages` should be the key
            max_tokens: 100,
        });

        // Log the response
        console.log("Response:", response.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Call the function
generateResponse();
