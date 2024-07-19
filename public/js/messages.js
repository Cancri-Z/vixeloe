window.addEventListener('DOMContentLoaded', () => {
    loadChatList();
});

const chatList = document.getElementById('chat-list');
const chatWindow = document.getElementById('chat-window');
const chatHeader = document.getElementById('chat-header');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const searchInput = document.getElementById('search-input');
const fileInput = document.getElementById('file-input');
const emojiButton = document.getElementById('emoji-button');

const chats = {
    user1: { name: 'Abedu Samuel', messages: [] },
    user2: { name: 'Dini Nuwa', messages: [] },
    user3: { name: 'John Doe', messages: [] },
    user4: { name: 'Justin Bieber', messages: [] },
    user5: { name: 'Michael Jackson', messages: [] },
    user6: { name: 'Ololade Asake', messages: [] },
    user7: { name: 'Burna', messages: [] }
};

let activeChat = null;

function loadChatList() {
    chatList.innerHTML = ''; // Clear the chat list
    let hasChats = false;

    for (const userId in chats) {
        const chat = chats[userId];
        const chatListItem = document.createElement('div');
        chatListItem.classList.add('chat-list-item');

        let messagePreview = '';
        if (chat.messages.length > 0) {
            hasChats = true;
            const lastMessage = chat.messages[chat.messages.length - 1];
            messagePreview = `<div class="message-preview">${lastMessage.text}</div>`;
        }

        chatListItem.innerHTML = `
            <div>
                <strong>${chat.name}</strong>
                ${messagePreview}
            </div>
            <div class="timestamp">${chat.messages.length > 0 ? new Date(chat.messages[chat.messages.length - 1].timestamp).toLocaleTimeString() : ''}</div>
        `;
        chatListItem.dataset.userId = userId;
        chatListItem.addEventListener('click', () => selectChat(userId));
        chatList.appendChild(chatListItem);
    }

    // If there are no chats, add the "Please select a chat" element
    if (!hasChats) {
        const selectChatElement = document.createElement('div');
        selectChatElement.classList.add('select-chat');
        selectChatElement.textContent = 'Please select a chat';
        selectChatElement.onclick = deselectChat;
        chatList.appendChild(selectChatElement);
    }
}

function deselectChat() {
    activeChat = null;
    chatHeader.innerText = 'Select a chat';
    chatWindow.innerHTML = '';
    messageInput.disabled = true;
    sendButton.disabled = true;
    fileInput.disabled = true;
    document.querySelectorAll('.chat-list-item').forEach(item => item.classList.remove('active'));

    // Remove the "Please select a chat" element if it exists
    const selectChatElement = chatList.querySelector('.select-chat');
    if (selectChatElement) {
        selectChatElement.remove();
    }

    document.querySelector('.chat-app').style.animation = 'bounce 2s infinite';
}

function selectChat(userId) {
    activeChat = chats[userId];
    chatHeader.innerText = activeChat.name;
    loadMessages();
    messageInput.disabled = false;
    sendButton.disabled = false;
    fileInput.disabled = false;
    document.querySelectorAll('.chat-list-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.chat-list-item[data-user-id="${userId}"]`).classList.add('active');
    document.querySelector('.select-chat').style.display = 'none';
    document.querySelector('.chat-app').style.animation = 'fadeIn 0.5s ease-in-out';
}

function loadMessages() {
    chatWindow.innerHTML = '';
    for (const message of activeChat.messages) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        let mediaElement = '';

        if (message.text.startsWith('<img')) {
            mediaElement = `<div class="image-container">${message.text}</div>`;
        } else if (message.text.startsWith('<video')) {
            mediaElement = `<div class="video-container">${message.text}</div>`;
        } else if (message.text.startsWith('<audio')) {
            mediaElement = `<div class="audio-container">${message.text}</div>`;
        }

        messageElement.innerHTML = `
            <span class="user">${message.user}:</span>
            ${mediaElement || `<span class="text">${message.text}</span>`}
            <span class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</span>
        `;
        chatWindow.appendChild(messageElement);
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== '' && activeChat) {
        activeChat.messages.push({ user: 'You', text: messageText, timestamp: Date.now() });
        loadMessages();
        loadChatList();
        messageInput.value = '';
        messageInput.focus();
    }
}

function sendFile(file) {
    if (activeChat && file) {
        const message = {
            user: 'You',
            text: '',
            timestamp: Date.now()
        };

        if (file.type.startsWith('image/')) {
            message.text = `<img src="${URL.createObjectURL(file)}" alt="Image" style="max-width: 100%;">`;
        } else if (file.type.startsWith('video/')) {
            message.text = `<video controls style="max-width: 100%;"><source src="${URL.createObjectURL(file)}" type="${file.type}">Your browser does not support the video tag.</video>`;
        } else if (file.type.startsWith('audio/')) {
            message.text = `<audio controls style="max-width: 100%;"><source src="${URL.createObjectURL(file)}" type="${file.type}">Your browser does not support the audio tag.</audio>`;
        } else {
            message.text = `<a href="${URL.createObjectURL(file)}" download>${file.name}</a>`;
        }

        activeChat.messages.push(message);
        loadMessages();
        loadChatList();
    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

messageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        sendFile(this.files[0]);
    }
});


const emojiPicker = new EmojiButton(emojiButton);
emojiButton.addEventListener('click', () => {
    emojiPicker.togglePicker(emojiButton);
});

emojiPicker.on('emoji', emoji => {
    console.log('Emoji selected:', emoji);
    messageInput.value += emoji;
    messageInput.focus(); // Add this line to keep the focus on the input field
});

searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll('.chat-list-item').forEach(item => {
        const userName = item.querySelector('strong').innerText.toLowerCase();
        item.style.display = userName.includes(searchTerm) ? 'flex' : 'none';
    });
});

loadChatList();
