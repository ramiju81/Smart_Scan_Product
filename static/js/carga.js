// static/js/carga.js
// Carga de productos desde CSV a localStorage con campos ampliados

const csvFileInput = document.getElementById("csvFile");
const btnLoadCsv = document.getElementById("btnLoadCsv");
const csvStatus = document.getElementById("csvStatus");

const STORAGE_KEY = "productos_vencimientos";

btnLoadCsv.addEventListener("click", () => {
  const file = csvFileInput.files && csvFileInput.files[0];
  if (!file) {
    csvStatus.textContent = "Por favor selecciona un archivo CSV primero.";
    csvStatus.className = "status-info error";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    cargarProductosDesdeCsv(text);
  };
  reader.onerror = () => {
    csvStatus.textContent = "Error leyendo el archivo CSV.";
    csvStatus.className = "status-info error";
  };
  reader.readAsText(file, "utf-8");
});

function cargarProductosDesdeCsv(text) {
  const lineas = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lineas.length <= 1) {
    csvStatus.textContent = "El CSV no tiene datos suficientes.";
    csvStatus.className = "status-info error";
    return;
  }

  const headers = lineas[0].split(",").map(h => h.trim().toLowerCase());

  const idxCode     = headers.indexOf("code");
  const idxName     = headers.indexOf("name");
  const idxCompany  = headers.indexOf("company");
  const idxLocation = headers.indexOf("location");
  const idxArea     = headers.indexOf("area");
  const idxLot      = headers.indexOf("lot");
  const idxMade     = headers.indexOf("made_date");
  const idxExpiry   = headers.indexOf("expiry_date");

  if ([idxCode, idxName, idxCompany, idxLocation, idxArea, idxLot, idxMade, idxExpiry].some(i => i === -1)) {
    csvStatus.textContent =
      "Encabezados inválidos. Deben ser: code,name,company,location,area,lot,made_date,expiry_date";
    csvStatus.className = "status-info error";
    return;
  }

  const productos = [];
  for (let i = 1; i < lineas.length; i++) {
    const linea = lineas[i];
    if (!linea) continue;
    const cols = linea.split(",");
    if (cols.length < headers.length) continue;

    const code = (cols[idxCode] || "").trim();
    if (!code) continue;

    productos.push({
      code,
      name:     (cols[idxName]     || "").trim(),
      company:  (cols[idxCompany]  || "").trim(),
      location: (cols[idxLocation] || "").trim(),
      area:     (cols[idxArea]     || "").trim(),
      lot:      (cols[idxLot]      || "").trim(),
      made_date:   (cols[idxMade]   || "").trim(),
      expiry_date: (cols[idxExpiry] || "").trim(),
    });
  }

  if (productos.length === 0) {
    csvStatus.textContent = "No se encontraron productos válidos en el CSV.";
    csvStatus.className = "status-info error";
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  csvStatus.textContent = `Se cargaron ${productos.length} productos. Ya puedes ir al scanner.`;
  csvStatus.className = "status-info ok";
}
