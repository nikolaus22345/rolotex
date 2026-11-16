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
- `src/style.css` – izgled (boje su na vrhu, `--b` plava, `--n` tamnoplava)
- `build.js` – predlošci stranica

## Dodavanje rada prije/poslije
1. Dvije fotografije (preporuka 1200×900, JPG/WebP do ~150 KB) staviti u `public/galerija/`.
2. U `src/galerija.json` dodati zapis:

       { "naslov": "Zamjena gurtne", "lokacija": "Trešnjevka, Zagreb", "opis": "…",
         "prije": "/galerija/rad1-prije.jpg", "poslije": "/galerija/rad1-poslije.jpg" }

3. Obrisati zapise s `"ilustracija": true` kad stignu prave fotografije.

## Google recenzije
U `src/data.js` upisati `googleRecenzijeUrl` i stvarne recenzije u `recenzije`. Dok je prazno, sekcija se ne prikazuje.

## Kontakt forma
Šalje na FormSubmit (`emailForma` u `src/data.js`). Prvi poslani upit stiže kao e-mail za aktivaciju – treba ga jednom potvrditi.
