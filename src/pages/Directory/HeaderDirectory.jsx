// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import { FaDownload, FaEye } from "react-icons/fa";
// import Header from "../../components/Header";

// const HeaderDirectory = () => {
//   const [directories, setDirectories] = useState([]);
//   const [filteredDirectories, setFilteredDirectories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(25);
//   const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

//   useEffect(() => {
//     const fetchDirectories = async () => {
//       try {
//         const response = await axios.get(
//           "https://expomarg.com/api/get-directories"
//         );
//         setDirectories(response.data.data);
//         setFilteredDirectories(response.data.data);
//       } catch (err) {
//         console.error("Error fetching directories:", err);
//         setError("Failed to fetch directories. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDirectories();
//   }, []);

//   useEffect(() => {
//     const indexOfLast = currentPage * itemsPerPage;
//     const indexOfFirst = indexOfLast - itemsPerPage;
//     const currentDirectories = filteredDirectories.slice(
//       indexOfFirst,
//       indexOfLast
//     );
//     setDirectories(currentDirectories);
//   }, [currentPage, filteredDirectories]);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredDirectories(directories);
//     } else {
//       const filtered = directories.filter(
//         (directory) =>
//           directory.exhibition_name.toLowerCase().includes(term) ||
//           directory.year.toString().includes(term) ||
//           directory.venue.toLowerCase().includes(term)
//       );
//       setFilteredDirectories(filtered);
//       setCurrentPage(1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(filteredDirectories.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleSort = () => {
//     const sortedDirectories = [...directories].sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a.year - b.year; // Ascending order
//       } else {
//         return b.year - a.year; // Descending order
//       }
//     });

//     setDirectories(sortedDirectories);
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex min-h-screen bg-gray-50">
//         {/* Main Content */}
//         <main className="flex-1 p-10">
//           <div className="w-full max-w-full">
//             <h1 className="text-3xl font-heading font-extrabold text-gray-800 mb-6">
//               Exhibition Directories
//             </h1>

//             {/* Search Input */}
//             <div className="mb-6">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 placeholder="Search by Exhibition Name, Year, or Venue"
//                 className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             {loading ? (
//               <p className="text-center text-lg text-gray-500">Loading...</p>
//             ) : error ? (
//               <p className="text-center text-lg text-red-500">{error}</p>
//             ) : filteredDirectories.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg table-auto">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-left">
//                       <th className="px-6 py-4 font-heading text-gray-800 w-[10%]">
//                         Serial No.
//                       </th>
//                       <th className="px-6 py-4 font-heading text-gray-800 w-[25%]">
//                         Exhibition Name
//                       </th>
//                       <th
//                         className="px-6 py-4 font-heading text-gray-800 w-[20%] cursor-pointer"
//                         onClick={handleSort}
//                       >
//                         Year
//                         {sortOrder === "asc" ? (
//                           <span className="ml-2">🔼</span>
//                         ) : (
//                           <span className="ml-2">🔽</span>
//                         )}
//                       </th>

//                       <th className="px-6 py-4 font-heading text-gray-800 w-[25%]">
//                         Venue
//                       </th>
//                       <th className="px-6 py-4 font-heading text-gray-800 w-[20%]">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {directories.map((directory, index) => (
//                       <tr
//                         key={directory.id}
//                         className="hover:bg-gray-200 transition duration-200"
//                       >
//                         <td className="px-6 py-4">{index + 1}</td>
//                         {/* Serial number */}
//                         <td className="px-6 py-4">
//                           {directory.exhibition_name}
//                         </td>
//                         <td className="px-6 py-4">{directory.year}</td>
//                         <td className="px-6 py-4">{directory.venue}</td>
//                         <td className="px-6 py-4 flex space-x-4 flex-col sm:flex-row">
//                           {/* View Button */}
//                           {directory.document_url && (
//                             <a
//                               href={directory.document_url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="inline-flex items-center px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-300 mb-2 sm:mb-0"
//                             >
//                               <FaEye className="mr-2" /> View
//                             </a>
//                           )}
//                           {/* Download Button */}
//                           {directory.documentDownloadLink && (
//                             <a
//                               href={directory.documentDownloadLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="inline-flex items-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-100 transition duration-300"
//                             >
//                               <FaDownload className="mr-2" /> Download
//                             </a>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-center font-heading text-lg text-gray-500">
//                 No directories found.
//               </p>
//             )}

//             {/* Pagination */}
//             <div className="flex justify-between items-center mt-6">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="px-6 py-3 text-white bg-gradient-to-r from-[#91c848] to-[#4caf50] rounded-lg transition-all duration-300"
//               >
//                 Previous
//               </button>
//               <span className="text-gray-700">
//                 Page {currentPage} of{" "}
//                 {Math.ceil(filteredDirectories.length / itemsPerPage)}
//               </span>
//               <button
//                 onClick={handleNextPage}
//                 disabled={
//                   currentPage ===
//                   Math.ceil(filteredDirectories.length / itemsPerPage)
//                 }
//                 className="px-6 py-3 text-white bg-gradient-to-r from-[#91c848] to-[#4caf50] rounded-lg  transition-all duration-300"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default HeaderDirectory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { FiDownload, FiEye } from "react-icons/fi";
import { IoIosPaper } from "react-icons/io";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import { FaIdCardAlt } from "react-icons/fa";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5"; // Import a better upload icon
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DirectoryPage = () => {
  const [directories, setDirectories] = useState([]);
  const [filteredDirectories, setFilteredDirectories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("none"); // none, ascending, descending

  useEffect(() => {
    fetchDirectories();
  }, []);

  useEffect(() => {
    filterDirectories();
  }, [directories, searchTerm]);

  const fetchDirectories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://expomarg.com/api/get-directories"
      );
      setDirectories(response.data.data);
      setError("");
    } catch (err) {
      console.error("Error fetching directories:", err);
      setError("Failed to fetch directories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterDirectories = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = directories.filter(
      (directory) =>
        directory.exhibition_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        directory.year.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
        directory.venue.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredDirectories(filteredData);
  };

  const sortDirectoriesByYear = () => {
    let newSortOrder;
    let sortedData;

    if (sortOrder === "none" || sortOrder === "descending") {
      newSortOrder = "ascending";
      sortedData = [...filteredDirectories].sort(
        (a, b) => parseInt(a.year) - parseInt(b.year)
      );
    } else {
      newSortOrder = "descending";
      sortedData = [...filteredDirectories].sort(
        (a, b) => parseInt(b.year) - parseInt(a.year)
      );
    }

    setSortOrder(newSortOrder);
    setFilteredDirectories(sortedData);
  };

  const DirectoryCard = ({ directory }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-heading text-gray-800">
        {directory.exhibition_name}
      </h3>
      <div className="text-sm text-gray-600 mt-2">
        <p className="font-body">
          <strong>Year:</strong> {directory.year}
        </p>
        <p className="font-body">
          <strong>Venue:</strong> {directory.venue}
        </p>
        {directory.document_url && (
          <p className="flex items-center gap-4 font-body">
            <strong>Document:</strong>
            <a
              href={directory.document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FiEye className="inline-block" size={18} />
            </a>
            <a
              href={directory.documentDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600"
            >
              <FiDownload className="inline-block" size={18} />
            </a>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow p-4 md:p-8">
        <div className="relative mb-6">
          <h1 className="text-2xl md:text-3xl text-left md:text-center font-heading">
            <IoIosPaper className="inline-block mr-2" />{" "}
            {/* Add icon before text */}
            Exhibition Directory
          </h1>

          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <a href="/h-add">
              <button className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-base px-2 md:px-4 py-1 md:py-2 rounded-md flex items-center whitespace-nowrap">
                <IoCloudUploadOutline className="mr-1 md:mr-2 text-sm md:text-base" />{" "}
                Upload Directory
              </button>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search directories..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
          />
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading directories...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto mt-8">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#2573b1]">
                <th className="py-3 px-4 text-white font-body text-sm">
                  <FaIdCardAlt className="w-6 h-6 inline-block mr-2" />
                  Sign No
                </th>
                <th className="py-3 px-4 text-white font-body text-sm">
                  <FaBuilding className="w-6 h-6 inline-block mr-2" />
                  Exhibition Name
                </th>
                <th
                  className="py-3 px-4 text-white font-body text-sm cursor-pointer flex items-center gap-2 border-none"
                  onClick={sortDirectoriesByYear}
                >
                  <FaCalendarAlt size={18} />
                  <span>Year</span>
                  {sortOrder === "none" && <BiSort size={18} />}
                  {sortOrder === "ascending" && <BiSortUp size={18} />}
                  {sortOrder === "descending" && <BiSortDown size={18} />}
                </th>

                <th className="py-3 px-4 text-white font-body text-sm">
                  <FaMapMarkerAlt className="w-6 h-6 inline-block mr-2" />
                  Venue
                </th>

                <th className="py-3 px-4 text-white font-body text-sm">
                  <FaFileAlt className="w-6 h-6 inline-block mr-2" />
                  Document
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDirectories.map((directory, index) => (
                <tr key={directory.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">
                    {directory.exhibition_name}
                  </td>
                  <td className="py-3 px-4 border-b">{directory.year}</td>
                  <td className="py-3 px-4 border-b">{directory.venue}</td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center gap-4">
                      {directory.document_url && (
                        <a
                          href={directory.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                          title="View Document"
                        >
                          <FiEye size={18} />
                        </a>
                      )}
                      {directory.documentDownloadLink && (
                        <a
                          href={directory.documentDownloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600"
                          title="Download Document"
                        >
                          <FiDownload size={18} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredDirectories.map((directory) => (
            <DirectoryCard key={directory.id} directory={directory} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DirectoryPage;
