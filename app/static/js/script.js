const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');

        setTimeout(() => {
            addMessage('I am here to help you!', 'bot'); // Placeholder bot response
        }, 1000);
    }

    userInput.value = '';
});

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
