import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const EventWish = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events.filter((event) => event.checked);

    if (searchTerm) {
      filtered = filtered.filter((event) => {
        const searchFields = [
          event.exhibition_name,
          event.venue,
          event.city,
          event.existing_clients,
          new Date(event.start_date).toLocaleDateString(),
          new Date(event.end_date).toLocaleDateString(),
          event.directory_available,
        ].map((field) => (field || "").toLowerCase());

        return searchFields.some((field) =>
          field.includes(searchTerm.toLowerCase())
        );
      });
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (sortConfig.key === "start_date" || sortConfig.key === "end_date") {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.key === "directory_available") {
          const compareResult = a[sortConfig.key].localeCompare(
            b[sortConfig.key]
          );
          return sortConfig.direction === "asc"
            ? compareResult
            : -compareResult;
        }
        return 0;
      });
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, sortConfig]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://expomarg.com/api/events");
      setEvents(response.data.events);
      setError("");
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckmark = async (id, checked) => {
    try {
      await axios.put(`https://expomarg.com/api/checkmark-event/${id}`, {
        checked: !checked,
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, checked: !checked } : event
        )
      );
    } catch (err) {
      console.error("Error updating checkmark:", err);
      alert("Error updating event status");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <BiSortUp className="inline-block ml-1" />
      ) : (
        <BiSortDown className="inline-block ml-1" />
      );
    }
    return <BiSort className="inline-block ml-1" />;
  };

  const EventCard = ({ event, index }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-sm text-gray-500 mb-1">Sign No. {index + 1}</div>
          <h3 className="text-lg font-semibold text-gray-800">
            {event.exhibition_name}
          </h3>
        </div>
        <button
          onClick={() => handleCheckmark(event.id, event.checked)}
          className="focus:outline-none"
        >
          <FaCheckCircle
            className={`text-2xl ${
              event.checked ? "text-green-500" : "text-gray-300"
            }`}
          />
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Start Date:</span>{" "}
          {new Date(event.start_date).toLocaleDateString()}
        </div>

        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">End Date:</span>{" "}
          {new Date(event.end_date).toLocaleDateString()}
        </div>

        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Venue:</span> {event.venue}
        </div>

        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">City:</span> {event.city}
        </div>

        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Directory:</span>{" "}
          {event.directory_available}
        </div>

        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Existing Clients:</span>{" "}
          {event.existing_clients || "N/A"}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
          Completed Events
        </h1>

        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search completed events..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
          />
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

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No completed events found</p>
          </div>
        )}

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#2573b1]">
                <th className="py-3 px-4 text-white font-body text-sm">
                  Sign No.
                </th>
                <th className="py-3 px-4 text-white font-body text-sm">
                  Exhibition Name
                </th>
                <th
                  className="py-3 px-4 text-white font-body text-sm cursor-pointer"
                  onClick={() => handleSort("start_date")}
                >
                  <div className="flex items-center justify-center">
                    Start Date {getSortIcon("start_date")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-white font-body text-sm cursor-pointer"
                  onClick={() => handleSort("end_date")}
                >
                  <div className="flex items-center justify-center">
                    End Date {getSortIcon("end_date")}
                  </div>
                </th>
                <th className="py-3 px-4 text-white font-body text-sm">
                  Venue
                </th>
                <th className="py-3 px-4 text-white font-body text-sm">City</th>
                <th
                  className="py-3 px-4 text-white font-body text-sm cursor-pointer"
                  onClick={() => handleSort("directory_available")}
                >
                  <div className="flex items-center justify-center">
                    Directory {getSortIcon("directory_available")}
                  </div>
                </th>
                <th className="py-3 px-4 text-white font-body text-sm">
                  Existing Clients
                </th>
                <th className="py-3 px-4 text-white font-body text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">
                    {event.exhibition_name}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {new Date(event.start_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {new Date(event.end_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">{event.venue}</td>
                  <td className="py-3 px-4 border-b">{event.city}</td>
                  <td className="py-3 px-4 border-b">
                    {event.directory_available}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {event.existing_clients || "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleCheckmark(event.id, event.checked)}
                        className="focus:outline-none"
                      >
                        <FaCheckCircle
                          className={`text-xl ${
                            event.checked ? "text-green-500" : "text-gray-300"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventWish;
