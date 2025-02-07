# AI-Powered Product Search

An intelligent product search application that uses LLMs and vector embeddings to understand natural language queries and find relevant products.

## Features

- Natural language product search using LLMs
- Semantic search with vector embeddings
- AI-powered analysis of search results
- Real-time product recommendations
- Responsive UI with detailed product cards

## Technical Stack

- **Frontend**: Next.js 14 with React
- **AI/ML**: 
  - Ollama for LLM inference
  - LangChain.js for AI orchestration
  - Vector embeddings for semantic search
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+
- Ollama installed locally
- At least 8GB RAM recommended

## Setup Ollama models
- Download the models from the Ollama Hub
- nomic-embed-text is the model that we use for embeddings generation
- llama3.2 is the full lightweight LLM model that we use for natural language understanding

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```


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

## Project Structure

- `app/page.js` - Main search interface
- `app/actions/search.js` - Server-side search functionality
- `app/data/products.json` - Product database

## Development

The application uses Next.js with the App Router and Server Actions. The search functionality is implemented using LangChain.js and Ollama for embedding generation and similarity search.

## License

MIT
