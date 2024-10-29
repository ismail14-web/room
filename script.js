document.getElementById('addVideoBtn').addEventListener('click', function() {
    const videoLink = document.getElementById('videoLink').value;
    const videoId = extractVideoID(videoLink);
    if (videoId) {
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`;
        document.getElementById('videoPlayer').src = iframeSrc;
        document.getElementById('videoContainer').style.display = 'block';
    } else {
        alert('Please enter a valid YouTube link.');
    }
});

document.getElementById('generateLinkBtn').addEventListener('click', function() {
    const roomId = Math.random().toString(36).substring(2, 10);
    const repositoryName = 'your-repo-name'; // Replace with your actual repository name
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
    alert(`Welcome to the room with ID: ${roomId}`);
    // You can add additional logic here to load specific content based on roomId
}
