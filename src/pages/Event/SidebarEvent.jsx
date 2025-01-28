import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    exhibitionName: "",
    startDate: "",
    endDate: "",
    venue: "",
    city: "",
    directoryAvailable: "",
    existingClients: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://expomarg.com/api/events");
      setEvents(response.data.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`https://expomarg.com/api/delete-event/${id}`);
        alert("Event deleted successfully!");
        fetchEvents();
      } catch (err) {
        alert("Error deleting event");
      }
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setNewEventData({
      exhibitionName: event.exhibition_name,
      startDate: event.start_date,
      endDate: event.end_date,
      venue: event.venue,
      city: event.city,
      directoryAvailable: event.directory_available,
      existingClients: event.existing_clients ? event.existing_clients : "",
    });
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://expomarg.com/api/update-event/${currentEvent.id}`,
        {
          exhibitionName: newEventData.exhibitionName,
          startDate: newEventData.startDate,
          endDate: newEventData.endDate,
          venue: newEventData.venue,
          city: newEventData.city,
          directoryAvailable: newEventData.directoryAvailable,
          existingClients: newEventData.existingClients
            .split(",")
            .map((client) => client.trim()),
        }
      );
      alert("Event updated successfully!");
      fetchEvents();
      setShowUpdateModal(false);
    } catch (err) {
      alert("Error updating event");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEventData({
      ...newEventData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const EventCard = ({ event, index }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs font-heading">S.No</div>
        <div className="text-xs font-body">{index + 1}</div>
        <div className="text-xs font-heading">Exhibition Name</div>
        <div className="text-xs font-body">{event.exhibition_name}</div>

        <div className="text-xs font-heading">Start Date</div>
        <div className="text-xs font-body">
          {(() => {
            const date = new Date(event.start_date); // Replace 'event.start_date' with your date field
            const day = date.getDate();
            const month = date
              .toLocaleString("en-US", { month: "short" })
              .toLowerCase();
            const year = date.getFullYear();
            return `${day},${month},${year}`;
          })()}
        </div>

        <div className="text-xs font-heading">End Date</div>
        <div className="text-xs font-body">
          {(() => {
            const date = new Date(event.end_date); // Use the event's end_date
            const day = date.getDate();
            const month = date
              .toLocaleString("en-US", { month: "short" })
              .toLowerCase();
            const year = date.getFullYear();
            return `${day},${month},${year}`;
          })()}
        </div>

        <div className="text-xs font-heading">Venue</div>
        <div className="text-xs font-body">{event.venue}</div>

        <div className="text-xs font-heading">City</div>
        <div className="text-xs font-body">{event.city}</div>

        <div className="text-xs font-heading">Directory Available</div>
        <div className="text-xs font-body">
          {event.directory_available ? "Yes" : "No"}
        </div>

        <div className="text-xs font-heading">Existing Clients</div>
        <div className="text-xs font-body">
          {event.existing_clients || "N/A"}
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => handleEdit(event)}
          className="text-blue-600 hover:text-blue-800 p-2"
          title="Edit"
        >
          <FaEdit size={20} />
        </button>
        <button
          onClick={() => handleDelete(event.id)}
          className="text-red-600 hover:text-red-800 p-2"
          title="Delete"
        >
          <FaTrashAlt size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-white">
      <h1 className="text-2xl md:text-3xl mb-6 text-center font-heading">
        Event List
      </h1>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left text-xs font-heading text-black uppercase tracking-wider">
                S.No
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                Exhibition Name
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                Start Date
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                End Date
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                Venue
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                City
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                Directory Available
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-heading uppercase tracking-wider">
                Existing Clients
              </th>
              <th className="py-3 px-4 border-b text-center text-xs font-heading uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-xs text-gray-900">{index + 1}</td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {event.exhibition_name}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {(() => {
                    const date = new Date(event.start_date); // Use the event's start_date
                    const day = date.getDate();
                    const month = date
                      .toLocaleString("en-US", { month: "short" })
                      .toLowerCase();
                    const year = date.getFullYear();
                    return `${day},${month},${year}`;
                  })()}
                </td>

                <td className="py-4 px-4 text-xs text-gray-900">
                  {(() => {
                    const date = new Date(event.end_date); // Use the event's end_date
                    const day = date.getDate();
                    const month = date
                      .toLocaleString("en-US", { month: "short" })
                      .toLowerCase();
                    const year = date.getFullYear();
                    return `${day},${month},${year}`;
                  })()}
                </td>

                <td className="py-4 px-4 text-xs text-gray-900">
                  {event.venue}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {event.city}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {event.directory_available}
                </td>
                <td className="py-4 px-4 text-xs text-gray-900">
                  {event.existing_clients || "N/A"}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
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

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-heading">
                  Exhibition Name
                </label>
                <input
                  type="text"
                  name="exhibitionName"
                  value={newEventData.exhibitionName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-heading">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newEventData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-heading">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={newEventData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-heading">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={newEventData.venue}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-heading">City</label>
                <input
                  type="text"
                  name="city"
                  value={newEventData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-heading">
                  Directory Available (Enter Yes or No)
                </label>
                <input
                  type="text"
                  name="directoryAvailable"
                  value={newEventData.directoryAvailable}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs font-heading">
                  Existing Clients (Comma Separated)
                </label>
                <input
                  type="text"
                  name="existingClients"
                  value={newEventData.existingClients}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="text-gray-600">Loading...</div>
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No events found</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
