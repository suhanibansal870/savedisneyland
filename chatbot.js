// DOM elements
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

const COHERE_API_KEY = "r9hWqAolUflHrQPETJBDpNyIL2DksceIEGSP0Vpq";

const CHATBOT_TOPIC = "ecology";

// System prompt to constrain responses to the specific topic
const SYSTEM_PROMPT = `You are a super friendly ecology chatbot for elementary and middle school students. 
Always explain things using simple, fun words for a 9 years old. Keep your answers short—less than 150 characters and under 2 sentences.
Your goal is to help kids learn and feel curious about nature, animals, pollution, and how to take care of the Earth.
If the question is not about nature or the environment, respond with:
"Sorry, I can only talk about ecology and the environment. Try asking me something about nature, animals, pollution, or how to protect the Earth!"`;
// Initial greeting that mentions the specific topic
const INITIAL_GREETING = `Hello! I'm a chatbot specialized in ${CHATBOT_TOPIC}. Feel free to ask me any questions about this topic!`;

// Chat history to maintain context
let chatHistory = [{ role: "CHATBOT", message: INITIAL_GREETING }];

// Function to add a message to the chat UI
function addMessageToChat(message, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("answer");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  messageDiv.textContent = message;

  // Insert before the typing indicator
  chatMessages.insertBefore(messageDiv, typingIndicator);

  // Scroll to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
  typingIndicator.style.display = "block";
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to hide typing indicator
function hideTypingIndicator() {
  typingIndicator.style.display = "none";
}

// Function to get response from Cohere API
async function getCohereResponse(userMessage) {
  try {
    showTypingIndicator();

    // Add user message to chat history
    chatHistory.push({ role: "USER", message: userMessage });

    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        chat_history: chatHistory,
        model: "command",
        preamble: SYSTEM_PROMPT,
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    // Check if response has the expected format
    if (data && data.text) {
      // Add bot response to chat history
      chatHistory.push({ role: "CHATBOT", message: data.text });
      hideTypingIndicator();
      addMessageToChat(data.text, false);
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error:", error);
    hideTypingIndicator();
    addMessageToChat(
      "Sorry, I encountered an error. Please try again later.",
      false
    );
  }
}

// Event listener for send button
sendButton.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    addMessageToChat(message, true);
    userInput.value = "";
    getCohereResponse(message);
  }
});

// Event listener for Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const message = userInput.value.trim();
    if (message) {
      addMessageToChat(message, true);
      userInput.value = "";
      getCohereResponse(message);
    }
  }
});

// Focus on input when page loads
window.onload = () => {
  userInput.focus();
  // Update the initial bot message in the UI to match our topic-specific greeting
  const initialBotMessage = document.querySelector(".bot-message");
  if (initialBotMessage) {
    initialBotMessage.textContent = INITIAL_GREETING;
  }
};
