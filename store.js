const storeCategories = {
    tablets: {
        title: "WindPads",
        description: "Big-screen entertainment and productivity, built for life on the move.",
        products: [
            {
                id: 101,
                name: "WindPad Pro",
                price: 999, image: "x1pro.jpg",
                detail: "12.4-inch 120Hz AMOLED display · 12GB RAM · 512GB storage",
                description: "A vivid, spacious display and fast performance for creative work and streaming."
            },
            {
                id: 102,
                name: "WindPad Air", price: 749,
                image: "fold8.jpg", detail: "11-inch 2.8K display · 8GB RAM · 256GB storage",
                description: "A lightweight everyday tablet with a crisp screen and all-day battery."
            },
            {
                id: 103,
                name: "WindPad Mini", price: 499,
                image: "x1.jpg", detail: "8.7-inch display · 8GB RAM · 128GB storage",
                description: "Compact, comfortable, and ready to travel wherever you do."
            }
        ]
    },
    laptops: {
        title: "SkyBooks",
        description: "Portable power for focused work, creative projects, and play.",
        products: [
            {
                id: 104,
                name: "SkyBook Pro 14 and 16", price: 1899, image: "dragonx1ultra.jpg",
                detail: "16-inch 3.2K OLED · 32GB RAM · 1TB SSD",
                description: "A large, color-rich display and powerful hardware for demanding creative work."
            },
            {
                id: 105,
                name: "SkyBook Air 13 and 15",
                price: 1299,
                image: "e1.jpg",
                detail: "14-inch 2.8K display · 16GB RAM · 512GB SSD",
                description: "A slim, lightweight laptop designed for work on the go."
            },
            {
                id: 106,
                name: "SkyBook Core 15",
                price: 899,
                image: "x1.jpg",
                detail: "15.6-inch FHD display · 16GB RAM · 512GB SSD",
                description: "Reliable everyday performance, a comfortable keyboard, and room to multitask."
            }
        ]
    },
    accessories: {
        title: "WindBuds",
        description: "Power, audio, and everyday essentials for your Dragon devices.",
        products: [
            {
                id: 108,
                name: "Dragon WindBuds 1",
                price: 149,
                image: "windbuds.jpg",
                detail: "Active noise cancellation · low-latency gaming mode",
                description: "Premium wireless earbuds with up to 30 hours of total playtime."
            }
        ]
    }
};

function renderStoreCategory() {
    const category = document.body.dataset.category;
    const data = storeCategories[category];
    const title = document.getElementById("categoryTitle");
    const description = document.getElementById("categoryDescription");
    const grid = document.getElementById("categoryProducts");

    if (!data || !title || !description || !grid) {
        throw new Error(`Store page configuration is missing or invalid: ${category}`);
    }

    document.title = `${data.title} | Dragon`;
    title.textContent = data.title;
    description.textContent = data.description;
    grid.innerHTML = data.products.map((product) => `
        <article class="group flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-950/20">
            <div tabindex="0" class="group/image relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-zinc-950" aria-label="Details for ${product.name}">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="h-full w-full object-contain p-5 transition duration-500 group-hover/image:scale-105">
                <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-zinc-950/30 p-5 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100 group-focus-within/image:opacity-100">
                    <h3 class="text-base font-bold text-white">Product details</h3>
                    <p class="mt-2 text-sm text-zinc-300">${product.description}</p>
                    <p class="mt-3 text-xs leading-relaxed text-zinc-400">${product.detail}</p>
                </div>
            </div>
            <div class="flex flex-1 flex-col p-6">
                <h2 class="text-xl font-bold text-white">${product.name}</h2>
                <p class="mt-4 text-2xl font-extrabold text-white">$${product.price.toLocaleString()}</p>
                <div class="mt-auto flex justify-end pt-6">
                    <button type="button" onclick="addStoreProductToCart(${product.id})" class="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700">
                        <i data-lucide="shopping-bag" class="h-4 w-4"></i> Add
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    lucide.createIcons();
}

function addStoreProductToCart(productId) {
    const product = Object.values(storeCategories)
        .flatMap((category) => category.products)
        .find((item) => item.id === productId);

    if (!product) {
        throw new Error(`Store product not found: ${productId}`);
    }

    const cart = JSON.parse(localStorage.getItem("dragonCart") || "[]");
    const cartItem = cart.find((item) => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("dragonCart", JSON.stringify(cart));

    let status = document.getElementById("storeCartStatus");
    if (!status) {
        status = document.createElement("div");
        status.id = "storeCartStatus";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        status.className = "fixed bottom-5 right-5 z-50 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-xl";
        document.body.append(status);
    }
    status.textContent = `Added ${product.name} to cart.`;
}

document.addEventListener("DOMContentLoaded", renderStoreCategory);
