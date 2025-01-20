const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');

const REGIONS = [
  { id: 'ABR', name: 'Abruzzo' },
  { id: 'BZ', name: 'Alto Adige' },
  { id: 'BAS', name: 'Basilicata' },
  { id: 'CAL', name: 'Calabria' },
  { id: 'CAM', name: 'Campania' },
  { id: 'EMI', name: 'Emilia Romagna' },
  { id: 'FVG', name: 'Friuli Venezia Giulia' },
  { id: 'LAZ', name: 'Lazio' },
  { id: 'LIG', name: 'Liguria' },
  { id: 'LOM', name: 'Lombardia' },
  { id: 'MAR', name: 'Marche' },
  { id: 'MOL', name: 'Molise' },
  { id: 'PIE', name: 'Piemonte' },
  { id: 'PUG', name: 'Puglia' },
  { id: 'SAR', name: 'Sardegna' },
  { id: 'SIC', name: 'Sicilia' },
  { id: 'TOS', name: 'Toscana' },
  { id: 'TN', name: 'Trentino' },
  { id: 'UMB', name: 'Umbria' },
  { id: 'VAO', name: 'Valle d\'Aosta' },
  { id: 'VEN', name: 'Veneto' },
];

(async () => {
  const { JSDOM } = jsdom;
  const clubs = [];
  const names = new Set();

  for (const region of REGIONS) {
    try {
      const res = await fetch(`https://www.fidal.it/mappa.php?x=1&regione=${region.id}`);

      const data = await res.text();
      const dom = new JSDOM(data);
      const nodes = dom.window.document.querySelectorAll('div[class="table_btm"');

      for(var i = 0; i < nodes.length; i++) {
        const province = nodes[i].previousSibling.textContent;
        const dati = nodes[i].getElementsByTagName('tr');

        for(var j = 0; j < dati.length; j++) {
          const valori = dati[j].getElementsByTagName('td');
          const name = valori?.[1]?.textContent?.replace(/\s\s+/g, ' ')?.replace(/[^a-zA-Z0-9 ]/g, '')?.trim()

          if (!name || !valori[0]?.textContent || !valori[2]?.textContent){
            continue;
          }

          clubs.push({
            id: valori[0].textContent,
            name: name,
            nameRaw: valori[1].textContent,
            region: region.name,
            province: province,
            city: valori[2].textContent
          })

          names.add(name);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  await fs.writeFileSync(path.join('data', 'clubs.json'), JSON.stringify(clubs), 'utf8');
  await fs.writeFileSync(path.join('data', 'names.json'), JSON.stringify(Array.from(names)), 'utf8');
})();
