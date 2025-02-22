document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const equipmentList = document.getElementById('equipmentList');
    const equipmentDetails = document.getElementById('equipmentDetails');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');
    
    // State
    let selectedEquipment = null;
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Theme Management
    const initializeTheme = () => {
        document.body.setAttribute('data-theme', currentTheme);
        themeToggle.innerHTML = `<span class="material-icons">${currentTheme === 'light' ? 'dark_mode' : 'light_mode'}</span>`;
    };

    const toggleTheme = () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        themeToggle.innerHTML = `<span class="material-icons">${currentTheme === 'light' ? 'dark_mode' : 'light_mode'}</span>`;
    };

    // Equipment List Rendering
    const renderEquipmentList = (items) => {
        equipmentList.innerHTML = items.map(item => `
            <div class="equipment-item ${selectedEquipment?.type === item.type ? 'selected' : ''}" 
                 data-type="${item.type}"
                 role="button"
                 tabindex="0">
                <span class="material-icons">inventory_2</span>
                ${item.type}
            </div>
        `).join('');

        // Add click and keyboard listeners
        document.querySelectorAll('.equipment-item').forEach(item => {
            item.addEventListener('click', () => selectEquipmentByType(item.dataset.type));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectEquipmentByType(item.dataset.type);
                }
            });
        });
    };

    // Equipment Details Rendering
    const renderEquipmentDetails = (equipment) => {
        const [events, nvod] = equipment.eventsNvod.split('/');
        
        equipmentDetails.innerHTML = `
            <div class="details-header">
                <h2 class="text-xl font-semibold mb-4">${equipment.type}</h2>
            </div>
            <div class="detail-grid">
                <div class="detail-item">
                    <h3>Addressable</h3>
                    <p>${equipment.addressable}</p>
                </div>
                <div class="detail-item">
                    <h3>Format</h3>
                    <p>${Array.isArray(equipment.format) ? equipment.format.join(', ') : equipment.format}</p>
                </div>
                <div class="detail-item">
                    <h3>Status</h3>
                    <span class="status-badge status-${equipment.status.toLowerCase()}">
                        ${equipment.status}
                    </span>
                </div>
                <div class="detail-item">
                    <h3>Equipment Type</h3>
                    <p>${equipment.equipType.join(', ')}</p>
                </div>
                <div class="detail-item">
                    <h3>Manufacturer</h3>
                    <p>${equipment.manufacturer.join(', ')}</p>
                </div>
                <div class="detail-item">
                    <h3>Location</h3>
                    <p>${equipment.location.join(', ')}</p>
                </div>
                <div class="detail-item">
                    <h3>Rates</h3>
                    <p>${equipment.rates}</p>
                </div>
                <div class="detail-item">
                    <h3>Features</h3>
                    <div class="feature-tags">
                        <span class="feature-tag ${events === 'Y' ? 'supported' : 'not-supported'}">
                            <span class="material-icons">${events === 'Y' ? 'check_circle' : 'cancel'}</span>
                            Events Support
                        </span>
                        <span class="feature-tag ${nvod === 'Y' ? 'supported' : 'not-supported'}">
                            <span class="material-icons">${nvod === 'Y' ? 'check_circle' : 'cancel'}</span>
                            NVOD Support
                        </span>
                    </div>
                </div>
            </div>
        `;
    };

    // Equipment Selection
    const selectEquipmentByType = (type) => {
        const equipment = equipmentData.find(e => e.type === type);
        if (equipment) {
            selectedEquipment = equipment;
            renderEquipmentList(equipmentData);
            renderEquipmentDetails(equipment);
        }
    };

    // Search Implementation with Debounce
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const handleSearch = (searchTerm) => {
        const normalizedTerm = searchTerm.toLowerCase();
        const filteredEquipment = equipmentData.filter(item =>
            item.type.toLowerCase().includes(normalizedTerm) ||
            item.equipType.some(type => type.toLowerCase().includes(normalizedTerm)) ||
            item.manufacturer.some(mfr => mfr.toLowerCase().includes(normalizedTerm))
        );
        renderEquipmentList(filteredEquipment);
    };

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    searchInput.addEventListener('input', debounce(e => handleSearch(e.target.value), 300));

    // Initialize
    initializeTheme();
    renderEquipmentList(equipmentData);
});