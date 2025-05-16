const bounds = [
  [36.8, -9.5],  // sudoeste Portugal
  [42.2, -6.0]   // nordeste Portugal
];

const map = L.map('map-overlay', {
  minZoom: 7,
  maxBounds: bounds,
  zoomControl: false,
  attributionControl: false
}).setView([39.5, -8.0], 7);

// Usamos um tile layer totalmente transparente para só mostrar os pins
L.tileLayer('', {
  maxZoom: 18
}).addTo(map);

// URL do teu Apps Script Web App (dados Google Forms)
const DATA_URL = 'https://script.google.com/macros/s/AKfycbwui9msLGM2HDkN3P4yPlPnIYbfGSj_GnugpYxjn0AKa73wCR_MJ6Az4FPqkIhA0jGy/exec';

fetch(DATA_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(entry => {
      const lat = parseFloat(entry["Latitude"]);
      const lon = parseFloat(entry["Longitude"]);
      const nick = entry["Nome do seu equipamento ou do que quer dar."] || entry["Nick no Telegram"];
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
