/* eslint-disable react/prop-types */

import "../App.css"; // Import the CSS file

function ImageGallery({ images }) {
  return (
    <div className="image-container">
      {images.map((item) => (
        <div key={item.links[0].href} className="image-card">
          <img
            src={item.links[0].href}
            alt={item.data[0].title || "No description available"}
          />
          <p className="image-description">
            {item.data[0].title || "No description available"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
