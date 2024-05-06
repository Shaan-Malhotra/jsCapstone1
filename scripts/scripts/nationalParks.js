import parkTypesArray from './parkTypeData.js';
import nationalParksArray from './nationalParkData.js';
import locationsArray from './locationData.js';

document.addEventListener('DOMContentLoaded', function () {
    const typeSelect = document.getElementById('type');
    const typeSearchButton = document.getElementById('typeSearchButton');
    const locationSelect = document.getElementById('location');
    const locationSearchButton = document.getElementById('locationSearchButton');

    // Populate select options
    locationsArray.forEach(state => {
        const option = document.createElement('option');
        option.value = state.toLowerCase();
        option.textContent = state;
        locationSelect.appendChild(option);
    });
    
    parkTypesArray.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    // Add event listener for the search button
    typeSearchButton.addEventListener('click', handleTypeSearch);
    locationSearchButton.addEventListener('click', handleLocationSearch);


    function handleLocationSearch() {
        const selectedState = locationSelect.value.trim().toLowerCase();
        // Filter parks by selected state
        const stateParks = nationalParksArray.filter(park => park.State.toLowerCase() === selectedState);
        // Redirect to search results page with filtered parks
        displayParksByState(stateParks);
    }
    function handleTypeSearch() {
        const selectedType = typeSelect.value.trim().toLowerCase();
        // Filter parks by selected type
        const typeParks = nationalParksArray.filter(park => park.LocationName.toLowerCase().includes(selectedType));
        // Redirect to search results page with filtered parks
        displayParksByType(typeParks);
    }

    function displayParksByState(filteredParks) {
        const parkListContainerState = document.getElementById('parkListContainerState');
        parkListContainerState.innerHTML = ''; // Clear previous park list

        if (filteredParks.length === 0) {
            // Display message if no parks found
            const message = document.createElement('p');
            message.textContent = 'No national parks found in the selected state.';
            parkListContainerState.appendChild(message);
        } else {
            // Create list of parks
            const parkList = document.createElement('ul');
            filteredParks.forEach(park => {
                const listItem = document.createElement('li');
                listItem.textContent = park.LocationName;
                parkList.appendChild(listItem);
            });
            parkListContainerState.appendChild(parkList);
        }
    }

    function displayParksByType(filteredParks) {
        const parkListContainerType = document.getElementById('parkListContainerType');
        parkListContainerType.innerHTML = ''; // Clear previous park list

        if (filteredParks.length === 0) {
            // Display message if no parks found
            const message = document.createElement('p');
            message.textContent = 'No national parks found with the selected type.';
            parkListContainerType.appendChild(message);
        } else {
            // Create list of parks
            const parkList = document.createElement('ul');
            filteredParks.forEach(park => {
                const listItem = document.createElement('li');
                listItem.textContent = park.LocationName;
                parkList.appendChild(listItem);
            });
            parkListContainerType.appendChild(parkList);
        }
    }
});