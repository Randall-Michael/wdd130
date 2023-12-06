  // JavaScript to handle file input and display preview
  const photoInput = document.getElementById('photoInput');
  const previewContainer = document.getElementById('previewContainer');

  photoInput.addEventListener('change', handleFileSelect);

  function handleFileSelect(event) {
      const files = event.target.files;

      // Clear existing previews
      previewContainer.innerHTML = '';

      // Display preview for each selected file
      for (const file of files) {
          const reader = new FileReader();

          reader.onload = function (e) {
              const img = document.createElement('img');
              img.src = e.target.result;
              img.alt = 'Selected Photo';
              previewContainer.appendChild(img);
          };

          reader.readAsDataURL(file);
      }
  }