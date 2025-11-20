// Product Detail Page Logic
(function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId || !window.productsData) {
        console.error('❌ Product ID or data missing');
        window.location.href = 'store.html';
        return;
    }
    
    // Find product
    const product = window.productsData.find(p => p.id === productId);
    
    if (!product) {
        console.error('❌ Product not found');
        window.location.href = 'store.html';
        return;
    }
    
    console.log('📦 Loading product:', product.name);
    
    // Load product details
    function loadProductDetails() {
        // Set title
        document.title = `${product.name} - Michael Jackson Luxury`;
        
        // Breadcrumb
        document.getElementById('product-category').textContent = product.category;
        
        // Title
        document.getElementById('product-title').textContent = product.name;
        
        // Price
        document.getElementById('product-price').textContent = `$${product.price}`;
        
        // Description
        document.getElementById('product-description').textContent = product.description || 'Premium quality Michael Jackson merchandise.';
        
        // Features
        const featuresList = document.getElementById('product-features-list');
        if (product.features && product.features.length > 0) {
            featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
        } else {
            featuresList.innerHTML = '<li>Premium Quality</li><li>Authentic Design</li><li>Fast Shipping</li>';
        }
        
        // Meta
        document.getElementById('product-meta-category').textContent = product.category;
        document.getElementById('product-sku').textContent = `MJ-${String(product.id).padStart(4, '0')}`;
        
        // Rating
        if (product.reviews && product.reviews.length > 0) {
            const avgRating = (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1);
            document.getElementById('product-stars').innerHTML = '★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating));
            document.getElementById('review-count').textContent = `${product.reviews.length} reviews (${avgRating} average)`;
        } else {
            document.getElementById('product-stars').innerHTML = '★★★★★';
            document.getElementById('review-count').textContent = 'No reviews yet';
        }
    }
    
    // Load images
    function loadImages() {
        const mainImage = document.getElementById('main-image');
        const thumbnailsContainer = document.getElementById('thumbnails');
        
        const images = product.images || [
            product.image || `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=${encodeURIComponent(product.name)}+1`,
            `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=${encodeURIComponent(product.name)}+2`,
            `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=${encodeURIComponent(product.name)}+3`,
            `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=${encodeURIComponent(product.name)}+4`,
            `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=${encodeURIComponent(product.name)}+5`
        ];
        
        // Set main image
        mainImage.src = images[0];
        mainImage.alt = product.name;
        
        // Create thumbnails
        thumbnailsContainer.innerHTML = images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${img}" alt="${product.name} ${index + 1}">
            </div>
        `).join('');
        
        // Thumbnail click events
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                mainImage.src = images[index];
                
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Animate main image
                gsap.fromTo(mainImage, 
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
                );
            });
        });
    }
    
    // Load reviews
    function loadReviews() {
        const reviewsList = document.getElementById('reviews-list');
        const reviewsSummary = document.getElementById('reviews-summary');
        
        if (!product.reviews || product.reviews.length === 0) {
            reviewsList.innerHTML = '<p style="color: var(--gray);">No reviews yet. Be the first to review this product!</p>';
            reviewsSummary.innerHTML = '<p style="color: var(--gray);">No reviews available</p>';
            return;
        }
        
        // Summary
        const avgRating = (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1);
        reviewsSummary.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 48px; color: var(--gold); font-weight: 600; font-family: 'Cinzel', serif;">${avgRating}</div>
                <div style="color: var(--gold); font-size: 20px; margin: 10px 0;">★★★★★</div>
                <div style="color: var(--gray);">${product.reviews.length} reviews</div>
            </div>
        `;
        
        // Reviews list
        reviewsList.innerHTML = product.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.name}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="review-comment">${review.comment}</div>
            </div>
        `).join('');
    }
    
    // Load related products
    function loadRelatedProducts() {
        const relatedContainer = document.getElementById('related-products');
        const relatedProducts = window.productsData
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, 3);
        
        if (relatedProducts.length === 0) {
            relatedContainer.innerHTML = '<p style="color: var(--gray); text-align: center; grid-column: 1/-1;">No related products found.</p>';
            return;
        }
        
        relatedContainer.innerHTML = relatedProducts.map(p => `
            <div class="product">
                <div class="product-img">
                    <img src="${p.images ? p.images[0] : p.image}" alt="${p.name}" class="product-image">
                    <button class="product-quick" onclick="window.location.href='product-detail.html?id=${p.id}'">View Details</button>
                </div>
                <div class="product-info">
                    <div class="product-cat">${p.category}</div>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-price">$${p.price}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Add to cart
    document.getElementById('add-to-cart-main').addEventListener('click', function() {
        if (typeof window.addToCart === 'function') {
            window.addToCart(productId);
        } else if (typeof cart !== 'undefined') {
            cart.addItem(productId);
        } else {
            alert('Product added to cart!');
        }
    });
    
    // Buy now
    document.querySelector('.buy-now-btn').addEventListener('click', function() {
        if (typeof window.addToCart === 'function') {
            window.addToCart(productId);
        }
        setTimeout(() => {
            if (typeof cart !== 'undefined') {
                cart.toggleCart();
            }
        }, 500);
    });
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        loadProductDetails();
        loadImages();
        loadReviews();
        loadRelatedProducts();
        
        // Animations
        gsap.from('.product-gallery', {
            opacity: 0,
            x: -60,
            duration: 1,
            delay: 0.2
        });
        
        gsap.from('.product-detail-info', {
            opacity: 0,
            x: 60,
            duration: 1,
            delay: 0.4
        });
        
        gsap.from('.reviews-section', {
            scrollTrigger: {
                trigger: '.reviews-section',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
        
        console.log('✅ Product detail page loaded');
    });
})();
