const map = L.map('map').setView([39.5, -8.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

fetch('https://script.google.com/macros/s/AKfycbz9l5Qjlk2l6HOCI9ZZEd-bATmsX2V9U4n5ehvAt8D1JrPJaixLxQDRom_dAd5KLkys/exec')
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const lat = parseFloat(item.Latitude);
      const lon = parseFloat(item.Longitude);
      if (!isNaN(lat) && !isNaN(lon)) {
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`
          <b>Nick no Telegram:</b> ${item['Nick no Telegram']}<br>
          <b>Equipamento:</b> ${item['Qual o equipamento que tem?']}<br>
          <b>Já instalou?</b> ${item['Já instalou o equipamento?']}<br>
          <b>Localização:</b> ${item['Dentro de Casa / Telhado / Serra']}<br>
          <b>Se não instalou, onde pretende colocar:</b> ${item['Se não instalou, onde pretende colocar?'] || 'N/A'}<br>
          <b>Latitude:</b> ${item.Latitude}<br>
          <b>Longitude:</b> ${item.Longitude}
        `);
      }
    });
  });
