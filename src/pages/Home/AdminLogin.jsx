// import React, { useState } from "react";
// import { FaUserAlt, FaLock, FaRegUserCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Check for the specific email and password
//     if (email === "teambullz369@gmail.com" && password === "Dbullz@2212") {
//       // Store email in local storage
//       localStorage.setItem("admin", JSON.stringify({ email, password }));

//       // Navigate to "/dashboard"
//       navigate("/dashboard");
//     } else {
//       setErrorMessage("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <main className="flex justify-center items-center flex-grow p-8 bg-gradient-to-r from-[#91c848] to-[#4caf50]">
//         <div className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-md rounded-xl shadow-xl transform transition-all border border-gray-200">
//           <div className="flex justify-center mb-6">
//             <FaRegUserCircle size={60} className="text-blue-500" />
//           </div>
//           <h2 className="text-2xl font-heading font-bold text-center text-black mb-6">
//             Admin Login
//           </h2>

//           <form onSubmit={handleLogin}>
//             <div className="mb-6">
//               <label className="block text-sm font-heading text-black mb-2">
//                 Email
//               </label>
//               <div className="flex items-center border-b-2 border-black py-2">
//                 <FaUserAlt size={20} className="text-black" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="ml-2 w-full border-none focus:outline-none bg-transparent text-black"
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-heading text-black mb-2">
//                 Password
//               </label>
//               <div className="flex items-center border-b-2 border-black py-2">
//                 <FaLock size={20} className="text-black" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="ml-2 w-full border-none focus:outline-none bg-transparent text-black"
//                 />
//               </div>
//             </div>

//             {errorMessage && (
//               <p className="text-red-600 text-center mb-4">{errorMessage}</p>
//             )}

//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-md w-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminLogin;

import React, { useState } from "react";
import { FaUserShield, FaLock, FaArrowRight } from "react-icons/fa"; // Import icons from react-icons
import adminBackground from "../../assets/j3.jpg"; // Background image for admin
import { useNavigate } from "react-router-dom"; // Navigation hook for redirect

const AdminLoginPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const navigate = useNavigate(); // Navigation hook

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Check for specific email and password
    if (email === "teambullz369@gmail.com" && password === "Dbullz@2212") {
      // Store email in local storage
      localStorage.setItem("admin", JSON.stringify({ email, password }));

      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      // Show error if credentials are incorrect
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={adminBackground}
          alt="Admin Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-5xl text-[#2573b1]">
              <FaUserShield /> {/* Admin logo using an icon */}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-heading text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserShield
                    className="w-5 h-5"
                    style={{ color: "#2573b1" }}
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border font-heading border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block font-heading text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="w-5 h-5" style={{ color: "#2573b1" }} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full font-heading pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-600 text-center mb-4">{errorMessage}</p>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full font-heading flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#2573b1] hover:bg-[#91c848] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91c848] transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign in
              <FaArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>

          {/* Footer Text */}
          <p className="mt-8 font-heading text-center text-sm text-gray-600">
            Admin access only. Contact your administrator for login issues.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
