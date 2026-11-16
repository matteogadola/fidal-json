# fidal-json

Script non ufficiale per estrarre e normalizzare i dati delle società affiliate a FIDAL (Federazione Italiana di Atletica Leggera) dal sito [fidal.it](https://www.fidal.it/regioni.php).

Lo script `fetch-data.js` consulta gli elenchi regionali e genera due file JSON nella directory `data/`. Lo scopo è normalizzare i dati e rendere i dati delle società riutilizzabili in datalist/autocomplete.

La normalizzazione dei nomi riduce le sequenze di spazi, rimuove i caratteri diversi da lettere ASCII, numeri e spazi, ed elimina gli spazi iniziali e finali. Il nome originale viene conservato nel campo `nameOrig` di `clubs.json`.

## Dataset ed esempi

### `clubs.json`

Contiene le informazioni estratte per oltre 2.500 società: codice identificativo (`id`), nome normalizzato (`name`), nome originale (`nameOrig`), regione (`region`), provincia (`province`) e città (`city`).

```json
[
  {
    "id": "MI901",
    "name": "ASD ATLETICA VALLE CHIARA",
    "nameOrig": "A.S.D. ATLETICA VALLE CHIARA",
    "region": "Lombardia",
    "province": "Milano",
    "city": "Milano"
  },
  {
    "id": "TN902",
    "name": "GS PODISTI MONTE SERENO",
    "nameOrig": "G.S. PODISTI MONTE SERENO",
    "region": "Trentino",
    "province": "Trento",
    "city": "Rovereto"
  },
  {
    "id": "FI903",
    "name": "POL DILETTANTISTICA BORGO VERDE",
    "nameOrig": "POL. DILETTANTISTICA BORGO VERDE",
    "region": "Toscana",
    "province": "Firenze",
    "city": "Empoli"
  }
]
```

### `names.json`

Contiene soltanto i nomi normalizzati delle società, senza duplicati, in un array di stringhe.

```json
["ASD ATLETICA VALLE CHIARA","GS PODISTI MONTE SERENO","POL DILETTANTISTICA BORGO VERDE"]
```
