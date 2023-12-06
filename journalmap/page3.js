const photoInput = document.getElementById('photoInput');
        const previewContainer = document.getElementById('previewContainer');

        // Load saved photos on page load
        window.addEventListener('load', loadSavedPhotos);

        photoInput.addEventListener('change', handleFileSelect);

        function handleFileSelect(event) {
            const files = event.target.files;
            previewContainer.innerHTML = ''; // Clear existing previews

            for (const file of files) {
                savePhoto(file);
                displayPhoto(file);
            }
        }

        function savePhoto(file) {
            // Save photo data to localStorage
            const photoData = localStorage.getItem('photos') || '[]';
            const photos = JSON.parse(photoData);
            photos.push({ name: file.name, caption: 'Your Caption Here' });
            localStorage.setItem('photos', JSON.stringify(photos));
        }

        function displayPhoto(file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const container = document.createElement('div');
                container.classList.add('photoRow');

                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = 'Selected Photo';
                img.classList.add('photoPreview');

                const caption = document.createElement('div');
                caption.classList.add('photoCaption');

                const captionInput = document.createElement('input');
                captionInput.type = 'text';
                captionInput.value = 'Your Caption Here';
                captionInput.addEventListener('input', function () {
                    updateCaption(file.name, this.value);
                });

                // Attach a new click event listener
                img.addEventListener('click', function () {
                    const photoName = file.name;
                    deletePhoto(photoName);
                    container.remove(); // Remove the container from the DOM when clicked
                });

                container.appendChild(img);
                caption.appendChild(captionInput);
                container.appendChild(caption);
                previewContainer.appendChild(container);
            };

            reader.readAsDataURL(file);
        }

        function loadSavedPhotos() {
            const photoData = localStorage.getItem('photos');
            if (photoData) {
                const photos = JSON.parse(photoData);
                photos.forEach(photo => {
                    const container = document.createElement('div');
                    container.classList.add('photoRow');

                    const img = document.createElement('img');
                    img.src = `images/${photo.name}`; // Update the path accordingly
                    img.alt = 'Selected Photo';
                    img.classList.add('photoPreview');

                    const caption = document.createElement('div');
                    caption.classList.add('photoCaption');

                    const captionInput = document.createElement('input');
                    captionInput.type = 'text';
                    captionInput.value = photo.caption || 'Your Caption Here';
                    captionInput.addEventListener('input', function () {
                        updateCaption(photo.name, this.value);
                    });

                    // Attach a new click event listener
                    img.addEventListener('click', function () {
                        const photoName = photo.name;
                        deletePhoto(photoName);
                        container.remove(); // Remove the container from the DOM when clicked
                    });

                    container.appendChild(img);
                    caption.appendChild(captionInput);
                    container.appendChild(caption);
                    previewContainer.appendChild(container);
                });
            }
        }

        function deletePhoto(photoName) {
            // Delete photo by name from localStorage
            const photoData = localStorage.getItem('photos');
            if (photoData) {
                const photos = JSON.parse(photoData);
                const updatedPhotos = photos.filter(photo => photo.name !== photoName);
                localStorage.setItem('photos', JSON.stringify(updatedPhotos));
            }
        }

        function updateCaption(photoName, newCaption) {
            // Update the caption for a photo in localStorage
            const photoData = localStorage.getItem('photos');
            if (photoData) {
                const photos = JSON.parse(photoData);
                const updatedPhotos = photos.map(photo => {
                    if (photo.name === photoName) {
                        return { ...photo, caption: newCaption };
                    }
                    return photo;
                });
                localStorage.setItem('photos', JSON.stringify(updatedPhotos));
            }
        }