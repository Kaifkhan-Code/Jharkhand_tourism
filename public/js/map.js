document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.querySelector("#place-map");
  if (!mapElement || typeof L === "undefined") return;

  const latitude = Number(mapElement.dataset.lat);
  const longitude = Number(mapElement.dataset.lng);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

  const map = L.map(mapElement).setView([latitude, longitude], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(mapElement.dataset.name)
    .openPopup();

  const locateButton = document.querySelector("#locate-me");
  const status = document.querySelector("#location-status");

  if (!locateButton || !status) return;

  locateButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      status.textContent = "Your browser does not support location sharing.";
      return;
    }

    locateButton.disabled = true;
    locateButton.textContent = "Finding you...";
    status.textContent = "Waiting for permission to read your location...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        const userMarker = L.circleMarker(userLocation, {
          radius: 9,
          color: "#a63d2f",
          fillColor: "#d9a441",
          fillOpacity: 1,
          weight: 3,
        }).addTo(map).bindPopup("You are here").openPopup();

        L.polyline([userLocation, [latitude, longitude]], {
          color: "#a63d2f",
          dashArray: "8 8",
          weight: 3,
        }).addTo(map);

        map.fitBounds([userLocation, [latitude, longitude]], { padding: [35, 35] });
        status.textContent = "Your location is shown. The dotted line points to this place.";
        locateButton.textContent = "Location shown";
      },
      (error) => {
        const message = error.code === 1
          ? "Location permission was denied. You can allow it in your browser settings."
          : "We could not find your location. Please try again.";
        status.textContent = message;
        locateButton.disabled = false;
        locateButton.textContent = "Try again";
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
});