var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var markers = JSON.parse(localStorage.getItem('markers')) || [];
var markerIdCounter = 1;
var markerIdMap = {};

function addMarker() {
var title = prompt('Enter marker title:');
if (title !== null) {  // Check if the user pressed Cancel
var imageURL = prompt('Enter image URL (optional):');
var popupContent = '<div>' + title + '</div>' +
    '<textarea id="markerEntry_' + markerIdCounter + '" placeholder="Enter your entry here"></textarea>' +
    '<br><button onclick="saveEntry(' + markerIdCounter + ')">Save Entry</button>' +
    '<button onclick="editEntry(' + markerIdCounter + ')">Edit Entry</button>' +
    '<button onclick="deleteMarker(' + markerIdCounter + ')">Delete Marker</button>';

if (imageURL && imageURL.trim() !== '') {
    popupContent = '<img src="' + imageURL + '" alt="marker image" style="max-width:100%;">' + popupContent;
}

var popup = L.popup().setContent(popupContent);

var marker = L.marker(map.getCenter(), { draggable: true })
    .addTo(map)
    .bindPopup(popup)
    .on('dragend', function (event) {
        updateMarkers();
    });

var markerId = markerIdCounter++;

markers.push({
    id: markerId,
    title: title,
    entry: '', // Initial empty entry
    imageURL: imageURL,
    latlng: marker.getLatLng()
});

markerIdMap[markerId] = marker;

updateMarkers();
}
}

function saveEntry(markerId) {
    var entryText = document.getElementById('markerEntry_' + markerId).value;
    var marker = markerIdMap[markerId];

    var markerIndex = markers.findIndex(function (m) {
        return m.id === markerId;
    });

    if (markerIndex !== -1) {
        markers[markerIndex].entry = entryText;
    }

    marker.getPopup().setContent('<div>' + markers[markerIndex].title + '</div>' +
        '<textarea id="markerEntry_' + markerId + '" readonly>' + markers[markerIndex].entry + '</textarea>' +
        '<br><button onclick="editEntry(' + markerId + ')">Edit Entry</button>' +
        '<button onclick="deleteMarker(' + markerId + ')">Delete Marker</button>');

    updateMarkers();
}

function editEntry(markerId) {
    var marker = markerIdMap[markerId];
    var markerIndex = markers.findIndex(function (m) {
        return m.id === markerId;
    });

    if (markerIndex !== -1) {
        var entryText = markers[markerIndex].entry;

        marker.getPopup().setContent('<div>' + markers[markerIndex].title + '</div>' +
            '<textarea id="markerEntry_' + markerId + '">' + entryText + '</textarea>' +
            '<br><button onclick="saveEntry(' + markerId + ')">Save Entry</button>' +
            '<button onclick="deleteMarker(' + markerId + ')">Delete Marker</button>');

        updateMarkers();
    }
}

function deleteMarker(markerId) {
    var marker = markerIdMap[markerId];

    var markerIndex = markers.findIndex(function (m) {
        return m.id === markerId;
    });

    if (markerIndex !== -1) {
        map.removeLayer(marker);
        markers.splice(markerIndex, 1);
        delete markerIdMap[markerId];
        updateMarkers();
    }
}

function updateMarkers() {
    markers.forEach(function (markerData) {
        var marker = markerIdMap[markerData.id];
        if (marker) {
            markerData.latlng = marker.getLatLng();
        }
    });

    localStorage.setItem('markers', JSON.stringify(markers));
}

function loadMarkers() {
    for (var i = 0; i < markers.length; i++) {
        var marker = L.marker(markers[i].latlng, { draggable: true })
            .addTo(map)
            .bindPopup('<div>' + markers[i].title + '</div>' +
                '<textarea id="markerEntry_' + markers[i].id + '" readonly>' + markers[i].entry + '</textarea>' +
                '<br><button onclick="editEntry(' + markers[i].id + ')">Edit Entry</button>' +
                '<button onclick="deleteMarker(' + markers[i].id + ')">Delete Marker</button>')
            .on('dragend', function (event) {
                updateMarkers();
            });

        markerIdMap[markers[i].id] = marker;
    }
}

function searchMarkers() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();

    markers.forEach(function (markerData) {
        var marker = markerIdMap[markerData.id];
        if (marker) {
            var markerTitle = markerData.title.toLowerCase();

            if (markerTitle.includes(searchTerm)) {
                map.setView(markerData.latlng, 12);
                marker.openPopup();
            }
        }
    });
}

loadMarkers();