import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaDownload,
  FaEye,
  FaTimes,
  FaIdCardAlt,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaCity,
  FaCalendarDay,
  FaClock,
  FaRegCheckCircle,
  FaRegEdit,
} from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5"; // Import a better upload icon
import { FiSearch } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StatusDropdown from "../../components/StatusDropdown";

const HeaderInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Function to check if a value matches any of the search terms
  const matchesSearchTerms = (value, searchTerms) => {
    if (!value) return false;
    value = value.toLowerCase();
    return searchTerms.some((term) => value.includes(term));
  };

  // Function to filter inquiries based on search term
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (!searchTerm.trim()) return true;

    // Split search input into individual terms and remove empty strings
    const searchTerms = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((term) => term);

    const searchValue = searchTerm.toLowerCase();
    // Format dates once for comparison
    const eventDate = new Date(inquiry.event_date)
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toLowerCase();

    const submissionTime = new Date(inquiry.submission_time)
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .toLowerCase();

    // Check each field against all search terms
    return searchTerms.every((term) => {
      return (
        matchesSearchTerms(inquiry.inquiry_by?.toLowerCase(), [term]) ||
        matchesSearchTerms(inquiry.company_name?.toLowerCase(), [term]) ||
        matchesSearchTerms(inquiry.event_name?.toLowerCase(), [term]) ||
        matchesSearchTerms(inquiry.venue_city?.toLowerCase(), [term]) ||
        matchesSearchTerms(eventDate, [term]) ||
        matchesSearchTerms(submissionTime, [term]) ||
        matchesSearchTerms(inquiry.status?.toLowerCase(), [term]) ||
        matchesSearchTerms(inquiry.stall_size?.toLowerCase(), [term])
      );
    });
  });

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <span className="font-heading">Status:</span>
            <div className="mt-2 sm:mt-0 sm:ml-2">
              <StatusDropdown
                value={inquiry.status || "Not Set"}
                onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl text-center font-heading w-full flex items-center justify-center gap-2">
            <FaEnvelope className="text-2xl" />
            Inquiries
          </h1>
          <div className="ml-auto flex gap-1 md:gap-2">
            <a href="/form">
              <button className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-base px-2 md:px-4 py-1 md:py-2 rounded-md flex items-center whitespace-nowrap">
                <IoCloudUploadOutline className="mr-1 md:mr-2 text-sm md:text-base" />{" "}
                Add Inquiries
              </button>
            </a>
          </div>
        </div>

        {/* Enhanced Search Bar with better description */}
        <div className="relative mt-10 mb-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search with multiple terms (e.g. 'company:ABC city:New York status:pending')"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
          />
          {searchTerm && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button
                onClick={() => setSearchTerm("")}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        {/* Add search tips */}
        {searchTerm && (
          <div className="text-sm text-gray-600 mb-4">
            <p className="text-red-500 font-heading text-xs">
              Tip: Use space to separate multiple search terms. Each term will
              filter across all fields.
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {loading && <p className="text-center">Loading inquiries...</p>}
        {error && <p className="text-[#2573b1] text-center">{error}</p>}

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-[#2573b1]">
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaIdCardAlt className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Added icon */}
                  Sign No
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaEnvelope className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Inquiry By
                </th>

                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaBuilding className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Company Name
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaCalendarAlt className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Event Name
                </th>

                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaCity className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Venue City
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaCalendarDay className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Event Date
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaClock className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Submission Time
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaRegCheckCircle className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Status
                </th>
                <th className="py-2 px-4 text-white border font-body text-sm">
                  <FaRegEdit className="w-6 h-6 inline-block mr-2 text-white" />{" "}
                  {/* Replaced image with icon */}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry, index) => (
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
          {filteredInquiries.map((inquiry, index) => (
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
