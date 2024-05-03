import parkTypesArray from './parkTypeData.js';
document.addEventListener('DOMContentLoaded', function () {
    
    const typeSelect = document.getElementById('type');



    // Populate select options
    parkTypesArray.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeSelect.appendChild(option);
    });
});