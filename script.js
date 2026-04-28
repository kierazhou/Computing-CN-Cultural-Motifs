document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MODAL LOGIC ---
  const modal = document.getElementById('introModal');
  const enterBtn = document.getElementById('enterMapBtn');

  modal.style.display = 'flex';

  enterBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // --- 2. LEAFLET MAP INITIALIZATION ---
  const CHINA_CENTER = [35.8617, 104.1954];
  const CHINA_ZOOM = 4;

  const map = L.map('map').setView(CHINA_CENTER, CHINA_ZOOM);

  // Base map: dark, no labels
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 10,
    minZoom: 3
  }).addTo(map);

  // Labels pane
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 650;
  map.getPane('labels').style.pointerEvents = 'none';

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
    pane: 'labels'
  }).addTo(map);

  // --- 3. MOTIF PANEL REFERENCES ---
  const motifPanel = document.getElementById('motifPanel');
  const closeMotifPanelBtn = document.getElementById('closeMotifPanel');
  const motifPanelRegion = document.getElementById('motifPanelRegion');
  const motifPanelTitle = document.getElementById('motifPanelTitle');
  const motifPanelDesc = document.getElementById('motifPanelDesc');
  const motifPanelOrigins = document.getElementById('motifPanelOrigins');
  const motifPanelModern = document.getElementById('motifPanelModern');
  const motifPanelMath = document.getElementById('motifPanelMath');
  const motifPanelCT = document.getElementById('motifPanelCT');
  const motifPanelImageWrap = document.getElementById('motifPanelImageWrap');
  const motifPanelImageCaption = document.getElementById('motifPanelImageCaption');

  let activePopup = null;

  function openMotifPanel(region, polygon) {
    motifPanelRegion.textContent = region.regionLabel;
    motifPanelTitle.textContent = region.name;
    motifPanelDesc.textContent = region.desc;
    motifPanelOrigins.textContent = region.origins;
    motifPanelModern.textContent = region.modern;
    motifPanelMath.textContent = region.math;
    motifPanelCT.textContent = region.ct;
    motifPanelImageCaption.textContent = region.imageCaption || '';

    motifPanelImageWrap.innerHTML = `
      <img
        src="${region.panelImage}"
        alt="${region.name}"
        class="motif-panel-image"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="motif-panel-image-placeholder" style="display:none;">
        Add motif image / historical image / diagram here
      </div>
    `;

    motifPanel.classList.add('open');

    const bounds = polygon.getBounds();
    map.flyToBounds(bounds, {
      paddingTopLeft: [430, 60],
      paddingBottomRight: [60, 60],
      maxZoom: 6,
      duration: 0.7
    });
  }

  function closeMotifPanel() {
    motifPanel.classList.remove('open');

    if (activePopup) {
      map.closePopup(activePopup);
      activePopup = null;
    }

    setTimeout(() => {
      map.flyTo(CHINA_CENTER, CHINA_ZOOM, { duration: 0.7 });
    }, 150);
  }

  closeMotifPanelBtn.addEventListener('click', closeMotifPanel);

  // --- 4. MOTIF REGION DATA ---
  const motifRegions = [
    {
      id: "ruyi",
      mode: "page",
      link: "ruyicloud.html",
      regionLabel: "Jiangnan",
      name: "Ruyi Cloud Pattern",
      coords: [[35.0, 119.0], [32.0, 122.0], [28.0, 121.0], [28.0, 118.0], [31.0, 117.0], [34.0, 116.0]],
      color: "#e63946",
      popupImage: "images/Ruyi_FourFoldBasic.png",
      panelImage: "images/Ruyi_FourFoldBasic.png",
      imageCaption: "Add a historical or geometric image of the Ruyi Cloud here.",
      desc: "A symbol of good fortune and universal harmony, widely used in textiles, architecture, and ceramics.",
      origins: "The Ruyi Cloud motif appears across Chinese decorative traditions and is closely associated with auspicious meaning, flowing structure, and ornamental continuity. It is one of the most fully developed examples in this archive because its logic can be translated clearly into computational design.",
      modern: "Today, Ruyi-derived forms continue to appear in fashion, jewelry, exhibition graphics, interiors, and contemporary digital design. Its curved profile and recognizable symmetry make it easy to adapt across media.",
      math: "The pattern can be studied through repeated base units, radial arrangement, symmetry, scaling, and curved geometric construction. It is especially useful for thinking about decomposition, transformation, and controlled variation.",
      ct: "A strong full example for decomposition, iteration, rotation, and geometric transformation in block-based pattern design."
    },
    {
      id: "endless-knot",
      mode: "panel",
      regionLabel: "Tibet",
      name: "Endless Knot",
      coords: [[36.0, 80.0], [36.0, 90.0], [32.0, 98.0], [28.0, 97.0], [28.0, 85.0], [30.0, 78.0]],
      color: "#f4a261",
      popupImage: "images/tibet.jpeg",
      panelImage: "images/tibet_intro.jpg",
      imageCaption: "Add a Tibetan endless knot image, textile detail, or temple ornament here.",
      desc: "An interlaced motif with no visible beginning or end, often associated with continuity and interdependence.",
      origins: "The Endless Knot is widely associated with Tibetan Buddhist visual culture and appears in architecture, ritual objects, manuscripts, and textiles. Its formal structure is striking because a single line folds through itself without a clear start or finish.",
      modern: "The motif still appears in jewelry, graphic design, textile design, temple ornament, and contemporary cultural illustration. Its compact and interwoven geometry makes it highly recognizable.",
      math: "This motif can be analyzed through line continuity, repeated turns, mirrored balance, crossings, and enclosed pathways. It is especially useful for discussing route logic and interlaced structure.",
      ct: "Useful for path-following, rule-based turns, symmetry, and thinking about how local steps produce a continuous global form."
    },
    {
      id: "mountain-armor",
      mode: "page",
      link: "mounarmor.html",
      regionLabel: "Shaanxi",
      name: "Mountain Armor Pattern (Shanwen Jia)",
      coords: [[39.0, 108.0], [39.0, 111.0], [35.0, 110.0], [32.0, 109.0], [33.0, 106.0], [36.0, 106.0]],
      color: "#2a9d8f",
      popupImage: "images/MountainArmor02-Reverse.png",
      panelImage: "images/MountainArmor02-Reverse.png",
      imageCaption: "Add armor image, base-unit diagram, or reconstructed pattern here.",
      desc: "A distinct interlocking armor pattern associated with modular assembly, structural repetition, and surface order.",
      origins: "Mountain Armor is one of the two most fully developed motifs in this project. It is especially useful because its repeated units and connection logic can be translated into a concrete computational lesson through CSDT.",
      modern: "This motif continues to appear in historical reconstruction, costume design, fantasy visual culture, and game art. It is especially compelling for students interested in engineering, building, and modular systems.",
      math: "Its structure can be studied through connected base units, angular repetition, unit modification, and assembly across a larger field. It shows how small structural changes affect the whole pattern.",
      ct: "A strong example for modular thinking, structural repetition, and the relationship between local unit design and larger system behavior."
    },
    {
      id: "miao-butterfly",
      mode: "panel",
      regionLabel: "Guizhou",
      name: "Miao Butterfly Motif",
      coords: [[28.5, 104.5], [28.7, 108.8], [25.3, 109.2], [24.0, 106.2], [25.4, 104.0]],
      color: "#e9c46a",
      popupImage: "images/miao.jpg",
      panelImage: "images/miao_intro.jpg",
      imageCaption: "Add Miao embroidery, batik, or silver ornament image here.",
      desc: "A decorative motif connected to Miao visual traditions, often emphasizing symmetry, transformation, and layered surface design.",
      origins: "Butterfly imagery appears in many Miao cultural contexts, especially in embroidery, silverwork, and textile design. It is useful here as a simplified example because it combines symbolic meaning with strong bilateral structure.",
      modern: "Miao-inspired butterfly forms continue to appear in museum exhibitions, textile revival work, fashion collaborations, and cultural design projects connected to Southwest China.",
      math: "The motif can be approached through bilateral symmetry, mirrored wing construction, border repetition, and repeated ornamental detailing across the surface.",
      ct: "Helpful for discussing symmetry, reflection, nesting, and how one central form can organize repeated design elements."
    },
    {
      id: "uyghur-atlas",
      mode: "panel",
      regionLabel: "Xinjiang",
      name: "Uyghur Atlas Motif",
      coords: [[47.0, 80.0], [46.0, 91.5], [41.0, 95.0], [36.0, 89.0], [37.0, 77.0], [43.0, 75.0]],
      color: "#8d99ae",
      popupImage: "images/uyghur.jpeg",
      panelImage: "images/uyghur_intro.jpeg",
      imageCaption: "Add Atlas textile, border design, or floral repeat image here.",
      desc: "A flowing textile pattern language associated with repeated ornament, rhythmic arrangement, and curving decorative forms.",
      origins: "Uyghur decorative traditions in Xinjiang include richly patterned textiles and surface designs shaped by long histories of craft production and regional exchange. This simplified entry highlights repeating ornamental flow rather than one single canonical motif.",
      modern: "Related forms continue to appear in textiles, dress, decorative products, interior design, and contemporary visual work that draws on Uyghur textile traditions.",
      math: "This motif can be studied through repeated curves, alternating units, mirrored branching, border logic, and rhythmic extension across a field.",
      ct: "Useful for repetition, alternation, branching, and thinking about how decorative rhythm can be built from simple recurring rules."
    },
    {
      id: "tujia-pattern",
      mode: "panel",
      regionLabel: "Hunan",
      name: "Tujia Xilankapu Pattern",
      coords: [[30.2, 108.0], [30.4, 111.6], [27.6, 111.8], [27.0, 108.4], [28.7, 107.4]],
      color: "#c77dff",
      popupImage: "images/Tujia.jpeg",
      panelImage: "images/Tujia_Intro.jpg",
      imageCaption: "Add Xilankapu brocade image or geometric weave detail here.",
      desc: "A woven geometric pattern tradition known for repeated units, stepped forms, and strong grid-based organization.",
      origins: "Tujia Xilankapu brocade traditions are known for bold geometry, woven structure, and repeated motif units. This archive includes it as a simplified example of how textile constraints shape visual design logic.",
      modern: "These patterns continue to appear in brocade preservation, tourism products, exhibition work, textile studies, and contemporary design inspired by woven structures.",
      math: "The pattern can be broken into grids, repeated stepped forms, mirrored sections, and modular changes across a woven field. It is one of the clearest grid-based examples in the archive.",
      ct: "Useful for grids, modular rules, repeated units, and the relation between woven structure and programmable logic."
    }
  ];

  // --- 5. DRAW POLYGONS & POPUPS ---
  motifRegions.forEach(region => {
    const polygon = L.polygon(region.coords, {
      color: region.color,
      fillColor: region.color,
      fillOpacity: 0.3,
      weight: 2
    }).addTo(map);

    polygon.on('mouseover', function () {
      this.setStyle({ fillOpacity: 0.6, weight: 3 });
    });

    polygon.on('mouseout', function () {
      this.setStyle({ fillOpacity: 0.3, weight: 2 });
    });

    const actionHTML = region.mode === "page"
      ? `<a href="${region.link}" class="brutal-btn" style="display: block; text-align: center; margin-top: 10px; padding: 6px 10px; font-size: 12px;">
           Explore Motif
         </a>`
      : `<button class="brutal-btn popup-panel-btn" data-region-id="${region.id}" style="display: block; text-align: center; margin-top: 10px; padding: 6px 10px; font-size: 12px; width: 100%;">
           Explore Motif
         </button>`;

    const popupContent = `
      <div style="font-family: var(--font-sans);">
        <h3 style="color: ${region.color}; margin-top: 0; font-family: var(--font-serif);">${region.name}</h3>
        <p style="font-size: 13px; line-height: 1.4;">${region.desc}</p>
        <img src="${region.popupImage}" alt="${region.name}" class="popup-img" onerror="this.style.display='none'">
        ${actionHTML}
      </div>
    `;

    polygon.bindPopup(popupContent, {
      maxWidth: 250
    });

    polygon.on('popupopen', function (e) {
      activePopup = e.popup;

      if (region.mode === "panel") {
        setTimeout(() => {
          const btn = document.querySelector(`.popup-panel-btn[data-region-id="${region.id}"]`);
          if (btn) {
            btn.addEventListener('click', () => {
              openMotifPanel(region, polygon);
            });
          }
        }, 0);
      }
    });
  });

});