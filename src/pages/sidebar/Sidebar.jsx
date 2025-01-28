// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaImage,
//   FaUpload,
//   FaClipboardList,
//   FaFolder,
//   FaCalendarAlt,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
//   FaTasks,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const [isExpoOpen, setIsExpoOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleExpoDropdown = () => {
//     setIsExpoOpen(!isExpoOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={toggleMobileMenu}
//         className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//       >
//         {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//       </button>

//       {/* Overlay for mobile */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={toggleMobileMenu}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed lg:static
//         ${
//           isMobileMenuOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         }
//         bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900
//         w-64 min-h-screen p-4 text-white shadow-lg
//         transition-transform duration-300 ease-in-out
//         z-40
//       `}
//       >
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src="https://www.w3schools.com/w3images/avatar2.png" // Replace with your admin avatar image
//             alt="Admin Avatar"
//             className="w-16 h-16 rounded-full border-4 border-pink-400 mb-4"
//           />
//           <h2 className="font-heading text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
//             Admin Panel
//           </h2>
//         </div>

//         <div className="flex flex-col space-y-4">
//           <Link
//             to="/dashboard"
//             className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <FaTachometerAlt size={18} />
//             <span className="text-sm font-body">Dashboard</span>
//           </Link>

//           <Link
//             to="/admin"
//             className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <FaImage size={18} />
//             <span className="text-sm font-body">Manage Designs</span>
//           </Link>

//           <Link
//             to="/s-event"
//             className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <FaTasks size={18} />
//             <span className="text-sm font-body">Manage Events</span>
//           </Link>

//           <Link
//             to="/upload"
//             className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <FaUpload size={18} />
//             <span className="text-sm font-body">Upload Design</span>
//           </Link>

//           <Link
//             to="/inquiries"
//             className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <FaClipboardList size={18} />
//             <span className="text-sm font-body">Inquiry Details</span>
//           </Link>

//           <Link
//             to="/events"
//             className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             <FaCalendarAlt size={18} />
//             <span className="text-sm font-body">Upcoming Events</span>
//           </Link>

//           <div className="relative">
//             <button
//               onClick={toggleExpoDropdown}
//               className="flex items-center space-x-2 hover:bg-indigo-600 p-2 rounded-xl transition-all duration-300 w-full"
//             >
//               <FaFolder size={18} />
//               <span className="text-sm font-body">Expo Directory</span>
//             </button>
//             {isExpoOpen && (
//               <div className="absolute left-0 w-full mt-2 bg-indigo-700 rounded-lg shadow-lg">
//                 <Link
//                   to="/add-directory"
//                   className="block text-white hover:bg-indigo-600 p-2 rounded-lg transition-all duration-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Add Directory
//                 </Link>
//                 <Link
//                   to="/view-directory"
//                   className="block text-white hover:bg-indigo-600 p-2 rounded-lg transition-all duration-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   View Directory
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//         <div>
//           <button
//             onClick={handleLogout}
//             className="flex items-center mt-24 space-x-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300 w-12 h-12 justify-center"
//           >
//             <FaSignOutAlt size={18} />
//           </button>
//         </div>

//         <div className="absolute bottom-6 left-6 text-xs">
//           <p className="text-gray-300 font-heading">© 2024 Design Bullz</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Brush,
  ChevronDown,
  Folder,
  Calendar,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"; // Keep your existing imports from lucide-react
import { FiLogOut } from "react-icons/fi"; // Importing the logout icon from react-icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesignDropdownOpen, setIsDesignDropdownOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isExpoDirectoryDropdownOpen, setIsExpoDirectoryDropdownOpen] =
    useState(false);
  const [isInquiriesDropdownOpen, setIsInquiriesDropdownOpen] = useState(false); // State for Inquiries dropdown
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Design",
      icon: <Brush size={20} />,
      path: "#", // Placeholder, no direct link
      hasDropdown: true, // Design dropdown
    },
    {
      title: "Event",
      icon: <Calendar size={20} />,
      path: "#", // Placeholder
      hasDropdown: true, // Event dropdown
    },
    {
      title: "Expo Directory",
      icon: <Folder size={20} />,
      path: "#", // Placeholder
      hasDropdown: true, // Expo Directory dropdown
    },
    {
      title: "Inquiries",
      icon: <MessageCircle size={20} />, // Use your preferred icon
      path: "#", // Placeholder
      hasDropdown: true, // Inquiries dropdown
    },
  ];

  const handleLogout = () => {
    // Remove the admin and token from localStorage
    localStorage.removeItem("admin");
    localStorage.removeItem("authToken");

    // Navigate to adminLogin page
    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out lg:translate-x-0 lg:w-64 ${
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
        } bg-white shadow-xl`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png" // Replace with your admin avatar image
            alt="Admin Avatar"
            className="w-12 h-12 mt-5 ml-6 rounded-full border-4 border-[#2573b1] mb-4"
          />
          <h2 className="font-heading mr-10  text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#2573b1] to-[#91c848]">
            Admin Panel
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasDropdown ? (
                  // Design, Event, Expo Directory, or Inquiries Dropdown
                  <div>
                    <button
                      className={`flex items-center gap-4 px-4 py-3 rounded-lg w-full text-left font-heading  transition-colors duration-200 ${
                        location.pathname.includes(item.title.toLowerCase())
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={
                        () =>
                          item.title === "Design"
                            ? setIsDesignDropdownOpen(!isDesignDropdownOpen)
                            : item.title === "Event"
                            ? setIsEventDropdownOpen(!isEventDropdownOpen)
                            : item.title === "Expo Directory"
                            ? setIsExpoDirectoryDropdownOpen(
                                !isExpoDirectoryDropdownOpen
                              )
                            : setIsInquiriesDropdownOpen(
                                !isInquiriesDropdownOpen
                              ) // Handle Inquiries dropdown
                      }
                    >
                      <span
                        className={
                          location.pathname.includes(item.title.toLowerCase())
                            ? "text-blue-600"
                            : "text-gray-500"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="font-heading text-sm sm:text-base">
                        {item.title}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transition-transform ${
                          (
                            item.title === "Design"
                              ? isDesignDropdownOpen
                              : item.title === "Event"
                              ? isEventDropdownOpen
                              : item.title === "Expo Directory"
                              ? isExpoDirectoryDropdownOpen
                              : isInquiriesDropdownOpen
                          )
                            ? // Check if Inquiries dropdown is open
                              "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {(item.title === "Design"
                      ? isDesignDropdownOpen
                      : item.title === "Event"
                      ? isEventDropdownOpen
                      : item.title === "Expo Directory"
                      ? isExpoDirectoryDropdownOpen
                      : isInquiriesDropdownOpen) && (
                      <ul className="space-y-2 pl-8 mt-2">
                        {item.title === "Design" ? (
                          <>
                            <li>
                              <Link
                                to="/admin"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading  text-sm"
                              >
                                Design List
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/upload"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Upload Design
                              </Link>
                            </li>
                          </>
                        ) : item.title === "Event" ? (
                          <>
                            <li>
                              <Link
                                to="/s-event"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Event List
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/events"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Add Event
                              </Link>
                            </li>
                          </>
                        ) : item.title === "Expo Directory" ? (
                          <>
                            <li>
                              <Link
                                to="/view-directory"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Directory List
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/add-directory"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Add Directory
                              </Link>
                            </li>
                          </>
                        ) : item.title === "Inquiries" ? (
                          <>
                            <li>
                              <Link
                                to="/inquiries"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Inquiries List
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/form"
                                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
                              >
                                Add Inquiries
                              </Link>
                            </li>
                          </>
                        ) : null}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={
                        location.pathname === item.path
                          ? "text-blue-600"
                          : "text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="font-heading text-sm sm:text-base">
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-4 py-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-heading text-sm"
          >
            <span className="text-gray-500">
              <FiLogOut size={20} />
            </span>
            <span className="font-heading">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
