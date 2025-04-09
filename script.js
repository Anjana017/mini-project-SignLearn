document.addEventListener("DOMContentLoaded", function () {
    const chatPopup = document.getElementById("chatPopup");
    const chatButton = document.querySelector(".chat-support-button");
    const closeButton = document.querySelector(".chat-header span"); // Selecting the "X" button

    console.log("Chat Button:", chatButton);
    console.log("Chat Popup:", chatPopup);
    console.log("Close Button:", closeButton);

    if (!chatPopup || !chatButton || !closeButton) {
        console.error("Chat popup, button, or close button not found!"); // Debugging log
        return;
    }

    // Ensure chat popup is initially hidden
    chatPopup.style.display = "none";

    // Toggle chat popup when clicking the chat button
    chatButton.addEventListener("click", function () {
        console.log("Chat Button Clicked!");
        chatPopup.style.display = (chatPopup.style.display === "none" || chatPopup.style.display === "") 
            ? "block" 
            : "none";
    });

    // Close chat popup when clicking the "X" button
    closeButton.addEventListener("click", function () {
        console.log("Close Button Clicked!");
        chatPopup.style.display = "none";
    });

    document.addEventListener("DOMContentLoaded", function () {
    const chatPopup = document.getElementById("chatPopup");
    const chatButton = document.querySelector(".chat-support-button");
    const closeButton = document.querySelector(".chat-header span");
    const chatBody = document.getElementById("chatBody");
    const chatInput = document.getElementById("chatInput");

    const ZAPIER_WEBHOOK_URL = "https://assistant-72f31e.zapier.app"; // Zapier Webhook URL

    // Toggle chat popup
    chatButton.addEventListener("click", function () {
        chatPopup.style.display = 
            chatPopup.style.display === "none" || chatPopup.style.display === "" 
            ? "block" 
            : "none";
    });

    closeButton.addEventListener("click", function () {
        chatPopup.style.display = "none";
    });

    // Send user message to Zapier and display response
    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Display user message in the chat
        chatBody.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
        chatInput.value = "";

        // Send message to Zapier webhook
        fetch(ZAPIER_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }) // Send user's message
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response || "I'm sorry, I couldn't understand that.";
            chatBody.innerHTML += `<p><strong>Support Bot:</strong> ${botResponse}</p>`;
            chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
        })
        .catch(error => {
            console.error("Error communicating with Zapier:", error);
            chatBody.innerHTML += `<p><strong>Support Bot:</strong> There was an error connecting to support.</p>`;
        });
    }

    // Send message when the "Send" button is clicked
    document.querySelector(".chat-footer button").addEventListener("click", sendMessage);

    // Allow "Enter" key to send messages
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});

    
    document.addEventListener("DOMContentLoaded", function () {
        let highestUnlockedLevel = localStorage.getItem("unlockedLevel") || 1;
    
        document.querySelectorAll(".level").forEach((level, index) => {
            if (index + 1 <= highestUnlockedLevel) {
                level.classList.remove("locked");
                level.classList.add("unlocked");
                level.addEventListener("click", function () {
                    localStorage.setItem("unlockedLevel", index + 2);
                });
            }
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const levels = document.querySelectorAll(".level");
        
        // Load progress from localStorage or start at Level 1
        const completedLevels = parseInt(localStorage.getItem("completedLevels")) || 1;
    
        // Unlock levels up to the user's progress
        levels.forEach(level => {
            const levelNumber = parseInt(level.getAttribute("data-level"));
            if (levelNumber <= completedLevels) {
                level.classList.remove("locked");
                level.classList.add("unlocked");
                level.addEventListener("click", () => {
                    window.location.href = level.getAttribute("href");  // Navigate to the clicked lesson
                });
            } else {
                level.classList.remove("unlocked");
                level.classList.add("locked");
                level.addEventListener("click", (e) => {
                    e.preventDefault();
                    alert(`Complete Level ${completedLevels} to unlock this!`);
                });
            }
        });
    
        // Mark completion of the current lesson and unlock the next one
        const markCompletionButton = document.getElementById("completeLesson"); // Add this button to your lessons
        if (markCompletionButton) {
            markCompletionButton.addEventListener("click", () => {
                const nextLevel = completedLevels + 1;
                localStorage.setItem("completedLevels", nextLevel);
                alert(`Level ${completedLevels} completed! Level ${nextLevel} is now unlocked.`);
                window.location.href = "levels.html";  // Return to levels page
            });
        }
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const exerciseBtn = document.getElementById("exerciseBtn");
    
        if (exerciseBtn) {
            exerciseBtn.addEventListener("click", function () {
                window.location.href = "levels.html"; // Redirects to learning levels page
            });
        }
    });
    
    
});
