document.addEventListener("DOMContentLoaded", function () {
    const chatBody = document.getElementById("chat-body");
    const userInput = document.getElementById("custom-query-input");

    async function sendCustomQuery() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        const userId = 1; // Update dynamically if needed

        // Append user message
        appendMessage("user", userMessage);
        userInput.value = ""; // Clear input field

        try {
            const response = await fetch('http://localhost:3000/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, message: userMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            let aiReply = data.reply || "I couldn't understand that. Try again.";

            // ✅ Remove *** from responses
            aiReply = aiReply.replace(/\*\*|\*/g, "");

            // ✅ Format medicine-related responses
            if (containsHealthInfo(aiReply)) {
                appendFormattedMessage("ai", aiReply);
            } else {
                appendMessage("ai", aiReply);
            }

        } catch (error) {
            console.error("❌ Chatbot Error:", error);
            appendMessage("ai", "⚠️ Error connecting to AI. Please try again later.");
        }
    }

    // ✅ Function to auto-detect health info like medicine, treatment, precautions
    function containsHealthInfo(text) {
        const lowerText = text.toLowerCase();
        return (
            lowerText.includes("medicine") ||
            lowerText.includes("treatment") ||
            lowerText.includes("dosage") ||
            lowerText.includes("precaution") ||
            lowerText.includes("symptom") ||
            lowerText.includes("prescription")
        );
    }

    // ✅ Function to format AI responses like a prescription
    function appendFormattedMessage(sender, message) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message", sender);

        const messageText = document.createElement("p");
        messageText.innerHTML = `<strong>${sender === "user" ? "You" : "AI"}:</strong>`;

        // Split message into bullet points
        const lines = message.split("\n");
        const ul = document.createElement("ul");

        lines.forEach(line => {
            if (line.trim()) {
                const li = document.createElement("li");
                li.textContent = line.trim();
                ul.appendChild(li);
            }
        });

        messageText.appendChild(ul);

        // ✅ Add disclaimer for medical queries
        if (containsHealthInfo(message)) {
            const disclaimer = document.createElement("p");
            disclaimer.innerHTML = "<strong>⚠️ Disclaimer:</strong> This is an AI response. Please consult a doctor.";
            disclaimer.style.color = "red";
            messageContainer.appendChild(disclaimer);
        }

        messageContainer.appendChild(messageText);
        chatBody.appendChild(messageContainer);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // ✅ Function to append normal messages
    function appendMessage(sender, message) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message", sender);

        const messageText = document.createElement("p");
        messageText.innerHTML = `<strong>${sender === "user" ? "You" : "AI"}:</strong> ${message}`;

        messageContainer.appendChild(messageText);
        chatBody.appendChild(messageContainer);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    window.sendCustomQuery = sendCustomQuery;
});
