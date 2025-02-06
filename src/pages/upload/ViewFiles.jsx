import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaFileImage,
  FaCube,
  FaArrowRight,
  FaDesktop,
  FaDownload,
  FaPaintBrush,
  FaFileInvoice,
  FaCodeBranch,
} from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5"; // Import a better upload icon
import { FiFileText } from "react-icons/fi"; // Import a file-related icon
import { LiaIndustrySolid } from "react-icons/lia";
import { TbRuler } from "react-icons/tb";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";

function ViewFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [searchParams, setSearchParams] = useState({
    design: "",
    front: "",
    depth: "",
    industry: "",
  });
  const [searched, setSearched] = useState(false);
  const [clickedFile, setClickedFile] = useState(null);

  const detailsRef = useRef(null);

  const designs = [
    { label: "1 side open", icon: <FaArrowRight size={20} /> },
    { label: "2 side open", icon: <FaCube size={20} /> },
    { label: "3 side open", icon: <FaFileImage size={20} /> },
    { label: "4 side open", icon: <FaDesktop size={20} /> },
  ];

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get("https://expomarg.com/api/industries");
        setIndustries(response.data.industries);
        localStorage.setItem(
          "industries",
          JSON.stringify(response.data.industries)
        );
      } catch (error) {
        console.error("Error fetching industries:", error);
        setErrorMessage("Error fetching industries.");
      }
    };

    const storedIndustries = localStorage.getItem("industries");
    if (storedIndustries) {
      setIndustries(JSON.parse(storedIndustries));
    } else {
      fetchIndustries();
    }

    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
  }, []);

  const handleSearch = async () => {
    const { design, front, depth, industry } = searchParams;
    const front_depth = front && depth ? `${front} X ${depth}` : "";

    try {
      setLoading(true);

      const response = await axios.get("https://expomarg.com/api/uploads", {
        params: { design, front_depth, industry },
      });
      setFiles(response.data.uploads);
      localStorage.setItem("files", JSON.stringify(response.data.uploads));
    } catch (error) {
      console.error("Error fetching files:", error);
      setErrorMessage("Error fetching files.");
    } finally {
      setLoading(false);
      setSearched(true);
      setClickedFile(null);
    }
  };

  const handleFileClick = (file) => {
    setClickedFile(file);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const FileCard = ({ file }) => {
    return (
      <div
        className="relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer group"
        onClick={() => handleFileClick(file)}
      >
        {file.file_url_2 && file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
          <div className="aspect-[4/3] relative">
            <img
              src={file.file_url_2}
              alt={file.file_number}
              className="w-full h-full object-cover"
            />
            {/* Updated overlay with centered content */}
            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-heading  text-lg mb-3">{file.design}</h4>
                <div className="space-y-2 text-sm opacity-90">
                  <p className="border-b border-white/20 pb-2 font-heading ">
                    {file.file_number}
                  </p>
                  <p className="border-b border-white/20 pb-2 font-heading ">
                    {file.industry}
                  </p>
                  <p className="border-b border-white/20 pb-2 font-heading ">
                    {file.version}
                  </p>
                  <p className="font-heading ">{file.front_depth}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const MainFileDetails = ({ file }) => {
    if (!file) return null;

    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="flex flex-col lg:flex-row">
          {file.file_url_2 && (
            <div className="lg:w-1/2">
              <img
                src={file.file_url_2}
                alt={file.file_number}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="lg:w-1/2 p-6 lg:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-medium text-gray-900 mb-2 flex items-center gap-2">
                <FiFileText className="text-lg" /> {/* Add icon */}
                {file.design}
              </h3>
              <div className="h-1 w-20 bg-[#91c848] mb-4"></div>
            </div>

            <div className="space-y-4 text-gray-600">
              <div>
                <h4 className="font-heading font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <FaFileInvoice className="text-lg" /> {/* Add icon */}
                  File Number
                </h4>
                <p className="mt-1 font-body">{file.file_number}</p>
              </div>
              <div>
                <h4 className="font-heading font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <LiaIndustrySolid className="text-lg" />
                  Industry
                </h4>
                <p className="mt-1 font-body">{file.industry}</p>
              </div>
              <div>
                <h4 className="font-heading font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <FaCodeBranch className="text-lg" />
                  Version
                </h4>
                <p className="mt-1 font-body">{file.version}</p>
              </div>
              <div>
                <h4 className="font-heading font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <TbRuler className="text-lg" />
                  Dimensions
                </h4>
                <p className="mt-1 font-body">{file.front_depth}</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={file.file_url_1}
                download
                className="inline-flex font-heading items-center px-6 py-3 bg-[#91c848] text-white rounded-lg hover:bg-[#2573b1] transition-colors duration-300"
              >
                <FaDownload className="mr-2" />
                Download File
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Define mainFile and recentFiles before using them in the JSX
  const mainFile = files.length > 0 ? files[0] : null;
  const recentFiles = files.length > 1 ? files.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Upload Button fixed at the top right, hidden on mobile */}
      <div className="absolute top-32 right-60 z-10 hidden lg:block">
        <a href="/h-upload">
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-base px-3 md:px-5 py-2 md:py-3 rounded-md flex items-center gap-2 transition-all duration-300">
            <IoCloudUploadOutline className="text-lg" /> {/* Updated icon */}
            Upload Design
          </button>
        </a>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto mb-12">
          <SearchBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            handleSearch={handleSearch}
            designs={designs}
            industries={industries}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#91c848] border-t-transparent"></div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-[#91c848] p-4 mb-8">
            <p className="text-[#91c848]">{errorMessage}</p>
          </div>
        )}

        {(clickedFile || (searched && mainFile)) && (
          <div ref={detailsRef} className="mb-16">
            <MainFileDetails file={clickedFile || mainFile} />
          </div>
        )}

        {recentFiles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading text-gray-900">
                <FaPaintBrush className="w-12 h-12 inline-block mr-2 text-[#91c848]" />{" "}
                {/* Replace image with icon */}
                Recent Designs
              </h2>
              <div className="h-px flex-1 bg-gray-200 mx-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recentFiles.map((file, index) => (
                <FileCard key={index} file={file} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ViewFiles;
