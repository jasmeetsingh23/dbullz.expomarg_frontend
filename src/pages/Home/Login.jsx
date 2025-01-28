// import React, { useState } from "react";
// import {
//   FaEnvelope,
//   FaLock,
//   FaArrowRight,
//   FaTimes,
//   FaShieldAlt,
//   FaKey,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import b from "../../assets/j3.jpg";
// import logo from "../../assets/z.png";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [otpModalVisible, setOtpModalVisible] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [otp, setOtp] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isResending, setIsResending] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMessage(null);

//     try {
//       const response = await axios.post("https://expomarg.com/api/login", {
//         email,
//         password,
//       });

//       if (response.data.message && response.data.userId) {
//         setUserId(response.data.userId);
//         setOtpModalVisible(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.error || "Something went wrong!");
//       } else {
//         setErrorMessage("Network error. Please try again later.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMessage(null);

//     try {
//       const response = await axios.post("https://expomarg.com/api/verify-otp", {
//         userId,
//         otp,
//       });

//       if (response.data.token) {
//         localStorage.setItem("authToken", response.data.token);
//         navigate("/home");
//       } else {
//         setErrorMessage(
//           response.data.error || "Something went wrong. Please try again."
//         );
//       }
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(
//           error.response.data.error || "Something went wrong. Please try again."
//         );
//       } else {
//         setErrorMessage("Network error. Please try again later.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setIsResending(true);
//     setErrorMessage(null);

//     try {
//       const response = await axios.post("https://expomarg.com/api/resend-otp", {
//         userId,
//       });

//       if (response.data.message) {
//         setErrorMessage("OTP has been resent to your email.");
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.error || "Failed to resend OTP. Please try again."
//       );
//     } finally {
//       setIsResending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Image Side */}
//       <div className="hidden lg:block lg:w-1/2 relative">
//         <img
//           src={b}
//           alt="Office"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//       </div>

//       {/* Right Content Side */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-gradient-to-br from-red-50 via-yellow-50 to-white">
//         <div className="max-w-md w-full mx-auto">
//           {/* Logo Section */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
//               <img src={logo} alt="Logo" className="h-40 w-auto" />
//             </div>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-heading text-gray-700 mb-2">
//                 Email address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope
//                     className="w-5 h-5"
//                     style={{ color: "#2573b1" }}
//                   />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border font-heading border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1] bg-white/50 transition-all duration-200"
//                   placeholder="Enter your email"
//                   required
//                   disabled={isSubmitting}
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block font-heading text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="w-5 h-5" style={{ color: "#2573b1" }} />
//                 </div>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full font-heading pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1] bg-white/50 transition-all duration-200"
//                   placeholder="Enter your password"
//                   required
//                   disabled={isSubmitting}
//                 />
//               </div>
//             </div>

//             {/* Error Message */}
//             {errorMessage && !otpModalVisible && (
//               <p className="text-red-600 text-sm text-center">{errorMessage}</p>
//             )}

//             {/* Sign In Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full font-heading flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#2573b1] hover:bg-[#91c848] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91c848] transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   <span>Signing in...</span>
//                 </div>
//               ) : (
//                 <>
//                   Sign in
//                   <FaArrowRight className="ml-2 w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* OTP Modal */}
//       {otpModalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative transform transition-all">
//             {/* Modal Header */}
//             <div className="border-b p-4 flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <FaShieldAlt className="text-blue-500 w-6 h-6" />
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Security Verification
//                 </h2>
//               </div>
//               <button
//                 onClick={() => setOtpModalVisible(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               <div className="text-center mb-6">
//                 <p className="text-gray-600">
//                   Please enter the verification code sent to your email
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}
//                 </p>
//               </div>

//               <form onSubmit={handleOtpSubmit} className="space-y-6">
//                 <div>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaKey className="w-5 h-5 text-blue-500" />
//                     </div>
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) =>
//                         setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                       }
//                       className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 text-center text-lg tracking-widest"
//                       placeholder="Enter 6-digit OTP"
//                       maxLength="6"
//                       required
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                   {errorMessage && (
//                     <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || otp.length !== 6}
//                     className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white ${
//                       isSubmitting || otp.length !== 6
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-blue-500 hover:bg-blue-600"
//                     } transition-all duration-200 font-medium`}
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center space-x-2">
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         <span>Verifying...</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center space-x-2">
//                         <span>Verify OTP</span>
//                         <FaArrowRight className="w-4 h-4" />
//                       </div>
//                     )}
//                   </button>

//                   <div className="text-center">
//                     <button
//                       type="button"
//                       onClick={handleResendOtp}
//                       disabled={isResending}
//                       className="text-blue-500 hover:text-blue-600 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
//                     >
//                       {isResending
//                         ? "Resending..."
//                         : "Didn't receive code? Resend"}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaTimes,
  FaShieldAlt,
  FaKey,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import b from "../../assets/j3.jpg";
import logo from "../../assets/z.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  // Check for existing auth token on component mount
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Check if credentials match the specified email and password
    if (email === "teambullz369@gmail.com" && password === "Dbullz@2212") {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        // If token exists, navigate directly to home
        navigate("/home");
        return;
      }
    }

    try {
      const response = await axios.post("https://expomarg.com/api/login", {
        email,
        password,
      });

      if (response.data.message && response.data.userId) {
        setUserId(response.data.userId);
        setOtpModalVisible(true);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || "Something went wrong!");
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await axios.post("https://expomarg.com/api/verify-otp", {
        userId,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/home");
      } else {
        setErrorMessage(
          response.data.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.error || "Something went wrong. Please try again."
        );
      } else {
        setErrorMessage("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setErrorMessage(null);

    try {
      const response = await axios.post("https://expomarg.com/api/resend-otp", {
        userId,
      });

      if (response.data.message) {
        setErrorMessage("OTP has been resent to your email.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={b}
          alt="Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-gradient-to-br from-red-50 via-yellow-50 to-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              <img src={logo} alt="Logo" className="h-40 w-auto" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-heading text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope
                    className="w-5 h-5"
                    style={{ color: "#2573b1" }}
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border font-heading border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1] bg-white/50 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
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
                  className="block w-full font-heading pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1] bg-white/50 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && !otpModalVisible && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-heading flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#2573b1] hover:bg-[#91c848] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91c848] transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  Sign in
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {otpModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative transform transition-all">
            {/* Modal Header */}
            <div className="border-b p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="text-blue-500 w-6 h-6" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Security Verification
                </h2>
              </div>
              <button
                onClick={() => setOtpModalVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Please enter the verification code sent to your email
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="w-5 h-5 text-blue-500" />
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 text-center text-lg tracking-widest"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || otp.length !== 6}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white ${
                      isSubmitting || otp.length !== 6
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    } transition-all duration-200 font-medium`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Verify OTP</span>
                        <FaArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {isResending
                        ? "Resending..."
                        : "Didn't receive code? Resend"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
