// Shopify Clone - Complete JavaScript Functionality

// Sample product data
const products = [
    {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        description: "High-quality wireless headphones with noise cancellation and premium sound.",
        rating: 4.5,
        stock: 15
    },
    {
        id: 2,
        title: "Designer Leather Jacket",
        price: 299.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400",
        description: "Premium leather jacket with modern design and perfect fit.",
        rating: 4.8,
        stock: 8
    },
    {
        id: 3,
        title: "Smart Home Hub",
        price: 149.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        description: "Complete smart home automation system with voice control.",
        rating: 4.3,
        stock: 12
    },
    {
        id: 4,
        title: "Organic Skincare Set",
        price: 89.99,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a5d571?w=400",
        description: "Complete organic skincare routine for all skin types.",
        rating: 4.7,
        stock: 20
    },
    {
        id: 5,
        title: "Gaming Laptop",
        price: 1299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
        description: "High-performance gaming laptop with latest specs and RGB keyboard.",
        rating: 4.6,
        stock: 5
    },
    {
        id: 6,
        title: "Designer Handbag",
        price: 249.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89dd76a180?w=400",
        description: "Luxury designer handbag with premium materials and elegant design.",
        rating: 4.9,
        stock: 10
    }
];

// Cart management
let cart = [];
let currentSlide = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    loadCartFromStorage();
    setupHeroSlider();
}

// Product Functions
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            ${product.stock < 5 ? '<span class="product-badge">Low Stock</span>' : ''}
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="quickView(${product.id})">
                    <i class="fas fa-eye"></i> Quick View
                </button>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-rating">
                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                <span>(${product.rating})</span>
            </div>
            <p class="product-description">${product.description}</p>
        </div>
    `;
    return card;
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToStorage();
    showNotification(`${product.title} added to cart!`);
}

function updateCart() {
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToStorage();
    showNotification('Item removed from cart');
}

function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById('cart-subtotal');
    if (subtotalEl) {
        subtotalEl.textContent = subtotal.toFixed(2);
    }
}

function saveCartToStorage() {
    localStorage.setItem('shopifyCloneCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shopifyCloneCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Cart Sidebar Functions
function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    if (!overlay) return;
    
    overlay.classList.toggle('active');
    renderCartItems();
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', sortProducts);
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-overlay')) {
            toggleCart();
        }
        if (e.target.classList.contains('modal-overlay')) {
            closeProductModal();
        }
    });
}

// Search and Filter Functions
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (!searchTerm) {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);
    
    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortFilter = document.getElementById('sort-filter');
    const selectedSort = sortFilter ? sortFilter.value : 'featured';
    
    let sortedProducts = [...products];
    
    switch (selectedSort) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            break;
    }
    
    displayProducts(sortedProducts);
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Hero Slider Functions
function setupHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Newsletter Functions
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing!');
        e.target.reset();
    }
}

// Quick View Functions
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="product-quick-view">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <h2>${product.title}</h2>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal();">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        document.getElementById('product-modal').classList.add('active');
    }
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Utility Functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Load more products (placeholder)
function loadMoreProducts() {
    showNotification('Loading more products...');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});
