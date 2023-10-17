document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const imageGallery = document.querySelector('.image-gallery');

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query === '') return;

        fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=10`, {
            headers: {
                'Authorization': 'Client-ID YOUR_ACCESS_KEY',
            }
        })
        .then(response => response.json())
        .then(data => {
            imageGallery.innerHTML = '';
            data.results.forEach(image => {
                const imgCard = createImageCard(image);
                imageGallery.appendChild(imgCard);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
    });

    function createImageCard(imageData) {
        const imgCard = document.createElement('div');
        imgCard.classList.add('img-card');

        const imgElement = document.createElement('img');
        imgElement.src = imageData.urls.small;

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', function () {
            // Implement your "like" logic here
            // You can store liked images in memory
        });

        imgCard.appendChild(imgElement);
        imgCard.appendChild(likeButton);

        return imgCard;
    }
});
