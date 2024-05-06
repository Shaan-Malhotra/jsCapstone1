import mountainsArray from './mountainData.js';


document.addEventListener('DOMContentLoaded', function () {
    const mountainSelect = document.getElementById('mountainSelect');
    let sunrise;
    let sunset;
    async function getSunriseForMountain(lat, lng){
        let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
        let data = await response.json();
        return data.results.sunrise;
    }
    async function getSunsetForMountain(lat, lng){
        let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
        let data = await response.json();
        return data.results.sunset;
    }

    mountainsArray.forEach(mountain => {
        const option = document.createElement('option');
        option.textContent = mountain.name;
        option.value = mountain.name.toLowerCase(); 
        mountainSelect.appendChild(option);
    });
    
    // Function to handle search button click
    function handleSearchButtonClick() {
        const selectedMountain = document.getElementById('mountainSelect').value;
        console.log(selectedMountain);
        if (selectedMountain) {
            displayMountainInfo(selectedMountain);
        } else {
            alert('Please select a mountain first.');
        }
    }
    document.getElementById('searchButton').addEventListener('click', handleSearchButtonClick);
    // Function to display mountain information
    function displayMountainInfo(mountainName) {
        const mountainInfoContainer = document.getElementById('mountainInfoContainer');
        mountainInfoContainer.innerHTML = ''; // Clear previous mountain info
    
        // Find the mountain object with the given name in the mountainsArray
        const selectedMountain = mountainsArray.find(mountain => mountain.name.toLowerCase() === mountainName);
    
        if (!selectedMountain) {
            // Display message if the mountain is not found
            const message = document.createElement('p');
            message.textContent = 'Mountain information not found.';
            mountainInfoContainer.appendChild(message);
        } else {
            const sunset = getSunriseForMountain(selectedMountain.coords.lat, selectedMountain.coords.lng);
            const sunrise = getSunsetForMountain(selectedMountain.coords.lat, selectedMountain.coords.lng);
            const mountainNameHeader = document.createElement('h3');
            const mountainElevation = document.createElement('p');
            const mountainEffort = document.createElement('p');
            const mountainSunrise = document.createElement('p');
            const mountainSunset = document.createElement('p');
            const mountainDescription = document.createElement('p');
            const mountainImage = document.createElement('img');
            
            
            mountainNameHeader.textContent = `Selected mountain: ${selectedMountain.name}`;
            mountainElevation.textContent = `Elevation: ${selectedMountain.elevation}`;
            mountainEffort.textContent = `Effort: ${selectedMountain.effort}`;
            mountainDescription.textContent = `Description: ${selectedMountain.desc}`;
            const imagePath = `../../images/${selectedMountain.img}`;
            mountainImage.src = imagePath;
    
            mountainInfoContainer.appendChild(mountainNameHeader);
            mountainInfoContainer.appendChild(mountainElevation);
            mountainInfoContainer.appendChild(mountainEffort);
            mountainInfoContainer.appendChild(mountainDescription);
            mountainInfoContainer.appendChild(mountainImage);

        
            getSunriseForMountain(selectedMountain.coords.lat, selectedMountain.coords.lng)
            .then(sunrise => {
                mountainSunrise.textContent = `Sunrise: ${sunrise}`;
                mountainInfoContainer.appendChild(mountainSunrise);
            });

            getSunsetForMountain(selectedMountain.coords.lat, selectedMountain.coords.lng)
                .then(sunset => {
                    mountainSunset.textContent = `Sunset: ${sunset}`;
                    mountainInfoContainer.appendChild(mountainSunset);
                });
        }
    }

   
});
