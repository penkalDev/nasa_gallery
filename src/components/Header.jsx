/* eslint-disable react/prop-types */

// Header.js



function Header({ imageUrl }) {
  return (
    <header className="header">
      <h1>Image of the day</h1>
      {imageUrl && (
        
        <img
          src={imageUrl}
          alt="NASA Image of the Day"
          className="nasa-logo"
        />
      )}
      <h1>NASA Image Gallery</h1>
    </header>
  );
}

export default Header;
