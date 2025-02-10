// import { useState, useEffect } from "react";
// import jsPDF from "jspdf";

// const GenerateAuthorityLetter = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     exhibitionName: "",
//     exhibitorName: "",
//     venue: "",
//     eventDateFrom: "",
//     eventDateTo: "",
//     stallNo: "",
//     hallNo: "",
//     stallSize: "",
//     topDate: "",
//   });

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString("en-GB", { month: "short" });
//     const year = date.getFullYear();
//     const suffix =
//       ["st", "nd", "rd"][((((day + 90) % 100) - 10) % 10) - 1] || "th";
//     return `${day}${suffix} ${month} ${year}`;
//   };

//   const generatePDF = () => {
//     const {
//       exhibitionName,
//       exhibitorName,
//       venue,
//       eventDateFrom,
//       eventDateTo,
//       stallNo,
//       hallNo,
//       stallSize,
//       topDate,
//     } = formData;

//     const formattedTopDate = formatDate(topDate);
//     const formattedEventDateFrom = formatDate(eventDateFrom);
//     const formattedEventDateTo = formatDate(eventDateTo);

//     const doc = new jsPDF();

//     doc.setFont("helvetica", "normal"); // Use Helvetica as a substitute for Calibri
//     doc.setFontSize(10); // Slightly smaller text size

//     // Date at the top
//     doc.setFont("helvetica", "bold");
//     doc.text(`Date: ${formattedTopDate}`, 180, 15, { align: "right" });

//     // Title of the letter
//     doc.setFontSize(14);
//     doc.text("Authority Letter", doc.internal.pageSize.width / 2, 35, {
//       align: "center",
//     });

//     // Body Content
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");

//     let yPos = 50;

//     doc.text(
//       "We hereby authorize M/s Design Bullz Private Limited, Plot # C-127/7, First Floor,",
//       20,
//       yPos
//     );
//     yPos += 8;
//     doc.text(
//       "Street No.23, Block – C, Rama Vihar, Delhi – 110081 to fabricate & install our stalls in",
//       20,
//       yPos
//     );
//     yPos += 8;

//     doc.setFont("helvetica", "bold");
//     doc.text(exhibitionName, 20, yPos);
//     let xPos = 20 + doc.getTextWidth(exhibitionName);
//     doc.setFont("helvetica", "normal");
//     doc.text(" on behalf of M/s ", xPos, yPos);
//     xPos += doc.getTextWidth(" on behalf of M/s ");
//     doc.setFont("helvetica", "bold");
//     doc.text(exhibitorName, xPos, yPos);
//     xPos += doc.getTextWidth(exhibitorName);
//     doc.setFont("helvetica", "normal");
//     doc.text(", to be held at ", xPos, yPos);
//     xPos += doc.getTextWidth(", to be held at ");
//     doc.setFont("helvetica", "bold");
//     doc.text(venue, xPos, yPos);
//     yPos += 8;

//     doc.setFont("helvetica", "normal");
//     doc.text("from ", 20, yPos);
//     xPos = 20 + doc.getTextWidth("from ");
//     doc.setFont("helvetica", "bold");
//     doc.text(formattedEventDateFrom, xPos, yPos);
//     xPos += doc.getTextWidth(formattedEventDateFrom);
//     doc.setFont("helvetica", "normal");
//     doc.text(" to ", xPos, yPos);
//     xPos += doc.getTextWidth(" to ");
//     doc.setFont("helvetica", "bold");
//     doc.text(formattedEventDateTo, xPos, yPos);
//     yPos += 15;

//     doc.setFont("helvetica", "bold");
//     doc.text("This authority is issued with regards to:", 20, yPos);
//     yPos += 10;

//     doc.text(`Hall No: ${hallNo}`, 20, yPos);
//     yPos += 8;
//     doc.text(`Stall No: ${stallNo}`, 20, yPos);
//     yPos += 8;
//     doc.text(`Stall Size: ${stallSize}`, 20, yPos);
//     yPos += 30;

//     doc.setFont("helvetica", "bold");
//     doc.text("Authorized Signatory", 180, yPos, { align: "right" });

//     doc.save("authority_letter.pdf");

//     // Show success message after PDF is generated
//     alert("Authority Letter has been generated successfully!");
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Generate Authority Letter</h2>
//         <p className="text-sm text-gray-600 mb-4">
//           Fill in the details to generate your authority letter.
//         </p>

//         <form>
//           <input
//             type="text"
//             name="exhibitionName"
//             value={formData.exhibitionName}
//             onChange={handleInputChange}
//             placeholder="Exhibition Name"
//             className="w-full p-2 border rounded-md mb-2"
//           />
//           <input
//             type="text"
//             name="exhibitorName"
//             value={formData.exhibitorName}
//             onChange={handleInputChange}
//             placeholder="Exhibitor Name"
//             className="w-full p-2 border rounded-md mb-2"
//           />
//           <input
//             type="text"
//             name="venue"
//             value={formData.venue}
//             onChange={handleInputChange}
//             placeholder="Venue"
//             className="w-full p-2 border rounded-md mb-2"
//           />
//           <div className="flex space-x-2">
//             <input
//               type="date"
//               name="eventDateFrom"
//               value={formData.eventDateFrom}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md mb-2"
//             />
//             <input
//               type="date"
//               name="eventDateTo"
//               value={formData.eventDateTo}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md mb-2"
//             />
//           </div>
//           <input
//             type="text"
//             name="stallNo"
//             value={formData.stallNo}
//             onChange={handleInputChange}
//             placeholder="Stall No"
//             className="w-full p-2 border rounded-md mb-2"
//           />
//           <input
//             type="text"
//             name="hallNo"
//             value={formData.hallNo}
//             onChange={handleInputChange}
//             placeholder="Hall No"
//             className="w-full p-2 border rounded-md mb-2"
//           />
//           <input
//             type="text"
//             name="stallSize"
//             value={formData.stallSize}
//             onChange={handleInputChange}
//             placeholder="Stall Size"
//             className="w-full p-2 border rounded-md mb-2"
//           />
//           <input
//             type="date"
//             name="topDate"
//             value={formData.topDate}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded-md mb-4"
//           />
//         </form>

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={generatePDF}
//             className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
//           >
//             Generate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateAuthorityLetter;

import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const GenerateAuthorityLetter = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    exhibitionName: "",
    exhibitorName: "",
    venue: "",
    eventDateFrom: "",
    eventDateTo: "",
    stallNo: "",
    hallNo: "",
    stallSize: "",
    topDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();
    const suffix =
      ["st", "nd", "rd"][((((day + 90) % 100) - 10) % 10) - 1] || "th";
    return `${day}${suffix} ${month} ${year}`;
  };

  const generatePDF = () => {
    const {
      exhibitionName,
      exhibitorName,
      venue,
      eventDateFrom,
      eventDateTo,
      stallNo,
      hallNo,
      stallSize,
      topDate,
    } = formData;

    const formattedTopDate = formatDate(topDate);
    const formattedEventDateFrom = formatDate(eventDateFrom);
    const formattedEventDateTo = formatDate(eventDateTo);

    const doc = new jsPDF();
    const leftMargin = 35; // Adjusted left margin for better alignment

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Date at the top
    doc.setFont("helvetica", "bold");
    doc.text(`Date: ${formattedTopDate}`, 180, 15, { align: "right" });

    // Title of the letter
    doc.setFontSize(14);
    doc.text("Authority Letter", doc.internal.pageSize.width / 2, 35, {
      align: "center",
    });

    // Body Content
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    let yPos = 50;

    doc.text(
      "We hereby authorize M/s Design Bullz Private Limited, Plot # C-127/7, First Floor,",
      leftMargin,
      yPos
    );
    yPos += 8;
    doc.text(
      "Street No.23, Block – C, Rama Vihar, Delhi – 110081 to fabricate & install our stalls in",
      leftMargin,
      yPos
    );
    yPos += 8;

    doc.setFont("helvetica", "bold");
    doc.text(exhibitionName, leftMargin, yPos);
    let xPos = leftMargin + doc.getTextWidth(exhibitionName);
    doc.setFont("helvetica", "normal");
    doc.text(" on behalf of M/s ", xPos, yPos);
    xPos += doc.getTextWidth(" on behalf of M/s ");
    doc.setFont("helvetica", "bold");
    doc.text(exhibitorName, xPos, yPos);
    xPos += doc.getTextWidth(exhibitorName);
    doc.setFont("helvetica", "normal");
    doc.text(", to be held at ", xPos, yPos);
    xPos += doc.getTextWidth(", to be held at ");
    doc.setFont("helvetica", "bold");
    doc.text(venue, xPos, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.text("from ", leftMargin, yPos);
    xPos = leftMargin + doc.getTextWidth("from ");
    doc.setFont("helvetica", "bold");
    doc.text(formattedEventDateFrom, xPos, yPos);
    xPos += doc.getTextWidth(formattedEventDateFrom);
    doc.setFont("helvetica", "normal");
    doc.text(" to ", xPos, yPos);
    xPos += doc.getTextWidth(" to ");
    doc.setFont("helvetica", "bold");
    doc.text(formattedEventDateTo, xPos, yPos);
    yPos += 15;

    doc.setFont("helvetica", "bold");
    doc.text("This authority is issued with regards to:", leftMargin, yPos);
    yPos += 10;

    doc.text(`Hall No: ${hallNo}`, leftMargin, yPos);
    yPos += 8;
    doc.text(`Stall No: ${stallNo}`, leftMargin, yPos);
    yPos += 8;
    doc.text(`Stall Size: ${stallSize}`, leftMargin, yPos);
    yPos += 30;

    doc.setFont("helvetica", "bold");
    doc.text("Authorized Signatory", 180, yPos, { align: "right" });

    doc.save("authority_letter.pdf");

    alert("Authority Letter has been generated successfully!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Generate Authority Letter</h2>
        <p className="text-sm text-gray-600 mb-4">
          Fill in the details to generate your authority letter.
        </p>

        <form>
          <input
            type="text"
            name="exhibitionName"
            value={formData.exhibitionName}
            onChange={handleInputChange}
            placeholder="Exhibition Name"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="exhibitorName"
            value={formData.exhibitorName}
            onChange={handleInputChange}
            placeholder="Exhibitor Name"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            placeholder="Venue"
            className="w-full p-2 border rounded-md mb-2"
          />
          <div className="flex space-x-2">
            <input
              type="date"
              name="eventDateFrom"
              value={formData.eventDateFrom}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="date"
              name="eventDateTo"
              value={formData.eventDateTo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
            />
          </div>
          <input
            type="text"
            name="stallNo"
            value={formData.stallNo}
            onChange={handleInputChange}
            placeholder="Stall No"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="hallNo"
            value={formData.hallNo}
            onChange={handleInputChange}
            placeholder="Hall No"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="stallSize"
            value={formData.stallSize}
            onChange={handleInputChange}
            placeholder="Stall Size"
            className="w-full p-2 border rounded-md mb-2"
          />
          <input
            type="date"
            name="topDate"
            value={formData.topDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md mb-4"
          />
        </form>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateAuthorityLetter;
