import React, { useState } from "react";
import axios from "axios";
import {
  FaFileUpload,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa"; // Importing icons
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";

const HeaderAddDirectory = () => {
  const [formData, setFormData] = useState({
    exhibitionName: "",
    year: "",
    venue: "",
    document: null,
  });
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append("exhibitionName", formData.exhibitionName);
    formDataObj.append("year", formData.year);
    formDataObj.append("venue", formData.venue);
    if (formData.document) {
      formDataObj.append("document", formData.document);
    }

    try {
      const response = await axios.post(
        "https://expomarg.com/api/add-directory",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setFormData({
        exhibitionName: "",
        year: "",
        venue: "",
        document: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Your existing JSX */}
      <CircularLoadingOverlay isLoading={isUploading} />
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-10">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-heading  text-gray-800 text-center mb-6">
              Add Exhibition Directory
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Exhibition Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="exhibitionName"
                    className=" text-lg  font-heading text-gray-700 flex items-center"
                  >
                    <FaEdit className="mr-2 text-blue-600" /> Exhibition Name
                  </label>
                  <input
                    type="text"
                    id="exhibitionName"
                    name="exhibitionName"
                    value={formData.exhibitionName}
                    onChange={handleInputChange}
                    placeholder="Enter exhibition name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-body"
                    required
                  />
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label
                    htmlFor="year"
                    className=" text-lg  font-heading text-gray-700 flex items-center"
                  >
                    <FaCalendarAlt className="mr-2 text-blue-600" /> Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Enter year (e.g., 2024)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 font-body focus:border-blue-600"
                    required
                  />
                </div>

                {/* Venue */}
                <div className="space-y-2">
                  <label
                    htmlFor="venue"
                    className=" text-lg  font-heading text-gray-700 flex items-center"
                  >
                    <FaMapMarkerAlt className="mr-2 text-blue-600" /> Venue
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="Enter venue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm font-body focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    required
                  />
                </div>

                {/* Upload Document */}
                <div className="space-y-2">
                  <label
                    htmlFor="document"
                    className=" text-lg  font-heading text-gray-700 flex items-center"
                  >
                    <FaFileUpload className="mr-2 text-blue-600" /> Upload
                    Document
                  </label>
                  <input
                    type="file"
                    id="document"
                    name="document"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border font-body border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200  font-heading text-lg flex items-center justify-center"
              >
                <FaFileUpload className="mr-2" /> Add Directory
              </button>
            </form>

            {/* Display message after submission */}
            {message && (
              <div className="mt-4 text-center text-lg font-medium text-gray-700">
                {message}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HeaderAddDirectory;
