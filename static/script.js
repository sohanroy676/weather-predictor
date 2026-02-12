document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("weather-form");
  const submitBtn = document.querySelector(".btn");
  const locationOption = document.getElementById("location-option");
  const coordsInput = document.getElementById("coords-input");
  const manualInput = document.getElementById("manual-input");
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");
  const locationNameInput = document.getElementById("location-name");

  locationOption.addEventListener("change", function () {
    const selected = locationOption.value;

    if (selected === "coords") {
      coordsInput.style.display = "block";
      manualInput.style.display = "none";
    } else if (selected === "manual") {
      coordsInput.style.display = "none";
      manualInput.style.display = "block";
    } else if (selected === "auto") {
      coordsInput.style.display = "none";
      manualInput.style.display = "none";
      getCurrentLocation();
    }
  });

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          latitudeInput.value = position.coords.latitude;
          longitudeInput.value = position.coords.longitude;
        },
        function (error) {
          alert("Error fetching location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }

  window.fetchCoordsFromLocation = function () {
    const locationName = locationNameInput.value;
    if (!locationName) {
      alert("Please enter a location.");
      return;
    }

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          latitudeInput.value = data[0].lat;
          longitudeInput.value = data[0].lon;
        } else {
          alert("Location not found. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error fetching coordinates.");
      });
  };
});
