// Elements
const getImageBtn = document.getElementById('getImageBtn');
const gallery = document.getElementById('gallery');

// Space facts array
const spaceFacts = [
    "A day on Venus is longer than its year! It takes Venus 243 Earth days to rotate on its axis but only 225 Earth days to orbit the Sun.",
    "The footprints left by Apollo astronauts on the Moon will likely last for millions of years because there is no wind or water to erode them.",
    "The largest known star, UY Scuti, is so big that it would take 1,700 years to fly around it in a plane!",
    "There's a planet made of diamonds twice the size of Earth called 55 Cancri e.",
    "One day on Saturn's moon Titan lasts about 16 Earth days.",
    "The Sun makes up 99.86% of our solar system's mass.",
    "Black holes aren't actually holes - they're incredibly dense areas of space with intense gravitational pull.",
    "There are more stars in the universe than grains of sand on Earth!",
    "Mars has two moons named Phobos and Deimos, which means 'fear' and 'panic'.",
    "A teaspoonful of neutron star would weigh about 6 billion tons!"
];

// Function to display random space fact
function displayRandomSpaceFact() {
    const factIndex = Math.floor(Math.random() * spaceFacts.length);
    const factHtml = `
        <div class="space-fact">
            <h3>🚀 Did You Know?</h3>
            <p>${spaceFacts[factIndex]}</p>
        </div>
    `;
    gallery.insertAdjacentHTML('beforebegin', factHtml);
}

// Display random fact on page load
displayRandomSpaceFact();

// NASA API configuration - using the provided data URL
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

// Function to show loading state
function showLoading() {
    gallery.innerHTML = `
        <div class="loading">
            <p>🔄 Loading space photos...</p>
        </div>
    `;
}

// Function to create a gallery item
function createGalleryItem(item) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    // Handle different media types
    const isVideo = item.media_type === 'video';
    const mediaHtml = isVideo 
        ? `<div class="video-thumbnail">
             <img src="${item.thumbnail_url || 'img/video-placeholder.jpg'}" alt="${item.title}" loading="lazy">
             <div class="video-play-button">▶️</div>
           </div>`
        : `<img src="${item.url}" alt="${item.title}" loading="lazy">`;

    galleryItem.innerHTML = `
        ${mediaHtml}
        <div class="item-info">
            <h3>${item.title}</h3>
            <p>${new Date(item.date).toLocaleDateString()}</p>
            ${isVideo ? '<span class="video-badge">VIDEO</span>' : ''}
        </div>
    `;

    // Add click event to open modal
    galleryItem.addEventListener('click', () => openModal(item));
    return galleryItem;
}

// Function to create and open modal
function openModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    // Handle different media types
    const mediaContent = item.media_type === 'video'
        ? `<div class="video-container">
             <iframe 
               src="${item.url.replace('watch?v=', 'embed/')}"
               title="${item.title}"
               frameborder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowfullscreen>
             </iframe>
           </div>`
        : `<img src="${item.url}" alt="${item.title}">`;

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            ${mediaContent}
            <div class="modal-info">
                <h2>${item.title}</h2>
                <p class="date">${new Date(item.date).toLocaleDateString()}</p>
                <p class="explanation">${item.explanation}</p>
            </div>
        </div>
    `;

    // Add close button functionality
    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = () => modal.remove();

    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };

    document.body.appendChild(modal);
}

// Function to fetch and display images
async function fetchSpaceImages() {
    try {
        showLoading();
        
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetch(apodData);
        const data = await response.json();
        
        // Clear gallery and loading message
        gallery.innerHTML = '';
        
        // Create and append gallery items
        data.forEach(item => {
            gallery.appendChild(createGalleryItem(item));
        });
    } catch (error) {
        gallery.innerHTML = `
            <div class="error">
                <p>⚠️ Error loading images. Please try again.</p>
            </div>
        `;
        console.error('Error:', error);
    }
}

// Add click event listener to the button
getImageBtn.addEventListener('click', fetchSpaceImages);