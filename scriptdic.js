let videoData = [];

// Function to load and parse a CSV file
function loadCSV(file, callback) {
    Papa.parse(file, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: callback
    });
}

// Load and merge data from all CSV files
Promise.all([
    new Promise(resolve => loadCSV("csv/train.csv", resolve)),
    new Promise(resolve => loadCSV("csv/test.csv", resolve)),
    new Promise(resolve => loadCSV("csv/val.csv", resolve))
]).then(results => {
    // Combine data from all CSV files
    videoData = results.flatMap(result => {
        console.log("Parsed data:", result.data); // Log parsed data
        return result.data
            .filter(entry => entry.Gloss && typeof entry.Gloss === 'string') // Filter out invalid entries
            .map(entry => ({
                word: entry.Gloss.toLowerCase(), // Use the Gloss column for search
                video: `videos/${entry['Video file']}` // Use the Video file column for the video path
            }));
    });
    console.log("All data loaded:", videoData); // Log combined data
}).catch(error => {
    console.error("Error loading CSV files:", error);
});

// Search functionality
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const videoContainer = document.getElementById('videoContainer');
    const foundVideo = videoData.find(entry => entry.word === searchTerm);

    if (foundVideo) {
        videoContainer.innerHTML = `<video width="320" height="240" controls>
                                       <source src="${foundVideo.video}" type="video/mp4">
                                       Your browser does not support the video tag.
                                   </video>`;
    } else {
        videoContainer.innerHTML = "<p>Video not available.</p>";
    }
});
