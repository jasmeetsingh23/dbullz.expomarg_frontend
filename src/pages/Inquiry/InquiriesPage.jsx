import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaDownload,
  FaIdCardAlt,
  FaEye,
  FaTimes,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";

const HeaderInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  const [files, setFiles] = useState({
    floorPlan: null,
    logoFiles: null,
  });

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
    setShowViewModal(true);
  };

  const handleEdit = (inquiry) => {
    setSelectedInquiry(inquiry);
    setUpdateFormData({
      companyName: inquiry.company_name,
      inquiryBy: inquiry.inquiry_by,
      website: inquiry.website,
      eventName: inquiry.event_name,
      venueCity: inquiry.venue_city,
      eventDate: inquiry.event_date,
      stallSize: inquiry.stall_size,
      sidesOpenStall: inquiry.sides_open_stall,
      brandColor: inquiry.brand_color,
      meetingRoomRequired: inquiry.meeting_room_required,
      storeRoomRequired: inquiry.store_room_required,
      tvLedWallRequired: inquiry.tv_led_wall_required,
      productDisplay: inquiry.product_display,
      seatingRequirements: inquiry.seating_requirements,
      numberOfProducts: inquiry.number_of_products,
      sizeOfProducts: inquiry.size_of_products,
      weightOfProducts: inquiry.weight_of_products,
      specificInformation: inquiry.specific_information,
      suggestedBudget: inquiry.suggested_budget,
    });
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`https://expomarg.com/api/inquiry/${id}`);
        fetchInquiries();
      } catch (err) {
        console.error("Error deleting inquiry:", err);
        setError("Failed to delete inquiry.");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();

    Object.keys(updateFormData).forEach((key) => {
      formData.append(key, updateFormData[key]);
    });

    if (files.floorPlan) {
      formData.append("floorPlan", files.floorPlan);
    }
    if (files.logoFiles) {
      formData.append("logoFiles", files.logoFiles);
    }

    try {
      await axios.put(
        `https://expomarg.com/api/inquiry/${selectedInquiry.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowUpdateModal(false);
      fetchInquiries();
    } catch (err) {
      console.error("Error updating inquiry:", err);
      setError("Failed to update inquiry.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const ActionButtons = ({ inquiry }) => (
    <div className="flex items-center  gap-2">
      <button
        onClick={() => handleView(inquiry)}
        className="text-blue-600 hover:text-blue-800"
        title="View"
      >
        <FaEye />
      </button>
      <button
        onClick={() => handleEdit(inquiry)}
        className="text-green-600 hover:text-green-800"
        title="Edit"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => handleDelete(inquiry.id)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <FaTrash />
      </button>
    </div>
  );

  const InquiryCard = ({ inquiry, index }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-heading">Sign No: {index + 1}</span>
          <ActionButtons inquiry={inquiry} />
        </div>
        <div className="text-sm space-y-1">
          <p>
            <span className="font-heading">Company:</span>{" "}
            {inquiry.company_name}
          </p>
          <p>
            <span className="font-heading">Event:</span> {inquiry.event_name}
          </p>
          {/* <p>
            <span className="font-heading">Contact:</span>{" "}
            {inquiry.contact_person}
          </p> */}
          <p>
            <span className="font-heading">City:</span> {inquiry.venue_city}
          </p>
          <p>
            <span className="font-heading">Date:</span>{" "}
            {(() => {
              const date = new Date(inquiry.event_date);
              const day = date.getDate();
              const month = date
                .toLocaleString("en-US", { month: "short" })
                .toLowerCase();
              const year = date.getFullYear();
              return `${day},${month},${year}`;
            })()}
          </p>
          <p>
            <span className="font-heading">Submitted:</span>{" "}
            {(() => {
              const date = new Date(inquiry.submission_time);
              const day = date.getDate();
              const month = date
                .toLocaleString("en-US", { month: "short" })
                .toLowerCase();
              const year = date.getFullYear();
              const hours = date.getHours();
              const minutes = date.getMinutes().toString().padStart(2, "0");
              const seconds = date.getSeconds().toString().padStart(2, "0");
              return `${day},${month},${year}, ${hours}:${minutes}:${seconds}`;
            })()}
          </p>
        </div>
      </div>
    </div>
  );

  const UpdateModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-heading">Update Inquiry</h2>
            <button onClick={() => setShowUpdateModal(false)}>
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleUpdateSubmit} className="p-4 space-y-4">
          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Company Information</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={updateFormData?.companyName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Inquiry By
                </label>
                <input
                  type="text"
                  name="inquiryBy"
                  value={updateFormData?.inquiryBy || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Specific Information
                </label>
                <textarea
                  name="specificInformation"
                  value={updateFormData?.specificInformation || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Suggested Budget
                </label>
                <input
                  type="text"
                  name="suggestedBudget"
                  value={updateFormData?.suggestedBudget || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Event Details</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={updateFormData?.eventName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Venue City
                </label>
                <input
                  type="text"
                  name="venueCity"
                  value={updateFormData?.venueCity || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Date
                </label>
                <input
                  type="text" // Changed from date to text
                  name="eventDate"
                  value={updateFormData?.eventDate || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={updateFormData?.website || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Stall Requirements */}
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Stall Requirements</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Stall Size
                </label>
                <input
                  type="text"
                  name="stallSize"
                  value={updateFormData?.stallSize || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sides Open
                </label>
                <input
                  type="text"
                  name="sidesOpenStall"
                  value={updateFormData?.sidesOpenStall || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Brand Color
                </label>
                <input
                  type="text"
                  name="brandColor"
                  value={updateFormData?.brandColor || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Additional Requirements</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Meeting Room Required
                </label>
                <select
                  name="meetingRoomRequired"
                  value={updateFormData?.meetingRoomRequired || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Store Room Required
                </label>
                <select
                  name="storeRoomRequired"
                  value={updateFormData?.storeRoomRequired || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  TV/LED Wall Required
                </label>
                <select
                  name="tvLedWallRequired"
                  value={updateFormData?.tvLedWallRequired || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Product Information</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Display
                </label>
                <input
                  type="text"
                  name="productDisplay"
                  value={updateFormData?.productDisplay || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Number of Products
                </label>
                <input
                  type="number"
                  name="numberOfProducts"
                  value={updateFormData?.numberOfProducts || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Size of Products
                </label>
                <input
                  type="text"
                  name="sizeOfProducts"
                  value={updateFormData?.sizeOfProducts || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Weight of Products
                </label>
                <input
                  type="text"
                  name="weightOfProducts"
                  value={updateFormData?.weightOfProducts || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Files */}
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Files</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Floor Plan
                </label>
                <input
                  type="file"
                  name="floorPlan"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Logo Files
                </label>
                <input
                  type="file"
                  name="logoFiles"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Your existing JSX */}
      <CircularLoadingOverlay isLoading={isUploading} />
      <div className="flex-grow p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
          Inquiries
        </h1>

        {loading && <p className="text-center">Loading inquiries...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto mt-8">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Sign No
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Inquiry By
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Company Name
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Event Name
                </th>

                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Venue City
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Event Date
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Submission Time
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, index) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border font-body text-sm">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.inquiry_by}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.company_name}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.event_name}
                  </td>

                  <td className="py-2 px-4 border font-body text-sm">
                    {inquiry.venue_city}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {(() => {
                      const date = new Date(inquiry.event_date);
                      const day = date.getDate();
                      const month = date
                        .toLocaleString("en-US", { month: "short" })
                        .toLowerCase();
                      const year = date.getFullYear();
                      return `${day},${month},${year}`;
                    })()}
                  </td>
                  <td className="py-2 px-4 border font-body text-sm">
                    {(() => {
                      const date = new Date(inquiry.submission_time);
                      const day = date.getDate();
                      const month = date
                        .toLocaleString("en-US", { month: "short" })
                        .toLowerCase();
                      const year = date.getFullYear();
                      const hours = date.getHours();
                      const minutes = date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                      const seconds = date
                        .getSeconds()
                        .toString()
                        .padStart(2, "0");
                      return `${day},${month},${year}, ${hours}:${minutes}:${seconds}`;
                    })()}
                  </td>
                  <td className="py-2 px-4 border">
                    <ActionButtons inquiry={inquiry} />
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

        {/* View Modal */}
        {showViewModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg animate__animated animate__fadeIn relative">
              <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl md:text-2xl font-heading">
                    Inquiry Details
                  </h2>
                  <button
                    onClick={() => setShowViewModal(false)}
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
                    {/* <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Contact Person:
                      </strong>{" "}
                      {selectedInquiry.contact_person}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Email:</strong>{" "}
                      {selectedInquiry.contact_email}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Phone:</strong>{" "}
                      {selectedInquiry.contact_number}
                    </div> */}
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Stall Size:</strong>{" "}
                      {selectedInquiry.stall_size}
                    </div>
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
                      {(() => {
                        const date = new Date(selectedInquiry.event_date);
                        const day = date.getDate();
                        const month = date
                          .toLocaleString("en-US", { month: "short" })
                          .toLowerCase();
                        const year = date.getFullYear();
                        return `${day},${month},${year}`;
                      })()}
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">Website:</strong>{" "}
                      {selectedInquiry.website}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
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
                    <div className="p-2 bg-gray-50 rounded">
                      <strong className="font-body text-sm">
                        Number of Products:
                      </strong>{" "}
                      {selectedInquiry.number_of_products}
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
                  </div>
                </div>

                {/* Downloads Section */}
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                  <a
                    href={selectedInquiry.floorPlanDownloadLink}
                    download
                    className="w-full md:w-auto"
                  >
                    <button className="w-full bg-blue-600 text-sm text-white px-6 py-2 rounded-md hover:bg-blue-800 transition duration-200 font-body flex items-center justify-center gap-2">
                      <FaDownload /> Floor Plan
                    </button>
                  </a>
                  <a
                    href={selectedInquiry.logoFilesDownloadLink}
                    download
                    className="w-full md:w-auto"
                  >
                    <button className="w-full bg-blue-600 text-sm font-body text-white px-6 py-2 rounded-md hover:bg-blue-800 transition duration-200 flex items-center justify-center gap-2">
                      <FaDownload /> Logo
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {showUpdateModal && selectedInquiry && <UpdateModal />}
      </div>
    </div>
  );
};

export default HeaderInquiry;
