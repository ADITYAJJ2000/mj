gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.productsData = [
    {
        id:1,
        name:"Thriller Jacket",
        category:"Outerwear",
        price:399,
        images:[
            "https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Thriller+1",
            "https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Thriller+2",
            "https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Thriller+3",
            "https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Thriller+4",
            "https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Thriller+5"
        ],
        description:"Iconic red leather jacket from the legendary Thriller era. Premium quality leather with authentic details.",
        features:["100% Genuine Leather","Original Design","Hand-crafted details","Limited Edition"],
        reviews:[
            {name:"John D.",rating:5,comment:"Amazing quality! Just like the original."},
            {name:"Sarah M.",rating:5,comment:"Worth every penny. The detail is incredible."},
            {name:"Mike T.",rating:4,comment:"Great jacket but runs a bit small."}
        ]
    },
    {id:2,name:"Signature Fedora",category:"Accessories",price:199,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Fedora+1","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Fedora+2","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Fedora+3"],description:"Classic black fedora worn by MJ himself.",features:["Premium Felt","Authentic Style","Adjustable Size"],reviews:[{name:"Alex K.",rating:5,comment:"Perfect fit and style!"}]},
    {id:3,name:"Crystal Glove",category:"Accessories",price:299,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Glove+1","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Glove+2"],description:"Sparkling crystal-studded glove.",features:["Hand-placed crystals","Replica design"],reviews:[{name:"Emma R.",rating:5,comment:"Absolutely stunning!"}]},
    {id:4,name:"Smooth Criminal",category:"Outerwear",price:499,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Criminal+1","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Criminal+2","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Criminal+3","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Criminal+4"],description:"White pinstripe suit from Smooth Criminal.",features:["Tailored Fit","Premium Fabric","Iconic Style"],reviews:[{name:"David L.",rating:5,comment:"Best purchase ever!"}]},
    {id:5,name:"Bad Tour Collection",category:"Limited Edition",price:599,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Bad+1"],description:"Limited edition Bad Tour memorabilia.",features:["Rare Item","Certificate included"],reviews:[]},
    {id:6,name:"Moonwalk Shoes",category:"Footwear",price:349,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Shoes+1","https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Shoes+2"],description:"Signature loafers for the perfect moonwalk.",features:["Smooth Sole","Classic Design"],reviews:[{name:"Chris P.",rating:4,comment:"Great shoes!"}]},
    {id:7,name:"Beat It Jacket",category:"Outerwear",price:449,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Beat+It+1"],description:"Red Beat It leather jacket.",features:["Leather","Zippers"],reviews:[]},
    {id:8,name:"Billie Jean Hat",category:"Accessories",price:229,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Billie+1"],description:"Classic Billie Jean fedora.",features:["Black Felt"],reviews:[]},
    {id:9,name:"Military Jacket",category:"Outerwear",price:559,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Military+1"],description:"Military-style jacket with gold accents.",features:["Gold Details"],reviews:[]},
    {id:10,name:"White Socks",category:"Accessories",price:79,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Socks+1"],description:"Classic white socks.",features:["Cotton"],reviews:[]},
    {id:11,name:"Dangerous Tour Tee",category:"Apparel",price:89,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Tee+1"],description:"Official Dangerous Tour t-shirt.",features:["100% Cotton"],reviews:[]},
    {id:12,name:"Gold Armband",category:"Accessories",price:159,images:["https://via.placeholder.com/600x800/0a0a0a/d4af37?text=Armband+1"],description:"Gold-plated armband.",features:["Gold Finish"],reviews:[]}
];

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('mjCart')) || [];
        this.updateCartUI();
    }
    
    addItem(productId) {
        const product = window.productsData.find(p => p.id === productId);
        if (!product) return;
        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) existingItem.quantity += 1;
        else this.items.push({ id:product.id, name:product.name, category:product.category, price:product.price, image:product.images[0], quantity: 1 });
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Added to cart!');
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }
    
    clearCart() {
        if (this.items.length === 0) return;
        if (confirm('Clear cart?')) {
            this.items = [];
            this.saveCart();
            this.updateCartUI();
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
    }
    
    updateCartUI() {
        const cartNum = document.querySelector('.cart-num');
        if (cartNum) cartNum.textContent = this.getItemCount();
        this.renderCartItems();
    }
    
    renderCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;
        if (this.items.length === 0) {
            container.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><h3>Your cart is empty</h3><p>Add products to get started</p></div>';
            document.querySelector('.cart-total-price').textContent = '$0';
            return;
        }
        container.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-category">${item.category}</div>
                    <div class="cart-item-price">$${item.price} ${item.quantity > 1 ? `x ${item.quantity}` : ''}</div>
                </div>
                <button class="cart-item-remove" onclick="cart.removeItem(${item.id})">Remove</button>
            </div>
        `).join('');
        document.querySelector('.cart-total-price').textContent = `$${this.getTotal()}`;
    }
    
    toggleCart() {
        const sidebar = document.querySelector('.cart-sidebar');
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    showNotification(message) {
        const existingNotif = document.querySelector('.cart-notification');
        if (existingNotif) existingNotif.remove();
        const notif = document.createElement('div');
        notif.className = 'cart-notification';
        notif.textContent = message;
        notif.style.cssText = 'position:fixed;top:100px;right:30px;background:#d4af37;color:#000;padding:20px 40px;font-size:13px;font-weight:600;letter-spacing:2px;z-index:100000;opacity:0;';
        document.body.appendChild(notif);
        gsap.to(notif, {opacity:1, duration:0.4});
        setTimeout(() => {
            gsap.to(notif, {opacity:0, duration:0.4, onComplete:()=>notif.remove()});
        }, 2000);
    }
}

const cart = new ShoppingCart();
window.addToCart = (id) => cart.addItem(id);

let currentCheckoutStep = 1;

function openCheckoutModal() {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'flex';
    gsap.to(modal, {opacity: 1, duration: 0.4});
    document.body.style.overflow = 'hidden';
    currentCheckoutStep = 1;
    updateCheckoutStep(1);
    updateCheckoutSummary();
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    gsap.to(modal, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

function nextCheckoutStep(step) {
    currentCheckoutStep = step;
    updateCheckoutStep(step);
}

function updateCheckoutStep(step) {
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelector('.checkout-step-' + step).classList.add('active');
    document.querySelectorAll('.step')[step - 1].classList.add('active');
    if (step === 3) updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const container = document.getElementById('checkout-summary');
    const subtotal = cart.getTotal();
    const tax = (subtotal * 0.1).toFixed(2);
    const shipping = 15;
    const total = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2);
    
    container.innerHTML = cart.items.map(item => `
        <div class="checkout-summary-item">
            <img src="${item.image}" class="checkout-summary-img">
            <div class="checkout-summary-details">
                <div class="checkout-summary-name">${item.name}</div>
                <div class="checkout-summary-cat">${item.category}</div>
            </div>
            <div class="checkout-summary-price">$${item.price} x ${item.quantity}</div>
        </div>
    `).join('');
    
    document.getElementById('checkout-subtotal').textContent = '$' + subtotal;
    document.getElementById('checkout-tax').textContent = '$' + tax;
    document.getElementById('checkout-final-total').textContent = '$' + total;
}

function placeOrder() {
    alert('Order placed successfully! Thank you for your purchase!');
    cart.items = [];
    cart.saveCart();
    cart.updateCartUI();
    closeCheckoutModal();
}

function openProductModal(productId) {
    const product = window.productsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-overlay"></div>
        <div class="product-modal-panel">
            <button class="product-modal-close">&times;</button>
            <div class="product-modal-content">
                <div class="product-modal-gallery">
                    <div class="product-modal-main-img">
                        <img src="${product.images[0]}" id="main-product-img">
                    </div>
                    <div class="product-modal-thumbs">
                        ${product.images.map((img,i)=>`<img src="${img}" onclick="changeMainImage('${img}')" class="${i===0?'active':''}">`).join('')}
                    </div>
                </div>
                <div class="product-modal-details">
                    <div class="product-modal-cat">${product.category}</div>
                    <h2 class="product-modal-name">${product.name}</h2>
                    <div class="product-modal-price">$${product.price}</div>
                    <div class="product-modal-rating">
                        ${'★'.repeat(5)} <span>(${product.reviews.length} reviews)</span>
                    </div>
                    <p class="product-modal-desc">${product.description}</p>
                    <div class="product-modal-features">
                        <h4>Features:</h4>
                        <ul>${product.features.map(f=>`<li>${f}</li>`).join('')}</ul>
                    </div>
                    <button class="product-modal-add-btn" onclick="addToCart(${product.id}); closeProductModal();">Add to Cart - $${product.price}</button>
                    <div class="product-modal-reviews">
                        <h4>Customer Reviews</h4>
                        ${product.reviews.length ? product.reviews.map(r=>`
                            <div class="review">
                                <div class="review-header">
                                    <strong>${r.name}</strong>
                                    <span class="review-stars">${'★'.repeat(r.rating)}</span>
                                </div>
                                <p>${r.comment}</p>
                            </div>
                        `).join('') : '<p>No reviews yet.</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(()=>{
        modal.style.opacity = 1;
        document.body.style.overflow = 'hidden';
    },10);
    
    modal.querySelector('.product-modal-overlay').onclick = closeProductModal;
    modal.querySelector('.product-modal-close').onclick = closeProductModal;
}

function closeProductModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.style.opacity = 0;
        setTimeout(()=>{
            modal.remove();
            document.body.style.overflow = '';
        },300);
    }
}

function changeMainImage(imgSrc) {
    document.getElementById('main-product-img').src = imgSrc;
    document.querySelectorAll('.product-modal-thumbs img').forEach(img=>img.classList.remove('active'));
    event.target.classList.add('active');
}

function renderProducts(products) {
    const container = document.getElementById('all-products');
    if (!container) return;
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No Products Found</h3><p>Try another filter</p></div>';
        return;
    }
    container.innerHTML = products.map(p => `
        <div class="product" onclick="openProductModal(${p.id})">
            <div class="product-img">
                <img src="${p.images[0]}" alt="${p.name}" class="product-image">
                <button class="product-quick" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
            </div>
            <div class="product-info">
                <div class="product-cat">${p.category}</div>
                <h3 class="product-name">${p.name}</h3>
                <div class="product-price">$${p.price}</div>
            </div>
        </div>
    `).join('');
    setTimeout(() => {
        gsap.from('.product', {opacity:0, y:50, stagger:0.1, duration:0.6});
        document.querySelectorAll('.product').forEach(p => {
            p.addEventListener('mouseenter', ()=>gsap.to(p,{y:-10,duration:0.4}));
            p.addEventListener('mouseleave', ()=>gsap.to(p,{y:0,duration:0.4}));
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(window.productsData);
    document.querySelector('.cart-btn').addEventListener('click', ()=>cart.toggleCart());
    document.querySelector('.cart-close').addEventListener('click', ()=>cart.toggleCart());
    document.querySelector('.cart-overlay').addEventListener('click', ()=>cart.toggleCart());
    document.querySelector('.clear-cart-btn').addEventListener('click', ()=>cart.clearCart());
    document.querySelector('.checkout-btn').addEventListener('click', ()=>openCheckoutModal());
    
    const checkoutClose = document.querySelector('.checkout-close');
    if (checkoutClose) checkoutClose.addEventListener('click', ()=>closeCheckoutModal());
    
    const checkoutOverlay = document.querySelector('.checkout-overlay');
    if (checkoutOverlay) checkoutOverlay.addEventListener('click', ()=>closeCheckoutModal());
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            const filtered = filter==='all' ? window.productsData : window.productsData.filter(p=>p.category===filter);
            gsap.to('.product', {opacity:0, y:20, duration:0.3, onComplete:()=>renderProducts(filtered)});
        });
    });
    
    gsap.from('.page-hero-title', {opacity:0, y:50, duration:1, delay:0.2});
    gsap.from('.page-hero-subtitle', {opacity:0, y:30, duration:1, delay:0.4});
});
