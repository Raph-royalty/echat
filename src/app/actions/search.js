"use server";

import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import products from '../data/products.json';

let vectorStore = null;

async function initializeVectorStore() {
  if (vectorStore) return;

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434",
  });

  const documents = products.map(product => {
    const content = `${product.brand} ${product.model} phone priced at ${product.price}. 
      ${product.description}. Features include: ${product.features.join(', ')}`;
    
    return new Document({
      pageContent: content,
      metadata: { ...product }
    });
  });

  vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
}

const SEARCH_PROMPT = PromptTemplate.fromTemplate(`
Given a user's product search query, extract the key features and preferences they're looking for.
Focus on aspects like: brand preferences, price range, battery life, camera quality, performance needs, etc.

User Query: {query}

Return only the key search terms that would be relevant for finding matching products. Keep it concise.
`);

const RESULTS_ANALYSIS_PROMPT = PromptTemplate.fromTemplate(`
Analyze these products based on the user's request: {query}

Product details:
{productDetails}

Explain in 2-3 sentences why these products might or might not match their needs. 
Focus on the specific features they asked about.
`);

async function processQueryWithLLM(query) {
  const llm = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama3.2:latest"
  });

  const formattedPrompt = await SEARCH_PROMPT.format({ query });
  return llm.call(formattedPrompt);
}

async function analyzeResults(query, products) {
  const llm = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama3.2:latest"
  });

  const productDetails = products
    .map(p => `${p.product.brand} ${p.product.model}: ${p.product.description}`)
    .join('\n');

  const formattedPrompt = await RESULTS_ANALYSIS_PROMPT.format({ 
    query, 
    productDetails 
  });

  return llm.call(formattedPrompt);
}

export async function searchProducts(query) {
  try {
    await initializeVectorStore();
    
    // Process the natural language query
    const enhancedQuery = await processQueryWithLLM(query);
    
    // Perform semantic search
    const results = await vectorStore.similaritySearch(enhancedQuery, 3);
    
    const searchResults = results.map(doc => ({
      score: doc.score,
      product: doc.metadata
    }));

    // Analyze results for relevance
    const analysis = await analyzeResults(query, searchResults);

    return {
      results: searchResults,
      analysis: analysis
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}