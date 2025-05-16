const portugalBounds = L.latLngBounds([
  [36.8, -9.5],  // sudoeste continente
  [42.2, -6.0]   // nordeste continente
]);

// Polígono que inclui continente + ilhas (simplificado)
const portugalPolygon = L.polygon([
  // Contorno Portugal continental (exemplo simplificado)
  [36.8, -9.5],
  [36.8, -6.0],
  [42.2, -6.0],
  [42.2, -9.5],

  // Madeira (exemplo aproximado)
  [32.5, -17.5],
  [32.5, -16.0],
  [33.5, -16.0],
  [33.5, -17.5],

  // Açores (exemplo aproximado)
  [37.0, -31.5],
  [37.0, -25.5],
  [40.0, -25.5],
  [40.0, -31.5],

  [36.8, -9.5] // volta ao ponto inicial para fechar
]);

const map = L.map('map', {
  zoomControl: true,
  maxZoom: 18,
  minZoom: 6,
}).setView([39.5, -8.0], 7);

// Limita a navegação dentro do polígono com plugin leaflet-path-drag ou lógica customizada
// Mas sem plugin, podes usar fitBounds para mostrar todo Portugal + ilhas:
map.fitBounds(portugalPolygon.getBounds());

// Adiciona a camada de satélite etc...

// Se quiseres, podes adicionar o polígono para visualizar (debug)
// portugalPolygon.addTo(map);
