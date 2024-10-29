document.getElementById('generateLinkBtn').addEventListener('click', function() {
    const roomId = Math.random().toString(36).substring(2, 10);
    const roomUrl = `${window.location.href}room.html?id=${roomId}`;
    document.getElementById('roomId').value = roomUrl;

    // Show the room link input
    document.getElementById('roomLink').style.display = 'block';
    document.getElementById('mainContainer').style.display = 'none';

    // Save room ID to localStorage (you can use this to retrieve the video later)
    localStorage.setItem(roomId, '');
});

// Check if room ID exists in the URL and load the video
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');
if (roomId) {
    document.getElementById('mainContainer').style.display = 'block';

    // Retrieve video link associated with the room ID
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
        alert('No video found for this room.');
    }
}

document.getElementById('addVideoBtn').addEventListener('click', function() {
    const videoLink = document.getElementById('videoLink').value;
    const videoId = extractVideoID(videoLink);
    if (videoId) {
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById('videoPlayer').src = iframeSrc;
        document.getElementById('videoContainer').style.display = 'block';

        // Save the video link with the generated room ID
        if (roomId) {
            localStorage.setItem(roomId, videoLink); // Save video link with room ID as key
        }
    } else {
        alert('Please enter a valid YouTube link.');
    }
});

// Function to extract video ID from YouTube URL
function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}
