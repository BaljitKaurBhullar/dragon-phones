const storeCategories = {
    tablets: {
        title: "WindPads",
        description: "Big-screen entertainment and productivity, built for life on the move.",
        products: [
            {
                id: 101,
                name: "WindPad Pro",
                price: 999, image: "windpadpro.jpg",
                detail: "12.4-inch 120Hz AMOLED display · 12GB RAM · 1TB storage",
                description: "A vivid, spacious display and fast performance for creative work and streaming.",
                specs: {
                    display: "12.4-inch 120Hz AMOLED",
                    processor: "Qualcomm Snapdragon 8 Elite",
                    ram: "12GB",
                    storage: "1TB"
                }
            },
            {
                id: 102,
                name: "WindPad Air", price: 749,
                image: "windpad1.jpg", detail: "11-inch 2.8K display · 8GB RAM · 512GB storage",
                description: "A lightweight everyday tablet with a crisp screen and all-day battery.",
                specs: {
                    display: "11-inch 2.8K",
                    processor: "MediaTek Dimensity 9400+",
                    ram: "8GB",
                    storage: "512GB"
                }
            },
            {
                id: 103,
                name: "WindPad Mini", price: 499,
                image: "winpadmini.jpg", detail: "8.7-inch display · 8GB RAM · 256GB storage",
                description: "Compact, comfortable, and ready to travel wherever you do.",
                specs: {
                    display: "8.7-inch",
                    processor: "MediaTek Dimensity 6300",
                    ram: "8GB",
                    storage: "256GB"
                }
            }
        ]
    },
    laptops: {
        title: "SkyBooks",
        description: "Portable power for focused work, creative projects, and play.",
        products: [
            {
                id: 104,
                name: "SkyBook Pro 14 and 16", price: 1899, image: "skybookpro.jpg",
                detail: "16-inch 3.2K OLED · 32GB RAM · 2TB SSD",
                description: "A large, color-rich display and powerful hardware for demanding creative work.",
                specs: {
                    display: "16-inch 3.2K OLED",
                    processor: "Intel Core i9 13th Gen",
                    ram: "16GB / 32GB Unified Memory",
                    storage: "512GB / 1TB / 2TB SSD"
                }
            },
            {
                id: 105,
                name: "SkyBook Air 13 and 15",
                price: 1299,
                image: "skybookair.webp",
                detail: "15-inch 2.8K display · 16GB RAM · 1TB SSD",
                description: "A slim, lightweight laptop designed for work on the go.",
                specs: {
                    display: "15-inch 2.8K",
                    processor: "Intel Core i7 12th Gen",
                    ram: "8GB / 16GB Unified Memory",
                    storage: "256GB / 512GB / 1TB SSD"
                }
            },
            {
                id: 106,
                name: "SkyBook Core 14",
                price: 899,
                image: "skybookcore.webp",
                detail: "14-inch FHD display · 8GB RAM · 512GB SSD",
                description: "Reliable everyday performance, a comfortable keyboard, and room to multitask.",
                specs: {
                    display: "14-inch FHD",
                    processor: "Intel Core i5 8th Gen",
                    ram: "8GB Unified Memory",
                    storage: "256GB / 512GB SSD"
                }
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
                description: "Premium wireless earbuds with up to 30 hours of total playtime.",
                specs: {
                    battery: "30 hours total playtime",
                    charging: "USB-C fast charge",
                    features: "Active noise cancellation, low-latency gaming mode"
                }
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
            <button type="button" onclick="openStoreProductDetails(${product.id})" aria-label="View specs and details for ${product.name}" class="group/image relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-3xl bg-zinc-950 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-red-400">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="h-full w-full rounded-t-3xl object-contain p-5 transition duration-500 group-hover/image:scale-105">
                <span class="absolute inset-0 flex items-center justify-center bg-zinc-950/45 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100 group-focus-visible/image:opacity-100">
                    <span class="rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-2 text-xs font-semibold text-white shadow-lg">View Specs &amp; Details</span>
                </span>
            </button>
            <div class="flex flex-1 flex-col p-6">
                <h2 class="text-xl font-bold text-white">${product.name}</h2>
                <p class="mt-2 text-sm text-zinc-400">${product.description}</p>
                <p class="mt-3 text-xs leading-relaxed text-zinc-500">${product.detail}</p>
                <p class="mt-4 text-2xl font-extrabold text-white">$${product.price.toLocaleString()}</p>
                <div class="mt-auto flex justify-end pt-6">
                    <div class="flex gap-2">
                        <button type="button" onclick="openStoreProductDetails(${product.id})" aria-label="View specs and details for ${product.name}" class="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-300 transition hover:border-amber-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400">
                            <i data-lucide="info" class="h-4 w-4"></i>
                        </button>
                        <button type="button" onclick="addStoreProductToCart(${product.id})" class="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700">
                        <i data-lucide="shopping-bag" class="h-4 w-4"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `).join("");

    let dialog = document.getElementById("storeProductDialog");
    if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "storeProductDialog";
        dialog.className = "m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border border-zinc-700 bg-zinc-900 p-0 text-zinc-100 shadow-2xl backdrop:bg-black/80";
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
        document.body.append(dialog);
    }

    lucide.createIcons();
}

function openStoreProductDetails(productId) {
    const product = Object.values(storeCategories)
        .flatMap((category) => category.products)
        .find((item) => item.id === productId);

    if (!product) {
        throw new Error(`Store product not found: ${productId}`);
    }

    const dialog = document.getElementById("storeProductDialog");
    if (!dialog) {
        throw new Error("Store product details dialog is not available.");
    }

    const specs = Object.entries(product.specs || {}).map(([name, value]) => `
        <div class="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
            <span class="block text-[10px] font-semibold uppercase text-zinc-500">${name}</span>
            <span class="mt-1 block text-xs font-medium text-zinc-200">${value}</span>
        </div>
    `).join("");

    dialog.innerHTML = `
        <div class="flex items-start justify-between gap-4 border-b border-zinc-800 px-6 py-5 sm:px-8">
            <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-amber-400">Product details</p>
                <h2 class="mt-1 text-2xl font-extrabold text-white">${product.name}</h2>
            </div>
            <button type="button" onclick="document.getElementById('storeProductDialog').close()" aria-label="Close product details" class="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400">
                <i data-lucide="x" class="h-5 w-5"></i>
            </button>
        </div>
        <div class="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:p-8">
            <div class="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                <img src="${product.image}" alt="${product.name}" class="h-full w-full rounded-xl object-contain">
            </div>
            <div class="flex flex-col">
                <p class="text-sm leading-relaxed text-zinc-300">${product.description}</p>
                <p class="mt-3 text-xs leading-relaxed text-zinc-400">${product.detail}</p>
                <p class="mt-5 text-2xl font-extrabold text-white">$${product.price.toLocaleString()}</p>
                ${specs ? `
                    <div class="mt-6">
                        <h3 class="mb-3 text-sm font-semibold text-white">Full Technical Specifications</h3>
                        <div class="grid grid-cols-2 gap-3">${specs}</div>
                    </div>
                ` : ""}
                <button type="button" onclick="addStoreProductToCart(${product.id}); document.getElementById('storeProductDialog').close();" class="mt-auto flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700">
                    <i data-lucide="shopping-bag" class="h-4 w-4"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    dialog.showModal();
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
