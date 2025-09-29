/* eslint-disable react/prop-types */

// Header.js



function Header({ imageUrl, imageTitle }) {
  return (
    <header className="header">
      <h1>Image of the day</h1>
      <div className="imageTop">
        {imageUrl && (
        
          <img className="picOfDay"
            src={imageUrl}
            alt="NASA Image of the Day"
            
          />
        
        )}
        <h2>{imageTitle}</h2>
      </div>
      <h1>NASA Image Gallery</h1>
    </header>
  );
}

export default Header;
