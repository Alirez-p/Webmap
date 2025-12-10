// Function to load a GeoJSON layer
function addLayer(url, name, style, legendEntry) {
    fetch(url)
      .then(r => r.json())
      .then(data => {
          const layer = L.geoJSON(data, { style }).addTo(map);

          overlayLayers[name] = layer;
          layerControl.addOverlay(layer, name);

          console.log("Loaded:", name);

          // Add legend entry
          if (legendEntry) {
              addLegendItem(name, legendEntry.color, legendEntry.type);
          }
      })
      .catch(err => console.error("Error loading " + name, err));
}

// ---- Load all layers from layers.json ----
fetch("Layers.json")
  .then(r => r.json())
  .then(list => {

      list.forEach(item => {
          addLayer(
              "Data/" + item.file,
              item.name,
              item.style,
              { color: item.style.color, type: "line" }
          );
      });

  });
