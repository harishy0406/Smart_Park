// Sample Data for Parking Locations
const parkingLocations = [
    { name: "Downtown Parking", address: "123 Main St, City A" },
    { name: "Mall Parking", address: "456 Elm St, City B" },
    { name: "Airport Parking", address: "789 Oak St, City C" },
];

// Search Functionality
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchLocation').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    const filteredLocations = parkingLocations.filter(location =>
        location.name.toLowerCase().includes(searchQuery) ||
        location.address.toLowerCase().includes(searchQuery)
    );

    if (filteredLocations.length > 0) {
        filteredLocations.forEach(location => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <strong>${location.name}</strong><br>
                <small>${location.address}</small>
            `;
            resultItem.addEventListener('click', () => showBookingForm(location));
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
});

// Show Booking Form
function showBookingForm(location) {
    const bookingForm = document.getElementById('bookingForm');
    const parkingLocationInput = document.getElementById('parkingLocation');

    parkingLocationInput.value = `${location.name} - ${location.address}`;
    bookingForm.style.display = 'block';
}

// Booking Form Submission
document.getElementById('bookingDetails').addEventListener('submit', function (e) {
    e.preventDefault();

    const location = document.getElementById('parkingLocation').value;
    const vehicleType = document.getElementById('vehicleType').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    alert(`Booking Confirmed!\nLocation: ${location}\nVehicle: ${vehicleType}\nDate: ${date}\nTime: ${time}`);

    // Reset Form
    document.getElementById('bookingDetails').reset();
    document.getElementById('bookingForm').style.display = 'none';
});