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

    carouselDiv.innerHTML = innerContent;
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
    ]

    'carousel-lerma': [
      'NodoLerma/NODOLERMA001.jpg',
      'NodoLerma/NODOLERMA002.jpg',
      'NodoLerma/NODOLERMA003.jpg',
      'NodoLerma/NODOLERMA004.jpg'
    ]

  };

  for (const [carouselId, images] of Object.entries(galleries)) {
    createCarousel(carouselId, images);
  }

  let currentIndex = 0;

  document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1);
  });

  document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1);
  });

  function navigate(direction) {
    const galleryContainer = document.querySelector('.gallery-container');
    const totalImages = document.querySelectorAll('.gallery-item').length;
    
    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    const offset = -currentIndex * 100;
    
    galleryContainer.style.transform = `translateX(${offset}%)`;
  }

  // AUTOPLAY
  let autoplayInterval = null;

  function startAutoplay(interval) {
    stopAutoplay();  // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    autoplayInterval = setInterval(() => {
      navigate(1);  // Navega a la siguiente imagen cada intervalo de tiempo.
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
