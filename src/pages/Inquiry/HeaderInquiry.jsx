// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import "./style.css";
// import Header from "../../components/Header";

// const HeaderInquiry = () => {
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedInquiry, setSelectedInquiry] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [sortOrder, setSortOrder] = useState("asc"); // Sorting order: 'asc' or 'desc'

//   // Fetch inquiries data from the API
//   useEffect(() => {
//     axios
//       .get("https://expomarg.com/api/get-inquiries")
//       .then((response) => {
//         setInquiries(response.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Error fetching inquiries");
//         setLoading(false);
//       });
//   }, []);

//   const handleSortById = () => {
//     const sortedInquiries = [...inquiries].sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a.id - b.id;
//       } else {
//         return b.id - a.id;
//       }
//     });
//     setInquiries(sortedInquiries);
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   const handleViewDetails = (inquiry) => {
//     setSelectedInquiry(inquiry);
//     setShowDetails(true);
//   };

//   const handleCloseDetails = () => {
//     setSelectedInquiry(null);
//     setShowDetails(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <Header />
//       <div className="flex">
//         <div className="flex-1 p-6">
//           <h1 className="text-3xl font-bold text-center mb-6 font-heading">
//             Inquiry Details
//           </h1>
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gradient-to-r from-yellow-300 to-yellow-600 text-white">
//                 <th
//                   className="p-4 cursor-pointer font-heading"
//                   onClick={handleSortById}
//                 >
//                   Inquiry ID
//                   {sortOrder === "asc" ? " ▲" : " ▼"}
//                 </th>
//                 <th className="p-4 font-heading">Company Name</th>
//                 <th className="p-4 font-heading">Contact Person</th>
//                 <th className="p-4 font-heading">Event Name</th>
//                 <th className="p-4 font-heading">Venue City</th>
//                 <th className="p-4 font-heading">Event Date</th>
//                 <th className="p-4 font-heading">Submission Time</th>
//                 <th className="p-4 font-heading">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {inquiries.map((inquiry) => (
//                 <tr key={inquiry.id} className="bg-gray-100 hover:bg-indigo-50">
//                   <td className="p-4">{inquiry.id}</td>
//                   <td className="p-4">{inquiry.company_name}</td>
//                   <td className="p-4">{inquiry.contact_person}</td>
//                   <td className="p-4">{inquiry.event_name}</td>
//                   <td className="p-4">{inquiry.venue_city}</td>
//                   <td className="p-4">
//                     {new Date(inquiry.event_date).toLocaleDateString()}
//                   </td>
//                   <td className="p-4">
//                     {new Date(inquiry.submission_time).toLocaleString()}
//                   </td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => handleViewDetails(inquiry)}
//                       className="bg-gradient-to-r from-[#91c848] to-[#4caf50] text-white px-4 py-2 rounded-lg  transition-all duration-300"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {showDetails && selectedInquiry && (
//             <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//               <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl shadow-lg overflow-y-auto">
//                 <h2 className="text-xl font-bold mb-4 text-center font-heading">
//                   Inquiry Details: {selectedInquiry.company_name}
//                 </h2>
//                 <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
//                   {/* Company Name */}
//                   <div>
//                     <label className="block font-heading font-semibold">
//                       Company Name:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.company_name}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Contact Person */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Contact Person:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.contact_person}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Contact Email */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Contact Email:
//                     </label>
//                     <input
//                       type="email"
//                       value={selectedInquiry.contact_email}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Contact Number */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Contact Number:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.contact_number}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Website */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Website:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.website}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Event Name */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Event Name:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.event_name}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Venue City */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Venue City:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.venue_city}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Event Date */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Event Date:
//                     </label>
//                     <input
//                       type="date"
//                       value={
//                         new Date(selectedInquiry.event_date)
//                           .toISOString()
//                           .split("T")[0]
//                       }
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Stall Size */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Stall Size:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.stall_size}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Sides Open Stall */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Sides Open Stall:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.sides_open_stall}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Floor Plan */}
//                   <div className="col-span-2">
//                     <label className="block font-semibold mb-2 font-heading">
//                       Floor Plan:
//                     </label>
//                     <a
//                       href={selectedInquiry.floorPlanDownloadLink}
//                       download
//                       className="px-4 py-2 bg-gradient-to-r from-red-500 to-black text-white rounded hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
//                     >
//                       Download Floor Plan
//                     </a>
//                   </div>

//                   {/* Logo Files */}
//                   <div className="col-span-2 mt-4">
//                     <label className="block font-semibold mb-2 font-heading">
//                       Logo Files:
//                     </label>
//                     <a
//                       href={selectedInquiry.logoFileDownloadLink}
//                       download
//                       className="px-4 py-2 bg-gradient-to-r from-red-500 to-black text-white rounded hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
//                     >
//                       Download Logo
//                     </a>
//                   </div>
//                   {/* Brand Color */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Brand Color:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.brand_color}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Meeting Room Required */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Meeting Room Required:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.meeting_room_required}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Store Room Required */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Store Room Required:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.store_room_required}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* TV/LED Wall Required */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       TV/LED Wall Required:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.tv_led_wall_required}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Product Display */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Product Display:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.product_display}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Seating Requirements */}
//                   <div className="col-span-2">
//                     <label className="block font-semibold font-heading">
//                       Seating Requirements:
//                     </label>
//                     <textarea
//                       value={JSON.parse(selectedInquiry.seating_requirements)}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Number of Products */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Number of Products:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.number_of_products}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Size of Products */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Size of Products:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.size_of_products}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Weight of Products */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Weight of Products:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.weight_of_products}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Deadline */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Deadline:
//                     </label>
//                     <input
//                       type="date"
//                       value={
//                         new Date(selectedInquiry.deadline)
//                           .toISOString()
//                           .split("T")[0]
//                       }
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Specific Information */}
//                   <div className="col-span-2">
//                     <label className="block font-semibold font-heading">
//                       Specific Information:
//                     </label>
//                     <textarea
//                       value={selectedInquiry.specific_information}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Suggested Budget */}
//                   <div>
//                     <label className="block font-semibold font-heading">
//                       Suggested Budget:
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedInquiry.suggested_budget}
//                       readOnly
//                       className="border p-2 rounded w-full"
//                     />
//                   </div>

//                   {/* Close Button */}
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       onClick={handleCloseDetails}
//                       className="mt-4 bg-gradient-to-r from-red-500 to-black text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderInquiry;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaEye, FaPlus, FaTimes } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import i1 from "../../assets/i1.png";
import c1 from "../../assets/c1.png";
import t from "../../assets/t.png";
import l from "../../assets/l.png";
import c from "../../assets/c.png";
import c2 from "../../assets/c2.png";
import s from "../../assets/s.png";
import s1 from "../../assets/s1.png";
import StatusDropdown from "../../components/StatusDropdown";

const HeaderInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://expomarg.com/api/inquiries");
      setInquiries(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch inquiries.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    const formData = new FormData();
    formData.append("status", newStatus);

    try {
      const response = await fetch(`https://expomarg.com/api/inquiry/${id}`, {
        method: "PUT",
        body: formData, // Use FormData as the body
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the status in the UI after a successful update
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Card view for mobile screens
  const InquiryCard = ({ inquiry, index }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-heading">Sign No: {index + 1}</span>
          <button
            onClick={() => handleView(inquiry)}
            className="text-[#2573b1] hover:text-[#2573b1] flex items-center gap-1"
          >
            <FaEye /> View
          </button>
        </div>
        <div className="text-sm space-y-1">
          <p>
            <span className="font-heading">Company:</span>{" "}
            {inquiry.company_name}
          </p>
          <p>
            <span className="font-heading">Event:</span> {inquiry.event_name}
          </p>

          <p>
            <span className="font-heading">City:</span> {inquiry.venue_city}
          </p>
          <p>
            <span className="font-heading">Date:</span>
            {new Date(inquiry.event_date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <span className="font-heading">Submitted:</span>{" "}
            {new Date(inquiry.submission_time).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <span className="font-heading">Status:</span>
            <div className="mt-2 sm:mt-0 sm:ml-2">
              <StatusDropdown
                value={inquiry.status || "Not Set"}
                onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
              />
            </div>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
          Inquiries
        </h1>
        <a href="/form" className="ml-auto">
          <div className="flex justify-end mb-4 md:mb-0">
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-base px-2 md:px-4 py-1 md:py-2 rounded-md flex items-center whitespace-nowrap">
              <FaPlus className="mr-1 md:mr-2 text-sm md:text-base" /> Add
              Inquiries
            </button>
          </div>
        </a>

        {loading && <p className="text-center">Loading inquiries...</p>}
        {error && <p className="text-[#2573b1] text-center">{error}</p>}

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-[#2573b1]">
                <th className="py-2 px-4 text-white border font-body text-sm">
                  Sign No
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={i1}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Inquiry By
                </th>

                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={c1}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Company Name
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={t}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Event Name
                </th>

                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={l}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Venue City
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={c}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Event Date
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={c2}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Submission Time
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={s1}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Status
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <img
                    src={s}
                    alt="Inquiry By"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr key={inquiry.id} className="text-center">
                  <td className="py-2 px-4 border font-body text-sm">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.inquiry_by}
                  </td>
                  <td className="py-2 px-4 border font-body font-bold text-sm">
                    {inquiry.company_name}{" "}
                    <span className="text-red-500">({inquiry.stall_size})</span>
                  </td>

                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.event_name}
                  </td>

                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.venue_city}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {new Date(inquiry.event_date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-2 px-4 border font-body text-sm">
                    {new Date(inquiry.submission_time).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="py-2 px-4 border font-body text-sm">
                    <StatusDropdown
                      value={inquiry.status}
                      onChange={(e) =>
                        handleStatusChange(inquiry.id, e.target.value)
                      }
                    />
                  </td>

                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleView(inquiry)}
                      className="text-[#2573b1] hover:text-[#2573b1] flex items-center gap-1 justify-center"
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden space-y-4">
          {inquiries.map((inquiry, index) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} index={index} />
          ))}
        </div>

        {/* Responsive Modal */}
        {showModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg animate__animated animate__fadeIn relative">
              <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-2xl font-heading ">
                    Inquiry Details
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    aria-label="Close Modal"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Information */}
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Company Name:
                      </strong>{" "}
                      {selectedInquiry.company_name}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Website:</strong>{" "}
                      {selectedInquiry.website}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Stall Size:</strong>{" "}
                      {selectedInquiry.stall_size}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Event Name:</strong>{" "}
                      {selectedInquiry.event_name}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Venue City:</strong>{" "}
                      {selectedInquiry.venue_city}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Event Date:</strong>{" "}
                      {selectedInquiry.event_date}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Sides Open:</strong>{" "}
                      {selectedInquiry.sides_open_stall}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Brand Color:
                      </strong>{" "}
                      {selectedInquiry.brand_color}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Size of Products:
                      </strong>{" "}
                      {selectedInquiry.size_of_products}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Weight of Products:
                      </strong>{" "}
                      {selectedInquiry.weight_of_products}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Specific Information:
                      </strong>{" "}
                      {selectedInquiry.specific_information}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Suggested Budget:
                      </strong>{" "}
                      {selectedInquiry.suggested_budget}
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Meeting Room:
                      </strong>{" "}
                      {selectedInquiry.meeting_room_required}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Store Room:</strong>{" "}
                      {selectedInquiry.store_room_required}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        TV/LED Wall:
                      </strong>{" "}
                      {selectedInquiry.tv_led_wall_required}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Product Display:
                      </strong>{" "}
                      {selectedInquiry.product_display}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Seating Requirement:
                      </strong>{" "}
                      {selectedInquiry.seating_requirements}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Number of Products:
                      </strong>{" "}
                      {selectedInquiry.number_of_products}
                    </div>
                  </div>
                </div>

                {/* Downloads Section */}
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <a
                    href={selectedInquiry.floorPlanDownloadLink}
                    download
                    className="w-full md:w-auto"
                  >
                    <button className="w-full bg-[#91c848] text-sm text-white px-6 py-2 rounded-md hover:bg-[#2573b1] transition duration-200 font-body flex items-center justify-center gap-2">
                      <FaDownload /> Floor Plan
                    </button>
                  </a>
                  <a
                    href={selectedInquiry.logoFilesDownloadLink}
                    download
                    className="w-full md:w-auto"
                  >
                    <button className="w-full bg-[#91c848] text-sm font-body text-white px-6 py-2 rounded-md hover:bg-[#2573b1] transition duration-200 flex items-center justify-center gap-2">
                      <FaDownload /> Logo
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HeaderInquiry;
