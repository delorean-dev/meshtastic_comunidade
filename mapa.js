// Definimos os limites para Portugal continental + ilhas (Açores e Madeira)
const portugalBounds = L.latLngBounds([
  [32.5, -31.5], // sudoeste Açores
  [42.2, -6.0]   // nordeste continente
]);

// Inicializa o mapa sem zoom fixo, vai ajustar ao bounds
const map = L.map('map').setView([39.5, -8.0], 7);

// Adiciona camada satélite Esri
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and others'
}).addTo(map);

// Adiciona camada só com labels OSM (opacidade para sobrepor no satélite)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors',
  opacity: 0.6
}).addTo(map);

// Ajusta o mapa para mostrar todo o território português + ilhas
map.fitBounds(portugalBounds);

// URL do teu Apps Script Web App para obter dados JSON
const DATA_URL = 'https://script.google.com/macros/s/AKfycbwui9msLGM2HDkN3P4yPlPnIYbfGSj_GnugpYxjn0AKa73wCR_MJ6Az4FPqkIhA0jGy/exec';

// busca os dados e adiciona marcadores
fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(entry => {
      const lat = parseFloat(entry["Latitude"]);
      const lon = parseFloat(entry["Longitude"]);
      const nick = entry["Nome do seu equipamento ou do que quer dar."] || entry["Nick no Telegram"] || "Sem Nome";
      const instalado = entry["Já instalou o equipamento?"] || "";
      const local = entry["Dentro de Casa / Telhado / Serra"] || "";
      const futuro = entry["Se não instalou, onde pretende colocar?"] || "";
      const obs = entry["Observações"] || "";

      if (!isNaN(lat) && !isNaN(lon)) {
        const popupContent = `
          <strong>${nick}</strong><br>
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
