import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaCalculator,
  FaEnvelope,
  FaFolderOpen, // New icon for Directory
} from "react-icons/fa";
import backgroundImage from "../../assets/a1.jpg"; // Adjust path as needed

const HomePage = () => {
  // State to track the style of individual buttons
  const [hoveredButton, setHoveredButton] = useState(null);

  // Define button base style (non-hovered)
  const buttonBaseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 30px",
    background: "linear-gradient(45deg, #91c848, #4caf50)", // Gradient from red-500 to black
    color: "#fff", // White text for contrast
    borderRadius: "8px",
    fontSize: "1.2rem",
    fontWeight: "normal", // Set font weight to normal (not bold)
    cursor: "pointer",
    textDecoration: "none",
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease", // Add transition for background color
    textAlign: "center",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // Soft shadow for elevation
  };

  // Define button hover style
  const buttonHoverStyle = {
    background: "linear-gradient(45deg, #91c848, #4caf50)", // Gradient from yellow-300 to yellow-600
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "#F0F8FF", // Light blue text color for better contrast
        textShadow: "1px 1px 8px rgba(0, 0, 0, 0.8)", // Glow for readability
        padding: "20px",
      }}
    >
      {/* Logo */}
      {/* <img
        src={logo}
        alt="3D Storage Logo"
        style={{ maxWidth: "200px", marginBottom: "20px" }} // Style for the logo
      /> */}

      {/* Page Title */}
      {/* <h1
        className="font-heading font-bold"
        style={{ fontSize: "3.5rem", marginBottom: "20px", fontWeight: "bold" }}
      >
        Welcome to 3D Storage Website
      </h1>
      <p
        className="font-heading"
        style={{ fontSize: "1.5rem", marginBottom: "50px", maxWidth: "600px" }}
      >
        Manage your designs, events, costs, and inquiries all in one place with
        ease.
      </p> */}

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "600px",
        }}
      >
        <Link to="/view">
          <button
            className="font-body "
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "view" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("view")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaFileAlt size={28} style={{ marginRight: "10px" }} />
            3D Design Files
          </button>
        </Link>

        <Link to="/event">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "event" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("event")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaCalendarAlt size={28} style={{ marginRight: "10px" }} />
            Upcoming Events
          </button>
        </Link>

        <Link to="/inquiries2">
          <button
            className="font-heading "
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "inquiries" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("inquiries")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaEnvelope size={28} style={{ marginRight: "10px" }} />
            Business Inquiries
          </button>
        </Link>
        <Link to="/directory">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "directory" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("directory")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaFolderOpen size={28} style={{ marginRight: "10px" }} />
            Directory
          </button>
        </Link>

        <Link to="/welcome">
          <button
            className="font-heading"
            style={{
              ...buttonBaseStyle,
              ...(hoveredButton === "welcome" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("welcome")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <FaCalculator size={28} style={{ marginRight: "10px" }} />
            Cost Calculation
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite]">
//       <h1 className="text-4xl font-bold text-white mb-8">
//         Welcome to Expo Marg
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
//         <Link to="/3d-design-files">
//           <button className="w-full py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
//             3D Design Files
//           </button>
//         </Link>

//         <Link to="/upcoming-events">
//           <button className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
//             Upcoming Events
//           </button>
//         </Link>

//         <Link to="/business-inquiries">
//           <button className="w-full py-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
//             Business Inquiries
//           </button>
//         </Link>

//         <Link to="/directory">
//           <button className="w-full py-4 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300">
//             Directory
//           </button>
//         </Link>

//         <Link to="/cost-calculator">
//           <button className="w-full py-4 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300">
//             Cost Calculator
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
