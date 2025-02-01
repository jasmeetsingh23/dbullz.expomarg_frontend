// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaEdit, FaTrashAlt, FaDownload } from "react-icons/fa";

// const DesignList = () => {
//   const [designs, setDesigns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentDesign, setCurrentDesign] = useState(null);
//   const [formData, setFormData] = useState({
//     design: "",
//     front_depth: "",
//     industry: "",
//     version: "",
//     file1: null,
//     file2: null,
//   });

//   useEffect(() => {
//     fetchDesigns();
//   }, []);

//   const fetchDesigns = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://expomarg.com/api/uploads");
//       setDesigns(response.data.uploads);
//     } catch (err) {
//       console.error("Error fetching designs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this design?")) {
//       try {
//         await axios.delete(`https://expomarg.com/api/uploads/${id}`);
//         fetchDesigns();
//         alert("Design deleted successfully");
//       } catch (err) {
//         console.error("Error deleting design:", err);
//         alert("Error deleting design");
//       }
//     }
//   };

//   const handleViewFile = (fileUrl) => {
//     window.open(fileUrl, "_blank");
//   };

//   const handleEdit = (design) => {
//     setCurrentDesign(design);
//     setFormData({
//       design: design.design,
//       front_depth: design.front_depth,
//       industry: design.industry,
//       version: design.version,
//       file1: null,
//       file2: null,
//     });
//     setIsModalOpen(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("design", formData.design);
//     form.append("front_depth", formData.front_depth);
//     form.append("industry", formData.industry);
//     form.append("version", formData.version);
//     if (formData.file1) form.append("file1", formData.file1);
//     if (formData.file2) form.append("file2", formData.file2);

//     try {
//       await axios.put(
//         `https://expomarg.com/api/upload/${currentDesign.id}`,
//         form
//       );
//       fetchDesigns();
//       setIsModalOpen(false);
//       alert("Design updated successfully");
//     } catch (err) {
//       console.error("Error updating design:", err);
//       alert("Error updating design");
//     }
//   };

//   // Card view for mobile screens
//   const DesignCard = ({ design, index }) => (
//     <div className="bg-white p-4 rounded-lg shadow mb-4">
//       <div className="grid grid-cols-2 gap-2">
//         <div className="text-xs font-heading">S.No</div>
//         <div className="text-xs font-body">{index + 1}</div>

//         <div className="text-xs font-heading">File Number</div>
//         <div className="text-xs font-body">{design.file_number}</div>

//         <div className="text-xs font-heading">Design</div>
//         <div className="text-xs font-body">{design.design}</div>

//         <div className="text-xs font-heading">Front Depth</div>
//         <div className="text-xs font-body">{design.front_depth}</div>

//         <div className="text-xs font-heading">Industry</div>
//         <div className="text-xs font-body">{design.industry}</div>
//       </div>

//       <div className="mt-4 flex flex-col space-y-3">
//         <button
//           onClick={() => handleViewFile(design.file_url_1)}
//           className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800"
//         >
//           <FaDownload />
//           <span className="text-xs font-heading">Download 3D File</span>
//         </button>

//         {design.file_url_2 && (
//           <div className="flex justify-center">
//             <img
//               src={design.file_url_2}
//               alt="File 2"
//               className="w-20 h-20 object-contain cursor-pointer hover:opacity-80"
//               onClick={() => handleViewFile(design.file_url_2)}
//               title="Click to view"
//             />
//           </div>
//         )}

//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={() => handleEdit(design)}
//             className="text-blue-600 hover:text-blue-800 p-2"
//             title="Edit"
//           >
//             <FaEdit size={20} />
//           </button>
//           <button
//             onClick={() => handleDelete(design.id)}
//             className="text-red-600 hover:text-red-800 p-2"
//             title="Delete"
//           >
//             <FaTrashAlt size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-8 bg-white">
//       <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
//         Design List
//       </h1>

//       {/* Desktop view */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 S.No
//               </th>
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 File Number
//               </th>
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 Design
//               </th>
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 Front Depth
//               </th>
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 Industry
//               </th>
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 Version
//               </th>
//               <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
//                 3D File
//               </th>
//               <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
//                 Jpeg File
//               </th>
//               <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {designs.map((design, index) => (
//               <tr key={design.id} className="hover:bg-gray-50">
//                 <td className="py-4 px-4 text-xs text-gray-900">{index + 1}</td>
//                 <td className="py-4 px-4 text-xs text-gray-900">
//                   {design.file_number}
//                 </td>
//                 <td className="py-4 px-4 text-xs text-gray-900">
//                   {design.design}
//                 </td>
//                 <td className="py-4 px-4 text-xs text-gray-900">
//                   {design.front_depth}
//                 </td>
//                 <td className="py-4 px-4 text-xs text-gray-900">
//                   {design.industry}
//                 </td>
//                 <td className="py-4 px-4 text-xs text-gray-900">
//                   {design.version}
//                 </td>
//                 <td className="py-4 px-4 text-left">
//                   <button
//                     onClick={() => handleViewFile(design.file_url_1)}
//                     className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
//                   >
//                     <FaDownload className="inline-block" />
//                     <span className="text-xs">Download</span>
//                   </button>
//                 </td>
//                 <td className="py-4 px-4">
//                   {design.file_url_2 && (
//                     <div className="flex justify-center">
//                       <img
//                         src={design.file_url_2}
//                         alt="File 2"
//                         className="w-12 h-12 object-contain cursor-pointer hover:opacity-80"
//                         onClick={() => handleViewFile(design.file_url_2)}
//                         title="Click to view"
//                       />
//                     </div>
//                   )}
//                 </td>
//                 <td className="py-4 px-4">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       onClick={() => handleEdit(design)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Edit"
//                     >
//                       <FaEdit size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(design.id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <FaTrashAlt size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile view */}
//       <div className="md:hidden space-y-4">
//         {designs.map((design, index) => (
//           <DesignCard key={design.id} design={design} index={index} />
//         ))}
//       </div>

//       {loading && (
//         <div className="flex justify-center items-center mt-4">
//           <div className="text-gray-600">Loading...</div>
//         </div>
//       )}

//       {!loading && designs.length === 0 && (
//         <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
//           <p className="text-gray-600">No designs found</p>
//         </div>
//       )}

//       {/* Responsive Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
//           <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
//             <h2 className="text-xl font-heading mb-4">Edit Design</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-heading mb-2">
//                   Design
//                 </label>
//                 <input
//                   type="text"
//                   name="design"
//                   value={formData.design}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2  border rounded font-body text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block font-heading text-sm font-medium mb-2">
//                   Front Depth
//                 </label>
//                 <input
//                   type="text"
//                   name="front_depth"
//                   value={formData.front_depth}
//                   onChange={handleInputChange}
//                   className="w-full px-3 font-body py-2 border rounded text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block font-heading text-sm font-medium mb-2">
//                   Industry
//                 </label>
//                 <input
//                   type="text"
//                   name="industry"
//                   value={formData.industry}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 font-body border rounded text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block font-heading text-sm font-medium mb-2">
//                   Version
//                 </label>
//                 <input
//                   type="text"
//                   name="version"
//                   value={formData.version}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 font-body border rounded text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block font-heading text-sm font-medium mb-2">
//                   3D File
//                 </label>
//                 <input
//                   type="file"
//                   name="file1"
//                   accept=".max"
//                   onChange={handleFileChange}
//                   className="w-full px-3 py-2 font-body border rounded text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-heading font-medium mb-2">
//                   JPEG File
//                 </label>
//                 <input
//                   type="file"
//                   name="file2"
//                   accept="image/jpeg, image/jpg, image/png"
//                   onChange={handleFileChange}
//                   className="w-full px-3 py-2 border font-body rounded text-sm"
//                 />
//               </div>
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-300 font-heading text-gray-700 rounded text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 font-heading bg-blue-600 text-white rounded text-sm"
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

// export default DesignList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaDownload, FaSearch } from "react-icons/fa";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";

const DesignList = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    design: "",
    front_depth: "",
    industry: "",
    version: "",
    file1: null,
    file2: null,
  });

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://expomarg.com/api/uploads");
      setDesigns(response.data.uploads);
    } catch (err) {
      console.error("Error fetching designs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this design?")) {
      try {
        await axios.delete(`https://expomarg.com/api/uploads/${id}`);
        fetchDesigns();
        alert("Design deleted successfully");
      } catch (err) {
        console.error("Error deleting design:", err);
        alert("Error deleting design");
      }
    }
  };

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleEdit = (design) => {
    setCurrentDesign(design);
    setFormData({
      design: design.design,
      front_depth: design.front_depth,
      industry: design.industry,
      version: design.version,
      file1: null,
      file2: null,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const form = new FormData();
    form.append("design", formData.design);
    form.append("front_depth", formData.front_depth);
    form.append("industry", formData.industry);
    form.append("version", formData.version);
    if (formData.file1) form.append("file1", formData.file1);
    if (formData.file2) form.append("file2", formData.file2);

    try {
      await axios.put(
        `https://expomarg.com/api/upload/${currentDesign.id}`,
        form
      );
      fetchDesigns();
      setIsModalOpen(false);
      alert("Design updated successfully");
    } catch (err) {
      console.error("Error updating design:", err);
      alert("Error updating design");
    } finally {
      setIsUploading(false);
    }
  };

  // Filter designs based on search query
  const filteredDesigns = designs.filter((design) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      design.file_number?.toLowerCase().includes(searchTerm) ||
      design.design?.toLowerCase().includes(searchTerm) ||
      design.front_depth?.toLowerCase().includes(searchTerm) ||
      design.industry?.toLowerCase().includes(searchTerm) ||
      design.version?.toLowerCase().includes(searchTerm) ||
      design.file_url_1?.toLowerCase().includes(searchTerm) ||
      design.file_url_2?.toLowerCase().includes(searchTerm)
    );
  });

  const DesignCard = ({ design, index }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs font-heading">S.No</div>
        <div className="text-xs font-body">{index + 1}</div>

        <div className="text-xs font-heading">File Number</div>
        <div className="text-xs font-body">{design.file_number}</div>

        <div className="text-xs font-heading">Design</div>
        <div className="text-xs font-body">{design.design}</div>

        <div className="text-xs font-heading">Front Depth</div>
        <div className="text-xs font-body">{design.front_depth}</div>

        <div className="text-xs font-heading">Industry</div>
        <div className="text-xs font-body">{design.industry}</div>
      </div>

      <div className="mt-4 flex flex-col space-y-3">
        <button
          onClick={() => handleViewFile(design.file_url_1)}
          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <FaDownload />
          <span className="text-xs font-heading">Download 3D File</span>
        </button>

        {design.file_url_2 && (
          <div className="flex justify-center">
            <img
              src={design.file_url_2}
              alt="File 2"
              className="w-20 h-20 object-contain cursor-pointer hover:opacity-80"
              onClick={() => handleViewFile(design.file_url_2)}
              title="Click to view"
            />
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleEdit(design)}
            className="text-blue-600 hover:text-blue-800 p-2"
            title="Edit"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(design.id)}
            className="text-red-600 hover:text-red-800 p-2"
            title="Delete"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-white">
      {/* Your existing JSX */}
      <CircularLoadingOverlay isLoading={isUploading} />
      <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
        Design List
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search in File Number, Design, Front Depth, Industry, Version..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg font-body text-sm focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                S.No
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                File Number
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Design
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Front Depth
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Industry
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                Version
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                3D File
              </th>
              <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
                Jpeg File
              </th>
              <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDesigns.map((design, index) => (
              <tr key={design.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-xs text-gray-900">{index + 1}</td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {design.file_number}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {design.design}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {design.front_depth}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {design.industry}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {design.version}
                </td>
                <td className="py-4 px-4 text-left">
                  <button
                    onClick={() => handleViewFile(design.file_url_1)}
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                  >
                    <FaDownload className="inline-block" />
                    <span className="text-xs">Download</span>
                  </button>
                </td>
                <td className="py-4 px-4">
                  {design.file_url_2 && (
                    <div className="flex justify-center">
                      <img
                        src={design.file_url_2}
                        alt="File 2"
                        className="w-12 h-12 object-contain cursor-pointer hover:opacity-80"
                        onClick={() => handleViewFile(design.file_url_2)}
                        title="Click to view"
                      />
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(design)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(design.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {filteredDesigns.map((design, index) => (
          <DesignCard key={design.id} design={design} index={index} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="text-gray-600">Loading...</div>
        </div>
      )}

      {!loading && filteredDesigns.length === 0 && (
        <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {designs.length === 0
              ? "No designs found"
              : "No matching designs found"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-heading mb-4">Edit Design</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-heading mb-2">
                  Design
                </label>
                <input
                  type="text"
                  name="design"
                  value={formData.design}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded font-body text-sm"
                />
              </div>
              <div>
                <label className="block font-heading text-sm font-medium mb-2">
                  Front Depth
                </label>
                <input
                  type="text"
                  name="front_depth"
                  value={formData.front_depth}
                  onChange={handleInputChange}
                  className="w-full px-3 font-body py-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block font-heading text-sm font-medium mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 font-body border rounded text-sm"
                />
              </div>
              <div>
                <label className="block font-heading text-sm font-medium mb-2">
                  Version
                </label>
                <input
                  type="text"
                  name="version"
                  value={formData.version}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 font-body border rounded text-sm"
                />
              </div>
              <div>
                <label className="block font-heading text-sm font-medium mb-2">
                  3D File
                </label>
                <input
                  type="file"
                  name="file1"
                  accept=".max"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 font-body border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-medium mb-2">
                  JPEG File
                </label>
                <input
                  type="file"
                  name="file2"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border font-body rounded text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 font-heading text-gray-700 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-heading bg-blue-600 text-white rounded text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignList;
