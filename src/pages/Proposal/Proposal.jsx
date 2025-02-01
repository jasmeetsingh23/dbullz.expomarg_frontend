import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus, FaFileAlt } from "react-icons/fa";
import zipIcon from "../../assets/zip.png";
import pdfIcon from "../../assets/pdf.png";
import pptIcon from "../../assets/ppt.png";
import zipDownloadIcon from "../../assets/k.png";
import pdfDownloadIcon from "../../assets/k.png";
import pptDownloadIcon from "../../assets/k.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiSearch } from "react-icons/fi";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";

const ProposalList = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    zip: null,
    pdf: null,
    ppt: null,
  });

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://expomarg.com/api/proposals");
      setProposals(response.data.proposals);
    } catch (err) {
      console.error("Error fetching proposals:", err);
      alert("Error fetching proposals");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      try {
        await axios.delete(`https://expomarg.com/api/proposals/${id}`);
        fetchProposals();
        alert("Proposal deleted successfully");
      } catch (err) {
        console.error("Error deleting proposal:", err);
        alert("Error deleting proposal");
      }
    }
  };

  const renderFileWithDownload = (fileUrl, iconSrc, downloadIcon, alt) => (
    <div className="flex items-center justify-center space-x-2">
      <img
        src={iconSrc}
        alt={alt}
        onClick={() => window.open(fileUrl, "_blank")}
        style={{ width: "24px", height: "24px" }}
        className=" cursor-pointer hover:opacity-70"
        title={`View ${alt}`}
      />
      <img
        src={downloadIcon}
        alt={`Download ${alt}`}
        onClick={() => {
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `${alt.toLowerCase()}`;
          link.click();
        }}
        className=" cursor-pointer hover:opacity-70"
        style={{ width: "20px", height: "20px" }}
        title={`Download ${alt}`}
      />
    </div>
  );

  const handleEdit = (proposal) => {
    setCurrentProposal(proposal);
    setFormData({
      title: proposal.title,
      zip: null,
      pdf: null,
      ppt: null,
    });
    setIsEditModalOpen(true);
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const form = new FormData();
    form.append("title", formData.title);
    if (formData.zip) form.append("zip", formData.zip);
    if (formData.pdf) form.append("pdf", formData.pdf);
    if (formData.ppt) form.append("ppt", formData.ppt);

    try {
      await axios.put(
        `https://expomarg.com/api/proposals/${currentProposal.id}`,
        form
      );
      fetchProposals();
      setIsEditModalOpen(false);
      alert("Proposal updated successfully");
    } catch (err) {
      console.error("Error updating proposal:", err);
      alert("Error updating proposal");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const form = new FormData();
    form.append("title", formData.title);
    if (formData.zip) form.append("zip", formData.zip);
    if (formData.pdf) form.append("pdf", formData.pdf);
    if (formData.ppt) form.append("ppt", formData.ppt);

    try {
      await axios.post("https://expomarg.com/api/upload-proposal", form);
      fetchProposals();
      setIsAddModalOpen(false);
      setFormData({
        title: "",
        zip: null,
        pdf: null,
        ppt: null,
      });
      alert("Proposal added successfully");
    } catch (err) {
      console.error("Error adding proposal:", err);
      alert("Error adding proposal");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredProposals = proposals.filter((proposal) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      proposal.title?.toLowerCase().includes(searchTerm) ||
      proposal.zip_file_url?.toLowerCase().includes(searchTerm) ||
      proposal.pdf_file_url?.toLowerCase().includes(searchTerm) ||
      proposal.ppt_file_url?.toLowerCase().includes(searchTerm)
    );
  });

  const ProposalCard = ({ proposal, index }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs font-heading">S.No</div>
        <div className="text-xs font-body">{index + 1}</div>
        <div className="text-xs font-heading">Date/Time</div>
        <div className="text-xs font-body">
          {new Date(proposal.created_at).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </div>

        <div className="text-xs font-heading">Company Name</div>
        <div className="text-xs font-body">{proposal.title}</div>
      </div>

      <div className="mt-4 flex flex-col space-y-3">
        <div className="flex space-x-3 justify-center">
          {proposal.zip_file_url &&
            renderFileWithDownload(
              proposal.zip_file_url,
              zipIcon,
              zipDownloadIcon,
              "ZIP"
            )}
          {proposal.pdf_file_url &&
            renderFileWithDownload(
              proposal.pdf_file_url,
              pdfIcon,
              pdfDownloadIcon,
              "PDF"
            )}
          {proposal.ppt_file_url &&
            renderFileWithDownload(
              proposal.ppt_file_url,
              pptIcon,
              pptDownloadIcon,
              "PPT"
            )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleEdit(proposal)}
            className="text-blue-600 hover:text-blue-800 p-2"
            title="Edit"
          >
            <FaEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(proposal.id)}
            className="text-red-600 hover:text-red-800 p-2"
            title="Delete"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderModal = (isOpen, setIsOpen, onSubmit, title, isEdit = false) =>
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
          <h2 className="text-xl font-heading mb-4">{title}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-heading mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded font-body text-sm"
                required
              />
            </div>
            <div>
              <label className="block font-heading text-sm font-medium mb-2">
                ZIP File
              </label>
              <input
                type="file"
                name="zip"
                accept=".zip"
                onChange={handleFileChange}
                className="w-full px-3 py-2 font-body border rounded text-sm"
                {...(isEdit ? {} : { required: false })}
              />
            </div>
            <div>
              <label className="block font-heading text-sm font-medium mb-2">
                PPT File
              </label>
              <input
                type="file"
                name="ppt"
                accept=".ppt,.pptx"
                onChange={handleFileChange}
                className="w-full px-3 py-2 font-body border rounded text-sm"
                {...(isEdit ? {} : { required: false })}
              />
            </div>
            <div>
              <label className="block font-heading text-sm font-medium mb-2">
                PDF File
              </label>
              <input
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 font-body border rounded text-sm"
                {...(isEdit ? {} : { required: false })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 font-heading text-gray-700 rounded text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-heading bg-blue-600 text-white rounded text-sm"
              >
                {isEdit ? "Update" : "Add"}
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
      <div className="flex-grow p-4 md:p-8 bg-white">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <div className="flex-1 text-left"></div>
          <h1 className="text-lg md:text-3xl text-center font-heading">
            Proposals List
          </h1>
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setFormData({
                    title: "",
                    zip: null,
                    pdf: null,
                    ppt: null,
                  });
                  setIsAddModalOpen(true);
                }}
                className="flex items-center px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded font-heading text-xs md:text-sm hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Add Proposal</span>
                <span className="md:hidden">Add</span>
              </button>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "../../assets/d.pptx"; // Path to your PPTX file
                  link.download = "proposal-sample.pptx"; // File name when downloaded
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center px-2 py-1 md:px-4 md:py-2 bg-red-500 text-white rounded font-heading text-xs md:text-sm hover:bg-gray-600 transition-colors"
              >
                <FaFileAlt className="mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Proposal Sample</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title or File Name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
          />
        </div>

        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  S.No
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                  COMPANY NAME
                </th>

                <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
                  ZIP File
                </th>
                <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
                  PPT File
                </th>
                <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
                  PDF File
                </th>

                <th className="py-3 px-4 border-b text-center text-xs font-heading text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProposals.map((proposal, index) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-xs text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-900">
                    {new Date(proposal.created_at).toLocaleString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    })}
                  </td>

                  <td className="py-4 px-4 text-xs text-gray-900">
                    {proposal.title}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {proposal.zip_file_url &&
                      renderFileWithDownload(
                        proposal.zip_file_url,
                        zipIcon,
                        zipDownloadIcon,
                        "ZIP"
                      )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {proposal.ppt_file_url &&
                      renderFileWithDownload(
                        proposal.ppt_file_url,
                        pptIcon,
                        pptDownloadIcon,
                        "PPT"
                      )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {proposal.pdf_file_url &&
                      renderFileWithDownload(
                        proposal.pdf_file_url,
                        pdfIcon,
                        pdfDownloadIcon,
                        "PDF"
                      )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(proposal)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(proposal.id)}
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

        <div className="md:hidden space-y-4">
          {filteredProposals.map((proposal, index) => (
            <ProposalCard key={proposal.id} proposal={proposal} index={index} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <div className="text-gray-600">Loading...</div>
          </div>
        )}

        {!loading && filteredProposals.length === 0 && (
          <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              {proposals.length === 0
                ? "No proposals found"
                : "No matching proposals found"}
            </p>
          </div>
        )}

        {renderModal(
          isEditModalOpen,
          setIsEditModalOpen,
          handleEditSubmit,
          "Edit Proposal",
          true
        )}

        {renderModal(
          isAddModalOpen,
          setIsAddModalOpen,
          handleAddSubmit,
          "Add New Proposal"
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProposalList;
