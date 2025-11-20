const productsData = [
    {
        id: 1,
        name: "Thriller Jacket",
        category: "Outerwear",
        price: 399,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Thriller+Jacket",
        images: [
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Thriller+Front",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Thriller+Back",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Thriller+Side",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Thriller+Detail",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Thriller+Close"
        ],
        description: "Iconic red leather jacket from the legendary Thriller music video. Premium leather construction with authentic zipper details and perfect fit.",
        features: [
            "100% Genuine Leather",
            "Authentic replica design",
            "Premium brass zippers",
            "Comfortable lining",
            "Available in all sizes"
        ],
        reviews: [
            { name: "John D.", rating: 5, comment: "Absolutely amazing! Just like the original. Perfect fit and quality.", date: "2025-11-10" },
            { name: "Sarah M.", rating: 5, comment: "Best purchase ever! The leather is so soft and the details are perfect.", date: "2025-11-05" },
            { name: "Mike R.", rating: 4, comment: "Great jacket, runs slightly large but still awesome!", date: "2025-10-28" }
        ]
    },
    {
        id: 2,
        name: "Signature Fedora",
        category: "Accessories",
        price: 199,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Fedora",
        images: [
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Fedora+Front",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Fedora+Side",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Fedora+Top",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Fedora+Band",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Fedora+Detail"
        ],
        description: "Classic black fedora hat, MJ's signature style accessory. Premium wool felt construction.",
        features: ["100% Wool Felt", "Grosgrain ribbon band", "Water resistant", "Adjustable sizing"],
        reviews: [
            { name: "David L.", rating: 5, comment: "Perfect fedora! Looks exactly like MJ's.", date: "2025-11-12" },
            { name: "Emma W.", rating: 5, comment: "Love it! Fits perfectly and looks amazing.", date: "2025-11-08" }
        ]
    },
    {
        id: 3,
        name: "Crystal Glove",
        category: "Accessories",
        price: 299,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Crystal+Glove",
        images: [
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Glove+1",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Glove+2",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Glove+3",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Glove+4",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Glove+5"
        ],
        description: "Hand-decorated rhinestone glove with over 1000 hand-placed Swarovski crystals.",
        features: ["1000+ Swarovski crystals", "Hand-decorated", "Premium leather", "Display case included"],
        reviews: [
            { name: "Chris P.", rating: 5, comment: "Incredible craftsmanship!", date: "2025-11-15" },
            { name: "Lisa K.", rating: 5, comment: "Museum quality piece!", date: "2025-11-01" }
        ]
    },
    {
        id: 4,
        name: "Smooth Criminal",
        category: "Outerwear",
        price: 499,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Smooth+Criminal",
        images: [
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Suit+1",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Suit+2",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Suit+3",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Suit+4",
            "https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Suit+5"
        ],
        description: "White pinstripe suit from Smooth Criminal era. Premium Italian wool blend.",
        features: ["Italian wool", "Authentic pinstripe", "Custom tailoring", "Includes vest"],
        reviews: [{ name: "Tom H.", rating: 5, comment: "Sharp suit! Perfect for occasions.", date: "2025-11-13" }]
    },
    {
        id: 5,
        name: "Bad Tour Collection",
        category: "Limited Edition",
        price: 599,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Bad+Tour",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Bad+Tour+${i+1}`),
        description: "Limited edition Bad World Tour memorabilia collection.",
        features: ["Limited edition", "Numbered certificate", "Collector's item", "Premium packaging"],
        reviews: [{ name: "Alex M.", rating: 5, comment: "Collector's dream!", date: "2025-11-14" }]
    },
    {
        id: 6,
        name: "Moonwalk Shoes",
        category: "Footwear",
        price: 349,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Moonwalk+Shoes",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Shoes+${i+1}`),
        description: "Black loafers perfect for performing the moonwalk.",
        features: ["Premium leather", "Comfortable fit", "Iconic design", "All sizes available"],
        reviews: [{ name: "Dance Fan", rating: 5, comment: "Perfect for dancing!", date: "2025-11-09" }]
    },
    {
        id: 7,
        name: "Beat It Jacket",
        category: "Outerwear",
        price: 449,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Beat+It",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Beat+It+${i+1}`),
        description: "Red leather jacket with zipper details from Beat It video.",
        features: ["Red leather", "Zipper details", "Authentic design", "Premium quality"],
        reviews: [{ name: "Rock Fan", rating: 4, comment: "Looks great!", date: "2025-11-11" }]
    },
    {
        id: 8,
        name: "Billie Jean Hat",
        category: "Accessories",
        price: 229,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Billie+Jean",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Hat+${i+1}`),
        description: "Iconic fedora from the Billie Jean performance.",
        features: ["Premium felt", "Authentic style", "Adjustable", "Classic design"],
        reviews: [{ name: "Style Icon", rating: 5, comment: "Perfect hat!", date: "2025-11-07" }]
    },
    {
        id: 9,
        name: "Military Jacket",
        category: "Outerwear",
        price: 559,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Military",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Military+${i+1}`),
        description: "Gold military-style jacket with embroidered details.",
        features: ["Gold embroidery", "Military style", "Premium fabric", "Detailed work"],
        reviews: [{ name: "Fashion Pro", rating: 5, comment: "Stunning jacket!", date: "2025-11-06" }]
    },
    {
        id: 10,
        name: "White Socks",
        category: "Accessories",
        price: 79,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Socks",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Socks+${i+1}`),
        description: "Signature white ankle socks, essential MJ style.",
        features: ["Cotton blend", "Comfortable fit", "Signature style", "Pack of 3"],
        reviews: [{ name: "MJ Fan", rating: 5, comment: "Must have!", date: "2025-11-04" }]
    },
    {
        id: 11,
        name: "Dangerous Tour Tee",
        category: "Apparel",
        price: 89,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Dangerous",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Tee+${i+1}`),
        description: "Official Dangerous World Tour t-shirt.",
        features: ["Official merch", "Premium cotton", "Tour design", "All sizes"],
        reviews: [{ name: "Concert Goer", rating: 4, comment: "Great shirt!", date: "2025-11-03" }]
    },
    {
        id: 12,
        name: "Gold Armband",
        category: "Accessories",
        price: 159,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Armband",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Armband+${i+1}`),
        description: "Signature gold armband accessory.",
        features: ["Gold plated", "Adjustable", "Signature design", "Premium quality"],
        reviews: [{ name: "Accessory Fan", rating: 5, comment: "Perfect accessory!", date: "2025-11-02" }]
    },
    {    id: 13,
        name: "Gold Armband",
        category: "Accessories",
        price: 159,
        image: "https://via.placeholder.com/400x600/0a0a0a/d4af37?text=Armband",
        images: Array(5).fill(0).map((_, i) => `https://via.placeholder.com/800x1000/0a0a0a/d4af37?text=Armband+${i+1}`),
        description: "Signature gold armband accessory.",
        features: ["Gold plated", "Adjustable", "Signature design", "Premium quality"],
        reviews: [{ name: "Accessory Fan", rating: 5, comment: "Perfect accessory!", date: "2025-11-02" }]
    }
];

window.productsData = productsData;
console.log('✅ Products loaded:', productsData.length);
