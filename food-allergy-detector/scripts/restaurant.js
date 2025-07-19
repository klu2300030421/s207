// Load restaurant menu from URL params
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = parseInt(urlParams.get('id'));
    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (restaurant) {
        document.getElementById('restaurant-name').textContent = restaurant.name;
        loadMenuItems(restaurant.menu);
    }
});

function loadMenuItems(menu) {
    const breakfastItems = menu.filter(item => item.category === "breakfast");
    const mainItems = menu.filter(item => item.category === "main");
    
    renderItems(breakfastItems, "breakfast-items");
    renderItems(mainItems, "main-items");
}

function renderItems(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <h4>${item.name}</h4>
            ${item.allergens.length > 0 ? 
                `<span class="allergy-tag">⚠️ Contains ${item.allergens.join(', ')}</span>` : ''}
        </div>
    `).join('');
    
    // Add click event to view details
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = `item.html?id=${item.dataset.id}`;
        });
    });
}