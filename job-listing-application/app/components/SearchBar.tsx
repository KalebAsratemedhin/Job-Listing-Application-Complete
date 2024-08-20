"use client"
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="p-2 text-base outline-none flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 flex items-center justify-center hover:bg-blue-600"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
