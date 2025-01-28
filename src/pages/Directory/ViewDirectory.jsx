// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import { FaDownload, FaEye } from "react-icons/fa";

// const ViewDirectory = () => {
//   const [directories, setDirectories] = useState([]);
//   const [filteredDirectories, setFilteredDirectories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(25);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedDirectory, setSelectedDirectory] = useState(null);
//   const [exhibitionName, setExhibitionName] = useState("");
//   const [year, setYear] = useState("");
//   const [venue, setVenue] = useState("");
//   const [document, setDocument] = useState(null);
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

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleUpdateClick = (directory) => {
//     setSelectedDirectory(directory);
//     setExhibitionName(directory.exhibition_name);
//     setYear(directory.year);
//     setVenue(directory.venue);
//     setShowUpdateModal(true);
//   };

//   const handleDeleteClick = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://expomarg.com/api/delete-directory/${id}`
//       );
//       alert(response.data.message);
//       setDirectories(directories.filter((dir) => dir.id !== id));
//     } catch (err) {
//       console.error("Error deleting directory:", err);
//       alert("Failed to delete directory.");
//     }
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("exhibitionName", exhibitionName);
//     formData.append("year", year);
//     formData.append("venue", venue);
//     if (document) formData.append("document", document);

//     try {
//       const response = await axios.put(
//         `https://expomarg.com/api/update-directory/${selectedDirectory.id}`,
//         formData
//       );
//       alert(response.data.message);
//       setShowUpdateModal(false);
//       setDirectories(
//         directories.map((dir) =>
//           dir.id === selectedDirectory.id
//             ? { ...dir, exhibition_name: exhibitionName, year, venue }
//             : dir
//         )
//       );
//     } catch (err) {
//       console.error("Error updating directory:", err);
//       alert("Failed to update directory.");
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

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar Component */}

//       {/* Main Content */}
//       <main className="flex-1 p-10">
//         <div className="w-full max-w-full">
//           <h1 className="text-3xl font-heading font-extrabold text-gray-800 mb-6">
//             Exhibition Directories
//           </h1>

//           {/* Search Input */}
//           <div className="mb-6">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search by Exhibition Name, Year, or Venue"
//               className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {loading ? (
//             <p className="text-center text-lg text-gray-500">Loading...</p>
//           ) : error ? (
//             <p className="text-center text-lg text-red-500">{error}</p>
//           ) : filteredDirectories.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg table-auto">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-left">
//                     <th className="px-6 py-4 font-heading text-gray-800 w-[10%]">
//                       Serial No.
//                     </th>
//                     <th className="px-6 py-4 font-heading text-gray-800 w-[25%]">
//                       Exhibition Name
//                     </th>
//                     <th
//                       className="px-6 py-4 font-heading text-gray-800 w-[20%] cursor-pointer"
//                       onClick={handleSort}
//                     >
//                       Year
//                       {sortOrder === "asc" ? (
//                         <span className="ml-2">🔼</span>
//                       ) : (
//                         <span className="ml-2">🔽</span>
//                       )}
//                     </th>

//                     <th className="px-6 py-4 font-heading text-gray-800 w-[25%]">
//                       Venue
//                     </th>
//                     <th className="px-6 py-4 font-heading text-gray-800 w-[20%]">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {directories.map((directory, index) => (
//                     <tr
//                       key={directory.id}
//                       className="hover:bg-gray-200 transition duration-200"
//                     >
//                       <td className="px-6 py-4">{index + 1}</td>
//                       <td className="px-6 py-4">{directory.exhibition_name}</td>
//                       <td className="px-6 py-4">{directory.year}</td>
//                       <td className="px-6 py-4">{directory.venue}</td>
//                       <td className="px-6 py-4 flex space-x-4 flex-col sm:flex-row">
//                         {/* View Button */}
//                         {directory.document_url && (
//                           <a
//                             href={directory.document_url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-300 mb-2 sm:mb-0"
//                           >
//                             <FaEye className="mr-2" /> View
//                           </a>
//                         )}
//                         {/* Download Button */}
//                         {directory.documentDownloadLink && (
//                           <a
//                             href={directory.documentDownloadLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-100 transition duration-300"
//                           >
//                             <FaDownload className="mr-2" /> Download
//                           </a>
//                         )}
//                         {/* Update Button */}
//                         <button
//                           onClick={() => handleUpdateClick(directory)}
//                           className="inline-flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition duration-300 mb-2 sm:mb-0"
//                         >
//                           Update
//                         </button>
//                         {/* Delete Button */}
//                         <button
//                           onClick={() => handleDeleteClick(directory.id)}
//                           className="inline-flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition duration-300"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-center font-heading text-lg text-gray-500">
//               No directories found.
//             </p>
//           )}

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-6">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               className="px-6 py-3 text-white bg-gradient-to-r from-[#91c848] to-[#4caf50] rounded-lg transition-all duration-300"
//             >
//               Previous
//             </button>
//             <span className="text-gray-700">
//               Page {currentPage} of{" "}
//               {Math.ceil(filteredDirectories.length / itemsPerPage)}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={
//                 currentPage ===
//                 Math.ceil(filteredDirectories.length / itemsPerPage)
//               }
//               className="px-6 py-3 text-white bg-gradient-to-r from-[#91c848] to-[#4caf50] rounded-lg  transition-all duration-300"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Update Modal */}
//       {showUpdateModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h2 className="text-xl font-semibold mb-4">Update Directory</h2>
//             <form onSubmit={handleUpdateSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Exhibition Name</label>
//                 <input
//                   type="text"
//                   value={exhibitionName}
//                   onChange={(e) => setExhibitionName(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Year</label>
//                 <input
//                   type="text"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Venue</label>
//                 <input
//                   type="text"
//                   value={venue}
//                   onChange={(e) => setVenue(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Document</label>
//                 <input
//                   type="file"
//                   onChange={(e) => setDocument(e.target.files[0])}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setShowUpdateModal(false)}
//                   className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-500 text-white rounded-lg"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewDirectory;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "../../pages/Inquiry/style.css";

const DirectoryList = () => {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState(null);
  const [formData, setFormData] = useState({
    exhibitionName: "",
    year: "",
    venue: "",
    document: null,
  });

  useEffect(() => {
    fetchDirectories();
  }, []);

  const fetchDirectories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://expomarg.com/api/get-directories"
      );
      setDirectories(response.data.data || []);
    } catch (err) {
      console.error("Error fetching directories:", err);
      alert("Error fetching directories.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (directory) => {
    setCurrentDirectory(directory);
    setFormData({
      exhibitionName: directory.exhibition_name,
      year: directory.year,
      venue: directory.venue,
      document: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this directory?")) {
      try {
        await axios.delete(`https://expomarg.com/api/delete-directory/${id}`);
        alert("Directory deleted successfully.");
        fetchDirectories(); // Refresh the list after deletion
      } catch (err) {
        console.error("Error deleting directory:", err);
        alert("Failed to delete directory.");
      }
    }
  };

  const handleView = (documentUrl) => {
    window.open(documentUrl, "_blank");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentDirectory(null);
    setFormData({
      exhibitionName: "",
      year: "",
      venue: "",
      document: null,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setFormData((prev) => ({ ...prev, document: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!currentDirectory) return;

    const formDataToSend = new FormData();
    formDataToSend.append("exhibitionName", formData.exhibitionName);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("venue", formData.venue);
    if (formData.document) {
      formDataToSend.append("document", formData.document);
    }

    try {
      await axios.put(
        `https://expomarg.com/api/update-directory/${currentDirectory.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Directory updated successfully.");
      handleModalClose();
      fetchDirectories(); // Refresh the list
    } catch (err) {
      console.error("Error updating directory:", err);
      alert("Failed to update directory.");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white">
      <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
        Directory List
      </h1>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
            <h2 className="text-lg font-heading mb-4 text-center">
              Update Directory
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Exhibition Name
                </label>
                <input
                  type="text"
                  name="exhibitionName"
                  value={formData.exhibitionName}
                  onChange={handleFormChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleFormChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleFormChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Document (optional)
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleFormChange}
                  className="mt-1 w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-300 text-black rounded w-full md:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded w-full md:w-auto"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                S.No
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Exhibition Name
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Year
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Venue
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Document
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {directories.map((directory, index) => (
              <tr key={directory.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-xs text-gray-900">{index + 1}</td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {directory.exhibition_name}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {directory.year}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {directory.venue}
                </td>
                <td className="py-4 px-4 text-left">
                  {directory.document_url ? (
                    <button
                      onClick={() => handleView(directory.document_url)}
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                    >
                      <FaEye className="inline-block" />
                      <span className="text-xs">View</span>
                    </button>
                  ) : (
                    "No Document"
                  )}
                </td>
                <td className="py-4 px-4 text-left">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(directory)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(directory.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        {directories.map((directory, index) => (
          <div
            key={directory.id}
            className="bg-gray-100 mb-4 p-4 rounded-lg shadow"
          >
            <p className="text-sm font-bold">
              <span className="font-medium">Exhibition Name:</span>{" "}
              {directory.exhibition_name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Year:</span> {directory.year}
            </p>
            <p className="text-sm">
              <span className="font-medium">Venue:</span> {directory.venue}
            </p>
            <p className="text-sm">
              <span className="font-medium mr-1">Document:</span>{" "}
              {directory.document_url ? (
                <button
                  onClick={() => handleView(directory.document_url)}
                  className="text-blue-600 hover:text-blue-800 "
                >
                  <FaEye className="inline-block" />
                  <span className="text-xs">View</span>
                </button>
              ) : (
                "No Document"
              )}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => handleEdit(directory)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(directory.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="text-gray-600">Loading...</div>
        </div>
      )}

      {!loading && directories.length === 0 && (
        <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No directories found</p>
        </div>
      )}
    </div>
  );
};

export default DirectoryList;
