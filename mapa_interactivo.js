// Inicializar el mapa centrado en la Ciudad de México con el zoom adecuado
var map = L.map('map').setView([19.4326, -99.1332], 10);

// Agregar la capa de mapa base de OpenStreetMap
var osmLayer = L.tileLayer.provider('OpenStreetMap.Mapnik');

// Agregar la capa de Google Maps
var googleMapsLayer = L.tileLayer.provider('GoogleMaps');

// Agregar la capa de Google Satellite
var googleSatelliteLayer = L.tileLayer.provider('GoogleSatellite');

// Añadir la capa OSM por defecto
osmLayer.addTo(map);

// Control de capas
var baseLayers = {
    "OpenStreetMap": osmLayer,
    "Google Maps": googleMapsLayer,
    "Google Satellite": googleSatelliteLayer
};

L.control.layers(baseLayers).addTo(map);

// Variable para almacenar el estado de agregar marcador
var addingMarker = false;

// Función para activar o desactivar el modo de agregar marcador
function toggleAddMarker() {
    addingMarker = !addingMarker;
    if (addingMarker) {
        map.on('click', onMapClick);
        document.getElementById('add-marker-btn').innerText = 'Haz click sobre el mapa para agregar un marcador';
    } else {
        map.off('click', onMapClick);
        document.getElementById('add-marker-btn').innerText = 'Agregar comentario';
    }
}

// Función para agregar un marcador en la ubicación del clic
function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);

    var popupContent = `
        <div class="popup-content">
            <h3>Agregar detalles</h3>
            <label for="comment">Comentario:</label><br>
            <input type="text" id="comment" name="comment"><br>
            <label for="photo">Foto:</label><br>
            <input type="file" id="photo" name="photo" accept="image/*"><br>
            <label for="video">Vídeo:</label><br>
            <input type="file" id="video" name="video" accept="video/*"><br>
            <button class="popup-button" onclick="saveDetails(this, ${marker._leaflet_id})">Guardar</button>
        </div>
    `;
    marker.bindPopup(popupContent).openPopup();

    toggleAddMarker(); // Desactivar el modo de agregar marcador después de agregar uno
}

// Función para guardar detalles del marcador
window.saveDetails = function(button, markerId) {
    var comment = button.parentNode.querySelector('#comment').value;
    var photo = button.parentNode.querySelector('#photo').files[0];
    var video = button.parentNode.querySelector('#video').files[0];

    if (photo && photo.size > 20 * 1024 * 1024) {
        alert("La foto no puede ser mayor a 20 MB.");
        return;
    }
    if (video && video.size > 20 * 1024 * 1024) {
        alert("El video no puede ser mayor a 20 MB.");
        return;
    }

    var detailsContent = `<p><b>Comentario:</b> ${comment}</p>`;
    if (photo) {
        var photoUrl = URL.createObjectURL(photo);
        detailsContent += `<p><b>Foto:</b> <a href="${photoUrl}" target="_blank"><img src="${photoUrl}" alt="Foto" width="100"></a></p>`;
    }
    if (video) {
        var videoUrl = URL.createObjectURL(video);
        detailsContent += `<p><b>Vídeo:</b> <a href="${videoUrl}" target="_blank">Ver Vídeo</a></p>`;
    }
    detailsContent += `<button class="popup-button" onclick="addComment(${markerId})">Agregar comentario</button>`;

    var marker = map._layers[markerId];
    marker.bindPopup(detailsContent).openPopup();
    marker.dragging.disable(); // Desactivar el arrastre del marcador después de guardar los detalles

    // Guardar los detalles del marcador en localStorage
    saveMarkerToLocalStorage(markerId, marker.getLatLng(), detailsContent);
};

// Función para agregar un comentario al marcador
window.addComment = function(markerId) {
    var marker = map._layers[markerId];

    var currentPopupContent = marker.getPopup().getContent();
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentPopupContent;

    var addCommentPopupContent = `
        <div class="popup-content">
            <h3>Agregar comentario</h3>
            <label for="new-comment">Nuevo comentario:</label><br>
            <input type="text" id="new-comment" name="new-comment"><br>
            <button class="popup-button" onclick="saveComment(this, ${markerId})">Guardar comentario</button>
        </div>
    `;
    marker.bindPopup(addCommentPopupContent).openPopup();
};

// Función para guardar un nuevo comentario
window.saveComment = function(button, markerId) {
    var newComment = button.parentNode.querySelector('#new-comment').value;

    var marker = map._layers[markerId];
    var currentPopupContent = marker.getPopup().getContent();
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentPopupContent;

    var originalComment = tempDiv.querySelector('p:nth-child(1)').innerText;
    var photoHTML = tempDiv.querySelector('p:nth-child(2)') ? tempDiv.querySelector('p:nth-child(2)').outerHTML : '';
    var videoHTML = tempDiv.querySelector('p:nth-child(3)') ? tempDiv.querySelector('p:nth-child(3)').outerHTML : '';
    var previousComments = tempDiv.querySelectorAll('p.comment') ? Array.from(tempDiv.querySelectorAll('p.comment')).map(p => p.outerHTML).join('') : '';

    var updatedContent = `<p><b>Comentario:</b> ${originalComment}</p>`;
    if (photoHTML) updatedContent += photoHTML;
    if (videoHTML) updatedContent += videoHTML;
    updatedContent += previousComments;
    updatedContent += `<p class="comment"><b>Comentario adicional:</b> ${newComment}</p>`;
    updatedContent += `<button class="popup-button" onclick="addComment(${markerId})">Agregar comentario</button>`;

    marker.bindPopup(updatedContent).openPopup();

    // Actualizar los detalles del marcador en localStorage
    saveMarkerToLocalStorage(markerId, marker.getLatLng(), updatedContent);
};

// Guardar detalles del marcador en localStorage
function saveMarkerToLocalStorage(markerId, latlng, content) {
    var markers = JSON.parse(localStorage.getItem('markers')) || {};
    markers[markerId] = { latlng: latlng, content: content };
    localStorage.setItem('markers', JSON.stringify(markers));
}

// Cargar marcadores desde localStorage
function loadMarkersFromLocalStorage() {
    var markers = JSON.parse(localStorage.getItem('markers')) || {};
    for (var markerId in markers) {
        if (markers.hasOwnProperty(markerId)) {
            var markerData = markers[markerId];
            var marker = L.marker([markerData.latlng.lat, markerData.latlng.lng], { draggable: false }).addTo(map);
            marker.bindPopup(markerData.content);
        }
    }
}

// Evento del botón para activar o desactivar el modo de agregar marcador
document.getElementById('add-marker-btn').addEventListener('click', toggleAddMarker);

// Cargar los marcadores cuando se carga la página
window.onload = loadMarkersFromLocalStorage;
