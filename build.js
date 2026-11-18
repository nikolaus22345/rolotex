// Rolotex – generator statične stranice. Bez ovisnosti: `node build.js` -> ./dist
const fs = require('fs');
const path = require('path');
const { firma, gradovi, usluge, kategorije, tipovi, lokacije, faqOpci } = require('./src/data');
const galerija = require('./src/galerija.json');

const SITE = (process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL)
  || (process.env.VERCEL_URL && 'https://' + process.env.VERCEL_URL)
  || 'https://rolotex.vercel.app').replace(/\/$/, '');
const OUT = path.join(__dirname, 'dist');
const css = fs.readFileSync(path.join(__dirname, 'src/style.css'), 'utf8').replace(/\n/g, '');
const pages = [];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const G = Object.values(gradovi);
const U = Object.fromEntries(usluge.map((u) => [u.slug, u]));

/* ---------- ikone ---------- */
const I = {
  tel: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 01-3.33-2.9c-.25-.44.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.61.47-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z"/></svg>',
  ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  servis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.5 6.5a4 4 0 00-5.3 5.3L3 18l3 3 6.2-6.2a4 4 0 005.3-5.3L15 12l-3-3z"/></svg>',
  nove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 7h16M4 10.5h16M4 14h16"/></svg>',
  komarnici: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 3v18M15 3v18M4 9h16M4 15h16" stroke-width="1.2"/></svg>',
  sjenila: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 4h18M5 4v16M9 4v16M13 4v16M17 4v12"/></svg>',
};
const LOGO = '<img src="/logo.svg" alt="Rolotex" width="149" height="72" decoding="async">';

/* ---------- pomoćne ---------- */
const telHref = (g) => `tel:${g.telIntl}`;
const waHref = (g, txt) => `https://wa.me/${g.telIntl.slice(1)}?text=${encodeURIComponent(txt || 'Pozdrav, trebam ponudu za rolete / komarnike.')}`;
const fill = (s, g) => s.replace(/\{u\}/g, g ? g.u : 'u Zagrebu i Karlovcu');
const callBtns = (g, cls = 'bw') => (g ? [g] : G).map((x) => `<a class="btn ${cls}" href="${telHref(x)}">${I.tel}${g ? 'Nazovi ' + x.tel : x.ime + ': ' + x.tel}</a>`).join('');
const waBtn = (g) => g
  ? `<a class="btn bg" href="${waHref(g)}" rel="noopener">${I.wa}WhatsApp</a>`
  : G.map((x) => `<a class="btn bg" href="${waHref(x)}" rel="noopener">${I.wa}WhatsApp ${x.ime}</a>`).join('');

function faqBlock(faq, naslov = 'Česta pitanja') {
  return `<section class="s alt"><div class="c" style="max-width:860px"><span class="k">Pitanja i odgovori</span><h2>${naslov}</h2><div class="faq">${faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>`;
}
const faqLd = (faq) => ({ '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

function forma(g, usluga) {
  const opt = usluge.map((u) => `<option${usluga === u.ime ? ' selected' : ''}>${esc(u.ime)}</option>`).join('');
  return `<form class="form" id="upit" action="https://formsubmit.co/${firma.emailForma}" method="POST">
<h3 style="font-size:1.35rem">Pošaljite upit</h3><p style="color:var(--m);margin-bottom:16px">Opišite kvar ili što trebate, javljamo se s ponudom.</p>
<input type="hidden" name="_subject" value="Novi upit s weba – Rolotex"><input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false">
<input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
<div class="row"><div><label for="f-ime">Ime i prezime</label><input id="f-ime" name="Ime" required autocomplete="name"></div>
<div><label for="f-tel">Telefon</label><input id="f-tel" name="Telefon" type="tel" required autocomplete="tel" inputmode="tel"></div></div>
<div class="row"><div><label for="f-grad">Grad</label><select id="f-grad" name="Grad">${G.map((x) => `<option${g && g.slug === x.slug ? ' selected' : ''}>${x.ime}</option>`).join('')}</select></div>
<div><label for="f-usl">Usluga</label><select id="f-usl" name="Usluga"><option value="">Nisam siguran/na</option>${opt}</select></div></div>
<label for="f-kv">Kvart / adresa</label><input id="f-kv" name="Kvart" autocomplete="street-address">
<label for="f-por">Poruka</label><textarea id="f-por" name="Poruka" rows="4" required placeholder="Npr. pukla gurtna na dvije rolete, balkonska vrata i prozor."></textarea>
<button class="btn bp" type="submit">Pošalji upit</button>
<div id="upit-msg" role="status" style="margin-top:12px"></div>
<small>Slanjem upita pristajete da Vas kontaktiramo radi ponude. <a href="/privatnost/">Pravila privatnosti</a>. Fotografiju kvara najlakše je poslati preko WhatsAppa.</small></form>`;
}

function kontaktSekcija(g, usluga) {
  const red = (x) => `<p style="margin:0 0 14px"><b style="color:#fff">${x.ime}</b><br><a href="${telHref(x)}" style="color:#fff;font-size:1.35rem;font-weight:800">${x.tel}</a><br><span style="font-size:.92rem">Izlazak: ${x.izlazak}.</span></p>`;
  return `<section class="s dark" id="kontakt"><div class="c split eq"><div>
<span class="k">Kontakt</span><h2>Zatražite ponudu${g ? ' ' + g.u : ''}</h2>
<p>Nazovite, pošaljite poruku na WhatsApp ili ispunite formu. Uz fotografiju rolete i kutije možemo unaprijed reći o čemu je riječ.</p>
${(g ? [g] : G).map(red).join('')}
<p><a href="mailto:${firma.email}" style="color:#fff">${firma.email}</a><br><span style="font-size:.92rem">Nedjeljom i blagdanom ne radimo. Vikendom po potrebi i dogovoru.</span></p>
<div class="btns">${waBtn(g)}</div></div><div>${forma(g, usluga)}</div></div></section>`;
}


function baItem(x) {
  const w = x.w || 1000, h = x.h || 750, pos = x.pozicija ? ` style="object-position:${esc(x.pozicija)}"` : '';
  return `<div><div class="ba"><img src="${x.poslije}" alt="${esc(x.altPoslije || 'Poslije: ' + x.naslov)}" loading="lazy" decoding="async" width="${w}" height="${h}"${pos}><img class="a" src="${x.prije}" alt="${esc(x.altPrije || 'Prije: ' + x.naslov)}" loading="lazy" decoding="async" width="${w}" height="${h}"${pos}><span class="l1">Prije</span><span class="l2">Poslije</span><input type="range" min="0" max="100" value="50" aria-label="Usporedba prije i poslije – ${esc(x.naslov)}" oninput="this.parentNode.style.setProperty('--p',this.value+'%')"></div>
<div class="bat"><h3>${esc(x.naslov)}${x.ilustracija ? '<em>ilustracija</em>' : ''}</h3><p>${[x.lokacija, x.opis].filter(Boolean).map(esc).join(' · ')}</p></div></div>`;
}
const galerijaSekcija = (n) => `<section class="s"><div class="c"><span class="k">Radovi</span><h2>Prije i poslije</h2><p class="lead">Povucite klizač lijevo-desno i usporedite stanje prije i poslije našeg dolaska.</p><div class="g g3" style="margin-top:26px">${galerija.slice(0, n || 99).map(baItem).join('')}</div>${n ? '<p style="margin-top:22px"><a class="btn bw" href="/galerija/">Svi radovi</a></p>' : ''}</div></section>`;

const dodatno = require('./src/radovi-dodatno.json');
const dodatnoSekcija = () => dodatno.length ? `<section class="s alt"><div class="c"><span class="k">Još radova</span><h2>Još naših radova</h2><div class="g g3" style="margin-top:26px">${dodatno.map((x) => `<figure class="ph"><img src="${x.slika}" alt="${esc(x.alt)}" loading="lazy" decoding="async" width="1000" height="750"><figcaption>${esc(x.opis)}</figcaption></figure>`).join('')}</div></div></section>` : '';

function recenzije() {
  if (!firma.recenzije.length && !firma.googleRecenzijeUrl) return '';
  const kart = firma.recenzije.map((r) => `<div class="card"><div class="stars" aria-label="Ocjena ${r.ocjena} od 5">${'★'.repeat(r.ocjena)}</div><p style="color:var(--t);margin:8px 0">${esc(r.tekst)}</p><b>${esc(r.ime)}</b></div>`).join('');
  return `<section class="s alt"><div class="c"><span class="k">Google recenzije</span><h2>Što kažu kupci</h2><div class="g g3">${kart}</div>${firma.googleRecenzijeUrl ? `<p style="margin-top:22px"><a class="btn bw" href="${firma.googleRecenzijeUrl}" rel="noopener">Ostavite recenziju na Googleu</a></p>` : ''}</div></section>`;
}

const HERO_ART = `<div class="art"><svg viewBox="0 0 360 380" role="img" aria-label="Ilustracija prozora s roletom"><rect x="30" y="20" width="300" height="340" rx="14" fill="#fff" opacity=".05"/><rect x="60" y="48" width="240" height="34" rx="6" fill="#00AAC1"/><rect x="66" y="82" width="228" height="250" fill="#0b1f22" stroke="#1d6772" stroke-width="3"/><path d="M180 82v250M66 240h228" stroke="#1d6772" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => `<rect x="66" y="${84 + i * 17}" width="228" height="14" rx="2" fill="#e4f6f9" opacity="${1 - i * 0.045}"/>`).join('')}<rect x="66" y="237" width="228" height="8" rx="2" fill="#00AAC1"/><rect x="312" y="90" width="7" height="170" rx="3" fill="#66d3e1"/><rect x="306" y="258" width="19" height="46" rx="5" fill="#00AAC1"/></svg></div>`;

/* ---------- layout ---------- */
function nav() {
  const kol = Object.entries(kategorije).map(([k, ime]) => `<div><b>${ime}</b>${usluge.filter((u) => u.kat === k && !['popravak-roleta', 'komarnici'].includes(u.slug)).map((u) => `<a href="/usluge/${u.slug}/">${u.ime}</a>`).join('')}</div>`).join('');
  return `<nav class="nav" id="nav" aria-label="Glavna navigacija"><details class="dd"><summary>Usluge</summary><div>${kol}</div></details><a href="/zagreb/">Zagreb</a><a href="/karlovac/">Karlovac</a><a href="/galerija/">Galerija</a><a href="/cijene/">Cijene</a><a href="/kontakt/">Kontakt</a></nav>`;
}

function footer(g) {
  const L = (h, t) => `<li><a href="${h}">${t}</a></li>`;
  const top = usluge.filter((u) => u.top);
  return `<footer class="ft"><div class="c">
<div class="ftc"><div><h2>Roleta ne radi kako treba?</h2><p>Servis i ugradnja roleta, komarnika, žaluzina i zavjesa u Zagrebu i Karlovcu. Javite se, odgovaramo brzo.</p></div>
<div class="btns"><a class="btn bp" href="#upit">Ispuni formu</a>${(g ? [g] : G).map((x) => `<a class="btn bo" href="${telHref(x)}">${I.tel}${g ? 'Nazovite' : x.ime}</a>`).join('')}${g ? `<a class="btn bg" href="${waHref(g)}" rel="noopener">${I.wa}WhatsApp</a>` : ''}</div></div>
<div class="ftg">
<div class="fb"><img src="/logo.svg" alt="${firma.naziv}" width="173" height="84" loading="lazy" decoding="async"><p>Servis i ugradnja roleta, komarnika, žaluzina i zavjesa u Zagrebu i Karlovcu.</p></div>
<div><h3>Usluge</h3><ul>${top.map((u) => L(`/usluge/${u.slug}/`, u.ime)).join('')}${L('/usluge/', 'Sve usluge')}</ul></div>
<div><h3>Lokacije</h3><ul>${L('/zagreb/', 'Rolete Zagreb')}${L('/karlovac/', 'Rolete Karlovac')}${['tresnjevka', 'dubrava', 'siget', 'sesvete', 'dugo-selo'].map((s) => { const l = lokacije.find((x) => x.slug === s); return L(`/zagreb/${s}/`, l.ime); }).join('')}${L('/lokacije/', 'Sve lokacije')}</ul></div>
<div><h3>Informacije</h3><ul>${L('/galerija/', 'Radovi prije i poslije')}${L('/cijene/', 'Cijene')}${L('/cesta-pitanja/', 'Česta pitanja')}${L('/o-nama/', 'O nama')}${L('/impressum/', 'Podaci o obrtu')}${L('/privatnost/', 'Pravila privatnosti')}</ul></div>
<div><h3>Kontakt</h3><ul>${G.map((x) => `<li>${x.ime}: <a href="${telHref(x)}"><b>${x.tel}</b></a></li>`).join('')}<li><a href="mailto:${firma.email}">${firma.email}</a></li>${L('/kontakt/', 'Pošalji upit')}<li>${firma.sjediste}</li></ul></div>
</div>
<div class="ftb"><span>© ${new Date().getFullYear()} ${firma.naziv} · ${firma.puniNaziv}, vl. ${firma.vlasnik} · OIB ${firma.oib}</span><span>Servis roleta Zagreb i Karlovac</span></div>
</div></footer>`;
}

function fab(g) {
  if (g) return `<div class="fab"><a href="${waHref(g)}" rel="noopener" aria-label="WhatsApp ${g.ime}">${I.wa}</a></div>`;
  return `<details class="fab"><summary aria-label="WhatsApp">${I.wa}</summary><div>${G.map((x) => `<a href="${waHref(x)}" rel="noopener">WhatsApp ${x.ime}<small>${x.tel}</small></a>`).join('')}</div></details>`;
}

const JS = `(function(){try{history.scrollRestoration='manual'}catch(e){}if(!location.hash)window.scrollTo({top:0,left:0,behavior:'instant'});var b=document.getElementById('mb'),n=document.getElementById('nav');b&&b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.addEventListener('click',function(e){document.querySelectorAll('details.dd[open],details.fab[open]').forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open')})});
var f=document.getElementById('upit');if(f&&window.fetch){f.addEventListener('submit',function(e){e.preventDefault();var m=document.getElementById('upit-msg'),s=f.querySelector('button');if(f._honey.value)return;s.disabled=true;s.textContent='Šaljem…';
var d={};new FormData(f).forEach(function(v,k){d[k]=v});d.Stranica=location.href;
fetch(f.action.replace('formsubmit.co/','formsubmit.co/ajax/'),{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(){f.reset();m.innerHTML='<div class="ok">Hvala! Upit je poslan, javit ćemo Vam se uskoro.</div>'}).catch(function(){m.innerHTML='<div class="err">Slanje nije uspjelo. Molimo nazovite nas ili pošaljite poruku na WhatsApp.</div>'}).then(function(){s.disabled=false;s.textContent='Pošalji upit'})})}})();`;

const fit = (...o) => o.find((x) => x.length <= 60) || o[o.length - 1];
const cutDesc = (d) => {
  if (d.length <= 158) return d;
  const sent = d.split(/(?<=\.)\s+/); let r = '';
  for (const x of sent) { if ((r + ' ' + x).trim().length > 158) break; r = (r + ' ' + x).trim(); }
  return r.length >= 90 ? r : d.slice(0, 157).replace(/\s+\S*$/, '') + '.';
};
function page({ url, title, desc, body, g, ld = [], crumbs = [], noindex }) {
  title = title.toUpperCase(); desc = cutDesc(desc);
  const biz = {
    '@type': 'HomeAndConstructionBusiness', '@id': SITE + '/#firma', name: firma.naziv, url: SITE + '/',
    logo: SITE + '/icon-512.png', image: SITE + '/og.png', email: firma.email,
    telephone: (g || gradovi.zagreb).telIntl,
    address: { '@type': 'PostalAddress', addressLocality: 'Zagreb', postalCode: '10000', addressCountry: 'HR' },
    areaServed: G.map((x) => ({ '@type': 'City', name: x.ime })),
    contactPoint: G.map((x) => ({ '@type': 'ContactPoint', telephone: x.telIntl, contactType: 'customer service', areaServed: x.ime, availableLanguage: 'hr' })),
  };
  const graph = [biz, ...ld];
  if (crumbs.length) graph.push({ '@type': 'BreadcrumbList', itemListElement: [['Početna', '/'], ...crumbs].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) });
  const tel = (g ? [g] : G).map((x) => `<a href="${telHref(x)}" aria-label="Nazovi ${x.ime} ${x.tel}">${I.tel}${g ? '' : `<i>${x.slug === 'zagreb' ? 'ZG' : 'KA'}</i>`}<b>${x.tel}</b>${g ? '<i class="mo">Nazovi</i>' : ''}</a>`).join('');
  const html = `<!doctype html><html lang="hr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${url}">${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website"><meta property="og:locale" content="hr_HR"><meta property="og:site_name" content="${firma.naziv}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${SITE}${url}"><meta property="og:image" content="${SITE}/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#111111"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<style>${css}.tel .mo{display:none}@media(max-width:1100px){.tel{margin-left:auto}.mb{margin-left:0}.tel .mo{display:inline;opacity:1}}</style>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script></head><body>
<header class="hd"><div class="c"><a class="logo" href="/" aria-label="${firma.naziv} – početna">${LOGO}</a>${nav()}<div class="tel">${tel}</div><button class="mb" id="mb" aria-label="Izbornik" aria-controls="nav" aria-expanded="false"><span></span><span></span><span></span></button></div></header>
<main>${body}</main>${footer(g)}${fab(g)}<script>${JS}</script></body></html>`;
  pages.push({ url, html, noindex });
}

function hero({ k, h1, p, g, crumbs = [], bullets, art }) {
  const bc = crumbs.length ? `<nav class="bc" aria-label="Putanja"><a href="/">Početna</a>${crumbs.map(([n, u], i) => i === crumbs.length - 1 ? ` › ${n}` : ` › <a href="${u}">${n}</a>`).join('')}</nav>` : '';
  const bl = bullets || [g ? `Izlazak ${g.u}: ${g.izlazak}` : 'Zagreb: izlazak najčešće unutar 24 do 48 sati', 'Rolete svih proizvođača, PVC i aluminijske', 'Procjena na licu mjesta: popravak ili nova roleta'];
  return `<section class="hero"><div class="c"><div>${bc}<span class="k">${k}</span><h1>${h1}</h1><p>${p}</p>
<div class="btns"><a class="btn bp" href="#upit">Pošalji upit</a>${callBtns(g, 'bo')}${g ? waBtn(g) : ''}</div>
<ul>${bl.map((b) => `<li>${I.ok}<span>${b}</span></li>`).join('')}</ul></div>${art === false ? '' : HERO_ART}</div></section>`;
}

const uslugeKartice = (g, lista = usluge) => `<div class="g g3">${lista.map((u) => `<a class="card" href="${g ? `/${g.slug}/${u.slug}/` : `/usluge/${u.slug}/`}"><div class="ic">${I[u.kat]}</div><h3>${u.ime}${g ? ' ' + g.ime : ''}</h3><p>${u.kratko}</p><span class="more">Više o usluzi →</span></a>`).join('')}</div>`;
const lokTags = (lista) => `<ul class="tags">${lista.map((l) => `<li><a href="/${l.grad}/${l.slug}/">${l.ime}</a></li>`).join('')}</ul>`;
const poSkupinama = (g) => [...new Set(lokacije.filter((l) => l.grad === g.slug).map((l) => l.skupina))].map((s) => `<h3 style="margin-top:22px">${s}</h3>${lokTags(lokacije.filter((l) => l.grad === g.slug && l.skupina === s))}`).join('');

const PREDNOSTI = [
  ['Kažemo što je potrgano', 'Otvorimo kutiju, pokažemo kvar i objasnimo što se mijenja. Ako se popravak ne isplati, čujete to prije nego što išta platite.'],
  ['Javite se kako Vam je lakše', 'Telefon, WhatsApp ili forma. Fotografija kvara preko WhatsAppa često je dovoljna za okvirnu procjenu.'],
  ['Zna se gdje i kada dolazimo', 'Zagreb sa svim kvartovima i grad Karlovac, s jasnim rokovima izlaska za svaki grad.'],
  ['Popravak prije zamjene', 'Većina roleta se da popraviti. Novu roletu predlažemo tek kad je stara stvarno gotova.'],
];
const prednosti = () => `<section class="s"><div class="c"><span class="k">Zašto ${firma.naziv}</span><h2>Bez nagađanja i bez nepotrebnih troškova</h2><div class="g g4" style="margin-top:24px">${PREDNOSTI.map(([a, b]) => `<div class="card"><h3>${a}</h3><p>${b}</p></div>`).join('')}</div></div></section>`;
const postupak = () => `<section class="s alt"><div class="c"><span class="k">Kako radimo</span><h2>Od poziva do rolete koja radi</h2><div class="g g4 steps" style="margin-top:24px">${[
  ['Poziv ili upit', 'Opišete kvar ili što trebate. Pošaljite fotografiju ako možete.'],
  ['Dogovor termina', 'Javimo okvirnu procjenu i dogovorimo dolazak.'],
  ['Pregled i popravak', 'Na licu mjesta potvrdimo kvar i cijenu pa odradimo posao.'],
  ['Provjera', 'Zajedno provjerimo da roleta ide do kraja gore i dolje.'],
].map(([a, b]) => `<div class="card"><h3>${a}</h3><p>${b}</p></div>`).join('')}</div></div></section>`;

/* ================= STRANICE ================= */

// Početna
page({
  url: '/', title: 'Servis roleta Zagreb i Karlovac – popravak | Rolotex',
  desc: 'Servis i popravak roleta u Zagrebu i Karlovcu: zamjena gurtne od 30 €, automati, lamele, motori. Ugradnja novih roleta i komarnika. Pošaljite upit ili nazovite.',
  ld: [faqLd(faqOpci.slice(0, 6))],
  body: hero({ k: 'Servis i ugradnja roleta · Zagreb i Karlovac', h1: 'Servis roleta Zagreb i Karlovac', p: 'Servis roleta, zamjena gurtni i automata, nove rolete, komarnici, žaluzine i zavjese.', bullets: ['Zagreb: izlazak najčešće unutar 24 do 48 sati', 'Karlovac: po dogovoru, najčešće četvrtkom ili petkom', 'Zamjena gurtne 30 – 40 €, ostalo na upit'] })
    + `<section class="s"><div class="c"><span class="k">Odaberite grad</span><h2>Rolete Zagreb i rolete Karlovac</h2><div class="g g2" style="margin-top:22px">${G.map((x) => `<div class="city"><h3>${x.ime}</h3><p>${x.podrucje[0].toUpperCase() + x.podrucje.slice(1)}.<br>Izlazak: ${x.izlazak}.</p><div class="btns"><a class="btn bp" href="/${x.slug}/">Rolete ${x.ime}</a><a class="btn bo" href="${telHref(x)}">${I.tel}${x.tel}</a></div></div>`).join('')}</div></div></section>`
    + `<section class="s alt"><div class="c"><span class="k">Usluge</span><h2>Najtraženije usluge</h2><p class="lead">Servis roleta je naš glavni posao. Uz to ugrađujemo nove rolete i komarnike te zatvaramo balkone i lođe roletama.</p><div style="margin-top:26px">${uslugeKartice(null, usluge.filter((u) => u.top))}</div><p style="margin-top:22px"><a class="btn bw" href="/usluge/">Sve usluge (${usluge.length})</a></p></div></section>`
    + galerijaSekcija(3) + postupak() + recenzije()
    + `<section class="s"><div class="c"><span class="k">Područje rada</span><h2>Kvartovi i mjesta koja pokrivamo</h2>${G.map((x) => `<h3 style="margin-top:22px"><a href="/${x.slug}/">${x.ime}</a></h3>${lokTags(lokacije.filter((l) => l.grad === x.slug).slice(0, x.slug === 'zagreb' ? 24 : 12))}`).join('')}<p style="margin-top:22px"><a class="btn bw" href="/lokacije/">Sve lokacije</a></p></div></section>`
    + faqBlock(faqOpci.slice(0, 6)) + kontaktSekcija(),
});

// Usluge – pregled
page({
  url: '/usluge/', title: 'Usluge – rolete, komarnici, žaluzine | Rolotex',
  desc: 'Sve usluge Rolotexa u Zagrebu i Karlovcu: servis i popravak roleta, nove PVC i aluminijske rolete, komarnici, venecijaneri, trakaste zavjese i rolo platna.',
  crumbs: [['Usluge', '/usluge/']],
  body: hero({ k: 'Usluge', h1: 'Usluge: rolete, komarnici, žaluzine i zavjese', p: 'Servis i montaža roleta, rolo platna, trakastih zavjesa i žaluzina, ugradnja komarnika i venecijanera te zatvaranje lođa i balkona roletama.', crumbs: [['Usluge', '/usluge/']], art: false })
    + Object.entries(kategorije).map(([k, ime], i) => `<section class="s${i % 2 ? ' alt' : ''}"><div class="c"><h2>${ime}</h2><div style="margin-top:22px">${uslugeKartice(null, usluge.filter((u) => u.kat === k))}</div></div></section>`).join('')
    + kontaktSekcija(),
});

// Usluga (opća + po gradu)
function uslugaPage(u, g) {
  const url = g ? `/${g.slug}/${u.slug}/` : `/usluge/${u.slug}/`;
  const h1 = g ? `${u.ime} ${g.ime}` : u.ime;
  const crumbs = g ? [[g.ime, `/${g.slug}/`], [u.ime, url]] : [['Usluge', '/usluge/'], [u.ime, url]];
  const faq = [...u.faq, ...(g ? [[`Koliko brzo dolazite ${g.u}?`, `Izlazak ${g.u}: ${g.izlazak}.`], [`Koje dijelove ${g.gen} pokrivate?`, `${g.podrucje[0].toUpperCase() + g.podrucje.slice(1)}.`]] : [faqOpci[1], faqOpci[7]])];
  const srodne = usluge.filter((x) => x.kat === u.kat && x.slug !== u.slug).slice(0, 6);
  const loks = g ? lokacije.filter((l) => l.grad === g.slug) : [];
  page({
    url, g, crumbs,
    title: g ? fit(`${u.ime} ${g.ime} – ${firma.naziv} | ${g.tel}`, `${u.ime} ${g.ime} | ${firma.naziv}`, `${u.ime} ${g.ime}`) : fit(`${u.ime} – Zagreb i Karlovac | ${firma.naziv}`, `${u.ime} | ${firma.naziv}`),
    desc: `${u.ime}${g ? ' ' + g.u : ' u Zagrebu i Karlovcu'}. ${u.kratko} ${g ? 'Nazovite ' + g.tel + ' ili pošaljite upit.' : 'Pošaljite upit ili nazovite.'}`,
    ld: [faqLd(faq), { '@type': 'Service', name: h1, serviceType: u.ime, provider: { '@id': SITE + '/#firma' }, areaServed: (g ? [g] : G).map((x) => ({ '@type': 'City', name: x.ime })), description: u.kratko }],
    body: hero({ k: `${kategorije[u.kat]}${g ? ' · ' + g.ime : ''}`, h1, p: u.kratko, g, crumbs })
      + `<section class="s"><div class="c split"><div><h2>${u.ime}${g ? ' ' + g.u : ''}: što radimo</h2>${u.uvod.map((p) => `<p>${fill(p, g)}</p>`).join('')}
<h3 style="margin-top:26px">Što je uključeno</h3><ul class="chk">${u.stavke.map((s) => `<li>${s}</li>`).join('')}</ul>
${g ? `<h3 style="margin-top:26px">Dolazak ${g.u}</h3><p>Pokrivamo: ${g.podrucje}. Izlazak na teren: ${g.izlazak}.</p>` : `<h3 style="margin-top:26px">Odaberite grad</h3><div class="btns">${G.map((x) => `<a class="btn bw" href="/${x.slug}/${u.slug}/">${u.ime} ${x.ime}</a>`).join('')}</div>`}
</div><aside class="box"><h3>Cijena</h3><p>${u.slug === 'zamjena-gurtne' ? '<b>30 – 40 €</b> za zamjenu gurtne.' : 'Na upit. Ovisi o tipu rolete, dimenzijama i dijelovima; točnu cijenu kažemo prije početka rada.'}</p><h3>Brzi kontakt</h3><div class="btns">${callBtns(g, 'bp')}${waBtn(g)}</div><p style="margin:14px 0 0;font-size:.9rem;color:var(--m)">Pošaljite fotografiju rolete i kutije na WhatsApp za bržu procjenu.</p></aside></div></section>`
      + (g ? `<section class="s alt"><div class="c"><h2>${u.ime} po kvartovima – ${g.ime}</h2>${poSkupinama(g)}</div></section>` : '')
      + `<section class="s${g ? '' : ' alt'}"><div class="c"><h2>Povezane usluge</h2><div style="margin-top:20px">${uslugeKartice(g, srodne.length ? srodne : usluge.filter((x) => x.top && x.slug !== u.slug))}</div></div></section>`
      + faqBlock(faq, `${h1}: česta pitanja`) + kontaktSekcija(g, u.ime),
  });
}
usluge.forEach((u) => { uslugaPage(u); G.forEach((g) => uslugaPage(u, g)); });

// Grad
G.forEach((g) => {
  const url = `/${g.slug}/`;
  const faq = [[`Koliko brzo dolazite ${g.u}?`, `Izlazak ${g.u}: ${g.izlazak}.`], faqOpci[0], [`Koje dijelove ${g.gen} pokrivate?`, `${g.podrucje[0].toUpperCase() + g.podrucje.slice(1)}.`], faqOpci[2], faqOpci[3], faqOpci[6]];
  page({
    url, g, crumbs: [[g.ime, url]],
    title: `Rolete ${g.ime} – servis i ugradnja | ${firma.naziv}`,
    desc: `Servis i popravak roleta ${g.u}, zamjena gurtne, nove rolete i komarnici. Izlazak ${g.izlazak}. Nazovite ${g.tel}.`,
    ld: [faqLd(faq)],
    body: hero({ k: `Rolete · ${g.ime}`, h1: `Servis i popravak roleta ${g.ime}`, p: `Popravak i ugradnja roleta, komarnika, žaluzina i zavjesa ${g.u}. Radimo u stanovima i obiteljskim kućama, na roletama svih proizvođača.`, g, crumbs: [[g.ime, url]] })
      + `<section class="s"><div class="c"><span class="k">Usluge ${g.u}</span><h2>Što radimo ${g.u}</h2><p class="lead">Pokrivamo: ${g.podrucje}. Izlazak na teren: ${g.izlazak}.</p>${Object.entries(kategorije).map(([k, ime]) => `<h3 style="margin:28px 0 14px">${ime}</h3>${uslugeKartice(g, usluge.filter((u) => u.kat === k))}`).join('')}</div></section>`
      + `<section class="s alt"><div class="c"><span class="k">Lokalno</span><h2>${g.slug === 'zagreb' ? 'Kvartovi i mjesta' : 'Gradske četvrti'} – ${g.ime}</h2><p class="lead">Odaberite svoj kvart za detalje o servisu roleta i komarnicima u Vašem dijelu grada.</p>${poSkupinama(g)}</div></section>`
      + galerijaSekcija(3) + postupak() + recenzije() + faqBlock(faq, `Rolete ${g.ime}: česta pitanja`) + kontaktSekcija(g),
  });
});

// Lokacije (kvartovi): glavna + komarnici + rolete
const UVOD = [
  (l, g) => `Trebate servis roleta ${l.lok}? Popravljamo rolete koje zapinju, ne dižu se ili su pale, mijenjamo gurtne i automate te ugrađujemo nove rolete i komarnike.`,
  (l, g) => `Roletar ${l.lok}: zamjena puknute gurtne, popravak zaglavljene rolete, novi zastori i komarnici po mjeri, za stanove i kuće.`,
  (l, g) => `Popravak i ugradnju roleta ${l.lok} radimo na PVC i aluminijskim roletama svih proizvođača. Najčešći poslovi su zamjena gurtne i automata te popravak rolete koja se zaglavila.`,
];
const KOM_TIP = {
  stari: 'Na starijim, visokim prozorima komarnici se rade strogo po mjeri jer nijedan otvor nije isti. Najčešće ugrađujemo fiksne i rolo komarnike prilagođene dubini okvira.',
  neboderi: 'U višekatnicama se najviše traže rolo komarnici za prozore i plise ili zaokretni komarnici za vrata lođe, koji se montiraju uz postojeće rolete.',
  novo: 'Na novijoj PVC stolariji komarnici se montiraju brzo i bez vidljivih prepravaka. Popularni su plise komarnici za balkonske stijene i rolo komarnici za prozore.',
  kuce: 'U obiteljskim kućama komarnici se obično naručuju za cijelu kuću odjednom: fiksni za prozore koji se rijetko otvaraju, a zaokretni ili plise za terasna vrata.',
  mix: 'Ovisno o stolariji ugrađujemo fiksne, rolo i plise komarnike za prozore te zaokretne i klizne komarnike za balkonska vrata.',
};
const ROL_TIP = {
  stari: 'Kod starijih zgrada najčešće se zadržava postojeća kutija iznad prozora, a mijenja se zastor i mehanizam. Tako nema radova na fasadi ni u stanu.',
  neboderi: 'U neboderima i višekatnicama novi zastor u pravilu ide u postojeću nadprozornu kutiju. Aluminijske lamele preporučujemo za sunčane strane i za zatvaranje lođa.',
  novo: 'U novijim zgradama najčešće dograđujemo rolete na prozore koji ih nemaju, s vanjskom kutijom u boji stolarije, i ugrađujemo rolete na motor.',
  kuce: 'Za obiteljske kuće radimo izmjeru svih otvora odjednom. Na velike otvore i balkonska vrata idu aluminijske rolete, po želji s motorom.',
  mix: 'Ovisno o zgradi, novi zastor ide u postojeću kutiju ili ugrađujemo kompletnu roletu s vanjskom kutijom, PVC ili aluminijsku.',
};

const CJENIK = [
  ['Popravci roleta i zamjena automata', [
    ['Zamjena gurtne (trake)', 'zamjena-gurtne', '30 – 40 €'],
    ['Ugradbeni automat za PVC stolariju', 'zamjena-automata-gurtne', '50 €'],
    ['Zamjena automata (bez gurtne)', 'zamjena-automata-gurtne', '30 €'],
    ['Zamjena automata (sa gurtnom)', 'zamjena-automata-gurtne', 'od 40 €'],
    ['Popravak električne rolete', 'popravak-motora-rolete', '40 – 150 €'],
    ['Zamjena motora na električnoj roleti', 'popravak-motora-rolete', 'na upit'],
    ['Zamjena osovine', 'zamjena-osovine-lezaja-opruge', '60 – 80 €'],
  ]],
  ['Nove rolete', [
    ['Ugradnja novih aluminijskih roleta sa svim priborom', 'ugradnja-roleta', '180 € / m²'],
    ['Ugradnja nove PVC rolete sa svim priborom', 'ugradnja-roleta', '135 € / m²'],
    ['Zamjena postojećih roleta za aluminijske', 'zamjena-starih-roleta', '80 – 100 € / m²'],
    ['Zamjena postojećih roleta za PVC', 'zamjena-starih-roleta', '70 – 80 € / m²'],
  ]],
  ['Sjenila i zavjese', [
    ['Venecijaneri', 'venecijaneri', '70 € / m²'],
    ['Rolo platna', 'rolo-platna', '85 – 100 € / m²', 'Cijena ovisi o dizajnu i dimenzijama.'],
    ['Trakaste zavjese', 'trakaste-zavjese', '80 € / m²', 'Cijena može varirati ovisno o dizajnu i dimenzijama.'],
  ]],
  ['Komarnici', [
    ['Fiksni komarnici', 'fiksni-komarnici', '60 € / m²'],
    ['Rolo komarnici', 'rolo-komarnici', '100 € / m²'],
    ['Plise (harmo) komarnici', 'plise-komarnici', '130 – 140 € / m²'],
  ]],
];

lokacije.forEach((l) => {
  const g = gradovi[l.grad];
  const base = `/${g.slug}/${l.slug}/`;
  const mjesto = ['Dugo Selo', 'Sveta Nedelja', 'Velika Gorica'].includes(l.ime) ? l.ime : `${l.ime}, ${g.ime}`;
  const susjedi = lokacije.filter((x) => x.grad === l.grad && x.skupina === l.skupina && x.slug !== l.slug);
  const nap = l.napomena ? `<p><b>${l.napomena}</b></p>` : '';
  const izl = l.napomena ? 'po dogovoru' : g.izlazak;
  const podstr = `<h3 style="margin-top:26px">Još ${l.lok}</h3><div class="btns"><a class="btn bw" href="${base}">Servis roleta ${l.ime}</a><a class="btn bw" href="${base}rolete/">Nove rolete ${l.ime}</a><a class="btn bw" href="${base}komarnici/">Komarnici ${l.ime}</a></div>`;
  const aside = `<aside class="box"><h3>${l.ime} – brzi kontakt</h3><p>Izlazak: ${izl}.</p><div class="btns">${callBtns(g, 'bp')}${waBtn(g)}</div><p style="margin:14px 0 0;font-size:.9rem;color:var(--m)">Zamjena gurtne 30 – 40 €. Ostale cijene na upit, poznate prije početka rada.</p></aside>`;
  const susjedno = susjedi.length ? `<section class="s alt"><div class="c"><h2>Radimo i u susjedstvu</h2><p class="lead">${l.skupina} – ${g.ime}</p>${lokTags(susjedi)}<p style="margin-top:18px"><a href="/${g.slug}/">Sve lokacije – ${g.ime} →</a></p></div></section>` : '';
  const bul = [`Izlazak ${l.lok}: ${izl}`, 'Rolete svih proizvođača, PVC i aluminijske', 'Zamjena gurtne 30 – 40 €'];

  // 1) servis roleta {kvart}
  const faq1 = [[`Koliko brzo dolazite ${l.lok}?`, `Izlazak ${l.lok}: ${izl}.`], [`Koliko košta zamjena gurtne ${l.lok}?`, 'Zamjena gurtne košta 30 – 40 €, jednako u svim dijelovima grada.'], faqOpci[3], faqOpci[2]];
  const top = ['servis-roleta', 'zamjena-gurtne', 'zamjena-automata-gurtne', 'popravak-zaglavljene-rolete', 'zamjena-lamela', 'popravak-motora-rolete', 'zamjena-starih-roleta', 'zatvaranje-balkona-roletama', 'komarnici'].map((s) => U[s]);
  page({
    url: base, g, crumbs: [[g.ime, `/${g.slug}/`], [l.ime, base]],
    title: fit(`Servis roleta ${mjesto} – popravak | ${firma.naziv}`, `Servis roleta ${mjesto} | ${firma.naziv}`),
    desc: `Servis i popravak roleta ${l.lok}: zamjena gurtne 30 – 40 €, automati, lamele, zaglavljene rolete, komarnici. Nazovite ${g.tel}.`,
    ld: [faqLd(faq1)],
    body: hero({ k: `Servis roleta · ${mjesto}`, h1: `Servis roleta ${l.ime}`, p: UVOD[hash(l.slug) % 3](l, g), g, crumbs: [[g.ime, `/${g.slug}/`], [l.ime, base]], bullets: bul })
      + `<section class="s"><div class="c split"><div><h2>Popravak roleta ${l.lok}</h2><p>${tipovi[l.tip]}</p>${nap}<p>Na teren ${l.lok} izlazimo ${izl}. Kvar pokušavamo riješiti u jednom dolasku, pa je korisno da uz upit pošaljete fotografiju rolete i kutije.</p>
<h3 style="margin-top:26px">Najčešći poslovi ${l.lok}</h3><ul class="chk">${top.map((u) => `<li><a href="/${g.slug}/${u.slug}/">${u.ime}</a> – ${u.kratko[0].toLowerCase() + u.kratko.slice(1)}</li>`).join('')}</ul>${podstr}</div>${aside}</div></section>`
      + susjedno + faqBlock(faq1, `Servis roleta ${l.ime}: česta pitanja`) + kontaktSekcija(g, 'Servis roleta'),
  });

  // 2) komarnici {kvart}
  const faq2 = [...U.komarnici.faq, U['popravak-komarnika'].faq[0], [`Koliko brzo dolazite na izmjeru ${l.lok}?`, `Izlazak ${l.lok}: ${izl}.`]];
  page({
    url: base + 'komarnici/', g, crumbs: [[g.ime, `/${g.slug}/`], [l.ime, base], ['Komarnici', base + 'komarnici/']],
    title: fit(`Komarnici ${mjesto} – po mjeri | ${firma.naziv}`, `Komarnici ${mjesto} | ${firma.naziv}`),
    desc: `Komarnici ${l.lok} po mjeri: fiksni, rolo, plise i komarnici za vrata. Izmjera i montaža. Nazovite ${g.tel} ili pošaljite upit.`,
    ld: [faqLd(faq2)],
    body: hero({ k: `Komarnici · ${mjesto}`, h1: `Komarnici ${l.ime}`, p: `Ugradnja komarnika po mjeri ${l.lok}: fiksni, rolo i plise komarnici za prozore te zaokretni i klizni komarnici za balkonska vrata.`, g, crumbs: [[g.ime, `/${g.slug}/`], [l.ime, base], ['Komarnici', base + 'komarnici/']], bullets: [`Izmjera ${l.lok}: ${izl}`, 'Izrada po mjeri Vašeg prozora ili vrata', 'Fiksni, rolo, plise, zaokretni i klizni'] })
      + `<section class="s"><div class="c split"><div><h2>Ugradnja komarnika ${l.lok}</h2><p>${KOM_TIP[l.tip]}</p>${nap}<p>Dolazimo na izmjeru, predložimo tip komarnika za svaki otvor i nakon izrade dolazimo na montažu. Komarnike je najbolje naručiti prije sezone, dok se na izradu ne čeka.</p>
<h3 style="margin-top:26px">Vrste komarnika</h3><ul class="chk">${usluge.filter((u) => u.kat === 'komarnici' && u.slug !== 'komarnici').map((u) => `<li><a href="/${g.slug}/${u.slug}/">${u.ime}</a> – ${u.kratko[0].toLowerCase() + u.kratko.slice(1)}</li>`).join('')}</ul>${podstr}</div>${aside}</div></section>`
      + susjedno.replace(/href="\/([a-z]+)\/([a-z0-9-]+)\/"/g, (m, a, b) => lokacije.some((x) => x.slug === b) ? `href="/${a}/${b}/komarnici/"` : m)
      + faqBlock(faq2, `Komarnici ${l.ime}: česta pitanja`) + kontaktSekcija(g, 'Komarnici'),
  });

  // 3) rolete {kvart} (nove rolete)
  const faq3 = [...U['ugradnja-roleta'].faq, U['zamjena-starih-roleta'].faq[0], [`Koliko brzo dolazite na izmjeru ${l.lok}?`, `Izlazak ${l.lok}: ${izl}.`]];
  page({
    url: base + 'rolete/', g, crumbs: [[g.ime, `/${g.slug}/`], [l.ime, base], ['Rolete', base + 'rolete/']],
    title: fit(`Rolete ${mjesto} – ugradnja i zamjena | ${firma.naziv}`, `Rolete ${mjesto} | ${firma.naziv}`),
    desc: `Nove rolete ${l.lok}: PVC i aluminijske rolete po mjeri, zamjena starih roleta, zatvaranje balkona roletama. Nazovite ${g.tel}.`,
    ld: [faqLd(faq3)],
    body: hero({ k: `Nove rolete · ${mjesto}`, h1: `Rolete ${l.ime} – ugradnja i zamjena`, p: `Ugradnja novih PVC i aluminijskih roleta ${l.lok}, zamjena starih roleta novima i zatvaranje balkona i lođa roletama.`, g, crumbs: [[g.ime, `/${g.slug}/`], [l.ime, base], ['Rolete', base + 'rolete/']], bullets: [`Izmjera ${l.lok}: ${izl}`, 'PVC i aluminijske rolete po mjeri', 'Na gurtnu ili na motor'] })
      + `<section class="s"><div class="c split"><div><h2>Nove rolete ${l.lok}</h2><p>${ROL_TIP[l.tip]}</p>${nap}<p>Ako niste sigurni treba li Vam nova roleta ili samo popravak, pogledamo je i kažemo što se više isplati. Velik dio roleta za koje vlasnici misle da su gotove treba samo novu gurtnu, automat ili vješače.</p>
<h3 style="margin-top:26px">Što ugrađujemo</h3><ul class="chk">${usluge.filter((u) => u.kat === 'nove').map((u) => `<li><a href="/${g.slug}/${u.slug}/">${u.ime}</a> – ${u.kratko[0].toLowerCase() + u.kratko.slice(1)}</li>`).join('')}</ul>${podstr}</div>${aside}</div></section>`
      + susjedno.replace(/href="\/([a-z]+)\/([a-z0-9-]+)\/"/g, (m, a, b) => lokacije.some((x) => x.slug === b) ? `href="/${a}/${b}/rolete/"` : m)
      + faqBlock(faq3, `Rolete ${l.ime}: česta pitanja`) + kontaktSekcija(g, 'Ugradnja roleta'),
  });
});

// Sve lokacije
page({
  url: '/lokacije/', title: 'Servis roleta po kvartovima – Zagreb i Karlovac | Rolotex',
  desc: 'Popis svih kvartova i mjesta u kojima radimo servis i ugradnju roleta i komarnika: Zagreb, Sesvete, Dugo Selo, Sveta Nedelja i Karlovac.',
  crumbs: [['Lokacije', '/lokacije/']],
  body: hero({ k: 'Područje rada', h1: 'Lokacije: Zagreb i Karlovac', p: 'Odaberite kvart ili mjesto. Za svaku lokaciju imamo stranicu za servis roleta, nove rolete i komarnike.', crumbs: [['Lokacije', '/lokacije/']], art: false })
    + G.map((g, i) => `<section class="s${i % 2 ? ' alt' : ''}"><div class="c"><h2><a href="/${g.slug}/">Rolete ${g.ime}</a></h2><p class="lead">${g.podrucje[0].toUpperCase() + g.podrucje.slice(1)}. Izlazak: ${g.izlazak}.</p>${poSkupinama(g)}</div></section>`).join('')
    + kontaktSekcija(),
});

// Galerija
page({
  url: '/galerija/', title: 'Radovi prije i poslije – rolete i komarnici | Rolotex',
  desc: 'Radovi prije i poslije: popravci roleta, zamjena zastora i gurtni, ugradnja komarnika u Zagrebu i Karlovcu.',
  crumbs: [['Galerija', '/galerija/']],
  body: hero({ k: 'Galerija', h1: 'Radovi prije i poslije', p: 'Usporedite stanje roleta prije i poslije popravka. Povucite klizač preko fotografije.', crumbs: [['Galerija', '/galerija/']], art: false }) + galerijaSekcija() + dodatnoSekcija() + kontaktSekcija(),
});

// Cijene
page({
  url: '/cijene/', title: 'Cijene roleta, komarnika i zavjesa – okvirno | Rolotex',
  desc: 'Okvirne cijene popravka i zamjene roleta, ugradnje aluminijskih roleta, komarnika i zavjesa u Zagrebu i Karlovcu. Točnu cijenu određujemo na terenu.',
  crumbs: [['Cijene', '/cijene/']],
  body: hero({ k: 'Cijene', h1: 'Cijene roleta, komarnika i zavjesa', p: 'Istaknute cijene su okvirne i služe kao orijentir. Točna cijena ovisi o stanju, dimenzijama i izvedbi te se određuje na terenu.', crumbs: [['Cijene', '/cijene/']], art: false })
    + `<section class="s"><div class="c" style="max-width:860px">${CJENIK.map(([naslov, redovi]) => `<h2 style="font-size:1.35rem;margin:${naslov === CJENIK[0][0] ? '0' : '34px'} 0 14px">${naslov}</h2><table><thead><tr><th>Usluga</th><th>Cijena</th></tr></thead><tbody>${redovi.map(([ime, slug, cijena, nap]) => `<tr><td><a href="/usluge/${slug}/">${ime}</a>${nap ? `<br><small style="color:var(--m)">${nap}</small>` : ''}</td><td style="white-space:nowrap"><b>${cijena}</b></td></tr>`).join('')}</tbody></table>`).join('')}<p style="margin-top:22px;color:var(--m)">Cijene su okvirne i služe kao orijentir, a variraju ovisno o stanju, dimenzijama i izvedbi. Točnu cijenu određujemo na terenu, prije početka rada. Za brzu procjenu pošaljite fotografiju i približne dimenzije.</p></div></section>` + kontaktSekcija(),
});

// FAQ
page({
  url: '/cesta-pitanja/', title: 'Česta pitanja o servisu roleta i komarnicima | Rolotex',
  desc: 'Odgovori na česta pitanja: cijena zamjene gurtne, koliko brzo dolazimo, popravak ili nova roleta, motor na postojeću roletu, komarnici.',
  crumbs: [['Česta pitanja', '/cesta-pitanja/']], ld: [faqLd(faqOpci)],
  body: hero({ k: 'Pitanja i odgovori', h1: 'Česta pitanja o roletama i komarnicima', p: 'Kratki odgovori na ono što nas kupci najčešće pitaju.', crumbs: [['Česta pitanja', '/cesta-pitanja/']], art: false }) + faqBlock(faqOpci, 'Pitanja kupaca') + kontaktSekcija(),
});

// Kontakt
page({
  url: '/kontakt/', title: 'Kontakt – rolete Zagreb i Karlovac | Rolotex',
  desc: 'Kontakt Rolotex: Zagreb 095 718 2754, Karlovac 099 781 9493, rolotex1@gmail.com. Pošaljite upit preko forme ili WhatsAppa.',
  crumbs: [['Kontakt', '/kontakt/']],
  body: hero({ k: 'Kontakt', h1: 'Kontakt i upit za ponudu', p: 'Za Zagreb i Karlovac imamo zasebne brojeve. Na oba možete nazvati ili pisati na WhatsApp.', crumbs: [['Kontakt', '/kontakt/']], art: false }) + kontaktSekcija(),
});

// O nama
page({
  url: '/o-nama/', title: 'O nama – servis i ugradnja roleta | Rolotex',
  desc: 'Rolotex je obrt za servis i ugradnju roleta, komarnika, žaluzina i zavjesa. Radimo u Zagrebu i Karlovcu, u stanovima i obiteljskim kućama.',
  crumbs: [['O nama', '/o-nama/']],
  body: hero({ k: 'O nama', h1: 'Rolotex – roletar za Zagreb i Karlovac', p: 'Obrt za servis i montažu roleta, rolo platna, trakastih zavjesa i žaluzina te ugradnju komarnika i venecijanera.', crumbs: [['O nama', '/o-nama/']], art: false })
    + `<section class="s"><div class="c" style="max-width:820px"><p>${firma.naziv} vodi ${firma.vlasnik}. Najviše radimo servis roleta: zamjenu gurtni i automata za namatanje, popravak i zamjenu dijelova mehanizma, zamjenu starih roleta novima i montažu novih roleta. Uz to ugrađujemo komarnike i zatvaramo lođe i balkone roletama.</p><p>Kupci su nam uglavnom vlasnici stanova i obiteljskih kuća. Zato radimo jednostavno: pogledamo roletu, kažemo što joj je i koliko košta, pa popravimo.</p></div></section>` + prednosti() + kontaktSekcija(),
});

// Impressum
page({
  url: '/impressum/', title: 'Podaci o obrtu (impressum) | Rolotex',
  desc: 'Podaci o obrtu Rolotex za servis i ugradnju roleta: naziv, vlasnik, OIB, sjedište, e-mail i telefoni za Zagreb i Karlovac.',
  crumbs: [['Podaci o obrtu', '/impressum/']],
  body: hero({ k: 'Impressum', h1: 'Podaci o obrtu', p: 'Službeni podaci pružatelja usluga.', crumbs: [['Podaci o obrtu', '/impressum/']], art: false })
    + `<section class="s"><div class="c" style="max-width:760px"><table><tbody><tr><th>Naziv</th><td>${firma.naziv}</td></tr><tr><th>Pravni oblik</th><td>Paušalni obrt</td></tr><tr><th>Vlasnik</th><td>${firma.vlasnik}</td></tr><tr><th>OIB</th><td>${firma.oib}</td></tr><tr><th>Sjedište</th><td>${firma.sjediste}</td></tr><tr><th>E-mail</th><td><a href="mailto:${firma.email}">${firma.email}</a></td></tr>${G.map((g) => `<tr><th>Telefon ${g.ime}</th><td><a href="${telHref(g)}">${g.tel}</a></td></tr>`).join('')}</tbody></table></div></section>`,
});

// Privatnost
page({
  url: '/privatnost/', title: 'Pravila privatnosti | Rolotex',
  desc: 'Pravila privatnosti Rolotexa: koje osobne podatke prikupljamo iz kontakt forme, zašto ih koristimo i kako možete zatražiti brisanje.',
  crumbs: [['Pravila privatnosti', '/privatnost/']],
  body: hero({ k: 'Privatnost', h1: 'Pravila privatnosti', p: 'Kratko i jasno o podacima koje nam pošaljete.', crumbs: [['Pravila privatnosti', '/privatnost/']], art: false })
    + `<section class="s"><div class="c" style="max-width:760px"><h2>Voditelj obrade</h2><p>${firma.puniNaziv}, vl. ${firma.vlasnik}, ${firma.sjediste}, OIB ${firma.oib}, ${firma.email}.</p><h2>Koje podatke prikupljamo</h2><p>Podatke koje sami upišete u kontakt formu (ime, telefon, grad, kvart ili adresa, poruka) te podatke koje nam pošaljete telefonom, e-mailom ili WhatsAppom.</p><h2>Zašto</h2><p>Isključivo da odgovorimo na upit, izradimo ponudu i dogovorimo termin. Podatke ne prodajemo i ne koristimo za oglašavanje.</p><h2>Obrada upita iz forme</h2><p>Upiti iz forme prosljeđuju se na naš e-mail putem usluge FormSubmit.</p><h2>Čuvanje i Vaša prava</h2><p>Podatke čuvamo koliko je potrebno za obradu upita i izvršenje posla te koliko nalažu propisi. Možete zatražiti uvid, ispravak ili brisanje svojih podataka na ${firma.email}.</p></div></section>`,
});

// 404
page({
  url: '/404.html', noindex: true, title: 'Stranica nije pronađena | Rolotex', desc: 'Stranica nije pronađena.',
  body: hero({ k: '404', h1: 'Stranica nije pronađena', p: 'Vratite se na početnu ili nas odmah nazovite.', art: false, bullets: [] }) + kontaktSekcija(),
});

/* ---------- ispis ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
pages.forEach((p) => write(p.url.endsWith('/') ? p.url + 'index.html' : p.url, p.html));


// Prave fotografije: stavite ih u ./public/galerija/ – kopiraju se u dist
const PUB = path.join(__dirname, 'public');
if (fs.existsSync(PUB)) fs.cpSync(PUB, OUT, { recursive: true });

const indexable = pages.filter((p) => !p.noindex);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexable.map((p) => `<url><loc>${SITE}${p.url}</loc></url>`).join('')}</urlset>`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Gotovo: ${pages.length} stranica -> dist/ (SITE_URL=${SITE})`);
