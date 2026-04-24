document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MODAL LOGIC ---
  const modal = document.getElementById('introModal');
  const enterBtn = document.getElementById('enterMapBtn');

  // Check if user has visited before (optional, remove if you want it to pop up every time)
  if (!sessionStorage.getItem('visited')) {
    modal.style.display = 'flex';
  } else {
    modal.style.display = 'none';
  }

  enterBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    sessionStorage.setItem('visited', 'true');
  });

  // --- 2. LEAFLET MAP INITIALIZATION ---
  // Center roughly on China
  const map = L.map('map').setView([35.8617, 104.1954], 4);

  // Add a dark basemap to fit your design system
 // 1. Draw the Base Map (Geography only, no text)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 10,
    minZoom: 3
  }).addTo(map);

  // --- (Your polygon code goes here, nothing changes!) ---

  // 2. Create a custom pane for the text labels so they sit ON TOP of the polygons
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 650; // Keeps it above Leaflet's polygon layer (400)
  map.getPane('labels').style.pointerEvents = 'none'; // Ensures you can still click the polygons underneath

  // 3. Draw the Labels Map
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
    pane: 'labels'
  }).addTo(map);

  // --- 3. MOTIF REGION DATA (POLYGONS) ---
  // Note: These are simplified rough coordinates. 
  // For exact borders, a GeoJSON implementation is recommended in the future.
  const motifRegions = [
    {
      name: "Ruyi Cloud Pattern",
      // Rough outline of Jiangnan (Jiangsu, Zhejiang, Shanghai)
      coords: [[35.0, 119.0], [32.0, 122.0], [28.0, 121.0], [28.0, 118.0], [31.0, 117.0], [34.0, 116.0]],
      color: "#e63946", // Design system red
      image: "images/Ruyi_FourFoldBasic.png",
      link: "ruyicloud.html",
      desc: "A symbol of good fortune and universal harmony, widely used in textiles, architecture, and ceramics."
    },
    {
      name: "Endless Knot (Pan Chang)",
      // Rough outline of Tibet (Xizang)
      coords: [[36.0, 80.0], [36.0, 90.0], [32.0, 98.0], [28.0, 97.0], [28.0, 85.0], [30.0, 78.0]],
      color: "#f4a261", // Orange/Gold
      image: "images/EndlessKnot.png", // Replace with your actual image path
      link: "#", // Add link when ready
      desc: "An ancient symbol representing the intertwining of wisdom and compassion, with no beginning or end."
    },
    {
      name: "Mountain Scale Armor",
      // Rough outline of Shaanxi (Xi'an region)
      coords: [[39.0, 108.0], [39.0, 111.0], [35.0, 110.0], [32.0, 109.0], [33.0, 106.0], [36.0, 106.0]],
      color: "#2a9d8f", // Teal
      image: "images/MountainArmor.png", // Replace with your actual image path
      link: "#", // Add link when ready
      desc: "A distinct interlocking armor pattern prevalent during the Tang Dynasty, modeled after the character for 'mountain'."
    },
    {
      name: "Thunder Pattern (Leiwen)",
      // Rough outline of Henan (Anyang/Shang Dynasty region)
      coords: [[36.5, 112.0], [36.5, 116.0], [33.5, 116.0], [32.5, 113.0], [34.5, 111.0]],
      color: "#e9c46a", // Yellow/Gold
      image: "images/ThunderPattern.png", // Replace with your actual image path
      link: "#", // Add link when ready
      desc: "A squared spiral motif found on ancient Shang Dynasty bronzes, representing nature's power and rain."
    }
  ];

  // --- 4. DRAW POLYGONS & POPUPS ---
  motifRegions.forEach(region => {
    // Create the polygon
    const polygon = L.polygon(region.coords, {
      color: region.color,
      fillColor: region.color,
      fillOpacity: 0.3,
      weight: 2
    }).addTo(map);

    // Hover effect
    polygon.on('mouseover', function () {
      this.setStyle({ fillOpacity: 0.6, weight: 3 });
    });
    polygon.on('mouseout', function () {
      this.setStyle({ fillOpacity: 0.3, weight: 2 });
    });

    // Create the HTML content for the Popup
    const popupContent = `
      <div style="font-family: var(--font-sans);">
        <h3 style="color: ${region.color}; margin-top: 0; font-family: var(--font-serif);">${region.name}</h3>
        <p style="font-size: 13px; line-height: 1.4;">${region.desc}</p>
        <img src="${region.image}" alt="${region.name}" class="popup-img" onerror="this.style.display='none'">
        <a href="${region.link}" class="brutal-btn" style="display: block; text-align: center; margin-top: 10px; padding: 6px 10px; font-size: 12px;">Explore Motif</a>
      </div>
    `;

    // Bind popup to polygon
    polygon.bindPopup(popupContent, {
      maxWidth: 250
    });
  });

});