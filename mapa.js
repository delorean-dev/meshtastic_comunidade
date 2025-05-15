
const map = L.map('map').setView([39.5, -8.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('membros.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(membro => {
      L.marker([membro.lat, membro.lng])
        .addTo(map)
        .bindPopup(`<b>${membro.nome}</b><br>
                    Telegram: ${membro.nick_telegram}<br>
                    Rádio: ${membro.radio}<br>
                    Antena: ${membro.antena}<br>
                    Obs: ${membro.obs}`);
    });
  });
