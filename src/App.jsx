import { useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ImageGallery from "./components/ImageGallery";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiUrl = "https://images-api.nasa.gov/search";

  const fetchNASAImages = async (searchTerm) => {
    try {
      const formattedSearchTerm = searchTerm
        ? searchTerm.trim().replace(/\s+/g, "")
        : "space";

      const params = new URLSearchParams({
        q: formattedSearchTerm,
        media_type: "image",
        page_size: 20,
      });

      const response = await axios.get(apiUrl, {
        params: params,
      });

      if (response.status !== 200) {
        throw new Error(
          `Network response was not ok (status ${response.status})`
        );
      }

      const data = response.data;
      setImages(data.collection.items);
      setSearchTerm(searchTerm); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setImages([]);
      setSearchTerm(searchTerm); 
    }
  };

  return (
    <div>
      <Header />
      <SearchInput onSearch={fetchNASAImages} />
      {images.length === 0 && searchTerm !== "" && (
        <h1>No results for phrase `{searchTerm}`</h1>
      )}

      {images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}

export default App;
