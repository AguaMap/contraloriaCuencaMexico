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
    ],

    'carousel-inicio': [
      'NodoZumpango/NODOZUMPANGO001.jpg',
      'NodoZumpango/NODOZUMPANGO002.jpg',
      'NodoZumpango/NODOZUMPANGO003.jpg',
      'NodoZumpango/NODOZUMPANGO004.jpg',
      'NodoZumpango/NODOZUMPANGO005.jpg'
    ],

     'carousel-lerma': [
      'NodoLerma/NODOLERMA001.jpg',
      'NodoLerma/NODOLERMA002.jpg',
      'NodoLerma/NODOLERMA003.jpg',
      'NodoLerma/NODOLERMA004.jpg'
    ],

     'carousel-centro': [
      'NodoCentro/NODOCENTRO01.jpg',
      'NodoCentro/NODOCENTRO02.jpg',
      'NodoCentro/NODOCENTRO03.jpg',
      'NodoCentro/NODOCENTRO04.jpg',
      'NodoCentro/NODOCENTRO05.png',
      'NodoCentro/NODOCENTRO06.png',
      'NodoCentro/NODOCENTRO07.png',
      'NodoCentro/NODOCENTRO08.png'
    ],

     'carousel-tlahuac': [
      'NodoTlahuac/NODOTHAHUAC-XICO001.jpg',
      'NodoTlahuac/NODOTHAHUAC-XICO002.jpg',
      'NodoTlahuac/NODOTHAHUAC-XICO003.jpg',
      'NodoTlahuac/NODOTHAHUAC-XICO004.jpg'
    ],

     'carousel-tula': [
      'NodoTula/NODO_TULA01.jpg',
      'NodoTula/NODO_TULA02.jpg',
      'NodoTula/NODO_TULA03.jpg',
      'NodoTula/NODO_TULA04.jpg',
      'NodoTula/NODO_TULA05.jpg',
      'NodoTula/NODO_TULA06.jpg'
    ],

     'carousel-xochimilco': [
      'NodoXochimilco/NODOXOCHIMILCO001.jpg',
      'NodoXochimilco/NODOXOCHIMILCO002.jpg',
      'NodoXochimilco/NODOXOCHIMILCO003.jpg',
      'NodoXochimilco/NODOXOCHIMILCO004.jpg',
      'NodoXochimilco/NODOXOCHIMILCO005.jpg',
      'NodoXochimilco/NODOXOCHIMILCO006.jpg',
      'NodoXochimilco/NODOXOCHIMILCO007.jpg'
    ],

     'carousel-zumpango': [
      'NodoZumpango/NODOZUMPANGO001.jpg',
      'NodoZumpango/NODOZUMPANGO002.jpg',
      'NodoZumpango/NODOZUMPANGO003.jpg',
      'NodoZumpango/NODOZUMPANGO004.jpg',
      'NodoZumpango/NODOZUMPANGO005.jpg'
    ],

     'carousel-mapas': [
      'mapas/agentes_contaminantes.jpg',
      'mapas/control_extraccion.jpg',
      'mapas/mapa_pozos.jpg',
      'mapas/riesgo_geologico.jpg'
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
  startAutoplay(6000);

  // Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
  });
});
