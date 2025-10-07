import { useEffect, useState } from "react";
import axios from "axios";
import Disclaimer from "./components/Disclaimer";
import MainAPOD from "./components/MainAPOD";
import Footer from "./components/Footer";

function App() {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const apodUrl = "https://api.nasa.gov/planetary/apod";
  const apiKey = import.meta.env.VITE_NASA_KEY;

  const fetchHeaderImage = async () => {
    try {
      // 🔹 Losowa data między 1995-06-16 a dziś
      const getRandomDate = () => {
        const start = new Date(1995, 5, 16);
        const end = new Date();
        const date = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        return date.toISOString().slice(0, 10);
      };

      // 🔹 prosty cache dzienny w localStorage
      const today = new Date().toISOString().slice(0, 10);
      const saved = JSON.parse(localStorage.getItem("dailyAPOD"));

      if (saved && saved.today === today) {
        setHeaderData(saved.data);
        console.log("Loaded APOD from cache:", saved.data);
        return;
      }

      const randomDate = getRandomDate();
      const res = await axios.get(
        `${apodUrl}?api_key=${apiKey}&date=${randomDate}`
      );
      setHeaderData(res.data);
      localStorage.setItem(
        "dailyAPOD",
        JSON.stringify({ today, data: res.data })
      );
      console.log("Fetched new random APOD:", res.data);

      setError(null);
    } catch (err) {
      console.error("Failed to fetch APOD:", err);
      setError("Nie udało się pobrać APOD");
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []); // <- pusty array, żeby fetch był tylko raz przy mountowaniu

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center  xl:pt-30 gap-2 font-mono">
      <Disclaimer />
      {/* Nagłówek z APOD */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <MainAPOD data={headerData} />
      <Footer />
    </div>
  );
}

export default App;
