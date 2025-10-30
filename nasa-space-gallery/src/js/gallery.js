const displayGallery = (data) => {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = ''; // Clear previous content

    data.forEach(image => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('gallery-item');

        imageElement.innerHTML = `
            <img src="${image.url}" alt="${image.title}" class="gallery-image" />
            <h3 class="image-title">${image.title}</h3>
            <p class="image-date">${image.date}</p>
        `;

        imageElement.addEventListener('click', () => {
            openModal(image);
        });

        galleryContainer.appendChild(imageElement);
    });
};

export { displayGallery };