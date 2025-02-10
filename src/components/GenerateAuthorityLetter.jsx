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

    const doc = new jsPDF();

    // Set font for the document
    doc.setFont("times", "normal");

    // Date at the top (Right Aligned)
    doc.setFontSize(12);
    doc.text(`Date: ${topDate}`, 180, 20, { align: "right" });

    // Title of the letter (Center Aligned and Bold)
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("Authority Letter", doc.internal.pageSize.width / 2, 30, {
      align: "center",
    });

    // Letter content (Normal font)
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    const content = `We hereby authorize M/s Design Bullz Private Limited, Plot # C-127/7, First Floor, Street No.23, Block – C, Rama Vihar, Delhi – 110081 to fabricate & Install our stalls in ${exhibitionName} on behalf of M/s ${exhibitorName}, to be held at ${venue} from ${eventDateFrom} to ${eventDateTo}.`;

    // Split content to fit the page width (usually 180 for letter-sized documents)
    const contentLines = doc.splitTextToSize(content, 180);
    doc.text(contentLines, 20, 40);

    // Issued with regards to section (Bold for "This authority is issued with regards to")
    doc.setFont("times", "bold");
    doc.text("This authority is issued with regards to:", 20, 70);

    // Stall details (Bold font for the input values)
    doc.setFont("times", "bold");
    doc.text(`Hall No: `, 20, 80);
    doc.setFont("times", "bold");
    doc.text(`${hallNo}`, 60, 80);

    doc.setFont("times", "bold");
    doc.text(`Stall No: `, 20, 90);
    doc.setFont("times", "bold");
    doc.text(`${stallNo}`, 60, 90);

    doc.setFont("times", "bold");
    doc.text(`Stall Size: `, 20, 100);
    doc.setFont("times", "bold");
    doc.text(`${stallSize}`, 60, 100);

    // Authorized Signatory (Right Aligned and Bold)
    doc.setFont("times", "bold");
    doc.text("Authorized Signatory", 180, 120, { align: "right" });

    // Save the document
    doc.save("authority_letter.pdf");
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
              placeholder="Event Date From"
            />
            <input
              type="date"
              name="eventDateTo"
              value={formData.eventDateTo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Event Date To"
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
            placeholder="Top Date"
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
