import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

interface Message {
  role: "user" | "model";
  text: string;
}

const ChatbotComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", text: userInput },
    ];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDwcZuoR5BKzZ-pYdqaWFG0513ghLp98VE",
        {
          contents: [
            {
              role: "user",
              parts: [{ text: userInput }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botText = response.data.candidates[0].content.parts[0].text;
      setMessages([...newMessages, { role: "model", text: botText }]);
    } catch (error) {
      console.error("Erro ao se comunicar com a API:", error);
      setMessages([
        ...newMessages,
        { role: "model", text: "Houve um problema. Tente novamente." },
      ]);
    }

    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
