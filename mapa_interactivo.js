// Inicializar el mapa
var map = L.map('map').setView([51.505, -0.09], 13);

// Agregar la capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable para almacenar el estado de agregar marcador
var addingMarker = false;

// Función para activar o desactivar el modo de agregar marcador
function toggleAddMarker() {
    addingMarker = !addingMarker;
    if (addingMarker) {
        map.on('click', onMapClick);
        document.getElementById('add-marker-btn').innerText = 'Click on the map to add marker';
    } else {
        map.off('click', onMapClick);
        document.getElementById('add-marker-btn').innerText = 'Add Marker';
    }
}

// Función para agregar un marcador en la ubicación del clic
function onMapClick(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);

    var popupContent = `
        <div>
            <h3>Add Details</h3>
            <label for="comment">Comment:</label><br>
            <input type="text" id="comment" name="comment"><br>
            <label for="photo">Photo URL:</label><br>
            <input type="text" id="photo" name="photo"><br>
            <label for="video">Video URL:</label><br>
            <input type="text" id="video" name="video"><br>
            <button onclick="saveDetails(this, ${marker._leaflet_id})">Save</button>
        </div>
    `;
    marker.bindPopup(popupContent).openPopup();

    toggleAddMarker(); // Desactivar el modo de agregar marcador después de agregar uno
}

// Función para guardar detalles del marcador
window.saveDetails = function(button, markerId) {
    var comment = button.parentNode.querySelector('#comment').value;
    var photo = button.parentNode.querySelector('#photo').value;
    var video = button.parentNode.querySelector('#video').value;

    var detailsContent = `<p><b>Comment:</b> ${comment}</p>`;
    if (photo) detailsContent += `<p><b>Photo:</b> <img src="${photo}" alt="Photo" width="100"></p>`;
    if (video) detailsContent += `<p><b>Video:</b> <a href="${video}" target="_blank">Watch Video</a></p>`;
    detailsContent += `<button onclick="addComment(${markerId})">Add Comment</button>`;

    var marker = map._layers[markerId];
    marker.bindPopup(detailsContent).openPopup();
    marker.dragging.disable(); // Desactivar el arrastre del marcador después de guardar los detalles
};

// Función para agregar un comentario al marcador
window.addComment = function(markerId) {
    var marker = map._layers[markerId];

    var currentPopupContent = marker.getPopup().getContent();
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentPopupContent;

    var addCommentPopupContent = `
        <div>
            <h3>Add Comment</h3>
            <label for="new-comment">New Comment:</label><br>
            <input type="text" id="new-comment" name="new-comment"><br>
            <button onclick="saveComment(this, ${markerId})">Save Comment</button>
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

    var updatedContent = `<p><b>Comment:</b> ${originalComment}</p>`;
    if (photoHTML) updatedContent += photoHTML;
    if (videoHTML) updatedContent += videoHTML;
    updatedContent += previousComments;
    updatedContent += `<p class="comment"><b>Additional Comment:</b> ${newComment}</p>`;
    updatedContent += `<button onclick="addComment(${markerId})">Add Comment</button>`;

    marker.bindPopup(updatedContent).openPopup();
};

// Evento del botón para activar o desactivar el modo de agregar marcador
document.getElementById('add-marker-btn').addEventListener('click', toggleAddMarker);
