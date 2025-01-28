import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import logo from "../../assets/z.png";

function WelcomePage() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 p-6">
        {/* Logo Section */}
        <div className="mb-12">
          <img
            src={logo} // Replace with your logo path
            alt="Company Logo"
            className="h-40 w-auto" // Increased logo size
          />
        </div>

        {/* Cost Calculation Line */}
        <div className="text-3xl text-center text-black font-bold mb-10">
          {" "}
          {/* Made the font bolder and increased size */}
          <p>Your Total Event Cost Calculation</p>
          <hr className="border-t-2 border-gray-300 my-6 w-3/4 mx-auto" />{" "}
          {/* Increased margin after the line */}
        </div>

        {/* Start Button to go to Labour Page */}
        <div className="mt-8">
          <Link
            to="/labour" // This will navigate to the Labour page
            className="bg-gradient-to-r from-[#91c848] to-[#4caf50] text-white px-8 py-4 rounded-full  transition-all duration-300"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
