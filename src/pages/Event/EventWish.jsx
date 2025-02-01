// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaCheckCircle } from "react-icons/fa";
// import { FiSearch } from "react-icons/fi";
// import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// const EventWish = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     let filtered = events.filter((event) => event.checked);

//     if (searchTerm) {
//       filtered = filtered.filter((event) => {
//         const searchFields = [
//           event.exhibition_name,
//           event.venue,
//           event.city,
//           event.existing_clients,
//           new Date(event.start_date).toLocaleDateString(),
//           new Date(event.end_date).toLocaleDateString(),
//           event.directory_available,
//         ].map((field) => (field || "").toLowerCase());

//         return searchFields.some((field) =>
//           field.includes(searchTerm.toLowerCase())
//         );
//       });
//     }

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         if (sortConfig.key === "start_date" || sortConfig.key === "end_date") {
//           const dateA = new Date(a[sortConfig.key]);
//           const dateB = new Date(b[sortConfig.key]);
//           return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
//         } else if (sortConfig.key === "directory_available") {
//           const compareResult = a[sortConfig.key].localeCompare(
//             b[sortConfig.key]
//           );
//           return sortConfig.direction === "asc"
//             ? compareResult
//             : -compareResult;
//         }
//         return 0;
//       });
//     }

//     setFilteredEvents(filtered);
//   }, [events, searchTerm, sortConfig]);

//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("https://expomarg.com/api/events");
//       setEvents(response.data.events);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching events:", err);
//       setError("Failed to fetch events. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCheckmark = async (id, checked) => {
//     try {
//       await axios.put(`https://expomarg.com/api/checkmark-event/${id}`, {
//         checked: !checked,
//       });
//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event.id === id ? { ...event, checked: !checked } : event
//         )
//       );
//     } catch (err) {
//       console.error("Error updating checkmark:", err);
//       alert("Error updating event status");
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "asc" ? (
//         <BiSortUp className="inline-block ml-1" />
//       ) : (
//         <BiSortDown className="inline-block ml-1" />
//       );
//     }
//     return <BiSort className="inline-block ml-1" />;
//   };

//   const EventCard = ({ event, index }) => (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <div className="text-sm text-gray-500 mb-1">Sign No. {index + 1}</div>
//           <h3 className="text-lg font-semibold text-gray-800">
//             {event.exhibition_name}
//           </h3>
//         </div>
//         <button
//           onClick={() => handleCheckmark(event.id, event.checked)}
//           className="focus:outline-none"
//         >
//           <FaCheckCircle
//             className={`text-2xl ${
//               event.checked ? "text-green-500" : "text-gray-300"
//             }`}
//           />
//         </button>
//       </div>

//       <div className="space-y-2 text-sm text-gray-600">
//         <div className="bg-gray-50 p-2 rounded">
//           <span className="font-medium">Start Date:</span>{" "}
//           {new Date(event.start_date).toLocaleDateString()}
//         </div>

//         <div className="bg-gray-50 p-2 rounded">
//           <span className="font-medium">End Date:</span>{" "}
//           {new Date(event.end_date).toLocaleDateString()}
//         </div>

//         <div className="bg-gray-50 p-2 rounded">
//           <span className="font-medium">Venue:</span> {event.venue}
//         </div>

//         <div className="bg-gray-50 p-2 rounded">
//           <span className="font-medium">City:</span> {event.city}
//         </div>

//         <div className="bg-gray-50 p-2 rounded">
//           <span className="font-medium">Directory:</span>{" "}
//           {event.directory_available}
//         </div>

//         <div className="bg-gray-50 p-2 rounded">
//           <span className="font-medium">Existing Clients:</span>{" "}
//           {event.existing_clients || "N/A"}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />
//       <div className="flex-grow p-4 md:p-8">
//         <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
//           Completed Events
//         </h1>

//         <div className="relative mb-6">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search completed events..."
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
//           />
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <p className="text-gray-600">Loading events...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-8">
//             <p className="text-red-500">{error}</p>
//           </div>
//         )}

//         {!loading && !error && filteredEvents.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-600">No completed events found</p>
//           </div>
//         )}

//         <div className="hidden md:block overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//             <thead>
//               <tr className="bg-[#2573b1]">
//                 <th className="py-3 px-4 text-white font-body text-sm">
//                   Sign No.
//                 </th>
//                 <th className="py-3 px-4 text-white font-body text-sm">
//                   Exhibition Name
//                 </th>
//                 <th
//                   className="py-3 px-4 text-white font-body text-sm cursor-pointer"
//                   onClick={() => handleSort("start_date")}
//                 >
//                   <div className="flex items-center justify-center">
//                     Start Date {getSortIcon("start_date")}
//                   </div>
//                 </th>
//                 <th
//                   className="py-3 px-4 text-white font-body text-sm cursor-pointer"
//                   onClick={() => handleSort("end_date")}
//                 >
//                   <div className="flex items-center justify-center">
//                     End Date {getSortIcon("end_date")}
//                   </div>
//                 </th>
//                 <th className="py-3 px-4 text-white font-body text-sm">
//                   Venue
//                 </th>
//                 <th className="py-3 px-4 text-white font-body text-sm">City</th>
//                 <th
//                   className="py-3 px-4 text-white font-body text-sm cursor-pointer"
//                   onClick={() => handleSort("directory_available")}
//                 >
//                   <div className="flex items-center justify-center">
//                     Directory {getSortIcon("directory_available")}
//                   </div>
//                 </th>
//                 <th className="py-3 px-4 text-white font-body text-sm">
//                   Existing Clients
//                 </th>
//                 <th className="py-3 px-4 text-white font-body text-sm">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEvents.map((event, index) => (
//                 <tr key={event.id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{index + 1}</td>
//                   <td className="py-3 px-4 border-b">
//                     {event.exhibition_name}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {new Date(event.start_date).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {new Date(event.end_date).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 border-b">{event.venue}</td>
//                   <td className="py-3 px-4 border-b">{event.city}</td>
//                   <td className="py-3 px-4 border-b">
//                     {event.directory_available}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     {event.existing_clients || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     <div className="flex justify-center">
//                       <button
//                         onClick={() => handleCheckmark(event.id, event.checked)}
//                         className="focus:outline-none"
//                       >
//                         <FaCheckCircle
//                           className={`text-xl ${
//                             event.checked ? "text-green-500" : "text-gray-300"
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="md:hidden space-y-4">
//           {filteredEvents.map((event, index) => (
//             <EventCard key={event.id} event={event} index={index} />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default EventWish;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import t from "../../assets/t.png";
import c from "../../assets/c.png";
import g from "../../assets/g.png";
import t1 from "../../assets/t1.png";
import l from "../../assets/l.png";
import d from "../../assets/d.png";

const EventWish = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://expomarg.com/api/events");
      // Only filter the events to show those with checked status as true
      const checkedEvents = response.data.events.filter(
        (event) => event.checked
      );
      setEvents(checkedEvents);
      setError("");
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const EventCell = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-body text-gray-800 truncate flex items-center">
            {/* Image next to the exhibition name */}
            <img
              src={g} // Replace with the actual image path
              alt="Exhibition Icon"
              className="w-6 h-6 mr-2" // Adjust the size as needed
            />
            {event.exhibition_name}
          </h3>

          <div className="text-sm font-body text-gray-600 flex items-center">
            {/* Image next to the date */}
            <img
              src={t1} // Replace with the actual image path
              alt="Date Icon"
              className="w-5 h-5 mr-2" // Adjust the size as needed
            />
            {new Date(event.start_date).getDate()} -{" "}
            {new Date(event.end_date).getDate()}{" "}
            {new Date(event.start_date).toLocaleString("default", {
              month: "short",
            })}
          </div>

          <div className="text-sm font-body text-gray-600 truncate flex items-center">
            {/* Image next to the venue name */}
            <img
              src={l} // Replace with the actual image path
              alt="Venue Icon"
              className="w-5 h-5 mr-2" // Adjust size as needed
            />
            {event.venue}
          </div>
        </div>
        {/* Show directory_available with React Icons */}
        <div className="ml-4 flex items-center">
          {/* Add Image next to Directory text */}
          <img
            src={d} // Replace with the actual image path
            alt="Directory Icon"
            className="w-5 h-5 mr-2" // Adjust size as needed
          />
          <span className="text-sm font-body text-gray-600">Directory: </span>
          {event.directory_available === "Yes" ? (
            <FaCheckCircle className="ml-2 text-green-600" />
          ) : (
            <FaTimesCircle className="ml-2 text-red-600" />
          )}
        </div>
      </div>
    </div>
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthGroups = months.reduce((acc, month, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(month);
    return acc;
  }, []);

  const totalPages = monthGroups.length;
  const currentMonths = monthGroups[currentPage] || [];

  // Mobile month selector component
  const MonthSelector = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="grid grid-cols-2 gap-2">
        {currentMonths.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`p-3 rounded-lg text-center ${
              selectedMonth === month
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );

  // Mobile events view component
  const MobileEventsView = () => {
    const monthEvents = events.filter((event) => {
      if (!selectedMonth) return false;
      const eventDate = new Date(event.start_date);
      const eventMonth = eventDate.toLocaleString("default", {
        month: "short",
      });
      return eventMonth === selectedMonth.slice(0, 3);
    });

    return (
      <div className="space-y-4 ">
        {monthEvents.map((event, index) => (
          <EventCell key={event.id || index} event={event} />
        ))}
        {monthEvents.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No events for {selectedMonth}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow p-4 md:p-8 max-w-8xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-heading flex items-center">
            {/* Image next to the "Events Calendar" text */}
            <img
              src={t}
              alt="Calendar Icon"
              className="w-8 h-8 mr-2" // Adjust size as needed
            />
            Events Calendar
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <FiGrid className="hidden md:block" />
              <span className="md:hidden">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <FiList className="hidden md:block" />
              <span className="md:hidden">List</span>
            </button>
          </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-heading text-gray-800 mb-4 flex items-center">
            {/* Image next to the "IMPORTANT DATES" text */}
            <img
              src={c} // Replace with the actual image path
              alt="Important Dates Icon"
              className="w-6 h-6 mr-2" // Adjust the image size
            />
            IMPORTANT DATES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-2 rounded font-body">
              Navratri: 22 Sep - 2 Oct 2025
            </div>

            <div className="bg-gray-50 p-2 rounded font-body">
              Dusera: 02-Oct-25
            </div>
            <div className="bg-gray-50 p-2 rounded font-body">
              Diwali: 20-oct-25
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className=" mt-8 flex justify-between items-center mb-4">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(0, prev - 1));
              setSelectedMonth(null);
            }}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              currentPage === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaChevronLeft />
            <span className="hidden md:inline font-body">Previous</span>
          </button>
          <span className="text-gray-600 text-sm font-body md:text-base">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
              setSelectedMonth(null);
            }}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              currentPage === totalPages - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <span className="hidden md:inline font-body">Next</span>
            <FaChevronRight />
          </button>
        </div>

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

        {!loading && !error && (
          <>
            {/* Mobile View */}
            <div className="md:hidden">
              <MonthSelector />
              {selectedMonth && <MobileEventsView />}
              {!selectedMonth && (
                <div className="text-center py-4 text-gray-500">
                  Select a month to view events
                </div>
              )}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:block">
              {viewMode === "grid" && (
                <div className="overflow-x-auto pb-4">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden border border-gray-300 rounded-lg shadow-sm">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr className="bg-[#2573b1]">
                            {currentMonths.map((month) => (
                              <th
                                key={month}
                                className="py-4 px-6 text-white font-heading text-base whitespace-nowrap"
                              >
                                {month}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr>
                            {currentMonths.map((month) => (
                              <td
                                key={month}
                                className="border-b border-gray-300 align-top p-4"
                              >
                                <div className="space-y-4 min-w-[300px]">
                                  {events
                                    .filter((event) => {
                                      const eventDate = new Date(
                                        event.start_date
                                      );
                                      const eventMonth =
                                        eventDate.toLocaleString("default", {
                                          month: "short",
                                        });
                                      return eventMonth === month.slice(0, 3);
                                    })
                                    .map((event, index) => (
                                      <EventCell
                                        key={event.id || index}
                                        event={event}
                                      />
                                    ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop List View */}
              {viewMode === "list" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentMonths.map((month) => {
                    const monthEvents = events.filter((event) => {
                      const eventDate = new Date(event.start_date);
                      const eventMonth = eventDate.toLocaleString("default", {
                        month: "short",
                      });
                      return eventMonth === month.slice(0, 3);
                    });

                    if (monthEvents.length === 0) return null;

                    return (
                      <div
                        key={month}
                        className="bg-white rounded-lg shadow-md p-4"
                      >
                        <h2 className="text-xl font-semibold mb-4">{month}</h2>
                        <div className="space-y-4">
                          {monthEvents.map((event, index) => (
                            <EventCell key={event.id || index} event={event} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventWish;
