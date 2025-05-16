// inicializa o mapa centrado em Portugal
const map = L.map('map').setView([39.5, -8.0], 7);

// define os limites geográficos para Portugal
const bounds = [
  [36.8, -9.5],  // sudoeste (lat, lon)
  [42.2, -6.0]   // nordeste (lat, lon)
];

map.setMaxBounds(bounds);
map.on('drag', () => {
  map.panInsideBounds(bounds, { animate: false });
});

// camada satélite Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and others'
}).addTo(map);

// camada só com labels (textos) por cima para nomes das cidades etc (OSM)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors',
  opacity: 0.6
}).addTo(map);

// URL do teu Apps Script Web App para obter dados JSON
const DATA_URL = 'https://script.google.com/macros/s/AKfycbwui9msLGM2HDkN3P4yPlPnIYbfGSj_GnugpYxjn0AKa73wCR_MJ6Az4FPqkIhA0jGy/exec';

// busca os dados e adiciona marcadores
fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(entry => {
      const lat = parseFloat(entry["Latitude"]);
      const lon = parseFloat(entry["Longitude"]);
      const nick = entry["Nick no Telegram"];
      const radio = entry["Qual o equipamento que tem?"];
      const instalado = entry["Já instalou o equipamento?"];
      const local = entry["Dentro de Casa / Telhado / Serra"];
      const futuro = entry["Se não instalou, onde pretende colocar?"];
      const obs = entry["Observações"];

      if (!isNaN(lat) && !isNaN(lon)) {
        const popupContent = `
          <strong>${nick}</strong><br>
          Equipamento: ${radio}<br>
          Instalado: ${instalado}<br>
          Local: ${local || futuro}<br>
          Observações: ${obs || "Nenhuma"}
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
