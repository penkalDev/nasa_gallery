
import { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ImageGallery from "./components/ImageGallery";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const apodUrl = "https://api.nasa.gov/planetary/apod";
  const apiUrl = "https://images-api.nasa.gov/search";
  const apiKey = import.meta.env.VITE_NASA_KEY;

  // Pobranie APOD na nagłówek (dzisiejsze zdjęcie)
 const fetchHeaderImage = async () => {
    try {
      const res = await axios.get(`${apodUrl}?api_key=${apiKey}`);
      setHeaderData(res.data); // cały obiekt data
      console.log("APOD data:", res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch APOD:", err);
      setError("Nie udało się pobrać APOD");
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []);// <- pusty array, żeby fetch był tylko raz przy mountowaniu

  // Logika wyszukiwania obrazów NASA – zostaje bez zmian
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 xl:pt-40 ">
      {/* Nagłówek z APOD */}
       {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      <Header data={headerData} />

      {/* Pole wyszukiwania */}
      <SearchInput onSearch={fetchNASAImages} />

      {/* Wyniki wyszukiwania */}
      {images.length === 0 && searchTerm !== "" && (
        <h1 className="mt-6 text-lg">
          No results for phrase <span className="font-bold">{searchTerm}</span>
        </h1>
      )}

      {images.length > 0 && <ImageGallery images={images} />}
    </div>
  );
}

export default App;
