document.addEventListener('DOMContentLoaded', function () {
  function createGallery(galleryId, images) {
    const galleryDiv = document.getElementById(galleryId);
    if (!galleryDiv) return;

    let galleryContent = '<div class="row">';
    images.forEach((image, index) => {
      galleryContent += `
        <div class="col-lg-3 col-md-4 col-6">
          <div class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="${image}" alt="Image ${index + 1}">
          </div>
        </div>`;
    });
    galleryContent += '</div>';

    galleryDiv.innerHTML = galleryContent;
  }

  const galleries = {
    'gallery-page1': [
      'path/to/image1.jpg',
      'path/to/image2.jpg',
      'path/to/image3.jpg',
      'path/to/image4.jpg'
    ],
    'gallery-page2': [
      'path/to/another-image1.jpg',
      'path/to/another-image2.jpg',
      'path/to/another-image3.jpg',
      'path/to/another-image4.jpg'
    ]
    // Añade más galerías según sea necesario
  };

  for (const [galleryId, images] of Object.entries(galleries)) {
    createGallery(galleryId, images);
  }
});
