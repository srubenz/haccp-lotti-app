// --- STRUTTURA DATI MODELLI UFFICIALI EUROSPIN ---
const EUROSPIN_MODELS = {
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
      // Sezione 2: Prodotti Singoli Rosticceria (1 solo ingrediente coincidenti)
      { name: "Fusi al forno", isSingle: true, ingredients: [{ name: "Fusi al forno", supplier: "A.I.A" }] },
      { name: "Alette al forno", isSingle: true, ingredients: [{ name: "Alette al forno", supplier: "A.I.A" }] },
      { name: "Arancini Ragu", isSingle: true, ingredients: [{ name: "Arancini Ragu", supplier: "Freador" }] },
      { name: "Arancini Prosc.Mozz", isSingle: true, ingredients: [{ name: "Arancini Prosc.Mozz", supplier: "Freador" }] },
      { name: "Focaccia Barese", isSingle: true, ingredients: [{ name: "Focaccia Barese", supplier: "Panifi.Adriano" }] },
      { name: "Stinco di prosciutto arrosto", isSingle: true, ingredients: [{ name: "Stinco di prosciutto arrosto", supplier: "Raspini" }] },
      { name: "Cotolette", isSingle: true, ingredients: [{ name: "Cotolette", supplier: "Amadori" }] },
      { name: "Birbe", isSingle: true, ingredients: [{ name: "Birbe", supplier: "Amadori" }] },
      { name: "Pollo Campese", isSingle: true, ingredients: [{ name: "Pollo Campese", supplier: "" }] },
      { name: "POLLO Arrosto", isSingle: true, ingredients: [{ name: "POLLO Arrosto", supplier: "" }] },
      { name: "Patate a spicchio", isSingle: true, ingredients: [{ name: "Patate a spicchio", supplier: "Agricol Fiorito" }] }
    ]
  }
};

// --- DATABASE DEXIE LOCALE ---
const db = new Dexie('EurospinHaccpDB');
db.version(1).stores({
  sessions: '++id, date, moduleKey, timestamp'
});

// --- STATO DELLA SESSIONE CORRENTE ---
let currentSession = {
  moduleKey: null,            // "pizze" o "gastronomia"
  selectedRecipes: [],        // array di indici o nomi ricette scelte
  flatSteps: [],              // lista piatta di tutti gli ingredienti da scansionare nell'ordine
  currentIndex: 0,
  startTime: null,
  timerInterval: null,
  scannedLotsMemory: {},      // Mappa { "Mozzarella cubettata": { lotCode, expiryDate } } per auto-suggerimento
  resultsMap: {}              // Mappa dei risultati per la tabella finale { "Pizza Diavola_Base pizza": { lotCode, expiryDate, status } }
};

let cameraStream = null;
let activeFacingMode = 'environment';
let ocrWorker = null;

// --- INIZIALIZZAZIONE ---
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
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

// --- TAB NAVIGATION ---
function setupNavigation() {
  const navItems = document.querySelectorAll('.app-navbar .nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      tabContents.forEach(tc => {
        tc.classList.toggle('active', tc.id === target);
      });

      if (target !== 'sec-wizard') {
        stopCamera();
      } else if (currentSession.flatSteps.length > 0 && currentSession.currentIndex < currentSession.flatSteps.length) {
        startCamera();
      }

      if (target === 'sec-history') loadHistoryList();
    });
  });
}

// --- FASE 1: SELEZIONE DEL MODULO ---
function setupModuleSelection() {
  const moduleBtns = document.querySelectorAll('.module-card-btn');
  moduleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const moduleKey = btn.getAttribute('data-module');
      startRecipeSelection(moduleKey);
    });
  });
}

// --- FASE 2: SELEZIONE RICETTE DEL GIORNO ---
function startRecipeSelection(moduleKey) {
  currentSession.moduleKey = moduleKey;
  const model = EUROSPIN_MODELS[moduleKey];

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

  // Mostra Schermata Selezione Ricette
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

  const model = EUROSPIN_MODELS[currentSession.moduleKey];
  currentSession.selectedRecipes = Array.from(checkboxes).map(c => parseInt(c.value));
  
  // Costruiamo la lista piatta dei passi
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

  // Passa alla Schermata Active Wizard
  document.getElementById('wizard-step-recipes').classList.add('hidden');
  document.getElementById('wizard-step-active').classList.remove('hidden');

  startSessionTimer();
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

// Mostra lo step corrente dell'ingrediente
function showCurrentWizardStep() {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  
  document.getElementById('current-recipe-name').textContent = step.recipeName;
  document.getElementById('current-ingredient-name').textContent = step.ingredientName;
  document.getElementById('current-supplier-name').textContent = step.supplierName || "—";
  
  document.getElementById('current-step-index').textContent = `#${currentSession.currentIndex + 1}`;
  document.getElementById('wizard-step-badge').textContent = `Passo ${currentSession.currentIndex + 1} di ${currentSession.flatSteps.length}`;
  
  const percent = ((currentSession.currentIndex) / currentSession.flatSteps.length) * 100;
  document.getElementById('wizard-progress-fill').style.width = `${percent}%`;

  // Pulizia input
  document.getElementById('input-lot-code').value = '';
  document.getElementById('input-expiry-date').value = '';
  document.getElementById('btn-clear-lot').classList.add('hidden');
  document.getElementById('btn-clear-expiry').classList.add('hidden');

  // Controllo Suggerimento Lotto Smart se l'ingrediente è già stato letto
  const existingMemory = currentSession.scannedLotsMemory[step.ingredientName];
  const smartBanner = document.getElementById('smart-reuse-banner');
  
  if (existingMemory) {
    document.getElementById('smart-reuse-text').textContent = `Lotto: ${existingMemory.lotCode || 'N/A'} - Scad: ${existingMemory.expiryDate || 'N/A'}`;
    smartBanner.classList.remove('hidden');
  } else {
    smartBanner.classList.add('hidden');
  }

  // Pulsante indietro
  document.getElementById('btn-prev-ingredient').style.visibility = (currentSession.currentIndex > 0) ? 'visible' : 'hidden';
}

// Applica il suggerimento automatico dell'ingrediente ripetuto
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

// Avanza al prossimo passo
function nextWizardStep(isSkipped) {
  const step = currentSession.flatSteps[currentSession.currentIndex];
  const lotVal = document.getElementById('input-lot-code').value.trim();
  const expiryVal = document.getElementById('input-expiry-date').value.trim();

  // Salva risultato
  const resultObj = {
    recipeName: step.recipeName,
    ingredientName: step.ingredientName,
    supplierName: step.supplierName,
    lotCode: isSkipped ? "" : lotVal,
    expiryDate: isSkipped ? "" : expiryVal,
    status: isSkipped ? "saltato" : "registrato"
  };

  currentSession.resultsMap[step.key] = resultObj;

  // Se registrato, memorizza nella memoria lotti per i suggerimenti futuri
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

// Torna allo step precedente
function prevWizardStep() {
  if (currentSession.currentIndex > 0) {
    currentSession.currentIndex--;
    showCurrentWizardStep();
  }
}

// Termina sessione e genera riepilogo
async function finishWizardSession() {
  clearInterval(currentSession.timerInterval);
  stopCamera();

  const model = EUROSPIN_MODELS[currentSession.moduleKey];

  // Salvataggio DB
  const sessionRecord = {
    date: formatDate(new Date()),
    moduleKey: currentSession.moduleKey,
    moduleTitle: model.title,
    timestamp: Date.now(),
    selectedRecipes: currentSession.selectedRecipes,
    resultsMap: currentSession.resultsMap
  };
  await db.sessions.add(sessionRecord);

  // Aggiorna Riepilogo UI
  document.getElementById('summary-module-name').textContent = model.title;
  document.getElementById('summary-recipes-count').textContent = `${currentSession.selectedRecipes.length} su ${model.recipes.length}`;
  
  const regCount = Object.values(currentSession.resultsMap).filter(r => r.status === 'registrato').length;
  document.getElementById('summary-registered-count').textContent = regCount;

  document.getElementById('wizard-step-active').classList.add('hidden');
  document.getElementById('wizard-step-summary').classList.remove('hidden');
}

// Reset Wizard
function resetWizardToStart() {
  clearInterval(currentSession.timerInterval);
  stopCamera();
  currentSession.flatSteps = [];
  
  document.getElementById('wizard-step-summary').classList.add('hidden');
  document.getElementById('wizard-step-recipes').classList.add('hidden');
  document.getElementById('wizard-step-active').classList.add('hidden');
  document.getElementById('wizard-step-module').classList.remove('hidden');
}


// --- TELECAMERA & OCR ---
async function startCamera() {
  stopCamera();
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: activeFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    document.getElementById('scanner-video').srcObject = cameraStream;
  } catch (err) {
    console.error("Errore telecamera:", err);
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
  
  if (!ocrWorker) {
    loader.classList.remove('hidden');
    ocrWorker = await Tesseract.createWorker('ita');
  }
  loader.classList.remove('hidden');

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

  // Binarizzazione per contrasto elevato
  const imgData = ctx.getImageData(0, 0, cropWidth, cropHeight);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const b = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    const v = (b > 120) ? 255 : 0;
    data[i] = v; data[i + 1] = v; data[i + 2] = v;
  }
  ctx.putImageData(imgData, 0, 0);

  const dataUrl = cropCanvas.toDataURL('image/jpeg', 0.9);

  try {
    const result = await ocrWorker.recognize(dataUrl);
    const cleaned = cleanOcrOutput(result.data.text);
    
    if (cleaned !== "") {
      // Se non c'è lotto la mettiamo nel lotto, altrimenti nella scadenza
      const inputLot = document.getElementById('input-lot-code');
      const inputExp = document.getElementById('input-expiry-date');
      
      if (inputLot.value.trim() === '') {
        inputLot.value = cleaned;
        document.getElementById('btn-clear-lot').classList.remove('hidden');
      } else {
        inputExp.value = cleaned;
        document.getElementById('btn-clear-expiry').classList.remove('hidden');
      }
    }
  } catch (err) {
    console.error("Errore OCR:", err);
  } finally {
    loader.classList.add('hidden');
  }
}

function cleanOcrOutput(text) {
  if (!text) return "";
  let c = text.replace(/[\r\n]+/g, ' ').trim();
  c = c.replace(/^(lotto|lot|l\.|scadenza|scad)\s*:?\s*/i, '');
  return c.substring(0, 18).trim();
}


// --- RENDER FOGLIO 1:1 STAMPABILE EUROSPIN (PDF & PRINT) ---
function renderEurospinPaperSheet(sessionData) {
  const modelKey = sessionData.moduleKey || "pizze";
  const model = EUROSPIN_MODELS[modelKey];
  const resultsMap = sessionData.resultsMap || {};

  document.getElementById('print-date-field').textContent = sessionData.date || formatDate(new Date());
  
  const table = document.getElementById('paper-data-table');
  table.innerHTML = '';

  // Determina la struttura delle intestazioni di colonna
  const isGastro = (modelKey === 'gastronomia');
  
  let headerHTML = `
    <thead>
      <tr>
        <th style="width: 25%;">${isGastro ? "Prodotto / Ricetta" : "Prodotto (Ricetta)"}</th>
        <th style="width: 25%;">${isGastro ? "Ingrediente" : "Ingrediente"}</th>
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
      
      // La prima colonna (Nome Ricetta/Prodotto) usa rowspan per unire le celle del gruppo
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

// Apri modale di anteprima di stampa 1:1
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


// --- ESPORTAZIONE EXCEL FORMATTATA SHEETJS (.XLSX) ---
function exportSessionToExcel(sessionData) {
  const modelKey = sessionData.moduleKey || "pizze";
  const model = EUROSPIN_MODELS[modelKey];
  const resultsMap = sessionData.resultsMap || {};

  const rows = [];
  rows.push(["ISTRUZIONE OPERATIVE INTERNE", "", "", "Data Emissione: 2016 Rev.01 del 18/10/2016"]);
  rows.push([model.subtitle, "", "", "Pagina 1 di 1"]);
  rows.push([`Data: ${sessionData.date || formatDate(new Date())}`]);
  rows.push([]); // riga vuota

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


// --- GESTIONE EVENTI GLOBALI ---
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

  // Inputs clear buttons
  setupInputClear('input-lot-code', 'btn-clear-lot');
  setupInputClear('input-expiry-date', 'btn-clear-expiry');

  document.getElementById('btn-clear-all').addEventListener('click', async () => {
    if (confirm("Cancellare lo storico registrazioni?")) {
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

// --- STORICO COMPILAZIONI ---
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
