// Room creation logic
document.getElementById('createRoomBtn').addEventListener('click', function() {
    const roomId = Math.random().toString(36).substring(2, 10);
    const roomUrl = `${window.location.origin}/room.html?id=${roomId}`;
    document.getElementById('roomId').value = roomUrl;

    // Show the room link input
    document.getElementById('roomLink').style.display = 'block';
});

// Load video and chat when entering a room
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

if (roomId) {
    document.getElementById('mainContainer').style.display = 'block';
    
    const chatMessages = document.getElementById('chatMessages');
    
    // Check if a video link is already saved for this room (mock implementation)
    const savedVideoLink = localStorage.getItem(roomId);
    if (savedVideoLink) {
        const videoId = extractVideoID(savedVideoLink);
        if (videoId) {
            const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
            document.getElementById('videoPlayer').src = iframeSrc;
            document.getElementById('videoContainer').style.display = 'block';
        } else {
            alert('No valid video found for this room.');
        }
    } else {
        alert('No video found for this room. Please add a video link.');
    }

    // Chat functionality
    document.getElementById('sendChatBtn').addEventListener('click', function() {
        const message = document.getElementById('chatInput').value;
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            document.getElementById('chatInput').value = ''; // Clear input field
        }
    });
}

// Function to extract video ID from YouTube URL
function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

// Handle adding video link
document.getElementById('addVideoBtn').addEventListener('click', function() {
    const videoLink = document.getElementById('videoLink').value;
    const videoId = extractVideoID(videoLink);
    if (videoId) {
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById('videoPlayer').src = iframeSrc;
        document.getElementById('videoContainer').style.display = 'block';

        // Save the video link with the room ID as key
        localStorage.setItem(roomId, videoLink);
    } else {
        alert('Please enter a valid YouTube link.');
    }
});
