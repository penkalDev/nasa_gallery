/* eslint-disable react/prop-types */

// Header.js

function Header({ data }) {
  if (!data)
    return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row gap-8">
      
      {/* Lewy div: obraz/video */}
      <div className="sm:w-1/2 flex justify-center">
        {data.media_type === "image" ? (
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-auto rounded-xl shadow-md object-cover"
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
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{data.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{data.date}</p>
        <p className="text-gray-300 text-sm sm:text-base">{data.explanation}</p>
      </div>
    </div>
  );
}

export default Header;
