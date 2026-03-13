// --- 1. INTRO MODAL LOGIC ---
const introModal = document.getElementById('introModal');
const enterMapBtn = document.getElementById('enterMapBtn');

enterMapBtn.addEventListener('click', () => {
    introModal.classList.add('hidden');
});

// --- 2. MAP INITIALIZATION ---
// Centered on China coordinates with a wider zoom
const map = L.map('map', {
    center: [35.8, 104.1], 
    zoom: 4,
    zoomControl: false // Keeps UI clean
});

// Light brutalist basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
}).addTo(map);

// --- 3. MARKER POPUP TEMPLATE ---
// A helper function to keep the popups consistent and clean
function createPopupContent(title, region, desc, link) {
    return `
        <div>
            <img src="https://via.placeholder.com/300x150/27272a/f4f4f5?text=${title.replace(/ /g, '+')}" alt="${title}" class="popup-img">
            <h3 class="highlight" style="margin-bottom: 0.2rem;">${title}</h3>
            <p class="text-side" style="margin-bottom: 0.8rem;">${region}</p>
            <p style="font-size: 0.95rem;">${desc}</p>
            <a href="${link}" class="brutal-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem; margin-top: 0.5rem;">Read More</a>
        </div>
    `;
}

// --- 4. ADD MARKERS ---

// Marker 1: East China (Shanghai/Jiangnan area)
const markerEast = L.marker([31.2304, 121.4737]).addTo(map);
markerEast.bindPopup(createPopupContent(
    "Four-Fold Cloud", 
    "Jiangsu, Zhejiang, Shanghai, Anhui", 
    "Characterized by four distinct swirling heads representing the cardinal directions, symbolizing harmony and endless fortune.", 
    "knowledge.html"
), { minWidth: 260 });

// Marker 2: Xizang (Lhasa area)
// Note: I used "Endless Knot" as a placeholder pattern for Xizang.
const markerXizang = L.marker([29.6500, 91.1000]).addTo(map);
markerXizang.bindPopup(createPopupContent(
    "Endless Knot", 
    "Xizang", 
    "An ancient motif without beginning or end, representing the intertwining of wisdom and compassion in traditional artistry.", 
    "knowledge.html"
), { minWidth: 260 });

// Marker 3: Xi'an (Shaanxi area)
const markerXian = L.marker([34.3416, 108.9398]).addTo(map);
markerXian.bindPopup(createPopupContent(
    "Mountain Armor", 
    "Xi'an, Shaanxi", 
    "Inspired by the interlocking scales of traditional armor and the rugged terrain, reflecting resilience and historical military strength.", 
    "knowledge.html"
), { minWidth: 260 });