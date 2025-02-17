document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages'); 
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    let conversationState = {};

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');

            // Manually handle mental health conversation
            let botResponse = "Hi! I'm here to help with any health concerns you may have. How can I help you today?";

            if (conversationState.context === 'stress') {
                botResponse = "Have you tried relaxation techniques like deep breathing?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'anxiety') {
                botResponse = "Do you often feel anxious in social situations?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'depression') {
                botResponse = "Have you been able to talk to someone about how you're feeling?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'panic') {
                botResponse = "Do you experience panic attacks frequently?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'insomnia') {
                botResponse = "Have you tried improving your sleep routine?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'overthinking') {
                botResponse = "Have you considered mindfulness exercises?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'mood swings') {
                botResponse = "Do you notice any triggers for your mood swings?";
                conversationState.context = null; // Reset context
            } else if (conversationState.context === 'burnout') {
                botResponse = "Are you getting enough rest and taking breaks from work?";
                conversationState.context = null; // Reset context
            } else {
                if (userMessage.includes("stress")) {
                    botResponse = "I understand that stress can be overwhelming. Can you tell me more about what's causing your stress?";
                    conversationState.context = 'stress';
                } else if (userMessage.includes("anxiety")) {
                    botResponse = "Anxiety can be tough to deal with. Can you describe when you feel most anxious?";
                    conversationState.context = 'anxiety';
                } else if (userMessage.includes("depression")) {
                    botResponse = "I'm sorry to hear that. How long have you been feeling this way?";
                    conversationState.context = 'depression';
                } else if (userMessage.includes("panic")) {
                    botResponse = "Panic attacks can be scary. Can you tell me more about your experiences with them?";
                    conversationState.context = 'panic';
                } else if (userMessage.includes("insomnia")) {
                    botResponse = "Sleep issues can affect your health. How often do you have trouble sleeping?";
                    conversationState.context = 'insomnia';
                } else if (userMessage.includes("overthinking")) {
                    botResponse = "Overthinking can be exhausting. What kind of thoughts do you find yourself overthinking about?";
                    conversationState.context = 'overthinking';
                } else if (userMessage.includes("mood swings")) {
                    botResponse = "Mood swings can be difficult to manage. How often do you experience them?";
                    conversationState.context = 'mood swings';
                } else if (userMessage.includes("burnout")) {
                    botResponse = "Burnout can be serious. How long have you been feeling this way?";
                    conversationState.context = 'burnout';
                }
            }

            setTimeout(() => {
                addMessage(botResponse, 'bot');
            }, 1000);
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
});
