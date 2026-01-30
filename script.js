const detectBtn = document.getElementById("detectBtn");

detectBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        alert("Geolocation not supported");
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("location").innerText =
                `📍 Your Location`;

            document.getElementById("temperature").innerText =
                `${data.current_weather.temperature} °C`;

            document.getElementById("condition").innerText =
                `Wind: ${data.current_weather.windspeed} km/h`;
        })
        .catch(() => {
            alert("Failed to fetch weather data");
        });
}

function showError(error) {
    alert("Location access denied");
}


