# Rolotex – web stranica

Statična stranica bez ovisnosti. `node build.js` generira sve u `dist/`.

## Pokretanje
    npm run build      # generira dist/
    npm run dev        # build + lokalni pregled

## Vercel
Import repozitorija, postavke se čitaju iz `vercel.json` (build `node build.js`, output `dist`).
Kad se spoji domena, u Vercelu dodati varijablu `SITE_URL=https://vasa-domena.hr`
(koristi se za canonical, sitemap.xml i robots.txt) i ponovno deployati.

## Gdje se što mijenja
- `src/data.js` – podaci o obrtu, telefoni, usluge (tekstovi), kvartovi, FAQ, Google recenzije
- `src/galerija.json` – radovi prije/poslije
- `src/style.css` – izgled (boje su na vrhu: `--b` #00AAC1 teal, `--n` #111111)
- `build.js` – predlošci stranica

## Dodavanje rada prije/poslije
1. Dvije fotografije (preporuka 1200×900, JPG/WebP do ~150 KB) staviti u `public/galerija/`.
2. U `src/galerija.json` dodati zapis:

       { "naslov": "Zamjena gurtne", "lokacija": "Trešnjevka, Zagreb", "opis": "…",
         "prije": "/galerija/rad1-prije.jpg", "poslije": "/galerija/rad1-poslije.jpg" }

3. Svi radovi se prikazuju u omjeru 4:3, pa fotografije izrezati na 4:3 (npr. 1000×750). Neobavezno: `"pozicija": "50% 30%"` pomiče izrez, a `lokacija` je neobavezna.

## Google recenzije
U `src/data.js` upisati `googleRecenzijeUrl` i stvarne recenzije u `recenzije`. Dok je prazno, sekcija se ne prikazuje.

## Kontakt forma
Šalje na FormSubmit (`emailForma` u `src/data.js`). Prvi poslani upit stiže kao e-mail za aktivaciju – treba ga jednom potvrditi.

## Logo i ikone
Izvorni SVG je u `src/brand/logo-original.svg`. Web verzije su u `public/` (`logo.svg`, `favicon.svg`, `apple-touch-icon.png`, `icon-512.png`, `og.png`). Tekst „ROLOTEX" u logotipu je pretvoren u krivulje, pa nema datoteke fonta.

## Još radova (fotografije bez para)
U `src/radovi-dodatno.json` dodati `{ "slika": "/galerija/ime.webp", "opis": "…", "alt": "…" }`, a sliku (omjer 4:3, npr. 1000×750) staviti u `public/galerija/`. Prikazuje se na dnu stranice Galerija.
