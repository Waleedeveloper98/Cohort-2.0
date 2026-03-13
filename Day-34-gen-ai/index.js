// Load environment variables
import "dotenv/config"

// Import dependencies
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai"
import { createAgent, HumanMessage, tool } from "langchain"
import * as z from "zod"

// Import custom services
import { performWebSearch } from "./services/webSearch.service.js"



// Define a tool for web searching using Tavily
const webSearchTool = tool(
    performWebSearch
    , {
        name: "search_online",
        description: "use this tool to search online",
        schema: z.object({
            query: z.string().describe("Search terms to look for")
        })
    })


// Set up CLI interface for user input
const cliInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Initialize the Mistral AI model
const chatModel = new ChatMistralAI({
    model: "mistral-small-latest"
})

// Create an AI agent with the model and tools
const aiAgent = createAgent({
    model: chatModel,
    tools: [webSearchTool]
})


// Main chat loop
while (true) {
    // Get user input from CLI
    const userInput = await cliInterface.question("\x1b[32mYou:\x1b[0m ")

    // Send input to the agent and await response
    const response = await aiAgent.invoke({
        messages: [new HumanMessage(userInput)]
    })

    // Display the AI's response
    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages.at(-1).content}`)
}

// Clean up CLI interface
cliInterface.close()