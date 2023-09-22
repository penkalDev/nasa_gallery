/* eslint-disable react/prop-types */
import { useState } from "react";
import "../App.css"; // Import the CSS file

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() !== "") {
        onSearch(searchTerm);
      }
    }
  };

  const handleSubmit = (event) => { // Prevents refreshing the page when the search input is clicked
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          id="searchInput"
          className="search-input"
          placeholder="Search for NASA images"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyPress}
          required // Add the required attribute
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchInput;
