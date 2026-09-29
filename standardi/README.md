# Standardi

Ovde idu MD kartice domaćih i međunarodnih standarda iz oblasti HVAC, protivpožarne zaštite i srodnih oblasti.

> Kartice su **sažeci BBD-a pisani sopstvenim rečima**, sa pozivima na tačke i strane originala. Ne sadrže prepisan tekst standarda. Za projektovanje uvek proveriti original.

## Grupe

| Folder | Grupa | Napomena |
|---|---|---|
| `EN/` | Evropski standardi (EN, uključujući SRPS EN) | Izvor: ISS čitaonica, pretplata IKS |
| `ASHRAE/` | ASHRAE standardi i priručnici | |
| `BS/` | Britanski standardi (BS) | |
| `NFPA/` | NFPA standardi | |
| `IBC/` | International Building Code (ICC) | |
| `SNIP/` | Ruski normativi СНиП / СП | |
| `DIN/` | Nemački standardi DIN (i VDI smernice) | |

## Pravila imenovanja

- Jedna kartica = jedan standard = jedan MD fajl.
- Naziv fajla: oznaka standarda bez razmaka i dvotačke, sa godinom izdanja.
  - Primeri: `SRPS-EN-12101-13-2022.md`, `ASHRAE-62.1-2022.md`, `NFPA-92-2021.md`.
- Svaka kartica počinje YAML zaglavljem: `oznaka`, `izdanje`, `zamenjuje`, `oblast`, `izvor`, `datum_kartice`.
- Kada grupa naraste, standardi se razvrstavaju u podfoldere po seriji (npr. `EN/12101-kontrola-dima/`).

## Spisak kartica

| Standard | Naziv | Folder |
|---|---|---|
| SRPS EN 12101-13:2022 | Sistemi za kontrolu dima i toplote — Deo 13: Sistemi sa natpritiskom (PDS) | `EN/` |
| SRPS CEN/TR 12101-5:2009 | Sistemi za kontrolu dima i toplote — Deo 5: Smernice za rad i proračun SHEVS (tehnički izveštaj) | `EN/` |
