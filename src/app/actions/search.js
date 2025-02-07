"use server";

import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import products from '../data/products.json';

let vectorStore = null;

async function initializeVectorStore() {
  if (vectorStore) return;

  const embeddings = new OllamaEmbeddings({
    model: "quentinz/bge-base-zh-v1.5:latest",
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

export async function searchProducts(query) {
  try {
    await initializeVectorStore();
    const results = await vectorStore.similaritySearch(query, 5);
    
    return results.map(doc => ({
      score: doc.score,
      product: doc.metadata
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}