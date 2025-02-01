import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CircularLoadingOverlay from "../../components/CircularLoadingOverlay ";

function HeaderUpload() {
  const [design, setDesign] = useState("");
  const [front, setFront] = useState("");
  const [depth, setDepth] = useState("");
  const [industry, setIndustry] = useState("");
  const [version, setVersion] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setErrorMessage(null);

    if (!front || !depth || isNaN(front) || isNaN(depth)) {
      setErrorMessage("Please enter valid numbers for both front and depth.");
      setLoading(false);
      return;
    }

    const frontDepth = `${front} X ${depth}`;
    const formData = new FormData();
    formData.append("design", design);
    formData.append("front_depth", frontDepth);
    formData.append("industry", industry);
    formData.append("version", version);
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      await axios.post("https://expomarg.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Files uploaded successfully.");
      navigate("/upload");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "There was an error submitting the form. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Your existing JSX */}
      <CircularLoadingOverlay isLoading={isUploading} />
      <div className="w-full px-4 py-6 md:px-6">
        <main className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h2 className="text-2xl md:text-4xl font-heading  text-black mb-5 px-4">
            Upload Your 3D Model
          </h2>

          <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="design" className="text-xl font-heading mb-2">
                  Layout
                </label>
                <select
                  id="design"
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                  className="border-2 border-gray-300 p-3 rounded-md font-body w-full"
                >
                  <option value="">Select Layout</option>
                  <option value="1 side open">1 Side Open</option>
                  <option value="2 side open">2 Side Open</option>
                  <option value="3 side open">3 Side Open</option>
                  <option value="4 side open">4 Side Open</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row md:justify-center md:space-x-5 space-y-4 md:space-y-0">
                <div className="flex flex-col w-full md:w-1/3">
                  <label htmlFor="front" className="text-xl font-heading mb-2">
                    Front Size
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      id="front"
                      value={front}
                      onChange={(e) => setFront(e.target.value)}
                      placeholder="Enter front size"
                      className="border-2 border-gray-300 p-3 rounded-md font-body w-full"
                    />
                    <span className="font-bold">X</span>
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/3">
                  <label htmlFor="depth" className="text-xl font-heading mb-2">
                    Depth Size
                  </label>
                  <input
                    type="number"
                    id="depth"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="Enter depth size"
                    className="border-2 border-gray-300 p-3  rounded-md font-body w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="industry" className="text-xl font-heading mb-2">
                  Version
                </label>
                <input
                  type="text"
                  id="industry"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="Enter industry"
                  className="border-2 border-gray-300 p-3 rounded-md font-body w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="industry" className="text-xl font-heading mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Enter industry"
                  className="border-2 border-gray-300 p-3 rounded-md font-body w-full"
                />
              </div>

              <div className="flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <label className="text-lg font-heading mb-2 block">
                    Upload 3D File
                  </label>
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <FaCloudUploadAlt size={40} className="text-blue-600" />
                    <input
                      type="file"
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 
                               file:rounded-full file:border-2 file:border-blue-600 
                               file:text-blue-600 file:bg-white hover:file:bg-blue-100"
                      onChange={handleFile1Change}
                      accept=".max"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <label className="text-lg font-heading mb-2 block">
                    Upload JPEG Image
                  </label>
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <FaCloudUploadAlt size={40} className="text-blue-600" />
                    <input
                      type="file"
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 
                               file:rounded-full file:border-2 file:border-blue-600 
                               file:text-blue-600 file:bg-white hover:file:bg-blue-100"
                      onChange={handleFile2Change}
                      accept="image/jpeg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 text-white font-heading px-6 py-3 rounded-full hover:bg-red-600 transition-all"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>

            {errorMessage && (
              <div className="mt-4 text-red-600 font-semibold">
                {errorMessage}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default HeaderUpload;
