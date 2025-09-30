import { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ImageGallery from "./components/ImageGallery";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [headerImageTitle, setHeaderImageTitle] = useState(""); // Stan do przechowywania URL obrazu nagłówka
  const apiUrl = "https://images-api.nasa.gov/search";
  const apiKey = import.meta.env.VITE_NASA_KEY;

  // Funkcja do pobierania obrazu dnia z NASA
  const fetchHeaderImage = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );

      setHeaderImageUrl(response.data.url); // Ustawia URL obrazu
      setHeaderImageTitle(response.data.title);
      console.log("APOD data:", response.data);
      console.log("Title:", response.data.title);
    } catch (error) {
      console.error("Error fetching header image:", error);
    }
  };

  useEffect(() => {
    fetchHeaderImage(); // Wywołaj funkcję pobierającą obraz
  }, []);

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

      const response = await axios.get(apiUrl, { params });
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
      <Header imageUrl={headerImageUrl} imageTitle={headerImageTitle} />{" "}
      {/* Przekazanie URL obrazu do Header */}
      <SearchInput onSearch={fetchNASAImages} />
      {images.length === 0 && searchTerm !== "" && (
        <h1>No results for phrase `{searchTerm}`</h1>
      )}
      {images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}

export default App;
