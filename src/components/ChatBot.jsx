import React, { useState, useEffect, useRef } from "react";
import { BsChatDots, BsX, BsSend, BsPerson } from "react-icons/bs";

const WEBSOCKET_URL = "ws://localhost:8080";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWebSocket = () => {
    websocket.current = new WebSocket(WEBSOCKET_URL);

    websocket.current.onopen = () => {
      setIsConnected(true);
      // Send join message
      websocket.current.send(
        JSON.stringify({
          type: "join",
          userName: userName,
        })
      );
    };

    websocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "message") {
        setMessages((prev) => [...prev, data]);
      }
    };

    websocket.current.onclose = () => {
      setIsConnected(false);
      // Attempt to reconnect after 3 seconds
      setTimeout(connectWebSocket, 3000);
    };

    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  };

  const handleSetName = () => {
    if (userName.trim()) {
      setIsNameSet(true);
      connectWebSocket();
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && isConnected) {
      const messageData = {
        type: "message",
        text: input,
        sender: "user",
      };

      websocket.current.send(JSON.stringify(messageData));
      setInput("");
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
          {/* Chatbot Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center gap-2">
              <span className="font-bold">Dbullz Live Chat</span>
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-400" : "bg-red-400"
                }`}
              />
            </div>
            <BsX
              className="text-2xl cursor-pointer hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* User Name Input */}
          {!isNameSet && (
            <div className="p-4 border-b">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">
                  Please enter your name to join the chat:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSetName()}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your name..."
                  />
                  <button
                    onClick={handleSetName}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chatbot Body */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col mb-4 ${
                  msg.userName === userName ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <BsPerson className="text-gray-600" />
                  <span className="text-xs text-gray-600">
                    {msg.userName} • {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.userName === userName
                      ? "bg-blue-600 text-white"
                      : msg.sender === "system"
                      ? "bg-gray-200 text-gray-600 italic"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chatbot Input */}
          {isNameSet && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  disabled={!isConnected}
                />
                <button
                  onClick={handleSendMessage}
                  className={`p-2 rounded-md ${
                    isConnected
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  disabled={!isConnected}
                >
                  <BsSend className="text-xl" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <BsChatDots className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
