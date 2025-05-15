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

const DATA_URL = 'https://script.google.com/macros/s/AKfycbwui9msLGM2HDkN3P4yPlPnIYbfGSj_GnugpYxjn0AKa73wCR_MJ6Az4FPqkIhA0jGy/exec';

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(entry => {
      const lat = parseFloat(entry["Latitude"]);
      const lon = parseFloat(entry["Longitude"]);
      const nomeEquip = entry["Nome do seu equipamento ou do que quer dar."];
      const nick = entry["Qual o nome onde o podemos encontrar no telegram?"];
      const instalado = entry["Já instalou o equipamento?"];
      const local = entry["Dentro de Casa / Telhado / Serra"];
      const futuro = entry["Se não instalou, onde pretende colocar?"];

      if (!isNaN(lat) && !isNaN(lon)) {
        const popupContent = `
          <strong>${nomeEquip}</strong><br>
          Telegram: ${nick}<br>
          Instalado: ${instalado}<br>
          Local: ${local || futuro}
        `;

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(popupContent);
      }
    });
  })
  .catch(err => {
    console.error("Erro ao carregar os dados:", err);
  });
