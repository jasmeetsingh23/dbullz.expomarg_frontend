import React from "react";
import arrowIcon from "../assets/d1.png"; // Importing the image from assets folder

const StatusDropdown = ({ value, onChange, id }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "design pending":
        return "bg-red-500";
      case "in process":
        return "bg-yellow-500";
      case "design submitted":
        return "bg-green-500";
      case "revise pending":
        return "bg-red-500";
      case "revise done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const StatusOption = ({ value, children }) => (
    <option value={value}>{children}</option>
  );

  return (
    <div className="relative inline-block w-full">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(value)}`} />
      </div>
      <select
        value={value}
        onChange={onChange}
        className="w-full pl-6 pr-2 py-1 border rounded appearance-none bg-white"
      >
        <StatusOption value="design pending">Design Pending</StatusOption>
        <StatusOption value="in process">In Process</StatusOption>
        <StatusOption value="design submitted">Design Submitted</StatusOption>
        <StatusOption value="revise pending">Revise Pending</StatusOption>
        <StatusOption value="revise done">Revise Done</StatusOption>
      </select>
      {/* Using the image for the arrow icon */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <img src={arrowIcon} alt="Dropdown Arrow" className="w-3 h-3" />
      </div>
    </div>
  );
};

export default StatusDropdown;
