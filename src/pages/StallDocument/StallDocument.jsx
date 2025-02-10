import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaBuilding } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoCloudUploadOutline, IoDocumentTextOutline } from "react-icons/io5";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";
import GenerateAuthorityLetter from "../../components/GenerateAuthorityLetter";

// Import document type icons from assets
import authLetterIcon from "../../assets/l1.png";
import designApprovalIcon from "../../assets/a1.png";
import floorPlanIcon from "../../assets/f.png";
import positionLetterIcon from "../../assets/l2.png";
import exhibitorManualIcon from "../../assets/m.png";
import downloadIcon from "../../assets/k.png";

const DocumentLink = ({ url, icon, label }) => {
  if (!url) return <span className="text-gray-400">Not uploaded</span>;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src={icon} alt={label} className="w-8 h-8" />
        </a>
        <a href={url} download className="hover:opacity-80" title="Download">
          <img src={downloadIcon} alt="Download" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, stallData, onUpdate }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    authoritativeLetter: null,
    designApproval: null,
    floorPlan: null,
    dd: "",
    dd_cost: "",
    positionLetter: null,
    exhibitorManual: null, // Add new field
    exhibition_name: "",
    hall_no: "",
    stall_no: "",
  });

  useEffect(() => {
    if (stallData) {
      setFormData({
        company_name: stallData.company_name || "",
        dd: stallData.dd || "",
        dd_cost: stallData.dd_cost || "",
        exhibition_name: stallData.exhibition_name || "",
        hall_no: stallData.hall_no || "",
        stall_no: stallData.stall_no || "",
        authoritativeLetter: null,
        designApproval: null,
        floorPlan: null,
        positionLetter: null,
        exhibitorManual: null, // Add new field
      });
    }
  }, [stallData]);

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

  // Rest of EditModal component remains the same, just add the new field to the form JSX
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string") {
        formDataToSend.append(key, formData[key]);
      }
    });

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
    if (formData.exhibitorManual)
      formDataToSend.append("exhibitorManual", formData.exhibitorManual);

    try {
      await onUpdate(stallData.id, formDataToSend);
      onClose();
    } catch (error) {
      console.error("Error updating stall document:", error);
      alert("Error updating stall document");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-heading mb-4">Edit Stall Documents</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-heading mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
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
              <label className="block text-sm font-heading mb-2">DD Cost</label>
              <input
                type="text"
                name="dd_cost"
                value={formData.dd_cost}
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
                name="exhibition_name"
                value={formData.exhibition_name}
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
                name="hall_no"
                value={formData.hall_no}
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
                name="stall_no"
                value={formData.stall_no}
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
            <div>
              <label className="block text-sm font-heading mb-2">
                Exhibitor Manual
              </label>
              <input
                type="file"
                name="exhibitorManual"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StallCard = ({ doc, onEdit, onDelete }) => (
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

      <div className="text-xs font-heading text-gray-600">DD</div>
      <div className="text-xs font-body">{doc.dd || "N/A"}</div>

      {doc.dd === "Yes" && (
        <>
          <div className="text-xs font-heading text-gray-600">DD Cost</div>
          <div className="text-xs font-body">{doc.dd_cost || "N/A"}</div>
        </>
      )}
    </div>

    <div className="mt-4 grid grid-cols-4 gap-4 justify-items-center">
      <DocumentLink
        url={doc.authoritative_letter_url}
        icon={authLetterIcon}
        label="Authoritative Letter"
      />
      <DocumentLink
        url={doc.design_approval_url}
        icon={designApprovalIcon}
        label="Design Approval"
      />
      <DocumentLink
        url={doc.floor_plan_url}
        icon={floorPlanIcon}
        label="Floor Plan"
      />
      <DocumentLink
        url={doc.position_letter_url}
        icon={positionLetterIcon}
        label="Position Letter"
      />
      <DocumentLink
        url={doc.exhibitor_manual_url}
        icon={exhibitorManualIcon}
        label="Exhibitor Manual"
      />
    </div>

    <div className="mt-4 flex justify-end space-x-2">
      <button
        onClick={() => onEdit(doc)}
        className="p-2 text-blue-600 hover:text-blue-800"
        title="Edit"
      >
        <FaEdit size={18} />
      </button>
      <button
        onClick={() => onDelete(doc.id)}
        className="p-2 text-red-600 hover:text-red-800"
        title="Delete"
      >
        <FaTrashAlt size={18} />
      </button>
    </div>
  </div>
);

const StallDocuments = () => {
  const [stallDocs, setStallDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerateLetterModalOpen, setIsGenerateLetterModalOpen] =
    useState(false);

  const [selectedStall, setSelectedStall] = useState(null);
  // Update the initial form state in StallDocuments component
  const [formData, setFormData] = useState({
    company_name: "",
    authoritativeLetter: null,
    designApproval: null,
    floorPlan: null,
    dd: "",
    dd_cost: "",
    positionLetter: null,
    exhibitorManual: null, // Add new field
    exhibition_name: "",
    hall_no: "",
    stall_no: "",
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

  // Update the form reset in handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string") {
        formDataToSend.append(key, formData[key]);
      }
    });

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
    if (formData.exhibitorManual)
      formDataToSend.append("exhibitorManual", formData.exhibitorManual); // Add this line

    try {
      await axios.post(
        "https://expomarg.com/api/upload-stall-documents",
        formDataToSend
      );
      fetchStallDocuments();
      setIsAddModalOpen(false);
      setFormData({
        company_name: "",
        authoritativeLetter: null,
        designApproval: null,
        floorPlan: null,
        dd: "",
        dd_cost: "",
        positionLetter: null,
        exhibitorManual: null, // Add this to reset form
        exhibition_name: "",
        hall_no: "",
        stall_no: "",
      });
      alert("Stall documents uploaded successfully");
    } catch (err) {
      console.error("Error uploading stall documents:", err);
      alert("Error uploading stall documents");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (stall) => {
    setSelectedStall(stall);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this stall document?"))
      try {
        await axios.delete(`https://expomarg.com/api/stall-documents/${id}`);
        fetchStallDocuments();
        alert("Stall document deleted successfully");
      } catch (error) {
        console.error("Error deleting stall document:", error);
        alert("Error deleting stall document");
      }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await axios.put(
        `https://expomarg.com/api/stall-documents/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchStallDocuments();
      alert("Stall document updated successfully");
    } catch (error) {
      throw error;
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
              <div>
                <label className="block text-sm font-heading mb-2">
                  Exhibitor Manual
                </label>
                <input
                  type="file"
                  name="exhibitorManual"
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <CircularLoadingOverlay isLoading={isUploading} />

      <div className="flex-grow p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-heading flex-1 text-center sm:text-left mb-4 sm:mb-0">
            <FaBuilding className="inline-block mr-2" />
            Stall Documents
          </h1>
          <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex font-heading text-sm items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-auto"
            >
              <IoCloudUploadOutline className="mr-2" />
              Upload Documents
            </button>
            <button
              onClick={() => setIsGenerateLetterModalOpen(true)}
              className="flex font-heading text-sm items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-auto"
            >
              <IoDocumentTextOutline className="mr-2" />
              Generate Authority Letter
            </button>
          </div>
          {/* Authority Letter Modal */}
          <GenerateAuthorityLetter
            isOpen={isGenerateLetterModalOpen}
            onClose={() => setIsGenerateLetterModalOpen(false)}
          />
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
                <th className="py-3 px-4 text-left font-heading text-sm">
                  Sign No
                </th>
                <th className="py-3 px-4 text-left font-heading text-sm">
                  Project Details
                </th>
                <th className="py-3 px-4 text-center font-heading text-sm">
                  Authoritative Letter
                </th>
                <th className="py-3 px-4 text-center font-heading text-sm">
                  Design Approval
                </th>
                <th className="py-3 px-4 text-center font-heading text-sm">
                  Floor Plan
                </th>
                <th className="py-3 px-4 text-center font-heading text-sm">
                  Position Letter
                </th>
                <th className="py-3 px-4 text-center font-heading text-sm">
                  Exhibitor Manual
                </th>

                <th className="py-3 px-4 text-center font-heading text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 font-body text-sm">{index + 1}</td>
                  <td className="py-4 px-4 font-body text-sm uppercase">
                    <div className="text-red-500 font-extrabold">
                      {doc.company_name}
                    </div>

                    <div>{doc.exhibition_name}</div>
                    <div>
                      <strong className="font-heading ">
                        Hall & Stall No:
                      </strong>{" "}
                      {doc.hall_no} - {doc.stall_no}
                    </div>
                    <div className="flex">
                      <div className="mr-4">
                        <strong className="font-heading">DD:</strong> {doc.dd}
                      </div>
                      {doc.dd === "Yes" && (
                        <div>
                          <strong className="font-heading">Cost:</strong>{" "}
                          {doc.dd_cost}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <DocumentLink
                      url={doc.authoritative_letter_url}
                      icon={authLetterIcon}
                      label="Authoritative Letter"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <DocumentLink
                      url={doc.design_approval_url}
                      icon={designApprovalIcon}
                      label="Design Approval"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <DocumentLink
                      url={doc.floor_plan_url}
                      icon={floorPlanIcon}
                      label="Floor Plan"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <DocumentLink
                      url={doc.position_letter_url}
                      icon={positionLetterIcon}
                      label="Position Letter"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <DocumentLink
                      url={doc.exhibitor_manual_url}
                      icon={exhibitorManualIcon}
                      label="Exhibitor Manual"
                    />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 text-red-600 hover:text-red-800"
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

        <div className="md:hidden space-y-4">
          {filteredDocs.map((doc) => (
            <StallCard
              key={doc.id}
              doc={doc}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
        {isEditModalOpen && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedStall(null);
            }}
            stallData={selectedStall}
            onUpdate={handleUpdate}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StallDocuments;
