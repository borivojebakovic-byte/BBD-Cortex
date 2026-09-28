# Chapter 29 — Refrigerants

*Izvor: 2021 ASHRAE Handbook — Fundamentals (SI), Chapter 29 (PDF str. 790–801).*

> **Napomena o konverziji:** Tekst je automatski izdvojen iz originalnog PDF-a uz prepoznavanje dve kolone, spojene prelomljene reči i pasuse. Indeksi i eksponenti su označeni sa `<sub>`/`<sup>`, tabele su pretvorene u Markdown tabele (veoma složene tabele su prikazane kao poravnat tekst), a slike su izrezane iz PDF-a u folder `img/`. Složene jednačine (razlomci, sume) mogu biti uprošćeno prikazane. **Pre upotrebe vrednosti u proračunu proveriti u originalnom PDF-u.** Oznake `<!-- str. N -->` pokazuju stranu PDF-a.

## Sadržaj

- [1. REFRIGERANT PROPERTIES](#1-refrigerant-properties)
- [2. REFRIGERANT PERFORMANCE](#2-refrigerant-performance)
- [3. SAFETY](#3-safety)
- [4. LEAK DETECTION](#4-leak-detection)
- [5. COMPATIBILITY WITH CONSTRUCTION MATERIALS](#5-compatibility-with-construction-materials)
- [REFERENCES](#references)
- [BIBLIOGRAPHY](#bibliography)

<!-- str. 790 -->

REFRIGERANTS are the working fluids in refrigeration, air-conditioning, and heat-pumping systems. They absorb heat from one area, such as an air-conditioned space, and reject it into another, such as outdoors, usually through evaporation and condensation, respectively. These phase changes occur both in absorption and mechanical vapor compression systems, but not in systems operating on a gas cycle using a fluid such as air. (See Chapter 2 for more information on refrigeration cycles.) The design of the refrigeration equipment depends strongly on the selected refrigerant’s properties. Tables 1 and 2 list standard refrigerant designations, some properties, and safety classifications from ASHRAE Standard 34.

Refrigerant selection involves compromises between conflicting desirable thermophysical properties. A refrigerant must satisfy many requirements, some of which do not directly relate to its ability to transfer heat. Chemical stability under conditions of use is an essential characteristic. Safety codes may require a nonflammable refrigerant of low toxicity for some applications. Environmental consequences of refrigerant leaks must also be considered. Cost, availability, efficiency, compatibility with compressor lubricants and equipment materials, and local and national regulations are other concerns.

Latent heat of vaporization is another important property. On a molar basis, fluids with similar boiling points have almost the same latent heat. Because compressor displacement is defined on a volumetric basis, refrigerants with similar boiling points produce similar refrigeration effect with a given compressor. On a mass basis, latent heat varies widely among fluids. Efficiency of a theoretical vapor compression cycle is maximized by fluids with low vapor heat capacity. This property is associated with fluids having a simple molecular structure and low molecular mass.

Transport properties (e.g., thermal conductivity and viscosity) affect performance of heat exchangers and piping. High thermal conductivity and low viscosity are desirable.

No single fluid satisfies all the attributes desired of a refrigerant; consequently, various refrigerants are used. This chapter describes the basic characteristics of various refrigerants, and Chapter 30 lists thermophysical properties.

## 1. REFRIGERANT PROPERTIES

### Global Environmental Properties

Chlorofluorocarbons (CFCs) and hydrochlorofluorocarbons (HCFCs) can affect both stratospheric ozone and climate change, whereas hydrofluorocarbons (HFCs) can affect climate change. Minimizing all refrigerant releases from systems is important not only because of environmental impacts, but also because charge losses lead to insufficient system charge levels, which in turn result in suboptimal operation and lowered efficiency.

**Stratospheric Ozone Depletion.** The stratospheric ozone layer filters out the UV-B portion of the sun’s ultraviolet (UV) radiation. Overexposure to this radiation increases the risk of skin cancer, cataracts, and impaired immune systems. It also can damage sensitive crops, reduce crop yields, and stress marine phytoplankton (and thus human food supplies from the oceans). In addition, exposure to UV radiation degrades plastics and wood.

<sub>The preparation of this chapter is assigned to TC 3.1, Refrigerants and Secondary Coolants.</sub>

Stratospheric ozone depletion has been linked to the presence of chlorine and bromine in the stratosphere. Chemicals with long atmospheric lifetimes can migrate to the stratosphere, where the molecules break down from interaction with ultraviolet light or through chemical reaction. Chemicals such as CFCs and HCFCs release chlorine, which reacts with stratospheric ozone.

Ozone-depleting substances, including CFCs and HCFCs, are to be phased out of production under the Montreal Protocol (UNEP 2009). In the United States, production and importation of CFCs were banned completely in 1996. HCFCs are being phased down, with complete phaseout set for 2030. In 2010, to meet the Montreal Protocol phasedown schedule, U.S. regulations banned production and importation of HCFC-142b and HCFC-22 for use in new equipment. Reclaimed CFC and HCFC refrigerants that meet the requirements of AHRI Standard 700 can continue to be used for servicing existing systems. A complete list of U.S. regulations for CFC and HCFC refrigerants, including phaseout schedules, may be found at www.epa.gov/ozone-layer-protection. A summary of the phaseout schedules for CFCs and HCFCs for both developed and developing countries may be found at www.unep.org/ozonaction/topics/hcfc .asp.

**Global Climate Change.** The average global temperature is determined by the balance of energy from the sun heating the earth and its atmosphere and of energy radiated from the earth and the atmosphere to space. **Greenhouse gases (GHGs)**, such as CO<sub>2</sub> and water vapor, as well as small particles trap heat at and near the surface, maintaining the average temperature of the Earth’s surface about 34 K warmer than would be the case if these gases and particles were not present (the **greenhouse effect**).

**Global warming** (also called **global climate change**) is a concern because of an increase in the greenhouse effect from increasing concentrations of GHGs attributed to human activities. The major GHG of concern is CO<sub>2</sub> released to the atmosphere when fossil fuels (coal, oil, and natural gas) are burned for energy. Methane (CH<sub>4</sub>), nitrous oxide (N<sub>2</sub>O), CFCs, HCFCs, HFCs, hydrofluoroethers (HFEs), hydrofluoro-olefins (HFOs), perfluorocarbons (PFCs), nitrogen trifluoride (NF<sub>3</sub>), and sulfur hexafluoride (SF<sub>6</sub>) are also GHGs.

In 1988, the United Nations Environment Programme (UNEP) and the World Meteorological Organization (WMO) established the Intergovernmental Panel on Climate Change (IPCC) to provide an objective source of information about the causes of climate change, its potential environmental and socioeconomic consequences, and the adaptation and mitigation options to respond to it. According to the IPCC (2014), atmospheric concentration of carbon dioxide has increased by more than 40% over the past 250 years, primarily from burning fossil fuels, with some contribution from forestry and land use. Concentration of methane has increased by over 150%, and of nitrous oxide by about 20%. IPCC (2014) deems atmospheric concentrations of fluorochemicals, including fluorocarbon gases (CFCs, HCFCs, and HFCs) and sulfur hexafluoride, to be about 2% of the 2010 GHG (CO<sub>2</sub> equivalent) emissions.

<!-- str. 791 -->

**Table 1 Refrigerant Data and Safety Classifications**

| Refrigerant Number Chemical Name<sup>a,b</sup> | Chemical Formula<sup>a</sup> | Molecular Mass<sup>a</sup> | Normal Boiling Point,<sup>a</sup> °C | Safety Group |
|---|---|---|---|---|
| Methane Series |  |  |  |  |
| 11 Trichlorofluoromethane | CCl<sub>3</sub>F | 137.4 | 24 | A1 |
| 12 Dichlorodifluoromethane | CCl<sub>2</sub>F<sub>2</sub> | 120.9 | –30 | A1 |
| 12B1 Bromochlorodifluoromethane | CBrClF<sub>2</sub> | 165.4 | –4 |  |
| 13 Chlorotrifluoromethane | CClF<sub>3</sub> | 104.5 | –81 | A1 |
| 13B1 Bromotrifluoromethane | CBrF<sub>3</sub> | 148.9 | –58 | A1 |
| 14 Tetrafluoromethane (carbon tetrafluoride) | CF<sub>4</sub> | 88.0 | –128 | A1 |
| 21 Dichlorofluoromethane | CHCl<sub>2</sub>F | 102.9 | 9 | B1 |
| 22 Chlorodifluoromethane | CHClF<sub>2</sub> | 86.5 | –41 | A1 |
| 23 Trifluoromethane | CHF<sub>3</sub> | 70.0 | –82 | A1 |
| 30 Dichloromethane (methylene chloride) | CH<sub>2</sub>Cl<sub>2</sub> | 84.9 | 40 | B2 |
| 31 Chlorofluoromethane | CH<sub>2</sub>ClF | 68.5 | –9 |  |
| 32 Difluoromethane (methylene fluoride) | CH<sub>2</sub>F<sub>2</sub> | 52.0 | –52 | A2L |
| 40 Chloromethane (methyl chloride) | CH<sub>3</sub>Cl | 50.4 | –24 | B2 |
| 41 Fluoromethane (methyl fluoride) | CH<sub>3</sub>F | 34.0 | –78 |  |
| 50 Methane | CH<sub>4</sub> | 16.0 | –161 | A3 |
| Ethane Series |  |  |  |  |
| 113 1,1,2-trichloro-1,2,2-trifluoroethane | CCl<sub>2</sub>FCClF<sub>2</sub> | 187.4 | 48 | A1 |
| 114 1,2-dichloro-1,1,2,2-tetrafluoroethane | CClF<sub>2</sub>CClF<sub>2</sub> | 170.9 | 4 | A1 |
| 115 Chloropentafluoroethane | CClF<sub>2</sub>CF<sub>3</sub> | 154.5 | –39 | A1 |
| 116 Hexafluoroethane | CF<sub>3</sub>CF<sub>3</sub> | 138.0 | –78 | A1 |
| 123 2,2-dichloro-1,1,1-trifluoroethane | CHCl<sub>2</sub>CF<sub>3</sub> | 153.0 | 27 | B1 |
| 124 2-chloro-1,1,1,2-tetrafluoroethane | CHClFCF<sub>3</sub> | 136.5 | –12 | A1 |
| 125 Pentafluoroethane | CHF<sub>2</sub>CF<sub>3</sub> | 120.0 | –48 | A1 |
| 134a 1,1,1,2-tetrafluoroethane | CH<sub>2</sub>FCF<sub>3</sub> | 102.0 | –26 | A1 |
| 141b 1,1-dichloro-1-fluoroethane | CH<sub>3</sub>CCl<sub>2</sub>F | 117.0 | 32 |  |
| 142b 1-chloro-1,1-difluoroethane | CH<sub>3</sub>CClF<sub>2</sub> | 100.5 | –10 | A2 |
| 143a 1,1,1-trifluoroethane | CH<sub>3</sub>CF<sub>3</sub> | 84.0 | –47 | A2L |
| 152a 1,1-difluoroethane | CH<sub>3</sub>CHF<sub>2</sub> | 66.0 | –24 | A2 |
| 170 Ethane | CH<sub>3</sub>CH<sub>3</sub> | 30.0 | –89 | A3 |
| Ethers |  |  |  |  |
| E170 Dimethyl ether | CH<sub>3</sub>OCH<sub>3</sub> | 46.0 | –25 | A3 |
| Propane Series |  |  |  |  |
| 218 Octafluoropropane | CF<sub>3</sub>CF<sub>2</sub>CF<sub>3</sub> | 188.0 | –37 | A1 |
| 227ea 1,1,1,2,3,3,3-heptafluoropropane | CF<sub>3</sub>CHFCF<sub>3</sub> | 170.0 | –16 | A1 |
| 236fa 1,1,1,3,3,3-hexafluoropropane | CF<sub>3</sub>CH<sub>2</sub>CF<sub>3</sub> | 152.0 | –1 | A1 |
| 245fa 1,1,1,3,3-pentafluoropropane | CF<sub>3</sub>CH<sub>2</sub>CHF<sub>2</sub> | 134.0 | 15 | B1 |
| 290 Propane | CH<sub>3</sub>CH<sub>2</sub>CH<sub>3</sub> | 44.0 | –42 | A3 |
| Cyclic Organic Compounds (see Table 2 for blends) |  |  |  |  |
| C318 Octafluorocyclobutane | –(CF<sub>2</sub>)<sub>4</sub>– | 200.0 | –6 | A1 |
| Miscellaneous Organic Compounds |  |  |  |  |
| Hydrocarbons |  |  |  |  |
| 600 Butane | CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>CH<sub>3</sub> | 58.1 | 0 | A3 |
| 600a 2-methylpropane (isobutane) | CH(CH<sub>3</sub>)<sub>2</sub>CH<sub>3</sub> | 58.1 | –12 | A3 |
| 601 Pentane | CH<sub>3</sub>(CH<sub>2</sub>)<sub>3</sub>CH<sub>3</sub> | 72.15 | 36.1 | A3 |
| 601a 2-methylbutane (isopentane) | (CH<sub>3</sub>)<sub>2</sub>CHCH<sub>2</sub>CH<sub>3</sub> | 72.15 | 27.8 | A3 |
| Oxygen Compounds |  |  |  |  |
| 610 Ethyl ether | CH<sub>3</sub>CH<sub>2</sub>OCH<sub>2</sub>CH<sub>3</sub> | 74.1 | 35 |  |
| 611 Methyl formate | HCOOCH<sub>3</sub> | 60.0 | 32 | B2 |
| Sulfur Compounds |  |  |  |  |
| 620 (Reserved for future assignment) |  |  |  |  |
| Nitrogen Compounds |  |  |  |  |
| 630 Methanamine (methyl amine) | CH<sub>3</sub>NH<sub>2</sub> | 31.1 | –7 |  |
| 631 Ethanamine (ethyl amine) | CH<sub>3</sub>CH<sub>2</sub>(NH<sub>2</sub>) | 45.1 | 17 |  |

<!-- str. 792 -->

**Table 1 Refrigerant Data and Safety Classifications (Continued)**

| Refrigerant Number Chemical Name<sup>a,b</sup> | Chemical Formula<sup>a</sup> | Molecular Mass<sup>a</sup> | Normal Boiling Point,<sup>a</sup> °C | Safety Group |
|---|---|---|---|---|
| Inorganic Compounds |  |  |  |  |
| 702 Hydrogen | H<sub>2</sub> | 2.0 | –253 | A3 |
| 704 Helium | He | 4.0 | –269 | A1 |
| 717 Ammonia | NH<sub>3</sub> | 17.0 | –33 | B2L |
| 718 Water | H<sub>2</sub>O | 18.0 | 100 | A1 |
| 720 Neon | Ne | 20.2 | –246 | A1 |
| 728 Nitrogen | N<sub>2</sub> | 28.1 | –196 | A1 |
| 732 Oxygen | O<sub>2</sub> | 32.0 | –183 |  |
| 740 Argon | Ar | 39.9 | –186 | A1 |
| 744 Carbon dioxide | CO<sub>2</sub> | 44.0 | –78<sup>c</sup> | A1 |
| 744A Nitrous oxide | N<sub>2</sub>O | 44.0 | –90 |  |
| 764 Sulfur dioxide | SO<sub>2</sub> | 64.1 | –10 | B1 |
| Unsaturated Organic Compounds |  |  |  |  |
| 1150 Ethene (ethylene) | CH<sub>2</sub>=CH<sub>2</sub> | 28.1 | –104 | A3 |
| 1233zd(E) Trans-1-chloro-3,3,3-trifluoro-1-propene | CF<sub>3</sub>CH=CHCl | 130.5 | 18 | A1 |
| 1234yf 2,3,3,3-tetrafluoro-1-propene | CF<sub>3</sub>CF=CH<sub>2</sub> | 114.0 | –29.4 | A2L |
| 1234ze(E) Trans-1,3,3,3-tetrafluoro-1-propene | CF<sub>3</sub>CH=CHF | 114.0 | –19.0 | A2L |
| 1270 Propene (propylene) | CH<sub>3</sub>CH=CH<sub>2</sub> | 42.1 | –48 | A3 |
| 1336mzz(Z) Cis-1,1,1,4,4,4-hexafluoro-2-butene | CF<sub>3</sub>CH=CHCF<sub>3</sub> | 164.1 | 33 | A1 |

Source: ANSI/ASHRAE Standard 34-2010.

<sup>a</sup>Chemical name, chemical formula, molecular mass, and normal boiling point are not <sup>b</sup>Preferred chemical name is followed by the popular name in parentheses. part of this standard. <sup>c</sup>Sublimes.

**Table 2 Data and Safety Classifications for Refrigerant Blends**

| Refrig. No. | Composition (Mass %) | Composition Tolerances | Molec- Normal Mass<sup>a</sup> Point, °CPoint, °C Group<br>ular | Molec- Normal Mass<sup>a</sup> Point, °CPoint, °C Group<br>Bubble | Mass<sup>a</sup> Point, °CPoint, °C Group<br>Normal Dew | Mass<sup>a</sup> Point, °CPoint, °C Group<br>Safety |
|---|---|---|---|---|---|---|
| **Zeotropes** |  |  |  |  |  |  |
| 400 | R-12/114 (must be specified) |  |  |  |  | A1 |
| 401A | R-22/152a/124 (53.0/13.0/34.0) | (±2.0 /+0.5,–1.5/±1.0) | 94.4 | –34.4 | –28.8 | A1 |
| 401B | R-22/152a/124 (61.0/11.0/28.0) | (±2/+0.5,–1.5/±1.0) | 92.8 | –35.7 | –30.8 | A1 |
| 401C | R-22/152a/124 (33.0/15.0/52.0) | (±2/+0.5,–1.5/±1.0) | 101 | –30.5 | –23.8 | A1 |
| 402A | R-125/290/22 (60.0/2.0/38.0) | (±2.0/+0.1,–1.0/±2.0) | 101.6 | –49.2 | –47.0 | A1 |
| 402B | R-125/290/22 (38.0/2.0/60.0) | (±2/+0.1,–1/±2) | 94.7 | –47.2 | –44.9 | A1 |
| 403A | R-290/22/218 (5.0/75.0/20.0) | (+0.2,–2/±2/±2) | 92 | –44.0 | –42.3 | A1 |
| 403B | R-290/22/218 (5.0/56.0/39.0) | (+0.2,–2/±2/±2) | 103.3 | –43.8 | –42.3 | A1 |
| 404A | R-125/143a/134a (44.0/52.0/4.0) | (±2/±1/±2) | 97.6 | –46.6 | –45.8 | A1 |
| 405A | R-22/152a/142b/C318 (45.0/7.0/5.5/42.5) | (±2/±1/±1 /±2) sum of R-152a and R-142b = (+0.0, –2.0) | 111.9 | –32.9 | –24.5 |  |
| 406A | R-22/600a/142b (55.0/4.0/41.0) | (±2/±1/±1) | 89.9 | –32.7 | –23.5 | A2 |
| 407A | R-32/125/134a (20.0/40.0/40.0) | (±2/±2/±2) | 90.1 | –45.2 | –38.7 | A1 |
| 407B | R-32/125/134a (10.0/70.0/20.0) | (±2/±2/±2) | 102.9 | –46.8 | –42.4 | A1 |
| 407C | R-32/125/134a (23.0/25.0/52.0) | (±2/±2/±2) | 86.2 | –43.8 | –36.7 | A1 |
| 407D | R-32/125/134a (15.0/15.0/70.0) | (±2/±2/±2) | 91 | –39.4 | –32.7 | A1 |
| 407E | R-32/125/134a (25.0/15.0/60.0) | (±2,±2,±2) | 83.8 | –42.8 | –35.6 | A1 |
| 407F | R-32/125/134a (30.0/30.0/40.0) | (±2,±2,±2) | 82.1 | –46.1 | –39.7 | A1 |
| 408A | R-125/143a/22 (7.0/46.0/47.0) | (±2/±1/±2) | 87 | –45.5 | –45.0 | A1 |
| 409A | R-22/124/142b (60.0/25.0/15.0) | (±2/±2/±1) | 97.4 | –35.4 | –27.5 | A1 |
| 409B | R-22/124/142b (65.0/25.0/10.0) | (±2/±2/±1) | 96.7 | –36.5 | –29.7 | A1 |
| 410A | R-32/125 (50.0/50.0) | (+0.5,–1.5/+1.5,–0.5) | 72.6 | –51.6 | –51.5 | A1 |
| 410B | R-32/125 (45.0/55.0) | (±1/±1) | 75.6 | –51.5 | –51.4 | A1 |
| 411A | R-1270/22/152a (1.5/87.5/11.0) | (+0,–1/+2,–0/+0,–1) | 82.4 | –39.7 | –37.2 | A2 |
| 411B | R-1270/22/152a (3.0/94.0/3.0) | (+0,–1/+2,–0/+0,–1) | 83.1 | –41.6 | –41.3 | A2 |
| 412A | R-22/218/142b (70.0/5.0/25.0) | (±2/±2/±1) | 92.2 | –36.4 | –28.8 | A2 |
| 413A | R-218/134a/600a (9.0/88.0/3.0) | (±1/±2/±0,–1) | 104 | –29.3 | –27.6 | A2 |
| 414A | R-22/124/600a/142b (51.0/28.5/4.0/16.5) | (±2/±2/±0.5/+0.5,–1) | 96.9 | –34.0 | –25.8 | A1 |
| 414B | R-22/124/600a/142b (50.0/39.0/1.5/9.5) | (±2/±2/±0.5/+0.5,–1) | 101.6 | –34.4 | –26.1 | A1 |
| 415A | R-22/152a (82.0/18.0) | (±1/±1) | 81.9 | –37.5 | –34.7 | A2 |
| 415B | R-22/152a (25.0/75.0) | (±1/±1) | 70.2 | –27.7 | –26.2 | A2 |
| 416A | R-134a/124/600 (59.0/39.5/1.5) | (+0.5,–1/+1,–0.5/+1,–0.2) | 111.9 | –23.4 | –21.8 | A1 |
| 417A | R-125/134a/600 (46.6/50.0/3.4) | (±1.1/±1/+0.1,–0.4) | 106.7 | –38.0 | –32.9 | A1 |
| 417B | R-125/134a/600 (79.0/18.3/2.7) | (±1/±1/+0.1,–0.5) | 113.1 | –44.9 | –41.5 | A1 |
| 418A | R-290/22/152a (1.5/96.0/2.5) | (±0.5/±1/±0.5 | 84.6 | –41.2 | –40.1 | A2 |
| 419A | R-125/134a/E170 (77.0/19.0/4.0) | (±1/±1/±1) | 109.3 | –42.6 | –36.0 | A2 |
| 420A | R-134a/142b (88.0/12.0) | (±1,–0/+0,–1) | 101.8 | –25.0 | –24.2 | A1 |
| 421A | R-125/134a (58.0/42.0) | (±1/±1) | 111.8 | –40.8 | –35.5 | A1 |

<!-- str. 793 -->

**Table 2 Data and Safety Classifications for Refrigerant Blends (Continued)**

```text
                                                                                                          Molec- Normal    Normal
Refrig.                                                                                                    ular   Bubble    Dew    Safety
  No.  Composition (Mass %)                           Composition Tolerances                              Mass^a Point, °CPoint, °C Group
421B   R-125/134a (85.0/15.0)                          (±1/±1)                                              116.9   –45.7    –42.6   A1
422A   R-125/134a/600a (85.1/11.5/3.4)                 (±1/±1/+0.1,–0.4)                                    113.6   –46.5    –44.1   A1
422B   R-125/134a/600a (55.0/42.0/3.0)                 (±1/±1/+0.1,–0.5)                                    108.5   –40.5    –35.6   A1
422C   R-125/134a/600a (82.0/15.0/3.0)                 (±1/±1/+0.1,–0.5)                                    116.3   –45.3    –42.3   A1
422D   R-125/134a/600a (65.1/31.5/3.4)                 (+0.9,–1.1/±1/+0.1,–0.4)                             109.9   –43.2    –38.4   A1
423A   R-134a/227ea (52.5/47.5)                        (±1/±1)                                                126   –24.2    –23.5   A1
424A   R-125/134a/600a/600/601a (50.5/47.0/0.9/1.0/0.6) (±1/±1/+0.1,–0.2/+0.1,–0.2/+0.1,–0.2)               108.4   –39.1    –33.3   A1
425A   R-32/134a/227ea (18.5/69.5/12.0)                (±0.5/±0.5/±0.5)                                      90.3   –38.1    –31.3   A1
426Aª  R-125/134a/600a/601a (5.1/93.0/1.3/0.6)         (±1/±1/+0.1,–0.2/+0.1,–0.2)                          101.6   –28.5    –26.7   A1
427Aª  R-32/125/143a/134a (15.0/25.0/10.0/50.0)        (±2/±2/±2/±2)                                         90.4   –43.0    –36.3   A1
428Aª  R-125/143a/290/600a (77.5/20.0/0.6/1.9)         (±1/±1/+0.1,–0.2/+0.1,–0.2)                          107.5   –48.3    –47.5   A1
429A   R-E170/152a/600a (60.0/10.0/30.0)               (±1/±1/±1)                                            50.8   –26.0    –25.6   A3
430A   R-152a/600a (76.0/24.0)                         (±1/±1)                                                 64   –27.6    –27.4   A3
431A   R-290/152a (71.0/29.0)                          (±1/±1)                                               48.8   –43.1    –43.1   A3
432A   R-1270/E170 (80.0/20.0)                         (±1/±1)                                               42.8   –46.6    –45.6   A3
433A   R-1270/290 (30.0/70.0)                          (±1/±1)                                               43.5   –44.6    –44.2   A3
433B   R-1270/290 (5.0/95.0)                           (±1/±1)                                                 44   –42.7    –42.5   A3
433C   R-1270/290 (25.0/75.0)                          (±1/±1)                                               43.6   –44.3    –43.9   A3
434A   R-125/143a/134a/600a (63.2/18.0/16.0/2.8)       (±1/±1/±1/+0.1,–0.2)                                 105.7   –45.0    –42.3   A1
435A   R-E170/152a (80.0/20.0)                         (±1/±1)                                              49.04   –26.1    –25.9   A3
436A   R-290/600a (56.0/44.0)                          (±1/±1)                                              49.33   –34.3    –26.2   A3
436B   R-290/600a (52.0/48.0)                          (±1/±1)                                              49.87   –33.4    –25.0   A3
437A   R-125/134a/600/601 (19.5/78.5/1.4/0.6)          (+0.5,–1.8/+1.5,–0.7/+0.1,–0.2/+0.1/–0.2)            103.7   –32.9    –29.2   A1
438A   R-32/125/134a/600/601a (8.5/45.0/44.2/1.7/0.6)  (+0.5,–1.5/±1.5/±1.5/+0.1,–0.2/+0.1/–0.2)             99.1   –43.0    –36.4   A1
439A   R-32/125/600a (50.0/47.0/3.0)                   (±1/±1)                                               71.2   –52.0    –51.8   A2
440A   R-290/134a/152a (0.6/1.6/97.8)                  (±0.1/±0.6/±0.5)                                      66.2   –25.5    –24.3   A2
441A   R-170/290/600a/600 (3.1/54.8/6.0/36.1)          (±0.3/±2/±0.6/±2)                                     48.2   –41.9    –20.4   A3
442A   R-32/125/134a/152a/227ea (31.0/31.0/30.0/3.0/5.0) (±1.0/±1.0/±1.0/+0.5/±1.0)                         81.77   –46.5    –39.9   A1
443A   R-1270/290/600a (55.0/40.0/5.0)                 (±2.0/±2.0/±1.2)                                     43.47   –44.8    –41.2   A3
444A   R-32/152a/1234ze(E) (12.0/5.0/83.0)             (±1.0/±1.0/±2.0)                                      96.7   –34.3    –24.3   A2L
444B   R-32/152a/1234ze(E) (41.5/10.0/48.5)            (±.1.0/±1.0/±1.0)                                    92.78   –44.6    –34.9   A2L
445A   R-744/134a/1234ze(E) (6.0/9.0/85.0)             (±1.0/±1.0/±2.0)                                     103.1   –50.3    –23.5   A2L
446A   R-32/1234ze(E)/600 (68.0/2.09/3.0)              (+0.5,–1.0/+2.0,–0.6/+1.0,–1.0)                         62   –49.4    –44.0   A2L
447A   R-32/125/1234ze(E) (68.0/3.5/28.5)              (+1.5,–0.5/+1.5,–0.5/+1.0,–1.0)                      63.04   –49.3    –44.2   A2L
448A   R-32/125/1234yf/134a/1234ze(E) (26.0/26.0/20.0/ (+0.5 –2.0/+2.0 –0.5/+0.5– 2.0/+2.0–1.0/+0.5–2.0)    86.28   –45.9    –39.8   A1
         21.0/7.0)
449A   R-32/125/1234yf/134a (24.3/24.7/25.3/25.7)      (+2.0 –1.0/+1.0–0.2/+0.2– 1.0/+1.0–0.2)              87.21   –46.0    –39.9   A1
449B   R-32/125/1234yf/134a (25.2/24.3/23.2/27.3)      (+0.3 –1.5 /+1.5 –0.3 /+0.3 –1.5 /+1.5 –0.3)         86.37   –46.1    –40.2   A1
450A   R-134a/1234ze(E) (42.0/58.0)                    (±2.0/±2.0)                                         108.67   –23.4    –22.8   A1
451A   R-1234yf/134a (89.8/10.2)                       (±0.2 /±0.2)                                         72.76   –30.8    –30.5   A2L
451B   R-1234yf/134a (88.8/11.2)                       (±0.2 /±0.2)                                        112.56   –31.0    –30.6   A2L
452A   R-32/125/1234yf (11.0/59.0/30.0)                (±1.7/±1.8/+0.1/–1.0)                               112.56   –31.0    –30.6   A2L
453A   R32/125/134a/227ea/600/601a (20.0/20.0/53.8/5.0/ (±1.0 /±1.0 /±1.0 /±0.5 /+0.1 –0.2 /+0.1 –0.2)      88.78   –42.2    –35.0   A1
         0.6/0.6)
454A   R-32/1234yf (35/65)                             (±2.0/±2.0)                                          80.47   –48.4    –41.6   A2L
454B   R-32/1234yf (68.9/31.1)                         (±1.0/±1.0)                                          62.61   –50.9    –50.0   A2L
Azeotropes^b
Refrig.                                               Composition                Azeotropic        Molecular      Normal Boiling   Safety
  No.  Composition (Mass %)                           Tolerances             Temperatures, °C        Mass^a          Point, °C     Group
500    R-12/152a (73.8/26.2)                                                             0             99.3             –33          A1
501    R-22/12 (75.0/25.0)^c                                                          –41              93.1             –41          A1
502    R-22/115 (48.8/51.2)                                                            19             112.0             –45          A1
503    R-23/13 (40.1/59.9)                                                            –88              87.5             –88
504    R-32/115 (48.2/51.8)                                                            17              79.2             –57
505    R-12/31 (78.0/22.0)^c                                                          115             103.5             –30
506    R-31/114 (55.1/44.9)                                                            18              93.7             –12
507A^d R-125/143a (50.0/50.0)                                                         –40              98.9            –46.7         A1
508A^d R-23/116 (39.0/61.0)                                                           –86             100.1             –86          A1
508B   R-23/116 (46.0/54.0)                                                          –45.6             95.4            –88.3         A1
509A^d R-22/218 (44.0/56.0)                                                              0            124.0             –47          A1
510A^d R-E170/600a (88.0/12.0)                        (±0.5/±0.5)                    –25.2            47.24            –25.2         A3
511A^d R-290/E170 (95.0/5.0)                          (±1/±1)                    –20 to 40            44.19            –42.1         A3
512A   R-134a/152a (5.0/95.0)                         (±1/±1)                    –20 to 40            67.24            –24.0         A2
513A   R-1234yf/134a (56.0/44.0)                      (±1.0/±1.0)                      27             108.4            –29.1         A1
Source: ANSI/ASHRAE Standard 34-2010.                                       ^cExact composition of this azeotrope is in question, and additional experimental
^aMolecular mass and normal boiling point are not part of this standard.     studies are needed.
^bAzeotropic refrigerants exhibit some segregation of components at conditions of tem- ^dR-507, R-508, and R-509 are allowed designations for R-507A, R-508A, and
perature and pressure other than those at which they were formulated. Extent of segrega- R-509A because of a change in designations after assignment of R-500 through
tion depends on the particular azeotrope and hardware system configuration.  R-509. Corresponding changes were not made for R-500 through R-506.
```

<!-- str. 794 -->

**Global Environmental Characteristics of Refrigerants.** Atmospheric release of CFC and HCFC refrigerants (see Table 3) contributes to depletion of the ozone layer. The measure of a material’s ability to deplete stratospheric ozone is its **ozone depletion poten- tial (ODP)**, a value relative to R-11’s value of 1.0. It is the nonzero ODP of these refrigerants that led to the phaseout of their production and use under the Montreal Protocol.

The **global warming potential (GWP)** of a GHG is an index describing its relative ability to trap radiant energy compared to CO<sub>2</sub> (R-744), which has a very long atmospheric lifetime. Measurements of climate impact of refrigerant emissions are hence often reported in CO<sub>2</sub> equivalents. GWP may be calculated for any particular **inte- gration time horizon (ITH)**. Typically, a 100 year ITH is used for calculation of GWPs for regulatory purposes, and may be designated as GWP<sub>100</sub>. Halocarbons (CFCs, HCFCs, and HFCs) and many nonhalocarbons (e.g., hydrocarbons, carbon dioxide) are GHGs. HFOs, or unsaturated HFCs, and blends using them are being developed and promoted as low-GWP alternatives to the existing halocarbon refrigerants. HFOs are also GHGs but their GWPs are drastically lower than those of HFCs.

The energy refrigeration appliances consume is often produced from fossil fuels, which results in emission of CO<sub>2</sub>, a contributor to global warming. This indirect effect associated with energy consumption is frequently much larger than the direct effect of refrigerant emissions. The **total equivalent warming impact (TEWI)** of an HVAC&R system is the sum of direct refrigerant emissions expressed in terms of CO<sub>2</sub> equivalents, and indirect emissions of CO<sub>2</sub> from the system’s energy use over its service life (Fischer et. al. 1991). Another measure is **life-cycle climate performance (LCCP)**, which includes TEWI and adds direct and indirect emissions effects associated with manufacturing the refrigerant and endof-life disposal (ARAP 1999).

Ammonia (R-717), hydrocarbons, HCFCs, most HFCs, and HFOs have shorter atmospheric lifetimes than CFCs because they are largely destroyed in the lower atmosphere by reactions with OH radicals. A shorter atmospheric lifetime generally results in lower ODP and GWP<sub>100</sub> values.

**Table 3A Refrigerant Environmental Properties**

| Refrigerant | Atmospheric Lifetime, years<sup>a</sup> | ODP<sup>b</sup> | GWP<sub>100</sub><sup>a</sup> |
|---|---|---|---|
| CFC-11 | 45 | 1 | 4750 |
| CFC-12 | 100 | 1 | 10 900 |
| CFC-13 | 640 | 1 | 14 400 |
| CFC-113 | 85 | 0.8 | 6130 |
| CFC-114 | 300 | 1 | 10 000 |
| CFC-115 | 1700 | 0.6 | 7370 |
| HCFC-22 | 12 | 0.055 | 1810 |
| HCFC-123 | 1.3 | 0.02 | 77 |
| HCFC-124 | 5.8 | 0.022 | 609 |
| HCFC-142b | 17.9 | 0.065 | 2310 |
| HFC-23 | 270 | 0 | 14 800 |
| HFC-32 | 4.9 | 0 | 675 |
| HFC-125 | 29 | 0 | 3500 |
| HFC-134a | 14 | 0 | 1430 |
| HFC-143a | 52 | 0 | 4470 |
| HFC-152a | 1.4 | 0 | 124 |
| HFC-227ea | 34.2 | 0 | 3220 |
| HFC-236fa | 240 | 0 | 9810 |
| HFC-245fa | 7.6 | 0 | 1030 |
| PFC-116 | 10 000 | 0 | 12 200 |
| PFC-218 | 2600 | 0 | 8830 |
| C318 | 3200 | 0.00 | 10 300 |
| R-744 |  | 0.00 | 1 |

Sources: IPCC (2007), UNEP (2009).

<sup>a</sup>Atmospheric lifetimes and GWP<sub>100</sub>s from Table 2.14 of IPCC (2007).

<sup>b</sup>ODP values stipulated for reporting under the Montreal Protocol from UNEP (2009), Section 1.1, Annexes A, B, and C, pp. 25-27.

Table 3A gives values for atmospheric lifetime, ODP, and GWP<sub>100</sub> of refrigerants being phased out under the Montreal Protocol and of their replacements, alone or as components of blends from the IPCC (2007). Table 3B shows the latest scientific assessment values for these refrigerants and for new refrigerants developed since IPCC (2007) was published. Because HFCs do not contain chlorine or bromine, their ODP values are negligible (Ravishankara et al. 1994) and thus are shown as 0 in Tables 3A and 3B. Nonhalocarbon refrigerants listed have zero ODP and very low GWP<sub>100</sub>.

As shown in Tables 3A and 3B, there are differences between the values stipulated for reporting under the Montreal and Kyoto protocols and the latest scientific values. These differences are not large enough to significantly alter design decisions based on the numbers in the table. All these values have rather wide error bands and may change with each assessment of the science. Changes in GWP assessments are largely dominated by changes in understanding of CO<sub>2</sub>, which is the reference chemical.

Table 4 provides ODP values for blends based on Montreal Protocol reporting values of the component fluids (Table 3A). It also gives IPCC (2007, 2013) GWP<sub>100</sub> values based on component fluid values in Tables 3A and 3B, respectively.

**Table 3B Refrigerant Environmental Properties**

| Refrigerant | Atmospheric Lifetime, years<sup>a</sup> | ODP<sup>b</sup> | GWP<sub>100</sub><sup>a</sup> |
|---|---|---|---|
| CFC-11 | 45 | 1 | 4660 |
| CFC-12 | 100 | 0.73 | 10 800 |
| CFC-13 | 640 | 1 | 13 900 |
| CFC-113 | 85 | 0.81 | 5820 |
| CFC-114 | 190 | 0.50 | 8590 |
| CFC-115 | 1020 | 0.26 | 7670 |
| HCFC-22 | 11.9 | 0.034 | 1760 |
| HCFC-123 | 1.3 | 0.01 | 79 |
| HCFC-124 | 5.9 | 0.02 | 527 |
| HCFC-142b | 17.2 | 0.057 | 1980 |
| HCFO-1233zd(E) | 0.071 | 0.00034 | 1 |
| HE-E170 | 0.015<sup>b</sup> | 0.00 | 1<sup>b</sup> |
| HFC-23 | 222 | 0.00 | 12 400 (11 700)<sup>c</sup> |
| HFC-32 | 5.2 | 0.00 | 677 (650)<sup>c</sup> |
| HFC-125 | 28.2 | 0.00 | 3170 (2800)<sup>c</sup> |
| HFC-134a | 13.4 | 0.00 | 1300 (1300)<sup>c</sup> |
| HFC-143a | 47.1 | 0.00 | 4800 (3800)<sup>c</sup> |
| HFC-152a | 1.5 | 0.00 | 138 (140)<sup>c</sup> |
| HFC-227ea | 38.9 | 0.00 | 3350 (2900)<sup>c</sup> |
| HFC-236fa | 242 | 0.00 | 8060 (6300)<sup>c</sup> |
| HFC-245fa | 7.7 | 0.00 | 858 |
| HFO-1234yf | 0.029 | 0.00 | <1 |
| HFO-1234ze(E) | 0.045 | 0.00 | <1 |
| HFO-1336mzz(Z) | 0.07 | 0.00 | 2 |
| PFC-116 | 10 000 | 0.00 | 11 100 (9200)<sup>c</sup> |
| PFC-218 | 2600 | 0.00 | 8900 (7000)<sup>c</sup> |
| C318 | 3200 | 0.00 | 9540 (8700)<sup>c</sup> |
| HC-290 | 0.034<sup>b</sup> | 0.00 | 5<sup>b</sup> |
| HC-600 |  | 0.00 | 4<sup>b</sup> |
| HC-600a | 0.016<sup>b</sup> | 0.00 | ~20<sup>b</sup> |
| HC-601a | 0.009<sup>b</sup> | 0.00 | ~20<sup>b</sup> |
| HC-1270 | 0.001<sup>b</sup> | 0.00 | 1.8<sup>b</sup> |
| R-717 |  | 0.00 |  |
| R-744 |  | 0.00 | 1 (1)<sup>c</sup> |

Sources: IPCC (2013).

<sup>a</sup>Atmospheric lifetimes and GWP<sub>100</sub>s from IPCC (2013) except where indicated.

<sup>b</sup>From Table 2-7 of Calm et al. (2015)

<sup>c</sup>GWP<sub>100</sub> values stipulated for reporting under Kyoto Protocol from Table 2-5 of Calm et al. (2015).

<!-- str. 795 -->

**Table 4 Environmental Properties of Refrigerant Blends; based on Montreal Protocol Reporting ODP and IPCC AR4**

| Refrigerant | ODP* | GWP<sub>100</sub>*<br>AR4 | GWP<sub>100</sub>*<br>AR5 | Refrigerant | ODP* | GWP<sub>100</sub>*<br>AR4 | GWP<sub>100</sub>*<br>AR5 |
|---|---|---|---|---|---|---|---|
| 401A | 0.02 | 1180 | 1130 | 428A | 0.00 | 3610 | 3120 |
| 401B | 0.03 | 1290 | 1240 | 429A | 0.00 | 19 | 20 |
| 401C | 0.02 | 933 | 876 | 430A | 0.00 | 99 | 110 |
| 402A | 0.01 | 2790 | 2570 | 431A | 0.00 | 38 | 44 |
| 402B | 0.02 | 2420 | 2260 | 432A | 0.00 | 2 | 2 |
| 403A | 0.03 | 3120 | 3100 | 433A | 0.00 | 3 | 4 |
| 403B | 0.02 | 4460 | 4460 | 433B | 0.00 | 3 | 5 |
| 404A | 0.00 | 3920 | 3940 | 433C | 0.00 | 3 | 4 |
| 405A | 0.02 | 5330 | 4970 | 434A | 0.00 | 3250 | 3080 |
| 406A | 0.04 | 1940 | 1780 | 435A | 0.00 | 26 | 28 |
| 407A | 0.00 | 2110 | 1920 | 436A | 0.00 | 11 | 12 |
| 407B | 0.00 | 2800 | 2550 | 436B | 0.00 | 11 | 12 |
| 407C | 0.00 | 1770 | 1620 | 437A | 0.00 | 1810 | 1640 |
| 407D | 0.00 | 1630 | 1490 | 438A | 0.00 | 2260 | 2060 |
| 407E | 0.00 | 1550 | 1420 | 439A | 0.00 | 1980 | 1830 |
| 407F | 0.00 | 1820 | 1670 | 440A | 0.00 | 144 | 156 |
| 408A | 0.02 | 3150 | 3260 | 441A | 0.00 | 5 | 5 |
| 409A | 0.03 | 1580 | 1480 | 442A | 0.00 | 1890 | 1750 |
| 409B | 0.03 | 1560 | 1470 | 443A | 0.00 | 2.5 | 4 |
| 410A | 0.00 | 2090 | 1920 | 444A | 0.00 | 93 | 89 |
| 410B | 0.00 | 2230 | 2050 | 444B | 0.00 | 296 | 295 |
| 411A | 0.03 | 1600 | 1560 | 445A | 0.00 | 135 | 118 |
| 411B | 0.03 | 1710 | 1660 | 446A | 0.00 | 461 | 461 |
| 412A | 0.04 | 2290 | 2170 | 447A | 0.00 | 584 | 572 |
| 413A | 0.00 | 2050 | 1950 | 448A | 0.00 | 1390 | 1360 |
| 414A | 0.03 | 1480 | 1380 | 449A | 0.00 | 1400 | 1280 |
| 414B | 0.03 | 1360 | 1270 | 449B | 0.00 | 1410 | 1300 |
| 415A | 0.03 | 1510 | 1470 | 450A | 0.00 | 605 | 547 |
| 415B | 0.009 | 546 | 544 | 451A | 0.00 | 150 | 133 |
| 416A | 0.008 | 1080 | 975 | 451B | 0.00 | 164 | 146 |
| 417A | 0.00 | 2350 | 2130 | 452A | 0.00 | 2140 | 1950 |
| 417B | 0.00 | 3030 | 2740 | 453A | 0.00 | 1770 | 1640 |
| 418A | 0.03 | 1740 | 1690 | 454A | 0.00 | 239 | 238 |
| 419A | 0.00 | 2970 | 2690 | 454B | 0.00 | 466 | 467 |
| 420A | 0.007 | 1540 | 1380 | 500 | 0.50 | 8080 | 8010 |
| 421A | 0.00 | 2630 | 2380 | 501 | 0.29 | 4080 | 4020 |
| 421B | 0.00 | 3190 | 2890 | 502 | 0.20 | 4660 | 4790 |
| 422A | 0.00 | 3140 | 2850 | 503 | 0.60 | 14 600 | 13 300 |
| 422B | 0.00 | 2530 | 2290 | 504 | 0.10 | 4140 | 4300 |
| 422C | 0.00 | 3090 | 2800 | 507A | 0.00 | 3990 | 3990 |
| 422D | 0.00 | 2730 | 2470 | 508A | 0.00 | 13 200 | 11 600 |
| 423A | 0.00 | 2280 | 2270 | 508B | 0.00 | 13 400 | 11 700 |
| 424A | 0.00 | 2440 | 2210 | 509A | 0.01 | 5740 | 5760 |
| 425A | 0.00 | 1510 | 1430 | 510A | 0.00 | 3 | 3 |
| 426A | 0.00 | 1510 | 1370 | 511A | 0.00 | 3 | 5 |
| 427A | 0.00 | 2140 | 2020 | 512A | 0.00 | 189 | 196 |
|  |  |  |  | 513A | 0.00 | 631 | 573 |

*Derived based on weighted averages of blend component values. AR4 = IPCC (2007) AR5 = IPCC (2013)

### Physical Properties

Table 5 lists some physical properties of commonly used refrigerants, a few very-low-boiling-point cryogenic fluids, some newer refrigerants, and some older refrigerants of historical interest, arranged in increasing order of atmospheric boiling point.

Table 5 also includes the freezing point, critical properties, and refractive index. Of these properties, normal boiling point is most important because it is a direct indicator of the temperature at which a refrigerant can be used. The freezing point must be lower than any contemplated usage. The critical properties describe a material at the point where the distinction between liquid and gas is lost. At higher temperatures, no separate liquid phase is possible for pure fluids. In refrigeration cycles involving condensation, a refrigerant must be chosen that allows this change of state to occur at a temperature somewhat below the critical. Cycles that reject heat at supercritical temperatures (e.g., cycles using carbon dioxide) are also possible.

**Lithium Bromide/Water and Ammonia/Water Solutions.** These are the most commonly used working fluids in absorption refrigeration systems. (See Chapter 30 for property data.)

### Electrical Properties

Tables 6 and 7 list electrical characteristics of refrigerants that are especially important in hermetic systems.

### Sound Velocity

The practical velocity of a gas in piping or through openings is limited by the velocity of sound in the gas. Chapter 30 has sound velocity data for many refrigerants. The velocity increases when temperature is increased and decreases when pressure is increased. REFPROP software (NIST 2010) can be used to calculate the sound velocity at superheated conditions. The velocity of sound can be calculated from the equation

> V<sub>a</sub> = (dp ⁄ dρ)<sub>S</sub> = γ(dp ⁄ dρ)<sub>T</sub>&emsp;**(1)**

where

- V<sub>a</sub> = sound velocity, m/s
- p = pressure, Pa
- ρ = density, kg/m<sup>3</sup>
- γ = c<sub>p</sub>/c<sub>v</sub> = ratio of specific heats
- S = entropy, kJ/(kg·K)
- T = temperature, K

Sound velocity can be estimated from tables of thermodynamic properties. Change in pressure with a change in density (dp/dρ) can be estimated at either constant entropy or constant temperature. It is simpler to estimate at constant temperature, but the ratio of specific heats must also be known.

## 2. REFRIGERANT PERFORMANCE

Chapter 2 describes several methods of calculating refrigerant performance, and Chapter 30 includes tables of thermodynamic properties of refrigerants.

Table 8 shows the theoretical calculated performance of a number of refrigerants for a standard cycle of various evaporation temperatures and 303 K condensation. For blend refrigerants, the average temperature in the evaporator and condenser is used. In most cases, suction vapor is assumed to be saturated, and compression is assumed adiabatic or at constant entropy. For R-113 and R-600a, for example, these assumptions cause some liquid in the discharge vapor. In these cases, it is assumed that discharge vapor is saturated and that suction vapor is slightly superheated. Note that actual operating conditions and performance may differ significantly from numbers in the table because of additional factors such as compressor efficiency and transport properties.

## 3. SAFETY

Tables 1 and 2 summarize toxicity and flammability characteristics of many refrigerants. In ASHRAE Standard 34, refrigerants are classified according to the hazard involved in their use. The toxicity and flammability classifications yield six safety groups (A1, A2, A3, B1, B2, and B3) for refrigerants. Group A1 refrigerants are the least hazardous, group B3 the most hazardous.

The letter designates toxicity class based on allowable exposure:

- Class A: Refrigerants that have an occupational exposure limit (OEL) of 400 ppm or greater.
- Class B: Refrigerants that have an OEL of less than 400 ppm.

<!-- str. 796 -->

**Table 5 Physical Properties of Selected Refrigerants**

| No. | Refrigerant Chemical Name or Composition (% by Mass) | Chemical Formula | Molecular Mass | Boiling Pt.<sup>f</sup> (NBP) at 101.325 kPa, °C | Freezing Point, °C | Critical Temperature, °C | Critical Pressure, kPa | Critical Density, kg/m<sup>3</sup> | Refractive Index of Liquid<sup>b,c</sup> |
|---|---|---|---|---|---|---|---|---|---|
| 728 | Nitrogen | N<sub>2</sub> | 28.013 | –195.8 | –210.0 | –146.96 | 3395.8 | 313.3 | 1.205 (83 K) |
|  |  |  |  |  |  |  |  |  | 589.3 nm |
| 729 | Air | — | 28.959 | –194.25 | — | –140.59 | 3789.6 | 335.94 | — |
| 740 | Argon | Ar | 39.948 | –185.85 | –189.34 | –122.46 | 4863.0 | 535.6 | 1.233 (84 K) |
|  |  |  |  |  |  |  |  |  | 589.3 nm |
| 732 | Oxygen | O<sub>2</sub> | 31.999 | –182.96 | –218.79 | –118.57 | 5043.0 | 436.14 | 1.221 (92 K) |
|  |  |  |  |  |  |  |  |  | 589.3 nm |
| 50 | Methane | CH<sub>4</sub> | 16.043 | –161.48 | –182.46 | –82.586 | 4599.2 | 162.66 | — |
| 14 | Tetrafluoromethane | CF<sub>4</sub> | 88.005 | –128.05 | –183.61 | –45.64 | 3750.0 | 625.66 | — |
| 170 | Ethane | C<sub>2</sub>H<sub>6</sub> | 30.07 | –88.581 | –182.8 | 32.72 | 4872.2 | 206.18 | — |
| 508A | R-23/116 (39/61) | — | 100.1 | –87.60 | — | 10.192 | 3650.8 | 567.58 | — |
| 508B | R-23/116 (46/54) | — | 95.394 | –87.6 | — | 11.205 | 3771.6 | 568.45 | — |
| 23 | Trifluoromethane | CHF<sub>3</sub> | 70.014 | –82.018 | –155.13 | 26.143 | 4832 | 526.5 | — |
| 13 | Chlorotrifluoromethane | CClF<sub>3</sub> | 104.46 | –81.48 | –181.15 | 28.85 | 3879 | 582.88 | 1.146 (25)<sup>2</sup> |
| 744 | Carbon dioxide | CO<sub>2</sub> | 44.01 | –78.4<sup>d</sup> | –56.558<sup>e</sup> | 30.978 | 7377.3 | 467.6 | 1.195 (15) |
| 504 | R-32/115 (48.2/51.8) | — | 79.249 | –57.906 | — | 62.138 | 4428.8 | 504.68 | — |
| 32 | Difluoromethane | CH<sub>2</sub>F<sub>2</sub> | 52.024 | –51.651 | –136.81 | 78.105 | 5782.0 | 424 | — |
| 410A | R-32/125 (50/50) | — | 72.585 | –51.446 | — | 71.358 | 4902.6 | 459.53 | — |
| 125 | Pentafluoroethane | C<sub>2</sub>HF<sub>5</sub> | 120.02 | –48.09 | –100.63 | 66.023 | 3617.7 | 573.58 | — |
| 1270 | Propylene | C<sub>3</sub>H<sub>6</sub> | 42.08 | –47.62 | –185.2 | 91.061 | 4554.8 | 230.03 | 1.3640 (–50)<sup>1</sup> |
| 143a | Trifluoroethane | CH<sub>3</sub>CF<sub>3</sub> | 84.041 | –47.241 | –111.81 | 72.707 | 3761.0 | 431.0 | — |
| 507A | R-125/143a (50/50) | — | 98.859 | –46.741 | — | 70.617 | 3705 | 490.77 | — |
| 404A | R-125/143a/134a (44/52/4) | — | 97.604 | –46.222 | — | 72.046 | 3728.9 | 486.53 | — |
| 502 | R-22/115 (48.8/51.2) | — | 111.63 | –45.174 | — | 80.507 | 4016.8 | 568.70 | — |
| 407C | R-32/125/134a (23/25/52) | — | 86.204 | –43.627 | — | 86.034 | 4629.8 | 484.23 | — |
| 290 | Propane | C<sub>3</sub>H<sub>8</sub> | 44.096 | –42.11 | –187.62 | 96.74 | 4251.2 | 220.4 | 1.3397 (–42) |
| 22 | Chlorodifluoromethane | CHClF<sub>2</sub> | 86.468 | –40.81 | –157.42 | 96.145 | 4990.0 | 523.84 | 1.234 (25)<sup>2</sup> |
| 115 | Chloropentafluoroethane | CClF<sub>2</sub>CF<sub>3</sub> | 154.47 | –39.25 | –99.39 | 79.95 | 3129.0 | 614.8 | 1.221 (25)<sup>2</sup> |
| 500 | R-12/152a (73.8/26.2) | — | 99.303 | –33.603 | — | 102.09 | 4168.6 | 495.1 | — |
| 717 | Ammonia | NH<sub>3</sub> | 17.03 | –33.327 | –77.655 | 132.25 | 11 333.0 | 225.0<sup>d</sup> | 1.325 (16.5) |
| 12 | Dichlorodifluoromethane | CCl<sub>2</sub>F<sub>2</sub> | 120.91 | –29.752 | –157.05 | 111.97 | 4136.1 | 565.0 | 1.288 (25)<sup>2</sup> |
| 1234yf | 2,3,3,3-tetrafluoroprop-1-ene | CF<sub>3</sub>CF=CH<sub>2</sub> | 114.04 | –29.45 |  | 94.7 | 3382.2 | 475.55 |  |
| 134a | Tetrafluoroethane | CF<sub>3</sub>CH<sub>2</sub>F | 102.03 | –26.074 | –103.3 | 101.06 | 4059.3 | 511.9 | — |
| 152a | Difluoroethane | CHF<sub>2</sub>CH<sub>3</sub> | 66.051 | –24.023 | –118.59 | 113.26 | 4516.8 | 368 | — |
| 1234ze | Trans-1,3,3,3- | CF<sub>3</sub>CH=CHF | 114.04 | –18.95 |  | 109.37 | 3636.3 | 489.24 |  |
| (E) | tetrafluoropropene |  |  |  |  |  |  |  |  |
| 124 | Chlorotetrafluoroethane | CHClFCF<sub>3</sub> | 136.48 | –11.963 | –199.15 | 122.28 | 3624.3 | 560.0 | — |
| 600a | Isobutane | C<sub>4</sub>H<sub>10</sub> | 58.122 | –11.75 | –159.42 | 134.66 | 3629.0 | 225.5 | 1.3514 (–25)<sup>1</sup> |
| 142b | Chlorodifluoroethane | CClF<sub>2</sub>CH<sub>3</sub> | 100.5 | –9.15 | –130.43 | 137.11 | 4055.0 | 466.0 | — |
| C318 | Octafluorocyclobutane | C<sub>4</sub>F<sub>8</sub> | 200.03 | –5.975 | –39.8 | 115.23 | 2777.5 | 619.97 |  |
| 600 | Butane | C<sub>4</sub>H<sub>10</sub> | 58.122 | –0.49 | –138.27 | 151.98 | 3796.0 | 227.94 | 1.3562 (–15)<sup>1</sup> |
| 1336mzz | Cis-1,1,1,4,4,4-hexafluoro-2- | CF<sub>3</sub>CH=CHCF<sub>3</sub> | 164.1 | 92.1 | — | 171.3 | 2903 | 504.67 | — |
| (Z) | butene |  |  |  |  |  |  |  |  |
| 114 | Dichlorotetrafluoroethane | CClF<sub>2</sub>CClF<sub>2</sub> | 170.92 | 3.586 | –92.5 | 145.68 | 3257.0 | 579.97 | 1.294 (25) |
| 1233zd(E) | Trans-1-chloro-3,3,3-trifluoro- | CF<sub>3</sub>CH=CHCl | 130.5 | 18.1 | — | 165.6 | 3580 | 480.769 | — |
|  | 1-propene |  |  |  |  |  |  |  |  |
| 11 | Trichlorofluoromethane | CCl<sub>3</sub>F | 137.37 | 23.708 | –110.47 | 197.96 | 4407.6 | 554.0 | 1.362 (25)<sup>2</sup> |
| 123 | Dichlorotrifluoroethane | CHCl<sub>2</sub>CF<sub>3</sub> | 152.93 | 27.823 | –107.15 | 183.68 | 3661.8 | 550.0 | — |
| 141b | Dichlorofluoroethane | CCl<sub>2</sub>FCH<sub>3</sub> | 116.95 | 32.05 | –103.5 | 204.4 | 4212.0 | 458.6 | — |
| 113 | Trichlorotrifluoroethane | CCl<sub>2</sub>FCClF<sub>2</sub> | 187.38 | 47.585 | –36.22 | 214.06 | 3392.2 | 560.0 | 1.357 (25)<sup>2</sup> |
| 718<sup>3</sup> | Water | H<sub>2</sub>O | 18.015 | 99.974 | 0.01 | 373.95 | 22 064.0 | 322.0 | — |

Notes: References:

<sup>a</sup>Data from NIST (2010) REFPROP v. 9.0. <sup>c</sup>For the sodium D line. <sup>e</sup>At 527 kPa. <sup>1</sup>Kirk and Othmer (1956).

<sup>b</sup>Temperature of measurement (°C, unless kelvin is noted) shown in <sup>d</sup>Sublimes. <sup>f</sup>Bubble point used for blends <sup>2</sup>Bulletin B-32A (DuPont). parentheses. Data from CRC (1987), unless otherwise noted. 3*Handbook of Chemistry* (1967).

The numeral denotes flammability:

- Class 1: No flame propagation in air at 60°C and 101.3 kPa
- Class 2: Exhibits flame propagation in air at 60°C and 101.3 kPa, lower flammability limit (LFL) greater than 0.10 kg/m<sup>3</sup> at 23°C and 101.3 kPa, and heat of combustion less than 19 000 kJ/kg
- Optional class 2L: class 2 refrigerants may be classified as 2L if they exhibit a maximum burning velocity of no more than 100 mm/sat 23.0°C and 101.3 kPa
- Class 3: Exhibits flame propagation in air at 60°C and 101.3 kPa and LFL less than or equal to 0.10 kg/m<sup>3</sup>at 23.0°C and 101.3 kPa or heat of combustion greater than or equal to 19 000 kJ/kg

Refrigerant blends are assigned the flammability safety classification of the worst case of fractionation of the blend (i.e., the composition during fractionation that results in the highest concentration of flammable components). For class 2 or 3 refrigerants or refrigerant blends that show no flame propagation when tested at 23.0°C and 101.3 kPa (i.e., no LFL), an elevated temperature flame limit at 60°C (ETFL60) is used in lieu of the LFL for determining flammability classifications.

<!-- str. 797 -->

**Table 6 Electrical Properties of Liquid Refrigerants**

| No. | Refrigerant Chemical Name or Composition (% By Mass) | Temp., °C | Dielectric Resistivity,<br>Constant | Dielectric Resistivity,<br>Volume MΩ·m | Ref. |
|---|---|---|---|---|---|
| 11 | Trichlorofluoromethane | 28.9 a 25 25 | 2.28 1.92 2.5 2.32 | 63 680 90 | 1 2 3 9 |
| 12 | Dichlorodifluoromethane | 28.9 a 25 25 25 | 2.13 1.74 2.1 2.100 2.14 | 53 900 >120 | 1 2 3 4 9 |
| 13 | Chlorotrifluoromethane | –30 20 | 2.3 1.64 | 120 | 4 |
| 22 | Chlorodifluoromethane | 23.9 a 25 25 | 6.11 6.12 6.6 6.42 | 0.83 75 | 1 2 3 9 |
| 23 | Trifluoromethane | –30 20 | 6.3 5.51 |  | 3 4 |
| 32 | Difluoromethane | a 25 | 14.27 14.67 |  | 6 9 |
| 113 | Trichlorotrifluoroethane | 30 a 25 | 2.44 1.68 2.6 | 45 490 >120 | 1 2 3 |
| 114 | Dichlorotetrafluoroethane | 31.1 a 25 | 2.17 1.83 2.2 | 66 470 >70 | 1 2 3 |
| 123 | 2,2-dichloro-1,1,1-trifluoroethane | a | 4.50 | 14 700 | 4 |
| 124 | 2-chloro-1,1,1,2-tetrafluoroethane | 25 | 4.89 |  | 9 |
| 124a | Chlorotetrafluoroethane | 25 | 4.0 | 50 | 3 |
| 125 | Pentafluoroethane | 20 25 | 4.94 5.10 |  | 7 9 |
| 134a | 1,1,1,2-tetrafluoroethane | a 25 | 9.51 9.87 | 17 700 | 4 9 |
| 143a | 1,1,1-trifluoroethane | 25 | 9.78 |  | 9 |
| 236fa | 1,1,1,3,3,3-hexafluoropropane | 25 | 7.89 |  | 9 |
| 245fa | 1,1,1,3,3-pentafluoropropane | 25 | 6.82 |  | 9 |
| 290 | Propane | a | 1.27 | 73 840 | 2 |
| 404A | R-125/143a/134a (44/52/4) | a 25 | 7.58 8.06 | 8450 | 8 9 |
| 407C | R-32/125/134a (23/25/52) | a 25 | 8.74 10.21 | 7420 | 8 9 |
| 410A | R-32/125 (50/50) | a 25 | 7.78 5.37 | 3920 | 8 9 |
| 500 | R-12/152a (73.8/26.2) | a | 1.80 | 55 750 | 2 |
| 507A | R-125/143a (50/50) | a 25 | 6.97 7.94 | 5570 | 8 9 |
| 508A | R-23/116 (39/61) | –30 0 | 6.60 5.02 |  | 1 1 |
| 508B | R-23/116 (46/54) | –30 0 | 7.24 5.48 |  | 1 1 |
| 717 | Ammonia | 20.6 | 15.5 |  | 5 |
| 744 | Carbon dioxide | 0 | 1.59 |  | 5 |
| 1234yf 2,3,3,3-tetrafluoro-1-propene |  | 25 21 | 7.6 7.7 |  | 10 11 |

a = ambient temperature 5 CRC (1987) 6 Bararo et al. (1997) References: 7 Pereira et al. (1999) 1 Data from E.I. DuPont de Nemours & Co., Inc. 8 Meurer et al. (2001) 2 Beacham and Divers (1955) 9 Gbur and Byrne (2001) 3 Eiseman (1955) 10 Muller et al. (2011) 4 Fellows et al. (1991) 11 Data from Honeywell

**Table 7 Electrical Properties of Refrigerant Vapors**

| Refrigerant Chemical Name or Composition No. (% by mass) | sure, Temp., Con-<br>PreskPa | sure, Temp., Con-<br>°C | sure, Temp., Con- stant Nitrogen = 1 GΩ·m<br>Dielectric | stant Nitrogen = 1 GΩ·m<br>Relative Dielectric Strength, | stant Nitrogen = 1 GΩ·m<br>Volume Resistivity, | Ref. |
|---|---|---|---|---|---|---|
| 11 Trichlorofluoromethane | 50.7 a 101.3 | 26.1 b 22.8 | 1.0019 1.009 | 3.1 | 74.35 | 3 2 4 |
| 12 Dichlorodifluoromethane | 50.7 a 101.3 101.3 | 28.9 b 22.8 25 | 1.0016 1.012 1.0064 | 452<sup>c</sup> 2.4 | 72.77 | 3 2 4 6 |
| 13 Chlorotrifluoromethane | 50.7 101.3 | 28.9 22.8 | 1.0013 | 1.4 |  | 3 4 |
| 14 Tetrafluoromethane | 50.7 101.3 | 24.4 22.8 | 1.0006 | 1.0 |  | 3 4 |
| 22 Chlorodifluoromethane | 50.7 a 101.3 101.3 | b 22.8 25 | 1.0035 1.004 1.0068 | 460<sup>c</sup> 1.3 | 2113 | 3 2 4 6 |
| 32 Difluoromethane | 101.3 | 25 | 1.0102 |  |  | 6 |
| 113 Trichlorotrifluoroethane | a 40.5 | b 22.8 | 1.010 | 440<sup>c</sup> 2.6 | 94.18 | 2 4 |
| 114 Dichlorotetrafluoroethane | 50.7 a 101.3 | 26.7 b 22.8 | 1.0021 1.002 | 295<sup>c</sup> 2.8 | 148.3 | 3 2 4 |
| 116 Hexafluoroethane | 95.2 | 22.8 | 1.002 |  |  | 3 |
| 124 2-chloro-1,1,1,2-tetrafluoroethane | 101.3 | 25 | 1.0060 |  |  | 6 |
| 125 Pentafluoroethane | 101.3 | 25 | 1.0072 |  |  | 6 |
| 134a 1,1,1,2-tetrafluoroethane | 101.3 | 25 | 1.0125 |  |  | 6 |
| 142b Chlorodifluoroethane | 94.2 | 27.2 | 1.013 |  |  | 3 |
| 143a Trifluoroethane | 86.1 101.3 | 25 25 | 1.013 1.0170 |  |  | 3 6 |
| 170 Ethane | 101.3 | 0 | 1.0015 |  |  | 1 |
| 236fa 1,1,1,3,3,3-hexafluoropropane | 101.3 | 25 | 1.0121 |  |  | 6 |
| 245fa 1,1,1,3,3-pentafluoropropane | 101.3 | 25 | 1.0066 |  |  | 6 |
| 290 Propane | a | b | 1.009 | 440<sup>c</sup> | 105.3 | 2 |
| 404A R-125/143a/134a<br>(44/52/4) | 101.3 | 25 | 1.0121 |  |  | 6 |
| 407C R-32/125/134a (23/25/52) | 101.3 | 25 | 1.0113 |  |  | 6 |
| 410A R-32/125 (50/50) | 101.3 | 25 | 1.0078 |  |  | 6 |
| 500 R-12/152a (73.8/26.2) | a | b | 1.024 | 470<sup>c</sup> | 76.45 | 2 |
| 507A R-125/143a (50/50) | 101.3 | 25 | 1.0119 |  |  | 6 |
| 508A R-23/116 (39/61) | a a 101.3 | –30 0 25 | 1.12 1.31 1.0042 |  |  | 5 5 6 |
| 508B R-23/116 (46/54) | a a 101.3 | –30 0 25 | 1.13 1.34 1.0042 |  |  | 5 5 6 |
| 717 Ammonia | 101.3 a | 0 0 | 1.0072 | 0.82 |  | 1 4 |
| 729 Air | 101.3 | 0 | 1.00059 |  |  | 1 |
| 744 Carbon dioxide | 101.3 101.3 | 0 b | 1.00099 | 0.88 |  | 1 4 |
| 1150 Ethylene | 101.3 101.3 | 0 22.8 | 1.00144 | 1.21 |  | 1 4 |

Notes: 2 Beacham and Divers (1955)

a = saturation vapor pressure 3 Fuoss (1938)

b = ambient temperature 4 Charlton and Cooper (1937)

c = measured breakdown voltage, volts/mil 5 Data from E.I. DuPont de Nemours & References: Co., Inc. 1 CRC (1987) 6 Gbur (2005)

<!-- str. 798 -->

**Table 8 Comparative Refrigerant Performance per Kilowatt of Refrigeration**

| Refrigerant Chemical Name or Composition No. (% by mass) | Evaporator Pressure, MPa | Condenser Pressure, MPa | Compression Ratio | Net Refrigerating Effect, kJ/kg | Refrigerant Circulated, g/s | Liquid Circulated, L/s | Specific Volume of Suction Gas, m<sup>3</sup>/kg | Compressor Displacement, L/s | Power Consumption, kW | Coefficient of Performance | Compressor Discharge Temp., °C |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Evaporator –31.7°C/Condenser 30°C |  |  |  |  |  |  |  |  |  |  |  |
| 744 Carbon dioxide | 1.349 | 7.213 | 5.35 | 132.1 | 7.57 | 0.0128 | 0.0285 | 0.2160 | 0.5892 | 1.698 | 91.3 |
| 170 Ethane | 1.012 | 4.655 | 4.6 | 153.6 | 6.51 | 0.0236 | 0.0548 | 0.3567 | 0.5947 | 1.681 | 57.9 |
| 1270 Propylene | 0.199 | 1.305 | 6.57 | 269.1 | 3.72 | 0.0075 | 0.2266 | 0.8422 | 0.3471 | 2.88 | 49.1 |
| 507A R-125/143a (50/50) | 0.199 | 1.460 | 7.34 | 101.1 | 9.89 | 0.0097 | 0.0949 | 0.9360 | 0.3887 | 2.573 | 38.1 |
| 404A R-125/143a/134a (44/52/4) | 0.190 | 1.421 | 7.46 | 104.9 | 9.54 | 0.0093 | 0.1005 | 0.9565 | 0.3853 | 2.595 | 38.9 |
| 502 R-22/115 (48.8/51.2) | 0.183 | 1.304 | 7.14 | 97.8 | 10.22 | 0.0086 | 0.0924 | 0.9470 | 0.3651 | 2.739 | 41.3 |
| 22 Chlorodifluoromethane | 0.152 | 1.192 | 7.81 | 155.3 | 6.44 | 0.0055 | 0.1448 | 0.9326 | 0.3369 | 2.967 | 65.4 |
| 717 Ammonia | 0.110 | 1.167 | 10.61 | 1079.1 | 0.93 | 0.0016 | 1.0425 | 0.9643 | 0.3327 | 3.007 | 140.9 |
| Evaporator –6.7°C/Condenser 30°C |  |  |  |  |  |  |  |  |  |  |  |
| 744 Carbon dioxide | 2.909 | 7.213 | 2.48 | 129.5 | 7.72 | 0.0130 | 0.0127 | 0.0977 | 0.2845 | 3.514 | 61.3 |
| 170 Ethane | 2.024 | 4.655 | 2.3 | 163.1 | 6.13 | 0.0222 | 0.0263 | 0.1612 | 0.2786 | 3.588 | 46.6 |
| 32 Difluoromethane | 0.653 | 1.928 | 2.95 | 258.6 | 3.87 | 0.0041 | 0.0563 | 0.2178 | 0.1690 | 5.924 | 59.7 |
| 410A R-32/125 (50/50) | 0.643 | 1.886 | 2.94 | 170.9 | 5.85 | 0.0057 | 0.0406 | 0.2381 | 0.1728 | 5.78 | 46.6 |
| 507A R-125/143a (50/50) | 0.503 | 1.460 | 2.9 | 114.9 | 8.70 | 0.0085 | 0.0385 | 0.3349 | 0.1798 | 5.564 | 34.2 |
| 404A R-125/143a/134a (44/52/4) | 0.486 | 1.421 | 2.92 | 118.8 | 8.42 | 0.0083 | 0.0405 | 0.3410 | 0.1785 | 5.598 | 34.6 |
| 1270 Propylene | 0.476 | 1.305 | 2.74 | 294.4 | 3.40 | 0.0068 | 0.0986 | 0.3359 | 0.1675 | 5.975 | 39.3 |
| 502 R-22/115 (48.8/51.2) | 0.457 | 1.304 | 2.86 | 109.5 | 9.13 | 0.0077 | 0.0386 | 0.3527 | 0.1724 | 5.799 | 35.4 |
| 22 Chlorodifluoromethane | 0.399 | 1.192 | 2.99 | 165.9 | 6.03 | 0.0051 | 0.0584 | 0.3520 | 0.1637 | 6.105 | 47.8 |
| 407C R-32/125/134a (23/25/52) | 0.396 | 1.267 | 3.19 | 167.1 | 5.98 | 0.0053 | 0.0588 | 0.3518 | 0.1686 | 5.93 | 43.9 |
| 290 Propane | 0.385 | 1.079 | 2.8 | 288.6 | 3.47 | 0.0072 | 0.1180 | 0.4093 | 0.1669 | 5.987 | 34.9 |
| 717 Ammonia | 0.332 | 1.167 | 3.51 | 1113.0 | 0.90 | 0.0015 | 0.3689 | 0.3313 | 0.1599 | 6.254 | 82.1 |
| 1234yf 2,3,3,3-Tetrafluoropropene* | 0.250 | 0.783 | 3.13 | 120.5 | 8.30 | 0.0077 | 0.0718 | 0.5954 | 0.1715 | 5.835 | 30.0 |
| 134a Tetrafluoroethane | 0.228 | 0.770 | 3.37 | 153.0 | 6.54 | 0.0055 | 0.0880 | 0.5745 | 0.1650 | 6.063 | 34.8 |
| 1234ze(E) trans-1,3,3,3-Tetrafluoropropene* | 0.168 | 0.578 | 3.44 | 139.6 | 7.16 | 0.0063 | 0.1086 | 0.7798 | 0.1658 | 6.03 | 30.0 |
| 600a Isobutane* | 0.123 | 0.405 | 3.29 | 278.0 | 3.60 | 0.0066 | 0.2984 | 1.0723 | 0.1620 | 6.171 | 30.0 |
| Evaporator 7.2°C/Condenser 30°C |  |  |  |  |  |  |  |  |  |  |  |
| 32 Difluoromethane | 1.018 | 1.928 | 1.89 | 261.1 | 3.83 | 0.0040 | 0.0360 | 0.1381 | 0.0944 | 10.602 | 46.9 |
| 410A R-32/125 (50/50) | 1.000 | 1.886 | 1.89 | 175.0 | 5.71 | 0.0055 | 0.0260 | 0.1484 | 0.0965 | 10.379 | 39.8 |
| 502 R-22/115 (48.8/51.2) | 0.703 | 1.304 | 1.85 | 115.3 | 8.67 | 0.0073 | 0.0252 | 0.2187 | 0.0956 | 10.474 | 33.2 |
| 407C R-32/125/134a (23/25/52) | 0.640 | 1.267 | 1.98 | 173.7 | 5.76 | 0.0051 | 0.0367 | 0.2112 | 0.0939 | 10.655 | 39.3 |
| 22 Chlorodifluoromethane | 0.626 | 1.192 | 1.9 | 171.0 | 5.85 | 0.0050 | 0.0377 | 0.2205 | 0.0918 | 10.885 | 40.3 |
| 290 Propane | 0.588 | 1.079 | 1.84 | 303.9 | 3.29 | 0.0068 | 0.0787 | 0.2580 | 0.0931 | 10.743 | 32.6 |
| 717 Ammonia | 0.558 | 1.167 | 2.09 | 1127.8 | 0.89 | 0.0015 | 0.2254 | 0.1998 | 0.0893 | 11.186 | 58.6 |
| 500 R-12/152a (73.8/26.2) | 0.458 | 0.880 | 1.92 | 150.4 | 6.65 | 0.0059 | 0.0453 | 0.3010 | 0.0916 | 10.925 | 34.6 |
| 1234yf 2,3,3,3-Tetrafluoropropene* | 0.401 | 0.783 | 1.96 | 129.0 | 7.75 | 0.0072 | 0.0453 | 0.3514 | 0.0941 | 10.623 | 30.0 |
| 12 Dichlorodifluoromethane | 0.388 | 0.744 | 1.92 | 126.9 | 7.88 | 0.0061 | 0.0449 | 0.3536 | 0.0910 | 11.004 | 33.1 |
| 134a Tetrafluoroethane | 0.377 | 0.770 | 2.04 | 161.0 | 6.21 | 0.0052 | 0.0542 | 0.3364 | 0.0918 | 10.903 | 32.6 |
| 1234ze(E) trans-1,3,3,3-Tetrafluoropropene* | 0.280 | 0.578 | 2.06 | 149.1 | 6.71 | 0.0059 | 0.0668 | 0.4483 | 0.0918 | 10.899 | 30.0 |
| 600a Isobutane* | 0.201 | 0.405 | 2.01 | 296.3 | 3.37 | 0.0062 | 0.1879 | 0.6332 | 0.0901 | 11.084 | 30.0 |
| 600 Butane* | 0.134 | 0.283 | 2.11 | 326.9 | 3.06 | 0.0054 | 0.2853 | 0.8725 | 0.0891 | 11.226 | 30.0 |
| 123 Dichlorotrifluoroethane | 0.045 | 0.110 | 2.44 | 155.5 | 6.43 | 0.0044 | 0.3309 | 2.1269 | 0.0878 | 11.397 | 30.0 |
| 113 Trichlorotrifluoroethane* | 0.021 | 0.054 | 2.57 | 137.6 | 7.27 | 0.0047 | 0.5874 | 4.2686 | 0.0876 | 11.409 | 30.0 |

*Superheat required Data from NIST CYCLE_D 4.0, zero subcool, zero superheat unless noted, no line losses, 100% efficiencies, average temperatures.

## 4. LEAK DETECTION

Leak detection in refrigeration equipment is of major importance for manufacturers and service engineers.

### Electronic Detection

Electronic detectors are widely used in manufacture and assembly of refrigeration equipment. Techniques include infrared, solid electrolyte semiconductor, heated electrode/diode, and corona discharge sensors. Instrument operation depends on the variation in signal caused by the presence of refrigerant. These instruments can be refrigerant specific or may detect a variety of refrigerants. Other vapors in the local environment may interfere with the test.

The electronic detector is the most sensitive of the methods discussed here, readily capable of sensing a leak of 2.8 g of refrigerant per year. A portable model is available for field testing. Other models are available with automatic balancing systems that correct for background refrigerant vapors that might be present in the atmosphere around the test area.

### Bubble Method

The object to be tested is pressurized with air or nitrogen. A pressure corresponding to operating conditions is generally used. If possible, the object is fully immersed in water, and leaks are detected by observing bubbles in the liquid. Adding a detergent to the water decreases surface tension, prevents escaping gas from clinging to the side of the object, and promotes formation of a regular stream of small bubbles. In addition to dwell time, test sensitivity is influenced by clarity of the liquid, lighting, proximity of the leak site to the operator, and human factors. When immersion is not practical, a solution of soap can be brushed, sprayed, or poured onto joints or other spots where leakage is suspected. Leaking gas forms soap bubbles that can be readily detected. When properly performed under favorable conditions, bubble testing methods can detect leaks as small as 2.8 g of refrigerant per year.

<!-- str. 799 -->

### Pressure Change Methods

The presence of leaks can be determined by pressurizing or evacuating the internals of the part or system and observing the change in pressure or vacuum over a period of time. The vacuum decay test can give an indication of proper dehydration but, like pressure decay, it does not locate the point of leakage. Test methods that are based on pressure change typically are not sensitive enough to meet the needs of refrigerant components and systems used in HVAC applications. The pressure change test methods are useful to verify that a component or system is free from gross leaks. Typical sensitivity is in the range of dozens of kilograms of refrigerant per year.

Leaks can also be determined by pressurizing or evacuating and observing the change in pressure or vacuum over a period of time. This is effective in checking system tightness but does not locate the point of leakage.

### UV Dye Method

A stable UV-fluorescent dye is introduced into the system to be tested. Operating the system mixes the UV dye uniformly in the oil/refrigerant system. The dye, which usually prefers oil, shows up at the leak’s location, and can be detected using an appropriate UV lamp. Ensure that the dye is compatible with system components and that no one is exposed to UV radiation from the lamp. This method only finds defects that are large enough to pass liquid, and will only work effectively in regions of the system where enough oil is available to carry the dye. Thus, this method’s sensitivity is typically significantly lower than that of the electronic detection and bubble test methods.

### Ammonia Leaks

Ammonia can be detected by any of the previously described methods, or by bringing a solution of hydrochloric acid near the object. If ammonia vapor is present, a white cloud or smoke of ammonium chloride forms. Ammonia can also be detected with indicator paper that changes color in the presence of a base. Ensure that adequate ventilation is provided and no one is exposed to ammonia.

## 5. COMPATIBILITY WITH CONSTRUCTION MATERIALS

### Metals

Halogenated refrigerants can be used satisfactorily under normal conditions with most common metals, such as steel, cast iron, brass, copper, tin, lead, and aluminum [an important exception is methyl chloride (R-40) in contact with aluminum]. Under more severe conditions, various metals affect properties such as hydrolysis and thermal decomposition in varying degrees. The tendency of metals to promote thermal decomposition of halogenated compounds is in the following order:

(least decomposition) Inconel < 18-8 stainless steel < nickel < copper < 1040 steel < aluminum < bronze < brass < zinc < silver

> (most decomposition)

This order is only approximate, and there may be exceptions for individual compounds or for special use conditions (Downing 1988).

Magnesium alloys and aluminum containing more than 2% magnesium are not recommended for use with halogenated compounds where even trace amounts of water may be present. Zinc is not recommended for use with CFC-113. Experience with zinc and other fluorinated compounds has been limited, but no unusual reactivity has been observed under normal conditions of use in dry systems. However, OxyChem (2009) takes a more conservative position: “Aluminum, zinc, or magnesium equipment should never be allowed to come in contact with methyl chloride.”

In 2011, several suspected substitutions of R-40-containing refrigerant mixtures for R-134a in aluminum-containing refrigeration and air-conditioning systems resulted in equipment failures, explosions, and even fatalities (Powell 2012; WorldCargo News 2011). Reactions of methyl chloride with aluminum are known (Dow 2007; Linde 2010; OxyChem 2009), and several publications advise not using aluminum containers for methyl chloride (Dow 2010; European Industrial Gases Association 2010). Studies are under way to quantify the reactivity of methyl chloride concentrations in R-134a/aluminum systems, and identify methods of safe handling, neutralization, and disposal of R-40-contaminated refrigerants. R-40 contamination appears to be part of a broader global issue of fake and counterfeit refrigerants. Press reports [e.g., ACR News (2011a, 2011b, 2012)] describe discovery of R-40 and other contaminants, including hydrocarbons and illegal ozone-depleting substances, found in service market refrigerant containers with fake labels, and in refrigeration and air-conditioning systems on several continents, including North America. Using best practices in the service industry is essential, particularly using refrigerant identification methods to ensure refrigerant systems contain and are refilled with genuine refrigerant. Refrigerant manufacturers are developing additional means to deter counterfeit products.

Ammonia should never be used with copper, brass, or other alloys containing copper. Metals compatibility data for ammonia, carbon dioxide, and hydrocarbons are provided by Pruett (1995). Further information on compatibility of refrigerants and lubricants with construction materials metals, elastomers, and plastics is in Chapter 6 of the 2018 ASHRAE Handbook—Refrigeration and in publications of the Air-Conditioning, Heating, and Refrigeration Technology Institute (AHRTI), the research branch of the Air-Conditioning, Heating, and Refrigeration Institute (AHRI). For example, Rohatgi et al. (2012) investigated thermal and chemical stability of five refrigerants [HFO-1234yf, HFO-1234ze, R-32/HFO-1234yf (equal mass percentages), R-410A, and R-134a] and three lubricants (two types of POEs and a PVE). The report can be downloaded from AHRI’s web site.

### Elastomers

Linear swelling of some elastomers in the liquid phase of HCFC and HFC refrigerants is shown in Table 9 (Hamed et al. 1994). Swelling data can be used to a limited extent in comparing the effect of refrigerants on elastomers. However, other factors, such as the amount of extraction, tensile strength, and degree of hardness of the exposed elastomer, must be considered. When other fluids (e.g., lubricants) are present in addition to the refrigerant, the combined effect on elastomers should be determined. Extensive test data for compatibility of elastomers and gasketing materials with refrigerants and lubricants are reported by Hamed et al. (1994). More recent elastomer compatibility data for R-134a and R-1234yf were reported by Minor and Spatz (2008). Six elastomers were contacted with the refrigerants and a PAG lubricant at 100°C for two weeks. Linear swell percentages for the elastomers were very similar in the tests: in the range of –1.4 to +2.1% with R-134a and –1.6 to +1.6% with R-1234yf. Mass gain and hardness changes for the elastomers were also similar in the tests, except for silicone elastomer in R-1234yf having a larger decrease in hardness.

**Table 9 Swelling of Elastomers in Liquid Refrigerants at Room Temperature, % Linear Swell**

| Refrigerant Number | Polyisoprene (Sulfur Cure) | Polychloroprene | Butyl Rubber | Styrene Butadiene Rubber | Nitrile Rubber | Fluoroelastomer |
|---|---|---|---|---|---|---|
| 22 | 10.2 | 6.1 | 3.9 | 9.8 | 51.4 | 33.2 |
| 123 | 48.0 | 15.3 | 16.3 | 40.8 | 83.7 | 31.6 |
| 124 | 5.8 | 2.8 | 3.2 | 4.1 | 45.9 | 29.0 |
| 142b | 10.2 | 6.5 | 6.2 | 7.3 | 8.7 | 31.8 |
| 32 | 2.7 | 1.0 | 1.0 | 2.0 | 8.3 | 23.2 |
| 125 | 4.2 | 2.7 | 2.6 | 3.6 | 3.9 | 11.7 |
| 134a | 1.2 | 1.2 | 0.6 | 1.0 | 5.1 | 25.6 |
| 143a | 1.9 | 1.2 | 1.3 | 1.5 | 2.0 | 13.6 |
| 152a | 4.2 | 3.0 | 1.7 | 2.8 | 8.8 | 39.1 |

<!-- str. 800 -->

Permeation of fluids through elastomers is another consideration, such as with elastomeric hoses in mobile air-conditioning systems. Refrigerant can be lost by outward permeation of refrigerant through the hoses, and water can enter the system by inward diffusion. Data for water and refrigerant permeation through many types of elastomers are presented by Downing (1988). Multilayer hose construction is used to significantly reduce water ingression and refrigerant permeation loss. A typical hose construction might be an outer cover of chlorobutyl elastomer to reduce water ingression, a layer of polyamide to reduce refrigerant permeation, and the inner tube of chloroprene. Hose manufacturers offer variations of such constructions based on their proprietary technology. Refrigerant permeation test data for R-134a and R-1234yf through these types of hose constructions were reported by Minor and Spatz (2008) and Hill and Grimm (2008). In all cases, the permeation rates of R-1234yf were lower than those of R-134a. Majurin et al. (2014) also investigated materials compatibility of HFO-1234yf, HFO-1234ze, and a blend of 1234yf/1234ze/R-32 (equal mass percentages) with various elastomers and other motor materials, and found a wide range of compatible materials; the report is available on AHRI’s website.

See Pruett (1994) for compatibility data for elastomers with ammonia, carbon dioxide, and hydrocarbons.

### Plastics

The effect of a refrigerant on a plastic material should be thoroughly examined under conditions of intended use, including the presence of lubricants. Plastics are often mixtures of two or more basic types, and it is difficult to predict the refrigerant’s effect. Mass and visual changes can be used as a general guide of effect, but changes in the plastic’s properties should also be examined. Extensive test data for compatibility of plastics with refrigerants and lubricants are reported by Cavestri (1993), including 23 plastics, 10 refrigerants, 7 lubricants, and 17 refrigerant/lubricant combinations. Refrigerants and lubricants had little effect on most of the plastics, though acrylonitrile-butadiene-styrene, polyphenylene oxide, and polycarbonate were affected enough to be considered incompatible. In a separate study by DuPont Fluoroproducts (2003), acrylonitrile butadiene styrene and polystyrene were determined to have questionable compatibility with HCFC and HFC refrigerants.

R-134a and R-1234yf were evaluated for compatibility with typical plastics used in automotive air-conditioning systems (Minor and Spatz 2008). Five plastics (polyester, nylon, epoxy, polyethylene terephthalate, and polyimide) were contacted in sealed tubes containing the refrigerants and PAG lubricant, and held at 100°C for two weeks. The plastics were evaluated for changes in mass and appearance 24 h after test completion, finding essentially the same positive ratings of the two refrigerants with the plastics.

For data an compatibility of plastics with ammonia, carbon dioxide, and hydrocarbons, see Pruett (2000).

### Additional Compatibility Reports

The Air-Conditioning, Heating, and Refrigeration Institute (AHRI) has supported research programs for refrigerants stability and materials compatibility through their Materials Compatibility and Lubricants Research (MCLR) Program, beginning in the early 1990s for replacements for CFCs. Resulting research reports are available from AHRI, with the following refrigerants stability/materials compatibility research topics: plastics (Cavestri 1993), lubricant additives (Cavestri 1997), system contaminants (Cavestri 2000), motor materials (Doerr and Kujak 1993; Doerr and Waite 1996), desiccants (Field 1995), elastomers (Hamed et al. 1994), and metals (Huttenlocher 1992). Cavestri et al. (2010) studied five refrigerants (R-417A, R-422D, R-424A, R-434A, and R-438A) and lubricants in contact with aluminum, copper, and steel coupons, and with nonmetallic materials of construction (elastomers, sealants, and plastics). They found, “A general, overall statement can be made that material changes for the R-22 alternative refrigerants investigated in this study do not have statistically significant differences compared to R-22 exposure in both time and temperature.” Two recent AHRI projects investigated materials compatibility of HFO refrigerants. Phase I covered thermal stability of 1234yf, 1234ze, and a 1234yf/R-32 blend with lubricants in the presence of metals (Rohatgi et al. 2012). Phase II focused on compatibility with plastics, elastomers, and motor materials (Majurin et al. 2014). Both reports show that HFOs have compatibility with a wide range of materials used in HVAC&R systems.

## REFERENCES

ASHRAE members can access ASHRAE Journal articles and ASHRAE research project final reports at technologyportal .ashrae.org. Articles and reports are also available for purchase by nonmembers in the online ASHRAE Bookstore at www.ashrae.org /bookstore.

ACR News. 2011a. Methyl chloride to blame for reefer explosions? (Nov. 6). ACR News. 2011b. Fake refrigerants becoming a “serious problem.” (Nov. 15). ACR News. 2012. Traces of dangerous refrigerant found in returned cylinders. (July 16).

AHRI. 2011. Specification for fluorocarbon refrigerants. Standard 700-2011.

Air-Conditioning, Heating, and Refrigeration Institute, Arlington, VA. ARAP. 1999. Global comparative analysis of HFC and alternative technologies for refrigeration, air conditioning, foam, solvent, aerosol propellant, and fire protection applications. Final Report to the Alliance for Responsible Atmospheric Policy, Arlington, VA. Dieckmann, J., Arthur D. Little, Inc., and Hillel Magid Consultant. unfccc.int/methods/other _methodological_issues/interactions_with_ozone_layer/items/378.php. ASHRAE. 2016. Designation and safety classification of refrigerants. ANSI/ASHRAE Standard 34-2016.

Bararo, M.T., U.V. Mardolcar, and C.A. Nieto de Castro. 1997. Molecular properties of alternative refrigerants derived from dielectric-constant measurements. *Journal of Thermophysics* 18(2):419-438.

Beacham, E.A., and R.T. Divers. 1955. Some aspects of the dielectric properties of refrigerants. Refrigerating Engineering 7:33.

Calm, J. C., G. C. Hourahan, A. Vonsild, D. Clodic, and D. Colbourne. 2015.

*2014 Report of the refrigeration, air conditioning, and heat pumps tech-* *nical options committee*, Ch. 2: Refrigerants. United Nations Environment Programme (UNEP) Ozone Secretariat, Nairobi. ozone.unep.org /en/assessment-panels/technology-and-economic-assessment-panel. Cavestri, R.C. 1993. Compatibility of refrigerants and lubricants with engineering plastics. Report DOE/CE/23810-15. Air Conditioning and Refrigeration Technology Institute (ARTI), Arlington, VA.

Cavestri, R.C. 1997. Compatibility of lubricant additives with HFC refrigerants and synthetic lubricants. Report DOE/CE/23810-76. Air Conditioning and Refrigeration Technology Institute (ARTI), Arlington, VA.

Cavestri, R.C. 2000. Effect of selected contaminants in air conditioning and refrigeration equipment. Report DOE/CE/23810-111. Air Conditioning and Refrigeration Technology Institute (ARTI), Arlington, VA.

Cavestri, R.C., M. El-Shazly, and D. Seeger-Clevenger. 2010. Thermal stability and chemical compatibility of R-22 replacement refrigerants. AHRI Project 8003. Air Conditioning, Heating, and Refrigeration Institute, Arlington, VA.

Charlton, E.E., and F.S. Cooper. 1937. Dielectric strengths of insulating fluids. *General Electric Review* 865(9):438.

CRC. 1987. *CRC handbook of chemistry and physics*, 68th ed. CRC Press, Boca Raton, FL.

Doerr, R.G., and S.A. Kujak. 1993. Compatibility of refrigerants and lubricants with motor materials. Report DOE/CE/23810-13. Air Conditioning and Refrigeration Technology Institute, Arlington, VA.

<!-- str. 801 -->

Doerr, R.G., and T.D. Waite. 1996. Compatibility of refrigerants and lubricants with motor materials under retrofit conditions. Report DOE/CE/23810-63. Air Conditioning and Refrigeration Technology Institute, Arlington, VA.

Dow. 2007. *Product safety assessment: Methyl chloride*. Dow Chemical Company, Midland MI.

Dow. 2010. *Material safety data sheet: Methyl chloride*. Dow Chemical Company, Midland, MI.

Downing, R.C. 1988. *Fluorocarbon refrigerants handbook*. Prentice Hall, Englewood Cliffs, NJ.

DuPont. Bulletin B-32A. Freon Products Division. E.I. DuPont de Nemours & Co., Wilmington, DE.

DuPont Fluoroproducts. 2003. *Technical Information Bulletins for HFC-134a,* *R-407C and R-410A*. E.I. DuPont de Nemours & Co., Wilmington, DE.

Eiseman, B.J., Jr. 1955. How electrical properties of Freon compounds affect hermetic system’s insulation. Refrigerating Engineering 4:61.

European Industrial Gases Association. 2010. Gas compatibility with aluminum alloy cylinders. IGC Document 161/10/E. Brussels, Belgium.

Fellows, B.R., R.G. Richard, and I.R. Shankland. 1991. Electrical characterization of alternate refrigerants. *Actes Congrès International du Froid* 18(2). International Institute of Refrigeration, Paris.

Field, J.E. 1995. Sealed tube comparisons of the compatibility of desiccants with refrigerants and lubricants. Report DOE/CE/23810-54. Air Conditioning and Refrigeration Technology Institute, Arlington, VA.

Fischer, S.K., P.J. Hughes, P.D. Fairchild, C.L. Kusik, J.T. Dieckmann, E.M.

McMahon, and N. Hobay. 1991. *Energy and global warming impacts of* *CFC alternative technologies*. Sponsored by the Alternative Fluorocarbons Environmental Acceptability Study (AFEAS) and the U.S. Department of Energy (DOE). www.ciesin.org/docs/011-459/011-459.html. Fuoss, R.M. 1938. Dielectric constants of some fluorine compounds. Journal *of the American Chemical Society* 64:1633.

Gbur, A.M., and J.J. Byrne. 2001. Determination of dieletric properties of refrigerants. ASHRAE Research Project RP-1074, Final Report.

Hamed, G.R., R.H. Seiple, and O. Taikum. 1994. Compatibility of refrigerants and lubricants with elastomers. Report DOE/CE/23810-14. Air Conditioning and Refrigeration Technology Institute, Arlington, VA.

*Handbook of chemistry*, 10th ed. 1967. McGraw-Hill, New York.

Hill, W., and U. Grimm. 2008. *Overview of SAE Cooperative Research Pro-* *gram CRP1234-2 for alternative refrigerants*. SAE International AARS. Phoenix. AZ.

Huttenlocher, D.F. 1992. Chemical and thermal stability of refrigerant-lubricant mixtures with metals. Report DOE/CE/23810-5. Air Conditioning and Refrigeration Technology Institute, Arlington, VA.

IPCC. 2007. *Climate change 2007: The physical science basis. Contribution* *of working group I to the fourth assessment report of the Intergovernmen-* *tal Panel on Climate Change*. S. Solomon, D. Qin, M. Manning, Z. Chen, M. Marquis, K.B. Averyt, M. Tignor, and H.L. Miller, eds. Cambridge University Press, Cambridge, U.K. ipcc.ch/publications_and _data/ar4/wg1/en/contents.html.

IPCC. 2013. *Climate change 2013: The physical science basis*. Contribution of working group I to the fifth assessment report of the Intergovernmental Panel on Climate Change. T.F. Stoecker, D. Qin, G.-K. Plattner, M. Tignor, S.K. Allen, J. Boschung, A. Nauels, Y. Xia, V. Bex, and P.M. Midgely, eds. Cambridge University Press.

IPCC. 2014. *Climate change 2014: Synthesis report*. *Contribution of work-* *ing groups I, II, and III to the fifth assessment report of the Intergovern-* *mental Panel on Climate Change*. Core writing team, R.K. Pachauri, and L.A. Meyer, eds. International Panel on Climate Change, Geneva. www .ipcc.ch/report/ar5/syr/.

Kirk and Othmer. 1956. *The encyclopedia of chemical technology*. Interscience Encyclopedia, New York.

Linde. 2010. *Material safety data sheet: Methyl chloride*. Linde Gas North America LLC, Murray Hill, NJ.

Majurin, J. A., E. Sorenson, S. J. Staats, W. Gilles and S. J. Kujak. 2014.

*Material compatibility and lubricants research for low GWP refriger-* *ant—Phase II: Chemical and material compatibility of low GWP refrig-* *erants with HVACR material of construction.* AHRI Project 08007. www.ahrinet.org/App_Content/ahri/files/RESEARCH/Technical%20 Results/AHRI_Project-8007_Final_Report.pdf.

Meurer, C., G. Pietsch, and M. Haacke. 2001. Electrical properties of CFC- and HCFC-substitutes. *International Journal of Refrigeration* 24(2):171-175.

Minor, B., and M. Spatz. 2008. *HFO-1234yf low GWP refrigerant update.* Presentation charts. International Refrigeration and Air Conditioning Conference, Purdue University, West Lafayette, IN. www2.dupont.com /Refrigerants/en_US/assets/downloads/SmartAutoAC/MAC_Purdue _HFO_1234yf.pdf.

Muller, Y., S. Feja, and U. Grimm. 2011. Electrical properties of the liquid phase of refrigerant oil mixtures. SAE International Automotive Refrigerant and System Efficiency Symposium, Scottsdale, AZ.

NIST. 2010. *NIST reference fluid thermodynamic and transport properties* database (REFPROP), v. 9.0. National Institute of Standards and Technology, Gaithersburg, MD.

OxyChem. 2009. Reaction of methyl chloride with aluminum. OxyChem *Technical Data Sheet* 510-101. Wichita, KS.

Pereira, L.F., F.E. Brito, A.N. Gurova, U.V. Mardolcar, and C.A. Nieta de Castro. 1999. Dipole moment, expansivity and compressibility coefficients of HFC 125 derived from dielectric constant measurements. 1st International Workshop on Thermochemical, Thermodynamic and Transport Properties of Halogenated Hydrocarbons and Mixtures, Pisa, Italy.

Powell, P. 2012. Rogue refrigerant blend linked to fatalities. Air Condition-*ing, Heating, and Refrigeration News* (January 9). Troy, MI. www .achrnews.com/articles/rogue-refrigerant-blend-linked-to-fatalities.

Pruett, K.M. 1994. *Chemical resistance guide for elastomers II*. Compass Publications, La Mesa, CA.

Pruett, K.M. 1995. *Chemical resistance guide for metals and alloys*. Compass Publications, La Mesa, CA.

Pruett, K.M. 2000. *Chemical resistance guide for plastics*. Compass Publications, La Mesa, CA.

Ravishankara, A.R., A.A. Turnipseed, N.R. Jensen, and R.F. Warren. 1994. Do hydrofluorocarbons destroy stratospheric ozone? Science 248:1217-1219.

Rohatgi, N.D., R.W. Clark, D.R. Hurst. 2012. *Material compatibility &* *lubricants research for low GWP refrigerants—Phase I: Thermal and* *chemical stability of low GWP refrigerants with lubricants*. Project 09004-01. www.ahrinet.org/site/511/Resources/Research/Public-Sector -Research/Technical-Results.

UNEP. 2009. *Handbook for the international treaties for the protection of the* ozone layer, 8th ed. United Nations Environment Programme (UNEP) Ozone Secretariat, Nairobi, Kenya. ozone.unep.org/.

WorldCargo News. 2011. Alarm sounded over exploding reefers. (October 26). WCN Publishing. Leatherhead, Surrey, UK. www.worldcargonews .com/htm/w20111026.937700.htm.

## BIBLIOGRAPHY

Calm, J.M., and G.C. Hourahan. 2011. *2010 Report of the refrigeration, air* *conditioning and heat pumps technical options committee*, Chapter 2: Refrigerants. United Nations Environment Programme (UNEP) Ozone Secretariat, Nairobi, Kenya. ozone.unep.org/teap/Reports/RTOC/RTOC -Assessment-report-2010.pdf.

Calm, J.M., and G.C. Hourahan. 2011. Physical, safety, and environmental data for current and alternative refrigerants. *Refrigeration for Sustainable* *Development: Proceedings of the 23rd International Congress of Refrig-* eration, Paper 915. International Institute of Refrigeration, Paris.

IPCC. 2007. *Climate change 2007: Synthesis report. Contribution of work-* *ing groups I, II, and III to the fourth assessment report of the Intergov-* *ernmental Panel on Climate Change*. Core Writing Team, R.K. Pachauri, and A. Reisinger, eds. International Panel on Climate Change, Geneva. www.ipcc.ch/publications_and_data/ar4/syr/en/contents.html.

Lemmon, E.W., M.O. McLinden, and M.L. Huber. 2002. NIST standard *reference database 23*, v. 9.0. National Institute of Standards and Technology, Gaithersburg, MD.

*Matheson gas data book*. 2001. Matheson Company, East Rutherford, NJ.
