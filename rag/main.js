import "dotenv/config"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'
import { PDFParse } from "pdf-parse"
import fs from "fs"

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("cohort-2-rag")

// const dataBuffer = fs.readFileSync("./REST-API.pdf")

// const parser = new PDFParse({ data: dataBuffer })

// const data = await parser.getText(dataBuffer)

// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1500,
//     chunkOverlap: 0,
// })

// const chunks = await splitter.splitText(data.text)

const embeddings = new MistralAIEmbeddings({
    model: "mistral-embed",
});

// const docs = await Promise.all(chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk)
//     return {
//         text: chunk,
//         embedding
//     }
// }))

// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

const queryEmbedding = await embeddings.embedQuery("What is status code for invalid user")

console.log(queryEmbedding)

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(result))