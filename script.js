// Función para cargar las categorías
async function loadCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        const categoryButtons = document.getElementById('category-buttons');
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.classList.add('category-button');
            button.addEventListener('click', () => loadProducts(category));
            categoryButtons.appendChild(button);
        });
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    }
}

// Función para cargar los productos de una categoría
async function loadProducts(category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const products = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpiar productos anteriores
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>Categoría: ${product.category}</p>
                    <p>${product.description}</p>
                    <p class="product-price">Precio: $${product.price}</p>
                    <p>Stock: ${product.rating.count}</p>
                    <p>Impuesto (rate): ${product.rating.rate}</p>
                </div>
            `;
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Cargar las categorías cuando la página se carga
document.addEventListener('DOMContentLoaded', loadCategories);