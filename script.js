document.getElementById('addVideoBtn').addEventListener('click', function() {
    const videoLink = document.getElementById('videoLink').value;
    const videoId = extractVideoID(videoLink);
    if (videoId) {
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById('videoPlayer').src = iframeSrc;
        document.getElementById('videoContainer').style.display = 'block';

        // Save the video link with the generated room ID
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('id');
        if (roomId) {
            localStorage.setItem(roomId, videoLink); // Save video link with room ID as key
        }
    } else {
        alert('Please enter a valid YouTube link.');
    }
});

document.getElementById('generateLinkBtn').addEventListener('click', function() {
    const roomId = Math.random().toString(36).substring(2, 10);
    const repositoryName = 'room'; // Replace with your actual repository name
    const roomUrl = `${window.location.origin}/${repositoryName}/room.html?id=${roomId}`;
    document.getElementById('sharedLink').value = roomUrl;
    document.getElementById('roomLink').style.display = 'block';
});

function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

// Handle room ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');
if (roomId) {
    // Hide input fields and buttons
    document.getElementById('mainContainer').style.display = 'none';

    // Retrieve the video link associated with the room ID
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
