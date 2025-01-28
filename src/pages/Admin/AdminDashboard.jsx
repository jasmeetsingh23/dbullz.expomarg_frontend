// import React, { useEffect, useState } from "react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   FaTachometerAlt,
//   FaChartBar,
//   FaUserAlt,
//   FaEye,
//   FaTh,
// } from "react-icons/fa";
// import { LineChart, Line } from "recharts";
// import axios from "axios";

// function AdminDashboard() {
//   const [summaryData, setSummaryData] = useState([]);
//   const [designCounts, setDesignCounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState("total");
//   const [totalDesign, setTotalDesign] = useState(0);

//   useEffect(() => {
//     axios
//       .get("https://expomarg.com/api/uploads/summary")
//       .then((response) => {
//         setSummaryData(response.data.summary);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching summary data:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("https://expomarg.com/api/uploads/count")
//       .then((response) => {
//         setDesignCounts(response.data.design_counts);
//         const totalUploads = response.data.total_uploads || 0;
//         setTotalDesign(totalUploads);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching design counts:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   const graphData = designCounts.map((item) => ({
//     design: item.design,
//     upload_count: item.upload_count,
//   }));

//   const filterDataByDesign = (designType) => {
//     if (designType === "total") {
//       return summaryData;
//     } else {
//       return summaryData.filter((item) => item.design === designType);
//     }
//   };

//   const CustomTooltip = ({ payload, label, active }) => {
//     if (active && payload && payload.length) {
//       const { design, upload_count } = payload[0].payload;
//       return (
//         <div className="bg-white border p-3 shadow-xl rounded-lg max-w-xs">
//           <p className="font-semibold text-blue-600">Design: {design}</p>
//           <p className="text-gray-600">Upload Count: {upload_count}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const handleDesignClick = (designType) => {
//     setSelectedDesign(designType);
//   };

//   const sideOpenCounts = {
//     oneSideOpen:
//       designCounts.find((item) => item.design === "1 side open")
//         ?.upload_count || 0,
//     twoSideOpen:
//       designCounts.find((item) => item.design === "2 side open")
//         ?.upload_count || 0,
//     threeSideOpen:
//       designCounts.find((item) => item.design === "3 side open")
//         ?.upload_count || 0,
//     fourSideOpen:
//       designCounts.find((item) => item.design === "4 side open")
//         ?.upload_count || 0,
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-xl text-blue-500 animate-pulse">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
//       {/* Main Content */}
//       <div className="flex-1 p-4 sm:p-6 lg:ml-64 space-y-6 overflow-y-auto">
//         {/* Dashboard Heading */}
//         <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-white mb-6 drop-shadow-lg flex items-center justify-center gap-2">
//           Admin Dashboard <FaTachometerAlt />
//         </h1>

//         {/* Design Type Buttons */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
//           {[
//             {
//               label: "Total Design",
//               count: totalDesign,
//               type: "total",
//               icon: <FaTh />,
//             },
//             {
//               label: "1 Side Open",
//               count: sideOpenCounts.oneSideOpen,
//               type: "1 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "2 Side Open",
//               count: sideOpenCounts.twoSideOpen,
//               type: "2 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "3 Side Open",
//               count: sideOpenCounts.threeSideOpen,
//               type: "3 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "4 Side Open",
//               count: sideOpenCounts.fourSideOpen,
//               type: "4 side open",
//               icon: <FaEye />,
//             },
//           ].map(({ label, count, type, icon }) => (
//             <div
//               key={type}
//               className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg text-center cursor-pointer"
//               onClick={() => handleDesignClick(type)}
//             >
//               <div className="text-lg sm:text-3xl mb-2">{icon}</div>
//               <h3 className="text-sm sm:text-xl font-semibold">{label}</h3>
//               <p className="text-md sm:text-2xl">{count}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph and Table */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//           {/* Left: Wave View Graph */}
//           <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6">
//             <h2 className="text-lg sm:text-2xl font-semibold text-blue-600 mb-4 text-center">
//               Wave View (Line Chart)
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={graphData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="design" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="upload_count"
//                   stroke="#FF6347"
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Right: Bar Chart */}
//           <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6">
//             <h2 className="text-lg sm:text-2xl font-semibold text-blue-600 mb-4 text-center">
//               Upload Summary (Bar Chart)
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 data={graphData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="design" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Bar dataKey="upload_count" fill="#8884d8" barSize={30} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6">
//           <h2 className="text-lg sm:text-2xl font-semibold text-blue-600 mb-4 text-center">
//             Upload Summary (Table View)
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto text-sm sm:text-base text-gray-700">
//               <thead>
//                 <tr className="bg-indigo-600 text-white">
//                   <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium uppercase">
//                     Design
//                   </th>
//                   <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium uppercase">
//                     Front Depth
//                   </th>
//                   <th className="px-4 sm:px-6 py-2 sm:py-3 text-left font-medium uppercase">
//                     Upload Count
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterDataByDesign(selectedDesign).map((item, index) => (
//                   <tr
//                     key={index}
//                     className="hover:bg-indigo-100 transition-colors duration-200"
//                   >
//                     <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
//                       {item.design}
//                     </td>
//                     <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
//                       {item.front_depth}
//                     </td>
//                     <td className="px-4 sm:px-6 py-2 sm:py-4 border-b">
//                       {item.upload_count}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FaTachometerAlt, FaEye, FaTh } from "react-icons/fa";
import { Loader2 } from "lucide-react";

function AdminDashboard() {
  const [summaryData, setSummaryData] = useState([]);
  const [designCounts, setDesignCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState("total");
  const [totalDesign, setTotalDesign] = useState(0);

  useEffect(() => {
    fetch("https://expomarg.com/api/uploads/summary")
      .then((response) => response.json())
      .then((data) => {
        setSummaryData(data.summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching summary data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://expomarg.com/api/uploads/count")
      .then((response) => response.json())
      .then((data) => {
        setDesignCounts(data.design_counts);
        setTotalDesign(data.total_uploads || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching design counts:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const graphData = designCounts.map((item) => ({
    design: item.design,
    upload_count: item.upload_count,
  }));

  const filterDataByDesign = (designType) => {
    return designType === "total"
      ? summaryData
      : summaryData.filter((item) => item.design === designType);
  };

  const CustomTooltip = ({ payload, active }) => {
    if (active && payload && payload.length) {
      const { design, upload_count } = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 p-3 shadow-lg rounded">
          <p className="font-semibold text-blue-600">Design: {design}</p>
          <p className="text-gray-600">Upload Count: {upload_count}</p>
        </div>
      );
    }
    return null;
  };

  const handleDesignClick = (designType) => {
    setSelectedDesign(designType);
  };

  const sideOpenCounts = {
    oneSideOpen:
      designCounts.find((item) => item.design === "1 side open")
        ?.upload_count || 0,
    twoSideOpen:
      designCounts.find((item) => item.design === "2 side open")
        ?.upload_count || 0,
    threeSideOpen:
      designCounts.find((item) => item.design === "3 side open")
        ?.upload_count || 0,
    fourSideOpen:
      designCounts.find((item) => item.design === "4 side open")
        ?.upload_count || 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 bg-red-50 p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-600">
            Admin Dashboard
          </h1>
          <FaTachometerAlt className="text-blue-600" />
        </div>

        {/* Design Type Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total Design",
              count: totalDesign,
              type: "total",
              icon: <FaTh />,
            },
            {
              label: "1 Side Open",
              count: sideOpenCounts.oneSideOpen,
              type: "1 side open",
              icon: <FaEye />,
            },
            {
              label: "2 Side Open",
              count: sideOpenCounts.twoSideOpen,
              type: "2 side open",
              icon: <FaEye />,
            },
            {
              label: "3 Side Open",
              count: sideOpenCounts.threeSideOpen,
              type: "3 side open",
              icon: <FaEye />,
            },
            {
              label: "4 Side Open",
              count: sideOpenCounts.fourSideOpen,
              type: "4 side open",
              icon: <FaEye />,
            },
          ].map(({ label, count, type, icon }) => (
            <button
              key={type}
              onClick={() => handleDesignClick(type)}
              className={`p-4 rounded-lg shadow-md transition-colors ${
                selectedDesign === type
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-gray-50"
              }`}
            >
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="text-sm font-medium">{label}</h3>
              <p className="text-xl mt-1">{count}</p>
            </button>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Design Uploads Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="design"
                  stroke="#2563EB
"
                />
                <YAxis
                  stroke="#2563EB
"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="upload_count"
                  stroke="#2563EB
"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Upload Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="design"
                  stroke="#2563EB
"
                />
                <YAxis
                  stroke="#2563EB
"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="upload_count"
                  fill="#2563EB
"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Upload Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Design
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Front Depth
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Upload Count
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filterDataByDesign(selectedDesign).map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {item.design}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {item.front_depth}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {item.upload_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
