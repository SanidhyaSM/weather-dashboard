import React from "react";

function SearchBar({ city, setCity, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter city..."
        className="px-4 py-2 border rounded"
        disabled={loading}
      />
      <button
        onClick={onSearch}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
