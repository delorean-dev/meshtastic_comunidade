const map = L.map('map').setView([39.5, -8.0], 7); // centro em Portugal

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Link do teu Apps Script Web App
const DATA_URL = 'https://script.google.com/macros/s/AKfycbzeUSZHCybjNSzWNnsJTgcJNhisnWv2E3VjOgPrygnxFkSpM5siqlOlhsqArq45dWZfOQ/exec';

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
