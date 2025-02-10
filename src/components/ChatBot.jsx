// import React, { useState } from "react";
// import { FaCommentDots, FaTimes } from "react-icons/fa";

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
//     >
//       {isOpen ? (
//         <div
//           style={{
//             width: "300px",
//             height: "400px",
//             background: "#fff",
//             boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
//             borderRadius: "10px",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Chatbot Header */}
//           <div
//             style={{
//               background: "#4CAF50",
//               color: "#fff",
//               padding: "10px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderTopLeftRadius: "10px",
//               borderTopRightRadius: "10px",
//             }}
//           >
//             <span>Chat Assistant</span>
//             <FaTimes
//               style={{ cursor: "pointer" }}
//               onClick={() => setIsOpen(false)}
//             />
//           </div>

//           {/* Chatbot Body */}
//           <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
//             <p>Hello! How can I assist you today?</p>
//             {/* You can integrate a real chatbot API here */}
//           </div>
//         </div>
//       ) : (
//         <button
//           style={{
//             background: "#4CAF50",
//             color: "#fff",
//             borderRadius: "50%",
//             width: "60px",
//             height: "60px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
//             border: "none",
//             cursor: "pointer",
//           }}
//           onClick={() => setIsOpen(true)}
//         >
//           <FaCommentDots size={28} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChatBot;

import React, { useState } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Simulate bot response (replace this with API integration)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "I'm here to help!", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {isOpen ? (
        <div
          style={{
            width: "300px",
            height: "400px",
            background: "#fff",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chatbot Header */}
          <div
            style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <span>Chat Assistant</span>
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Chatbot Body */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    background: msg.sender === "user" ? "#4CAF50" : "#ddd",
                    color: msg.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Chatbot Input */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ccc",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                marginLeft: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button
          style={{
            background: "#4CAF50",
            color: "#fff",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setIsOpen(true)}
        >
          <FaCommentDots size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
