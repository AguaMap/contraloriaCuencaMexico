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
    'gallery-texcoco': [
      'NodoTexcoco/NODOTEXCOCO001.jpg',
      'NodoTexcoco/NODOTEXCOCO002.jpg',
      'NodoTexcoco/NODOTEXCOCO003.jpg',
      'NodoTexcoco/NODOTEXCOCO004.jpg',
      'NodoTexcoco/NODOTEXCOCO005.jpg',
      'NodoTexcoco/NODOTEXCOCO006.jpg',
      'NodoTexcoco/NODOTEXCOCO007.jpg',
      'NodoTexcoco/NODOTEXCOCO008.jpg'
    ]
  };

  for (const [galleryId, images] of Object.entries(galleries)) {
    createGallery(galleryId, images);
  }
});
