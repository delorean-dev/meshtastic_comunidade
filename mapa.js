const bounds = [
  [36.8, -9.5],  // sudoeste
  [42.2, -6.0]   // nordeste
];

const map = L.map('map', {
  minZoom: 7,
  maxBounds: bounds
}).setView([39.5, -8.0], 7);

map.on('drag', () => {
  map.panInsideBounds(bounds, { animate: false });
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and others'
}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors',
  opacity: 0.6
}).addTo(map);

// fetch dados, etc (mantém o que já tens)
