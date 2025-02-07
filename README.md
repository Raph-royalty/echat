# AI-Powered Product Search

A Next.js application that uses AI embeddings to provide intelligent product search capabilities. The application matches user queries with product descriptions using semantic search powered by Ollama and LangChain.

## Features

- Semantic search using AI embeddings
- Real-time product matching
- Responsive product grid layout
- Detailed product information display
- Stock status indicators
- Color variant displays

## Prerequisites

- Node.js 18 or later
- Ollama running locally
- The bge-base-zh-v1.5 model installed in Ollama

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Ensure Ollama is running on http://localhost:11434

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Technology Stack

- Next.js 14 (App Router)
- LangChain.js
- Ollama
- Tailwind CSS

## Project Structure

- `app/page.js` - Main search interface
- `app/actions/search.js` - Server-side search functionality
- `app/data/products.json` - Product database

## Development

The application uses Next.js with the App Router and Server Actions. The search functionality is implemented using LangChain.js and Ollama for embedding generation and similarity search.

## License

MIT
