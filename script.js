// Sidebar Toggle Function
document.getElementById("sidebarToggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("closed");
});

// Toggle AI Chatbot Window
function toggleChatbot() {
    const chatbotWindow = document.getElementById("chatbot-window");
    chatbotWindow.style.display = chatbotWindow.style.display === "none" ? "block" : "none";
}

// Send predefined query to chatbot
function sendPredefinedQuery(query) {
    appendMessage("User", query);
    fetchChatbotResponse(query);
}

// Custom User Query Input
function showCustomInput() {
    document.getElementById("custom-query-section").style.display = "block";
}

function sendCustomQuery() {
    const userQuery = document.getElementById("custom-query-input").value;
    if (userQuery.trim() !== "") {
        appendMessage("User", userQuery);
        fetchChatbotResponse(userQuery);
        document.getElementById("custom-query-input").value = ""; // Clear input
    }
}

// Append chat message
function appendMessage(sender, message) {
    const chatBody = document.getElementById("chat-body");
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
}

// Simulate chatbot response
function fetchChatbotResponse(query) {
    appendMessage("AI", "Processing...");
    
    const loadingIndicator = document.createElement("p");
    loadingIndicator.textContent = "Loading...";
    loadingIndicator.id = "loadingIndicator";
    document.getElementById("chat-body").appendChild(loadingIndicator);

    setTimeout(() => {
        document.getElementById("chat-body").removeChild(loadingIndicator);
        appendMessage("AI", "I'm processing your request... (Demo Response)");
    }, 1000);
}

// Voice Recognition for Chatbot
function startVoiceRecognition() {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Default language
    recognition.start();

    recognition.onresult = function (event) {
        const spokenText = event.results[0][0].transcript;
        document.getElementById("custom-query-input").value = spokenText;
        sendCustomQuery();
    };

    recognition.onerror = function () {
        alert("Error with voice recognition. Please try again.");
    };
}

// Emergency Alert Function
function sendEmergencyAlert() {
    const emergencyMessage = "🚨 Emergency Alert Sent! Authorities have been notified.";
    alert(emergencyMessage);
    
    // TODO: Implement backend API call for real alert functionality
    // Example: fetch('/api/sendEmergencyAlert', { method: 'POST', body: JSON.stringify(contactData) });
}

// Multi-language Support
function switchLanguage(lang) {
    const chatbotHeader = document.querySelector("h1");
    const chatbotIntro = document.querySelector("p");
    
    const translations = {
        en: {
            title: "AI Chatbot Assistance",
            description: "Ask your health questions, and our AI will assist you."
        },
        es: {
            title: "Asistencia del Chatbot de IA",
            description: "Haz tus preguntas de salud y nuestra IA te ayudará."
        },
        fr: {
            title: "Assistance Chatbot IA",
            description: "Posez vos questions de santé et notre IA vous aidera."
        }
        // Add more languages as needed
    };

    chatbotHeader.textContent = translations[lang].title;
    chatbotIntro.textContent = translations[lang].description;
}

// Example: Switching to Spanish
// switchLanguage('es');
