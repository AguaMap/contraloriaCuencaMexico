document.addEventListener('DOMContentLoaded', function () {
  function createCarousel(carouselId, images) {
    const carouselDiv = document.getElementById(carouselId);
    if (!carouselDiv) return;

    let innerContent = '';
    images.forEach((image) => {
      innerContent += `
        <figure class="gallery-item">
          <img src="${image}" alt="Imagen">
        </figure>`;
    });

    carouselDiv.querySelector('.gallery-container').innerHTML = innerContent;
  }

  const galleries = {
    'carousel-texcoco': [
      'NodoTexcoco/NODOTEXCOCO001.jpg',
      'NodoTexcoco/NODOTEXCOCO002.jpg',
      'NodoTexcoco/NODOTEXCOCO003.jpg',
      'NodoTexcoco/NODOTEXCOCO004.jpg',
      'NodoTexcoco/NODOTEXCOCO005.jpg',
      'NodoTexcoco/NODOTEXCOCO006.jpg',
      'NodoTexcoco/NODOTEXCOCO007.jpg',
      'NodoTexcoco/NODOTEXCOCO008.jpg'
    ],
    'carousel-lerma': [
      'NodoLerma/NODOLERMA001.jpg',
      'NodoLerma/NODOLERMA002.jpg',
      'NodoLerma/NODOLERMA003.jpg',
      'NodoLerma/NODOLERMA004.jpg'
    ]
  };

  const carouselIndices = {
    'carousel-texcoco': 0,
    'carousel-lerma': 0
  };

  function navigate(carouselId, direction) {
    const galleryContainer = document.querySelector(`#${carouselId} .gallery-container`);
    const totalImages = document.querySelectorAll(`#${carouselId} .gallery-item`).length;
    
    carouselIndices[carouselId] = (carouselIndices[carouselId] + direction + totalImages) % totalImages;
    const offset = -carouselIndices[carouselId] * 100;
    
    galleryContainer.style.transform = `translateX(${offset}%)`;
  }

  for (const [carouselId, images] of Object.entries(galleries)) {
    createCarousel(carouselId, images);

    document.querySelector(`#${carouselId} .prev-button`).addEventListener('click', () => {
      navigate(carouselId, -1);
    });

    document.querySelector(`#${carouselId} .next-button`).addEventListener('click', () => {
      navigate(carouselId, 1);
    });
  }

  // AUTOPLAY
  let autoplayInterval = null;

  function startAutoplay(interval) {
    stopAutoplay();  // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    autoplayInterval = setInterval(() => {
      for (const carouselId of Object.keys(galleries)) {
        navigate(carouselId, 1);
      }
    }, interval);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Iniciar autoplay con un intervalo de 3 segundos.
  startAutoplay(3000);

  // Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
  });
});
