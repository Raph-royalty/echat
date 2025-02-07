// app/page.js
"use client";

import { useState } from 'react';
import { searchProducts } from './actions/search';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState({ results: [], analysis: '' });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await searchProducts(query);
      setSearchData(response);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">AI-Powered Product Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe the phone you want..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {searchData.analysis && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">AI Analysis</h2>
          <p className="text-gray-700">{searchData.analysis}</p>
        </div>
      )}

      {searchData.results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchData.results.map(({ product, score }) => (
            <div 
              key={product.id} 
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">
                  {product.brand} {product.model}
                </h2>
                {/* <span className="text-sm text-gray-500">
                  Match: {(score * 100).toFixed(1)}%
                </span> */}
              </div>
              <p className="text-green-600 font-bold mt-2">
                KSh {product.price.toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Features:</h3>
                <ul className="list-disc list-inside">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex gap-2">
                {product.color.map((color) => (
                  <span 
                    key={color}
                    className="text-xs px-2 py-1 bg-gray-100 rounded"
                  >
                    {color}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <span className={`text-sm px-2 py-1 rounded ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && query && !searchData.results.length && (
        <div className="text-center p-8 text-gray-500">
          No products found matching your description. Try adjusting your search terms.
        </div>
      )}
    </main>
  );
}