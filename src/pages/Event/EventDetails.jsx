import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaHeart, FaPlus, FaRegCircle } from "react-icons/fa";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [events, filter, searchTerm]);

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

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      if (key === "start_date" || key === "end_date") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else if (key === "directory_available") {
        if (a[key] === "Yes" && b[key] === "No")
          return direction === "asc" ? -1 : 1;
        if (a[key] === "No" && b[key] === "Yes")
          return direction === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });

    setFilteredEvents(sortedEvents);
    setSortConfig({ key, direction });
  };

  const applyFilter = () => {
    let filteredData = events;

    if (filter !== "All") {
      const isAvailable = filter === "Yes";
      filteredData = filteredData.filter(
        (event) => event.directory_available === (isAvailable ? "Yes" : "No")
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter((event) => {
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

    setFilteredEvents(filteredData);
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

  const handleClientChange = (id, selectedClient) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, existing_clients: selectedClient } : event
      )
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <BiSortUp /> : <BiSortDown />;
    }
    return <BiSort />;
  };

  // Card component for mobile view
  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {event.exhibition_name}
        </h3>
        <button
          onClick={() => handleCheckmark(event.id, event.checked)}
          className="text-2xl"
        >
          {event.checked ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaRegCircle className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="bg-gray-50 p-2 rounded">
          <span className="font-medium">Dates:</span>{" "}
          {new Date(event.start_date).toLocaleDateString()} -{" "}
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

        {event.existing_clients && event.existing_clients !== "N/A" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Existing Clients
            </label>
            <select
              value={event.existing_clients}
              onChange={(e) => handleClientChange(event.id, e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
            >
              {event.existing_clients.split(",").map((client, index) => (
                <option key={index} value={client.trim()}>
                  {client.trim()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-grow p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl text-center font-heading w-full">
            Event List
          </h1>
          <div className="ml-auto flex gap-1 md:gap-2">
            <a href="/h-event">
              <button className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-base px-2 md:px-4 py-1 md:py-2 rounded-md flex items-center whitespace-nowrap">
                <FaPlus className="mr-1 md:mr-2 text-sm md:text-base" /> Add
                Event
              </button>
            </a>
            <a href="/EventWish">
              <button className="bg-[#2573b1] hover:bg-[#1e5c8f] text-white text-xs md:text-base px-2 md:px-4 py-1 md:py-2 rounded-md flex items-center whitespace-nowrap">
                <FaHeart className="mr-1 md:mr-2 text-sm md:text-base" />{" "}
                Wishlist
              </button>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
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

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto mt-8">
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
                  <td className="py-3 px-4 border-b ">{index + 1}</td>
                  <td className="py-3 px-4 border-b">
                    {event.exhibition_name}
                  </td>
                  <td className="py-3 px-4 border-b ">
                    {new Date(event.start_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b ">
                    {new Date(event.end_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">{event.venue}</td>
                  <td className="py-3 px-4 border-b">{event.city}</td>
                  <td className="py-3 px-4 border-b ">
                    {event.directory_available}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {event.existing_clients &&
                    event.existing_clients !== "N/A" ? (
                      <select
                        value={event.existing_clients}
                        onChange={(e) =>
                          handleClientChange(event.id, e.target.value)
                        }
                        className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#2573b1] focus:border-[#2573b1]"
                      >
                        {event.existing_clients
                          .split(",")
                          .map((client, index) => (
                            <option key={index} value={client.trim()}>
                              {client.trim()}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleCheckmark(event.id, event.checked)}
                      className="flex  items-center w-full"
                    >
                      {event.checked ? (
                        <FaCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <FaRegCircle className="text-gray-400 text-xl" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
