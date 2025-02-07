import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaFileAlt,
  FaBuilding,
  FaFileUpload,
  FaRegClock,
} from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";
import { FiSearch } from "react-icons/fi";

const StallDocuments = () => {
  const [stallDocs, setStallDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    dd: "",
    ddCost: "",
    exhibitionName: "",
    hallNo: "",
    stallNo: "",
    authoritativeLetter: null,
    designApproval: null,
    floorPlan: null,
    positionLetter: null,
  });

  useEffect(() => {
    fetchStallDocuments();
  }, []);

  const fetchStallDocuments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://expomarg.com/api/stall-documents"
      );
      setStallDocs(response.data.data);
    } catch (err) {
      console.error("Error fetching stall documents:", err);
      alert("Error fetching stall documents");
    } finally {
      setLoading(false);
    }
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

    const formDataToSend = new FormData();
    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string") {
        formDataToSend.append(key, formData[key]);
      }
    });
    // Append files
    if (formData.authoritativeLetter)
      formDataToSend.append(
        "authoritativeLetter",
        formData.authoritativeLetter
      );
    if (formData.designApproval)
      formDataToSend.append("designApproval", formData.designApproval);
    if (formData.floorPlan)
      formDataToSend.append("floorPlan", formData.floorPlan);
    if (formData.positionLetter)
      formDataToSend.append("positionLetter", formData.positionLetter);

    try {
      await axios.post(
        "https://expomarg.com/api/upload-stall-documents",
        formDataToSend
      );
      fetchStallDocuments();
      setIsAddModalOpen(false);
      setFormData({
        companyName: "",
        dd: "",
        ddCost: "",
        exhibitionName: "",
        hallNo: "",
        stallNo: "",
        authoritativeLetter: null,
        designApproval: null,
        floorPlan: null,
        positionLetter: null,
      });
      alert("Stall documents uploaded successfully");
    } catch (err) {
      console.error("Error uploading stall documents:", err);
      alert("Error uploading stall documents");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredDocs = stallDocs.filter((doc) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      doc.company_name?.toLowerCase().includes(searchTerm) ||
      doc.exhibition_name?.toLowerCase().includes(searchTerm) ||
      doc.hall_no?.toLowerCase().includes(searchTerm) ||
      doc.stall_no?.toLowerCase().includes(searchTerm)
    );
  });

  const renderFileLink = (url, label) => {
    if (!url) return <span className="text-gray-400">Not uploaded</span>;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <FaFileAlt className="inline mr-2" />
        {label}
      </a>
    );
  };

  const renderModal = () =>
    isAddModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-heading mb-4">Upload Stall Documents</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-heading mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  DD Number
                </label>
                <input
                  type="text"
                  name="dd"
                  value={formData.dd}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  DD Cost
                </label>
                <input
                  type="text"
                  name="ddCost"
                  value={formData.ddCost}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  Exhibition Name
                </label>
                <input
                  type="text"
                  name="exhibitionName"
                  value={formData.exhibitionName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  Hall Number
                </label>
                <input
                  type="text"
                  name="hallNo"
                  value={formData.hallNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  Stall Number
                </label>
                <input
                  type="text"
                  name="stallNo"
                  value={formData.stallNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-heading mb-2">
                  Authoritative Letter
                </label>
                <input
                  type="file"
                  name="authoritativeLetter"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  Design Approval
                </label>
                <input
                  type="file"
                  name="designApproval"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  Floor Plan
                </label>
                <input
                  type="file"
                  name="floorPlan"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-heading mb-2">
                  Position Letter
                </label>
                <input
                  type="file"
                  name="positionLetter"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );

  const StallCard = ({ doc }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs font-heading text-gray-600">Company</div>
        <div className="text-xs font-body">{doc.company_name || "N/A"}</div>

        <div className="text-xs font-heading text-gray-600">Exhibition</div>
        <div className="text-xs font-body">{doc.exhibition_name || "N/A"}</div>

        <div className="text-xs font-heading text-gray-600">Hall No</div>
        <div className="text-xs font-body">{doc.hall_no || "N/A"}</div>

        <div className="text-xs font-heading text-gray-600">Stall No</div>
        <div className="text-xs font-body">{doc.stall_no || "N/A"}</div>

        <div className="text-xs font-heading text-gray-600">DD Number</div>
        <div className="text-xs font-body">{doc.dd || "N/A"}</div>

        <div className="text-xs font-heading text-gray-600">DD Cost</div>
        <div className="text-xs font-body">{doc.dd_cost || "N/A"}</div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-xs font-heading text-gray-600 mb-2">
          Documents:
        </div>

        {doc.authoritative_letter_url && (
          <a
            href={doc.authoritative_letter_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          >
            <FaFileAlt className="mr-2" />
            Authoritative Letter
          </a>
        )}

        {doc.design_approval_url && (
          <a
            href={doc.design_approval_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          >
            <FaFileAlt className="mr-2" />
            Design Approval
          </a>
        )}

        {doc.floor_plan_url && (
          <a
            href={doc.floor_plan_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          >
            <FaFileAlt className="mr-2" />
            Floor Plan
          </a>
        )}

        {doc.position_letter_url && (
          <a
            href={doc.position_letter_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs text-blue-600 hover:text-blue-800"
          >
            <FaFileAlt className="mr-2" />
            Position Letter
          </a>
        )}

        {!doc.authoritative_letter_url &&
          !doc.design_approval_url &&
          !doc.floor_plan_url &&
          !doc.position_letter_url && (
            <div className="text-xs text-gray-500">No documents uploaded</div>
          )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <CircularLoadingOverlay isLoading={isUploading} />

      <div className="flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-heading">
            <FaBuilding className="inline-block mr-2" />
            Stall Documents
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FaFileUpload className="mr-2" />
            Upload Documents
          </button>
        </div>

        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Company Name, Exhibition, Hall No, or Stall No..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>

        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#2573b1] text-white">
                <th className="py-3 px-4 text-left">Company Details</th>
                <th className="py-3 px-4 text-left">Authoritative Letter</th>
                <th className="py-3 px-4 text-left">Design Approval</th>
                <th className="py-3 px-4 text-left">Floor Plan</th>
                <th className="py-3 px-4 text-left">Position Letter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <strong>Company Name:</strong> {doc.company_name}
                    </div>
                    <div>
                      <strong>Exhibition:</strong> {doc.exhibition_name}
                    </div>
                    <div>
                      <strong>Hall No:</strong> {doc.hall_no}
                    </div>
                    <div>
                      <strong>Stall No:</strong> {doc.stall_no}
                    </div>
                    <div>
                      <strong>DD Details:</strong>
                    </div>
                    <div>
                      <strong>DD:</strong> {doc.dd}
                    </div>
                    <div>
                      <strong>Cost:</strong> {doc.dd_cost}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {renderFileLink(
                      doc.authoritative_letter_url,
                      "Authoritative Letter"
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {renderFileLink(doc.design_approval_url, "Design Approval")}
                  </td>
                  <td className="py-4 px-4">
                    {renderFileLink(doc.floor_plan_url, "Floor Plan")}
                  </td>
                  <td className="py-4 px-4">
                    {renderFileLink(doc.position_letter_url, "Position Letter")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-4">
          {filteredDocs.map((doc) => (
            <StallCard key={doc.id} doc={doc} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="text-gray-600">Loading...</div>
          </div>
        )}

        {!loading && filteredDocs.length === 0 && (
          <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              {stallDocs.length === 0
                ? "No stall documents found"
                : "No matching documents found"}
            </p>
          </div>
        )}

        {renderModal()}
      </div>

      <Footer />
    </div>
  );
};

export default StallDocuments;
