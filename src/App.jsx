import { useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ImageGallery from "./components/ImageGallery";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const apiUrl = "https://images-api.nasa.gov/search";

  const fetchNASAImages = async (searchTerm) => {
    try {
      const params = new URLSearchParams({
        q: searchTerm ? searchTerm.trim().split(' ').map(word => encodeURIComponent(word)).join('+') : "space",
        media_type: "image",
        page_size: 20,
      });

      const response = await axios.get(apiUrl, {
        params: params.toString() 
      });

      if (response.status !== 200) {
        throw new Error(
          `Network response was not ok (status ${response.status})`
        );
      }

      const data = response.data;
      setImages(data.collection.items);
    } catch (error) {
      console.error("Error fetching data:", error);
      setImages([]);
    }
  };

  return (
    <div>
      <Header />
      <SearchInput onSearch={fetchNASAImages} />
      <ImageGallery images={images} />
    </div>
  );
}

export default App;
