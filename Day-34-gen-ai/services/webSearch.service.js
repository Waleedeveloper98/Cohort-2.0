import { tavily } from "@tavily/core";

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const performWebSearch = async ({ query }) => {
    console.log("Searching:", query)

    const response = await tavilyClient.search(query);
    if (response.results && response.results.length > 0) {
        return response.results[0].content
    } else {
        return "No results found"
    }
}

