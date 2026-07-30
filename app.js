// --- MODELLI DI BASE EUROSPIN PREDEFINITI ---
const DEFAULT_EUROSPIN_MODELS = {
  pizze: {
    id: "pizze",
    title: "Modulo 1: Pizze",
    code: "Modulo 1 - Istr. N. 1",
    subtitle: "Modulo Scadenze e rintracciabilità gastronomie",
    dateEmit: "Data Emissione: 2016 Rev.01 del 18/10/2016",
    recipes: [
      {
        name: "Pizza Diavola",
        ingredients: [
          { name: "Base pizza", supplier: "Menichetti Food" },
          { name: "Pomodori pelati", supplier: "Delizie del sole" },
          { name: "Olio evo", supplier: "Amo essere bio" },
          { name: "Sale iodato", supplier: "Jerez" },
          { name: "Mozzarella cubettata", supplier: "valcolatt" },
          { name: "Salame Ventricina", supplier: "Presila" }
        ]
      },
      {
        name: "Pizza capricciosa",
        ingredients: [
          { name: "Base pizza", supplier: "Menichetti Food" },
          { name: "Pomodori pelati", supplier: "Delizie del sole" },
          { name: "Olio evo", supplier: "Amo essere bio" },
          { name: "Sale iodato", supplier: "Jerez" },
          { name: "Mozzarella cubettata", supplier: "valcolatt" },
          { name: "Prosciutto crudo", supplier: "montorsi" },
          { name: "carciofini", supplier: "Delizie del sole" },
          { name: "Funghi champignon", supplier: "Delizie del sole" },
          { name: "Olive nere", supplier: "Varia gusto" }
        ]
      },
      {
        name: "Pizza stracciatella mortadella",
        ingredients: [
          { name: "Base pizza", supplier: "Menichetti Food" },
          { name: "Mortadella", supplier: "montorsi" },
          { name: "Stracciatella", supplier: "sabelli" },
          { name: "Olio evo", supplier: "Amo essere bio" },
          { name: "Granella di pistacchio", supplier: "Selezione natura" }
        ]
      },
      {
        name: "Pizza zucchine",
        ingredients: [
          { name: "Base pizza", supplier: "Menichetti Food" },
          { name: "Olio evo", supplier: "Amo essere bio" },
          { name: "Sale iodato", supplier: "Jerez" },
          { name: "Zucchine", supplier: "ortofrutta" }
        ]
      },
      {
        name: "Pizza caprese",
        ingredients: [
          { name: "Base pizza", supplier: "Menichetti Food" },
          { name: "Mozzarella di bufala", supplier: "Pascoli italiani" },
          { name: "Pomodorini", supplier: "La favetta" },
          { name: "Olio evo", supplier: "Amo essere bio" },
          { name: "Sale iodato", supplier: "Jerez" },
          { name: "basilico", supplier: "ortofrutta" }
        ]
      }
    ]
  },
  gastronomia: {
    id: "gastronomia",
    title: "Modulo 2: Gastronomia & Rosticceria",
    code: "Modulo 1 - Istr. N. 1",
    subtitle: "Modulo Scadenze e rintracciabilità gastronomie",
    dateEmit: "Data Emissione: 2016 Rev.01 del 18/10/2016",
    recipes: [
      {
        name: "Lasagna",
        ingredients: [
          { name: "Pasta sfoglia", supplier: "3 mulini" },
          { name: "Sugo alla bolognese", supplier: "Le delizie del sole" },
          { name: "Mozzarella cubettata", supplier: "valcolatt" },
          { name: "Besciamella UHT", supplier: "Land" },
          { name: "Grana Padano DOP", supplier: "Pascoli italiani" }
        ]
      },
      {
        name: "Cannelloni",
        ingredients: [
          { name: "Cannelloni di carne", supplier: "Pastif.Santurri srl" },
          { name: "Sugo alla bolognese", supplier: "Le delizie del sole" },
          { name: "Besciamella UHT", supplier: "Land" }
        ]
      },
      {
        name: "Gnocchi al pomod.",
        ingredients: [
          { name: "Gnocchi", supplier: "Pastificio maffella" },
          { name: "Sugo al basilico", supplier: "Le delizie del sole" },
          { name: "Acqua naturale", supplier: "Blues" },
          { name: "Grana padano DOP", supplier: "Pascoli italiani" },
          { name: "Mozzarella Cubettata", supplier: "valcolatt" },
          { name: "Passata di pomodoro", supplier: "Amo essere" }
        ]
      },
      {
        name: "Costine BBQ",
        ingredients: [
          { name: "Costine reparto", supplier: "macelleria" },
          { name: "Salsa marinatec 603", supplier: "BBQ" }
        ]
      },
      { name: "Fusi al forno", ingredients: [{ name: "Fusi al forno", supplier: "A.I.A" }] },
      { name: "Alette al forno", ingredients: [{ name: "Alette al forno", supplier: "A.I.A" }] },
      { name: "Arancini Ragu", ingredients: [{ name: "Arancini Ragu", supplier: "Freador" }] },
      { name: "Arancini Prosc.Mozz", ingredients: [{ name: "Arancini Prosc.Mozz", supplier: "Freador" }] },
      { name: "Focaccia Barese", ingredients: [{ name: "Focaccia Barese", supplier: "Panifi.Adriano" }] },
      { name: "Stinco di prosciutto arrosto", ingredients: [{ name: "Stinco di prosciutto arrosto", supplier: "Raspini" }] },
      { name: "Cotolette", ingredients: [{ name: "Cotolette", supplier: "Amadori" }] },
      { name: "Birbe", ingredients: [{ name: "Birbe", supplier: "Amadori" }] },
      { name: "Pollo Campese", ingredients: [{ name: "Pollo Campese", supplier: "" }] },
      { name: "POLLO Arrosto", ingredients: [{ name: "POLLO Arrosto", supplier: "" }] },
      { name: "Patate a spicchio", ingredients: [{ name: "Patate a spicchio", supplier: "Agricol Fiorito" }] }
    ]
  }
};

// Database Dexie locale
const db = new Dexie('EurospinHaccpDB_v2');
db.version(1).stores({
  sessions: '++id, date, moduleKey, timestamp',
  customModels: 'key',
  settings: 'key'
});

// Stato dei Modelli (caricati da DB o predefiniti)
let activeModels = JSON.parse(JSON.stringify(DEFAULT_EUROSPIN_MODELS));
let customCompanyLogo = null;

// Stato della Sessione
let currentSession = {
  moduleKey: null,
  selectedRecipes: [],
  flatSteps: [],
  currentIndex: 0,
  startTime: null,
  timerInterval: null,
  scannedLotsMemory: {},
  resultsMap: {}
};

// Stato Scansione a 2 Passi ('lot' = Passo 1 Lotto, 'expiry' = Passo 2 Scadenza)
let activeOcrMode = 'lot'; 

let cameraStream = null;
let activeFacingMode = 'environment';
let ocrWorker = null;

// --- INIZIALIZZAZIONE ---
document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  await loadCustomSettingsAndModels();
  setupModuleSelection();
  setupEventListeners();
  checkOnlineStatus();
  
  window.addEventListener('online', checkOnlineStatus);
  window.addEventListener('offline', checkOnlineStatus);
});

function checkOnlineStatus() {
  const statusEl = document.getElementById('connection-status');
  if (navigator.onLine) {
    statusEl.textContent = "Online";
    statusEl.className = "status-indicator online";
  } else {
    statusEl.textContent = "Offline (Locale)";
    statusEl.className = "status-indicator offline";
  }
}

// Caricamento impostazioni personalizzate da DB
async function loadCustomSettingsAndModels() {
  try {
    const savedModels = await db.customModels.get('models');
    if (savedModels && savedModels.data) {
      activeModels = savedModels.data;
    }
    const savedLogo = await db.settings.get('companyLogo');
    if (savedLogo && savedLogo.value) {
      customCompanyLogo = savedLogo.value;
      updateLogoUI(customCompanyLogo);
    }
  } catch (e) {
    console.error("Errore caricamento impostazioni custom:", e);
  }
}

// --- NAVIGAZIONE SCHEDE ---
function setupNavigation() {
  const navItems = document.querySelectorAll('.app-navbar .nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      tabContents.forEach(tc => tc.classList.toggle('active', tc.id === target));

      if (target !== 'sec-wizard') {
        stopCamera();
      } else if (currentSession.flatSteps.length > 0 && currentSession.currentIndex < currentSession.flatSteps.length) {
        startCamera();
      }

      if (target === 'sec-history') loadHistoryList();
      if (target === 'sec-settings') renderRecipeEditorUI();
    });
  });
}

// --- FASE 1: SELEZIONE MODULO ---
function setupModuleSelection() {
  const moduleBtns = document.querySelectorAll('.module-card-btn');
  moduleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleKey = btn.getAttribute('data-module');
      startRecipeSelection(moduleKey);
    });
  });
}

// --- FASE 2: SELEZIONE RICETTE ---
function startRecipeSelection(moduleKey) {
  currentSession.moduleKey = moduleKey;
  const model = activeModels[moduleKey];

  document.getElementById('recipe-selection-title').textContent = `${model.title} - Ricette Oggi`;
  const listContainer = document.getElementById('recipe-checkbox-list');
  listContainer.innerHTML = '';

  model.recipes.forEach((recipe, index) => {
    const item = document.createElement('div');
    item.className = 'recipe-checkbox-item checked';
    item.innerHTML = `
      <label for="recipe-check-${index}">${recipe.name}</label>
      <input type="checkbox" id="recipe-check-${index}" value="${index}" checked>
    `;
    
    item.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const chk = item.querySelector('input');
        chk.checked = !chk.checked;
      }
      item.classList.toggle('checked', item.querySelector('input').checked);
    });

    listContainer.appendChild(item);
  });

  document.getElementById('wizard-step-module').classList.add('hidden');
  document.getElementById('wizard-step-recipes').classList.remove('hidden');
}

// --- AVVIO WIZARD GUIDATO ---
function startWizardScanning() {
  const checkboxes = document.querySelectorAll('#recipe-checkbox-list input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    alert("Seleziona almeno una preparazione da compilare!");
    return;
  }

  const model = activeModels[currentSession.moduleKey];
  currentSession.selectedRecipes = Array.from(checkboxes).map(c => parseInt(c.value));
  
  currentSession.flatSteps = [];
  currentSession.currentIndex = 0;
  currentSession.scannedLotsMemory = {};
  currentSession.resultsMap = {};
  currentSession.startTime = new Date();

  currentSession.selectedRecipes.forEach(rIndex => {
    const recipe = model.recipes[rIndex];
    recipe.ingredients.forEach(ing => {
      currentSession.flatSteps.push({
        recipeName: recipe.name,
        ingredientName: ing.name,
        supplierName: ing.supplier,
        key: `${recipe.name}_${ing.name}`
      });
    });
  });

  document.getElementById('wizard-step-recipes').classList.add('hidden');
  document.getElementById('wizard-step-active').classList.remove('hidden');

  startSessionTimer();
  setOcrMode('lot'); // Inizia sempre con Passo 1: Lotto
  showCurrentWizardStep();
  startCamera();
}

function startSessionTimer() {
  const timerEl = document.getElementById('wizard-session-timer');
  let seconds = 0;
  timerEl.textContent = "00:00";
  if (currentSession.timerInterval) clearInterval(currentSession.timerInterval);
  currentSession.timerInterval = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }, 1000);
}

// IMPOSTAZIONE MODALITÀ SCANNER A 2 PASSI (PASSO 1: LOTTO / PASSO 2: SCADENZA)
function setOcrMode(mode) {
  activeOcrMode = mode;
  const indicator = document.getElementById('scan-step-indicator');
  const targetBox = document.getElementById('scan-target-box');
  const targetLabel = document.getElementById('scan-target-label');
  const captureLabel = document.getElementById('btn-capture-label');
  const switchBtn = document.getElementById('btn-switch-ocr-mode');

  if (mode === 'lot') {
    indicator.textContent = "PASSO 1: Scansiona il Codice LOTTO";
    indicator.className = "scan-step-badge step-1";
    targetBox.className = "scan-target-box step-1-mode";
    targetLabel.textContent = "Inquadra il Codice Lotto";
    captureLabel.textContent = "Scatta e Leggi Lotto";
    switchBtn.textContent = "Passa a Scadenza →";
  } else {
    indicator.textContent = "PASSO 2: Scansiona la Data di SCADENZA";
    indicator.className = "scan-step-badge step-2";
    targetBox.className = "scan-target-box step-2-mode";
    targetLabel.textContent = "Inquadra la Data di Scadenza";
    captureLabel.textContent = "Scatta e Leggi Scadenza";
    switchBtn.textContent = "← Passa a Lotto";
  }
}

function toggleOcrMode() {
  setOcrMode(activeOcrMode === 'lot' ? 'expiry' : 'lot');
}

// MOSTRA LO STEP CORRENTE
function showCurrentWizardStep() {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  
  document.getElementById('current-recipe-name').textContent = step.recipeName;
  document.getElementById('current-ingredient-name').textContent = step.ingredientName;
  document.getElementById('current-supplier-name').textContent = step.supplierName || "—";
  
  document.getElementById('current-step-index').textContent = `#${currentSession.currentIndex + 1}`;
  document.getElementById('wizard-step-badge').textContent = `Passo ${currentSession.currentIndex + 1} di ${currentSession.flatSteps.length}`;
  
  const percent = ((currentSession.currentIndex) / currentSession.flatSteps.length) * 100;
  document.getElementById('wizard-progress-fill').style.width = `${percent}%`;

  document.getElementById('input-lot-code').value = '';
  document.getElementById('input-expiry-date').value = '';
  document.getElementById('btn-clear-lot').classList.add('hidden');
  document.getElementById('btn-clear-expiry').classList.add('hidden');

  // Ripristina la fotocamera sulla scansione Lotto per il nuovo ingrediente
  setOcrMode('lot');

  // Banner Suggerimento Lotto Smart
  const existingMemory = currentSession.scannedLotsMemory[step.ingredientName];
  const smartBanner = document.getElementById('smart-reuse-banner');
  
  if (existingMemory) {
    document.getElementById('smart-reuse-text').textContent = `Lotto: ${existingMemory.lotCode || 'N/A'} - Scad: ${existingMemory.expiryDate || 'N/A'}`;
    smartBanner.classList.remove('hidden');
  } else {
    smartBanner.classList.add('hidden');
  }

  document.getElementById('btn-prev-ingredient').style.visibility = (currentSession.currentIndex > 0) ? 'visible' : 'hidden';
}

function applySmartReuse() {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  const memory = currentSession.scannedLotsMemory[step.ingredientName];
  if (memory) {
    document.getElementById('input-lot-code').value = memory.lotCode || '';
    document.getElementById('input-expiry-date').value = memory.expiryDate || '';
    document.getElementById('btn-clear-lot').classList.remove('hidden');
    document.getElementById('btn-clear-expiry').classList.remove('hidden');
  }
}

function nextWizardStep(isSkipped) {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  const lotVal = document.getElementById('input-lot-code').value.trim();
  const expiryVal = document.getElementById('input-expiry-date').value.trim();

  const resultObj = {
    recipeName: step.recipeName,
    ingredientName: step.ingredientName,
    supplierName: step.supplierName,
    lotCode: isSkipped ? "" : lotVal,
    expiryDate: isSkipped ? "" : expiryVal,
    status: isSkipped ? "saltato" : "registrato"
  };

  currentSession.resultsMap[step.key] = resultObj;

  if (!isSkipped && (lotVal !== '' || expiryVal !== '')) {
    currentSession.scannedLotsMemory[step.ingredientName] = {
      lotCode: lotVal,
      expiryDate: expiryVal
    };
  }

  currentSession.currentIndex++;

  if (currentSession.currentIndex < currentSession.flatSteps.length) {
    showCurrentWizardStep();
  } else {
    finishWizardSession();
  }
}

function prevWizardStep() {
  if (currentSession.currentIndex > 0) {
    currentSession.currentIndex--;
    showCurrentWizardStep();
  }
}

async function finishWizardSession() {
  clearInterval(currentSession.timerInterval);
  stopCamera();

  const model = activeModels[currentSession.moduleKey];

  const sessionRecord = {
    date: formatDate(new Date()),
    moduleKey: currentSession.moduleKey,
    moduleTitle: model.title,
    timestamp: Date.now(),
    selectedRecipes: currentSession.selectedRecipes,
    resultsMap: currentSession.resultsMap
  };
  await db.sessions.add(sessionRecord);

  document.getElementById('summary-module-name').textContent = model.title;
  document.getElementById('summary-recipes-count').textContent = `${currentSession.selectedRecipes.length} su ${model.recipes.length}`;
  
  const regCount = Object.values(currentSession.resultsMap).filter(r => r.status === 'registrato').length;
  document.getElementById('summary-registered-count').textContent = regCount;

  document.getElementById('wizard-step-active').classList.add('hidden');
  document.getElementById('wizard-step-summary').classList.remove('hidden');
}

function resetWizardToStart() {
  clearInterval(currentSession.timerInterval);
  stopCamera();
  currentSession.flatSteps = [];
  
  document.getElementById('wizard-step-summary').classList.add('hidden');
  document.getElementById('wizard-step-recipes').classList.add('hidden');
  document.getElementById('wizard-step-active').classList.add('hidden');
  document.getElementById('wizard-step-module').classList.remove('hidden');
}


// --- TELECAMERA & OCR AVANZATO CON PRE-PROCESSING PER TESTI PUNTINATI ---
async function startCamera() {
  stopCamera();
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: activeFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    document.getElementById('scanner-video').srcObject = cameraStream;
  } catch (err) {
    console.error("Errore avvio fotocamera:", err);
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  document.getElementById('scanner-video').srcObject = null;
}

function toggleCameraLens() {
  activeFacingMode = (activeFacingMode === 'environment') ? 'user' : 'environment';
  startCamera();
}

async function captureAndRecognizeText() {
  if (!cameraStream) return;
  const video = document.getElementById('scanner-video');
  const loader = document.getElementById('scanner-loader');
  const loaderText = document.getElementById('scanner-loader-text');
  
  if (!ocrWorker) {
    loaderText.textContent = "Inizializzazione OCR...";
    loader.classList.remove('hidden');
    // Whitelist per lotti e scadenze (lettere, numeri, slash e trattini)
    ocrWorker = await Tesseract.createWorker('ita');
    await ocrWorker.setParameters({
      tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz./- '
    });
  }
  
  loaderText.textContent = activeOcrMode === 'lot' ? "Lettura Codice Lotto..." : "Lettura Data Scadenza...";
  loader.classList.remove('hidden');

  // Ritaglio di precisione 1:1 dell'area del mirino
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  const cssWidth = video.clientWidth;
  const cssHeight = video.clientHeight;

  const cropWidth = videoWidth * 0.85;
  const cropHeight = videoHeight * 0.28;
  const cropX = (videoWidth - cropWidth) / 2;
  const cropY = (videoHeight - cropHeight) / 2;

  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = cropWidth;
  cropCanvas.height = cropHeight;
  const ctx = cropCanvas.getContext('2d');

  ctx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

  // ALGORITMO DI PRE-PROCESSING PER TESTI PUNTINATI (DOT-MATRIX)
  // Applica una dilatazione dei pixel bianchi/neri per connettere i punti a matrice d'inchiostro
  const imgData = ctx.getImageData(0, 0, cropWidth, cropHeight);
  const data = imgData.data;

  // 1. Grayscale & Contrast enhancement
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
    const val = (gray > 115) ? 255 : 0;
    data[i] = val; data[i + 1] = val; data[i + 2] = val;
  }

  // 2. Dilatazione dei pixel (Morphological Dilation) per unire le righe di punti sgranati
  const w = cropWidth;
  const h = cropHeight;
  const copy = new Uint8ClampedArray(data);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      if (copy[idx] === 0) { // Se è un pixel nero di testo
        // Espande il nero sui 4 pixel adiacenti per unire i pallini della matrice
        data[((y - 1) * w + x) * 4] = 0;
        data[((y + 1) * w + x) * 4] = 0;
        data[(y * w + (x - 1)) * 4] = 0;
        data[(y * w + (x + 1)) * 4] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const dataUrl = cropCanvas.toDataURL('image/jpeg', 0.95);

  const targetBox = document.getElementById('scan-target-box');
  targetBox.classList.add('success');
  setTimeout(() => targetBox.classList.remove('success'), 600);

  try {
    const result = await ocrWorker.recognize(dataUrl);
    const rawText = result.data.text;
    console.log("OCR Raw Text:", rawText);

    if (activeOcrMode === 'lot') {
      // Estrazione Lotto Alfanumerico
      const lot = parseLotCode(rawText);
      if (lot !== "") {
        document.getElementById('input-lot-code').value = lot;
        document.getElementById('btn-clear-lot').classList.remove('hidden');
        // Passa automaticamente al Passo 2 (Scadenza) dopo la lettura del lotto!
        setOcrMode('expiry');
      } else {
        alert("Codice Lotto non rilevato. Avvicina la confezione o inseriscilo manualmente.");
      }
    } else {
      // Estrazione Data di Scadenza (gg/mm/aaaa o mm/aaaa)
      const expiry = parseExpiryDate(rawText);
      if (expiry !== "") {
        document.getElementById('input-expiry-date').value = expiry;
        document.getElementById('btn-clear-expiry').classList.remove('hidden');
      } else {
        alert("Data di Scadenza non rilevata (formati validi: gg/mm/aaaa o mm/aaaa). Prova di nuovo o digitala manualmente.");
      }
    }
  } catch (err) {
    console.error("Errore OCR:", err);
  } finally {
    loader.classList.add('hidden');
  }
}

// PARSER REGEX PER LOTTI
function parseLotCode(text) {
  if (!text) return "";
  let clean = text.replace(/[\r\n]+/g, ' ').trim();
  clean = clean.replace(/^(lotto|lot|l\.)\s*:?\s*/i, '');
  clean = clean.replace(/[^a-zA-Z0-9.\-]/g, ' ').trim();
  const parts = clean.split(/\s+/).filter(p => p.length >= 2);
  return parts.length > 0 ? parts[0].substring(0, 18) : "";
}

// PARSER REGEX PER DATE DI SCADENZA (gg/mm/aaaa o mm/aaaa)
function parseExpiryDate(text) {
  if (!text) return "";
  
  // Cerca pattern gg/mm/aaaa o gg-mm-aaaa o gg.mm.aaaa
  const fullDateRegex = /\b([0-3]?[0-9][/\.-][0-1]?[0-9][/\.-]20\d{2})\b/;
  const shortYearRegex = /\b([0-3]?[0-9][/\.-][0-1]?[0-9][/\.-]\d{2})\b/;
  // Cerca pattern mm/aaaa (es. 09/2026 o 09/26)
  const monthYearRegex = /\b([0-1]?[0-9][/\.-]20\d{2})\b/;

  let match = text.match(fullDateRegex);
  if (match) return match[1].replace(/[\.-]/g, '/');

  match = text.match(shortYearRegex);
  if (match) return match[1].replace(/[\.-]/g, '/');

  match = text.match(monthYearRegex);
  if (match) return match[1].replace(/[\.-]/g, '/');

  return "";
}


// --- GESTIONE LOGO AZIENDALE PERSONALIZZATO ---
function setupCompanyLogoUploader() {
  const fileInput = document.getElementById('input-logo-file');
  const removeBtn = document.getElementById('btn-remove-custom-logo');

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64Img = evt.target.result;
      customCompanyLogo = base64Img;
      await db.settings.put({ key: 'companyLogo', value: base64Img });
      updateLogoUI(base64Img);
      alert("Logo Aziendale caricato con successo!");
    };
    reader.readAsDataURL(file);
  });

  removeBtn.addEventListener('click', async () => {
    if (confirm("Rimuovere il logo personalizzato?")) {
      customCompanyLogo = null;
      await db.settings.delete('companyLogo');
      updateLogoUI(null);
    }
  });
}

function updateLogoUI(logoBase64) {
  const placeholder = document.getElementById('logo-placeholder-text');
  const previewImg = document.getElementById('custom-logo-preview');
  const removeBtn = document.getElementById('btn-remove-custom-logo');
  const headerAppLogo = document.getElementById('app-header-logo');

  if (logoBase64) {
    placeholder.classList.add('hidden');
    previewImg.src = logoBase64;
    previewImg.classList.remove('hidden');
    removeBtn.classList.remove('hidden');
    headerAppLogo.src = logoBase64;
  } else {
    placeholder.classList.remove('hidden');
    previewImg.classList.add('hidden');
    removeBtn.classList.add('hidden');
    headerAppLogo.src = "icon.jpg";
  }
}


// --- EDITOR RICETTE E FORNITORI NELLE IMPOSTAZIONI ---
function renderRecipeEditorUI() {
  const selectModule = document.getElementById('select-editor-module');
  const moduleKey = selectModule.value;
  const model = activeModels[moduleKey];
  const container = document.getElementById('recipe-editor-container');
  container.innerHTML = '';

  model.recipes.forEach((recipe, rIndex) => {
    const card = document.createElement('div');
    card.className = 'editor-recipe-card';
    
    let ingHTML = '';
    recipe.ingredients.forEach((ing, iIndex) => {
      ingHTML += `
        <div class="editor-ingredient-row">
          <input type="text" class="inp-ing-name" value="${ing.name}" data-r="${rIndex}" data-i="${iIndex}" placeholder="Nome ingrediente">
          <input type="text" class="inp-ing-supplier" value="${ing.supplier || ''}" data-r="${rIndex}" data-i="${iIndex}" placeholder="Fornitore">
          <button class="btn-text-action delete btn-del-ing" data-r="${rIndex}" data-i="${iIndex}">✕</button>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="editor-recipe-header">
        <input type="text" class="inp-recipe-name" value="${recipe.name}" data-r="${rIndex}" style="font-weight:bold; font-size:15px; background:none; border:1px solid var(--glass-border); color:#fff; padding:4px 8px; border-radius:6px;">
        <button class="btn-text-action delete btn-del-recipe" data-r="${rIndex}">Elimina Piatto</button>
      </div>
      <div class="editor-ingredients-list" style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
        ${ingHTML}
      </div>
      <button class="btn btn-secondary btn-sm btn-add-ing-row" data-r="${rIndex}" style="margin-top:8px;">+ Aggiungi Ingrediente</button>
    `;

    container.appendChild(card);
  });

  // Eventi per il salvataggio automatico delle modifiche ai fornitori
  container.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('change', saveEditorChanges);
  });

  container.querySelectorAll('.btn-del-ing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const r = parseInt(e.target.getAttribute('data-r'));
      const i = parseInt(e.target.getAttribute('data-i'));
      model.recipes[r].ingredients.splice(i, 1);
      saveCustomModelsDB();
      renderRecipeEditorUI();
    });
  });

  container.querySelectorAll('.btn-add-ing-row').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const r = parseInt(e.target.getAttribute('data-r'));
      model.recipes[r].ingredients.push({ name: "Nuovo Ingrediente", supplier: "Nuovo Fornitore" });
      saveCustomModelsDB();
      renderRecipeEditorUI();
    });
  });

  container.querySelectorAll('.btn-del-recipe').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const r = parseInt(e.target.getAttribute('data-r'));
      if (confirm(`Eliminare la ricetta "${model.recipes[r].name}"?`)) {
        model.recipes.splice(r, 1);
        saveCustomModelsDB();
        renderRecipeEditorUI();
      }
    });
  });
}

function saveEditorChanges() {
  const selectModule = document.getElementById('select-editor-module');
  const moduleKey = selectModule.value;
  const model = activeModels[moduleKey];
  const container = document.getElementById('recipe-editor-container');

  const recipeCards = container.querySelectorAll('.editor-recipe-card');
  recipeCards.forEach((card, rIndex) => {
    const recipeNameInp = card.querySelector('.inp-recipe-name');
    model.recipes[rIndex].name = recipeNameInp.value.trim();

    const ingRows = card.querySelectorAll('.editor-ingredient-row');
    ingRows.forEach((row, iIndex) => {
      const nameInp = row.querySelector('.inp-ing-name');
      const supplierInp = row.querySelector('.inp-ing-supplier');
      model.recipes[rIndex].ingredients[iIndex].name = nameInp.value.trim();
      model.recipes[rIndex].ingredients[iIndex].supplier = supplierInp.value.trim();
    });
  });

  saveCustomModelsDB();
}

async function saveCustomModelsDB() {
  await db.customModels.put({ key: 'models', data: activeModels });
}


// --- RENDER FOGLIO 1:1 STAMPABILE CON LOGO PERSONALIZZATO ---
function renderEurospinPaperSheet(sessionData) {
  const modelKey = sessionData.moduleKey || "pizze";
  const model = activeModels[modelKey];
  const resultsMap = sessionData.resultsMap || {};

  document.getElementById('print-date-field').textContent = sessionData.date || formatDate(new Date());
  
  // Header Logo: usa logo personalizzato se presente, altrimenti box Eurospin
  const logoContainer = document.getElementById('paper-logo-container');
  if (customCompanyLogo) {
    logoContainer.innerHTML = `<img src="${customCompanyLogo}" class="paper-logo-img" alt="Logo Aziendale">`;
  } else {
    logoContainer.innerHTML = `
      <div class="eurospin-logo-box">
        <span class="logo-top">★ EURO ★</span>
        <span class="logo-bottom">Spin</span>
      </div>`;
  }

  const table = document.getElementById('paper-data-table');
  table.innerHTML = '';

  const isGastro = (modelKey === 'gastronomia');
  
  let headerHTML = `
    <thead>
      <tr>
        <th style="width: 25%;">${isGastro ? "Prodotto / Ricetta" : "Prodotto (Ricetta)"}</th>
        <th style="width: 25%;">Ingrediente</th>
        <th style="width: 20%;">Fornitore</th>
        <th style="width: 15%;">Lotto</th>
        <th style="width: 15%;">Scadenza</th>
      </tr>
    </thead>
    <tbody>
  `;

  let tbodyHTML = '';

  model.recipes.forEach((recipe) => {
    const isPreparedToday = sessionData.selectedRecipes ? sessionData.selectedRecipes.includes(model.recipes.indexOf(recipe)) : true;
    const ingCount = recipe.ingredients.length;

    recipe.ingredients.forEach((ing, iIndex) => {
      const stepKey = `${recipe.name}_${ing.name}`;
      const result = resultsMap[stepKey];
      
      const lotDisplay = (isPreparedToday && result) ? result.lotCode : "";
      const expDisplay = (isPreparedToday && result) ? result.expiryDate : "";

      tbodyHTML += `<tr>`;
      if (iIndex === 0) {
        tbodyHTML += `<td class="cell-recipe" rowspan="${ingCount}">${recipe.name}</td>`;
      }

      tbodyHTML += `
        <td class="cell-product">${ing.name}</td>
        <td class="cell-supplier">${ing.supplier || "—"}</td>
        <td class="cell-lot">${lotDisplay}</td>
        <td class="cell-expiry">${expDisplay}</td>
      </tr>`;
    });
  });

  tbodyHTML += `</tbody>`;
  table.innerHTML = headerHTML + tbodyHTML;
}

function openPrintPreviewModal() {
  const currentData = {
    date: formatDate(new Date()),
    moduleKey: currentSession.moduleKey,
    selectedRecipes: currentSession.selectedRecipes,
    resultsMap: currentSession.resultsMap
  };
  renderEurospinPaperSheet(currentData);
  document.getElementById('print-modal').classList.remove('hidden');
}


// --- ESPORTAZIONE EXCEL ---
function exportSessionToExcel(sessionData) {
  const modelKey = sessionData.moduleKey || "pizze";
  const model = activeModels[modelKey];
  const resultsMap = sessionData.resultsMap || {};

  const rows = [];
  rows.push(["ISTRUZIONE OPERATIVE INTERNE", "", "", "Data Emissione: 2016 Rev.01 del 18/10/2016"]);
  rows.push([model.subtitle, "", "", "Pagina 1 di 1"]);
  rows.push([`Data: ${sessionData.date || formatDate(new Date())}`]);
  rows.push([]);

  rows.push(["Prodotto / Ricetta", "Ingrediente", "Fornitore", "Lotto", "Scadenza"]);

  model.recipes.forEach(recipe => {
    const isPreparedToday = sessionData.selectedRecipes ? sessionData.selectedRecipes.includes(model.recipes.indexOf(recipe)) : true;
    
    recipe.ingredients.forEach(ing => {
      const stepKey = `${recipe.name}_${ing.name}`;
      const result = resultsMap[stepKey];

      rows.push([
        recipe.name,
        ing.name,
        ing.supplier || "",
        (isPreparedToday && result) ? result.lotCode : "",
        (isPreparedToday && result) ? result.expiryDate : ""
      ]);
    });
  });

  rows.push([]);
  rows.push(["Gli ingredienti con stesso lotto e scadenza utilizzati in più preparazioni sono contrassegnati con un asterisco"]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rintracciabilità");

  worksheet['!cols'] = [{ wch: 25 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 15 }];
  XLSX.writeFile(workbook, `Eurospin_${modelKey}_${(sessionData.date || formatDate(new Date())).replace(/\//g, '-')}.xlsx`);
}


// --- SETUP EVENTI GLOBALI ---
function setupEventListeners() {
  document.getElementById('btn-start-scanning').addEventListener('click', startWizardScanning);
  document.getElementById('btn-back-to-modules').addEventListener('click', () => {
    document.getElementById('wizard-step-recipes').classList.add('hidden');
    document.getElementById('wizard-step-module').classList.remove('hidden');
  });

  document.getElementById('btn-toggle-all-recipes').addEventListener('click', (e) => {
    const chks = document.querySelectorAll('#recipe-checkbox-list input[type="checkbox"]');
    const isAllChecked = Array.from(chks).every(c => c.checked);
    chks.forEach(c => {
      c.checked = !isAllChecked;
      c.parentElement.classList.toggle('checked', c.checked);
    });
    e.target.textContent = isAllChecked ? "Seleziona Tutti" : "Deseleziona Tutti";
  });

  document.getElementById('btn-switch-ocr-mode').addEventListener('click', toggleOcrMode);

  document.getElementById('btn-confirm-next').addEventListener('click', () => nextWizardStep(false));
  document.getElementById('btn-skip-ingredient').addEventListener('click', () => nextWizardStep(true));
  document.getElementById('btn-prev-ingredient').addEventListener('click', prevWizardStep);
  
  document.getElementById('btn-apply-smart-reuse').addEventListener('click', applySmartReuse);
  document.getElementById('btn-abort-session').addEventListener('click', resetWizardToStart);
  document.getElementById('btn-restart-wizard').addEventListener('click', resetWizardToStart);

  document.getElementById('btn-capture').addEventListener('click', captureAndRecognizeText);
  document.getElementById('btn-toggle-camera').addEventListener('click', toggleCameraLens);

  document.getElementById('btn-open-print-preview').addEventListener('click', openPrintPreviewModal);
  document.getElementById('btn-close-print-modal').addEventListener('click', () => {
    document.getElementById('print-modal').classList.add('hidden');
  });

  document.getElementById('btn-export-excel').addEventListener('click', () => {
    const currentData = {
      date: formatDate(new Date()),
      moduleKey: currentSession.moduleKey,
      selectedRecipes: currentSession.selectedRecipes,
      resultsMap: currentSession.resultsMap
    };
    exportSessionToExcel(currentData);
  });

  setupCompanyLogoUploader();

  document.getElementById('select-editor-module').addEventListener('change', renderRecipeEditorUI);
  document.getElementById('btn-add-new-recipe').addEventListener('click', () => {
    const moduleKey = document.getElementById('select-editor-module').value;
    activeModels[moduleKey].recipes.push({
      name: "Nuova Ricetta",
      ingredients: [{ name: "Ingrediente 1", supplier: "Fornitore 1" }]
    });
    saveCustomModelsDB();
    renderRecipeEditorUI();
  });

  document.getElementById('btn-reset-models').addEventListener('click', async () => {
    if (confirm("Ripristinare i modelli e i fornitori predefiniti originali Eurospin?")) {
      activeModels = JSON.parse(JSON.stringify(DEFAULT_EUROSPIN_MODELS));
      await db.customModels.delete('models');
      renderRecipeEditorUI();
      alert("Fornitori predefiniti ripristinati!");
    }
  });

  setupInputClear('input-lot-code', 'btn-clear-lot');
  setupInputClear('input-expiry-date', 'btn-clear-expiry');

  document.getElementById('btn-clear-all').addEventListener('click', async () => {
    if (confirm("Cancellare lo storico delle registrazioni?")) {
      await db.sessions.clear();
      loadHistoryList();
    }
  });
}

function setupInputClear(inputId, clearBtnId) {
  const inp = document.getElementById(inputId);
  const btn = document.getElementById(clearBtnId);
  inp.addEventListener('input', () => btn.classList.toggle('hidden', inp.value === ''));
  btn.addEventListener('click', () => {
    inp.value = '';
    btn.classList.add('hidden');
    inp.focus();
  });
}

async function loadHistoryList() {
  const sessions = await db.sessions.orderBy('timestamp').reverse().toArray();
  const listContainer = document.getElementById('history-list');
  document.getElementById('history-count').textContent = `${sessions.length} fogli`;
  listContainer.innerHTML = '';

  if (sessions.length === 0) {
    document.getElementById('history-empty').classList.remove('hidden');
    return;
  }
  document.getElementById('history-empty').classList.add('hidden');

  sessions.forEach(session => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <div class="history-header">
        <span>${session.moduleTitle || 'Modulo Eurospin'}</span>
        <span style="color: var(--text-secondary); font-size:12px;">${session.date}</span>
      </div>
      <div class="history-actions">
        <button class="btn-text-action delete" data-id="${session.id}">Elimina</button>
        <button class="btn-text-action export" data-id="${session.id}">Vedi 1:1 / PDF</button>
      </div>
    `;

    card.querySelector('.delete').addEventListener('click', async () => {
      if (confirm("Eliminare questa registrazione dallo storico?")) {
        await db.sessions.delete(session.id);
        loadHistoryList();
      }
    });

    card.querySelector('.export').addEventListener('click', () => {
      renderEurospinPaperSheet(session);
      document.getElementById('print-modal').classList.remove('hidden');
    });

    listContainer.appendChild(card);
  });
}

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
