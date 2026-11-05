// import { useEffect, useState } from "react";
// import axios from "axios";
// import Disclaimer from "./components/Disclaimer";
// import MainAPOD from "./components/MainAPOD";
// import Footer from "./components/Footer";

// function App() {
//   const [headerData, setHeaderData] = useState(null);
//   const [error, setError] = useState(null);
//   const apodUrl = "https://api.nasa.gov/planetary/apod";
//   const apiKey = import.meta.env.VITE_NASA_KEY;

//   const fetchHeaderImage = async () => {
//     try {
//       // 🔹 Losowa data między 1995-06-16 a dziś
//       const getRandomDate = () => {
//         const start = new Date(1995, 5, 16);
//         const end = new Date();
//         const date = new Date(
//           start.getTime() + Math.random() * (end.getTime() - start.getTime())
//         );

//         // Europejski format: DD.MM.YYYY (dla Berlina)
//         return date.toLocaleDateString("de-DE", { timeZone: "Europe/Berlin" });
//       };

//       // 🔹 prosty cache dzienny w localStorage
//       const today = new Date().toISOString().slice(0, 10);
//       const saved = JSON.parse(localStorage.getItem("dailyAPOD"));

//       if (saved && saved.today === today) {
//         setHeaderData(saved.data);
//         console.log("Loaded APOD from cache:", saved.data);
//         return;
//       }

//       const randomDate = getRandomDate();
//       const res = await axios.get(
//         `${apodUrl}?api_key=${apiKey}&date=${randomDate}`
//       );
//       setHeaderData(res.data);
//       localStorage.setItem(
//         "dailyAPOD",
//         JSON.stringify({ today, data: res.data })
//       );
//       console.log("Fetched new random APOD:", res.data);

//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch APOD:", err);
//       setError("Nie udało się pobrać APOD");
//     }
//   };

//   useEffect(() => {
//     fetchHeaderImage();
//   }, []); // <- pusty array, żeby fetch był tylko raz przy mountowaniu

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center  xl:pt-30 gap-2 font-mono">
//       <Disclaimer />
//       {/* Nagłówek z APOD */}
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <MainAPOD data={headerData} />
//       <Footer />
//     </div>
//   );
// }

// export default App;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Disclaimer from "./components/Disclaimer";
// import MainAPOD from "./components/MainAPOD";
// import Footer from "./components/Footer";

// function App() {
//   const [headerData, setHeaderData] = useState(null);
//   const [error, setError] = useState(null);
//   // const apodUrl = "https://api.nasa.gov/planetary/apod";
//   // const apiKey = import.meta.env.VITE_NASA_KEY;

//   // const fetchHeaderImage = async () => {
//   //   try {
//   //     // ✅ Generator losowej daty w poprawnym formacie (YYYY-MM-DD)
//   //     const getRandomDate = () => {
//   //       const start = new Date("1996-01-01").getTime();
//   //       const end = new Date().getTime();
//   //       const random = new Date(start + Math.random() * (end - start));
//   //       return random.toISOString().split("T")[0];
//   //     };

//   //     // ✅ Cache dzienny
//   //     const today = new Date().toISOString().slice(0, 10);
//   //     const saved = JSON.parse(localStorage.getItem("dailyAPOD"));

//   //     if (saved && saved.today === today) {
//   //       setHeaderData(saved.data);
//   //       console.log("Loaded APOD from cache:", saved.data);
//   //       return;
//   //     }

//   //     // ✅ Losuj nowy APOD tylko raz dziennie
//   //     const randomDate = getRandomDate();
//   //     const res = await axios.get(
//   //       `${apodUrl}?api_key=${apiKey}&date=${randomDate}`
//   //     );

//   //     setHeaderData(res.data);
//   //     console.log("APOD RESPONSE:", res.data);

//   //     localStorage.setItem(
//   //       "dailyAPOD",
//   //       JSON.stringify({ today, data: res.data })
//   //     );
//   //     console.log("Fetched new random APOD:", randomDate, res.data);

//   //     setError(null);
//   //   } catch (err) {
//   //     console.error("Failed to fetch APOD:", err);
//   //     setError("Nie udało się pobrać APOD");
//   //   }
//   // };
//   const fetchHeaderImage = async () => {
//     try {
//       // ✅ Cache dzienny w localStorage
//       const today = new Date().toISOString().slice(0, 10);
//       const saved = JSON.parse(localStorage.getItem("dailyAPOD"));

//       if (saved && saved.today === today) {
//         setHeaderData(saved.data);
//         console.log("Loaded cached image:", saved.data);
//         return;
//       }

//       // 🔹 Fetch z darmowego API psa
//       const res = await axios.get("https://dog.ceo/api/breeds/image/random");

//       // Tworzymy obiekt podobny do NASA APOD, żeby MainAPOD działał
//       const dogData = {
//         date: today,
//         title: "Random Dog",
//         explanation: "This is a random dog image fetched from Dog API.",
//         media_type: "image",
//         url: res.data.message,
//         copyright: "Dog API",
//       };

//       setHeaderData(dogData);
//       localStorage.setItem(
//         "dailyAPOD",
//         JSON.stringify({ today, data: dogData })
//       );
//       console.log("Fetched new random dog:", dogData);

//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch image:", err);
//       setError("Nie udało się pobrać obrazka");
//     }
//   };

//   useEffect(() => {
//     fetchHeaderImage();
//   }, []); // tylko przy pierwszym uruchomieniu

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center xl:pt-30 gap-2 font-mono">
//       <Disclaimer />
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <MainAPOD data={headerData} />
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   const [headerData, setHeaderData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchHeaderImage = async () => {
//     try {
//       const today = new Date().toISOString().slice(0, 10);
//       const saved = JSON.parse(localStorage.getItem("dailyJWST"));

//       if (saved && saved.today === today) {
//         setHeaderData(saved.data);
//         console.log("Loaded cached JWST image:", saved.data);
//         return;
//       }

//       // 🔹 Pobieranie danych z JWST API
//       const apiKey = import.meta.env.VITE_JWST_KEY;
//       const res = await axios.get("https://api.jwstapi.com/program/list", {
//         headers: { "X-API-KEY": apiKey },
//       });

//       const programs = res.data.body;
//       if (!programs?.length) throw new Error("No programs returned");

//       // Wybieramy losowy program, aby codziennie był inny obraz
//       const randomProgram =
//         programs[Math.floor(Math.random() * programs.length)];

//       const res2 = await axios.get(
//         `https://api.jwstapi.com/program/id/${randomProgram.program}`,
//         {
//           headers: { "X-API-KEY": apiKey },
//           params: { limit: 1 },
//         }
//       );

//       const items = res2.data.body;
//       if (!items?.length) throw new Error("No items in program details");

//       const item = items[0];
//       let imageUrl = item.location || item.thumbnail;
//       if (imageUrl && imageUrl.startsWith("/")) {
//         imageUrl = `https://api.jwstapi.com${imageUrl}`;
//       }
//       if (!imageUrl) throw new Error("No image URL found");

//       const jwstData = {
//         date: today,
//         title: `JWST Program ${randomProgram.program}`,
//         explanation: item.observation_title || "Image from JWST program",
//         media_type: "image",
//         url: imageUrl,
//         copyright: "JWST API",
//       };

//       setHeaderData(jwstData);
//       localStorage.setItem(
//         "dailyJWST",
//         JSON.stringify({ today, data: jwstData })
//       );
//       console.log("Fetched new JWST image:", jwstData);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch JWST image:", err);
//       setError("Nie udało się pobrać obrazu JWST");
//     }
//   };

//   useEffect(() => {
//     fetchHeaderImage();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center xl:pt-30 gap-2 font-mono">
//       <Disclaimer />
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <MainAPOD data={headerData} />
//       <Footer />
//     </div>
//   );
// }
// function App() {
//   const [headerData, setHeaderData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchHeaderImage = async () => {
//     try {
//       const today = new Date().toISOString().slice(0, 10);
//       const saved = JSON.parse(localStorage.getItem("dailyBootprint"));

//       if (saved && saved.today === today) {
//         setHeaderData(saved.data);
//         console.log("Loaded cached Bootprint image:", saved.data);
//         return;
//       }

//       // 🔹 Fetch losowego zdjęcia kosmosu z Bootprint API
//       const res = await axios.get("https://api.bootprint.space/img/mars");

//       // API zwraca tablicę, weź pierwszy element
//       const item = res.data[0];

//       // Konstrukcja obiektu zgodnego z MainAPOD
//       const bootprintData = {
//         date: today,
//         title: item.title || "Random Space Image",
//         explanation: item.description || "Image from Bootprint Space API.",
//         media_type: "image",
//         url: item.image || item.hdImage || "",
//         copyright: item.credit || "Bootprint Space API",
//       };

//       if (!bootprintData.url)
//         throw new Error("No image URL returned from Bootprint API");

//       setHeaderData(bootprintData);
//       localStorage.setItem(
//         "dailyBootprint",
//         JSON.stringify({ today, data: bootprintData })
//       );
//       console.log("Fetched new Bootprint image:", bootprintData);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch Bootprint image:", err);
//       setError("Nie udało się pobrać obrazu z Bootprint API");
//     }
//   };

//   useEffect(() => {
//     fetchHeaderImage();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center xl:pt-30 gap-2 font-mono">
//       <Disclaimer />
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <MainAPOD data={headerData} />
//       <Footer />
//     </div>
//   );
// }
// export default App;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Disclaimer from "./components/Disclaimer";
// import MainAPOD from "./components/MainAPOD";
// import Footer from "./components/Footer";

// function App() {
//   const [headerData, setHeaderData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchHeaderImage = async () => {
//     try {
//       const today = new Date().toISOString().slice(0, 10);
//       const saved = JSON.parse(localStorage.getItem("dailyAPOD"));

//       if (saved && saved.today === today) {
//         setHeaderData(saved.data);
//         console.log("Loaded cached APOD:", saved.data);
//         return;
//       }

//       const apiKey = import.meta.env.VITE_NASA_KEY;
//       if (!apiKey) throw new Error("Missing NASA API key");

//       const res = await axios.get(
//         "https://api.nasa.gov/planetary/apod",
//         {
//           params: {
//             api_key: apiKey,
//           },
//         }
//       );

//       // res.data już ma strukturę zgodną z APOD:
//       // { date, title, explanation, media_type, url, hdurl, copyright }
//       setHeaderData(res.data);

//       localStorage.setItem(
//         "dailyAPOD",
//         JSON.stringify({ today, data: res.data })
//       );

//       console.log("Fetched new APOD:", res.data);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch APOD:", err);
//       setError("Nie udało się pobrać APOD z NASA API");
//     }
//   };

//   useEffect(() => {
//     fetchHeaderImage();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center xl:pt-30 gap-2 font-mono">
//       <Disclaimer />
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <MainAPOD data={headerData} />
//       <Footer />
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import axios from "axios";
import Disclaimer from "./components/Disclaimer";
import MainAPOD from "./components/MainAPOD";
import Footer from "./components/Footer";

function App() {
  const [headerData, setHeaderData] = useState(null);
  const [error, setError] = useState(null);
  const apodUrl = "https://api.nasa.gov/planetary/apod";
  const apiKey = import.meta.env.VITE_NASA_KEY || "DEMO_KEY";

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // Pobierz wczorajszą datę (unika błędów 500, gdy dzisiejsze zdjęcie nie jest jeszcze gotowe)
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - 1);
        const yesterday = dateObj.toISOString().slice(0, 10);

        console.log(`Pobieranie APOD dla daty: ${yesterday} z kluczem: ${apiKey ? "Ustawiony" : "Brak"}`);

        const res = await axios.get(`${apodUrl}?api_key=${apiKey}&date=${yesterday}`);
        console.log("SUKCES - Odpowiedź z API NASA:", res.data);
        setHeaderData(res.data);
        setError(null);
      } catch (err) {
        console.error("BŁĄD pobierania APOD:", err);
        setError("Nie udało się pobrać APOD. Sprawdź klucz VITE_NASA_KEY w Netlify.");
      }
    };

    fetchAPOD();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center xl:pt-30 gap-2 font-mono">
      <Disclaimer />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <MainAPOD data={headerData} />
      <Footer />
    </div>
  );
}

export default App;