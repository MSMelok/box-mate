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
    const picture1 = document.getElementById('picture1');
    const picture2 = document.getElementById('picture2');
    const picture3 = document.getElementById('picture3');

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
                    formatInput.value = selectedEquipment.format;
                    statusInput.value = selectedEquipment.status;
                    equipTypeInput.value = selectedEquipment.equipType;
                    manufacturerInput.value = selectedEquipment.manufacturer;
                    locationInput.value = selectedEquipment.location;
                    eventsCheckbox.checked = selectedEquipment.events;
                    nvodCheckbox.checked = selectedEquipment.nvod;

                    // Populate pictures
                    picture1.src = selectedEquipment.pictures[0];
                    picture2.src = selectedEquipment.pictures[1];
                    picture3.src = selectedEquipment.pictures[2];
                    picture1.style.display = "block";
                    picture2.style.display = "block";
                    picture3.style.display = "block";
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
                    picture1.src = "";
                    picture2.src = "";
                    picture3.src = "";
                    picture1.style.display = "none";
                    picture2.style.display = "none";
                    picture3.style.display = "none";
                }
            });
        })
        .catch(error => console.error('Error fetching equipment data:', error));
});
