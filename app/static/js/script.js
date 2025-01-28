const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');

        // Send the user's message to the AI model and get the response
        fetch('https://your-ai-model-endpoint.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.reply, 'bot'); // Use the AI model's response
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('Sorry, something went wrong.', 'bot');
        });
    }

    userInput.value = '';
});

document.getElementById('start-chat').addEventListener('click', function() {
    chatMessages.innerHTML = ''; // Clear previous messages if any
    chatMessages.style.display = 'block'; // Show the chat section
});

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
