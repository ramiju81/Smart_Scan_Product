
# Control de vencimientos (versión base)

Este proyecto permite:

- Cargar productos desde un archivo CSV en el navegador (usando `localStorage` como BD embebida).
- Consultar productos por código de barras / QR desde `index.html` (scanner).
- Más adelante: mostrar popups con información del producto y alertas automáticas cada 10 minutos.

## Estructura

- `index.html`: pantalla principal de scanner (GitHub Pages usa este como entrada).
- `carga.html`: pantalla para cargar el CSV.
- `productos_ejemplo.csv`: plantilla de ejemplo.
- `static/js/carga.js`: lógica de carga de productos (completa).
- `static/js/scanner.js`: **placeholder**. Debe reemplazarse por la versión completa del scanner.
- `static/css/styles.css`: **placeholder**. Debe reemplazarse por la hoja de estilos final.

## Uso rápido

1. Abrir `carga.html` en el navegador y cargar un CSV con columnas:
   `code,name,lot,made_date,expiry_date`.

2. Abrir `index.html` y usar el input o la cámara (cuando el `scanner.js` completo esté cargado).

Cuando tengas los archivos definitivos `scanner.js` y `styles.css`, simplemente
reemplázalos en `static/js/` y `static/css/` con el mismo nombre.
