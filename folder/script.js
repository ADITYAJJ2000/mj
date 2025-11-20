gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// SHOPPING CART SYSTEM
// ============================================

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('mjCart')) || [];
        this.updateCartUI();
    }
    
    addItem(productId) {
        const product = window.productsData.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} added to cart!`);
        this.animateCartButton();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Item removed from cart');
    }
    
    clearCart() {
        if (this.items.length === 0) return;
        
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.saveCart();
            this.updateCartUI();
            this.showNotification('Cart cleared');
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    saveCart() {
        localStorage.setItem('mjCart', JSON.stringify(this.items));
        localStorage.setItem('mjCartCount', this.getItemCount());
    }
    
    updateCartUI() {
        const cartNum = document.querySelector('.cart-num');
        if (cartNum) {
            cartNum.textContent = this.getItemCount();
        }
        this.renderCartItems();
    }
    
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started</p>
                    <a href="store.html" class="cart-empty-btn">Browse Store</a>
                </div>
            `;
            
            const totalPrice = document.querySelector('.cart-total-price');
            if (totalPrice) totalPrice.textContent = '$0';
            
            return;
        }
        
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-category">${item.category}</div>
                    <div class="cart-item-price">$${item.price} ${item.quantity > 1 ? `x ${item.quantity}` : ''}</div>
                </div>
                <button class="cart-item-remove" onclick="cart.removeItem(${item.id})">Remove</button>
            </div>
        `).join('');
        
        const totalPrice = document.querySelector('.cart-total-price');
        if (totalPrice) {
            totalPrice.textContent = `$${this.getTotal()}`;
        }
    }
    
    toggleCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.toggle('active');
            
            if (cartSidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }
    
    animateCartButton() {
        const cartNum = document.querySelector('.cart-num');
        if (cartNum && typeof gsap !== 'undefined') {
            gsap.fromTo(cartNum,
                { scale: 1.5, color: '#d4af37' },
                { scale: 1, color: '#ffffff', duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }
    
    showNotification(message) {
        const existingNotif = document.querySelector('.cart-notification');
        if (existingNotif) existingNotif.remove();
        
        const notif = document.createElement('div');
        notif.className = 'cart-notification';
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            top: 120px;
            right: 80px;
            background: #d4af37;
            color: #000;
            padding: 20px 40px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 2px;
            z-index: 10000;
            opacity: 0;
        `;
        
        document.body.appendChild(notif);
        
        if (typeof gsap !== 'undefined') {
            gsap.to(notif, { opacity: 1, duration: 0.4 });
            setTimeout(() => {
                gsap.to(notif, {
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () => notif.remove()
                });
            }, 3000);
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Make addToCart global
window.addToCart = function(productId) {
    cart.addItem(productId);
};

// ============================================
// PRODUCT RENDERING
// ============================================

function createProductCard(product) {
    return `
        <div class="product" data-product-id="${product.id}" data-category="${product.category}">
            <div class="product-img">
                <img src="${product.images ? product.images[0] : product.image}" 
                     alt="${product.name}" 
                     class="product-image">
                <button class="product-quick" onclick="window.location.href='product-detail.html?id=${product.id}'">View Details</button>
            </div>
            <div class="product-info">
                <div class="product-cat">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
    `;
}


function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No Products Found</h3>
                <p>Try a different filter</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(createProductCard).join('');
    
    setTimeout(() => {
        initProductHover();
        animateProducts();
    }, 100);
}

function animateProducts() {
    const products = document.querySelectorAll('.product');
    if (products.length === 0) return;
    
    gsap.from(products, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
    });
}

function initProductHover() {
    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('mouseenter', () => {
            gsap.to(product, { y: -10, duration: 0.4, ease: 'power2.out' });
        });
        
        product.addEventListener('mouseleave', () => {
            gsap.to(product, { y: 0, duration: 0.4, ease: 'power2.out' });
        });
    });
}

// ============================================
// LOAD PRODUCTS ON PAGE LOAD
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM Loaded');
    
    if (typeof window.productsData !== 'undefined') {
        console.log('📦 Products available:', window.productsData.length);
        
        // Homepage - Featured products
        if (document.getElementById('featured-products')) {
            console.log('🏠 Loading featured products...');
            const featuredProducts = window.productsData.slice(0, 3);
            renderProducts(featuredProducts, 'featured-products');
        }
        
        // Store page - All products
        if (document.getElementById('all-products')) {
            console.log('🏪 Loading all products...');
            renderProducts(window.productsData, 'all-products');
        }
    } else {
        console.error('❌ Products data not loaded!');
    }
});

// ============================================
// FILTER FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const filteredProducts = filter === 'all' 
                ? window.productsData 
                : window.productsData.filter(p => p.category === filter);
            
            const products = document.querySelectorAll('.product');
            gsap.to(products, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                onComplete: () => {
                    renderProducts(filteredProducts, 'all-products');
                }
            });
        });
    });
});

// ============================================
// CART EVENTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.querySelector('.cart-btn');
    const cartClose = document.querySelector('.cart-close');
    const cartOverlay = document.querySelector('.cart-overlay');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => cart.toggleCart());
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', () => cart.toggleCart());
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => cart.toggleCart());
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => cart.clearCart());
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert(`Proceeding to checkout with ${cart.getItemCount()} items. Total: $${cart.getTotal()}`);
        });
    }
});

// ============================================
// NAVIGATION
// ============================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// ============================================
// MOBILE NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!hamburger || !navMenu) return;
    
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    hamburger.addEventListener('click', toggleMenu);
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 767 && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fix body scroll lock on resize/orientation change
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    });

    // Handle dynamic viewport height for mobile browsers
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
        
        // Calculate scale factor for fluid adjustments
        const scaleFactor = Math.min(vw / 1, 1);
        document.documentElement.style.setProperty('--scale-factor', scaleFactor);
    };
    
    const setupAutoAdjustment = () => {
        // Update viewport variables
        setViewportHeight();
        
        // Set fluid min/max values
        const screenWidth = window.innerWidth;
        const fluidMin = Math.max(320, screenWidth * 0.2);
        const fluidMax = Math.min(1920, screenWidth * 1.2);
        
        document.documentElement.style.setProperty('--fluid-min', `${fluidMin}px`);
        document.documentElement.style.setProperty('--fluid-max', `${fluidMax}px`);
        
        // Apply dynamic classes based on screen size
        const body = document.body;
        body.classList.remove('screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl');
        
        if (screenWidth < 480) {
            body.classList.add('screen-xs');
        } else if (screenWidth < 768) {
            body.classList.add('screen-sm');
        } else if (screenWidth < 1024) {
            body.classList.add('screen-md');
        } else if (screenWidth < 1440) {
            body.classList.add('screen-lg');
        } else {
            body.classList.add('screen-xl');
        }
        
        // Adjust text scale for better readability
        const baseFontSize = Math.max(14, Math.min(16, screenWidth / 80));
        document.documentElement.style.fontSize = `${baseFontSize}px`;
    };

    // Initialize auto-adjustment
    setupAutoAdjustment();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setupAutoAdjustment);
    window.addEventListener('orientationchange', () => {
        setTimeout(setupAutoAdjustment, 100);
    });
    
    // Optimize scroll performance
    let ticking = false;
    const updateOnScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Add scroll-based adjustments if needed
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
});

// ============================================
// HOME PAGE HERO ANIMATIONS
// ============================================

if (document.querySelector('.hero')) {
    gsap.to('.hero-bg-image', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        scale: 1.1,
        ease: 'none'
    });

    gsap.to('.hero-overlay', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        opacity: 0.3
    });

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .from('.hero-label', { opacity: 0, y: 30, duration: 1, delay: 0.3 })
        .from('.hero-line', { opacity: 0, y: 80, stagger: 0.2, duration: 1 }, '-=0.5')
        .from('.hero-desc', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
        .from('.hero-cta', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
        .from('.hero-scroll', { opacity: 0, y: 20, duration: 0.8 }, '-=0.3');
}

// ============================================
// PAGE HERO ANIMATIONS
// ============================================

if (document.querySelector('.page-hero-title')) {
    gsap.from('.page-hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
}

if (document.querySelector('.page-hero-subtitle')) {
    gsap.from('.page-hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
}

// ============================================
// QUOTE SECTION
// ============================================

if (document.querySelector('.quote-section')) {
    gsap.from('.quote-mark', {
        scrollTrigger: {
            trigger: '.quote-section',
            start: 'top 75%',
            end: 'center center',
            scrub: 1
        },
        scale: 0.5,
        opacity: 0,
        rotation: -90
    });

    gsap.from('.quote-text', {
        scrollTrigger: {
            trigger: '.quote-section',
            start: 'top 70%',
            end: 'center center',
            scrub: 1
        },
        opacity: 0,
        y: 50
    });

    gsap.from('.quote-author', {
        scrollTrigger: {
            trigger: '.quote-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });
}

// ============================================
// SECTION TITLES
// ============================================

gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 1
    });
    
    const line = title.nextElementSibling;
    if (line && line.classList.contains('section-line')) {
        gsap.from(line, {
            scrollTrigger: {
                trigger: line,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            width: 0,
            duration: 1,
            ease: 'power2.out'
        });
    }
});

// ============================================
// EXCLUSIVE SECTION
// ============================================

if (document.querySelector('.exclusive')) {
    gsap.from('.exclusive-left', {
        scrollTrigger: {
            trigger: '.exclusive',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -60,
        duration: 1
    });

    gsap.from('.exclusive-stat', {
        scrollTrigger: {
            trigger: '.exclusive-right',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 60,
        stagger: 0.2,
        duration: 1
    });
}

// ============================================
// TIMELINE ITEMS
// ============================================

gsap.utils.toArray('.timeline-item').forEach((item) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
});

// ============================================
// NEWSLETTER
// ============================================

if (document.querySelector('.newsletter-wrapper')) {
    gsap.from('.newsletter-wrapper', {
        scrollTrigger: {
            trigger: '.newsletter',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
}

// ============================================
// FOOTER
// ============================================

if (document.querySelector('.footer-main')) {
    gsap.from('.footer-main', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 1
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// ============================================
// NEWSLETTER FORM
// ============================================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        
        gsap.timeline()
            .to('.newsletter-form button', { scale: 0.95, duration: 0.15 })
            .to('.newsletter-form button', {
                scale: 1,
                duration: 0.25,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    cart.showNotification('Welcome to the Legacy!');
                    input.value = '';
                }
            });
    });
}

// Refresh ScrollTrigger
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

console.log('✨ Michael Jackson Luxury Store - Loaded');
console.log('🛒 Cart System Ready');
