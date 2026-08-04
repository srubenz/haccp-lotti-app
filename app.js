// --- MODELLI DI BASE EUROSPIN AGGIORNATI (REV. 02 DEL 15/05/2025) ---
const DEFAULT_EUROSPIN_MODELS = {
  pizze: {
    id: "pizze",
    title: "Modulo 1: Pizze",
    code: "Modulo 1 - Istr. N. 1",
    subtitle: "Modulo tracciabilità Preparazioni",
    dateEmit: "Data Emissione: 2016 Rev. 02 del 15/05/2025",
    pageInfo: "Pagina 1 di 2",
    recipes: [
      {
        name: "Pizza bianca",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Olio EVO" },
          { name: "Sale iodato" },
          { name: "Rosmarino" }
        ]
      },
      {
        name: "Pizza rossa",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Olio EVO" },
          { name: "Sale iodato" },
          { name: "Pomodori pelati Delizie dal Sole" }
        ]
      },
      {
        name: "Pizza Margherita",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Pomodori pelati Delizie dal Sole" },
          { name: "Olio EVO" },
          { name: "Mozzarella Cubettata" },
          { name: "Sale iodato" },
          { name: "Basilico" }
        ]
      },
      {
        name: "Pizza marinara",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Olio EVO" },
          { name: "Sale iodato" },
          { name: "Aglio" },
          { name: "Origano" },
          { name: "Pomodori pelati Delizie dal Sole" }
        ]
      },
      {
        name: "Pizza Napoli",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Olio EVO (A.E.E.) Mazara del Vallo" },
          { name: "Sale iodato" },
          { name: "Capperi" },
          { name: "Filetti di acciughe" },
          { name: "Pomodori pelati Delizie dal Sole" }
        ]
      },
      {
        name: "Pizza diavola",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Olio EVO" },
          { name: "Sale iodato" },
          { name: "Mozzarella cubettata" },
          { name: "Salame ventricina" }
        ]
      },
      {
        name: "Crostino",
        ingredients: [
          { name: "Pizza base bianca" },
          { name: "Mozzarella cubettata" },
          { name: "Prosciutto cotto" },
          { name: "Sale iodato" },
          { name: "Olio EVO" }
        ]
      }
    ]
  },
  gastronomia: {
    id: "gastronomia",
    title: "Modulo 2: Gastronomia & Rosticceria (Piano Caldo)",
    code: "Modulo 1 - Istr. N. 1",
    subtitle: "Modulo Scadenze e rintracciabilità gastronomie",
    dateEmit: "Data Emissione: 2016 Rev.01 del 18/10/2016",
    pageInfo: "Pagina 1 di 1",
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
      { name: "Arancini Ragu", ingredients: [{ name: "Arancini Ragu", supplier: "KREADOC" }] },
      { name: "Arancini Prosc.Mozz", ingredients: [{ name: "Arancini Prosc.Mozz", supplier: "KREADOC" }] },
      { name: "Focaccia Barese", ingredients: [{ name: "Focaccia Barese", supplier: "Panificio Adriatico" }] },
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
const db = new Dexie('EurospinHaccpDB_v7');
db.version(1).stores({
  sessions: '++id, date, moduleKey, timestamp',
  customModels: 'key',
  settings: 'key'
});

let activeModels = JSON.parse(JSON.stringify(DEFAULT_EUROSPIN_MODELS));
let customCompanyLogo = null;
let googleSheetsWebhookUrl = "";

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

let activeStep = 'lot';
let cameraStream = null;
let activeFacingMode = 'environment';
let ocrWorker = null;
let isFrozenFrame = false;
let pendingDetectedText = "";

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
    statusEl.textContent = "Offline";
    statusEl.className = "status-indicator offline";
  }
}

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
    const savedSheets = await db.settings.get('googleSheetsUrl');
    if (savedSheets && savedSheets.value) {
      googleSheetsWebhookUrl = savedSheets.value;
      document.getElementById('input-sheets-url').value = googleSheetsWebhookUrl;
    }
  } catch (e) {
    console.error("Errore caricamento impostazioni:", e);
  }
}

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

function setupModuleSelection() {
  const moduleBtns = document.querySelectorAll('.module-card-btn');
  moduleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleKey = btn.getAttribute('data-module');
      startRecipeSelection(moduleKey);
    });
  });
}

function startRecipeSelection(moduleKey) {
  currentSession.moduleKey = moduleKey;
  const model = activeModels[moduleKey];

  document.getElementById('recipe-selection-title').textContent = `${model.title} - Preparazioni del Giorno`;
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
      const chk = item.querySelector('input');
      if (e.target.tagName !== 'INPUT') {
        chk.checked = !chk.checked;
      }
      item.classList.toggle('checked', chk.checked);
    });

    listContainer.appendChild(item);
  });

  document.getElementById('wizard-step-module').classList.add('hidden');
  document.getElementById('wizard-step-recipes').classList.remove('hidden');
}

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
        supplierName: ing.supplier || "",
        key: `${recipe.name}_${ing.name}`
      });
    });
  });

  document.getElementById('wizard-step-recipes').classList.add('hidden');
  document.getElementById('wizard-step-active').classList.remove('hidden');

  startSessionTimer();
  setActiveStep('lot');
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

function setActiveStep(step) {
  activeStep = step;
  const btnLot = document.getElementById('btn-step-lot');
  const btnExp = document.getElementById('btn-step-exp');
  const indicator = document.getElementById('scan-step-indicator');

  if (step === 'lot') {
    btnLot.className = "btn-step step-1-active";
    btnExp.className = "btn-step";
    indicator.textContent = "PASSO 1: Seleziona Codice LOTTO";
    indicator.className = "scan-step-badge step-1";
  } else {
    btnLot.className = "btn-step";
    btnExp.className = "btn-step step-2-active";
    indicator.textContent = "PASSO 2: Seleziona Data SCADENZA";
    indicator.className = "scan-step-badge step-2";
  }
}

function showCurrentWizardStep() {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  
  document.getElementById('current-recipe-name').textContent = step.recipeName;
  document.getElementById('current-ingredient-name').textContent = step.ingredientName;
  
  const supplierWrapper = document.getElementById('supplier-badge-wrapper');
  if (step.supplierName) {
    document.getElementById('current-supplier-name').textContent = step.supplierName;
    supplierWrapper.style.display = 'block';
  } else {
    supplierWrapper.style.display = 'none';
  }
  
  document.getElementById('current-step-index').textContent = `#${currentSession.currentIndex + 1}`;
  document.getElementById('wizard-step-badge').textContent = `Passo ${currentSession.currentIndex + 1} di ${currentSession.flatSteps.length}`;
  
  const percent = ((currentSession.currentIndex) / currentSession.flatSteps.length) * 100;
  document.getElementById('wizard-progress-fill').style.width = `${percent}%`;

  document.getElementById('input-lot-code').value = '';
  document.getElementById('input-expiry-date').value = '';
  document.getElementById('btn-clear-lot').classList.add('hidden');
  document.getElementById('btn-clear-expiry').classList.add('hidden');

  unfreezeCamera();
  setActiveStep('lot');

  const normName = step.ingredientName.trim().toLowerCase();
  const existingMemory = currentSession.scannedLotsMemory[normName];
  const smartBanner = document.getElementById('smart-reuse-banner');
  
  if (existingMemory && (existingMemory.lotCode || existingMemory.expiryDate)) {
    if (existingMemory.lotCode) {
      document.getElementById('input-lot-code').value = existingMemory.lotCode;
      document.getElementById('btn-clear-lot').classList.remove('hidden');
    }
    if (existingMemory.expiryDate) {
      document.getElementById('input-expiry-date').value = convertToIsoDate(existingMemory.expiryDate);
      document.getElementById('btn-clear-expiry').classList.remove('hidden');
    }

    document.getElementById('smart-reuse-text').textContent = `Compilato in automatico da preparazione precedente (Lotto: ${existingMemory.lotCode || 'N/A'} - Scad: ${existingMemory.expiryDate || 'N/A'})`;
    smartBanner.classList.remove('hidden');
  } else {
    smartBanner.classList.add('hidden');
  }

  document.getElementById('btn-prev-ingredient').style.visibility = (currentSession.currentIndex > 0) ? 'visible' : 'hidden';
}

function applySmartReuse() {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  const normName = step.ingredientName.trim().toLowerCase();
  const memory = currentSession.scannedLotsMemory[normName];
  if (memory) {
    document.getElementById('input-lot-code').value = memory.lotCode || '';
    if (memory.expiryDate) {
      document.getElementById('input-expiry-date').value = convertToIsoDate(memory.expiryDate);
    }
    document.getElementById('btn-clear-lot').classList.remove('hidden');
    document.getElementById('btn-clear-expiry').classList.remove('hidden');
  }
}

function nextWizardStep(isSkipped) {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  const lotVal = document.getElementById('input-lot-code').value.trim();
  const expiryValRaw = document.getElementById('input-expiry-date').value.trim();
  const expiryVal = formatIsoToItalianDisplay(expiryValRaw);

  const resultObj = {
    recipeName: step.recipeName,
    ingredientName: step.ingredientName,
    supplierName: step.supplierName,
    lotCode: isSkipped ? "" : lotVal,
    expiryDate: isSkipped ? "" : expiryVal,
    status: isSkipped ? "saltato" : "registrato"
  };

  currentSession.resultsMap[step.key] = resultObj;

  const normName = step.ingredientName.trim().toLowerCase();
  if (!isSkipped && (lotVal !== '' || expiryVal !== '')) {
    currentSession.scannedLotsMemory[normName] = {
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

  if (googleSheetsWebhookUrl) {
    sendSessionToGoogleSheets(sessionRecord);
  }

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


// --- TELECAMERA & OCR INTERATTIVO OPTIMIZED PER ETICHETTE REALI (KREADOC, PANIFICIO ADRIATICO, EUROSPIN) ---
async function startCamera() {
  stopCamera();
  const notice = document.getElementById('camera-fallback-notice');
  const video = document.getElementById('scanner-video');

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: activeFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    video.srcObject = cameraStream;
    notice.classList.add('hidden');
  } catch (err) {
    console.warn("Fotocamera live non disponibile (HTTP o permessi):", err);
    notice.classList.remove('hidden');
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

function unfreezeCamera() {
  isFrozenFrame = false;
  document.getElementById('freeze-canvas').classList.add('hidden');
  document.getElementById('text-highlight-layer').classList.add('hidden');
  document.getElementById('text-highlight-layer').innerHTML = '';
  document.getElementById('btn-unfreeze-camera').classList.add('hidden');
  document.getElementById('scan-target-box').classList.remove('hidden');
  document.getElementById('ocr-confirm-modal').classList.add('hidden');
}

async function freezeCameraAndRecognize() {
  if (!cameraStream) {
    document.getElementById('input-ocr-file').click();
    return;
  }
  
  const video = document.getElementById('scanner-video');
  const canvas = document.getElementById('freeze-canvas');
  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  canvas.classList.remove('hidden');
  document.getElementById('scan-target-box').classList.add('hidden');
  document.getElementById('btn-unfreeze-camera').classList.remove('hidden');
  isFrozenFrame = true;

  await analyzeAndRenderTextHighlights(canvas);
}

function handleFilePhotoCapture(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.getElementById('freeze-canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.classList.remove('hidden');
      document.getElementById('scan-target-box').classList.add('hidden');
      document.getElementById('btn-unfreeze-camera').classList.remove('hidden');
      isFrozenFrame = true;

      await analyzeAndRenderTextHighlights(canvas);
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
}

// RICONOSCIMENTO TESTO CON RAGGRUPPAMENTO PER RIGHE INTERE ED EVIDENZIATORI TOCCABILI
async function analyzeAndRenderTextHighlights(canvas) {
  const loader = document.getElementById('scanner-loader');
  const loaderText = document.getElementById('scanner-loader-text');
  const highlightLayer = document.getElementById('text-highlight-layer');

  loaderText.textContent = "Analisi e ricerca testo sulle etichette...";
  loader.classList.remove('hidden');

  if (!ocrWorker) {
    ocrWorker = await Tesseract.createWorker('ita');
    await ocrWorker.setParameters({
      tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz./- '
    });
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

  try {
    const result = await ocrWorker.recognize(dataUrl);
    // Utilizza le righe (lines) o parole (words) per creare box completi sulle etichette
    const lines = result.data.lines || [];
    const words = result.data.words || [];

    highlightLayer.innerHTML = '';
    highlightLayer.classList.remove('hidden');

    const wrapper = document.getElementById('scanner-wrapper');
    const scaleX = wrapper.clientWidth / canvas.width;
    const scaleY = wrapper.clientHeight / canvas.height;

    let foundCount = 0;

    // Prima cerca le righe che contengono parole chiave come Lotto, Scad, Da consumarsi
    lines.forEach(line => {
      const lineText = line.text.trim();
      if (lineText.length < 3) return;

      const isKeyLine = /lotto|lot|l\.|scad|exp|consumarsi/i.test(lineText);
      if (isKeyLine) {
        const bbox = line.bbox;
        const left = bbox.x0 * scaleX;
        const top = bbox.y0 * scaleY;
        const width = (bbox.x1 - bbox.x0) * scaleX;
        const height = (bbox.y1 - bbox.y0) * scaleY;

        const boxEl = document.createElement('div');
        boxEl.className = 'ocr-word-box';
        boxEl.style.left = `${left}px`;
        boxEl.style.top = `${top}px`;
        boxEl.style.width = `${width}px`;
        boxEl.style.height = `${height}px`;
        boxEl.style.borderColor = '#2563eb';
        boxEl.style.backgroundColor = 'rgba(37, 99, 235, 0.3)';

        boxEl.addEventListener('click', (e) => {
          e.stopPropagation();
          showConfirmModal(lineText);
        });

        highlightLayer.appendChild(boxEl);
        foundCount++;
      }
    });

    // Se non trova righe intere chiave, disegna i riquadri per le singole parole
    if (foundCount === 0) {
      words.forEach(word => {
        const text = word.text.trim();
        if (text.length < 2) return;

        const bbox = word.bbox;
        const left = bbox.x0 * scaleX;
        const top = bbox.y0 * scaleY;
        const width = (bbox.x1 - bbox.x0) * scaleX;
        const height = (bbox.y1 - bbox.y0) * scaleY;

        const boxEl = document.createElement('div');
        boxEl.className = 'ocr-word-box';
        boxEl.style.left = `${left}px`;
        boxEl.style.top = `${top}px`;
        boxEl.style.width = `${width}px`;
        boxEl.style.height = `${height}px`;

        boxEl.addEventListener('click', (e) => {
          e.stopPropagation();
          showConfirmModal(text);
        });

        highlightLayer.appendChild(boxEl);
        foundCount++;
      });
    }

    if (foundCount === 0) {
      const rawText = result.data.text.trim();
      if (rawText) {
        showConfirmModal(rawText);
      }
    }
  } catch (err) {
    console.error("Errore analisi testo evidenziato:", err);
  } finally {
    loader.classList.add('hidden');
  }
}

// CHIEDI CONFERMA ED ESTRAGGI I FORMATI SPECIFICI DELLE ETICHETTE KREADOC E PANIFICIO ADRIATICO
function showConfirmModal(text) {
  let cleaned = text;
  if (activeStep === 'lot') {
    cleaned = parseLotCode(text) || text.replace(/[^a-zA-Z0-9./\- ]/g, '').trim();
    document.getElementById('confirm-modal-title').textContent = "Conferma inserimento LOTTO";
  } else {
    const parsedDate = parseExpiryDate(text);
    cleaned = parsedDate ? convertToIsoDate(parsedDate) : text;
    document.getElementById('confirm-modal-title').textContent = "Conferma inserimento SCADENZA";
  }

  pendingDetectedText = cleaned;
  document.getElementById('confirm-detected-text').textContent = cleaned;
  document.getElementById('ocr-confirm-modal').classList.remove('hidden');
}

function applyConfirmedText() {
  if (!pendingDetectedText) return;

  if (activeStep === 'lot') {
    document.getElementById('input-lot-code').value = pendingDetectedText;
    document.getElementById('btn-clear-lot').classList.remove('hidden');
    setActiveStep('exp');
  } else {
    document.getElementById('input-expiry-date').value = convertToIsoDate(pendingDetectedText);
    document.getElementById('btn-clear-expiry').classList.remove('hidden');
  }

  document.getElementById('ocr-confirm-modal').classList.add('hidden');
}

// PARSER AVANZATO PER ETICHETTE REALI (SUPPORTA / E SPAZI TIPO "L AFPM 03 139 26 G" O "GIU1526/3")
function parseLotCode(text) {
  if (!text) return "";
  let clean = text.replace(/[\r\n]+/g, ' ').trim();
  
  // 1. Cerca righe con "Lotto GIU1526/3" o "L AFPM 03 139 26 G"
  const lotPattern = /(?:lotto|lot|l\.|l\b)\s*:?\s*([a-zA-Z0-9/\.-]+(?:\s+[a-zA-Z0-9/\.-]+)*)/i;
  const match = clean.match(lotPattern);
  if (match) {
    let extracted = match[1].trim();
    // Rimuovi eventuali frammenti di data tipo 15/12/2027 presenti nella stessa riga
    extracted = extracted.replace(/scad\.?\s*\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4}/i, '').trim();
    return extracted;
  }

  // 2. Pulizia generica se è stata cliccata solo la parola del lotto
  clean = clean.replace(/^(da consumarsi entro|scad\.?|exp)\s*:?\s*\d{1,2}[/\.-]\d{1,2}[/\.-]\d{2,4}/i, '').trim();
  clean = clean.replace(/^(lotto|lot|l\.)\s*:?\s*/i, '');
  return clean.substring(0, 24);
}

// PARSER AVANZATO DATA DI SCADENZA (DA CONSUMARSI ENTRO: 18/11/2027 O SCAD. 15/12/2027)
function parseExpiryDate(text) {
  if (!text) return "";
  const fullDateRegex = /\b([0-3]?[0-9][/\.-][0-1]?[0-9][/\.-]20\d{2})\b/;
  const shortYearRegex = /\b([0-3]?[0-9][/\.-][0-1]?[0-9][/\.-]\d{2})\b/;
  const monthYearRegex = /\b([0-1]?[0-9][/\.-]20\d{2})\b/;

  let match = text.match(fullDateRegex);
  if (match) return match[1].replace(/[\.-]/g, '/');

  match = text.match(shortYearRegex);
  if (match) return match[1].replace(/[\.-]/g, '/');

  match = text.match(monthYearRegex);
  if (match) return match[1].replace(/[\.-]/g, '/');

  return "";
}

function convertToIsoDate(dateStr) {
  if (!dateStr) return "";
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split('/');
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
  if (/^\d{1,2}\/\d{4}$/.test(dateStr)) {
    const [m, y] = dateStr.split('/');
    return `${y}-${String(m).padStart(2, '0')}-01`;
  }
  return dateStr;
}

function formatIsoToItalianDisplay(isoStr) {
  if (!isoStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) {
    const [y, m, d] = isoStr.split('-');
    return `${d}/${m}/${y}`;
  }
  return isoStr;
}


// --- SINCRONIZZAZIONE CLOUD GOOGLE SHEETS VIA WEBHOOK ---
async function sendSessionToGoogleSheets(sessionData) {
  if (!googleSheetsWebhookUrl) return;

  try {
    const response = await fetch(googleSheetsWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData)
    });
    console.log("Sincronizzazione Google Sheets completata:", response.status);
  } catch (err) {
    console.error("Errore invio a Google Sheets:", err);
  }
}


// --- ESPORTAZIONE EXCEL CON IMPAGINAZIONE 1:1 ED ASTERISCO (*) PER INGREDIENTI RIUSATI ---
function exportSessionToExcel(sessionData) {
  const modelKey = sessionData.moduleKey || "pizze";
  const model = activeModels[modelKey];
  const resultsMap = sessionData.resultsMap || {};

  const lotCounts = {};
  Object.values(resultsMap).forEach(r => {
    if (r.status === 'registrato' && (r.lotCode || r.expiryDate)) {
      const key = `${r.lotCode}_${r.expiryDate}`;
      lotCounts[key] = (lotCounts[key] || 0) + 1;
    }
  });

  const rows = [];
  const merges = [];

  rows.push(["EUROSpin", "ISTRUZIONE OPERATIVE INTERNE", "", "", model.dateEmit || "Data Emissione: 2016 Rev. 02 del 15/05/2025"]);
  merges.push({ s: { r: 0, c: 1 }, e: { r: 0, c: 3 } });

  rows.push(["Modulo 1 - Istr. N. 1", model.subtitle || "Modulo tracciabilità Preparazioni", "", "", model.pageInfo || "Pagina 1 di 2"]);
  merges.push({ s: { r: 1, c: 1 }, e: { r: 1, c: 3 } });

  rows.push([]);

  rows.push([`Data: ${sessionData.date || formatDate(new Date())}`]);
  rows.push([]);

  const headerRowIndex = rows.length;
  rows.push(["Prodotto", "Ingredienti", "", "Lotto", "Scadenza"]);
  merges.push({ s: { r: headerRowIndex, c: 1 }, e: { r: headerRowIndex, c: 2 } });

  model.recipes.forEach((recipe, rIndex) => {
    const isPreparedToday = sessionData.selectedRecipes ? sessionData.selectedRecipes.includes(rIndex) : true;
    const recipeStartRow = rows.length;
    const ingCount = recipe.ingredients.length;

    recipe.ingredients.forEach((ing, iIndex) => {
      const stepKey = `${recipe.name}_${ing.name}`;
      const result = resultsMap[stepKey];

      const recipeNameCol = (iIndex === 0) ? recipe.name : "";
      let lotVal = (isPreparedToday && result) ? result.lotCode : "";
      let expVal = (isPreparedToday && result) ? result.expiryDate : "";

      if (lotVal || expVal) {
        const key = `${lotVal}_${expVal}`;
        if (lotCounts[key] > 1) {
          lotVal = lotVal ? `${lotVal}*` : "";
          expVal = expVal ? `${expVal}*` : "";
        }
      }

      rows.push([
        recipeNameCol,
        ing.name,
        "",
        lotVal,
        expVal
      ]);

      const currentRowIndex = rows.length - 1;
      merges.push({ s: { r: currentRowIndex, c: 1 }, e: { r: currentRowIndex, c: 2 } });
    });

    if (ingCount > 1) {
      const recipeEndRow = recipeStartRow + ingCount - 1;
      merges.push({ s: { r: recipeStartRow, c: 0 }, e: { r: recipeEndRow, c: 0 } });
    }
  });

  rows.push([]);
  const footerRowIndex = rows.length;
  rows.push(["Gli ingredienti con stesso lotto e scadenza utilizzati in più preparazioni sono contrassegnati con un asterisco"]);
  merges.push({ s: { r: footerRowIndex, c: 0 }, e: { r: footerRowIndex, c: 4 } });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet['!merges'] = merges;
  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 32 },
    { wch: 10 },
    { wch: 18 },
    { wch: 18 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tracciabilità 1-1");

  XLSX.writeFile(workbook, `Eurospin_${modelKey}_${(sessionData.date || formatDate(new Date())).replace(/\//g, '-')}.xlsx`);
}


// --- GESTIONE LOGO AZIENDALE PERSONALIZZATO & GOOGLE SHEETS URL ---
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


// --- EDITOR RICETTE E FORNITORI ---
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
          <input type="text" class="inp-ing-supplier" value="${ing.supplier || ''}" data-r="${rIndex}" data-i="${iIndex}" placeholder="Fornitore (opzionale)">
          <button class="btn-text-action delete btn-del-ing" data-r="${rIndex}" data-i="${iIndex}">✕</button>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="editor-recipe-header">
        <input type="text" class="inp-recipe-name" value="${recipe.name}" data-r="${rIndex}" style="font-weight:bold; font-size:14px; background:none; border:1px solid var(--glass-border); color:var(--text-primary); padding:4px 8px; border-radius:4px;">
        <button class="btn-text-action delete btn-del-recipe" data-r="${rIndex}">Elimina Piatto</button>
      </div>
      <div class="editor-ingredients-list" style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
        ${ingHTML}
      </div>
      <button class="btn btn-secondary btn-sm btn-add-ing-row" data-r="${rIndex}" style="margin-top:8px;">+ Aggiungi Ingrediente</button>
    `;

    container.appendChild(card);
  });

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
      model.recipes[r].ingredients.push({ name: "Nuovo Ingrediente" });
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
      if (supplierInp) {
        model.recipes[rIndex].ingredients[iIndex].supplier = supplierInp.value.trim();
      }
    });
  });

  saveCustomModelsDB();
}

async function saveCustomModelsDB() {
  await db.customModels.put({ key: 'models', data: activeModels });
}


// --- RENDER FOGLIO 1:1 STAMPABILE CON STRUTTURA EUROSPIN UFFICIALE & ASTERISCHI ---
function renderEurospinPaperSheet(sessionData) {
  const modelKey = sessionData.moduleKey || "pizze";
  const model = activeModels[modelKey];
  const resultsMap = sessionData.resultsMap || {};

  const lotCounts = {};
  Object.values(resultsMap).forEach(r => {
    if (r.status === 'registrato' && (r.lotCode || r.expiryDate)) {
      const key = `${r.lotCode}_${r.expiryDate}`;
      lotCounts[key] = (lotCounts[key] || 0) + 1;
    }
  });

  document.getElementById('print-date-field').textContent = sessionData.date || formatDate(new Date());
  document.getElementById('paper-subtitle').textContent = model.subtitle || "Modulo tracciabilità Preparazioni";
  document.getElementById('paper-emit-info').textContent = model.dateEmit || "Data Emissione: 2016 Rev. 02 del 15/05/2025";
  document.getElementById('paper-page-info').textContent = model.pageInfo || "Pagina 1 di 2";
  
  const logoContainer = document.getElementById('paper-logo-container');
  if (customCompanyLogo) {
    logoContainer.innerHTML = `<img src="${customCompanyLogo}" class="paper-logo-img" alt="Logo Aziendale">`;
  } else {
    logoContainer.innerHTML = `
      <div class="eurospin-logo-box">
        <span class="logo-top">EURO</span>
        <span class="logo-bottom">Spin</span>
      </div>`;
  }

  const table = document.getElementById('paper-data-table');
  table.innerHTML = '';

  const hasSuppliers = model.recipes.some(r => r.ingredients.some(i => i.supplier && i.supplier.trim() !== ""));
  
  let headerHTML = `
    <thead>
      <tr>
        <th style="width: 25%;">Prodotto</th>
        <th style="width: ${hasSuppliers ? '30%' : '45%'};">Ingredienti</th>
        ${hasSuppliers ? '<th style="width: 15%;">Fornitore</th>' : ''}
        <th style="width: 15%;">Lotto</th>
        <th style="width: 15%;">Scadenza</th>
      </tr>
    </thead>
    <tbody>
  `;

  let tbodyHTML = '';

  model.recipes.forEach((recipe, rIndex) => {
    const isPreparedToday = sessionData.selectedRecipes ? sessionData.selectedRecipes.includes(rIndex) : true;
    const ingCount = recipe.ingredients.length;

    recipe.ingredients.forEach((ing, iIndex) => {
      const stepKey = `${recipe.name}_${ing.name}`;
      const result = resultsMap[stepKey];
      
      let lotDisplay = (isPreparedToday && result) ? result.lotCode : "";
      let expDisplay = (isPreparedToday && result) ? result.expiryDate : "";

      if (lotDisplay || expDisplay) {
        const key = `${lotDisplay}_${expDisplay}`;
        if (lotCounts[key] > 1) {
          lotDisplay = lotDisplay ? `${lotDisplay}*` : "";
          expDisplay = expDisplay ? `${expDisplay}*` : "";
        }
      }

      tbodyHTML += `<tr>`;
      if (iIndex === 0) {
        tbodyHTML += `<td class="cell-recipe" rowspan="${ingCount}">${recipe.name}</td>`;
      }

      tbodyHTML += `<td class="cell-product">${ing.name}</td>`;
      if (hasSuppliers) {
        tbodyHTML += `<td class="cell-supplier">${ing.supplier || "—"}</td>`;
      }
      tbodyHTML += `
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


// --- EVENT LISTENERS GLOBALI ---
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

  document.getElementById('btn-step-lot').addEventListener('click', () => setActiveStep('lot'));
  document.getElementById('btn-step-exp').addEventListener('click', () => setActiveStep('exp'));

  document.getElementById('btn-confirm-next').addEventListener('click', () => nextWizardStep(false));
  document.getElementById('btn-skip-ingredient').addEventListener('click', () => nextWizardStep(true));
  document.getElementById('btn-prev-ingredient').addEventListener('click', prevWizardStep);
  
  document.getElementById('btn-apply-smart-reuse').addEventListener('click', applySmartReuse);
  document.getElementById('btn-abort-session').addEventListener('click', resetWizardToStart);
  document.getElementById('btn-restart-wizard').addEventListener('click', resetWizardToStart);

  document.getElementById('btn-freeze-capture').addEventListener('click', freezeCameraAndRecognize);
  document.getElementById('btn-unfreeze-camera').addEventListener('click', unfreezeCamera);
  document.getElementById('btn-file-capture').addEventListener('click', () => {
    document.getElementById('input-ocr-file').click();
  });
  document.getElementById('input-ocr-file').addEventListener('change', handleFilePhotoCapture);

  document.getElementById('btn-confirm-detected').addEventListener('click', applyConfirmedText);
  document.getElementById('btn-cancel-detected').addEventListener('click', () => {
    document.getElementById('ocr-confirm-modal').classList.add('hidden');
  });

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

  document.getElementById('btn-save-sheets-url').addEventListener('click', async () => {
    const url = document.getElementById('input-sheets-url').value.trim();
    googleSheetsWebhookUrl = url;
    await db.settings.put({ key: 'googleSheetsUrl', value: url });
    alert("URL Google Sheets salvato! Le nuove sessioni saranno inviate automaticamente al Cloud.");
  });

  setupCompanyLogoUploader();

  document.getElementById('select-editor-module').addEventListener('change', renderRecipeEditorUI);
  document.getElementById('btn-add-new-recipe').addEventListener('click', () => {
    const moduleKey = document.getElementById('select-editor-module').value;
    activeModels[moduleKey].recipes.push({
      name: "Nuova Ricetta",
      ingredients: [{ name: "Nuovo Ingrediente" }]
    });
    saveCustomModelsDB();
    renderRecipeEditorUI();
  });

  document.getElementById('btn-reset-models').addEventListener('click', async () => {
    if (confirm("Ripristinare i modelli e i dati originali Eurospin?")) {
      activeModels = JSON.parse(JSON.stringify(DEFAULT_EUROSPIN_MODELS));
      await db.customModels.delete('models');
      renderRecipeEditorUI();
      alert("Modelli predefiniti ripristinati!");
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
        <button class="btn-text-action export" data-id="${session.id}">Vedi 1:1 / PDF / Excel</button>
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
