// import React, { useState, useEffect } from "react";

// const SearchBar = ({
//   searchParams,
//   setSearchParams,
//   handleSearch,
//   designs,
//   industries,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     // <div className="relative z-10 bg-white p-4 shadow-md">
//     <div>
//       <div className="flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
//         {/* Select Stall Layout */}
//         <div className="w-full sm:w-[25%]">
//           <h2 className=" font-heading text-sm text-black mb-2">
//             Select Stall Layout
//           </h2>
//           <div
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="cursor-pointer block w-full mt-2 p-1 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <div className="flex items-center">
//               {searchParams.design ? (
//                 <>
//                   {
//                     designs.find(
//                       (design) => design.label === searchParams.design
//                     )?.icon
//                   }
//                   <span className="ml-2">{searchParams.design}</span>
//                 </>
//               ) : (
//                 <span className="text-sm font-heading">Select Design</span>
//               )}
//             </div>
//           </div>
//           {isDropdownOpen && (
//             <div className="absolute mt-2 w-full sm:w-[20%] border-2 border-gray-300 bg-white shadow-lg z-10 rounded-md">
//               {designs.map((design, index) => (
//                 <div
//                   key={index}
//                   onClick={() => {
//                     const updatedSearchParams = {
//                       ...searchParams,
//                       design: design.label,
//                     };
//                     setSearchParams(updatedSearchParams);
//                     localStorage.setItem(
//                       "searchParams",
//                       JSON.stringify(updatedSearchParams)
//                     );
//                     setIsDropdownOpen(false);
//                   }}
//                   className="flex items-center p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
//                 >
//                   {design.icon}
//                   <span className="ml-2">{design.label}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Enter Stall Size */}
//         <div className="w-full sm:w-[25%]">
//           <h2 className=" font-heading text-sm text-black mb-2">
//             Enter Stall Size (In Meters)
//           </h2>
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               placeholder="Front"
//               value={searchParams.front}
//               onChange={(e) => {
//                 const updatedSearchParams = {
//                   ...searchParams,
//                   front: e.target.value,
//                 };
//                 setSearchParams(updatedSearchParams);
//                 localStorage.setItem(
//                   "searchParams",
//                   JSON.stringify(updatedSearchParams)
//                 );
//               }}
//               className="border-2 p-1 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="text-sm font-heading text-black">X</span>
//             <input
//               type="text"
//               placeholder="Depth"
//               value={searchParams.depth}
//               onChange={(e) => {
//                 const updatedSearchParams = {
//                   ...searchParams,
//                   depth: e.target.value,
//                 };
//                 setSearchParams(updatedSearchParams);
//                 localStorage.setItem(
//                   "searchParams",
//                   JSON.stringify(updatedSearchParams)
//                 );
//               }}
//               className="border-2 p-1 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Select Industry */}
//         <div className="w-full sm:w-[25%]">
//           <h2 className=" font-heading text-sm text-black mb-2">
//             Select Industry (Optional)
//           </h2>
//           <select
//             value={searchParams.industry}
//             onChange={(e) => {
//               const updatedSearchParams = {
//                 ...searchParams,
//                 industry: e.target.value,
//               };
//               setSearchParams(updatedSearchParams);
//               localStorage.setItem(
//                 "searchParams",
//                 JSON.stringify(updatedSearchParams)
//               );
//             }}
//             className="border-2 p-1 font-heading text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Industry</option>
//             {industries.map((industry, index) => (
//               <option key={index} value={industry}>
//                 {industry}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Search Button */}
//         <div className="w-full sm:w-[10%] mt-4 sm:mt-9">
//           <button
//             onClick={handleSearch}
//             className="bg-gradient-to-r from-[#91c848] font-heading text-sm to-[#4caf50] text-white px-4 py-2 mt-9 rounded-md w-full  transition-all duration-300"
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SearchBar = ({
  searchParams,
  setSearchParams,
  handleSearch,
  designs,
  industries,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative z-10 bg-white p-4 shadow-md">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* Select Stall Layout */}
        <div className="w-full md:w-[25%]">
          <h2 className="font-heading text-sm text-black mb-2">
            Select Stall Layout
          </h2>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer w-full h-10 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between px-3 bg-white relative"
          >
            <div className="flex items-center">
              {searchParams.design ? (
                <>
                  {
                    designs.find(
                      (design) => design.label === searchParams.design
                    )?.icon
                  }
                  <span className="ml-2">{searchParams.design}</span>
                </>
              ) : (
                <span className="text-sm font-heading">Select Design</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-1 w-full md:w-[25%] border-2 border-gray-300 bg-white shadow-lg z-10 rounded-md">
              {designs.map((design, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const updatedSearchParams = {
                      ...searchParams,
                      design: design.label,
                    };
                    setSearchParams(updatedSearchParams);
                    localStorage.setItem(
                      "searchParams",
                      JSON.stringify(updatedSearchParams)
                    );
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  {design.icon}
                  <span className="ml-2">{design.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enter Stall Size */}
        <div className="w-full md:w-[25%]">
          <h2 className="font-heading text-sm text-black mb-2">
            Enter Stall Size (In Meters)
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Front"
              value={searchParams.front}
              onChange={(e) => {
                const updatedSearchParams = {
                  ...searchParams,
                  front: e.target.value,
                };
                setSearchParams(updatedSearchParams);
                localStorage.setItem(
                  "searchParams",
                  JSON.stringify(updatedSearchParams)
                );
              }}
              className="border-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 px-3"
            />
            <span className="text-sm font-heading text-black">X</span>
            <input
              type="text"
              placeholder="Depth"
              value={searchParams.depth}
              onChange={(e) => {
                const updatedSearchParams = {
                  ...searchParams,
                  depth: e.target.value,
                };
                setSearchParams(updatedSearchParams);
                localStorage.setItem(
                  "searchParams",
                  JSON.stringify(updatedSearchParams)
                );
              }}
              className="border-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 px-3"
            />
          </div>
        </div>

        {/* Select Industry */}
        <div className="w-full md:w-[25%]">
          <h2 className="font-heading text-sm text-black mb-2">
            Select Industry (Optional)
          </h2>
          <div className="relative">
            <select
              value={searchParams.industry}
              onChange={(e) => {
                const updatedSearchParams = {
                  ...searchParams,
                  industry: e.target.value,
                };
                setSearchParams(updatedSearchParams);
                localStorage.setItem(
                  "searchParams",
                  JSON.stringify(updatedSearchParams)
                );
              }}
              className="border-2 font-heading text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 px-3 bg-white appearance-none"
            >
              <option value="">Select Industry</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full md:w-[25%]">
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#91c848] to-[#4caf50] text-white rounded-md w-full font-heading text-sm transition-all duration-300 h-10"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
