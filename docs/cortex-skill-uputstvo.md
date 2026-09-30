# BBD Cortex skill — uputstvo za kolege

Skill omogućava da u svom Claude nalogu (Pro) postavljaš pitanja o propisima, standardima i knjigama iz BBD Cortex baze. Odgovori citiraju propis i član.

## Instalacija (jednom, ~2 min)

1. claude.ai → **Settings → Capabilities** → uključi **Code execution and file creation** (bez toga skill-ovi ne rade).
2. Otvori https://cortex.bbdcons.com i preuzmi **BBD Cortex skill (ZIP)**. ZIP ne raspakuj.
3. claude.ai → **Customize → Skills → + → Upload a skill** → izaberi preuzeti ZIP.
4. Proveri da je skill **cortex-qa** uključen.
5. Test u novom chatu: *„Koliko izmena vazduha treba sistem za odvođenje dima u podzemnoj garaži?"* — odgovor treba da citira Pravilnik o garažama, čl. 45.

Skill radi na webu, u desktop aplikaciji i na telefonu.

## Ažuriranje

Na kraju svakog odgovora piše **Verzija baze**. Kada je na cortex.bbdcons.com novija verzija: preuzmi novi ZIP, u Customize → Skills obriši stari `cortex-qa` i uploaduj novi.

## Kako pitati

- Konkretno: vrsta objekta, veličina, sistem („podzemna garaža 3.000 m²", „stambena zgrada visine 45 m").
- Možeš tražiti ceo član: *„Prikaži ceo član 45 pravilnika o garažama."*
- Možeš tražiti pregled: *„Koji su dokumenti u Cortex bazi?"*

## Važno

- Odgovor je pomoć pri radu, ne zamena za proveru u originalnom propisu/standardu i stručnu odgovornost projektanta.
- „Nema u BBD Cortex bazi" znači da dokument nije unet — javi Borivoju šta nedostaje.
