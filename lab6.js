
function mapping() {
    const map = L.map('map').setView([37.09024, -95.712891], 4); // Default map of The US

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const coordinates = [];
    const info = document.getElementById('marker');

    for (let i = 1; i <= 3; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3);
        coordinates.push({ lat: latitude, lon: longitude });

        // Create a marker
        const marker = L.marker([latitude, longitude]).addTo(map);

        // Step 4: Fetch locality from API
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
                const locality = data.locality || 'Locality not found';
                info.innerHTML += `<h4>Marker ${i}: Latitude: ${latitude}, Longitude: ${longitude} <br> locality: ${locality}</h4>`;
            })
    }
    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;

    }
}


window.onload = mapping;