import parkTypesArray from './parkTypeData.js';
import nationalParksArray from './nationalParkData.js';

document.addEventListener('DOMContentLoaded', function () {
    const typeSelect = document.getElementById('type');
    const searchButton = document.getElementById('searchButton');

    // Populate select options
    parkTypesArray.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    // Add event listener for the search button
    searchButton.addEventListener('click', handleSearch);

    function handleSearch() {
        const selectedType = typeSelect.value.trim().toLowerCase();
        // Filter parks by selected type
        const filteredParks = nationalParksArray.filter(park => park.type.toLowerCase() === selectedType);
        // Redirect to search results page with filtered parks
        redirectToSearchResults(filteredParks);
    }

    function redirectToSearchResults(filteredParks) {
        // Implement redirection logic here
    }
});