// /* eslint-disable react/prop-types */

// // Header.js

// function MainAPOD({ data }) {
//   if (!data)
//     return <div className="text-center text-white mt-20">Loading...</div>;
//   const formattedDate = new Intl.DateTimeFormat("pl-PL", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   })
//     .format(new Date(data.date))
//     .replace(/\./g, "-"); // tylko zamiana kropek na myślniki

//   return (
//     <div className="w-5/6 bg-gray-600 p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row gap-8">
//       {/* Lewy div: obraz/video */}
//       <div className="sm:w-2/3 flex justify-center">
//         {data.media_type === "image" ? (
//           <img
//             src={data.url}
//             alt={data.title}
//             className="w-full h-auto rounded-xl border-double border-4 border-green-300  shadow-md object-cover"
//           />
//         ) : (
//           <iframe
//             src={data.url}
//             title={data.title}
//             className="w-full h-64 sm:h-auto rounded-xl"
//             allowFullScreen
//           ></iframe>
//         )}
//       </div>

//       {/* Prawy div: tekst */}
//       <div className="sm:w-1/2 flex flex-col justify-start">
//         <h2 className="sm:text-3xl font-semibold text-green-300 mb-2">
//           {data.title}
//         </h2>
//         <p className="text-sm text-gray-200 mb-4">
//           Originally published:{formattedDate}
//         </p>
//         <p className="text-gray-200 text-md p-3">
//           {data.explanation}
//         </p>
//         <p className="text-right p-4">Author: {data?.copyright || "Unknown"}</p>
//       </div>
//     </div>
//   );
// }

// export default MainAPOD;
/* eslint-disable react/prop-types */

// function MainAPOD({ data }) {
//   if (!data) {
//     return (
//       <div className="text-center text-white mt-20 animate-pulse">
//         Ładowanie losowego APOD...
//       </div>
//     );
//   }

//   const formattedDate = new Intl.DateTimeFormat("pl-PL", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   })
//     .format(new Date(data.date))
//     .replace(/\./g, "-"); // zamiana kropek na myślniki

//   return (
//     <div className="w-5/6 bg-gray-700 p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row gap-8">
//       {/* 🔹 Lewa kolumna — obraz lub wideo */}
//       <div className="sm:w-2/3 flex justify-center items-center">
//         {data.media_type === "image" ? (
//           <img
//             src={data.url}
//             alt={data.title}
//             loading="lazy"
//             className="w-full h-[35rem] bulge rounded-xl border-4 border-green-300 border-double shadow-md object-cover"
//           />
//         ) : (
//           <iframe
//             src={data.url}
//             title={data.title}
//             className="w-full h-64 sm:h-[450px] rounded-xl border-4 border-green-300 border-double"
//             allowFullScreen
//           ></iframe>
//         )}
//       </div>

//       {/* 🔹 Prawa kolumna — opis */}
//       <div className="sm:w-1/2 flex flex-col justify-start">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-green-300 mb-2">
//           {data.title}
//         </h2>
//         <p className="text-sm text-gray-300 mb-4">
//           Opublikowano: {formattedDate}
//         </p>
//         <p className="text-gray-100 text-md p-3 bg-gray-800/50 rounded-lg leading-relaxed">
//           {data.explanation}
//         </p>
//         <p className="text-right text-sm text-gray-400 mt-4">
//           Autor: {data?.copyright || "Unknown"}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default MainAPOD;
import CrtFrame from "./CrtFrame";
function MainAPOD({ data }) {
  if (!data) {
    return (
      <div className="text-center text-white mt-20 animate-pulse">
        Ładowanie losowego APOD...
      </div>
    );
  }
  const formattedDate = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date(data.date))
    .replace(/\./g, "-");
  return (
    <div className="w-5/6 bg-gray-700 p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row gap-8">
      {/* 🔹 Lewa kolumna — obraz lub wideo */}
      <div className="sm:w-2/3 flex justify-center items-center">
        {data.media_type === "image" ? (
          <CrtFrame className="w-full h-[35rem]" bulge={3}>
            <img
              src={data.url}
              alt={data.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </CrtFrame>
        ) : (
          <CrtFrame className="w-full h-64 sm:h-[450px]" bulge={3}>
            <iframe
              src={data.url}
              title={data.title}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </CrtFrame>
        )}
      </div>
      {/* 🔹 Prawa kolumna — opis */}
      <div className="sm:w-1/2 flex flex-col justify-start">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-300 mb-2">
          {data.title}
        </h2>
        <p className="text-sm text-gray-300 mb-4">
          Opublikowano: {formattedDate}
        </p>
        <p className="text-gray-100 text-md p-3 bg-gray-800/50 rounded-lg leading-relaxed">
          {data.explanation}
        </p>
        <p className="text-right text-sm text-gray-400 mt-4">
          Autor: {data?.copyright || "Unknown"}
        </p>
      </div>
    </div>
  );
}
export default MainAPOD;
