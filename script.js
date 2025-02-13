document.addEventListener('DOMContentLoaded', function () {
    const equipmentTypeSelect = document.getElementById('equipment-type');
    const addressableInput = document.getElementById('addressable');
    const formatInput = document.getElementById('format');
    const statusInput = document.getElementById('status');
    const equipTypeInput = document.getElementById('equip-type');
    const manufacturerInput = document.getElementById('manufacturer');
    const locationInput = document.getElementById('location');
    const eventsCheckbox = document.getElementById('events');
    const nvodCheckbox = document.getElementById('nvod');


    // Fetch equipment data from JSON file
    fetch('equipmentData.json')
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown
            data.forEach(equipment => {
                const option = document.createElement('option');
                option.value = equipment.type;
                option.textContent = equipment.type;
                equipmentTypeSelect.appendChild(option);
            });

            // Handle selection change
            equipmentTypeSelect.addEventListener('change', function () {
                const selectedEquipment = data.find(equipment => equipment.type === this.value);

                if (selectedEquipment) {
                    // Populate fields
                    addressableInput.value = selectedEquipment.addressable;

                    // Handle arrays (e.g., format, equipType, manufacturer, location)
                    formatInput.value = Array.isArray(selectedEquipment.format) ? selectedEquipment.format.join(', ') : selectedEquipment.format;
                    statusInput.value = selectedEquipment.status;
                    equipTypeInput.value = Array.isArray(selectedEquipment.equipType) ? selectedEquipment.equipType.join(', ') : selectedEquipment.equipType;
                    manufacturerInput.value = Array.isArray(selectedEquipment.manufacturer) ? selectedEquipment.manufacturer.join(', ') : selectedEquipment.manufacturer;
                    locationInput.value = Array.isArray(selectedEquipment.location) ? selectedEquipment.location.join(', ') : selectedEquipment.location;

                    eventsCheckbox.checked = selectedEquipment.eventsNvod === 'Y/N';
                    nvodCheckbox.checked = selectedEquipment.eventsNvod === 'Y/N';

                   
                } else {
                    // Clear fields if no equipment is selected
                    addressableInput.value = "";
                    formatInput.value = "";
                    statusInput.value = "";
                    equipTypeInput.value = "";
                    manufacturerInput.value = "";
                    locationInput.value = "";
                    eventsCheckbox.checked = false;
                    nvodCheckbox.checked = false;
                }
            });
        })
        .catch(error => console.error('Error fetching equipment data:', error));
});