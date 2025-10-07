const Footer = () => (
  <footer className=" text-gray-300 text-center text-sm py-6 mt-8 border-t border-gray-800">
    <p>
      © {new Date().getFullYear()} — Created by <span className="text-white font-semibold">SNK</span>.
      This is a personal, non-commercial hobby project inspired by NASA’s Astronomy Picture of the Day.
    </p>
    <p className="mt-1">
      All images and data belong to NASA and are used for educational purposes only. Not affiliated with NASA.
    </p>
  </footer>
);

export default Footer;
