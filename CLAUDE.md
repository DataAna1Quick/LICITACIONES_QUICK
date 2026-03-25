# Nestlé Purina — Dashboard KPIs Operativos

## Resumen
Dashboard interactivo single-page (index.html) para reunión ejecutiva de logística Nestlé Purina. Muestra KPIs operativos 2025-2026 con datos editables en tiempo real. Desplegado en GitHub Pages.

## URLs
- **GitHub Pages**: https://dataana1quick.github.io/LICITACIONES_QUICK/
- **Repo**: https://github.com/DataAna1Quick/LICITACIONES_QUICK
- **Firebase Console**: https://console.firebase.google.com/project/purina-dashboard-95be6

## Arquitectura

### Stack
- HTML + CSS + JS vanilla (TODO en `index.html`, ~1400 líneas)
- Chart.js 4.4.1 + plugin datalabels
- Firebase Realtime Database (SDK compat v10.12.2 vía CDN)
- NO frameworks, NO build, NO bundler — se sirve estático

### Archivo principal: `index.html`
Estructura interna:
```
Líneas 1-342      → <head> + CSS completo (estilos, roles, home screen, modal)
Líneas 343-379    → Home screen + Password modal (HTML)
Líneas 380-395    → Nav bar (oculta hasta login)
Líneas 398-990    → 13 slides (HTML con tablas editables)
Líneas 991-1000   → Thumb nav
Líneas 1001-1090  → <script> — Roles, Chart.js config, navegación slides
Líneas 1091-1110  → Firebase config + inicialización
Líneas 1111-1190  → Persistencia: saveAllData(), loadAllData(), clearSavedData()
Líneas 1190-1500  → Funciones render por slide (renderTendencia, renderNovedades, etc.)
Líneas 1500-fin   → Router de slides, initThumbNav, indicador Firebase
```
(Las líneas son aproximadas, verificar con grep si cambian)

### 13 Slides
| # | ID tabla | Contenido |
|---|----------|-----------|
| 1 | — | Portada |
| 2 | table_tendencia | Tendencia mensual efectividad |
| 3 | table_novedades | Novedades operativas |
| 4 | table_efect_sem | Efectividad semanal S1-S12 |
| 5 | table_tiempos | Tiempos de programación |
| 6 | table_posic_mes | Posicionamiento vehicular mes |
| 7 | table_posic_sem | Posicionamiento semanal S1-S12 |
| 8 | — | Detalle posicionamiento (dinámico) |
| 9 | table_vehiculos | Cantidad vehículos S1-S12 |
| 10 | table_arqueo_mes | Arqueo mes |
| 11 | table_arqueo_sem | Arqueo semanal |
| 12 | table_rotacion | Rotación |
| 13 | — | Plan de acción (estático) |

### Sistema de Roles (Home Screen)
- **Consultor**: sin contraseña, solo lectura (`body.readonly-mode` deshabilita inputs vía CSS)
- **Editor**: contraseña `Quick_123`, acceso completo
- Home screen: `#homeScreen` (z-index 9999)
- Password modal: `#pwdModal` (z-index 10000)
- Al entrar: se oculta home, se muestra navBar + slidesWrapper + thumbNav

### Firebase Realtime Database
```javascript
// Config ya integrada en index.html
projectId: "purina-dashboard-95be6"
databaseURL: "https://purina-dashboard-95be6-default-rtdb.firebaseio.com"
```
- Ref principal: `dashboard/semana12`
- **saveAllData()**: localStorage (cache) + Firebase (debounce 800ms)
- **loadAllData()**: cache local instantáneo → Firebase como fuente de verdad → listener `on('value')` para sync en tiempo real
- **clearSavedData()**: borra ambos + reload
- Indicador: `#firebaseStatus` — verde "SYNC" / rojo "OFFLINE"
- Reglas: modo prueba (expiran ~30 días desde creación, ~abril 2026)

### Tablas editables
- 10 tablas con `<input>` editables (ver TABLE_IDS en JS)
- Cada input tiene `oninput` que llama a su función render + `saveAllData()`
- `saveAllData()` serializa todos los inputs de todas las tablas y guarda en Firebase + localStorage
- `getInputValues(tableId, rowIndex)` extrae valores numéricos de una fila

## Archivos del repo
```
index.html                          → Dashboard principal (producción)
nestle_purina_dashboard_s12.html    → Versión anterior/backup del dashboard
dashboard_lastmile_colsubsidio.jsx  → Dashboard anterior (Colsubsidio, obsoleto)
dashboard_compiled.js               → Compilado del JSX anterior (obsoleto)
Bi/LICITACIONES.pbix                → Power BI
db/BIG_DEALS.xlsx                   → Excel datos
assest/, IMG/                       → Assets e imágenes
docs/, PrimerAnalisis/              → Documentación y análisis previos
push_once.bat, watch.bat            → Scripts de deploy
.env                                → Variables de entorno (NO commitear)
```

## Convenciones
- Commits en español, prefijo `feat:`, `fix:`
- Todo el dashboard en un solo HTML (inline CSS + JS)
- Variables CSS con prefijo `--purina-` en `:root`
- Gráficas: objeto global `charts = {}`, cada render destruye y recrea
- Push directo a `main` (GitHub Pages sirve desde main)

## Comandos útiles
```bash
# Push rápido
git add index.html && git commit -m "feat: descripción" && git push origin main

# Ver estructura de datos en Firebase
# https://console.firebase.google.com/project/purina-dashboard-95be6/database/purina-dashboard-95be6-default-rtdb/data

# Buscar función render específica
grep -n "function render" index.html
```

## Notas importantes
- La contraseña del editor (`Quick_123`) está en el JS del cliente — NO es seguridad real, solo barrera visual
- Firebase en modo prueba expira; renovar reglas si deja de funcionar
- El dashboard se actualiza semanalmente (actualmente Semana 12, Marzo 2026)
- Para nueva semana: cambiar badge, ref de Firebase (`dashboard/semana13`), y actualizar datos estáticos de 2025
