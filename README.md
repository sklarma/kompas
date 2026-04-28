# Kompas - Webová aplikace

Jednoduchá webová aplikace pro zobrazení polohy a směru. Stačí pouze HTML, CSS a JavaScript!

## Funkce (splnění zadání):

1. **Textové zobrazení informací (1 bod)**
   - Souřadnice ve stupních, minutách a sekundách (DMS formát)
   - Nadmořská výška v metrech
   - Směr natočení telefonu ve stupních (0-360°)
   - Směr natočení telefonu ve světových stranách (16 směrů: N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW)

2. **Grafické zobrazení kompasu (1 bod)**
   - Kompas (SVG) s otáčející se jehlou v reálném čase
   - Červená jehla ukazuje aktuální směr

3. **Plynulé otáčení bez přetočení (1 bod)**
   - Detekce přechodu z 359° na 0° a naopak
   - Plynulé otáčení bez skoků

## Spuštění:

Jednoduše otevři `index.html` v prohlížeči (nebo spusť lokální server):

```bash
# Pomocí Python 3
python -m http.server 8000

# Pomocí Node.js (http-server)
npx http-server

# Nebo jednoduše otevři: file:///path/to/kompas/index.html
```

Aplikace běží na `http://localhost:8000`

## Na mobilním zařízení:

Aplikace potřebuje povolení pro:
- ✅ GPS (Geolocation API)
- ✅ Senzor orientace (Device Orientation Event)

## Soubory:

```
kompas/
├── index.html          # Hlavní HTML
├── style.css           # Styly
├── script.js           # JavaScript logika
└── README.md           # Tato dokumentace
```

Žádné závislosti, žádný build process!

