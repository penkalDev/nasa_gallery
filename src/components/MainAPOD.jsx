/* eslint-disable react/prop-types */

// Header.js

function MainAPOD({ data }) {
  if (!data)
    return <div className="text-center text-white mt-20">Loading...</div>;
  const formattedDate = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date(data.date))
    .replace(/\./g, "-"); // tylko zamiana kropek na myślniki

  return (
    <div className="w-5/6 bg-gray-600 p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row gap-8">
      {/* Lewy div: obraz/video */}
      <div className="sm:w-2/3 flex justify-center">
        {data.media_type === "image" ? (
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-auto rounded-xl border-2 border-gray-300 shadow-md object-cover"
          />
        ) : (
          <iframe
            src={data.url}
            title={data.title}
            className="w-full h-64 sm:h-auto rounded-xl"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Prawy div: tekst */}
      <div className="sm:w-1/2 flex flex-col justify-start">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
          {data.title}
        </h2>
        <p className="text-md text-gray-200 mb-4">
          Originally published:{formattedDate}
        </p>
        <p className="text-gray-200 text-sm sm:text-base p-3">
          {data.explanation}
        </p>
        <p className="text-right p-4">Author: {data?.copyright || "Unknown"}</p>
      </div>
    </div>
  );
}

export default MainAPOD;
