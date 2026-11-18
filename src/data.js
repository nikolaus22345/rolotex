// Svi podaci o firmi, uslugama i lokacijama. Izvor: upitnik klijenta (Rolotex).
// Ono što klijent NIJE ispunio (radno vrijeme, jamstvo, besplatna izmjera, recenzije)
// namjerno nije izmišljeno – dopunite ovdje kad stigne.

exports.firma = {
  naziv: 'Rolotex',
  puniNaziv: 'Rolotex, paušalni obrt',
  vlasnik: 'Ivan Valjak',
  oib: '76655997507',
  sjediste: 'Prigorska 95, 10000 Zagreb',
  email: 'rolotex1@gmail.com',
  // E-mail na koji stižu upiti iz forme (FormSubmit – prvi upit traži jednokratnu potvrdu na ovaj e-mail)
  emailForma: 'rolotex1@gmail.com',
  // Kad otvorite Google Business profil, upišite poveznice i sekcija s recenzijama se sama pojavi:
  googleRecenzijeUrl: '',   // npr. https://g.page/r/XXXX/review
  recenzije: [],            // { ime: 'Ana K.', tekst: '...', ocjena: 5, datum: '2026-10' }
  drustveneMreze: [],
};

exports.gradovi = {
  zagreb: {
    slug: 'zagreb', ime: 'Zagreb', u: 'u Zagrebu', gen: 'Zagreba',
    tel: '095 718 2754', telIntl: '+385957182754',
    izlazak: 'najčešće unutar 24 do 48 sati od poziva',
    podrucje: 'Zagreb (svi kvartovi), Sesvete, Dugo Selo i Sveta Nedelja; Velika Gorica i ostala okolica po dogovoru',
    karta: 'Zagreb',
  },
  karlovac: {
    slug: 'karlovac', ime: 'Karlovac', u: 'u Karlovcu', gen: 'Karlovca',
    tel: '099 781 9493', telIntl: '+385997819493',
    izlazak: 'po dogovoru, najčešće jednom tjedno – četvrtkom ili petkom',
    podrucje: 'grad Karlovac i gradske četvrti; okolica po dogovoru',
    karta: 'Karlovac',
  },
};

// kat: servis | nove | komarnici | sjenila
// U tekstu: {u} = "u Zagrebu" / "u Karlovcu" / "u Zagrebu i Karlovcu"
exports.usluge = [
  {
    slug: 'servis-roleta', kat: 'servis', ime: 'Servis roleta', top: true,
    kratko: 'Servis svih vrsta roleta: gurtne, automati, lamele, osovine, ležajevi i motori.',
    uvod: [
      'Roleta koja zapinje, teško se diže ili se više ne spušta do kraja gotovo se uvijek može servisirati, bez kupnje nove. Radimo servis roleta {u} na PVC i aluminijskim roletama svih proizvođača, u stanovima i obiteljskim kućama.',
      'Na licu mjesta otvaramo kutiju, pregledamo mehanizam i kažemo što je točno potrgano. Najčešće je riječ o gurtni (traci), automatu za namatanje, potrganim vješačima, ležaju ili osovini. Ako se popravak ne isplati, to ćemo reći odmah i predložiti zamjenu rolete.',
    ],
    stavke: ['Zamjena gurtne (trake) i automata za namatanje', 'Zamjena potrganih i izblijedjelih lamela', 'Zamjena osovine, ležaja, opruge i vješača', 'Vraćanje rolete koja je pala u kutiju ili izašla iz vodilica', 'Popravak i zamjena motora na električnim roletama', 'Podešavanje graničnika i vodilica'],
    faq: [
      ['Popravljate li rolete svih proizvođača?', 'Da. Servisiramo PVC i aluminijske rolete svih proizvođača, starije i novije, s gurtnom, ručicom ili motorom.'],
      ['Isplati li se servis ili je bolje ugraditi novu roletu?', 'Ovisi o stanju rolete, koje procijenimo na licu mjesta. Ako su lamele i kutija u dobrom stanju, popravak mehanizma je u pravilu puno povoljniji od nove rolete.'],
    ],
  },
  {
    slug: 'popravak-roleta', kat: 'servis', ime: 'Popravak roleta', top: true,
    kratko: 'Popravak roleta koje zapinju, ne dižu se, pale su ili su se zaglavile.',
    uvod: [
      'Puknuta traka, roleta koja visi ukoso, lamele koje su iskočile iz vodilice ili roleta koja se uopće ne miče – to su kvarovi koje popravljamo svaki dan. Popravak roleta (mnogi kažu i roletni) {u} radimo u stanovima i kućama, na prozorima i balkonskim vratima.',
      'Kvar pokušavamo riješiti u jednom dolasku. Zato je korisno da nam uz upit pošaljete fotografiju rolete i kutije preko WhatsAppa: tako znamo koje dijelove ponijeti.',
    ],
    stavke: ['Roleta se ne diže ili se ne spušta', 'Puknuta ili izlizana gurtna', 'Roleta je pala i ostala u kutiji', 'Roleta visi ukoso ili zapinje u vodilici', 'Potrgane lamele ili završna letvica', 'Električna roleta ne reagira na prekidač ili daljinski'],
    faq: [
      ['Koliko brzo dolazite na popravak?', 'U Zagrebu najčešće unutar 24 do 48 sati. U Karlovcu izlazimo po dogovoru, najčešće četvrtkom ili petkom.'],
      ['Mogu li poslati sliku kvara?', 'Da, i preporučujemo to. Pošaljite fotografiju rolete i kutije na WhatsApp pa ćemo Vam okvirno reći o čemu je riječ prije dolaska.'],
    ],
  },
  {
    slug: 'zamjena-gurtne', kat: 'servis', ime: 'Zamjena gurtne na roleti', top: true,
    kratko: 'Zamjena puknute ili izlizane gurtne (trake). Cijena 30 – 40 €.',
    uvod: [
      'Gurtna je traka kojom dižete i spuštate roletu i dio je koji se najbrže troši. Kad se počne resati, zapinjati u vodilici ili pukne, roleta ostaje u položaju u kojem se zatekla. Zamjena gurtne {u} jedan je od naših najčešćih poslova.',
      'Staru traku vadimo, namatamo novu na osovinu i u automat te provjeravamo ide li roleta do kraja gore i dolje. Zamjena gurtne košta 30 – 40 €. Ako je uz traku oslabio i automat za namatanje, mijenjamo ga u istom dolasku.',
    ],
    stavke: ['Zamjena puknute gurtne', 'Zamjena izlizane trake koja se resa', 'Uske i široke gurtne, za prozore i balkonska vrata', 'Provjera automata', 'Po potrebi zamjena automata u istom dolasku'],
    faq: [
      ['Koliko košta zamjena gurtne (trake) na roleti?', 'Zamjena gurtne košta 30 – 40 €.'],
      ['Mogu li sami zamijeniti gurtnu?', 'Može se, ali treba otvoriti kutiju rolete i pravilno namotati traku na osovinu i automat. Ako opruga automata iskoči ili se traka krivo namota, roleta neće ići do kraja.'],
    ],
  },
  {
    slug: 'zamjena-automata-gurtne', kat: 'servis', ime: 'Zamjena automata gurtne (namatača)',
    kratko: 'Novi automat za namatanje kad traka visi i ne vraća se u kutiju.',
    uvod: [
      'Automat ili namatač gurtne je kutijica pri dnu prozora u koju se traka sama uvlači. Kad mu oslabi ili pukne opruga, traka ostaje visjeti i više se ne namata. Zamjenu automata gurtne {u} radimo na nadžbuknim i podžbuknim (ugradbenim) automatima.',
      'Novi automat biramo prema širini trake i dužini koju treba primiti. U istom dolasku obično promijenimo i gurtnu jer je stara traka uglavnom jednako istrošena.',
    ],
    stavke: ['Zamjena nadžbuknog automata', 'Zamjena podžbuknog (ugradbenog) automata', 'Automati za uske gurtne', 'Zamjena gurtne zajedno s automatom'],
    faq: [
      ['Kako znam da je kriv automat, a ne traka?', 'Ako je traka cijela, a ne vraća se u kutiju nego visi, kriva je opruga u automatu. Ako je traka puknuta ili izresana, mijenja se traka, a automat provjerimo usput.'],
    ],
  },
  {
    slug: 'zamjena-lamela', kat: 'servis', ime: 'Zamjena lamela na roleti',
    kratko: 'Zamjena potrganih, napuklih ili izblijedjelih lamela, pojedinačno ili cijelog zastora.',
    uvod: [
      'Lamele su letvice od kojih je složen zastor rolete. Pucaju od sunca, tuče i starosti, a jedna potrgana lamela zna zaglaviti cijelu roletu. Zamjenu lamela {u} radimo pojedinačno ili kao zamjenu cijelog zastora, ovisno o tome koliko ih je oštećeno.',
      'Kod starijih roleta ista lamela često se više ne proizvodi. Tada je bolje rješenje novi zastor u postojećoj kutiji i vodilicama: dobijete praktički novu roletu bez radova na prozoru.',
    ],
    stavke: ['Zamjena pojedinih lamela', 'Novi PVC ili aluminijski zastor u postojeću kutiju', 'Zamjena završne letvice i graničnika', 'Zamjena vješača koji drže zastor na osovini'],
    faq: [
      ['Mogu li se zamijeniti samo dvije-tri lamele?', 'Mogu, ako se odgovarajući profil još može nabaviti. Ako ne, mijenja se cijeli zastor, a kutija i vodilice ostaju.'],
    ],
  },
  {
    slug: 'zamjena-osovine-lezaja-opruge', kat: 'servis', ime: 'Zamjena osovine, ležaja i opruge rolete',
    kratko: 'Popravak mehanizma u kutiji: osovina, ležaj, opruga, kolut gurtne.',
    uvod: [
      'Ako roleta škripi, teško se diže ili se namata ukoso, kvar je obično u kutiji: istrošen ležaj, savijena osovina, puknuta opruga ili napukli kolut na koji se namata traka. Zamjenu osovine, ležaja i opruge rolete radimo {u} bez skidanja prozora.',
      'Otvaramo poklopac kutije, skidamo zastor s osovine, mijenjamo istrošeni dio i sve vraćamo. Usput provjerimo vješače i traku da se ne vraćamo za mjesec dana zbog sljedećeg dijela.',
    ],
    stavke: ['Zamjena osovine rolete', 'Zamjena ležaja i nosača', 'Zamjena opruge', 'Zamjena koluta (remenice) gurtne', 'Zamjena vješača zastora'],
    faq: [
      ['Treba li za ovaj popravak skidati roletu s prozora?', 'Ne. Mehanizmu se pristupa kroz poklopac kutije, iznutra ili izvana, ovisno o tipu rolete.'],
    ],
  },
  {
    slug: 'popravak-zaglavljene-rolete', kat: 'servis', ime: 'Popravak zaglavljene rolete',
    kratko: 'Roleta je pala, zaglavila se ili ostala u kutiji? Vraćamo je u funkciju.',
    uvod: [
      'Zaglavljena roleta ostane napola spuštena, padne do kraja i više se ne da podići ili se cijela namota u kutiju. Uzrok su najčešće potrgani vješači, lamela koja je izašla iz vodilice ili puknuta traka. Popravak zaglavljene ili pale rolete radimo {u} na svim tipovima roleta.',
      'Ne povlačite roletu na silu: tako se obično potrga još nekoliko lamela. Javite se, pošaljite fotografiju i ostavite je kako jest dok ne dođemo.',
    ],
    stavke: ['Roleta pala do kraja i ne diže se', 'Roleta se namotala i ostala u kutiji', 'Roleta zaglavljena na pola prozora', 'Lamele iskočile iz vodilice', 'Roleta visi na jednu stranu'],
    faq: [
      ['Roleta je ostala spuštena i u sobi je mrak. Koliko brzo možete doći?', 'U Zagrebu najčešće dolazimo unutar 24 do 48 sati od poziva. U Karlovcu po dogovoru, najčešće četvrtkom ili petkom.'],
    ],
  },
  {
    slug: 'popravak-motora-rolete', kat: 'servis', ime: 'Popravak i zamjena motora rolete', top: true,
    kratko: 'Električna roleta ne radi? Dijagnostika, popravak ili zamjena motora.',
    uvod: [
      'Kad električna roleta stane, zuji bez pomaka ili radi samo u jednom smjeru, kvar može biti u motoru, prekidaču ili u samom zastoru. Popravak i zamjenu motora rolete {u} radimo na cijevnim motorima koji se nalaze u osovini rolete.',
      'Prvo provjerimo dolazi li struja do motora i jesu li krajnji položaji dobro podešeni. Ako je motor pregorio, mijenjamo ga novim odgovarajuće snage i ponovno podešavamo gornji i donji krajnji položaj.',
    ],
    stavke: ['Dijagnostika kvara električne rolete', 'Zamjena pregorjelog cijevnog motora', 'Podešavanje krajnjih položaja'],
    faq: [
      ['Roleta zuji, ali se ne miče. Je li motor gotov?', 'Ne mora biti. Zna biti zaglavljen zastor ili potrgan spoj osovine i motora. Na licu mjesta provjerimo što je uzrok prije nego što se išta mijenja.'],
    ],
  },
  {
    slug: 'ugradnja-roleta', kat: 'nove', ime: 'Ugradnja roleta', top: true,
    kratko: 'Montaža novih PVC i aluminijskih roleta na postojeće i nove prozore.',
    uvod: [
      'Ugradnju novih roleta {u} radimo na postojeću stolariju i na nove prozore, u stanovima i obiteljskim kućama. Nudimo PVC i aluminijske rolete, s gurtnom ili na motor.',
      'Dolazimo na izmjeru, dogovaramo materijal, boju i način upravljanja, a rolete se izrađuju po mjeri Vašeg otvora.',
    ],
    stavke: ['Izmjera otvora i savjet oko izbora rolete', 'PVC i aluminijske rolete po mjeri', 'Nadžbukne (vanjske) kutije za postojeće prozore', 'Upravljanje gurtnom ili motorom', 'Montaža i podešavanje'],
    faq: [
      ['Mogu li se rolete ugraditi na prozore koji ih nemaju?', 'U većini slučajeva mogu, uz vanjsku (nadžbuknu) kutiju koja se montira na okvir prozora ili u špaletu. Na izmjeri provjerimo ima li dovoljno mjesta.'],
      ['PVC ili aluminijske rolete?', 'PVC rolete su povoljnije i dovoljne za većinu prozora. Aluminijske su čvršće, bolje podnose sunce i tuču i preporučuju se za veće otvore i balkonska vrata.'],
    ],
  },
  {
    slug: 'pvc-rolete', kat: 'nove', ime: 'PVC rolete',
    kratko: 'Nove PVC rolete po mjeri: povoljno rješenje za zamračenje i privatnost.',
    uvod: [
      'PVC rolete su najčešći izbor za stanove: lagane su, povoljne i dobro zamračuju. Ugradnju novih PVC roleta {u} radimo po mjeri, na postojeće i nove prozore.',
      'Dobar su izbor za prozore standardnih dimenzija. Za vrlo široke otvore i jako osunčane strane često preporučimo aluminij jer se PVC lamela na velikoj širini i vrućini lakše savija.',
    ],
    stavke: ['PVC rolete po mjeri', 'Zamjena starog PVC zastora novim', 'Upravljanje gurtnom', 'Mogućnost komarnika uz roletu'],
    faq: [['Koliko traju PVC rolete?', 'Ovisi o izloženosti suncu i načinu korištenja. Mehanizam (traka, automat) troši se brže od zastora i jeftino se mijenja.']],
  },
  {
    slug: 'aluminijske-rolete', kat: 'nove', ime: 'Aluminijske rolete',
    kratko: 'Čvrste aluminijske rolete s punjenim lamelama, za veće otvore i jače sunce.',
    uvod: [
      'Aluminijske rolete imaju lamele punjene izolacijskom pjenom pa su čvršće i stabilnije od PVC-a. Bolje podnose sunce, vjetar i tuču i ne mijenjaju oblik na vrućini. Ugradnju novih aluminijskih roleta {u} radimo po mjeri.',
      'Preporučujemo ih za balkonska vrata, široke prozore i južne strane.',
    ],
    stavke: ['Aluminijske rolete po mjeri', 'Punjene lamele', 'Za velike otvore, balkonska vrata i standardne prozore', 'Upravljanje gurtnom ili motorom', 'Izbor boja lamela i kutije'],
    faq: [['Jesu li aluminijske rolete bučnije od PVC-a?', 'Pri dizanju i spuštanju zvuk je sličan. Na vjetru su aluminijske mirnije jer su lamele kruće i manje lupaju.']],
  },
  {
    slug: 'zamjena-starih-roleta', kat: 'nove', ime: 'Zamjena starih roleta', top: true,
    kratko: 'Stare, potrgane rolete van – nove unutra, u postojeću kutiju gdje god je moguće.',
    uvod: [
      'Kad su lamele izgorjele od sunca, napukle ili se više ne mogu nabaviti, popravak nema smisla. Zamjenu starih roleta novima {u} radimo tako da, gdje god je moguće, zadržimo postojeću kutiju i vodilice i mijenjamo samo zastor i mehanizam.',
      'Tako nema razbijanja ni radova oko prozora, a dobijete roletu koja radi kao nova. Ako su i kutija i vodilice dotrajale, ugrađujemo kompletnu novu roletu.',
    ],
    stavke: ['Demontaža starog zastora', 'Novi PVC ili aluminijski zastor u postojeću kutiju', 'Kompletna nova roleta kad je kutija dotrajala', 'Stare drvene i plastične rolete'],
    faq: [['Može li nova roleta u staru kutiju iznad prozora?', 'U većini slučajeva može. Na licu mjesta izmjerimo kutiju i vodilice i provjerimo stane li novi zastor.']],
  },
  {
    slug: 'elektricne-rolete', kat: 'nove', ime: 'Električne rolete i motor za rolete',
    kratko: 'Nove rolete na motor i ugradnja motora na postojeće rolete, gdje je to izvedivo.',
    uvod: [
      'Električne rolete dižu se i spuštaju prekidačem ili daljinskim, bez trake. Ugrađujemo nove rolete na motor {u}, a na postojeće rolete motor ugrađujemo kad to roleta dopušta.',
      'Otvoreno: motor se ne može ugraditi na svaku postojeću roletu. Ovisi o osovini, veličini kutije, stanju zastora i o tome može li se do prozora dovesti struja. Zato prvo pogledamo roletu i kažemo isplati li se.',
    ],
    stavke: ['Nove rolete s motorom', 'Ugradnja motora na postojeću roletu (nakon pregleda)', 'Upravljanje prekidačem ili daljinskim', 'Podešavanje krajnjih položaja'],
    faq: [['Može li se na postojeću roletu ugraditi motor?', 'Ne na svaku. Ovisi o tipu osovine, mjestu u kutiji i dovodu struje. Procjenu dajemo nakon pregleda rolete.']],
  },
  {
    slug: 'pametne-rolete', kat: 'nove', ime: 'Daljinsko i pametno upravljanje roletama',
    kratko: 'Daljinski upravljač, grupno upravljanje i upravljanje roletama preko mobitela.',
    uvod: [
      'Rolete na motor mogu se upravljati daljinskim upravljačem, pojedinačno ili sve odjednom, a uz odgovarajući prijemnik i preko mobitela. Daljinsko i pametno upravljanje roletama {u} ugrađujemo na nove i na postojeće električne rolete.',
      'Koja je oprema moguća ovisi o motoru koji je već u roleti. Prije narudžbe provjerimo motor i ožičenje da ne kupite nešto što s Vašim roletama ne radi.',
    ],
    stavke: ['Daljinski upravljač za jednu ili više roleta', 'Grupno upravljanje (sve rolete jednim gumbom)', 'Upravljanje preko mobitela', 'Vremensko dizanje i spuštanje'],
    faq: [['Mogu li postojeće električne rolete dobiti daljinski?', 'Najčešće mogu, dodavanjem prijemnika ili zamjenom motora radijskim. Ovisi o postojećem motoru.']],
  },
  {
    slug: 'zatvaranje-balkona-roletama', kat: 'nove', ime: 'Zatvaranje balkona i lođa roletama', top: true,
    kratko: 'Balkon ili lođa zatvoreni roletama: zaštita od sunca, kiše, vjetra i pogleda.',
    uvod: [
      'Zatvaranje balkona i lođa roletama {u} dobro je rješenje kad želite zaštitu od sunca, kiše, vjetra i pogleda, a da balkon i dalje možete potpuno otvoriti. Rolete podignete i lođa je otvorena kao prije.',
      'Lođe i balkone zatvaramo isključivo roletama, bez staklenih stijena. Rolete se izrađuju po mjeri otvora, obično aluminijske zbog širine, i mogu biti na gurtnu ili na motor.',
    ],
    stavke: ['Izmjera balkona ili lođe', 'Aluminijske rolete po mjeri za široke otvore', 'Podjela otvora na više polja', 'Upravljanje gurtnom ili motorom', 'Mogućnost komarnika'],
    faq: [['Zatvarate li balkone i staklom?', 'Ne. Balkone i lođe zatvaramo isključivo roletama.']],
  },
  {
    slug: 'komarnici', kat: 'komarnici', ime: 'Komarnici', top: true,
    kratko: 'Ugradnja komarnika po mjeri: fiksni, rolo, plise (harmo) i komarnici za vrata.',
    uvod: [
      'Ugradnju komarnika {u} radimo po mjeri, za prozore i balkonska vrata. U ponudi su fiksni, rolo i plise (harmo) komarnici te klizni komarnici za vrata.',
      'Koji je tip najbolji ovisi o prozoru: otvara li se prema van, ima li roletu, koliko mjesta ima u okviru i koliko se često kroz vrata prolazi. Na izmjeri predložimo što se za koji otvor isplati.',
    ],
    stavke: ['Fiksni komarnici za prozore', 'Rolo komarnici za prozore i vrata', 'Plise (harmo) komarnici', 'Klizni komarnici za vrata', 'Izmjera i montaža'],
    faq: [
      ['Koji komarnik odabrati za balkonska vrata?', 'Za vrata kroz koja se često prolazi najpraktičniji su plise (harmo) komarnici. Rolo komarnik je dobar kad nema mjesta za otvaranje krila.'],
      ['Kada je najbolje naručiti komarnike?', 'Prije sezone. U proljeće i ljeto potražnja je najveća pa se na izradu čeka dulje.'],
    ],
  },
  {
    slug: 'fiksni-komarnici', kat: 'komarnici', ime: 'Fiksni komarnici',
    kratko: 'Najpovoljniji komarnik za prozore: okvir s mrežom koji se lako skida.',
    uvod: [
      'Fiksni komarnik je aluminijski okvir s mrežom koji se učvrsti u okvir prozora. Najjednostavniji je i najpovoljniji tip, bez pokretnih dijelova koji se mogu pokvariti. Nove fiksne komarnike {u} izrađujemo po mjeri.',
      'Dobar je izbor za prozore koje ne trebate otvarati prema van i na kojima ne spuštate cvijeće ili rublje. Preko zime se može skinuti i spremiti.',
    ],
    stavke: ['Fiksni komarnici po mjeri', 'Aluminijski okvir', 'Montaža bez bušenja stolarije gdje je moguće', 'Lako skidanje preko zime'],
    faq: [['Može li fiksni komarnik na prozor s roletom?', 'Može, ako između prozora i rolete ima dovoljno mjesta. To provjerimo na izmjeri.']],
  },
  {
    slug: 'rolo-komarnici', kat: 'komarnici', ime: 'Rolo komarnici',
    kratko: 'Komarnik koji se namata u kutiju kad ga ne trebate. Za prozore i vrata.',
    uvod: [
      'Rolo komarnik se spušta kad treba, a inače je namotan u malu kutiju pa ne smeta pogledu ni čišćenju prozora. Nove rolo komarnike {u} ugrađujemo na prozore i balkonska vrata.',
      'Mreža rolo komarnika namata se u kutiju i vodi kroz bočne vodilice. Kad komarnik počne ispadati iz vodilice ili se ne vraća, obično je popustila opruga ili se rasklimao mehanizam, što se da popraviti.',
    ],
    stavke: ['Rolo komarnici za prozore (okomiti)', 'Izrada po mjeri', 'Montaža uz postojeće rolete'],
    faq: [['Rolo komarnik se ne namata do kraja. Može li se popraviti?', 'Najčešće može. Uzrok je obično oslabljena opruga ili mehanizam.']],
  },
  {
    slug: 'plise-komarnici', kat: 'komarnici', ime: 'Plise (harmo) komarnici',
    kratko: 'Harmonika komarnici s niskim pragom, po mjeri za vrata, prozore i široke otvore.',
    uvod: [
      'Plise (harmo) komarnik ima mrežu složenu u harmoniku koja klizi postrance. Ima nizak prag preko kojeg se ne spotičete i ostaje u položaju u kojem ga ostavite. Plise (harmo) komarnike {u} ugrađujemo po mjeri, za sve otvore na kojima to ima smisla.',
      'Rješenje je za široke otvore i klizne stijene, gdje nema mjesta za otvaranje krila, ali jednako dobro ide i na standardne prozore.',
    ],
    stavke: ['Plise (harmo) komarnici za balkonska vrata', 'Plise (harmo) komarnici za standardne prozore', 'Plise (harmo) komarnici za široke i klizne stijene', 'Jednokrilni i dvokrilni', 'Nizak prag'],
    faq: [['Je li plise (harmo) komarnik osjetljiv?', 'Mreža je čvršća nego što izgleda, ali ne voli naslanjanje i kućne ljubimce. Uz normalno korištenje traje godinama.']],
  },
  {
    slug: 'komarnici-za-balkonska-vrata', kat: 'komarnici', ime: 'Komarnici za balkonska vrata',
    kratko: 'Komarnici za balkonska vrata i balkon po mjeri: klizni i plise (harmo).',
    uvod: [
      'Za vrata kroz koja se stalno prolazi komarnik mora biti čvrst i lagan za otvaranje. Komarnike za balkonska vrata {u} ugrađujemo kao klizne (pomiču se postrance po vodilici) ili plise (harmo) (slažu se u harmoniku i klize postrance).',
      'Plise (harmo) komarnik ostaje u položaju u kojem ga ostavite i najbolji je za balkon i terasu. Za cijeli balkon radimo komarnike po mjeri otvora balkonskih vrata i prozora. Klizni je logičan izbor uz klizna vrata i ondje gdje krilo nema mjesta za otvaranje.',
    ],
    stavke: ['Klizni komarnici za balkon', 'Plise (harmo) i rolo komarnici za balkonska vrata', 'Komarnici za sve otvore na balkonu', 'Izrada po mjeri i montaža'],
    faq: [['Koji komarnik je najbolji za balkonska vrata?', 'Za balkonska vrata najčešće biramo plise (harmo) ili klizni komarnik, ovisno o širini otvora i mjestu za vodilicu.']],
  },
  {
    slug: 'popravak-komarnika', kat: 'komarnici', ime: 'Popravak komarnika',
    kratko: 'Popravak rolo i plise (harmo) komarnika i vraćanje mreže u vodilice.',
    uvod: [
      'Važno je znati: sama mreža na rolo i plise (harmo) komarniku ne može se zasebno zamijeniti. Popravlja se mehanizam, a ako je mreža poderana, rješenje je novi komarnik. To Vam kažemo unaprijed da ne plaćate popravak koji neće držati.',
    ],
    stavke: ['Vraćanje mreže u vodilice', 'Procjena: popravak ili novi komarnik'],
    faq: [['Koliko košta zamjena mreže na komarniku?', 'Mreža se ne može zasebno zamijeniti. Popravlja se mehanizam komarnika. Ako je mreža poderana, izrađuje se novi komarnik.']],
  },
  {
    slug: 'venecijaneri', kat: 'sjenila', ime: 'Venecijaneri',
    kratko: 'Unutarnje aluminijske žaluzine (venecijaneri) po mjeri – ugradnja i servis.',
    uvod: [
      'Venecijaneri su unutarnje aluminijske žaluzine s vodoravnim lamelama kojima birate koliko svjetla ulazi. Ugradnju i servis venecijanera {u} radimo po mjeri, na krilo prozora ili u špaletu.',
      'Praktični su za kuhinje, kupaonice i urede jer se lako brišu i ne upijaju mirise. Na PVC prozore montiraju se bez bušenja stakla, na okvir krila.',
    ],
    stavke: ['Venecijaneri po mjeri', 'Montaža na krilo prozora ili u špaletu', 'Izbor boja lamela', 'Servis: zamjena špage i mehanizma za zakretanje'],
    faq: [['Popravljate li stare venecijanere?', 'Da, mijenjamo špage i mehanizam za zakretanje kad su lamele još u dobrom stanju.']],
  },
  {
    slug: 'vanjske-zaluzine', kat: 'sjenila', ime: 'Vanjske žaluzine',
    kratko: 'Vanjske žaluzine sa zakretnim lamelama: sjena bez potpunog mraka.',
    uvod: [
      'Vanjske žaluzine zaustavljaju sunce prije nego što dođe do stakla, a zakretanjem lamela birate koliko svjetla ulazi. Za razliku od rolete, prostorija može biti u hladu, a da nije u mraku. Ugradnju vanjskih žaluzina {u} radimo po mjeri.',
      'Najviše se isplate na velikim staklenim stijenama i južnim pročeljima. Upravljaju se ručno ili motorom.',
    ],
    stavke: ['Vanjske žaluzine po mjeri', 'Zakretne aluminijske lamele', 'Ručno ili motorno upravljanje', 'Montaža i podešavanje'],
    faq: [['Žaluzine ili rolete?', 'Rolete bolje zamračuju i zatvaraju prozor. Žaluzine bolje doziraju svjetlo. Za spavaće sobe češće rolete, za dnevne boravke s velikim staklima žaluzine.']],
  },
  {
    slug: 'trakaste-zavjese', kat: 'sjenila', ime: 'Trakaste zavjese',
    kratko: 'Trakaste (vertikalne) zavjese po mjeri za velike prozore, stijene i urede.',
    uvod: [
      'Trakaste zavjese imaju okomite platnene trake koje se zakreću i razmiču. Dobro pokrivaju velike staklene plohe, balkonske stijene i uredske prozore. Ugradnju i servis trakastih zavjesa {u} radimo po mjeri.',
      'Trake se mogu skinuti i oprati ili pojedinačno zamijeniti, pa zavjesa dugo izgleda uredno.',
    ],
    stavke: ['Trakaste zavjese po mjeri', 'Montaža na strop ili zid', 'Izbor platna i boja', 'Servis: zamjena lančića, utega i nosača traka'],
    faq: [['Može li se zamijeniti samo jedna traka?', 'Može. Trake, utezi i lančići mijenjaju se pojedinačno.']],
  },
  {
    slug: 'rolo-platna', kat: 'sjenila', ime: 'Rolo platna',
    kratko: 'Rolo platna po mjeri: prozirne, zatamnjujuće ili potpuno zamračenje.',
    uvod: [
      'Rolo platna namataju se na osovinu iznad prozora i upravljaju lančićem. Ugradnju i servis rolo platna {u} radimo po mjeri, na krilo prozora, zid ili strop.',
      'Platno birate prema prostoriji: prozirnije za dnevni boravak, zatamnjujuće za radnu sobu, a blackout za spavaću i dječju sobu.',
    ],
    stavke: ['Rolo platna po mjeri', 'Prozirna, zatamnjujuća i blackout platna', 'Montaža na krilo bez bušenja gdje je moguće', 'Servis: zamjena lančića i mehanizma'],
    faq: [['Mogu li se rolo platna montirati bez bušenja?', 'Na PVC prozore najčešće mogu, nosačima koji se kače na krilo. Ovisi o profilu prozora.']],
  },
];

exports.kategorije = {
  servis: 'Servis i popravak roleta',
  nove: 'Nove rolete',
  komarnici: 'Komarnici',
  sjenila: 'Sjenila i zavjese',
};

// Tip gradnje -> rečenice o tipičnim kvarovima (za jedinstveniji tekst po kvartu)
exports.tipovi = {
  stari: 'Ovdje prevladavaju starije zgrade s visokim prozorima i roletama koje su odradile desetljeća. Najčešće mijenjamo dotrajale gurtne, osovine i ležajeve, a kod starih drvenih i plastičnih roleta često je isplativije ubaciti novi zastor u postojeću kutiju.',
  neboderi: 'Naselje čine pretežno višekatnice i neboderi s roletama u nadprozornim kutijama. Tipični pozivi su puknuta gurtna, oslabljen automat za namatanje i lamele izgorjele na sunčanoj strani zgrade. Česta je i želja da se lođa zatvori roletama.',
  novo: 'Riječ je uglavnom o novijoj gradnji s PVC stolarijom i aluminijskim roletama, često na motor. Ovdje najviše radimo podešavanje i zamjenu motora, ugradnju komarnika po mjeri te rolo platna i zavjese.',
  kuce: 'Prevladavaju obiteljske kuće s puno prozora i balkonskih vrata. Obično se odjednom rješava više roleta: zamjena gurtni po cijeloj kući, novi zastori na južnoj strani te komarnici za prozore i terasna vrata.',
  mix: 'Kvart je mješavina starijih zgrada, novijih stambenih objekata i obiteljskih kuća, pa susrećemo sve: od starih roleta s izlizanim gurtnama do novih električnih roleta kojima treba podesiti ili zamijeniti motor.',
};

// ime | lokativ | tip | skupina
const zg = `
Donji grad|u Donjem gradu|stari|Centar
Gornji grad|na Gornjem gradu|stari|Centar
Medveščak|na Medveščaku|stari|Centar
Šalata|na Šalati|stari|Centar
Tuškanac|na Tuškancu|kuce|Centar
Pantovčak|na Pantovčaku|kuce|Centar
Črnomerec|na Črnomercu|mix|Zapad
Sveti Duh|na Svetom Duhu|mix|Zapad
Kustošija|u Kustošiji|kuce|Zapad
Vrapče|u Vrapču|kuce|Zapad
Gajnice|u Gajnicama|neboderi|Zapad
Stenjevec|u Stenjevcu|mix|Zapad
Malešnica|na Malešnici|neboderi|Zapad
Špansko|u Španskom|neboderi|Zapad
Podsused|u Podsusedu|kuce|Zapad
Jankomir|na Jankomiru|mix|Zapad
Trešnjevka|na Trešnjevci|mix|Trešnjevka
Knežija|na Knežiji|neboderi|Trešnjevka
Jarun|na Jarunu|neboderi|Trešnjevka
Vrbani|na Vrbanima|novo|Trešnjevka
Prečko|u Prečkom|neboderi|Trešnjevka
Rudeš|na Rudešu|mix|Trešnjevka
Voltino|na Voltinom|mix|Trešnjevka
Ljubljanica|na Ljubljanici|mix|Trešnjevka
Staglišće|na Staglišću|neboderi|Trešnjevka
Srednjaci|na Srednjacima|neboderi|Trešnjevka
Gredice|na Gredicama|neboderi|Trešnjevka
Trnje|na Trnju|mix|Trnje
Vrbik|na Vrbiku|neboderi|Trnje
Savica|na Savici|neboderi|Trnje
Cvjetno naselje|u Cvjetnom naselju|mix|Trnje
Kruge|na Krugama|mix|Trnje
Folnegovićevo naselje|u Folnegovićevom naselju|neboderi|Trnje
Siget|u Sigetu|neboderi|Novi Zagreb
Sopot|u Sopotu|neboderi|Novi Zagreb
Utrina|u Utrini|neboderi|Novi Zagreb
Zapruđe|u Zapruđu|neboderi|Novi Zagreb
Travno|u Travnom|neboderi|Novi Zagreb
Dugave|u Dugavama|neboderi|Novi Zagreb
Sloboština|u Sloboštini|neboderi|Novi Zagreb
Središće|u Središću|novo|Novi Zagreb
Trnsko|u Trnskom|neboderi|Novi Zagreb
Kajzerica|na Kajzerici|novo|Novi Zagreb
Lanište|na Laništu|novo|Novi Zagreb
Remetinec|u Remetincu|mix|Novi Zagreb
Savski gaj|u Savskom gaju|neboderi|Novi Zagreb
Blato|u Blatu|kuce|Novi Zagreb
Botinec|u Botincu|kuce|Novi Zagreb
Sveta Klara|u Svetoj Klari|kuce|Novi Zagreb
Odra|u Odri|kuce|Novi Zagreb
Brezovica|u Brezovici|kuce|Novi Zagreb
Lučko|u Lučkom|kuce|Novi Zagreb
Maksimir|na Maksimiru|mix|Istok
Ravnice|na Ravnicama|mix|Istok
Borongaj|na Borongaju|mix|Istok
Peščenica|na Peščenici|mix|Istok
Volovčica|na Volovčici|neboderi|Istok
Ferenščica|na Ferenščici|mix|Istok
Žitnjak|na Žitnjaku|kuce|Istok
Bukovac|na Bukovcu|kuce|Istok
Remete|u Remetama|kuce|Istok
Dubrava|u Dubravi|mix|Dubrava
Gornja Dubrava|u Gornjoj Dubravi|mix|Dubrava
Donja Dubrava|u Donjoj Dubravi|mix|Dubrava
Klaka|na Klaki|neboderi|Dubrava
Poljanice|na Poljanicama|neboderi|Dubrava
Studentski grad|u Studentskom gradu|neboderi|Dubrava
Retkovec|u Retkovcu|kuce|Dubrava
Trnava|u Trnavi|kuce|Dubrava
Čulinec|u Čulincu|kuce|Dubrava
Miroševec|u Miroševcu|kuce|Dubrava
Granešina|u Granešini|kuce|Dubrava
Šestine|u Šestinama|kuce|Podsljeme
Gračani|u Gračanima|kuce|Podsljeme
Mlinovi|na Mlinovima|kuce|Podsljeme
Markuševec|u Markuševcu|kuce|Podsljeme
Vrhovec|na Vrhovcu|kuce|Podsljeme
Sesvete|u Sesvetama|mix|Sesvete i okolica
Novi Jelkovec|u Novom Jelkovcu|novo|Sesvete i okolica
Sesvetski Kraljevec|u Sesvetskom Kraljevcu|kuce|Sesvete i okolica
Dugo Selo|u Dugom Selu|kuce|Sesvete i okolica
Sveta Nedelja|u Svetoj Nedelji|kuce|Sesvete i okolica
Velika Gorica|u Velikoj Gorici|mix|Sesvete i okolica|Na područje Velike Gorice izlazimo po dogovoru.
`;
const ka = `
Zvijezda|u Zvijezdi|stari|Središte
Novi centar|u Novom centru|neboderi|Središte
Banija|na Baniji|mix|Središte
Gaza|na Gazi|mix|Središte
Rakovac|na Rakovcu|mix|Središte
Grabrik|na Grabriku|neboderi|Središte
Luščić|na Luščiću|neboderi|Središte
Dubovac|na Dubovcu|kuce|Zapad i jug
Švarča|na Švarči|mix|Zapad i jug
Mala Švarča|na Maloj Švarči|kuce|Zapad i jug
Jamadol|na Jamadolu|kuce|Zapad i jug
Borlin|na Borlinu|kuce|Zapad i jug
Udbinja|na Udbinji|kuce|Zapad i jug
Mostanje|u Mostanju|kuce|Zapad i jug
Turanj|na Turnju|kuce|Zapad i jug
Logorište|na Logorištu|kuce|Zapad i jug
Kamensko|u Kamenskom|kuce|Zapad i jug
Drežnik|na Drežniku|mix|Sjever i istok
Hrnetić|u Hrnetiću|kuce|Sjever i istok
Orlovac|na Orlovcu|kuce|Sjever i istok
Gornje Mekušje|u Gornjem Mekušju|kuce|Sjever i istok
Donje Mekušje|u Donjem Mekušju|kuce|Sjever i istok
Mahično|u Mahičnom|kuce|Sjever i istok
Velika Jelsa|u Velikoj Jelsi|kuce|Sjever i istok
`;

const slugify = (s) => s.toLowerCase()
  .replace(/č|ć/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/đ/g, 'dj')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
exports.slugify = slugify;

const parse = (txt, grad) => txt.trim().split('\n').map((l) => {
  const [ime, lok, tip, skupina, napomena] = l.split('|');
  return { ime, lok, tip, skupina, napomena: napomena || '', grad, slug: slugify(ime) };
});
exports.lokacije = [...parse(zg, 'zagreb'), ...parse(ka, 'karlovac')];

exports.faqOpci = [
  ['Koliko košta zamjena gurtne (trake) na roleti?', 'Zamjena gurtne košta 30 – 40 €.'],
  ['Koliko brzo dolazite nakon poziva?', 'U Zagrebu najčešće unutar 24 do 48 sati, a kad raspored dopusti i isti ili idući dan. U Karlovcu izlazimo po dogovoru, najčešće jednom tjedno, četvrtkom ili petkom.'],
  ['Popravljate li rolete svih proizvođača?', 'Da, servisiramo PVC i aluminijske rolete svih proizvođača.'],
  ['Isplati li se popravak ili je bolje ugraditi novu roletu?', 'Ovisi o stanju rolete, koje procijenimo na licu mjesta. Ako se popravak ne isplati, to kažemo odmah.'],
  ['Može li se na postojeću roletu ugraditi motor?', 'Ne na svaku. Ovisi o osovini, kutiji i dovodu struje, pa procjenu dajemo nakon pregleda.'],
  ['Koliko košta zamjena mreže na komarniku?', 'Mreža se ne može zasebno zamijeniti. Popravlja se mehanizam komarnika; ako je mreža poderana, izrađuje se novi komarnik.'],
  ['Radite li vikendom?', 'Po potrebi i dogovoru. Nedjeljom i blagdanom ne radimo.'],
  ['Koja područja pokrivate?', 'Zagreb sa svim kvartovima, Sesvete, Dugo Selo i Svetu Nedelju, Veliku Goricu po dogovoru te grad Karlovac.'],
];
