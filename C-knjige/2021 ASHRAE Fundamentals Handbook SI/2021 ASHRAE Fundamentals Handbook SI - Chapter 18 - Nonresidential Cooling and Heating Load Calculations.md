# Chapter 18 — Nonresidential Cooling and Heating Load Calculations

*Izvor: 2021 ASHRAE Handbook — Fundamentals (SI), Chapter 18 (PDF str. 476–541).*

> **Napomena o konverziji:** Tekst je automatski izdvojen iz originalnog PDF-a uz prepoznavanje dve kolone, spojene prelomljene reči i pasuse. Indeksi i eksponenti su označeni sa `<sub>`/`<sup>`, tabele su pretvorene u Markdown tabele (veoma složene tabele su prikazane kao poravnat tekst), a slike su izrezane iz PDF-a u folder `img/`. Složene jednačine (razlomci, sume) mogu biti uprošćeno prikazane. **Pre upotrebe vrednosti u proračunu proveriti u originalnom PDF-u.** Oznake `<!-- str. N -->` pokazuju stranu PDF-a.

## Sadržaj

- [1. COOLING LOAD CALCULATION PRINCIPLES](#1-cooling-load-calculation-principles)
- [1.1 TERMINOLOGY](#11-terminology)
- [1.2 COOLING LOAD CALCULATION METHODS](#12-cooling-load-calculation-methods)
- [1.3 DATA ASSEMBLY](#13-data-assembly)
- [2. INTERNAL HEAT GAINS](#2-internal-heat-gains)
- [2.1 PEOPLE](#21-people)
- [2.2 LIGHTING](#22-lighting)
- [2.3 ELECTRIC MOTORS](#23-electric-motors)
- [2.4 APPLIANCES](#24-appliances)
- [3. INFILTRATION AND MOISTURE MIGRATION HEAT GAINS](#3-infiltration-and-moisture-migration-heat-gains)
- [3.1 INFILTRATION](#31-infiltration)
- [3.2 LATENT HEAT GAIN FROM MOISTURE DIFFUSION](#32-latent-heat-gain-from-moisture-diffusion)
- [3.3 OTHER LATENT LOADS](#33-other-latent-loads)
- [4. FENESTRATION HEAT GAIN](#4-fenestration-heat-gain)
- [4.1 FENESTRATION DIRECT SOLAR, DIFFUSE SOLAR, AND CONDUCTIVE HEAT GAINS](#41-fenestration-direct-solar-diffuse-solar-and-conductive-heat-gains)
- [4.2 EXTERIOR SHADING](#42-exterior-shading)
- [5. HEAT BALANCE METHOD](#5-heat-balance-method)
- [5.1 ASSUMPTIONS](#51-assumptions)
- [5.2 ELEMENTS](#52-elements)
- [5.3 GENERAL ZONE FOR LOAD CALCULATION](#53-general-zone-for-load-calculation)
- [5.4 MATHEMATICAL DESCRIPTION](#54-mathematical-description)
- [5.5 INPUT REQUIRED](#55-input-required)
- [6. RADIANT TIME SERIES (RTS) METHOD](#6-radiant-time-series-rts-method)
- [6.1 ASSUMPTIONS AND PRINCIPLES](#61-assumptions-and-principles)
- [6.2 OVERVIEW](#62-overview)
- [6.3 RTS PROCEDURE](#63-rts-procedure)
- [6.4 HEAT GAIN THROUGH EXTERIOR SURFACES](#64-heat-gain-through-exterior-surfaces)
- [6.5 HEAT GAIN THROUGH INTERIOR SURFACES](#65-heat-gain-through-interior-surfaces)
- [6.6 CALCULATING COOLING LOAD](#66-calculating-cooling-load)
- [7. HEATING LOAD CALCULATIONS](#7-heating-load-calculations)
- [7.1 HEAT LOSS CALCULATIONS](#71-heat-loss-calculations)
- [7.2 HEATING SAFETY FACTORS AND LOAD ALLOWANCES](#72-heating-safety-factors-and-load-allowances)
- [7.3 OTHER HEATING CONSIDERATIONS](#73-other-heating-considerations)
- [8. SYSTEM HEATING AND COOLING LOAD EFFECTS](#8-system-heating-and-cooling-load-effects)
- [8.1 ZONING](#81-zoning)
- [8.2 VENTILATION](#82-ventilation)
- [8.3 AIR HEAT TRANSPORT SYSTEMS](#83-air-heat-transport-systems)
- [8.4 CENTRAL PLANT](#84-central-plant)
- [9. EXAMPLE COOLING AND HEATING LOAD CALCULATIONS](#9-example-cooling-and-heating-load-calculations)
- [9.1 SINGLE-ROOM EXAMPLE](#91-single-room-example)
- [9.2 SINGLE-ROOM EXAMPLE PEAK HEATING LOAD](#92-single-room-example-peak-heating-load)
- [9.3 WHOLE-BUILDING EXAMPLE](#93-whole-building-example)
- [10. PREVIOUS COOLING LOAD CALCULATION METHODS](#10-previous-cooling-load-calculation-methods)
- [REFERENCES](#references)
- [BIBLIOGRAPHY](#bibliography)

<!-- str. 476 -->

HEATING and cooling load calculations are the primary design basis for most heating and air-conditioning systems and components. These calculations affect the size of piping, ductwork, diffusers, air handlers, boilers, chillers, coils, compressors, fans, and every other component of systems that condition indoor environments. Cooling and heating load calculations can significantly affect first cost of building construction, comfort and productivity of occupants, and operating cost and energy consumption.

Simply put, heating and cooling loads are the rates of energy input (heating) or removal (cooling) required to maintain an indoor environment at a desired temperature and humidity condition. Heating and air conditioning systems are designed, sized, and controlled to accomplish that energy transfer. The amount of heating or cooling required at any particular time varies widely, depending on external (e.g., outdoor temperature) and internal (e.g., number of people occupying a space) factors.

Peak design heating and cooling load calculations, which are this chapter’s focus, seek to determine the maximum rate of heating and cooling energy transfer needed at any point in time. Similar principles, but with different assumptions, data, and application, can be used to estimate building energy consumption, as described in Chapter 19.

This chapter discusses common elements of cooling load calculation (e.g., internal heat gain, ventilation and infiltration, moisture migration, fenestration heat gain) and two methods of heating and cooling load estimation: heat balance (HB) and radiant time series (RTS).

## 1. COOLING LOAD CALCULATION PRINCIPLES

Cooling loads result from many conduction, convection, and radiation heat transfer processes through the building envelope and from internal sources and system components. Building components or contents that may affect cooling loads include the following:

- **External:** Walls, roofs, windows, skylights, doors, partitions, ceilings, and floors
- **Internal:** Lights, people, appliances, and equipment
- **Infiltration:** Air leakage and moisture migration
- **System:** Outdoor air, duct leakage and heat gain, reheat, fan and pump energy, and energy recovery

## 1.1 TERMINOLOGY

The variables affecting cooling load calculations are numerous, often difficult to define precisely, and always intricately interrelated.

<sub>The preparation of this chapter is assigned to TC 4.1, Load Calculation Data and Procedures.</sub>

Many cooling load components vary widely in magnitude, and possibly direction, during a 24 h period. Because these cyclic changes in load components often are not in phase with each other, each component must be analyzed to establish the maximum cooling load for a building or zone. A **zoned system** (i.e., one serving several independent areas, each with its own temperature control) needs to provide no greater total cooling load capacity than the largest hourly sum of simultaneous zone loads throughout a design day; however, it must handle the peak cooling load for each zone at its individual peak hour. At some times of day during heating or intermediate seasons, some zones may require heating while others require cooling. The zones’ ventilation, humidification, or dehumidification needs must also be considered.

### Heat Flow Rates

In air-conditioning design, the following four related heat flow rates, each of which varies with time, must be differentiated.

**Space Heat Gain.** This instantaneous rate of heat gain is the rate at which heat enters into and/or is generated within a space. Heat gain is classified by its mode of entry into the space and whether it is sensible or latent. **Entry modes** include (1) solar radiation through transparent surfaces; (2) heat conduction through exterior walls and roofs; (3) heat conduction through ceilings, floors, and interior partitions; (4) heat generated in the space by occupants, lights, and appliances; (5) energy transfer through direct-with-space ventilation and infiltration of outdoor air; and (6) miscellaneous heat gains. **Sensible heat** is added directly to the conditioned space by conduction, convection, and/or radiation. **Latent heat** gain occurs when moisture is added to the space (e.g., from vapor emitted by occupants and equipment). To maintain a constant humidity ratio, water vapor must condense on the cooling apparatus and be removed at the same rate it is added to the space. The amount of energy required to offset latent heat gain essentially equals the product of the condensation rate and latent heat of condensation. In selecting cooling equipment, distinguish between sensible and latent heat gain: every cooling apparatus has different maximum removal capacities for sensible versus latent heat for particular operating conditions. In extremely dry climates, humidification may be required, rather than dehumidification, to maintain thermal comfort.

*Radiant Heat Gain*. Radiant energy must first be absorbed by surfaces that enclose the space (walls, floor, and ceiling) and objects in the space (furniture, etc.). When these surfaces and objects become warmer than the surrounding air, some of their heat transfers to the air by convection. The composite heat storage capacity of these surfaces and objects determines the rate at which their respective surface temperatures increase for a given radiant input, and thus governs the relationship between the radiant portion of heat gain and its corresponding part of the space cooling load (Figure 1). The thermal storage effect is critical in differentiating between instantaneous heat gain for a given space and its cooling load at that moment. Predicting the nature and magnitude of this phenomenon to estimate a realistic cooling load for a particular set of circumstances has long been of interest to design engineers; the Bibliography lists some early work on the subject.

<!-- str. 477 -->

![Fig. 1 Origin of Difference Between Magnitude of Instantaneous Heat Gain and Instantaneous Cooling Load](img/ch18/fig-01.png)

*Fig. 1 Origin of Difference Between Magnitude of Instantaneous Heat Gain and Instantaneous Cooling Load*

![Fig. 2 Thermal Storage Effect in Cooling Load from Lights](img/ch18/fig-02.png)

*Fig. 2 Thermal Storage Effect in Cooling Load from Lights*

**Space Cooling Load.** This is the rate at which sensible and latent heat must be removed from the space to maintain a constant space air temperature and humidity. The sum of all space instantaneous heat gains at any given time does not necessarily (or even frequently) equal the cooling load for the space at that same time.

**Space Heat Extraction Rate.** The rates at which sensible and latent heat are removed from the conditioned space equal the space cooling load only if the room air temperature and humidity are constant. Along with the intermittent operation of cooling equipment, control systems usually allow a minor cyclic variation or swing in room temperature; humidity is often allowed to float, but it can be controlled. Therefore, proper simulation of the control system gives a more realistic value of energy removal over a fixed period than using values of the space cooling load. However, this is primarily important for estimating energy use over time; it is not needed to calculate design peak cooling load for equipment selection.

**Cooling Coil Load.** The rate at which energy is removed at a cooling coil serving one or more conditioned spaces equals the sum of instantaneous space cooling loads (or space heat extraction rate, if it is assumed that space temperature and humidity vary) for all spaces served by the coil, plus any system loads. System loads include fan heat gain, duct heat gain, and outdoor air heat and moisture brought into the cooling equipment to satisfy the ventilation air requirement.

### Time Delay Effect

Energy absorbed by walls, floor, furniture, etc., contributes to space cooling load only after a time lag. Some of this energy is still present and reradiating even after the heat sources have been switched off or removed, as shown in Figure 2.

There is always significant delay between the time a heat source is activated, and the point when reradiated energy equals that being instantaneously stored. This time lag must be considered when calculating cooling load, because the load required for the space can be much lower than the instantaneous heat gain being generated, and the space’s peak load may be significantly affected.

Accounting for the time delay effect is the major challenge in cooling load calculations. Several methods, including the two presented in this chapter, have been developed to take the time delay effect into consideration.

## 1.2 COOLING LOAD CALCULATION METHODS

This chapter presents two load calculation methods that vary significantly from previous methods. The technology involved, however (the principle of calculating a heat balance for a given space) is not new. The first of the two methods is the **heat balance (HB) method**; the second is **radiant time series (RTS)**, which is a simplification of the HB procedure. Both methods are explained in their respective sections.

Cooling load calculation of an actual, multiple-room building requires a complex computer program implementing the principles of either method.

### Cooling Load Calculations in Practice

Load calculations should accurately describe the building. All load calculation inputs should be as accurate as reasonable, without using safety factors. Introducing compounding safety factors at multiple levels in the load calculation results in an unrealistic and oversized load.

Variation in heat transmission coefficients of typical building materials and composite assemblies, differing motivations and skills of those who construct the building, unknown infiltration rates, and the manner in which the building is actually operated are some of the variables that make precise calculation impossible. Even if the designer uses reasonable procedures to account for these factors, the calculation can never be more than a good estimate of the actual load. Frequently, a cooling load must be calculated before every parameter in the conditioned space can be properly or completely defined. An example is a cooling load estimate for a new building with many floors of unleased spaces for which detailed partition requirements, furnishings, lighting, and layout cannot be predefined. Potential tenant modifications once the building is occupied also must be considered. Load estimating requires proper engineering judgment that includes a thorough understanding of heat balance fundamentals.

Perimeter spaces exposed to high solar heat gain often need cooling during sunlit portions of traditional heating months, as do completely interior spaces with significant internal heat gain. These spaces can also have significant heating loads during nonsunlit hours or after periods of nonoccupancy, when adjacent spaces have cooled below interior design temperatures. The heating loads involved can be estimated conventionally to offset or to compensate for them and prevent overheating, but they have no direct relationship to the spaces’ design heating loads.

Correct design and sizing of air-conditioning systems require more than calculation of the cooling load in the space to be conditioned. The type of air-conditioning system, ventilation rate, reheat, fan energy, fan location, duct heat loss and gain, duct leakage, heat extraction lighting systems, type of return air system, and any sensible or latent heat recovery all affect system load and component sizing. Adequate system design and component sizing require that system performance be analyzed as a series of psychrometric processes.

System design could be driven by either sensible or latent load, and both need to be checked. In a sensible-load-driven space (the most common case), the cooling supply air has surplus capacity to dehumidify, but this is usually permissible. For a space driven by latent load (e.g., an auditorium), supply airflow based on sensible load is likely not to have enough dehumidifying capability, so subcooling and reheating or some other dehumidification process is needed.

<!-- str. 478 -->

This chapter is primarily concerned with a given space or zone in a building. When estimating loads for a group of spaces (e.g., for an air-handling system that serves multiple zones), the assembled zones must be analyzed to consider (1) the simultaneous effects taking place; (2) any diversification of heat gains for occupants, lighting, or other internal load sources; (3) ventilation; and/or (4) any other unique circumstances. With large buildings that involve more than a single HVAC system, simultaneous loads and any additional diversity also must be considered when designing the central equipment that serves the systems. Methods presented in this chapter are expressed as hourly load summaries, reflecting 24 h input schedules and profiles of the individual load variables. Specific systems and applications may require different profiles.

## 1.3 DATA ASSEMBLY

Calculating space cooling loads requires detailed building design information and weather data at design conditions. Generally, the following information should be compiled.

**Building Characteristics.** Building materials, component size, external surface colors, and shape are usually determined from building plans and specifications.

**Configuration.** Determine building location, orientation, and external shading from building plans and specifications. Shading from adjacent buildings can be determined from a site plan or by visiting the proposed site, but its probable permanence should be carefully evaluated before it is included in the calculation. The possibility of abnormally high ground-reflected solar radiation (e.g., from adjacent water, sand, or parking lots) or solar load from adjacent reflective buildings should not be overlooked.

**Outdoor Design Conditions.** Obtain appropriate weather data, and select outdoor design conditions. Chapter 14 provides information for many weather stations; note, however, that these design dry-bulb and mean coincident wet-bulb temperatures may vary considerably from data traditionally used in various areas. Use judgment to ensure that results are consistent with expectations. Also, consider prevailing wind velocity and the relationship of a project site to the selected weather station.

Recent research projects have greatly expanded the amount of available weather data (e.g., ASHRAE 2012). In addition to the conventional dry bulb with mean coincident wet bulb, data are now available for wet bulb and dew point with mean coincident dry bulb. Peak space load generally coincides with peak solar or peak dry bulb, but peak system load often occurs at peak wet-bulb temperature. The relationship between space and system loads is discussed further in following sections of the chapter.

To estimate conductive heat gain through exterior surfaces and infiltration and outdoor air loads at any time, applicable outdoor dryand wet-bulb temperatures must be used. Chapter 14 gives monthly cooling load design values of outdoor conditions for many locations. These are generally midafternoon conditions; for other times of day, the daily range profile method described in Chapter 14 can be used to estimate dry- and wet-bulb temperatures. Peak cooling load is often determined by solar heat gain through fenestration; this peak may occur in winter months and/or at a time of day when outdoor air temperature is not at its maximum.

**Indoor Design Conditions.** Select indoor dry-bulb temperature, indoor relative humidity, and ventilation rate. Include permissible variations and control limits. Consult ASHRAE Standard 90.1 for energy-savings conditions, and Standard 55 for ranges of indoor conditions needed for thermal comfort.

**Internal Heat Gains and Operating Schedules.** Obtain planned density and a proposed schedule of lighting, occupancy, internal equipment, appliances, and processes that contribute to the internal thermal load.

**Areas.** Use consistent methods for calculation of building areas. For fenestration, the definition of a component’s area must be consistent with associated ratings.

*Gross surface area*. It is efficient and conservative to derive gross surface areas from outer building dimensions, ignoring wall and floor thicknesses and avoiding separate accounting of floor edge and wall corner conditions. Measure floor areas to the outside of adjacent exterior walls or to the centerline of adjacent partitions. When apportioning to rooms, façade area should be divided at partition centerlines. Wall height should be taken as floor-to-floor height.

The outer-dimension procedure is expedient for load calculations, but it is not consistent with rigorous definitions used in building-related standards. The resulting differences do not introduce significant errors in this chapter’s procedures.

Fenestration area. As discussed in Chapter 15, fenestration ratings [U-factor and solar heat gain coefficient (SHGC)] are based on the entire product area, including frames. Thus, for load calculations, fenestration area is the area of the rough opening in the wall or roof.

*Net surface area*. Net surface area is the gross surface area less any enclosed fenestration area.

## 2. INTERNAL HEAT GAINS

Internal heat gains from people, lights, motors, appliances, and equipment can contribute the majority of the cooling load in a modern building. As building envelopes have improved in response to more restrictive energy codes, internal loads have increased because of factors such as increased use of computers and the advent of dense-occupancy spaces (e.g., call centers). Internal heat gain calculation techniques are identical for both heat balance (HB) and radiant time series (RTS) cooling-load calculation methods, so internal heat gain data are presented here independent of calculation methods.

## 2.1 PEOPLE

Table 1 gives representative rates at which sensible heat and moisture are emitted by humans in different states of activity. In high-density spaces, such as auditoriums, these sensible and latent heat gains comprise a large fraction of the total load. Even for short-term occupancy, the extra sensible heat and moisture introduced by people may be significant. See Chapter 9 for detailed information; however, Table 1 summarizes design data for common conditions.

The conversion of sensible heat gain from people to space cooling load is affected by the thermal storage characteristics of that space because some percentage of the sensible load is radiant energy. Latent heat gains are usually considered instantaneous, but research is yielding practical models and data for the latent heat storage of and release from common building materials.

## 2.2 LIGHTING

Because lighting is often a major space cooling load component, an accurate estimate of the space heat gain it imposes is needed. Calculation of this load component is not straightforward; the rate of cooling load from lighting at any given moment can be quite different from the heat equivalent of power supplied instantaneously to those lights, because of heat storage.

### Instantaneous Heat Gain from Lighting

The primary source of heat from lighting comes from light-emitting elements, or lamps, although significant additional heat may be generated from ballasts and other appurtenances in the luminaires. Generally, the instantaneous rate of sensible heat gain from electric lighting may be calculated from

<!-- str. 479 -->

**Table 1 Representative Rates at Which Heat and Moisture Are Given Off by Human Beings in Different States of Activity**

| Degree of Activity | Location | Total Heat, W<br>Adult Male | Total Heat, W<br>Adjusted, M/F<sup>a</sup> | Sensible Heat, W | Latent Heat, W | % Sensible Heat that is Radiant<sup>b</sup><br>Low V | % Sensible Heat that is Radiant<sup>b</sup><br>High V |
|---|---|---|---|---|---|---|---|
| Seated at theater | Theater | 115 | 105 | 70 | 35 | 60 | 27 |
| Seated, very light work | Offices, hotels, apartments | 130 | 115 | 70 | 45 |  |  |
| Moderately active office work | Offices, hotels, apartments | 140 | 130 | 75 | 55 |  |  |
| Standing, light work; walking | Department store; retail store | 160 | 130 | 75 | 55 | 58 | 38 |
| Walking, standing | Drug store, bank | 160 | 145 | 75 | 70 |  |  |
| Sedentary work | Restaurant<sup>c</sup> | 145 | 160 | 80 | 80 |  |  |
| Light bench work | Factory | 235 | 220 | 80 | 140 |  |  |
| Moderate dancing | Dance hall | 265 | 250 | 90 | 160 | 49 | 35 |
| Walking 4.8 km/h; light machine work | Factory | 295 | 295 | 110 | 185 |  |  |
| Bowling<sup>d</sup> | Bowling alley | 440 | 425 | 170 | 255 |  |  |
| Heavy work | Factory | 440 | 425 | 170 | 255 | 54 | 19 |
| Heavy machine work; lifting | Factory | 470 | 470 | 185 | 285 |  |  |
| Athletics | Gymnasium | 585 | 525 | 210 | 315 |  |  |

Notes: <sup>a</sup>Adjusted heat gain is based on normal percentage of men, women, and children for the application listed, 1. Tabulated values are based on 24°C room dry-bulb temperature. and assumes that gain from an adult female is 85% of that for an adult male, and gain from a child is 75% For 27°C room dry bulb, total heat remains the same, but sensible of that for an adult male. heat values should be decreased by approximately 20%, and latent <sup>b</sup>Values approximated from data in Table 6, Chapter 9, where V is air velocity with limits shown in that heat values increased accordingly. table. 2. Also see Table 4, Chapter 9, for additional rates of metabolic heat <sup>c</sup>Adjusted heat gain includes 18 W for food per individual (9 W sensible and 9 W latent). generation. <sup>d</sup>Figure one person per alley actually bowling, and all others as sitting (117 W) or standing or walking 3. All values are rounded to nearest 5 W. slowly (231 W).

> *q<sub>el</sub> = WF<sub>ul</sub>F<sub>sa</sub>*&emsp;**(1)**

where

- q<sub>el</sub> = heat gain, W
- W = total light wattage, W
- F<sub>ul</sub> = lighting use factor
- F<sub>sa</sub> = lighting special allowance factor

The **total light wattage** is obtained from the ratings of all lamps installed, both for general illumination and for display use. Ballasts are not included, but are addressed by a separate factor. Wattages of magnetic ballasts are significant; the energy consumption of high-efficiency electronic ballasts might be insignificant compared to that of the lamps.

The **lighting use factor** is the ratio of wattage in use, for the conditions under which the load estimate is being made, to total installed wattage. For commercial applications such as stores, the use factor is generally 1.0.

The **special allowance factor** is the ratio of the lighting fixtures’ power consumption, including lamps and ballast, to the nominal power consumption of the lamps. For incandescent lights, this factor is 1. For fluorescent lights, it accounts for power consumed by the ballast as well as the ballast’s effect on lamp power consumption. The special allowance factor can be less than 1 for electronic ballasts that lower electricity consumption below the lamp’s rated power consumption. Use manufacturers’ values for system (lamps + ballast) power, when available.

For high-intensity-discharge lamps (e.g. metal halide, mercury vapor, high- and low-pressure sodium vapor lamps), the actual lighting system power consumption should be available from the manufacturer of the fixture or ballast. Ballasts available for metal halide and high-pressure sodium vapor lamps may have special allowance factors from about 1.3 (for low-wattage lamps) down to 1.1 (for high-wattage lamps).

An alternative procedure is to estimate the lighting heat gain on a per-square-metre basis. Such an approach may be required when final lighting plans are not available. Table 2 shows the maximum lighting power density (LPD) (lighting heat gain per square metre) allowed by ASHRAE Standard 90.1-2013 for a range of space types.

In addition to determining the lighting heat gain, the fraction of lighting heat gain that enters the conditioned space may need to be distinguished from the fraction that enters an unconditioned space; of the former category, the distribution between radiative and convective heat gain must be established.

Fisher and Chantrasrisalai (2006) and Zhou et al. (2016) experimentally studied 12 luminaire types and recommended several categories of luminaires, as shown in Table 3. The table provides a range of design data for the conditioned space fraction, short-wave radiative fraction, and long-wave radiative fraction under typical operating conditions: airflow rate of 5 L/(s·m<sup>2</sup>), supply air temperature between 15 and 16.7°C, and room air temperature between 22 and 24°C. The recommended fractions in Table 3 are based on lighting heat input rates range of 9.7 to 28 W/m<sup>2</sup>. For higher design power input, the lower bounds of the space and short-wave fractions should be used; for design power input below this range, the upper bounds of the space and short-wave fractions should be used. The **space fraction** in the table is the fraction of lighting heat gain that goes to the room; the fraction going to the plenum can be computed as 1 – the space fraction. The **radiative fraction** is the radiative part of the lighting heat gain that goes to the room. The convective fraction of the lighting heat gain that goes to the room is 1 – the radiative fraction. Using values in the middle of the range yields sufficiently accurate results. However, values that better suit a specific situation may be determined according to the notes for Table 3.

Table 3’s data apply to both ducted and nonducted returns. However, application of the data, particularly the ceiling plenum fraction, may vary for different return configurations. For instance, for a room with a ducted return, although a portion of the lighting energy initially dissipated to the ceiling plenum is quantitatively equal to the plenum fraction, a large portion of this energy would likely end up as the conditioned space cooling load and a small portion would end up as the cooling load to the return air.

If the space airflow rate is different from the typical condition [i.e., about 5 L/(s·m<sup>2</sup>)], Figure 3 can be used to estimate the lighting heat gain parameters. Design data shown in Figure 3 are only applicable for the recessed fluorescent luminaire without lens.

Although design data presented in Table 3 and Figure 3 can be used for a vented luminaire with side-slot returns, they are likely not applicable for a vented luminaire with lamp compartment returns, because in the latter case, all heat convected in the vented luminaire is likely to go directly to the ceiling plenum, resulting in zero convective fraction and a much lower space fraction. Therefore, the design data should only be used for a configuration where conditioned air is returned through the ceiling grille or luminaire side slots.

<!-- str. 480 -->

**Table 2 Lighting Power Densities Using Space-by-Space Method**

| Common Space Types* LPD, W/m<sup>2</sup> | Common Space Types<sup>a</sup> LPD, W/m<sup>2</sup> | Building-Specific Space Types* LPD, W/m<sup>2</sup> |
|---|---|---|
| Atrium | Loading Dock, Interior 5.1 | Health Care Facility |
| ≤12.2 m high 1.1/m total height | Lobby<br>In facility for the visually impaired 19.4 | In exam/treatment room 18.0<br>In imaging room 16.3 |
| 4.3 + 0.7/m | (and not used primarily by staff)<sup>c</sup> | 7.96 |
| >12.2 m high total height | For elevator 7.0 | In medical supply room<br>In nursery 9.5 |
| Audience Seating Area | In hotel 11.5 | In nurses’ station 7.6 |
| In auditorium 6.8 | In motion picture theater 6.4 | In operating room 26.8 |
| In convention center 8.9 | In performing arts theater 21.6 | In patient room 6.7 |
| In gymnasium 7.1 | All other lobbies 9.7 | In physical therapy room 9.9 |
| In motion picture theater 12.3 | Locker Room 8.1 | In recovery room 12.4 |
| In penitentiary 3.1 | Lounge/Breakroom | Library |
| In performing arts theater 26.2 | In health care facility 10.0 | In reading area 11.5 |
| In religious building 16.5 | All other lounges/breakrooms 7.9 | In stacks 18.4 |
| In sports arena 4.7 | Office | Manufacturing Facility |
| All other audience seating areas 4.7 | Enclosed 12.0 | In detailed manufacturing area 13.9 |
| Banking Activity Area 11.9 | Open plan 10.6 | In equipment room 8.0 |
| Breakroom (See Lounge/Breakroom) | Parking Area, Interior 2.1 | In extra-high-bay area 11.3 |
|  | 18.1 | (15.2 m floor-to-ceiling height) |
| Classroom/Lecture Hall/Training Room | Pharmacy Area |  |
| In penitentiary 14.5 | Restroom | In high-bay area 13.3 |
| 13.4 |  | (7.6 to 15.2 m floor-to-ceiling |
| All other classrooms/lecture halls/ | In facility for the visually impaired 13.1 |  |
|  |  | height) |
| training rooms | (and not used primarily by staff)<sup>c</sup> |  |
|  |  | 12.9 |
| Conference/Meeting/Multipur- 13.3 | All other restrooms 10.6 | In low-bay area |
| pose Room | d 15.5<br>Sales Area | (<7.6 m floor-to-ceiling height) |
| Confinement Cells 8.8 | Seating Area, General 5.9 | Museum |
| Copy/Print Room 7.8 | Stairway | In general exhibition area 11.4 |
|  |  | 11.0 |
| Corridor<sup>b</sup> | Space containing stairway determines LPD and control requirements for stairway. | In restoration room |
| In facility for visually impaired 9.9 |  | Performing Arts Theater, Dress- 6.6 |
| (and not used primarily by staff)<sup>c</sup> |  | ing Room |
|  | Stairwell 7.4 |  |
| In hospital 10.7 | Storage Room | Post Office, Sorting Area 10.2 |
| In manufacturing facility 4.4 | <4.65 m<sup>2</sup> 13.3 | Religious Buildings |
| All other corridors 7.1 | All other storage rooms 6.8 | In fellowship hall 6.9 |
| Courtroom 18.6 | Vehicular Maintenance Area 7.3 | In worship/pulpit/choir area 16.5 |
| Computer Room 18.4 | Workshop 17.2 | Retail Facilities |
|  |  | 7.7 |
| Dining Area |  | In dressing/fitting room |
|  | Building-Specific Space Types* LPD, W/m<sup>2</sup> |  |
| In penitentiary 10.4 |  | In mall concourse 11.9 |
| In facility for visually impaired 28.5 W/m<sup>2</sup> (and not used primarily by staff)<sup>c</sup> | Facility for Visually Impaired<sup>c</sup><br>In chapel (used primarily by 23.8 | Sports Arena, Playing Area<br>For Class I facility 39.7 |
| 11.6 | residents) | 25.9 |
| In bar/lounge or leisure dining |  | For Class II facility |
| In cafeteria or fast food dining 7.0 | In recreation room/common living 26.0 | For Class III facility 19.4 |
| 9.6 | room (and not used primarily by | 13.0 |
| In family dining |  | For Class IV facility |
|  | staff) |  |
| All other dining areas 7.0 |  | Transportation Facility |
| Electrical/Mechanical Room<sup>f</sup> 4.6 | Automotive | In baggage/carousel area 5.7 |
| 6.1 | (See Vehicular Maintenance Area) | 3.9 |
| Emergency Vehicle Garage |  | In an airport concourse |
| Food Preparation Area 13.1 | Convention Center: Exhibit Space 15.7 | At a terminal ticket counter 8.7 |
| Guest Room 9.8 | Dormitory/Living Quarters 4.2 | Warehouse—Storage Area |
| Laboratory | Fire Station: Sleeping Quarters 0.22 | For medium to bulky, palletized 6.2 |
| 15.5 |  | items |
| In or as classroom | Gymnasium/Fitness Center |  |
| All other laboratories 19.5 | In exercise area 7.8 | For smaller, hand-carried items<sup>e</sup> 10.2 |
| Laundry/Washing Area 6.5 | In playing area 13.0 |  |

Source: ASHRAE Standard 90.1-2013. <sup>c</sup>A facility for the visually impaired one that can be docu- <sup>d</sup>For accent lighting, see section 9.6.2(b) of ASHRAE

<sup>a</sup>In cases where both a common space type and a building- mented as being designed to comply with light levels in Standard 90.1-2013. specific type are listed, the building-specific space type ANSI/IES RP-28 and is (or will be) licensed by local/ <sup>e</sup>Sometimes called a picking area. applies. state authorities for either senior long-term care, adult <sup>f</sup>An additional 5.7 W/m<sup>2</sup> is allowed only if this additional

<sup>b</sup>In corridors, extra lighting power density allowance is daycare, senior support, and/or people with special visual lighting is controlled separately from the base allowance granted when corridor width is <2.4 m and is not based needs. of 4.5 W/m<sup>2</sup>. on room/corridor ratio (RCR).

| Building-Specific Space Types* | LPD, W/m<sup>2</sup> |
|---|---|

For other luminaire types, it may be necessary to estimate the heat gain for each component as a fraction of the total lighting heat gain by using judgment to estimate heat-to-space and heat-to-return percentages.

<!-- str. 481 -->

**Table 3 Lighting Heat Gain Parameters for Typical Operating Conditions**

| Luminaire Category | Space Fraction | Radiative Fraction | Notes | Notes |
|---|---|---|---|---|
| Recessed fluorescent luminaire without lens | 0.64 to 0.74 | 0.48 to 0.68 | •<br>•<br>• May use lower values of both fractions for direct/indirect luminaire<br>• May use higher values of both fractions for ducted returns | Use middle values in most situations<br>May use higher space fraction, and lower radiative fraction for luminaire with side-slot returns |
| Recessed fluorescent luminaire with lens | 0.40 to 0.50 | 0.61 to 0.73 | • | May adjust values in the same way as for recessed fluorescent luminaire without lens |
| Downlight compact fluorescent luminaire | 0.12 to 0.24 | 0.95 to 1.0 | •<br>• | Use middle or high values if detailed features are unknown<br>Use low value for space fraction and high value for radiative fraction if there are large holes in luminaire’s reflector |
| Downlight incandescent luminaire | 0.70 to 0.80 | 0.95 to 1.0 | •<br>•<br>• Use high value for space fraction if reflector lamp (i.e. BR-lamp) is used | Use middle values if lamp type is unknown<br>Use low value for space fraction if standard lamp (i.e. A-lamp) is used |
| Non-in-ceiling fluorescent luminaire | 1.0 | 0.5 to 0.57 | •<br>• | Use lower value for radiative fraction for surface-mounted luminaire<br>Use higher value for radiative fraction for pendant luminaire |
| Recessed LED troffer partial aperture diffuser | 0.49 to 0.64 | 0.37 to 0.47 | •<br>•<br>• May use higher radiant value for ducted return configuration and lower value | Use middle value in most cases.<br>May use higher space fraction for ducted return configuration and lower space fraction for high supply air temperature. for large supply airflow rate. |
| Recessed LED troffer uniform diffuser | 0.44 to 0.66 | 0.32 to 0.41 | •<br>•<br>• May use higher radiant value for ducted return configuration and lower value | Use middle value in most cases.<br>May use higher space fraction for smaller supply airflow rate and lower value for larger supply airflow rate. for larger supply airflow rate. |
| Recessed high-efficacy LED troffer | 0.59 | 0.51 |  |  |
| Recessed LED downlight | 0.40 to 0.56 | 0.15 to 0.18 | •<br>• May use higher space fraction value for high supply air temperature and • May use higher radiant value for dimming control and lower value for large | Use middle value in most cases. lower value for smaller air flowrate. supply air flowrate. |
| Recessed LED retrofit kit 2×4 | 0.41 to 0.53 | 0.31 to 0.42 | •<br>• May use higher space fraction value for large supply air flowrate and lower<br>• May use higher radiant value for ducted return configuration and lower value | Use middle value in most cases. value for ducted return configuration. for larger supply airflow rate. |
| Recessed LED color tuning fixture | 0.53 to 0.56 | 0.40 to 0.42 | Use middle value in most cases. |  |
| High-bay LED fixture | 1.0 | 0.42 to 0.51 | Use middle value in most cases. |  |
| Linear pendant LED fixture | 1.0 | 0.55 to 0.60 | Use middle value in most cases. |  |

Sources: Fisher and Chantrasrisalai (2006); Zhou et al. 2016.

![Fig. 3 Lighting Heat Gain Parameters for Recessed Fluorescent Luminaire Without Lens](img/ch18/fig-03.png)

*Fig. 3 Lighting Heat Gain Parameters for Recessed Fluorescent Luminaire Without Lens*

> (Fisher and Chantrasrisalai 2006)

Because of the directional nature of downlight luminaires, a large portion of the short-wave radiation typically falls on the floor. When converting heat gains to cooling loads in the RTS method, the solar **radiant time factors (RTFs)** may be more appropriate than nonsolar RTFs. (Solar RTFs are calculated assuming most solar radiation is intercepted by the floor; nonsolar RTFs assume uniform distribution by area over all interior surfaces.) This effect may be significant for rooms where lighting heat gain is high and for which solar RTFs are significantly different from nonsolar RTFs.

## 2.3 ELECTRIC MOTORS

Instantaneous sensible heat gain from equipment operated by electric motors in a conditioned space is calculated as

> q<sub>em</sub> = (P/E<sub>M</sub>)F<sub>UM</sub>F<sub>LM</sub>&emsp;**(2)**

where

- q<sub>em</sub> = heat equivalent of equipment operation, W
- P = motor power rating, W
- E<sub>M</sub> = motor efficiency, decimal fraction <1.0
- F<sub>UM</sub> = motor use factor, 1.0 or decimal fraction <1.0
- F<sub>LM</sub> = motor load factor, 1.0 or decimal fraction <1.0

The motor use factor may be applied when motor use is known to be intermittent, with significant nonuse during all hours of operation (e.g., overhead door operator). For conventional applications, its value is 1.0.

<!-- str. 482 -->

**Table 4A Minimum Nominal Full-Load Efficiency for 60 Hz NEMA General-Purpose Electric Motors Polyphase Small Electric Motors**

| Number of Poles ⇒ Synchronous Speed (RPM) ⇒ 3600 | Open Drip-Proof Number of Poles ⇒ Synchronous Speed (RPM) ⇒ 3600<br>2 | Open Drip-Proof<br>Motors 4 1800 | Open Drip-Proof<br>6 1200 | Totally Enclosed Fan-Cooled Motors<br>2 3600 | Totally Enclosed Fan-Cooled Motors<br>4 1800 | Totally Enclosed Fan-Cooled Motors<br>6 1200 |
|---|---|---|---|---|---|---|
| Motor Kilowatts |  |  |  |  |  |  |
| 0.8 | 77.0 | 85.5 | 82.5 | 77.0 | 85.5 | 82.5 |
| 1.1 | 84.0 | 86.5 | 86.5 | 84.0 | 86.5 | 87.5 |
| 1.5 | 85.5 | 86.5 | 87.5 | 85.5 | 86.5 | 88.5 |
| 2.2 | 85.5 | 89.5 | 88.5 | 86.5 | 89.5 | 89.5 |
| 3.7 | 86.5 | 89.5 | 89.5 | 88.5 | 89.5 | 89.5 |
| 5.6 | 88.5 | 91.0 | 90.2 | 89.5 | 91.7 | 91.0 |
| 7.5 | 89.5 | 91.7 | 91.7 | 90.2 | 91.7 | 91.0 |
| 11.1 | 90.2 | 93.0 | 91.7 | 91.0 | 92.4 | 91.7 |
| 14.9 | 91.0 | 93.0 | 92.4 | 91.0 | 93.0 | 91.7 |
| 18.7 | 91.7 | 93.6 | 93.0 | 91.7 | 93.6 | 93.0 |
| 22.4 | 91.7 | 94.1 | 93.6 | 91.7 | 93.6 | 93.0 |
| 29.8 | 92.4 | 94.1 | 94.1 | 92.4 | 94.1 | 94.1 |
| 37.3 | 93.0 | 94.5 | 94.1 | 93.0 | 94.5 | 94.1 |
| 44.8 | 93.6 | 95.0 | 94.5 | 93.6 | 95.0 | 94.5 |
| 56.0 | 93.6 | 95.0 | 94.5 | 93.6 | 95.4 | 94.5 |
| 74.6 | 93.6 | 95.4 | 95.0 | 94.1 | 95.4 | 95.0 |
| 93.3 | 94.1 | 95.4 | 95.0 | 95.0 | 95.4 | 95.0 |
| 111.9 | 94.1 | 95.8 | 95.4 | 95.0 | 95.8 | 95.8 |
| 149.2 | 95.0 | 95.8 | 95.4 | 95.4 | 96.2 | 95.8 |

Source: ASHRAE Standard 90.1-2013.

*Nominal efficiencies established in accordance with NEMA Standard MG1. Design A and Design B are National Electric Manufacturers Association (NEMA) design class designations for fixed-frequency small and medium AC squirrel-cage induction motors.

The motor load factor is the fraction of the rated load delivered under the conditions of the cooling load estimate. Equation (2) assumes that both the motor and driven equipment are in the conditioned space. If the motor is outside the space or airstream,

> *q<sub>em</sub> = PF<sub>UM</sub>F<sub>LM</sub>*&emsp;**(3)**

When the motor is inside the conditioned space or airstream but the driven machine is outside,

> ( )
>
> q<sub>em</sub> = P (1.0 – E<sub>M</sub>)/E<sub>M</sub> F<sub>UM</sub>F<sub>LM</sub>&emsp;**(4)**

> ( )

Equation (4) also applies to a fan or pump in the conditioned space that exhausts air or pumps fluid outside that space.

Table 4A and 4B gives minimum efficiencies and related data representative of typical electric motors from ASHRAE Standard 90.1-2013. If electric motor load is an appreciable portion of cooling load, the motor efficiency should be obtained from the manufacturer. Also, depending on design, maximum efficiency might occur anywhere between 75 to 110% of full load; if under- or overloaded, efficiency could vary from the manufacturer’s listing.

### Overloading or Underloading

Heat output of a motor is generally proportional to motor load, within rated overload limits. Because of typically high no-load motor current, fixed losses, and other reasons, F<sub>LM</sub> is generally assumed to be unity, and no adjustment should be made for underloading or overloading unless the situation is fixed and can be accurately established, and reduced-load efficiency data can be obtained from the motor manufacturer.

**Table 4B Minimum Average Full-Load Efficiency for 60 Hz NEMA General-Purpose Electric Motors Polyphase Small Electric Motors**

| Full-Load Efficiency for Motors Manufactured on or after March 9, 2015, % | Full-Load Efficiency for Motors Manufactured on or after March 9, 2015, % | Full-Load Efficiency for Motors Manufactured on or after March 9, 2015, % |   |
|---|---|---|---|
|  |  | Open Motors |  |
| Number of Poles ⇒ | 2 | 4 | 6 |
| Synchronous Speed (RPM) ⇒ | 3600 | 1800 | 1200 |
| Motor Kilowatts |  |  |  |
| 0.19 | 65.6 | 69.5 | 67.5 |
| 0.25 | 69.5 | 73.4 | 71.4 |
| 0.37 | 73.4 | 78.2 | 75.3 |
| 0.56 | 76.8 | 81.1 | 81.7 |
| 0.75 | 77.0 | 83.5 | 82.5 |
| 1.1 | 84.0 | 86.5 | 83.8 |
| 1.5 | 85.5 | 86.5 | N/A |
| 2.2 | 85.5 | 86.9 | N/A |

*Average full-load efficiencies established in accordance with 10 CFR 431.

### Radiation and Convection

Unless the manufacturer’s technical literature indicates otherwise, motor heat gain normally should be equally divided between radiant and convective components for the subsequent cooling load calculations.

## 2.4 APPLIANCES

A cooling load estimate should take into account heat gain from all appliances (electrical, gas, or steam). Because of the variety of appliances, applications, schedules, use, and installations, estimates can be very subjective. Often, the only information available about heat gain from equipment is that on its nameplate, which can overestimate actual heat gain for many types of appliances, as discussed in the section on Office Equipment.

### Cooking Appliances

These appliances include common heat-producing cooking equipment found in conditioned commercial kitchens. Marn (1962) concluded that appliance surfaces contributed most of the heat to commercial kitchens and that when appliances were installed under an effective hood, the cooling load was independent of the fuel or energy used for similar equipment performing the same operations.

Gordon et al. (1994) and Smith et al. (1995) found that gas appliances may exhibit slightly higher heat gains than their electric counterparts under wall-canopy hoods operated at typical ventilation rates. This is because heat contained in combustion products exhausted from a gas appliance may increase the temperatures of the appliance and surrounding surfaces, as well as the hood above the appliance, more so than the heat produced by its electric counterpart. These higher-temperature surfaces radiate heat to the kitchen, adding moderately to the radiant gain directly associated with the appliance cooking surface.

Marn (1962) confirmed that, where appliances are installed under an effective hood, only radiant gain adds to the cooling load; convective and latent heat from cooking and combustion products are exhausted and do not enter the kitchen. Gordon et al. (1994) and Smith et al. (1995) substantiated these findings. Chapter 33 of the 2019 *ASHRAE Handbook—HVAC Applications* has more information on kitchen ventilation.

**Sensible Heat Gain for Hooded Cooking Appliances.** To establish a heat gain value, nameplate energy input ratings may be used with appropriate usage and radiation factors. Where specific rating data are not available (nameplate missing, equipment not yet purchased, etc.), representative heat gains listed in Tables 5A to 5E (Swierczyna et al. 2008, 2009) for a wide variety of commonly encountered equipment items. In estimating appliance load, probabilities of simultaneous use and operation for different appliances located in the same space must be considered.

<!-- str. 483 -->

Radiant heat gain from hooded cooking equipment can range from 15 to 45% of the actual appliance energy consumption (Gordon et al. 1994; Smith et al. 1995; Swierczyna et al. 2008; Talbert et al. 1973). This ratio of heat gain to appliance energy consumption may be expressed as a radiation factor, and it is a function of both appliance type and fuel source. The radiation factor F<sub>R</sub> is applied to the average rate of appliance energy consumption, determined by applying usage factor F<sub>U</sub> to the nameplate or rated energy input. Marn (1962) found that radiant heat temperature rise can be substantially reduced by shielding the fronts of cooking appliances. Although this approach may not always be practical in a commercial kitchen, radiant gains can also be reduced by adding side panels or partial enclosures that are integrated with the exhaust hood.

**Heat Gain from Meals.** For each meal served, approximately 15 W of heat, of which 75% is sensible and 25% is latent, is transferred to the dining space.

**Heat Gain for Generic Appliances.** The average rate of appliance energy consumption can be estimated from the nameplate or rated energy input q<sub>input</sub> by applying a duty cycle or usage factor F<sub>U</sub>. Thus, sensible heat gain q<sub>s</sub> for generic electric, steam, and gas appliances installed under a hood can be estimated using one of the following equations:

> q<sub>s</sub> = q<sub>input</sub> F<sub>U</sub>F<sub>R</sub>&emsp;**(5)**

or

> q<sub>s</sub> = q<sub>input</sub> F<sub>L</sub>&emsp;**(6)**

where F<sub>L</sub> is the ratio of sensible heat gain to the manufacturer’s rated energy input. However, ASHRAE research (Swierczyna et al. 2008, 2009) showed the design value for heat gain from a hooded appliance at idle (ready-to-cook) conditions based on its energy consumption rate is, at best, a rough estimate. When appliance heat gain measurements during idle conditions were regressed against energy consumption rates for gas and electric appliances, the appliances’ emissivity, insulation, and surface cooling (e.g., through ventilation rates) scattered the data points widely, with large deviations from the average values. Because large errors could occur in the heat load calculation for specific appliance lines by using a general radiation factor, heat gain values in Table 5 should be applied in the HVAC design.

**Table 5A Recommended Rates of Radiant and Convective Heat Gain from Unhooded Electric Appliances During Idle (Ready-to-Cook) Conditions**

| Appliance | Energy Rate, W<br>Rated | Energy Rate, W<br>Standby | Sensible Radiant | Rate of Heat Gain, W<br>Sensible Convective | Rate of Heat Gain, W<br>Latent | Total | Usage Factor F<sub>U</sub> | Radiation Factor F<sub>R</sub> |
|---|---|---|---|---|---|---|---|---|
| Cabinet: hot serving (large), insulated<sup>a</sup> | 1993 | 352 | 117 | 234 | 0 | 352 | 0.18 | 0.33 |
| hot serving (large), uninsulated | 1993 | 1026 | 205 | 821 | 0 | 1026 | 0.51 | 0.20 |
| proofing (large)<sup>a</sup> | 5099 | 410 | 352 | 0 | 59 | 410 | 0.08 | 0.86 |
| proofing (small-15 shelf) | 4191 | 1143 | 0 | 264 | 879 | 1143 | 0.27 | 0.00 |
| Cheesemelter<sup>b</sup> | 2400 | 976 | 443 | 533 | 0 | 976 | 0.41 | 0.45 |
| Coffee brewing urn | 3810 | 352 | 59 | 88 | 205 | 352 | 0.08 | 0.17 |
| Drawer warmers, 2-drawer (moist holding)<sup>a</sup> | 1202 | 147 | 0 | 0 | 59 | 59 | 0.12 | 0.00 |
| Egg cooker<sup>b</sup> | 2380 | 249 | 65 | 184 | 0 | 249 | 0.10 | 0.26 |
| Espresso machine<sup>a</sup> | 2403 | 352 | 117 | 234 | 0 | 352 | 0.15 | 0.33 |
| Food warmer: steam table (2-well-type) | 1495 | 1026 | 88 | 176 | 762 | 1026 | 0.69 | 0.08 |
| Freezer (small) | 791 | 322 | 147 | 176 | 0 | 322 | 0.41 | 0.45 |
| Fryer, countertop, open deep fat<sup>b</sup> | 4600 | 431 | 202 | 229 | 0 | 431 | 0.09 | 0.47 |
| Griddle, countertop<sup>b</sup> | 8000 | 1771 | 848 | 923 | 0 | 1771 | 0.22 | 0.48 |
| Hot dog roller<sup>b</sup> | 1600 | 1240 | 267 | 973 | 0 | 1240 | 0.77 | 0.22 |
| Hot plate: single element, high speed<sup>b</sup> | 1100 | 982 | 314 | 668 | 0 | 982 | 0.89 | 0.32 |
| Hot-food case (dry holding)<sup>a</sup> | 9115 | 733 | 264 | 469 | 0 | 733 | 0.08 | 0.36 |
| Hot-food case (moist holding)<sup>a</sup> | 9115 | 967 | 264 | 528 | 176 | 967 | 0.11 | 0.27 |
| Induction hob, countertop<sup>b</sup> | 5000 | 0 | 0 | 0 | 0 | 0 | 0.00 | 0.00 |
| Microwave oven: commercial<sup>b</sup> | 1700 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| Oven: countertop conveyorized bake/finishing<sup>b</sup> | 5000 | 3932 | 718 | 3214 | 0 | 3932 | 0.79 | 0.18 |
| Panini<sup>b</sup> | 1800 | 673 | 195 | 478 | 0 | 673 | 0.37 | 0.29 |
| Popcorn popper<sup>b</sup> | 850 | 115 | 28 | 87 | 0 | 115 | 0.14 | 0.24 |
| Rapid-cook oven (quartz-halogen)<sup>a</sup> | 12 016 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| Rapid-cook oven (microwave/convection)<sup>b</sup> | 5700 | 1141 | 96 | 1045 | 0 | 1141 | 0.20 | 0.08 |
| Reach-in refrigerator<sup>a</sup> | 1407 | 352 | 88 | 264 | 0 | 352 | 0.25 | 0.25 |
| Refrigerated prep table<sup>a</sup> | 586 | 264 | 176 | 88 | 0 | 264 | 0.45 | 0.67 |
| Rice cooker<sup>b</sup> | 1550 | 82 | 14 | 68 | 0 | 82 | 0.05 | 0.17 |
| Soup warmer<sup>b</sup> | 800 | 390 | 0 | 53 | 337 | 390 | 0.49 | 0.00 |
| Steamer (bun)<sup>b</sup> | 1500 | 200 | 32 | 168 | 0 | 200 | 0.13 | 0.16 |
| Steamer, countertop<sup>b</sup> | 8300 | 344 | 0 | 248 | 96 | 344 | 0.04 | 0.00 |
| Toaster: 4-slice pop up (large): cooking | 1788 | 879 | 59 | 410 | 293 | 762 | 0.49 | 0.07 |
| contact (vertical)<sup>b</sup> | 2600 | 759 | 180 | 579 | 0 | 759 | 0.29 | 0.24 |
| conveyor (large) | 9613 | 3019 | 879 | 2139 | 0 | 3019 | 0.31 | 0.29 |
| small conveyor<sup>b</sup> | 1745 | 1702 | 358 | 1344 | 0 | 1702 | 0.98 | 0.21 |
| Tortilla grill<sup>b</sup> | 2200 | 1034 | 254 | 780 | 0 | 1034 | 0.47 | 0.25 |
| Waffle iron<sup>b</sup> | 2700 | 267 | 60 | 207 | 0 | 267 | 0.10 | 0.22 |

Sources: Swierczyna et al. (2008, 2009), with the following exceptions as noted.

<sup>a</sup>Swierczyna et al. (2009) only.

<sup>b</sup>Additions and updates from ASHRAE research project RP-1631 (Kong and Zhang 2016; Zhang et al. 2016).

<!-- str. 484 -->

**Table 5B Recommended Rates of Radiant and Convective Heat Gain from Unhooded Electric Appliances during Cooking Conditions**

| Appliance | Energy Rate, W<br>Rated | Energy Rate, W<br>Cooking | Sensible Radiant Sensible Convective | Sensible Radiant Sensible Convective<br>Rate of Heat Gain, W | Latent | Total | Usage Factor F<sub>U</sub> | Radiation Factor F<sub>R</sub> |
|---|---|---|---|---|---|---|---|---|
| Cheesemelter | 2400 | 2714 | 443 | 1094 | 599 | 2136 | 1.13 | 0.16 |
| Egg cooker | 2380 | 1191 | 65 | 369 | 630 | 1065 | 0.50 | 0.05 |
| Fryer, countertop, open deep fryer | 4600 | 3818 | 202 | 492 | 1629 | 2323 | 0.83 | 0.05 |
| Griddle, countertop | 8000 | 3280 | 848 | 631 | 1277 | 2757 | 0.41 | 0.26 |
| Hot dog roller | 1600 | 1577 | 267 | 611 | 679 | 1556 | 0.99 | 0.17 |
| Hot plate, single burner | 1100 | 985 | 313 | 627 | 44 | 985 | 0.90 | 0.32 |
| Induction hob, countertop | 5000 | 653 | 0 | 318 | 335 | 653 | 0.13 | 0.00 |
| Oven, conveyor | 5000 | 4292 | 718 | 2454 | 193 | 3365 | 0.86 | 0.17 |
| Microwave | 1700 | 2363 | 0 | 934 | 995 | 1929 | 1.39 | 0.00 |
| Rapid cook | 5700 | 2310 | 96 | 1234 | 771 | 2102 | 0.41 | 0.04 |
| Panini grill | 1800 | 1374 | 195 | 718 | 150 | 1062 | 0.76 | 0.14 |
| Popcorn popper | 850 | 576 | 28 | 236 | 192 | 457 | 0.68 | 0.05 |
| Rice cooker | 1550 | 1159 | 14 | 95 | 44 | 153 | 0.75 | 0.01 |
| Soup warmer | 800 | 842 | 0 | 85 | 716 | 801 | 1.05 | 0.00 |
| Steamer (bun) | 1500 | 791 | 32 | 240 | 511 | 783 | 0.53 | 0.04 |
| Steamer, countertop | 8300 | 7731 | 0 | 499 | 6934 | 7433 | 0.93 | 0.00 |
| Toaster, conveyor | 1745 | 1705 | 358 | 974 | 373 | 1705 | 0.98 | 0.21 |
| Vertical | 2600 | 1841 | 180 | 715 | 322 | 1218 | 0.71 | 0.10 |
| Tortilla grill | 2200 | 2194 | 254 | 1267 | 673 | 2194 | 1.00 | 0.12 |
| Waffle maker | 2700 | 1180 | 60 | 357 | 559 | 975 | 0.44 | 0.05 |

Source: ASHRAE research project RP-1631 (Zhang et al. 2015).

**Table 5C Recommended Rates of Radiant Heat Gain from Hooded Electric Appliances During Idle (Ready-to-Cook) Conditions**

| Appliance | Energy Rate, W<br>Rated | Energy Rate, W<br>Standby | Rate of Heat Gain, W Sensible Radiant | Usage Factor F<sub>U</sub> | Radiation Factor F<sub>R</sub> |
|---|---|---|---|---|---|
| Broiler: underfired 900 mm | 10 814 | 9 056 | 3165 | 0.84 | 0.35 |
| Cheesemelter* | 3 605 | 3 488 | 1348 | 0.97 | 0.39 |
| Fryer, kettle | 29 014 | 528 | 147 | 0.02 | 0.28 |
| Open deep-fat, 1-vat | 14 008 | 821 | 293 | 0.06 | 0.36 |
| Pressure | 13 511 | 791 | 147 | 0.06 | 0.19 |
| Griddle, double-sided 900 mm (clamshell down)* | 21 218 | 2 022 | 410 | 0.10 | 0.20 |
| (Clamshell up)* | 21 218 | 3 370 | 1055 | 0.16 | 0.31 |
| Flat 900 mm | 17 115 | 3 370 | 1319 | 0.20 | 0.39 |
| Small 900 mm* | 8 997 | 1 788 | 791 | 0.20 | 0.44 |
| Induction cooktop* | 21 013 | 0 | 0 | 0.00 | 0.00 |
| Induction wok* | 3 488 | 0 | 0 | 0.00 | 0.00 |
| Oven, combi: combi-mode* | 16 411 | 1 612 | 234 | 0.10 | 0.15 |
| Combi: convection mode | 16 412 | 1 612 | 410 | 0.10 | 0.25 |
| Oven, convection full-size | 12 103 | 1 964 | 440 | 0.16 | 0.22 |
| Convection half-size* | 5 510 | 1 084 | 147 | 0.20 | 0.14 |
| Pasta cooker* | 22 010 | 2 491 | 0 | 0.11 | 0.00 |
| Range top, top off/oven on* | 4 865 | 1 172 | 293 | 0.24 | 0.25 |
| 3 elements on/oven off | 15 005 | 4 513 | 1846 | 0.30 | 0.41 |
| 6 elements on/oven off | 15 005 | 9 730 | 4074 | 0.65 | 0.42 |
| 6 elements on/oven on | 19 870 | 10 668 | 4250 | 0.54 | 0.40 |
| Range, hot-top | 15 826 | 15 035 | 3458 | 0.95 | 0.23 |
| Rotisserie* | 11 107 | 4 044 | 1319 | 0.36 | 0.33 |
| Salamander* | 7 004 | 6 829 | 2051 | 0.97 | 0.30 |
| Steam kettle, large (225 L), simmer lid down* | 32 414 | 762 | 29 | 0.02 | 0.04 |
| small (150 L), simmer lid down* | 21 599 | 528 | 88 | 0.02 | 0.17 |
| Steamer, compartment, atmospheric* | 9 789 | 4 484 | 59 | 0.46 | 0.01 |
| Tilting skillet/braising pan | 9 642 | 1 553 | 0 | 0.16 | 0.00 |

*Items with an asterisk appear only in Swierczyna et al. (2009); all others appear in both Swierczyna et al. (2008) and (2009).

Table 5 lists usage factors, radiation factors, and load factors based on appliance energy consumption rate for typical electrical, steam, and gas appliances under standby (idle or ready-to-cook) and cooking conditions, hooded and unhooded.

**Warewashing Applications.** Typically, hot-water sanitizing and conveyor-type dish machines have either a dishwasher/condensing hood or direct-connected ductwork. If the ventilation is not operating properly, there are significant sensible and latent gains to the space. Chemical sanitizing and vapor reduction models are typically unhooded; consequently, the dish machines produce internal gains that must be accounted for and managed by the building HVAC system.

<!-- str. 485 -->

**Table 5D Recommended Rates of Radiant Heat Gain from Hooded Gas Appliances during Idle (Ready-to-Cook) Conditions**

| Appliance | Standby Energy Rate, W | Standby Energy Rate, W | Rate of Heat Sensible Gain, W | Usage Factor F<sub>U</sub> | Radiation Factor F<sub>R</sub> |
|---|---|---|---|---|---|
| Broiler: batch* | 27 842 | 20 280 | 2374 | 0.73 | 0.12 |
| Chain (conveyor) | 38 685 | 28 340 | 3869 | 0.73 | 0.14 |
| Overfired (upright)* | 29 307 | 25 761 | 733 | 0.88 | 0.03 |
| Underfired 900 mm | 28 135 | 21 658 | 2638 | 0.77 | 0.12 |
| Fryer: doughnut | 12 895 | 3634 | 850 | 0.28 | 0.23 |
| Open deep-fat, 1 vat | 23 446 | 1377 | 322 | 0.06 | 0.23 |
| Pressure | 23 446 | 2638 | 234 | 0.11 | 0.09 |
| Griddle: double sided 900 mm, clamshell down* | 31 710 | 2345 | 528 | 0.07 | 0.23 |
| Clamshell up* | 31 710 | 4308 | 1436 | 0.14 | 0.33 |
| Flat 900 mm | 26 376 | 5979 | 1084 | 0.23 | 0.18 |
| Oven: combi: combi-mode* | 22 185 | 1758 | 117 | 0.08 | 0.07 |
| Convection mode | 22 185 | 1700 | 293 | 0.08 | 0.17 |
| Convection, full-size | 12 895 | 3488 | 293 | 0.27 | 0.08 |
| Conveyor (pizza) | 49 822 | 20 017 | 2286 | 0.40 | 0.11 |
| Deck | 30 772 | 6008 | 1026 | 0.20 | 0.17 |
| Rack mini-rotating* | 16 500 | 1319 | 322 | 0.08 | 0.24 |
| Pasta cooker* | 23 446 | 6946 | 0 | 0.30 | 0.00 |
| Range top: top off/oven on* | 7327 | 2169 | 586 | 0.30 | 0.27 |
| 3 burners on/oven off | 35 169 | 17 614 | 2081 | 0.50 | 0.12 |
| 6 burners on/oven off | 35 169 | 35 403 | 3370 | 1.01 | 0.10 |
| 6 burners on/oven on | 42 495 | 36 018 | 3986 | 0.85 | 0.11 |
| Range: wok* | 29 014 | 25 614 | 1524 | 0.88 | 0.06 |
| Rethermalizer* | 26 376 | 6829 | 3370 | 0.26 | 0.49 |
| Rice cooker* | 10 257 | 147 | 88 | 0.01 | 0.60 |
| Salamander* | 10 257 | 9759 | 1553 | 0.95 | 0.16 |
| Steam kettle: large (225 L) simmer lid down* | 42 495 | 1583 | 0 | 0.04 | 0.00 |
| Small (38 L) simmer lid down* | 15 240 | 967 | 88 | 0.06 | 0.09 |
| Medium (150 L) simmer lid down | 29 307 | 1260 | 0 | 0.04 | 0.00 |
| Steamer: compartment: atmospheric* | 7620 | 2432 | 0 | 0.32 | 0.00 |
| Tilting skillet/braising pan | 30 479 | 3048 | 117 | 0.10 | 0.04 |

*Items with an asterisk appear only in Swierczyna et al. (2009); all others appear in both Swierczyna et al. (2008) and (2009).

**Table 5E Recommended Rates of Radiant Heat Gain from Hooded Solid-Fuel Appliances during Idle (Ready-to-Cook) Conditions**

| Appliance | Rated | Standby Energy Rate, W | Rate of Sensible Heat Gain, W | Usage Factor F<sub>U</sub> | Radiation Factor F<sub>R</sub> |
|---|---|---|---|---|---|
| Broiler: solid fuel: charcoal | 18 kg | 12 309 | 1817 | N/A | 0.15 |
| Broiler: solid fuel: wood (mesquite) | 18 kg | 14 536 | 2051 | N/A | 0.14 |

Source: Swierczyna et al. (2008).

**Table 5F Recommended Rates of Radiant and Convective Heat Gain from Warewashing Equipment during Idle (Standby) or Washing Conditions**

| Appliance | Energy Rate, W<br>Rated | Energy Rate, W<br>Standby/Washing | Radiant Convective Latent<br>Sensible | Rate of Heat Gain, W Unhooded Radiant Convective Latent<br>Sensible | Rate of Heat Gain, W Unhooded Radiant Convective Latent | Rate of Heat Gain, W<br>Total | Hooded Sensible Radiant | Usage Radiation<br>Factor F<sub>U</sub> | Usage Radiation<br>Factor F<sub>R</sub> |
|---|---|---|---|---|---|---|---|---|---|
| Dishwasher: conveyor type, hot-water sanitizing, washing | 13,712 | N/A | 0 | 3,545 | 13,771 | 17,316 | 0 | N/A | 0.00 |
| Standby | 13,712 | 1,670 | 0 | 469 | 1,201 | 1,670 | 0 | 0.12 | 0.00 |
| Dishwasher: conveyor type, chemical sanitizing, washing | 13,712 | 12,775 | 0 | 3,252 | 10,372 | 13,624 | 0 | 0.93 | 0.00 |
| Standby | 13,712 | 1,670 | 0 | 469 | 1,201 | 1,670 | 0 | 0.12 | 0.00 |
| Dishwasher: door type, hot-water sanitizing, washing | 17,609 | 5,420 | 0 | 2,227 | 7,384 | 9,610 | 0 | 0.31 | 0.00 |
| With heat recovery and vapor reduction | 15,207 | 7,940 | 0 | 1,699 | 3,838 | 5,538 | 0 | 0.52 | 0.00 |
| Standby | 5,391 | 352 | 0 | 668 | 1,222 | 1,890 | 0 | 0.35 | 0.00 |
| Dishwasher: door type, chemical sanitizing, washing | 8,790 | 4,571 | 0 | 1,143 | 3,868 | 5,010 | 0 | 0.52 | 0.00 |
| Standby | 5,391 | 352 | 0 | 264 | 88 | 352 | 0 | 0.07 | 0.00 |
| Dishwasher: door type, chemical sanitizing, dump and fill, washing | 1,787 | 879 | 0 | 850 | 1,231 | 2,080 | 0 | 0.49 | 0.00 |
| Standby | 1,787 | 879 | 0 | 0 | 0 | 0 | 0 | 0.49 | 0.00 |
| Pot and pan washer: door type, hot-water sanitizing, washing | 15,587 | 10,665 | 0 | 1,758 | 6,885 | 8,643 | 0 | 0.68 | 0.00 |
| With heat recovery and vapor reduction | 15,587 | 10,314 | 0 | 1,611 | 5,567 | 7,178 | 0 | 0.66 | 0.00 |
| Dishwasher: under-counter type, hot-water sanitizing, washing | 8,350 | 2,227 | 234 | 938 | 2,022 | 3,194 | 800 | 0.27 | 0.11 |
| With heat recovery and vapor reduction | 7,794 | 6,680 | 0 | 586 | 322 | 908 | 0 | 0.86 | 0.00 |
| Standby | 7,794 | 498 | 234 | 146 | 117 | 498 | 800 | 0.06 | 0.47 |
| Dishwasher: under-counter type, chemical sanitizing, washing | 8,350 | 2,022 | 0 | 645 | 1,436 | 2,080 | 0 | 0.24 | 0.00 |
| Standby | 7,794 | 498 | 0 | 146 | 117 | 264 | 0 | 0.06 | 0.00 |
| Booster heater | 38,090 | 0 | 146 | 0 | 0 | 0 | 500 | 0 | N/A |

Sources: PG&E (2010-2016), Swierczyna et al. (2008, 2009).

<!-- str. 486 -->

Sensible radiant and convective gains are affected by dishwasher insulation, and latent convective gains are affected by door seals. Heat loads may vary.

**Recirculating Systems.** Cooking appliances ventilated by recirculating systems or “ductless” hoods should be treated as unhooded appliances when estimating heat gain. In other words, all energy consumed by the appliance and all moisture produced by cooking is introduced to the kitchen as a sensible or latent cooling load.

**Recommended Heat Gain Values.** Table 5 lists recommended rates of heat gain from typical commercial cooking appliances. Data in the “hooded” columns assume installation under a properly designed exhaust hood connected to a mechanical fan exhaust system operating at an exhaust rate for complete capture and containment of the thermal and effluent plume. Improperly operating hood systems load the space with a significant convective component of the heat gain.

### Hospital and Laboratory Equipment

Hospital and laboratory equipment items are major sources of sensible and latent heat gains in conditioned spaces. Care is needed in evaluating the probability and duration of simultaneous usage when many components are concentrated in one area, such as a laboratory, an operating room, etc. Commonly, heat gain from equipment in a laboratory ranges from 50 to 220 W/m<sup>2</sup> or, in laboratories with outdoor exposure, as much as four times the heat gain from all other sources combined.

**Medical Equipment.** It is more difficult to provide generalized heat gain recommendations for medical equipment than for general office equipment because medical equipment is much more varied in type and in application. Some heat gain testing has been done, but the equipment included represents only a small sample of the type of equipment that may be encountered.

Data presented for medical equipment in Table 6 are relevant for portable and bench-top equipment. Medical equipment is very specific and can vary greatly from application to application. The data are presented to provide guidance in only the most general sense. For large equipment, such as MRI, heat gain must be obtained from the manufacturer.

**Laboratory Equipment.** Equipment in laboratories is similar to medical equipment in that it varies significantly from space to space. Chapter 16 of the 2019 *ASHRAE Handbook—HVAC Applications* discusses heat gain from equipment, which may range from 50 to 270 W/m<sup>2</sup> in highly automated laboratories. Table 7 lists some values for laboratory equipment, but, as with medical equipment, it is for general guidance only. Wilkins and Cook (1999) also examined laboratory equipment heat gains.

### Office Equipment

Computers, printers, copiers, etc., can generate very significant heat gains, sometimes greater than all other gains combined. ASHRAE research project RP-822 developed a method to measure the actual heat gain from equipment in buildings and the radiant/convective percentages (Hosni et al. 1998; Jones et al. 1998). This methodology was then incorporated into ASHRAE research project RP-1055 and applied to a wide range of equipment (Hosni et al. 1999) as a follow-up to independent research by Wilkins and McGaffin (1994) and Wilkins et al. (1991). Komor (1997) found similar results. Analysis of measured data showed that results for office equipment could be generalized, but results from laboratory and hospital equipment proved too diverse. The following general guidelines for office equipment are a result of these studies.

**Nameplate Versus Measured Energy Use.** Nameplate data rarely reflect the actual power consumption of office equipment. Actual power consumption is assumed to equal total (radiant plus convective) heat gain, but its ratio to the nameplate value varies widely. ASHRAE research project RP-1055 (Hosni et al. 1999)

**Table 6 Recommended Heat Gain from Typical Medical Equipment**

| Equipment | Nameplate, W | Peak, W | Average, W |
|---|---|---|---|
| Anesthesia system | 250 | 177 | 166 |
| Blanket warmer | 500 | 504 | 221 |
| Blood pressure meter | 180 | 33 | 29 |
| Blood warmer | 360 | 204 | 114 |
| ECG/RESP | 1440 | 54 | 50 |
| Electrosurgery | 1000 | 147 | 109 |
| Endoscope | 1688 | 605 | 596 |
| Harmonical scalpel | 230 | 60 | 59 |
| Hysteroscopic pump | 180 | 35 | 34 |
| Laser sonics | 1200 | 256 | 229 |
| Optical microscope | 330 | 65 | 63 |
| Pulse oximeter | 72 | 21 | 20 |
| Stress treadmill | N/A | 198 | 173 |
| Ultrasound system | 1800 | 1063 | 1050 |
| Vacuum suction | 621 | 337 | 302 |
| X-ray system | 968 |  | 82 |
|  | 1725 | 534 | 480 |
|  | 2070 |  | 18 |

Source: Hosni et al. (1999).

**Table 7 Recommended Heat Gain from Typical Laboratory Equipment**

| Equipment | Nameplate, W | Peak, W | Average, W |
|---|---|---|---|
| Analytical balance | 7 | 7 | 7 |
| Centrifuge | 138 | 89 | 87 |
|  | 288 | 136 | 132 |
|  | 5500 | 1176 | 730 |
| Electrochemical analyzer | 50 | 45 | 44 |
|  | 100 | 85 | 84 |
| Flame photometer | 180 | 107 | 105 |
| Fluorescent microscope | 150 | 144 | 143 |
|  | 200 | 205 | 178 |
| Function generator | 58 | 29 | 29 |
| Incubator | 515 | 461 | 451 |
|  | 600 | 479 | 264 |
|  | 3125 | 1335 | 1222 |
| Orbital shaker | 100 | 16 | 16 |
| Oscilloscope | 72 | 38 | 38 |
|  | 345 | 99 | 97 |
| Rotary evaporator | 75 | 74 | 73 |
|  | 94 | 29 | 28 |
| Spectronics | 36 | 31 | 31 |
| Spectrophotometer | 575 | 106 | 104 |
|  | 200 | 122 | 121 |
|  | N/A | 127 | 125 |
| Spectro fluorometer | 340 | 405 | 395 |
| Thermocycler | 1840 | 965 | 641 |
|  | N/A | 233 | 198 |
| Tissue culture | 475 | 132 | 46 |
|  | 2346 | 1178 | 1146 |

Source: Hosni et al. (1999).

found that, for general office equipment with nameplate power consumption of less than 1000 W, the actual ratio of total heat gain to nameplate ranged from 25 to 50%, but when all tested equipment is considered, the range is broader. Generally, if the nameplate value is the only information known and no actual heat gain data are available for similar equipment, it is conservative to use 50% of nameplate as heat gain and more nearly correct if 25% of nameplate is used. Much better results can be obtained, however, by considering heat gain to be predictable based on the type of equipment. However, if the device has a mainly resistive internal electric load (e.g., a space heater), the nameplate rating may be a good estimate of its peak energy dissipation.

<!-- str. 487 -->

**Table 8A Recommended Heat Gain for Typical Desktop Computers Laptop Docking Station**

| Description | Nameplate Power,<sup>a</sup> W | Peak Heat Gain,<sup>b,d</sup> W |
|---|---|---|
| Manufacturer 1 |  |  |
| 3.0 GHz processor, 4 GB RAM, n = 1 | NA | 83 |
| 3.3 GHz processor, 8 GB RAM, n = 8 | NA | 50 |
| 3.5 GHz processor, 8 GB RAM, n = 2 | NA | 42 |
| 3.6 GHz processor, 16 GB RAM, n = 2 | NA | 66 |
| 3.3 GHz processor, 16 GB RAM, n = 2 | NA | 52 |
| 4.0 GHz processor, 16 GB RAM, n = 1 | NA | 83 |
| 3.3 GHz processor, 8 GB RAM, n = 1 | NA | 84 |
| 3.7 GHz processor, 32 GB RAM, n = 1 | 750 | 116 |
|  | NA | 102 |
| 3.5 GHz processor, 16 GB RAM, n = 3<sup>c</sup> | 550 | 144 |
|  | NA | 93 |
| Manufacturer 2 |  |  |
| 3.6 GHz processor, 32 GB RAM, n = 8 | NA | 80 |
| 3.6 GHz processor, 16 GB RAM, n = 1 | NA | 78 |
| 3.4 GHz processor, 32 GB RAM, n = 1 | NA | 72 |
| 3.4 GHz processor, 24 GB RAM, n = 1 | NA | 86 |
| 3.50 GHz processor, 4 GB RAM, n = 1 | NA | 26 |
| 3.3 GHz processor, 8 GB RAM, n = 1 | NA | 78 |
| 3.20 GHz processor, 8 GB RAM, n = 1 | NA | 61 |
| 3.20 GHz processor, 4 GB RAM, n = 1 | NA | 44 |
| 2.93 GHz processor, 16 GB RAM, n = 1 | NA | 151 |
| 2.67 GHz processor, 8 GB RAM, n = 1 | NA | 137 |
| Average 15-min peak power consumption (range) | 82 (26-151) |  |

Source: Bach and Sarfraz (2017)

n = number of tested equipment of same configuration.

<sup>a</sup>Nameplate for desktop computer is present on its power supply, which is mounted inside desktop, hence not accessible for most computers, where NA = not available.

<sup>b</sup>For equipment peak heat gain value, highest 15-min interval of recorded data is listed in tables.

<sup>c</sup>For tested equipment with same configuration, increasing power supply size does not increase average power consumption.

<sup>d</sup>Approximately 90% convective heat gain and 10% radiative heat gain.

**Computers.** Based on tests by Hosni et al. (1999) and Wilkins and McGaffin (1994), nameplate values on computers should be ignored when performing cooling load calculations. Tables 8A, 8B, and 8C (Bach and Sarfraz 2017) present typical heat gain values for computers of varying types and models.

**Monitors.** Table 8D shows typical values for various sizes and types.

Flat-panel monitors have replaced CRT monitors in almost all workplaces. Power consumption, and thus heat gain, for flat-panel displays are significantly lower than for CRTs.

**Laser Printers.** Hosni et al. (1999) found that power consumption, and therefore the heat gain, of laser printers depended largely on the level of throughput for which the printer was designed. Smaller printers tend to be used more intermittently, and larger printers may run continuously for longer periods.

Table 9 presents data on typical printers. These data can be applied by taking the value for continuous operation and then applying an appropriate diversity factor. This would likely be most appropriate for larger open office areas. Another approach, which may be appropriate for a single room or small area, is to take the value that most closely matches the expected operation of the printer with no diversity.

**Copiers.** Bach and Sarfraz (2017) also tested photocopy machines, including desktop and office (freestanding high-volume copiers) models. Larger machines used in production environments were not addressed. Table 9 summarizes the results. Desktop copiers rarely operate continuously, but office copiers frequently operate continuously for periods of an hour or more. Large, highvolume photocopiers often include provisions for exhausting air outdoors; if so equipped, the direct-to-space or system makeup air heat gain needs to be included in the load calculation. Also, when the air is dry, humidifiers are often operated near copiers to limit static electricity; if this occurs during cooling mode, their load on HVAC systems should be considered.

**Table 8B Recommended Heat Gain for Typical Laptops and Desktop Computers Laptop Docking Station**

| Equipment Description | Name-Peak plate Heat Power,<sup>a</sup> Gain,<sup>b,c</sup> W W |
|---|---|
| Laptop Manufacturer 1, computer 2.6 GHz processor, 8 GB RAM, n = 1<br>Manufacturer 2, 2.4 GHz processor, 4 GB RAM, n = 1 | NA 46<br>NA 59 |
| Average 15-min peak power consumption (range) | 53 (46-59) |
| Laptop with Manufacturer 1, docking 2.7 GHz processor, 8 GB RAM, n = 1 station 1.6 GHz processor, 8 GB RAM, n = 2 2.0 GHz processor, 8 GB RAM, n = 1 2.6 GHz processor, 4 GB RAM, n = 1 2.4 GHz processor, 8 GB RAM, n = 1 2.6 GHz processor, 8 GB RAM, n = 1 2.7 GHz processor, 8 GB RAM, n = 1 3.0 GHz processor, 8 GB RAM, n = 3 2.9 GHz processor, 32 GB RAM, n = 3 3.0 GHz processor, 32 GB RAM, n = 1 3.7 GHz processor, 32 GB RAM, n = 1 3.1 GHz processor, 32 GB RAM, n = 1 | NA 38<br>NA 45<br>NA 50<br>NA 51<br>NA 40<br>NA 35<br>NA 59<br>NA 70<br>NA 58<br>NA 128<br>NA 63<br>NA 89 |
| Average 15-min peak power consumption (range) | 61 (26-151) |

Source: Bach and Sarfraz (2017)

n = number of tested equipment of same configuration.

<sup>a</sup>Voltage and amperage information for laptop computer and laptop docking station is available on power supply nameplates; however, nameplate does not provide information on power consumption, where NA = not available.

<sup>b</sup>For equipment peak heat gain value, the highest 15-min interval of recorded data is listed in tables.

<sup>c</sup>Approximately 75% convective heat gain and 25% radiative heat gain.

**Table 8C Recommended Heat Gain for Typical Tablet PC**

| Description | Nameplate Power,<sup>a</sup> W | Peak Heat Gain,<sup>b</sup> W |
|---|---|---|
| 1.7 GHz processor, 4 GB RAM, n = 1 | NA | 42 |
| 2.2 GHz processor, 16 GB RAM, n = 1 | NA | 40 |
| 2.3 GHz processor, 8 GB RAM, n = 1 | NA | 30 |
| 2.5 GHz processor, 8 GB RAM, n = 1 | NA | 31 |
| Average 15-min peak power consumption (range) | 36 (31-42) |  |

Source: Bach and Sarfraz (2017)

n = number of tested equipment of same configuration.

<sup>a</sup>Voltage and amperage information for tablet PC is available on power supply nameplate; however, nameplate does not provide information on power consumption, where NA = not available.

<sup>b</sup>For equipment peak heat gain value, highest 15-min interval of recorded data is listed in tables.

**Miscellaneous Office Equipment.** Table 10 presents data on miscellaneous office equipment such as vending machines and other equipment tested by Bach and Sarfraz (2017).

**Diversity.** The ratio of measured peak electrical load at equipment panels to the sum of the maximum electrical load of each individual item of equipment is the usage diversity. A small, one- or two-person office containing equipment listed in Tables 8 to 10 usually contributes heat gain to the space at the sum of the appropriate listed values. Progressively larger areas with many equipment items always experience some degree of usage diversity resulting from whatever percentage of such equipment is not in operation at any given time.

<!-- str. 488 -->

**Table 8D Recommended Heat Gain for Typical Monitors**

| Description<sup>a</sup> | Nameplate Power, W | Peak Heat Gain,<sup>b,c</sup> W |
|---|---|---|
| Manufacturer 1 |  |  |
| 1397 mm LED flat screen, n = 1 (excluded from |  |  |
| average because atypical size) | 240 | 50 |
| 686 mm LED flat screen, n = 2 | 40 | 26 |
| 546 mm LED flat screen, n = 2 | 29 | 25 |
| Manufacturer 2 |  |  |
| 1270 mm 3D LED flat screen, n = 1 (excluded from |  |  |
| average because atypical size) | 94 | 49 |
| Manufacturer 3 |  |  |
| 864 mm LCD curved screen, n = 1 (excluded from average because atypical size and curved) | 130 | 48 |
| 584 mm LED flat screen, n = 3 | 50 | 17 |
| 584 mm LED flat screen, n = 1 | 38 | 21 |
| 584 mm LED flat screen, n = 1 | 38 | 14 |
| Manufacturer 4 |  |  |
| 610 mm LED flat screen, n = 1 | 42 | 25 |
| Manufacturer 5 |  |  |
| 600 mm LED flat screen, n = 1 | 26 | 17 |
| 546 mm LED flat screen, n = 1 | 29 | 22 |
| Manufacturer 6 |  |  |
| 546 mm LED flat screen, n = 1 | 28 | 24 |
| Average 15-min peak power consumption (range) | 21 (14-26) |  |

Source: Bach and Sarfraz (2017)

n = number of tested equipment of same configuration.

<sup>a</sup>Screens with atypical size and shape are excluded for calculating average 15-min peak power consumption.

<sup>b</sup>For equipment peak heat gain value, highest 15-min interval of recorded data is listed in tables.

<sup>c</sup>Approximately 60% convective heat gain and 40% radiative heat gain.

Wilkins and McGaffin (1994) measured diversity in 23 areas within five different buildings totaling over 25 600 m<sup>2</sup>. Diversity was found to range between 37 and 78%, with the average (normalized based on area) being 46%. Figure 4 shows the relationship between nameplate, sum of peaks, and actual electrical load with diversity accounted for, based on the average of the total area tested. Data on actual diversity can be used as a guide, but diversity varies significantly with occupancy. The proper diversity factor for an office of call center operators is different from that for an office of sales representatives who travel regularly.

ASHRAE research project RP-1093 derived diversity profiles for use in energy calculations (Abushakra et al. 2004; Claridge et al. 2004). Those profiles were derived from available measured data sets for a variety of office buildings, and indicated a range of peak weekday diversity factors for lighting ranging from 70 to 85% and for receptacles (appliance load) between 42 and 89%.

**Heat Gain per Unit Area.** Bach and Sarfraz (2017), Wilkins and Hosni (2000, 2011) and Wilkins and McGaffin (1994) summarized research on a heat gain per unit area basis. Diversity testing showed that the actual heat gain per unit area, or load factor, ranged from 4.7 to 11.6 W/m<sup>2</sup>, with an average (normalized based on area) of 8.7 W/m<sup>2</sup>. Spaces tested were fully occupied and highly automated, comprising 21 unique areas in five buildings, with a computer and monitor at every workstation. Table 11 presents a range of load factors with a subjective description of the type of space to which they would apply. The medium load density is likely to be appropriate for most standard office spaces. Medium/heavy or heavy load densities

**Table 9 Recommended Heat Gain for Typical Printers**

```text
                                          Max.
                                         Printing
                                         Speed,  Name-     Peak
                                          Pages   plate    Heat
                                           per   Power,   Gain,^a
Equipment    Description                 Minute     W       W
Multifunction Large, multiuser, office type 40    1010   540 (Idle
 printer                                                   29 W)
 (copy, print,                             30     1300   303 (Idle
 scan)                                                    116 W)
                                           28     1500   433 (Idle
                                                           28 W)
 Average 15-min peak power consumption
                                               425 (303-540)
                 (range)
             Multiuser, medium-office type 35      900   732 (Idle
                                                           18 W)
             Desktop, small-office type    25       470   56 (Idle
                                                           3 W)
Monochrome   Desktop, medium-office type   55     1000      222
 printer                                   45      680       61
 Average 15-min peak power consumption
                                                142 (61-222)
                 (range)
Color printer Desktop, medium-office type  40       620     120
Laser printer Desktop, small-office type   14       310      89
                                           24      495       67
                                           26     1090       65
 Average 15-min peak power consumption
                                                 74 (65-89)
                 (range)
Plotter      Manufacturer 1                       1600      571
             Manufacturer 2                        270      173
 Average 15-min peak power consumption
                                               372 (173-571)
                 (range)
Fax machine  Medium                               1090       92
             Small                                 600       46
 Average 15-min peak power consumption
                                                 69 (46-92)
                 (range)
Source: Bach and Sarfraz (2017)
^aApproximately 70% convective heat gain and 30% radiative heat gain.
```

![Fig. 4 Office Equipment Load Factor Comparison](img/ch18/fig-04.png)

*Fig. 4 Office Equipment Load Factor Comparison*

> (Wilkins and McGaffin 1994)

may be encountered but can be considered extremely conservative estimates even for densely populated and highly automated spaces. Table 12 indicates applicable diversity factors.

**Radiant/Convective Split.** ASHRAE research project RP-1482 (Hosni and Beck 2008) examined the radiant/convective split for common office equipment; the most important differentiating feature is whether the equipment had a cooling fan. Footnotes in Tables 8 and 9 summarize those results.

<!-- str. 489 -->

**Table 10 Recommended Heat Gain for Miscellaneous Equipment Various Types of Offices**

| Equipment | Nameplate Power,<sup>a</sup> W | Peak Heat Gain,<sup>b</sup> W |
|---|---|---|
| Vending machine |  |  |
| Drinks, 280 to 400 items | NA | 940 |
| Snacks | NA | 54 |
| Food (e.g., for sandwiches) | NA | 465 |
| Thermal binding machine, 2 single |  |  |
| documents up to 340 pages | 350 | 28.5 |
| Projector, resolution 1024 × 768 | 340 | 308 |
| Paper shredder, up to 28 sheets | 1415 | 265 |
| Electric stapler, up to 45 sheets | NA | 1.5 |
| Speakers | 220 | 15 |
| Temperature-controlled electronics |  |  |
| soldering station | 95 | 16 |
| Cell phone charger | NA | 5 |
| Battery charger |  |  |
| 40 V | NA | 19 |
| AA | NA | 5.5 |
| Microwave oven, 25 to 34 L | 1000 to 1550 | 713 to 822 |
| Coffee maker |  |  |
| Single cup | 1400 | 385 |
| Up to 12 cups | 950 | 780 |
| With grinder | 1350 | 376 |
| Coffee grinder, up to 12 cups | NA | 73 |
| Tea kettle, up to 6 cups | 1200 | 1200 |
| Dorm fridge, 88 L | NA | 57 |
| Freezer, 510 L | 130 | 125 |
| Fridge, 510 L | NA | 387 to 430 |
| Ice maker and dispenser, 9 kg bin capacity | NA | 658 |
| Top mounted bottled water cooler | NA | 114 to 350 |
| Cash register | 25 | 9 |
| Touch screen computer, 380 mm standard |  |  |
|  | NA | 58 |
| LCD and 2.2 GHz processor |  |  |
| Self-checkout machine | NA | 15 |

Source: Bach and Sarfraz (2017)

<sup>a</sup>For some equipment, nameplate power consumption is not available, where NA = not available.

<sup>b</sup>For equipment peak heat gain value, highest 15-min interval of recorded data is listed in tables.

## 3. INFILTRATION AND MOISTURE MIGRATION HEAT GAINS

Two other load components contribute to space cooling load directly without time delay from building mass: (1) infiltration, and (2) moisture migration through the building envelope.

## 3.1 INFILTRATION

Principles of estimating infiltration in buildings, with emphasis on the heating season, are discussed in Chapter 16. When economically feasible, somewhat more outdoor air may be introduced to a building than the total of that exhausted, to create a slight overall positive pressure in the building relative to the outdoors. Under these conditions, air usually exfiltrates, rather than infiltrates, through the building envelope and thus effectively eliminates infiltration sensible and latent heat gains. However, there is concern, especially in some climates, that water may condense within the building envelope; actively managing space air pressures to reduce this condensation problem, as well as infiltration, may be needed.

When positive air pressure is assumed, most designers do not include infiltration in cooling load calculations for commercial buildings. However, including some infiltration for spaces such entry areas or loading docks may be appropriate, especially when those spaces are on the windward side of buildings. But the downward stack effect, as occurs when indoor air is denser than the outdoor, might eliminate infiltration to these entries on lower floors of tall buildings; infiltration may occur on the upper floors during cooling conditions if makeup air is not sufficient.

**Table 11 Recommended Load Factors for Miscellaneous Equipment Various Types of Offices**

```text
                  Load
                Factor,
Type of Use       W/m^2  Description
100% laptop, docking station
 light             3.67  15.5 m^2/workstation, all laptop docking station
                           use, 1 printer per 10
 medium            4.91  11.6 m^2/workstation, all laptop docking station
                           use, 1 printer per 10
50% laptop, docking station
 light             4.75  15.5 m^2/workstation, 50% laptop docking sta-
                           tion/50% desktop, 1 printer per 10
 medium            6.35  11.6 m^2/workstation, 50% laptop docking sta-
                           tion/50% desktop, 1 printer per 10
100% desktop
 light             5.83  15.5 m^2/workstation, all desktop use, 1 printer
                           per 10
 medium            7.79  11.6 m^2/workstation, all desktop use, 1 printer
                           per 10
100% laptop, docking station
 2 screens         7.44  11.6 m^2/workstation, all laptop docking station
                           use, 2 screens, 1 printer per 10
100% desktop
 2 screens         9.06  11.6 m^2/workstation, all laptop use, 2 screens,
                           1 printer per 10
 3 screens        10.33  11.6 m^2/workstation, all desktop use, 3
                           screens, 1 printer per 10
100% desktop
 heavy, 2 screens 11.00  7.9 m^2/workstation, all desktop use, 2 screens,
                           1 printer per 8
 heavy, 3 screens 12.49  7.9 m^2/workstation, all desktop use, 3 screens,
                           1 printer per 8
100% laptop, docking station
 full on, 2 screens 12.23 7.9 m^2/workstation, all laptop docking use, 2
                           screens, 1 printer per 8, no diversity
100% desktop
 full on, 2 screens 14.35 7.9 m^2/workstation, all desktop use, 2 screens,
                           1 printer per 8, no diversity
 full on, 3 screens 16.48 7.9 m^2/workstation, all desktop use, 3 screens,
                           1 printer per 8, no diversity
Source: Bach and Sarfraz (2017)
Medium office type monochrome printer is used for load factor calculator with 15-
min peak power consumption of 142 W.
```

**Table 12 Diversity Factor for Different Equipment**

| Equipment | Diversity Factor, % | Diversity Factor,<sup>a</sup> % |
|---|---|---|
| Desktop PC | 75 | 75 |
| Laptop docking station | 70 | NA |
| Notebook computer | 75<sup>b</sup> | 75 |
| Screen | 70 | 60 |
| Printer | 45 | NA |

Source: Bach and Sarfraz (2017)

<sup>a</sup>2013 ASHRAE Handbook—Fundamentals

<sup>b</sup>Insufficient data from RP-1742; values based on previous data from 2013 ASHRAE Handbook—Fundamentals and judgment of Bach and Sarfraz (2017).

Infiltration also depends on wind direction and magnitude, temperature differences, construction type and quality, and occupant use of exterior doors and operable windows. As such, it is impossible to accurately predict infiltration rates. Designers usually predict overall rates of infiltration using the number of **air changes per hour (ACH)**. A common guideline for climates and buildings typical of at least the central United States is to estimate the ACHs for winter heating conditions, and then use half that value for the cooling load calculations.

<!-- str. 490 -->

### Standard Air Volumes

Because the specific volume of air varies appreciably, calculations are more accurate when made on the basis of air mass instead of volume. However, volumetric flow rates are often required for selecting coils, fans, ducts, etc.; basing volumes on measurement at standard conditions may be used for accurate results. One standard value is 1.2 kg<sub>da</sub>/m<sup>3</sup> (0.833 m<sup>3</sup>/kg). This density corresponds to about 16°C at saturation and 21°C dry air (at 101.325 kPa). Because air usually passes through the equipment at a density close to standard for locations below about 300 m, the accuracy desired normally requires no correction. When airflow is to be measured at a particular condition or point, such as at a coil entrance or exit, the corresponding specific volume can be read from the sea-level psychrometric chart. For higher elevations, the mass flow rates of air must be adjusted and higher-elevation psychrometric charts or algorithms must be used.

### Heat Gain Calculations Using Standard Air Values

Air-conditioning design often requires the following information: 1. Total heat

Total heat gain q<sub>t</sub> corresponding to the change of a given standard flow rate Q<sub>s</sub> through an enthalpy difference Δh is

> q<sub>t</sub> = 1.2Q<sub>s</sub>Δh&emsp;**(7)**

where 1.2 = kg<sub>da</sub>/m<sup>3</sup>.

This total heat equation can also be expressed as

> q<sub>t</sub> = C<sub>t</sub>Q<sub>s</sub>Δh

where C<sub>t</sub> = 1.2 is the air total heat factor, in W/(m<sup>3</sup>·s) per kJ/kg. 2. Sensible heat

Sensible heat gain q<sub>s</sub> corresponding to the change of dry-bulb temperature Δt for given airflow (standard conditions) Q<sub>s</sub> is

> q<sub>s</sub> = 1.2(1.006 + 1.84W)Q<sub>s</sub>Δt&emsp;**(8)**

where

- 1.006 = specific heat of dry air, kJ/(kg·K)
- W = humidity ratio, kg<sub>w</sub>/kg<sub>da</sub>
- 1.84 = specific heat of water vapor, kJ/(kg·K)

The specific heats are for a range from about –75 to 90°C. When W = 0, the value of 1.20(1.006 + 1.84W) = 1.21; when W = 0.01, the value is 1.23; when W = 0.02, the value is 1.25; and when W = 0.03, the value is 1.27. Because a value of W = 0.01 approximates conditions found in many air-conditioning problems, the sensible heat change (in kW) has traditionally been found as

> q<sub>s</sub> = 1.23Q<sub>s</sub>Δt&emsp;**(9)**

This sensible heat equation can also be expressed as

> q<sub>s</sub> = C<sub>s</sub>Q<sub>s</sub>Δt

where C<sub>s</sub> = 1.23 is the air sensible heat factor, in W/(m<sup>3</sup>·s·K).

3. Latent heat

Latent heat gain q<sub>l</sub> corresponding to the change of humidity ratio ΔW(in kg<sub>w/</sub>kg<sub>da</sub>) for given airflow (standard conditions) Q<sub>s</sub> is

> q<sub>l</sub> = 1.20 × 2500Q<sub>s</sub>ΔW = 3010Q<sub>s</sub>ΔW&emsp;**(10)**

where 2500 is the approximate heat content of 50% rh vapor at 24°C less the heat content of water at 10°C. A common design condition for the space is 50% rh at 24°C, and 10°C is normal condensate temperature from cooling and dehumidifying coils.

This latent heat equation can also be expressed as

> q<sub>l</sub> = C<sub>l</sub>Q<sub>s</sub>ΔW

where C<sub>l</sub> = 3010 is the air latent heat factor, in W/(m<sup>3</sup>·s).

4. Elevation correction for total, sensible, and latent heat equations The constants 1.2, 1.23, and 3010 are useful in air-conditioning calculations at sea level (101.325 kPa) and for normal temperatures and moisture ratios. For other conditions, more precise values should be used. For an elevation of 1525 m (84.1 kPa), appropriate values are 1.00, 1.03, and 2500. Equations (8) to (10) can be corrected for elevations other than sea level by multiplying them by the ratio of pressure at sea level divided by the pressure at actual altitude. This can be derived from Equation (3) in Chapter 1 as

> C<sub>x,alt</sub> = C<sub>x,0</sub>P/P<sub>0</sub>

where C<sub>x,0</sub> is any sea-level C value and P/P<sub>0</sub> = [1 – (elevation × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup>, where elevation is in metres.

### Elevation Correction Examples

To correct the C values for El Paso, Texas, the elevation listed in the appendix of Chapter 14 is 1194 m. C values for Equations (7) to (10) can be corrected using Equation (3) in Chapter 1 as follows:

- C<sub>t,1194</sub> = 1.2 × [1 – (1194 × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup> = 1.04
- C<sub>s,1194</sub> = 1.23 × [1 – (1194 × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup> = 1.07
- C<sub>l,1194</sub> = 3010 × [1 – (1194 × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup> = 2608

To correct the C values for Albuquerque, New Mexico, the elevation listed in the appendix of Chapter 14 is 1619 m. C values for Equations (7) to (10) can be corrected as follows:

- C<sub>t,1619</sub> = 1.2 × [1 – (1619 × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup> = 0.99
- C<sub>s,1619</sub> = 1.23 × [1 – (1619 × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup> = 1.01
- C<sub>l,1619</sub> = 3010 × [1 – (1619 × 2.25577 × 10<sup>–5</sup>)]<sup>5.2559</sup> = 2475

## 3.2 LATENT HEAT GAIN FROM MOISTURE DIFFUSION

Diffusion of moisture through building materials is a natural phenomenon that is always present. Chapters 25 to 27 cover principles, materials, and specific methods used to control moisture. Moisture transfer through walls and roofs is often neglected in comfort air conditioning because the actual rate is quite small and the corresponding latent heat gain is insignificant. Permeability and permeance values for various building materials are given in Chapter 26. Vapor retarders should be specified and installed in the proper location to keep moisture transfer to a minimum, and to minimize condensation within the envelope. Moisture migration up through slabs-on-grade and basement floors has been found to be significant, but has historically not been addressed in cooling load calculations. Under-slab continuous moisture retarders and drainage can reduce upward moisture flow.

Some industrial applications require low moisture to be maintained in a conditioned space. In these cases, the latent heat gain accompanying moisture transfer through walls and roofs may be greater than any other latent heat gain. This gain is computed by

> q<sub>lm</sub> = MAΔp<sub>v</sub> (h<sub>g</sub> –h<sub>f</sub>)&emsp;**(11)**

where

- q<sub>lm</sub> = latent heat gain from moisture transfer, W
- M = permeance of wall or roof assembly, ng/(s·m<sup>2</sup>·Pa)
- A = area of wall or roof surface, m<sup>2</sup>

<!-- str. 491 -->

Δp<sub>v</sub> = vapor pressure difference, Pa h<sub>g</sub> = enthalpy at room conditions, kJ/kg h<sub>f</sub> = enthalpy of water condensed at cooling coil, kJ/kg h<sub>g</sub> – h<sub>f</sub> = 2500 kJ/kg when room temperature is 24°C and condensate off coil is 10°C

## 3.3 OTHER LATENT LOADS

Moisture sources within a building (e.g., shower areas, swimming pools or natatoriums, arboretums) can also contribute to latent load. Unlike sensible loads, which correlate to supply air quantities required in a space, latent loads usually only affect cooling coils sizing or refrigeration load. Because air from showers and some other moisture-generating areas is exhausted completely, those airborne latent loads do not reach the cooling coil and thus do not contribute to cooling load. However, system loads associated with ventilation air required to make up exhaust air must be recognized, and any recirculated air’s moisture must be considered when sizing the dehumidification equipment.

For natatoriums, occupant comfort and humidity control are critical. In many instances, size, location, and environmental requirements make complete exhaust systems expensive and ineffective. Where recirculating mechanical cooling systems are used, evaporation (latent) loads are significant. Chapter 5 of the 2019 ASHRAE Handbook—HVAC Applications provides guidance on natatorium load calculations.

## 4. FENESTRATION HEAT GAIN

For spaces with neutral or positive air pressurization, the primary weather-related variable affecting cooling load is solar radiation. The effect of solar radiation is more pronounced and immediate on exposed, nonopaque surfaces. Chapter 14 includes procedures for calculating clear-sky solar radiation intensity and incidence angles for weather conditions encountered at specific locations. That chapter also includes some useful solar equations. Calculation of solar heat gain and conductive heat transfer through various glazing materials and associated mounting frames, with or without interior and/or exterior shading devices, is discussed in Chapter 15. This chapter covers application of such data to overall heat gain evaluation, and conversion of calculated heat gain into a composite cooling load for the conditioned space.

## 4.1 FENESTRATION DIRECT SOLAR, DIFFUSE SOLAR, AND CONDUCTIVE HEAT GAINS

For fenestration heat gain, use the following equations:

Direct beam solar heat gain q<sub>b</sub>:

> q<sub>b</sub>= AE<sub>t,b</sub>SHGC(θ)IAC(θ,Ω)&emsp;**(12)**

Diffuse solar heat gain q<sub>d</sub>:

> q<sub>d</sub>= A(E<sub>t,d</sub>+ E<sub>t,r</sub>)⟨SHGC⟩<sub>D</sub> IAC<sub>D</sub>&emsp;**(13)**

Conductive heat gain q<sub>c</sub>:

> q<sub>c</sub>= UA(T<sub>out</sub>– T<sub>in</sub>)&emsp;**(14)**

Total fenestration heat gain Q:

> Q = q<sub>b</sub>+ q<sub>d</sub>+ q<sub>c</sub>&emsp;**(15)**

where

- A = window area, m<sup>2</sup>

E<sub>t,b</sub>, E<sub>t,d</sub>, and E<sub>t,r</sub> = beam, sky diffuse, and ground-reflected diffuse irradiance, calculated using equations in Chapter 14

SHGC(θ) = beam solar heat gain coefficient as a function of incident angle θ; may be interpolated between values in Table 10 of Chapter 15

⟨SHGC⟩<sub>D</sub> = diffuse solar heat gain coefficient (also referred to as

> hemispherical SHGC); from Table 10 of Chapter 15
>
> T<sub>in</sub> = indoor temperature, °C

T<sub>out</sub> = outdoor temperature, °C

U = overall U-factor, including frame and mounting orientation from Table 4 of Chapter 15, W/(m<sup>2</sup>·K)

IAC(θ.Ω) = indoor solar attenuation coefficient for beam solar heat gain coefficient; = 1.0 if no indoor shading device. IAC(θ.Ω) is a function of shade type and, depending on type, may also be a function of beam solar angle of incidence θ and shade

> geometry

IAC<sub>D</sub> = indoor solar attenuation coefficient for diffuse solar heat gain coefficient; = 1.0 if not indoor shading device. IAC<sub>D</sub> is a function of shade type and, depending on type, may also be a function of shade geometry

If specific window manufacturer’s SHGC and U-factor data are available, those should be used. For fenestration equipped with indoor shading (blinds, drapes, or shades), the indoor solar attenuation coefficients IAC(θ.Ω) and IAC<sub>D</sub> are listed in Tables 14A to 14G of Chapter 15.

Note that, as discussed in Chapter 15, fenestration ratings (U-factor and SHGC) are based on the entire product area, including frames. Thus, for load calculations, fenestration area is the area of the entire opening in the wall or roof.

## 4.2 EXTERIOR SHADING

Nonuniform exterior shading, caused by roof overhangs, side fins, or building projections, requires separate hourly calculations for the externally shaded and unshaded areas of the window in question, with the indoor shading SHGC still used to account for any internal shading devices. The areas, shaded and unshaded, depend on the location of the shadow line on a surface in the plane of the glass. Sun (1968) developed fundamental algorithms for analysis of shade patterns. McQuiston and Spitler (1992) provide graphical data to facilitate shadow line calculation.

Equations for calculating shade angles [Chapter 15, Equations (34) to (37)] can be used to determine the shape and area of a moving shadow falling across a given window from external shading elements during the course of a design day. Thus, a subprofile of heat gain for that window can be created by separating its sunlit and shaded areas for each hour.

## 5. HEAT BALANCE METHOD

Cooling load estimation involves calculating a surface-bysurface conductive, convective, and radiative heat balance for each room surface and a convective heat balance for the room air. These principles form the foundation for all methods described in this chapter. The heat balance (HB) method solves the problem directly instead of introducing transformation-based procedures. The advantages are that it contains no arbitrarily set parameters, and no processes are hidden from view.

Some computations required by this rigorous approach require the use of computers. The heat balance procedure is not new. Many energy calculation programs have used it in some form for many years. The first implementation that incorporated all the elements to form a complete method was NBSLD (Kusuda 1967). The heat balance procedure is also implemented in both the BLAST and TARP energy analysis programs (Walton 1983). Before ASHRAE research project RP-875, the method had never been described completely or in a form applicable to cooling load calculations. The papers resulting from RP-875 describe the heat balance procedure in detail (Liesen and Pedersen 1997; McClellan and Pedersen 1997; Pedersen et al. 1997).

<!-- str. 492 -->

The HB method is codified in the software called Hbfort that accompanies *Cooling and Heating Load Calculation Principles* (Pedersen et al. 1998).

ASHRAE research project RP-1117 constructed two model rooms for which cooling loads were physically measured using extensive instrumentation (Chantrasrisalai et al. 2003; Eldridge et al. 2003; Iu et al. 2003). HB calculations closely approximated measured cooling loads when provided with detailed data for the test rooms.

## 5.1 ASSUMPTIONS

All calculation procedures involve some kind of model; all models require simplifying assumptions and, therefore, are approximate. The most fundamental assumption is that air in the thermal zone can be modeled as **well mixed**, meaning its temperature is uniform throughout the zone. ASHRAE research project RP-664 (Fisher and Pedersen 1997) established that this assumption is valid over a wide range of conditions.

The next major assumption is that the surfaces of the room (walls, windows, floor, etc.) can be treated as having

- Uniform surface temperatures
- Uniform long-wave (LW) and short-wave (SW) irradiation
- Diffuse radiating surfaces
- One-dimensional heat conduction within

The resulting formulation is called the **heat balance (HB) model**. Note that the assumptions, although common, are quite restrictive and set certain limits on the information that can be obtained from the model.

## 5.2 ELEMENTS

Within the framework of the assumptions, the HB can be viewed as four distinct processes:

1. Outdoor-face heat balance 2. Wall conduction process 3. Indoor-face heat balance 4. Air heat balance

Figure 5 shows the relationship between these processes for a single opaque surface. The top part of the figure, inside the shaded box, is repeated for each surface enclosing the zone. The process for transparent surfaces is similar, but the absorbed solar component appears in the conduction process block instead of at the outdoor face, and the absorbed component splits into inward- and outward-flowing fractions. These components participate in the surface heat balances.

### Outdoor-Face Heat Balance

The heat balance on the outdoor face of each surface is

> q″<sub>αsol</sub> + q″<sub>LWR</sub> + q″<sub>conv</sub> – q″<sub>ko</sub> = 0&emsp;**(16)**

where

- q″<sub>αsol</sub> = absorbed direct and diffuse solar radiation flux (q/A), W/m<sup>2</sup>
- q″<sub>LWR</sub> = net long-wave radiation flux exchange with air and surroundings, W/m<sup>2</sup>
- q″<sub>conv</sub> = convective exchange flux with outdoor air, W/m<sup>2</sup>
- q″<sub>ko</sub> = conductive flux (q/A) into wall, W/m<sup>2</sup>

All terms are positive for net flux to the face except q″ , which is

> ko

traditionally taken to be positive from outdoors to inside the wall.

Each term in Equation (16) has been modeled in several ways, and in simplified methods the first three terms are combined by using the sol-air temperature.

### Wall Conduction Process

The wall conduction process has been formulated in more ways than any of the other processes. Techniques include

- Numerical finite difference
- Numerical finite element
- Transform methods
- Time series methods

This process introduces part of the time dependence inherent in load calculation. Figure 6 shows surface temperatures on the indoor and outdoor faces of the wall element, and corresponding conductive heat fluxes away from the outer face and toward the indoor face. All four quantities are functions of time. Direct formulation of the process uses temperature functions as input or known quantities, and heat fluxes as outputs or resultant quantities.

![Fig. 5 Schematic of Heat Balance Processes in Zone](img/ch18/fig-05.png)

*Fig. 5 Schematic of Heat Balance Processes in Zone*

![Fig. 6 Schematic of Wall Conduction Process](img/ch18/fig-06.png)

*Fig. 6 Schematic of Wall Conduction Process*

<!-- str. 493 -->

In some models, surface heat transfer coefficients are included as part of the wall element, making the temperatures in question the indoor and outdoor air temperatures. This is not a desirable formulation, because it hides the heat transfer coefficients and prohibits changing them as airflow conditions change. It also prohibits treating the internal long-wave radiation exchange appropriately.

Because heat balances on both sides of the element induce both the temperature and heat flux, the solution must deal with this simultaneous condition. Two computational methods that have been used widely are finite difference and conduction transfer function methods. Because of the computational time advantage, the conduction transfer function formulation has been selected for presentation here.

### Indoor-Face Heat Balance

The heart of the HB method is the internal heat balance involving the inner faces of the zone surfaces. This heat balance has many heat transfer components, and they are all coupled. Both long-wave (LW) and short-wave (SW) radiation are important, as well as wall conduction and convection to the air. The indoor-face heat balance for each surface can be written as follows:

> q″<sub>LWX</sub> + q″<sub>SW</sub> + q″<sub>LWS</sub> + q″<sub>ki</sub> + q″<sub>sol</sub> + q″<sub>conv</sub> = 0&emsp;**(17)**

where

- q″<sub>LWX</sub> = net long-wave radiant flux exchange between zone surfaces, W/m<sup>2</sup>
- q″<sub>SW</sub> = net short-wave radiation flux to surface from lights, W/m<sup>2</sup>
- q″<sub>LWS</sub> = long-wave radiation flux from equipment in zone, W/m<sup>2</sup>
- q″<sub>ki</sub> = conductive flux through wall, W/m<sup>2</sup>
- q″<sub>sol</sub> = transmitted solar radiative flux absorbed at surface, W/m<sup>2</sup>
- q″<sub>conv</sub> = convective heat flux to zone air, W/m<sup>2</sup>

These terms are explained in the following paragraphs.

**LW Radiation Exchange Among Zone Surfaces.** The limiting cases for modeling internal LW radiation exchange are

- Zone air is completely transparent to LW radiation
- Zone air completely absorbs LW radiation from surfaces in the zone

Most HB models treat air as completely transparent and not participating in LW radiation exchange among surfaces in the zone. The second model is attractive because it can be formulated simply using a combined radiative and convective heat transfer coefficient from each surface to the zone air and thus decouples radiant exchange among surfaces in the zone. However, because the transparent air model allows radiant exchange and is more realistic, the second model is inferior.

Furniture in a zone increases the amount of surface area that can participate in radiative and convective heat exchanges. It also adds thermal mass to the zone. These two changes can affect the time response of the zone cooling load.

**SW Radiation from Lights.** The short-wavelength radiation from lights is usually assumed to be distributed over the surfaces in the zone in some manner. The HB procedure retains this approach but allows the distribution function to be changed.

**LW Radiation from Internal Sources.** The traditional model for this source defines a radiative/convective split for heat introduced into a zone from equipment. The radiative part is then distributed over the zone’s surfaces in some manner. This model is not completely realistic, and it departs from HB principles. In a true HB model, equipment surfaces are treated just as other LW radiant sources in the zone. However, because information about the surface temperature of equipment is rarely known, it is reasonable to keep the radiative/convective split concept even though it ignores the true nature of the radiant exchange. ASHRAE research project

RP-1055 (Hosni et al. 1999) determined radiative/convective splits for many additional equipment types, as listed in footnotes for Tables 8 and 9.

**Transmitted Solar Heat Gain.** Chapter 15’s calculation procedure for determining transmitted solar energy through fenestration uses the solar heat gain coefficient (SHGC) directly rather than relating it to double-strength glass, as is done when using a shading coefficient (SC). The difficulty with this plan is that the SHGC includes both transmitted solar and inward-flowing fraction of the solar radiation absorbed in the window. With the HB method, this latter part should be added to the conduction component so it can be included in the indoor-face heat balance.

Transmitted solar radiation is also distributed over surfaces in the zone in a prescribed manner. It is possible to calculate the actual position of beam solar radiation, but this involves partial surface irradiation, which is inconsistent with the rest of the zone model, which assumes uniform conditions over an entire surface.

### Using SHGC to Calculate Solar Heat Gain

The total solar heat gain through fenestration consists of directly transmitted solar radiation plus the inward-flowing fraction of solar radiation that is absorbed in the glazing system. Both parts contain beam and diffuse contributions. Transmitted radiation goes directly onto surfaces in the zone and is accounted for in the surface indoor heat balance. The zone heat balance model accommodates the resulting heat fluxes without difficulty. The second part, the inward-flowing fraction of the absorbed solar radiation, interacts with other surfaces of the enclosure through long-wave radiant exchange and with zone air through convective heat transfer. As such, it depends both on geometric and radiative properties of the zone enclosure and convection characteristics inside and outside the zone. The **solar heat gain coefficient (SHGC)** combines the transmitted solar radiation and the inward-flowing fraction of the absorbed radiation. The SHGC is defined as

> n
>
> ∑ k

> SHGC = τ + N α<sub>k</sub>&emsp;**(18)**
>
> k=1

where

- τ = solar transmittance of glazing
- α<sub>k</sub> = solar absorptance of the kth layer of the glazing system
- n = number of layers
- N<sub>k</sub> = inward-flowing fraction of absorbed radiation in the kth layer

Note that Equation (18) is written generically. It can be written for a specific incidence angle and/or radiation wavelength and integrated over the wavelength and/or angle, but the principle is the same in each case. Refer to Chapter 15 for the specific expressions.

Unfortunately, the inward-flowing fraction N interacts with the zone in many ways. This interaction can be expressed as N = f (indoor convection coefficient, outdoor convection coefficient, glazing system overall heat transfer coefficient, zone geometry, zone radiation properties)

The only way to model these interactions correctly is to combine the window model with the zone heat balance model and solve both simultaneously. This has been done recently in some energy analysis programs, but is not generally available in load calculation procedures. In addition, the SHGC used for rating glazing systems is based on specific values of the indoor, outdoor, and overall heat transfer coefficients and does not include any zonal long-wavelength radiation considerations. So, the challenge is to devise a way to use SHGC values within the framework of heat balance calculation in the most accurate way possible, as discussed in the following paragraphs.

**Using SHGC Data.** The normal incidence SHGC used to rate and characterize glazing systems is not sufficient for determining solar heat gain for load calculations. These calculations require solar heat gain as a function of the incident solar angle to determine the hour-by-hour gain profile. Thus, it is necessary to use angular SHGC values and also diffuse SHGC values. These can be obtained from the WINDOW 7.4.6 program (LBL 2015). This program does a detailed optical and thermal simulation of a glazing system and, when applied to a single clear layer, produces the information shown in Table 13.

<!-- str. 494 -->

**Table 13 Single-Layer Glazing Data Produced by WINDOW 7.4.6**

| Parameter | 0 | 10 | 20 | 30 | Incident Angle<br>40 | Incident Angle<br>50 | 60 | 70 | 80 | 90 | Diffuse (Hemis.) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| V<sub>tc</sub> | 0.899 | 0.899 | 0.898 | 0.896 | 0.889 | 0.870 | 0.822 | 0.705 | 0.441 | 0 | 0.822 |
| R<sub>fv</sub> | 0.083 | 0.083 | 0.083 | 0.085 | 0.091 | 0.109 | 0.156 | 0.272 | 0.536 | 1 | 0.148 |
| R<sub>bv</sub> | 0.083 | 0.083 | 0.083 | 0.085 | 0.091 | 0.109 | 0.156 | 0.272 | 0.536 | 1 | 0.148 |
| T<sub>sol</sub> | 0.834 | 0.833 | 0.831 | 0.827 | 0.818 | 0.797 | 0.749 | 0.637 | 0.389 | 0 | 0.753 |
| R<sub>f</sub> | 0.075 | 0.075 | 0.075 | 0.077 | 0.082 | 0.099 | 0.143 | 0.253 | 0.506 | 1 | 0.136 |
| R<sub>b</sub> | 0.075 | 0.075 | 0.075 | 0.077 | 0.082 | 0.099 | 0.143 | 0.253 | 0.506 | 1 | 0.136 |
| A<sub>bs1</sub> | 0.091 | 0.092 | 0.094 | 0.096 | 0.100 | 0.104 | 0.108 | 0.110 | 0.105 | 0 | 0.101 |
| SHGC | 0.861 | 0.860 | 0.859 | 0.855 | 0.847 | 0.827 | 0.781 | 0.669 | 0.424 | 0 | 0.783 |

Source: LBL (2015).

Table 13 shows the parameters as a function of incident solar angle and also the diffuse values. The specific parameters shown are V<sub>tc</sub> = transmittance in visible spectrum

R<sub>fv</sub>andR<sub>bv</sub>= front and back surface visible reflectances

T<sub>sol</sub> = solar transmittance [τ in Equations (18), (19), and (20)]

R<sub>f</sub> and R<sub>b</sub> = front and back surface solar reflectances

A<sub>bs1</sub> = solar absorptance for layer 1, which is the only layer in this case [α in Equations (18), (19), and (20)]

SHGC = solar heat gain coefficient at center of glazing

The parameters used for heat gain calculations are T<sub>sol</sub>, A<sub>bs</sub>, and SHGC. For the specific convective conditions assumed in WINDOW 7.4.6 program, the inward-flowing fraction of the absorbed solar can be obtained by rearranging Equation (18) to give

> N<sub>k</sub>α<sub>k</sub> = SHGC – τ&emsp;**(19)**

This quantity, when multiplied by the appropriate incident solar intensity, provides the amount of absorbed solar radiation that flows inward. In the heat balance formulation for zone loads, this heat flux is combined with that caused by conduction through glazing and included in the surface heat balance.

The outward-flowing fraction of absorbed solar radiation is used in the heat balance on the outdoor face of the glazing and is determined from

> (1 – N<sub>k</sub>)α<sub>k</sub> = α<sub>k</sub> – N<sub>k</sub>α<sub>k</sub> = α<sub>k</sub> – (SHGC – τ)&emsp;**(20)**

If there is more than one layer, the appropriate summation of absorptances must be done.

There is some potential inaccuracy in using the WINDOW 7.4.6 SHGC values because the inward-flowing fraction part was determined under specific conditions for the indoor and outdoor heat transfer coefficients. However, the program can be run with indoor and outdoor coefficients of one’s own choosing. Normally, however, this effect is not large, and only in highly absorptive glazing systems might cause significant error.

For solar heat gain calculations, then, it seems reasonable to use the generic window property data that comes from WINDOW 7.4.6. Considering Table 13, the procedure is as follows:

1. Determine angle of incidence for the glazing.

2. Determine corresponding SHGC.

3. Evaluate N<sub>k</sub>α<sub>k</sub> using Equation (18).

4. Multiply T<sub>sol</sub> by incident beam radiation intensity to get transmitted beam solar radiation.

5. Multiply N<sub>k</sub>α<sub>k</sub> by incident beam radiation intensity to get inward-flowing absorbed heat.

6. Repeat steps 2 to 5 with diffuse parameters and diffuse radiation. 7. Add beam and diffuse components of transmitted and inward-flowing absorbed heat.

This procedure is incorporated into the HB method so the solar gain is calculated accurately for each hour.

Table 10 in Chapter 15 contains SHGC information for many additional glazing systems. That table is similar to Table 13 but is slightly abbreviated. Again, the information needed for heat gain calculations is T<sub>sol</sub>, SHGC, and A<sub>bs</sub>.

The same caution about the indoor and outdoor heat transfer coefficients applies to the information in Table 10 in Chapter 15. Those values were also obtained with specific indoor and outdoor heat transfer coefficients, and the inward-flowing fraction N is dependent upon those values.

**Convection to Zone Air.** Indoor convection coefficients presented in past editions of this chapter and used in most load calculation procedures and energy programs are based on very old, natural convection experiments and do not accurately describe heat transfer coefficients in a mechanically ventilated zone. In previous load calculation procedures, these coefficients were buried in the procedures and could not be changed. A heat balance formulation keeps them as working parameters. In this way, research results such as those from ASHRAE research project RP-664 (Fisher 1998) can be incorporated into the procedures. It also allows determining the sensitivity of the load calculation to these parameters.

### Air Heat Balance

In HB formulations aimed at determining cooling loads, the capacitance of air in the zone is neglected and the air heat balance is done as a quasisteady balance in each time period. Four factors contribute to the air heat balance:

> q<sub>conv</sub> + q<sub>CE</sub> + q<sub>IV</sub> + q<sub>sys</sub> = 0&emsp;**(21)**

where

- q<sub>conv</sub> = convective heat transfer from surfaces, W
- q<sub>CE</sub> = convective parts of internal loads, W
- q<sub>IV</sub> = sensible load caused by infiltration and ventilation air, W
- q<sub>sys</sub> = heat transfer to/from HVAC system, W

**Convection from zone surfaces q<sub>conv</sub>** is the sum of all the convective heat transfer quantities from the indoor-surface heat balance. This comes to the air through the convective heat transfer coefficient on the surfaces.

The **convective parts of the internal loads q<sub>CE</sub>** is the companion to q″<sub>LWS</sub>, the radiant contribution from internal loads [Equation (17)]. It is added directly to the air heat balance. This also violates the tenets of the HB approach, because surfaces producing internal loads exchange heat with zone air through normal convective processes. However, once again, this level of detail is generally not included in the heat balance, so it is included directly into the air heat balance instead.

<!-- str. 495 -->

In keeping with the well-mixed model for zone air, any air that enters directly to a space through **infiltration or ventilation q<sub>IV</sub>** is immediately mixed with the zone’s air. The amount of infiltration or natural ventilation air is uncertain. Sometimes it is related to the indoor/outdoor temperature difference and wind speed; however it is determined, it is added directly to the air heat balance.

Conditioned air that enters the zone from the HVAC system and provides q<sub>sys</sub> is also mixed directly with the zone air. For commercial HVAC systems, ventilation air is most often provided using outdoor air as part of this mixed-in conditioned air; ventilation air is thus normally a system load rather than a direct-to-space load. An exception is where infiltration or natural ventilation is used to provide all or part of the ventilation air, as discussed in Chapter 16.

## 5.3 GENERAL ZONE FOR LOAD CALCULATION

The HB procedure is tailored to a single thermal zone, shown in Figure 7. The definition of a thermal zone depends on how the fixed temperature is controlled. If air circulated through an entire building or an entire floor is uniformly well stirred, the entire building or floor could be considered a thermal zone. On the other hand, if each room has a different control scheme, each room may need to be considered as a separate thermal zone. The framework needs to be flexible enough to accommodate any zone arrangement, but the heat balance aspect of the procedure also requires that a complete zone be described. This zone consists of four walls, a roof or ceiling, a floor, and a “thermal mass surface” (described in the section on Input Required). Each wall and the roof can include a window (or skylight in the case of the roof). This makes a total of 12 surfaces, any of which may have zero area if it is not present in the zone to be modeled.

The heat balance processes for this general zone are formulated for a 24 h steady-periodic condition. The variables are the indoor and outdoor temperatures of the 12 surfaces plus either the HVAC system energy required to maintain a specified air temperature or the air temperature, if system capacity is specified. This makes a total of 25 × 24 = 600 variables. Although it is possible to set up the problem for a simultaneous solution of these variables, the relatively weak coupling of the problem from one hour to the next allows a double iterative approach. One iteration is through all the surfaces in each hour, and the other is through the 24 h of a day. This procedure automatically reconciles nonlinear aspects of surface radiative exchange and other heat flux terms.

![Fig. 7 Schematic View of General Heat Balance Zone](img/ch18/fig-07.png)

*Fig. 7 Schematic View of General Heat Balance Zone*

## 5.4 MATHEMATICAL DESCRIPTION

### Conduction Process

Because it links the outdoor and indoor heat balances, the wall conduction process regulates the cooling load’s time dependence. For the HB procedure presented here, wall conduction is formulated using **conduction transfer functions (CTFs)**, which relate conductive heat fluxes to current and past surface temperatures and past heat fluxes. The general form for the indoor heat flux is

> nz
>
> ∑ j

q<sub>k</sub>″<sub>i</sub>(t) = – Z<sub>o</sub>T<sub>si,θ</sub> – Z T<sub>si,θ</sub>

> – jδ&emsp;**(22)**
>
> j=1

> nz nq
>
> ∑ j so, θ – jδ ∑ j

> + Y<sub>o</sub>T<sub>so,θ</sub> + Y T + Φ q″<sub>ki,θ</sub>
>
> –jδ

> j=1 j=1

For outdoor heat flux, the form is

> nz
>
> ∑ j

q<sub>k</sub>″<sub>o</sub>(t) = – Y<sub>o</sub>T<sub>si,θ</sub>– Y T<sub>si,θ</sub>

> – jδ
>
> j=1&emsp;**(23)**

> nz nq
>
> ∑ j so, θ – jδ ∑ j

> + X<sub>o</sub>T<sub>so,θ</sub>+ X T + Φ q″<sub>ko,θ</sub>
>
> –jδ

> j=1 j=1

where

- X<sub>j</sub> = outdoor CTF, j = 0,1,…nz
- Y<sub>j</sub> = cross CTF, j = 0,1,…nz
- Z<sub>j</sub> = indoor CTF, j = 0,1,…nz
- Φ<sub>j</sub> = flux CTF,j = 1,2,… nq
- θ = time
- δ = time step
- T<sub>si</sub> = indoor-face temperature, °C
- T<sub>so</sub> = outdoor-face temperature, °C
- q″<sub>ki</sub> = conductive heat flux on indoor face, W/m<sup>2</sup>
- q″<sub>ko</sub> = conductive heat flux on outdoor face, W/m<sup>2</sup>

The subscript following the comma indicates the time period for the quantity in terms of time step δ. Also, the first terms in the series have been separated from the rest to facilitate solving for the current temperature in the solution scheme.

The two summation limits nz and nq depend on wall construction and also somewhat on the scheme used for calculating the CTFs. If nq = 0, the CTFs are generally referred to as **response factors**, but then theoretically nz is infinite. Values for nz and nq are generally set to minimize the amount of computation. A development of CTFs can be found in Hittle and Pedersen (1981).

### Heat Balance Equations

The primary variables in the heat balance for the general zone are the 12 indoor face temperatures and the 12 outdoor face temperatures at each of the 24 h, assigning i as the surface index and j as the hour index, or, in the case of CTFs, the sequence index. Thus, the primary variables are T<sub>soi,j</sub> = outdoor face temperature, i = 1,2,…,12; j = 1,2,…, 24

T<sub>sii,j</sub> = indoor face temperature, i = 1,2,…,12; j = 1,2,…, 24

In addition, q<sub>sysj</sub> = cooling load, j = 1,2,…, 24.

Equations (16) and (23) are combined and solved for T<sub>so</sub> to produce 12 equations applicable in each time step:

<!-- str. 496 -->

> (<sub>nz</sub>
>
> nz nq

> ∑ si<sub>i,j–k</sub> i, k ∑ so<sub>i,j–k</sub> i, k ∑ i,

T<sub>soi,j</sub> = T Y – T Z – Φ <sub>k</sub>q<sub>k</sub>″<sub>oi,j–</sub>

> k
>
> (k=1

> k=1 k=1&emsp;**(24)**
>
> )

> (X<sub>,0</sub>+ h<sub>coi,j</sub>)

+ q″<sub>αsoli,j</sub> + q″<sub>LWRi,j</sub> + T<sub>sii,j</sub>Y<sub>i,0</sub>+ T<sub>oj</sub>h<sub>co</sub> ⁄ i

> <sup>i,j</sup>)

where

- T<sub>o</sub> = outdoor air temperature
- h<sub>co</sub> = outdoor convection coefficient, introduced by using q″<sub>conv</sub>= h<sub>co</sub>(T<sub>o</sub> – T<sub>so</sub>)

Equation (24) shows the need to separate X<sub>i,0</sub>, because the contribution of current surface temperature to conductive flux cannot be collected with the other historical terms involving that temperature.

Equations (17) and (22) are combined and solved for T<sub>si</sub>to produce the next 12 equations:

> nz

T<sub>sii,j</sub> = ( + T <sub>i,j–k</sub>Y<sub>i,k</sub>

> T Y<sub>i,0</sub> ∑ so
>
> ( so

> i, j
>
> k–1&emsp;**(25)**

> nz nq
>
> ∑ si<sub>i,j–k</sub> i, k ∑ i,

– T Z + Φ <sub>k</sub>q<sub>k</sub>″<sub>ii,j–k</sub> + T<sub>aj</sub>h<sub>cij</sub> + q″<sub>LWS</sub>

> k=1 k=1
>
> )

+ q<sub>L</sub>″<sub>WX</sub> + q″<sub>SW</sub> + q″<sub>sol</sub> e ⁄ (Z<sub>i,0</sub>+ h<sub>cii,j</sub>)

> )

where

- T<sub>a</sub> = zone air temperature
- h<sub>ci</sub> = convective heat transfer coefficient indoors, obtained from
- q″<sub>conv</sub> = h<sub>ci</sub>(T<sub>a</sub> – T<sub>si</sub>)

Note that in Equations (24) and (25), the opposite surface temperature at the current time appears on the right-hand side. The two equations could be solved simultaneously to eliminate those variables. Depending on the order of updating the other terms in the equations, this can have a beneficial effect on solution stability.

The remaining equation comes from the air heat balance, Equation (21). This provides the cooling load q<sub>sys</sub> at each time step:

> 12
>
> ∑ i

> q<sub>sysj</sub> = A h<sub>ci</sub>(T<sub>sii,j</sub> – T<sub>aj</sub>) + q<sub>CE</sub>+ q<sub>IV</sub>&emsp;**(26)**
>
> i=1

In Equation (26), the convective heat transfer term is expanded to show the interconnection between the surface temperatures and the cooling load.

### Overall HB Iterative Solution

The iterative HB procedure consists of a series of initial calculations that proceed sequentially, followed by a double iteration loop, as shown in the following steps:

1. Initialize areas, properties, and face temperatures for all surfaces, 24 h.

2. Calculate incident and transmitted solar flux for all surfaces and hours.

3. Distribute transmitted solar energy to all indoor faces, 24 h. 4. Calculate internal load quantities for all 24 h.

5. Distribute LW, SW, and convective energy from internal loads to all surfaces for all hours.

6. Calculate infiltration and direct-to-space ventilation loads for all hours.

7. Iterate the heat balance according to the following scheme:

```text
For Day = 1 to Maxdays
     For j = 1 to 24            {hours in the day}
          For SurfaceIter = 1 to MaxIter
               For i = 1 to 12       {The twelve zone surfaces}
                    Evaluate Equations (33) and (34)
               Next i
          Next SurfaceIter
          Evaluate Equation (35)
     Next j
If not converged, Next Day
```

8. Display results.

Generally, four or six surface iterations are sufficient to provide convergence. The convergence check on the day iteration should be based on the difference between the indoor and outdoor conductive heat flux terms q<sub>k</sub>. A limit, such as requiring the difference between all indoor and outdoor flux terms to be less than 1% of either flux, works well.

## 5.5 INPUT REQUIRED

Previous methods for calculating cooling loads attempted to simplify the procedure by precalculating representative cases and grouping the results with various correlating parameters. This generally tended to reduce the amount of information required to apply the procedure. With heat balance, no precalculations are made, so the procedure requires a fairly complete description of the zone.

**Global Information.** Because the procedure incorporates a solar calculation, some global information is required, including latitude, longitude, time zone, month, day of month, directional orientation of the zone, and zone height (floor to floor). Additionally, to take full advantage of the flexibility of the method to incorporate, for example, variable outdoor heat transfer coefficients, things such as wind speed, wind direction, and terrain roughness may be specified. Normally, these variables and others default to some reasonable set of values, but the flexibility remains.

**Wall Information (Each Wall).** Because the walls are involved in three of the fundamental processes (external and internal heat balance and wall conduction), each wall of the zone requires a fairly large set of variables. They include

- Facing angle with respect to solar exposure
- Tilt (degrees from horizontal)
- Area
- Solar absorptivity outdoors
- Long-wave emissivity outdoors
- Short-wave absorptivity indoors
- Long-wave emissivity indoors
- Exterior boundary temperature condition (solar versus nonsolar)
- External roughness
- Layer-by-layer construction information

Again, some of these parameters can be defaulted, but they are changeable, and they indicate the more fundamental character of the HB method because they are related to true heat transfer processes.

**Window Information (Each Window).** The situation for windows is similar to that for walls, but the windows require some additional information because of their role in the solar load. Necessary parameters include

- Area
- Normal solar transmissivity
- Normal SHGC
- Normal total absorptivity
- Long-wave emissivity outdoors
- Long-wave emissivity indoor
- Surface-to-surface thermal conductance

<!-- str. 497 -->

- Reveal (for solar shading)
- Overhang width (for solar shading)
- Distance from overhang to window (for solar shading)

**Roof and Floor Details.** The roof and floor surfaces are specified similarly to walls. The main difference is that the ground outdoor boundary condition will probably be specified more often for a floor.

**Thermal Mass Surface Details.** An “extra” surface, called a thermal mass surface, can serve several functions. It is included in radiant heat exchange with the other surfaces in the space but is only exposed to the indoor air convective boundary condition. As an example, this surface would be used to account for movable partitions in a space. Partition construction is specified layer by layer, similar to specification for walls, and those layers store and release heat by the same conduction mechanism as walls. As a general definition, the extra thermal mass surface should be sized to represent all surfaces in the space that are exposed to the air mass, except the walls, roof, floor, and windows. In the formulation, both sides of the thermal mass participate in the exchange.

**Internal Heat Gain Details.** The space can be subjected to several internal heat sources: people, lights, electrical equipment, and infiltration. Infiltration energy is assumed to go immediately into the air heat balance, so it is the least complicated of the heat gains. For the others, several parameters must be specified. These include the following fractions:

- Sensible heat gain
- Latent heat gain
- Short-wave radiation
- Long-wave radiation
- Energy that enters the air immediately as convection
- Activity level of people
- Lighting heat gain that goes directly to the return air

**Radiant Distribution Functions.** As mentioned previously, the generally accepted assumptions for the HB method include specifying the distribution of radiant energy from several sources to surfaces that enclose the space. This requires a distribution function that specifies the fraction of total radiant input absorbed by each surface. The types of radiation that require distribution functions are

- Long-wave, from equipment and lights
- Short-wave, from lights
- Transmitted solar

**Other Required Information.** Additional flexibility is included in the model so that results of research can be incorporated easily. This includes the capability to specify such things as

- Heat transfer coefficients/convection models
- Solar coefficients
- Sky models

The amount of input information required may seem extensive, but many parameters can be set to default values in most routine applications. However, all parameters listed can be changed when necessary to fit unusual circumstances or when additional information is obtained.

## 6. RADIANT TIME SERIES (RTS) METHOD

The radiant time series (RTS) method is a simplified method for performing design cooling load calculations that is derived from the heat balance (HB) method. It effectively replaces all other simplified (non-heat-balance) methods, such as the transfer function method (TFM), the cooling load temperature difference/cooling load factor (CLTD/CLF) method, and the total equivalent temperature difference/time averaging (TETD/TA) method.

This method was developed to offer an approach that is rigorous, yet does not require iterative calculations, and that quantifies each component’s contribution to the total cooling load. In addition, it is desirable for the user to be able to inspect and compare the coefficients for different construction and zone types in a form showing their relative effect on the result. These characteristics of the RTS method make it easier to apply engineering judgment during cooling load calculation.

The RTS method is suitable for peak design load calculations, but it should not be used for annual energy simulations because of its inherent limiting assumptions. Although simple in concept, RTS involves too many calculations for practical use as a manual method, although it can easily be implemented in a simple computerized spreadsheet, as shown in the examples. For a manual cooling load calculation method, refer to the CLTD/CLF method in Chapter 28 of the 1997 ASHRAE Handbook—Fundamentals.

## 6.1 ASSUMPTIONS AND PRINCIPLES

Design cooling loads are based on the assumption of **steady- periodic conditions (**i.e., the design day’s weather, occupancy, and heat gain conditions are identical to those for preceding days such that the loads repeat on an identical 24 h cyclical basis). Thus, the heat gain for a particular component at a particular hour is the same as 24 h prior, which is the same as 48 h prior, etc. This assumption is the basis for the RTS derivation from the HB method.

Cooling load calculations must address two time-delay effects inherent in building heat transfer processes:

- Delay of conductive heat gain through opaque massive exterior surfaces (walls, roofs, or floors)
- Delay of radiative heat gain conversion to cooling loads.

Exterior walls and roofs conduct heat because of temperature differences between outdoor and indoor air. In addition, solar energy on exterior surfaces is absorbed, then transferred by conduction to the building interior. Because of the mass and thermal capacity of the wall or roof construction materials, there is a substantial time delay in heat input at the exterior surface becoming heat gain at the interior surface.

As described in the section on Cooling Load Principles, most heat sources transfer energy to a room by a combination of convection and radiation. The convective part of heat gain immediately becomes cooling load. The radiative part must first be absorbed by the finishes and mass of the interior room surfaces, and becomes cooling load only when it is later transferred by convection from those surfaces to the room air. Thus, radiant heat gains become cooling loads over a delayed period of time.

## 6.2 OVERVIEW

Figure 8 gives an overview of the RTS method. When calculating solar radiation, transmitted solar heat gain through windows, sol-air temperature, and infiltration, RTS is exactly the same as previous simplified methods (TFM and TETD/TA). Important areas that differ from previous simplified methods include

- Computation of conductive heat gain
- Splitting of all heat gains into radiant and convective portions
- Conversion of radiant heat gains into cooling loads

The RTS method accounts for both conduction time delay and radiant time delay effects by multiplying hourly heat gains by 24 h time series. The time series multiplication, in effect, distributes heat gains over time. Series coefficients, which are called **radiant time factors** and **conduction time factors**, are derived using the HB method. Radiant time factors reflect the percentage of an earlier radiant heat gain that becomes cooling load during the current hour. Likewise, conduction time factors reflect the percentage of an earlier heat gain at the exterior of a wall or roof that becomes heat gain indoors during the current hour. By definition, each radiant or conduction time series must total 100%.

<!-- str. 498 -->

![Fig. 8 Overview of Radiant Time Series Method](img/ch18/fig-08.png)

*Fig. 8 Overview of Radiant Time Series Method*

![Fig. 9 CTS for Light to Heavy Walls](img/ch18/fig-09.png)

*Fig. 9 CTS for Light to Heavy Walls*

These series can be used to easily compare the time-delay effect of one construction versus another. This ability to compare choices is of particular benefit during design, when all construction details may not have been decided. Comparison can show the magnitude of difference between the choices, allowing the engineer to apply judgment and make more informed assumptions in estimating the load.

Figure 9 shows conduction time series (CTS) values for three walls with similar U-factors but with light to heavy construction. Figure 10 shows CTS for three walls with similar construction but with different amounts of insulation, thus with significantly different U-factors. Figure 11 shows RTS values for zones varying from light to heavy construction.

![Fig. 10 CTS for Walls with Similar Mass and Increasing Insulation](img/ch18/fig-10.png)

*Fig. 10 CTS for Walls with Similar Mass and Increasing Insulation*

![Fig. 11 RTS for Light to Heavy Construction](img/ch18/fig-11.png)

*Fig. 11 RTS for Light to Heavy Construction*

<!-- str. 499 -->

**Table 14 Recommended Radiative/Convective Splits for Internal Heat Gains**

| Heat Gain Type | Recommended Radiative Fraction | Recommended Convective Fraction | Comments |
|---|---|---|---|
| Occupants, typical office conditions | 0.60 | 0.40 | See Table 1 for other conditions. |
| Equipment | 0.1 to 0.8 | 0.9 to 0.2 | See Tables 6 to 12 for details of equipment heat gain and recommended radiative/convective splits for motors, cooking appliances, laboratory |
| Office, with fan | 0.10 | 0.90 |  |
|  |  |  | equipment, medical equipment, office equipment, etc. |
| Without fan | 0.30 | 0.70 |  |
| Lighting |  |  | Varies; see Table 3. |
| Conduction heat gain |  |  |  |
| Through walls and floors | 0.46 | 0.54 |  |
| Through roof | 0.60 | 0.40 |  |
| Through windows | 0.33 (SHGC > 0.5) 0.46 (SHGC < 0.5) | 0.67 (SHGC > 0.5) 0.54 (SHGC < 0.5) |  |
| Solar heat gain through fenestration |  |  |  |
| Without interior shading | 1.00 | 0.00 |  |
| With interior shading |  |  | Varies; see Tables 14A to 14G in Chapter 15. |
| Infiltration | 0.00 | 1.00 |  |

Source: Nigusse (2007).

## 6.3 RTS PROCEDURE

The general procedure for calculating cooling load for each load component (lights, people, walls, roofs, windows, appliances, etc.) with RTS is as follows:

1. Calculate 24 h profile of component heat gains for design day (for conduction, first account for conduction time delay by applying conduction time series).

2. Split heat gains into radiant and convective parts (see Table 14 for radiant and convective fractions).

3. Apply appropriate radiant time series to radiant part of heat gains to account for time delay in conversion to cooling load.

4. Sum convective part of heat gain and delayed radiant part of heat gain to determine cooling load for each hour for each cooling load component.

After calculating cooling loads for each component for each hour, sum those to determine the total cooling load for each hour and select the hour with the peak load for design of the air-conditioning system. Repeat this process for multiple design months to determine the month when the peak load occurs, especially with windows on southern exposures (northern exposure in southern latitudes), which can result in higher peak room cooling loads in winter months than in summer.

## 6.4 HEAT GAIN THROUGH EXTERIOR SURFACES

Heat gain through exterior opaque surfaces is derived from the same elements of solar radiation and thermal gradient as that for fenestration areas. It differs primarily as a function of the mass and nature of the wall or roof construction, because those elements affect the rate of conductive heat transfer through the composite assembly to the interior surface.

### Sol-Air Temperature

Sol-air temperature is the outdoor air temperature that, in the absence of all radiation changes gives the same rate of heat entry into the surface as would the combination of incident solar radiation, radiant energy exchange with the sky and other outdoor surroundings, and convective heat exchange with outdoor air.

**Heat Flux into Exterior Sunlit Surfaces.** The heat balance at a sunlit surface gives the heat flux into the surface q/A as

> q/A = αE<sub>t</sub> + h<sub>o</sub>(t<sub>o</sub> – t<sub>s</sub>) – εΔR&emsp;**(27)**

where

- α = absorptance of surface for solar radiation
- E<sub>t</sub> = total solar radiation incident on surface, W/m<sup>2</sup>
- h<sub>o</sub> = coefficient of heat transfer by long-wave radiation and convection at outer surface, W/(m<sup>2</sup>·K)
- t<sub>o</sub> = outdoor air temperature, °C
- t<sub>s</sub> = surface temperature, °C
- ε = hemispherical emittance of surface
- ΔR = difference between long-wave radiation incident on surface from sky and surroundings and radiation emitted by blackbody at outdoor air temperature, W/m<sup>2</sup>

Assuming the rate of heat transfer can be expressed in terms of the sol-air temperature t<sub>e</sub>,

> q
>
> -- = h<sub>o</sub>(t<sub>e</sub> – t<sub>s</sub>)&emsp;**(28)**

> A

and from Equations (27) and (28),

> t<sub>e</sub> = t<sub>o</sub> + αE<sub>t</sub>/h<sub>o</sub> – (ε ΔR)/h<sub>o</sub>&emsp;**(29)**

For **horizontal surfaces** that receive long-wave radiation from the sky only, an appropriate value of ΔR is about 63 W/m<sup>2</sup>, so that if ε = 1 and h<sub>o</sub> = 17 W/(m<sup>2</sup>·K), the long-wave correction term is about 4 K (Bliss 1961).

Because **vertical surfaces** receive long-wave radiation from the ground and surrounding buildings as well as from the sky, accurate ΔR values are difficult to determine. When solar radiation intensity is high, surfaces of terrestrial objects usually have a higher temperature than the outdoor air; thus, their long-wave radiation compensates to some extent for the sky’s low emittance. Therefore, it is common practice to assume εΔR = 0 for vertical surfaces.

**Tabulated Temperature Values.** The sol-air temperatures in Example Cooling and Heating Load Calculations section have been calculated based on εΔR/h<sub>o</sub> values of 4 K for horizontal surfaces and 0 K for vertical surfaces; total solar intensity values used for the calculations were calculated using equations in Chapter 14.

**Surface Colors.** Sol-air temperature values are given in the Example Cooling and Heating Load Calculations section for two values of the parameter α/h<sub>o</sub>; the value of 0.026 is appropriate for a light-colored surface, whereas 0.052 represents the usual maximum value for this parameter (i.e., for a dark-colored surface or any surface for which the permanent lightness cannot reliably be anticipated). Solar absorptance values of various surfaces are included in Table 15.

<!-- str. 500 -->

**Table 15 Solar Absorptance Values of Various Surfaces**

| Surface | Absorptance |
|---|---|
| Brick, red (Purdue)<sup>a</sup> | 0.63 |
| Paint |  |
| Red<sup>b</sup> | 0.63 |
| Black, matte<sup>b</sup> | 0.94 |
| Sandstone<sup>b</sup> | 0.50 |
| White acrylic<sup>a</sup> | 0.26 |
| Sheet metal, galvanized |  |
| New<sup>a</sup> | 0.65 |
| Weathered<sup>a</sup> | 0.80 |
| Shingles |  |
| Gray<sup>b</sup> | 0.82 |
| Brown<sup>b</sup> | 0.91 |
| Black<sup>b</sup> | 0.97 |
| White<sup>b</sup> | 0.75 |
| Concrete<sup>a,c</sup> | 0.60 to 0.83 |

<sup>a</sup>Incropera and DeWitt (1990). <sup>b</sup>Parker et al. (2000). <sup>c</sup>Miller (1971).

This procedure was used to calculate the sol-air temperatures included in the Examples section. Because of the tedious solar angle and intensity calculations, using a simple computer spreadsheet or other software for these calculations can reduce the effort involved.

### Calculating Conductive Heat Gain Using Conduction Time Series

In the RTS method, conduction through exterior walls and roofs is calculated using CTS values. Wall and roof conductive heat input at the exterior is defined by the familiar conduction equation as

> q<sub>i,θ-n</sub>= UA(t<sub>e,θ-n</sub> – t<sub>rc</sub>)&emsp;**(30)**

where

- q<sub>i,θ−n</sub> = conductive heat input for surface n hours ago, W
- U = overall heat transfer coefficient for surface, W/(m<sup>2</sup>·K)
- A = surface area, m<sup>2</sup>
- t<sub>e,θ-n</sub> = sol-air temperature n hours ago, °C
- t<sub>rc</sub> = presumed constant room air temperature, °C

Conductive heat gain through walls or roofs can be calculated using conductive heat inputs for the current hours and past 23 h and conduction time series:

> …
>
> q<sub>θ</sub> = c<sub>0</sub>q<sub>i,θ</sub> + c<sub>1</sub>q<sub>i,θ-1</sub> + c<sub>2</sub>q<sub>i,θ-2</sub> + c<sub>3</sub>q<sub>i,θ-3</sub> + + c<sub>23</sub>q<sub>i,θ-23</sub>&emsp;**(31)**

where

- q<sub>θ</sub> = hourly conductive heat gain for surface, W
- q<sub>i,θ</sub> = heat input for current hour
- q<sub>i,θ-n</sub> = heat input n hours ago c<sub>0</sub>, c<sub>1</sub>, etc.=conduction time factors

Conduction time factors for representative wall and roof types are included in Tables 16 and 17. Those values were derived by first calculating conduction transfer functions for each example wall and roof construction. Assuming steady-periodic heat input conditions for design load calculations allows conduction transfer functions to be reformulated into periodic response factors, as demonstrated by Spitler and Fisher (1999a). The periodic response factors were further simplified by dividing the 24 periodic response factors by the respective overall wall or roof U-factor to form the conduction time series. The conduction time factors can then be used in Equation (31) and provide a way to compare time delay characteristics between different wall and roof constructions. Construction material data used in the calculations for walls and roofs in Tables 16 and 17 are listed in Table 18.

Heat gains calculated for walls or roofs using periodic response factors (and thus CTS) are identical to those calculated using conduction transfer functions for the steady periodic conditions assumed in design cooling load calculations. The methodology for calculating periodic response factors from conduction transfer functions was originally developed as part of ASHRAE research project RP-875 (Spitler and Fisher 1999b; Spitler et al. 1997). For walls and roofs that are not reasonably close to the representative constructions in Tables 16 and 17, CTS coefficients may be computed with a computer program such as that described by Iu and Fisher (2004). For walls and roofs with thermal bridges, the procedure described by Karambakkam et al. (2005) may be used to determine an equivalent wall construction, which can then be used as the basis for finding the CTS coefficients. When considering the level of detail needed to make an adequate approximation, remember that, for buildings with windows and internal heat gains, the conduction heat gains make up a relatively small part of the cooling load. For heating load calculations, the conduction heat loss may be more significant.

The tedious calculations involved make a simple computer spreadsheet or other computer software a useful labor saver.

## 6.5 HEAT GAIN THROUGH INTERIOR SURFACES

Whenever a conditioned space is adjacent to a space with a different temperature, heat transfer through the separating physical section must be considered. The heat transfer rate is given by

> *q = UA*(*t<sub>b</sub> – t<sub>i</sub>*)&emsp;**(32)**

where

- q = heat transfer rate, W
- U = coefficient of overall heat transfer between adjacent and conditioned space, W/(m<sup>2</sup>·K)
- A = area of separating section concerned, m<sup>2</sup>
- t<sub>b</sub> = average air temperature in adjacent space, °C
- t<sub>i</sub> = air temperature in conditioned space, °C

U-values can be obtained from Chapter 27. Temperature t<sub>b</sub> may differ greatly from t<sub>i</sub>. The temperature in a kitchen or boiler room, for example, may be as much as 8 to 28 K above the outdoor air temperature. Actual temperatures in adjoining spaces should be measured, when possible. Where nothing is known except that the adjacent space is of conventional construction, contains no heat sources, and itself receives no significant solar heat gain, t<sub>b</sub> – t<sub>i</sub> may be considered the difference between the outdoor air and conditioned space design dry-bulb temperatures minus 3 K. In some cases, air temperature in the adjacent space corresponds to the outdoor air temperature or higher.

### Floors

For floors directly in contact with the ground or over an underground basement that is neither ventilated nor conditioned, sensible heat transfer may be neglected for cooling load estimates because usually there is a heat loss rather than a gain. An exception is in hot climates (i.e., where average outdoor air temperature exceeds indoor design condition), where the positive soil-to-indoor temperature difference causes sensible heat gains (Rock 2005). In many climates and for various temperatures and local soil conditions, moisture transport up through slabs-on-grade and basement floors is also significant, and contributes to the latent heat portion of the cooling load.

## 6.6 CALCULATING COOLING LOAD

The **instantaneous cooling load** is the rate at which heat energy is convected to the zone air at a given point in time. Computation of cooling load is complicated by the radiant exchange between surfaces, furniture, partitions, and other mass in the zone. Most heat gain sources transfer energy by both convection and radiation. Radiative heat transfer introduces a time dependency to the process that is not easily quantified. Radiation is absorbed by thermal masses in the zone and then later transferred by convection into the space. This process creates a time lag and dampening effect. The convective portion, on the other hand, is assumed to immediately become cooling load in the hour in which that heat gain occurs.

<!-- str. 501 -->

**Table 16 Wall Conduction Time Series (CTS)**

```text
                                                   Curtainwalls                                                Studwalls
                                                                                               Metal       Metal      25 mm      25 mm
                       Spandrel    Spandrel     Metal       Metal       25 mm      25 mm     Wall Panel, Wall Panel,  Stone,     Stone,
                         Glass,      Glass,   Wall Panel, Wall Panel,   Stone,      Stone,   Sheathing,  Sheathing, Sheathing, Sheathing,
                         R-1.8       R-3.5       R-1.8      R-3.5       R-1.8       R-3.5       R-.9       R-3.9      R-1.9       R-3.9
                       Insulation  Insulation Insulation  Insulation  Insulation  Insulation    Batt        Batt       Batt       Batt
                        Board,      Board,      Board,      Board,      Board,     Board,    Insulation, Insulation, Insulation, Insulation,
                      Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. BoardGyp. BoardGyp. BoardGyp. Board
        Wall Number        1           2           3          4           5           6           7          8          9          10
         U, W/(m^2·K)    0.430       0.245       0.431      0.246       0.429       0.245       0.418      0.231      0.416       0.230
              Total R     2.33        4.08       2.32        4.07        2.33        4.08       2.39        4.34       2.40       4.35
                Hour                       Conduction Time Factors, %                                Conduction Time Factors, %
                    0      18.0         3.4        25.0        5.4         8.3         1.4       19.3         5.6        6.5         1.6
                    1      57.1        35.9       56.1        40.9        44.0        22.3       57.5        45.0       41.1       24.9
                    2      19.8        36.8       15.2        33.8        31.2        35.9       18.7        34.4       32.7       37.3
                    3       4.0        15.9         3.0       13.4        11.6        23.2        3.7        11.1       13.3       21.9
                    4       0.8         5.5         0.6        4.5         3.5        10.7        0.7         2.9        4.5         9.2
                    5       0.2         1.8         0.1        1.4         1.0         4.2        0.1         0.7        1.4         3.4
                    6       0.0         0.6         0.0        0.4         0.3         1.5        0.0         0.2        0.4         1.2
                    7       0.0         0.2         0.0        0.1         0.1         0.5        0.0         0.0        0.1         0.4
                    8       0.0         0.1         0.0        0.0         0.0         0.2        0.0         0.0        0.0         0.1
                    9       0.0         0.0         0.0        0.0         0.0         0.1        0.0         0.0        0.0         0.0
                   10       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   11       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   12       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   13       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   14       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   15       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   16       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   17       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   18       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   19       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   20       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   21       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   22       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
                   23       0.0         0.0         0.0        0.0         0.0         0.0        0.0         0.0        0.0         0.0
      Total Percentage     100         100         100         100         100        100         100        100         100        100
        Layer ID from      F01         F01         F01         F01        F01         F01         F01        F01        F01         F01
    outdoors to indoors    F09         F09         F08         F08        F10         F10         F08        F08        F10         F10
        (See Table 18)
                           F04         F04         F04         F04        F04         F04        G03         G03        G03        G03
                            I02         I02        I02         I02         I02         I02        I04         I04        I04        I04
                           F04          I02        F04         I02        F04          I02       G01          I04       G01         I04
                           G01         F04         G01         F04         I02        F04         F02        G01        F02         G01
                           F02         G01         F02        G01         F02         G01           0        F02           0        F02
                              0        F02           0         F02           0        F02           0          0           0          0
                              0          0           0           0           0           0          0          0           0          0
                              0          0           0           0           0           0          0          0           0          0
```

Heat balance procedures calculate the radiant exchange between surfaces based on their surface temperatures and emissivities, but they typically rely on estimated “radiative/convective splits” to determine the contribution of internal loads, including people, lighting, appliances, and equipment, to the radiant exchange. RTS further simplifies the HB procedure by also relying on an estimated radiative/convective split of wall and roof conductive heat gain instead of simultaneously solving for the instantaneous convective and radiative heat transfer from each surface, as in the HB procedure.

Thus, the cooling load for each load component (lights, people, walls, roofs, windows, appliances, etc.) for a particular hour is the sum of the convective portion of the heat gain for that hour plus the time-delayed portion of radiant heat gains for that hour and the previous 23 h. Table 14 contains recommendations for splitting each of the heat gain components into convective and radiant portions.

RTS converts the radiant portion of hourly heat gains to hourly cooling loads using radiant time factors, the coefficients of the radiant time series. Radiant time factors are used to calculate the cooling load for the current hour on the basis of current and past heat gains. The radiant time series for a particular zone gives the time-dependent response of the zone to a single pulse of radiant energy. The series shows the portion of the radiant pulse that is convected to zone air for each hour. Thus, r<sub>0</sub> represents the fraction of the radiant pulse convected to the zone air in the current hour r<sub>1</sub> in the previous hour, and so on. The radiant time series thus generated is used to convert the radiant portion of hourly heat gains to hourly cooling loads according to the following equation:

<!-- str. 502 -->

**Table 16 Wall Conduction Time Series (CTS) (Continued)**

```text
                                        Studwalls                                                   EIFS
                         Wood       Wood
                        Siding,     Siding,    25 mm       25 mm                           EIFS, R-0.9 EIFS, R-0.9 EIFS, R0.9 EIFS, R-1.8
                       Sheathing, Sheathing,   Stucco,     Stucco,     EIFS,      EIFS,     Insulation  Insulation Insulation  Insulation
                         R-1.9       R-3.9    Sheathing, Sheathing,    R-0.9      R-1.8      Board,      Board,      Board,      Board,
                          Batt       Batt       R-1.9       R-3.9    Insulation Insulation  Sheathing, Sheathing,  Sheathing,  Sheathing,
                       Insulation, Insulation,   Batt       Batt      Board,      Board,    R-1.9 Batt  R-3.9 Batt  200 mm      200 mm
                       12.5 mm     12.5 mm    Insulation, Insulation, Sheathing, Sheathing, Insulation, Insulation, LW CMU,    LW CMU,
                         Wood       Wood     Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. Board Gyp. Board
        Wall Number       11          12         13          14         15          16          17         18          19          20
         U, W/(m^2·K)    0.402       0.226      0.412       0.229      0.670       0.422      0.305       0.191       0.526       0.360
              Total R     2.49       4.43        2.43       4.37        1.49       2.37        3.28        5.23       1.90        2.78
                Hour           Conduction Time Factors, %                                Conduction Time Factors, %
                    0       6.4        1.5         5.7        1.3        11.9        6.0         2.6         0.5        1.0         1.3
                    1      40.7       24.3        40.4       23.8        48.8       40.7        25.2        11.9        2.0         1.8
                    2      32.4       36.3        33.6       37.6        26.3       31.6        30.7        25.9        5.8         4.5
                    3      13.5       21.9        13.7       22.5         8.8       13.2        19.5        22.9        8.7         7.3
                    4       4.7        9.8         4.6        9.6         2.8        5.1        10.6        15.4        9.3         8.3
                    5       1.6        3.9         1.4        3.5         0.9        2.0         5.5         9.5        8.9         8.2
                    6       0.5        1.5         0.4        1.2         0.3        0.8         2.9         5.7        8.1         7.7
                    7       0.2        0.5         0.1        0.4         0.1        0.3         1.5         3.4        7.2         7.0
                    8       0.0        0.2         0.0        0.1         0.0        0.1         0.8         2.0        6.5         6.4
                    9       0.0        0.1         0.0        0.0         0.0        0.0         0.4         1.2        5.7         5.8
                   10       0.0        0.0         0.0        0.0         0.0        0.0         0.2         0.7        5.1         5.3
                   11       0.0        0.0         0.0        0.0         0.0        0.0         0.1         0.4        4.5         4.8
                   12       0.0        0.0         0.0        0.0         0.0        0.0         0.1         0.2        4.0         4.3
                   13       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.1        3.6         3.9
                   14       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.1        3.2         3.5
                   15       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.1        2.8         3.2
                   16       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        2.5         2.9
                   17       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        2.2         2.6
                   18       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        2.0         2.4
                   19       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        1.8         2.1
                   20       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        1.6         1.9
                   21       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        1.4         1.8
                   22       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        1.2         1.6
                   23       0.0        0.0         0.0        0.0         0.0        0.0         0.0         0.0        1.1         1.4
      Total Percentage     100         100        100         100        100         100        100         100         100        100
        Layer ID from      F01         F01        F01         F01        F01        F01         F01         F01        F01         F01
    outdoors to indoors    F11         F11        F07         F07        F06        F06         F06         F06        F06         F06
        (See Table 18)
                           G02        G02         G03        G03          I01        I01         I01         I01        I01         I01
                            I04        I04         I04        I04        G03         I01        G03         G03        G03          I01
                           G01         I04        G01         I04        F04        G03          I04         I04       M03         G03
                           F02        G01         F02        G01         G01        F04         G01          I04       F04        M03
                             0         F02          0         F02        F02        G01         F02         G01        G01         F04
                             0           0          0           0          0         F02           0        F02        F02         G01
                             0           0          0           0          0           0           0          0           0        F02
                             0           0          0           0          0           0           0          0           0           0
```

- Q<sub>r,θ</sub> = r<sub>0</sub>q<sub>r,θ</sub> + r<sub>1</sub>q<sub>r,θ–1</sub> + r<sub>2</sub>q<sub>r,θ–2</sub> + r<sub>3</sub>q<sub>r,θ–3</sub> …

> + + r<sub>23</sub>q<sub>r,θ–23</sub>&emsp;**(33)**

where

Q<sub>r,θ</sub> = radiant cooling load Q<sub>r</sub> for current hour θ, W q<sub>r,θ</sub> = radiant heat gain for current hour, W q<sub>r,θ−n</sub> = radiant heat gain n hours ago, W r<sub>0</sub>, r<sub>1</sub>, etc. = radiant time factors

The radiant cooling load for the current hour, which is calculated using RTS and Equation (33), is added to the convective portion to determine the total cooling load for that component for that hour.

Radiant time factors are generated by a heat-balance-based procedure. A separate series of radiant time factors is theoretically required for each unique zone and for each unique radiant energy distribution function assumption. For most common design applications, RTS variation depends primarily on the overall massiveness of the construction and the thermal responsiveness of the surfaces the radiant heat gains strike.

<!-- str. 503 -->

**Table 16 Wall Conduction Time Series (CTS) (Continued)**

|   | Brick, R-0.9 Insulation Board, Sheathing, Gyp. Board | Brick, R-1.8 Insulation Board, Sheathing, Gyp. Board | Brick, Sheathing, R-1.9 Batt Insulation, Gyp. Board | Brick, Sheathing, R-3.9 Batt Insulation, Gyp. Board | Brick Walls Brick, R-0.9 Insulation Board, Sheathing, R-1.9 Batt Insulation, Gyp. Board | Brick, R-0.9 Insulation Board, Sheathing, R-3.9 Batt Insulation, Gyp. Board | Brick, R-0.9 Insulation Board, 200 mm LW CMU | Brick, R-1.8 Insulation Board, 200 mm LW CMU | Brick, 200 mm LW CMU, R-1.9 Batt Insulation, Gyp. Board |
|---|---|---|---|---|---|---|---|---|---|
| Wall Number | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 |
| U, W/(m<sup>2</sup>·K) | 0.573 | 0.381 | 0.376 | 0.217 | 0.283 | 0.157 | 0.583 | 0.386 | 0.347 |
| Total R | 1.75 | 2.62 | 2.66 | 4.60 | 3.54 | 6.36 | 1.75 | 2.59 | 2.88 |
| Hour |  |  |  | Conduction Time Factors, % |  |  |  |  |  |
| 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 | 0.2 4.8 13.9 16.7 14.9 12.0 9.2 7.0 5.3 4.0 3.0 2.3 1.7 1.3 1.0 0.7 0.5 0.4 0.3 0.2 0.2 0.1 0.1 0.1 | 0.1 3.0 11.1 15.5 15.0 12.7 10.1 7.8 6.0 4.6 3.5 2.6 2.0 1.5 1.1 0.9 0.7 0.5 0.4 0.3 0.2 0.2 0.1 0.1 | 0.2 4.1 13.3 16.6 14.8 11.8 9.2 7.1 5.4 4.2 3.2 2.4 1.9 1.4 1.1 0.8 0.6 0.5 0.4 0.3 0.2 0.2 0.1 0.1 | 0.1 1.6 8.5 14.5 15.2 13.1 10.6 8.3 6.5 5.0 3.9 3.0 2.3 1.8 1.4 1.1 0.8 0.6 0.5 0.4 0.3 0.2 0.2 0.1 | 0.1 1.5 6.8 11.7 13.3 12.7 11.1 9.2 7.5 5.9 4.7 3.6 2.8 2.2 1.7 1.3 1.0 0.8 0.6 0.5 0.4 0.3 0.2 0.2 | 0.4 0.5 2.0 5.3 8.2 9.7 10.1 9.6 8.8 7.8 6.8 5.8 4.9 4.1 3.4 2.8 2.3 1.9 1.5 1.2 1.0 0.8 0.6 0.5 | 0.6 0.8 2.6 5.5 7.6 8.7 9.0 8.7 8.2 7.4 6.6 5.8 5.0 4.3 3.7 3.1 2.6 2.2 1.9 1.6 1.3 1.1 0.9 0.7 | 0.8 0.8 2.1 4.5 6.6 7.9 8.4 8.4 8.0 7.4 6.7 6.0 5.3 4.7 4.1 3.5 3.0 2.6 2.2 1.9 1.6 1.4 1.1 1.0 | 1.6 1.5 1.9 3.3 5.0 6.2 6.9 7.1 7.0 6.7 6.3 5.9 5.4 5.0 4.5 4.1 3.7 3.4 3.0 2.7 2.5 2.2 2.0 1.8 |
| Total Percentage | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Layer ID from outdoors to indoors<br>(See Table 18) | F01<br>M01<br>F04<br>I01<br>G03<br>F04<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>G03<br>F04<br>G01<br>F02 0 | F01<br>M01<br>F04<br>G03<br>I04<br>G01<br>F02 0 0 0 | F01<br>M01<br>F04<br>G03<br>I04<br>I04<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>G03<br>I04<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>G03<br>I04<br>I04<br>G01<br>F02 | F01<br>M01<br>F04<br>I01<br>M03<br>F02 0 0 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>M03<br>F02 0 0 0 | F01<br>M01<br>F04<br>M03<br>I04<br>G01<br>F02 0 0 0 |

One goal in developing RTS was to provide a simplified method based directly on the HB method; thus, it was deemed desirable to generate RTS coefficients directly from a heat balance. A heat balance computer program was developed to do this: Hbfort, which is included as part of *Cooling and Heating Load Calculation Prin-* ciples (Pedersen et al. 1998). The RTS procedure is described by Spitler et al. (1997). The procedure for generating RTS coefficients may be thought of as analogous to the custom weighting factor generation procedure used by DOE 2.1 (Kerrisk et al. 1981; Sowell 1988a, 1988b). In both cases, a zone model is pulsed with a heat gain. With DOE 2.1, the resulting loads are used to estimate the best values of the transfer function method weighting factors to most closely match the load profile. In the procedure described here, a unit periodic heat gain pulse is used to generate loads for a 24 h period. As long as the heat gain pulse is a unit pulse, the resulting loads are equivalent to the RTS coefficients.

Two different radiant time series are used: **solar**, for direct transmitted solar heat gain (radiant energy assumed to be distributed to the floor and furnishings only) and **nonsolar**, for all other types of heat gains (radiant energy assumed to be uniformly distributed on all internal surfaces). Nonsolar RTS apply to radiant heat gains from people, lights, appliances, walls, roofs, and floors. Also, for diffuse solar heat gain and direct solar heat gain from fenestration with indoor shading (blinds, drapes, etc.), the nonsolar RTS should be used. Radiation from those sources is assumed to be more uniformly distributed onto all room surfaces. Effect of beam solar radiation distribution assumptions is addressed by Hittle (1999).

<!-- str. 504 -->

**Table 16 Wall Conduction Time Series (CTS) (Continued)**

|   | Brick, 200 mm LW CMU, R-3.9 Batt Insulation, Gyp. Board | Brick, R-0.9 Insulation Board, 200 mm HW CMU, Gyp. Board | Brick, R-1.8 Insulation Board, 200 mm HW CMU, Gyp. Board | Brick, R-0.9 Insulation Board, Brick | Brick Walls Brick, R-1.8 Insulation Board, Brick | Brick, R-0.9 Insulation Board, 200 mm LW Concrete, Gyp. Board | Brick, R-1.8 Insulation Board, 200 mm LW Concrete, Gyp. Board | Brick, R-0.9 Insulation Board, 300 mm HW Concrete, Gyp. Board | Brick, R-1.8 Insulation Board, 300 mm HW Concrete, Gyp. Board |
|---|---|---|---|---|---|---|---|---|---|
| Wall Number | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 |
| U, W/(m<sup>2</sup>·K) | 0.207 | 0.630 | 0.406 | 0.704 | 0.436 | 0.515 | 0.355 | 0.549 | 0.355 |
| Total R | 4.83 | 1.59 | 2.46 | 1.42 | 2.30 | 1.94 | 2.82 | 1.82 | 2.82 |
| Hour |  |  |  | Conduction Time Factors, % |  |  |  |  |  |
| 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 | 1.9 1.8 1.8 2.7 4.0 5.4 6.2 6.7 6.8 6.6 6.4 6.0 5.6 5.2 4.8 4.4 4.0 3.7 3.4 3.1 2.8 2.5 2.3 2.1 | 1.8 1.7 2.4 3.8 5.1 6.0 6.5 6.6 6.6 6.4 6.1 5.7 5.3 4.9 4.6 4.2 3.8 3.5 3.2 2.9 2.6 2.4 2.1 1.9 | 2.0 1.9 2.3 3.4 4.6 5.5 6.1 6.3 6.3 6.2 6.0 5.7 5.4 5.0 4.7 4.3 4.0 3.7 3.4 3.1 2.9 2.6 2.4 2.2 | 0.9 1.3 3.3 5.8 7.3 8.0 8.2 7.9 7.5 6.9 6.2 5.6 5.0 4.4 3.8 3.3 2.9 2.5 2.2 1.9 1.6 1.4 1.2 1.0 | 1.0 1.2 2.8 5.0 6.6 7.5 7.8 7.7 7.4 6.9 6.4 5.8 5.2 4.6 4.1 3.6 3.2 2.8 2.4 2.1 1.8 1.6 1.4 1.2 | 3.3 3.1 3.0 3.1 3.4 3.8 4.2 4.6 4.8 5.0 5.1 5.1 5.1 5.0 4.9 4.7 4.6 4.4 4.2 4.1 3.9 3.7 3.6 3.4 | 3.4 3.3 3.2 3.2 3.4 3.7 4.1 4.4 4.6 4.8 4.9 5.0 4.9 4.9 4.8 4.7 4.6 4.4 4.3 4.1 4.0 3.9 3.7 3.6 | 3.8 3.8 3.7 3.7 3.8 3.9 4.1 4.2 4.3 4.4 4.5 4.5 4.6 4.6 4.5 4.5 4.3 4.3 4.2 4.2 4.1 4.0 4.0 3.9 | 3.9 3.8 3.8 3.8 3.8 3.9 4.0 4.2 4.3 4.4 4.5 4.5 4.5 4.5 4.5 4.5 4.3 4.3 4.2 4.2 4.1 4.1 4.0 3.9 |
| Total Percentage | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Layer ID from outdoors to indoors<br>(See Table 18) | F01<br>M01<br>F04<br>M03<br>I04<br>I04<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>M05<br>G01<br>F02 0 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>M05<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>M01<br>F02 0 0 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>M01<br>F02 0 0 0 | F01<br>M01<br>F04<br>I01<br>M13<br>F04<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>M13<br>F04<br>G01<br>F02 0 | F01<br>M01<br>F04<br>I01<br>M16<br>F04<br>G01<br>F02 0 0 | F01<br>M01<br>F04<br>I01<br>I01<br>M16<br>F04<br>G01<br>F02 0 |

Representative solar and nonsolar RTS data for light, medium, and heavyweight constructions are provided in Tables 19 and 20. Those were calculated using the Hbfort computer program (Pedersen et al. 1998) with zone characteristics listed in Table 21. Customized RTS values may be calculated using the HB method where the zone is not reasonably similar to these typical zones or where more precision is desired.

ASHRAE research project RP-942 compared HB and RTS results over a wide range of zone types and input variables (Rees et al. 2000; Spitler et al. 1998). In general, total cooling loads calculated using RTS closely agreed with or were slightly higher than those of the HB method with the same inputs. The project examined more than 5000 test cases of varying zone parameters. The dominating variable was overall thermal mass, and results were grouped into lightweight, U.S. medium-weight, U.K. medium-weight, and heavyweight construction. Best agreement between RTS and HB results was obtained for light- and medium-weight construction. Greater differences occurred in heavyweight cases, with RTS generally predicting slightly higher peak cooling loads than HB. Greater differences also were observed in zones with extremely high internal radiant loads and large glazing areas or with a very lightweight exterior envelope. In this case, heat balance calculations predict that some of the internal radiant load will be transmitted to the outdoor environment and never becomes cooling load in the space. RTS does not account for energy transfer out of the space to the environment, and thus predicted higher cooling loads.

<!-- str. 505 -->

**Table 16 Wall Conduction Time Series (CTS) (Continued)**

```text
                             Brick Walls                                           Concrete Block Walls
                         Brick,        Brick,                               200 mm       200 mm       25 mm        25 mm
                         200 mm       200 mm                               LW CMU       LW CMU        Stucco,      Stucco,
                          HW            HW         200 mm       200 mm        w/Fill      w/Fill      200 mm       200 mm
                        Concrete,    Concrete,    LW CMU,     LW CMU,      Insulation,  Insulation,  HW CMU,     HW CMU,
                          R-1.9        R-3.9        R-1.9        R-3.9        R-1.9       R-3.9        R-1.9        R-3.9      200 mm
                          Batt          Batt         Batt        Batt         Batt         Batt         Batt        Batt      LW CMU
                       Insulation,   Insulation,  Insulation, Insulation,  Insulation,  Insulation,  Insulation, Insulation,    w/Fill
                       Gyp. Board   Gyp. Board   Gyp. Board   Gyp. Board   Gyp. Board  Gyp. Board   Gyp. Board   Gyp. Board   Insulation
        Wall Number        39            40           41          42           43           44           45          46           47
         U, W/(m^2·K)     0.383        0.217        0.382        0.219        0.335       0.203        0.412        0.229        1.058
              Total R     2.61          4.60         2.62         4.56        2.99         4.93         2.42        4.37         0.95
                Hour   Conduction Time Factors, %                              Conduction Time Factors, %
                    0       3.4           3.5         0.2          0.2          0.6          0.8         0.5          0.5          0.7
                    1       3.3           3.4         4.6          1.9          1.6          1.0         2.3          1.2         10.4
                    2       3.3           3.3        13.3          8.8          5.7          3.4         8.0          5.1         20.6
                    3       3.6           3.5        15.8         13.9          9.5          7.1        11.6          9.6         19.5
                    4       4.0           3.8        14.0         14.1         10.8          9.4        11.7         11.3         14.8
                    5       4.4           4.2        11.4         12.3         10.3          9.8        10.5         10.8         10.5
                    6       4.7           4.5         9.0         10.0          9.3          9.3         9.1          9.6          7.3
                    7       4.8           4.7         7.0          8.1          8.1          8.3         7.7          8.3          5.0
                    8       4.9           4.8         5.5          6.4          7.0          7.4         6.5          7.1          3.5
                    9       4.9           4.9         4.3          5.1          6.0          6.5         5.5          6.0          2.4
                   10       4.9           4.9         3.4          4.1          5.1          5.6         4.6          5.1          1.6
                   11       4.8           4.8         2.6          3.2          4.4          4.9         3.9          4.3          1.1
                   12       4.7           4.7         2.0          2.6          3.7          4.3         3.3          3.7          0.8
                   13       4.6           4.6         1.6          2.1          3.2          3.7         2.8          3.1          0.5
                   14       4.5           4.5         1.3          1.6          2.7          3.2         2.3          2.7          0.4
                   15       4.4           4.4         1.0          1.3          2.3          2.8         2.0          2.3          0.2
                   16       4.2           4.3         0.8          1.0          2.0          2.4         1.6          1.9          0.2
                   17       4.1           4.2         0.6          0.8          1.7          2.1         1.4          1.6          0.1
                   18       4.0           4.1         0.5          0.7          1.5          1.8         1.2          1.4          0.1
                   19       3.9           4.0         0.4          0.5          1.2          1.6         1.0          1.2          0.1
                   20       3.8           3.9         0.3          0.4          1.1          1.4         0.8          1.0          0.0
                   21       3.7           3.8         0.2          0.3          0.9          1.2         0.7          0.8          0.0
                   22       3.6           3.7         0.2          0.3          0.8          1.1         0.6          0.7          0.0
                   23       3.5           3.6         0.1          0.2          0.7          0.9         0.5          0.6          0.0
      Total Percentage      100          100          100          100         100          100          100          100         100
        Layer ID from       F01          F01          F01         F01          F01          F01          F01         F01          F01
   outdoors to indoors     M01          M01          M03          M03         M08          M08           F07         F07         M08
        (See Table 18)
                            F04          F04          I04          I04          I04         I04         M05          M05          F02
                           M15          M15          G01           I04         G01          I04          I04          I04           0
                            I04           I04         F02         G01          F02          G01         G01           I04           0
                           G01            I04           0         F02             0         F02          F02         G01            0
                            F02          G01            0            0            0           0            0         F02            0
                              0          F02            0            0            0           0            0            0           0
                              0            0            0            0            0           0            0            0           0
                              0            0            0            0            0           0            0            0           0
```

ASHRAE research project RP-1117 built two model rooms for which cooling loads were physically measured using extensive instrumentation. The results agreed with previous simulations (Chantrasrisalai et al. 2003; Eldridge et al. 2003; Iu et al. 2003). HB calculations closely approximated measured cooling loads when provided with detailed data for the test rooms. RTS overpredicted measured cooling loads in tests with large, clear, single-glazed window areas with bare concrete floor and no furnishings or internal loads. Tests under more typical conditions (venetian blinds, carpeted floor, office-type furnishings, and normal internal loads) provided good agreement between HB, RTS, and measured loads.

## 7. HEATING LOAD CALCULATIONS

Techniques for estimating design heating load for commercial, institutional, and industrial applications are essentially the same as for those estimating design cooling loads for such uses, with the following exceptions:

- Temperatures outdoor conditioned spaces are generally lower than maintained space temperatures.
- Credit for solar or internal heat gains is not included
- Thermal storage effect of building structure or content is ignored.

<!-- str. 506 -->

**Table 16 Wall Conduction Time Series (CTS) (Continued)**

```text
                       Concrete Block Walls                               Precast and Cast-In-Place Block Walls
                                                100 mm     100 mm      100 mm     100 mm      100 mm      100 mm
                                                 LW          LW          LW         LW          LW          LW        EIFS,       EIFS,
                       200 mm      300 mm      Concrete.  Concrete.   Concrete.   Concrete.  Concrete.   Concrete.     R-0.9      R-1.8
                      LW CMU      LW CMU         R-0.9      R-1.8       R-1.9       R-3.9      R-1.8       R-3.5    Insulation  Insulation
                        w/Fill       w/Fill     Board       Board        Batt       Batt       Board       Board      Board,      Board,
                      Insulation, Insulation, Insulation, Insulation, Insulation, Insulation, Insulation, Insulation, 200 mm LW 200 mm LW
                         Gyp.        Gyp.        Gyp.        Gyp.       Gyp.        Gyp.    100 mm LW 100 mm LW      Concrete,  Concrete,
                        Board       Board       Board       Board       Board      Board      Concrete   Concrete   Gyp. Board Gyp. Board
       Wall Number        48          49          50          51         52          53          54         55          56          57
        U, W/(m^2·K)    0.835        0.688       0.675      0.424       0.417       0.230      0.435       0.247       0.652      0.412
             Total R     1.20        1.45        1.48        2.36        2.40       4.34        2.30        4.05       1.53        2.41
               Hour Conduction Time Factors, %                                  Conduction Time Factors, %
                   0      0.2          1.0        0.7         0.3         0.4        0.1         0.7         0.9        2.2         2.4
                   1      3.6          1.1       10.4         7.1         8.4        3.8         0.9         0.8        2.2         2.4
                   2     11.8          2.6       19.7        17.4        18.2       13.6         2.8         1.6        3.2         3.1
                   3     15.5          5.0       18.1        18.1        17.9       17.5         5.6         3.7        4.6         4.2
                   4     14.6          7.1       13.9        14.6        14.2       15.6         7.7         5.9        5.7         5.2
                   5     12.2          8.3       10.2        11.1        10.7       12.3         8.7         7.4        6.2         5.7
                   6      9.7          8.5        7.4         8.2         7.9        9.4         8.9         8.2        6.3         5.9
                   7      7.5          8.3        5.4         6.1         5.9        7.0         8.6         8.3        6.2         5.9
                   8      5.8          7.7        3.9         4.5         4.3        5.3         8.0         8.1        6.0         5.8
                   9      4.5          7.0        2.8         3.3         3.2        3.9         7.3         7.6        5.7         5.6
                  10      3.5          6.3        2.1         2.5         2.4        3.0         6.5         6.9        5.4         5.3
                  11      2.7          5.6        1.5         1.8         1.7        2.2         5.7         6.3        5.1         5.1
                  12      2.0          4.9        1.1         1.3         1.3        1.6         5.0         5.6        4.8         4.8
                  13      1.6          4.3        0.8         1.0         0.9        1.2         4.3         4.9        4.5         4.6
                  14      1.2          3.8        0.6         0.7         0.7        0.9         3.7         4.3        4.2         4.3
                  15      0.9          3.3        0.4         0.5         0.5        0.7         3.2         3.7        3.9         4.1
                  16      0.7          2.9        0.3         0.4         0.4        0.5         2.7         3.2        3.7         3.9
                  17      0.6          2.5        0.2         0.3         0.3        0.4         2.3         2.8        3.5         3.6
                  18      0.4          2.2        0.2         0.2         0.2        0.3         1.9         2.4        3.2         3.4
                  19      0.3          1.9        0.1         0.2         0.2        0.2         1.6         2.0        3.0         3.3
                  20      0.3          1.7        0.1         0.1         0.1        0.2         1.4         1.7        2.8         3.1
                  21      0.2          1.5        0.1         0.1         0.1        0.1         1.1         1.5        2.6         2.9
                  22      0.1          1.3        0.0         0.1         0.1        0.1         0.9         1.2        2.5         2.7
                  23      0.1          1.1        0.0         0.0         0.0        0.1         0.8         1.0        2.3         2.6
     Total Percentage     100         100         100         100        100         100        100         100         100        100
       Layer ID from      F01         F01         F01        F01         F01         F01        F01         F01         F01        F01
  outdoors to indoors    M08         M09         M11         M11        M11         M11         M11        M11          F06        F06
       (See Table 18)
                          F04         F04         I01         I01         I04        I04         I02        I02         I01         I01
                         G01          G01         F04         I01        G01         I04        M11         I02        M13          I01
                          F02         F02        G01         F04         F02        G01         F02        M11         G01         M13
                            0           0         F02        G01           0         F02           0        F02         F02        G01
                            0           0           0        F02           0           0           0          0           0        F02
                            0           0           0           0          0           0           0          0           0           0
                            0           0           0           0          0           0           0          0           0           0
                            0           0           0           0          0           0           0          0           0           0
```

Thermal bridging effects on wall and roof conduction are greater for heating loads than for cooling loads, and greater care must be taken to account for bridging effects on U-factors used in heating load calculations.

Heat losses (negative heat gains) are thus considered to be instantaneous, heat transfer essentially conductive, and latent heat treated only as a function of replacing space humidity lost to the exterior environment.

This simplified approach is justified because it evaluates worst-case conditions that can reasonably occur during a heating season. Therefore, the near-worst-case load is based on the following:

- Design interior and exterior conditions
- Including infiltration and/or ventilation
- No solar effect (at night or on cloudy winter days)
- Before the periodic presence of people, lights, and appliances has an offsetting effect

Typical commercial and retail spaces have nighttime unoccupied periods at a setback temperature where little to no ventilation is required, building lights and equipment are off, and heat loss is primarily through conduction and infiltration. Before being occupied, buildings are warmed to the occupied temperature (see the following discussion). During occupied time, building lights, equipment, and people cooling loads can offset conduction heat loss, although some perimeter heat may be required, leaving infiltration and ventilation as the primary heating loads. Ventilation heat load may be offset with heat recovery equipment. These loads (conduction loss, warm-up load, and ventilation load) may not be additive when sizing building heating equipment, and it is prudent to analyze each load and their interactions to arrive at final equipment sizing for heating.

<!-- str. 507 -->

**Table 16 Wall Conduction Time Series (CTS) (Concluded)**

```text
                                                              Precast and Cast-In-Place Block Walls
                                                     EIFS        EIFS
                          200 mm       200 mm       Finish,      Finish,     200 mm       200 mm      300 mm       300 mm
                            LW          LW           R-1.8       R-3.5         HW          HW           HW           HW
                         Concrete.    Concrete.   Insulation   Insulation   Concrete,    Concrete,    Concrete,   Concrete,
                           R-11         R-22        Board,       Board,       R-11         R-22         R-3.3       R-6.7
                            Batt        Batt     200 mm HW 200 mm HW           Batt        Batt         Batt         Batt       300 mm
                        Insulation,  Insulation,   Concrete,   Concrete,    Insulation, Insulation,  Insulation,  Insulation,     HW
                        Gyp. Board   Gyp. Board   Gyp. Board  Gyp. Board   Gyp. Board   Gyp. Board   Gyp. Board  Gyp. Board    Concrete
         Wall Number        58           59           60           61           62          63           64           65           66
          U, W/(m^2·K)     0.068        0.039        0.082       0.045        0.076        0.041        0.047       0.025        0.549
               Total R      14.7        25.7         12.1         22.1         13.1        24.2         21.4         40.5         1.8
                 Hour                                               Conduction Time Factors, %
                     0       1.4          1.6          2.8          2.9         1.1          1.2          2.5          2.7         1.2
                     1       1.6          1.6          3.0          2.9         2.1          1.5          2.4          2.6         1.9
                     2       3.2          2.4          4.2          3.5         5.5          3.8          2.7          2.5         4.3
                     3       5.6          4.3          5.2          4.5         8.2          6.9          3.6          2.8         6.6
                     4       7.2          6.2          5.6          5.2         8.9          8.4          4.7          3.5         7.8
                     5       7.7          7.2          5.6          5.5         8.6          8.6          5.5          4.3         8.1
                     6       7.7          7.4          5.5          5.5         7.9          8.1          5.9          5.1         7.9
                     7       7.3          7.3          5.3          5.4         7.1          7.4          6.0          5.5         7.4
                     8       6.8          6.9          5.2          5.2         6.4          6.7          5.9          5.8         6.8
                     9       6.2          6.4          5.0          5.0         5.7          6.1          5.7          5.8         6.2
                    10       5.6          5.9          4.8          4.9         5.1          5.4          5.5          5.7         5.6
                    11       5.1          5.4          4.6          4.7         4.6          4.9          5.2          5.5         5.0
                    12       4.7          4.9          4.4          4.5         4.1          4.4          5.0          5.3         4.5
                    13       4.2          4.5          4.3          4.4         3.7          3.9          4.7          5.1         4.0
                    14       3.8          4.1          4.1          4.2         3.3          3.5          4.4          4.8         3.6
                    15       3.5          3.7          3.9          4.1         2.9          3.2          4.2          4.6         3.2
                    16       3.2          3.4          3.8          3.9         2.6          2.8          4.0          4.3         2.9
                    17       2.9          3.1          3.6          3.8         2.3          2.5          3.7          4.1         2.6
                    18       2.6          2.8          3.5          3.6         2.1          2.3          3.5          3.9         2.3
                    19       2.4          2.6          3.4          3.5         1.9          2.0          3.3          3.6         2.0
                    20       2.1          2.4          3.2          3.4         1.7          1.8          3.1          3.4         1.8
                    21       1.9          2.2          3.1          3.3         1.5          1.6          3.0          3.2         1.6
                    22       1.8          2.0          3.0          3.1         1.3          1.5          2.8          3.1         1.5
                    23       1.6          1.8          2.9          3.0         1.2          1.3          2.6          2.9         1.3
       Total Percentage      100         100          100          100          100          100         100          100          100
         Layer ID from       F01         F01          F01          F01          F01         F01          F01          F01          F01
     outdoors to indoors    M13          M13          F06          F06         M15          M15         M16          M16          M16
         (See Table 18)
                             I04          I04          I02         I02          I04          I04          I05          I05         F02
                            G01           I04        M15           I02         G01           I04         G01           I05           0
                             F02         G01          G01         M15           F02         G01          F02          G01            0
                               0         F02          F02          G01            0         F02             0         F02            0
                               0            0           0          F02            0            0            0           0            0
                               0            0           0            0            0            0            0           0            0
                               0            0           0            0            0            0            0           0            0
                               0            0           0            0            0            0            0           0            0
```

## 7.1 HEAT LOSS CALCULATIONS

The general procedure for calculation of design heat losses of a structure is as follows:

1. Select outdoor design conditions: temperature, humidity, and wind direction and speed.

2. Select indoor design conditions to be maintained.

3. Estimate temperature in any adjacent unheated spaces.

4. Select transmission coefficients and compute heat losses for walls, floors, ceilings, windows, doors, and foundation elements.

5. Compute heat load through infiltration and any other outdoor air introduced directly to the space.

6. Sum the losses caused by transmission and infiltration.

### Outdoor Design Conditions

The ideal heating system provides enough heat to match the structure’s heat loss. However, weather conditions vary considerably from year to year, and heating systems designed for the worst weather conditions on record would have a great excess of capacity most of the time. A system’s failure to maintain design conditions during brief periods of severe weather usually is not critical. However, close regulation of indoor temperature may be critical for some occupancies or industrial processes. Design temperature data and discussion of their application are given in Chapter 14. Generally, the 99% temperature values given in the tabulated weather data are used. However, caution is needed, and local conditions should always be investigated. In some locations, outdoor temperatures are commonly much lower and wind velocities higher than those given in the tabulated weather data.

<!-- str. 508 -->

**Table 17 Roof Conduction Time Series (CTS)**

|   | Metal Roof, R-3.3 Batt Insulation, Gyp. Board | Metal Roof, R-6.7 Batt Insulation, Gyp. Board | Metal Roof, R-3.3 Batt Insulation, Suspended Acoustical Ceiling | Sloped Frame Roofs<br>Metal Roof, R-6.7 Batt Insulation, Suspended Acoustical Ceiling | Sloped Frame Roofs<br>Metal Roof, R-3.3 Batt Insulation | Sloped Frame Roofs<br>Metal Roof, R-6.7 Batt Insulation | Asphalt Shingles, Wood Sheathing, R-3.3 Batt Insulation, Gyp. Board | Asphalt Shingles, Wood Sheathing, R-6.7 Batt Insulation, Gyp. Board | Slate or Tile, Wood Sheathing, R-3.3 Batt Insulation, Gyp. Board |
|---|---|---|---|---|---|---|---|---|---|
| Roof Number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| U, W/(m<sup>2</sup>·K) | 0.2485 | 0.1355 | 0.2265 | 0.1287 | 0.2547 | 0.0242 | 0.2348 | 0.1313 | 0.2388 |
| Total R | 4.02 | 7.38 | 4.42 | 7.77 | 3.93 | 41.35 | 4.26 | 7.62 | 4.19 |
| Hour |  |  |  | Conduction Time Factors, % |  |  |  |  |  |
| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 | 6.4 44.2 32.7 11.6 3.6 1.1 0.3 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 0.3 10.9 28.5 25.9 16.2 8.9 4.6 2.3 1.2 0.6 0.3 0.1 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 10.1 55.6 27.3 5.7 1.0 0.2 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 0.5 14.8 32.1 24.3 13.6 7.1 3.7 1.9 1.0 0.5 0.3 0.1 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 26.6 61.0 11.2 1.1 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 1.9 27.5 34.7 19.1 9.0 4.2 1.9 0.9 0.4 0.2 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 0.9 16.5 30.1 23.5 14.0 7.5 3.8 1.9 0.9 0.5 0.2 0.1 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 0.0 2.6 13.3 21.0 20.2 15.5 10.6 6.7 4.1 2.5 1.4 0.8 0.5 0.3 0.2 0.1 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 | 0.8 16.6 32.8 25.0 13.6 6.4 2.8 1.2 0.5 0.2 0.1 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 |
| Total Percentage | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Layer ID from outdoors to indoors<br>(See Table 18) | F01<br>F08<br>G03<br>F05<br>I05<br>G01<br>F03 0 0 0 0 0 0 0 | F01<br>F08<br>G03<br>F05<br>I05<br>I05<br>G01<br>F03 0 0 0 0 0 0 | F01<br>F08<br>G03<br>F05<br>I05<br>F05<br>F16<br>F03 0 0 0 0 0 0 | F01<br>F08<br>G03<br>F05<br>I05<br>I05<br>F05<br>F16<br>F03 0 0 0 0 0 | F01<br>F08<br>G03<br>F05<br>I05<br>F03 0 0 0 0 0 0 0 0 | F01<br>F08<br>G03<br>F05<br>I05<br>I05<br>F03 0 0 0 0 0 0 0 | F01<br>F12<br>G05<br>F05<br>I05<br>F05<br>G01<br>F03 0 0 0 0 0 0 | F01<br>F12<br>G05<br>F05<br>I05<br>I05<br>F05<br>G01<br>F03 0 0 0 0 0 | F01<br>F14<br>G05<br>F05<br>I05<br>F05<br>G01<br>F03 0 0 0 0 0 0 |

### Indoor Design Conditions

The main purpose of the heating system is to maintain indoor conditions that make most of the occupants comfortable. Keep in mind, however, that the purpose of heating load calculations is to obtain data for sizing the heating system components. In many cases, the system will rarely be called upon to operate at the design conditions. Therefore, the use and occupancy of the space are general considerations from the design temperature point of view. Later, when the building’s energy requirements are computed, the actual conditions in the space and outdoor environment, including internal heat gains, must be considered.

<!-- str. 509 -->

**Table 17 Roof Conduction Time Series (CTS) (Continued)**

```text
                                     Sloped Frame Roofs                             Wood Deck                         Metal Deck Roofs
                                                                                          Membrane, Membrane,
                                            Wood        Wood                              Sheathing,   Sheathing,
                               Slate or   Shingles,    Shingles,                             R-1.8       R-3.5
                             Tile, Wood     Wood        Wood     Membrane, Membrane,       Insulation  Insulation Membrane, Membrane,
                             Sheathing,   Sheathing,  Sheathing,  Sheathing,  Sheathing,    Board,       Board,    Sheathing,  Sheathing,
                                R-6.7       R-3.3       R-6.7       R-1.8        R-3.5    Wood Deck, Wood Deck,      R-1.8        R-3.5
                                Batt         Batt        Batt     Insulation  Insulation  Suspended    Suspended   Insulation  Insulation
                             Insulation, Insulation,  Insulation,   Board,      Board,     Acoustical  Acoustical    Board,      Board,
                             Gyp. Board Gyp. Board Gyp. Board Wood Deck Wood Deck           Ceiling     Ceiling    Metal Deck Metal Deck
              Roof Number        10          11           12          13          14          15           16          17          18
               U, W/(m^2·K)    0.1325      0.2300       0.1298      0.3944      0.2333      0.3306       0.2094      0.4539      0.2528
                    Total R     7.54         4.35        7.70        2.54        4.29         3.02        4.78        2.20        3.96
                      Hour        Conduction Time Factors, %                 Conduction Time Factors, %           Conduction Time Factors, %
                          1       0.0         0.6         0.0         0.3          0.1         0.9         1.2        18.0          3.3
                          2       2.5        11.6         1.7         6.9          2.1         2.7         1.5        60.0         38.1
                          3      14.0        24.2         9.7        17.2         10.0         7.8         4.3        18.4         37.6
                          4      22.8        22.1        17.0        17.7         15.4        10.1         7.6         3.0         14.6
                          5      21.4        15.6        18.1        14.3         15.2         9.8         8.8         0.5          4.5
                          6      15.7        10.0        15.5        10.9         12.7         8.8         8.6         0.1          1.3
                          7      10.1         6.2        11.9         8.2         10.1         7.8         8.0         0.0          0.4
                          8       6.0         3.8         8.5         6.2          7.9         6.9         7.2         0.0          0.1
                          9       3.4         2.3         5.9         4.6          6.1         6.1         6.5         0.0          0.0
                         10       1.9         1.4         4.0         3.5          4.7         5.4         5.9         0.0          0.0
                         11       1.0         0.8         2.6         2.6          3.6         4.8         5.3         0.0          0.0
                         12       0.6         0.5         1.7         2.0          2.8         4.2         4.7         0.0          0.0
                         13       0.3         0.3         1.1         1.5          2.2         3.7         4.3         0.0          0.0
                         14       0.2         0.2         0.7         1.1          1.7         3.3         3.8         0.0          0.0
                         15       0.1         0.1         0.5         0.8          1.3         2.9         3.4         0.0          0.0
                         16       0.0         0.1         0.3         0.6          1.0         2.6         3.1         0.0          0.0
                         17       0.0         0.0         0.2         0.5          0.8         2.3         2.8         0.0          0.0
                         18       0.0         0.0         0.1         0.3          0.6         2.0         2.5         0.0          0.0
                         19       0.0         0.0         0.1         0.3          0.5         1.8         2.2         0.0          0.0
                         20       0.0         0.0         0.1         0.2          0.4         1.5         2.0         0.0          0.0
                         21       0.0         0.0         0.0         0.1          0.3         1.4         1.8         0.0          0.0
                         22       0.0         0.0         0.0         0.1          0.2         1.2         1.6         0.0          0.0
                         23       0.0         0.0         0.0         0.1          0.2         1.1         1.5         0.0          0.0
                         24       0.0         0.0         0.0         0.1          0.1         0.9         1.3         0.0          0.0
            Total Percentage     100         100          100         100         100         100          100         100         100
              Layer ID from      F01         F01          F01         F01         F01         F01          F01         F01         F01
          outdoors to indoors    F14         F15          F15         F13         F13         F13          F13         F13         F13
              (See Table 18)
                                 G05         G05         G05         G03          G03         G03         G03         G03          G03
                                 F05         F05          F05         I02          I02         I02         I02         I02         I02
                                  I05         I05         I05        G06           I02        G06          I02         F08         I02
                                  I05        F05          I05         F03         G06         F05         G06          F03         F08
                                 F05         G01          F05           0         F03         F16          F05           0         F03
                                 G01         F03         G01            0           0         F03          F16           0           0
                                 F03            0         F03           0           0            0         F03           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
```

The indoor design temperature should be selected at the lower end of the acceptable temperature range, so that the heating equipment will not be oversized. Even properly sized equipment operates under partial load, at reduced efficiency, most of the time; therefore, any oversizing aggravates this condition and lowers overall system efficiency. A maximum design dry-bulb temperature of 21°C is recommended for most occupancies. The indoor design value of relative humidity should be compatible with a healthful environment and the thermal and moisture integrity of the building envelope. A minimum relative humidity of 30% is recommended for most situations.

<!-- str. 510 -->

**Table 17 Roof Conduction Time Series (CTS) (Continued)**

```text
                                                               Metal Deck Roofs                                        Concrete Roofs
                             Membrane, Membrane,                                            50 mm       50 mm
                             Sheathing,  Sheathing,                                        Concrete    Concrete   Membrane, Membrane,
                                R-1.8       R-3.5                                        Roof Ballast, Roof Ballast, Sheathing, Sheathing,
                             Insulation   Insulation Membrane, Membrane, Membrane, Membrane, Membrane,               R-2.6        R-5.3
                               Board,      Board,     Sheathing,  Sheathing,  Sheathing,  Sheathing,   Sheathing,  Insulation  Insulation
                             Metal Deck, Metal Deck,    R-2.6       R-5.3        R-4.4       R-2.6       R-5.3       Board,      Board,
                             Suspended   Suspended    Insulation  Insulation  Insulation   Insulation  Insulation   100 mm      100 mm
                             Acoustical   Acoustical    Board,      Board,      Board,      Board,      Board,        LW          LW
                               Ceiling     Ceiling   Metal Deck Metal Deck    Metal Deck  Metal Deck Metal Deck     Concrete    Concrete
              Roof Number        19          20           21          22          23          24           25          26          27
               U, W/(m^2·K)    0.3714      0.1880       0.3248      0.1752      0.2485      0.2984       0.1673      0.3059      0.1696
                    Total R     2.69         5.32        3.08        5.71        4.02         3.35        5.98        3.27        5.90
                      Hour                                 Conduction Time Factors, %                             Conduction Time Factors, %
                          1       4.8         0.2         8.6         0.3          6.4         0.4         0.1         0.6          0.8
                          2      40.0         8.8        52.5        12.8         44.2        10.1         1.3         2.2          0.9
                          3      34.7        26.6        29.8        31.1         32.7        21.9         8.1         7.9          2.5
                          4      13.8        26.3         7.3        25.5         11.6        19.5        14.7        11.2          5.9
                          5       4.6        17.3         1.5        14.7          3.6        14.2        15.8        11.2          8.6
                          6       1.4         9.8         0.3         7.7          1.1        10.1        14.0        10.0          9.6
                          7       0.4         5.2         0.1         3.9          0.3         7.1        11.4         8.7          9.4
                          8       0.1         2.7         0.0         2.0          0.1         5.0         8.8         7.5          8.7
                          9       0.0         1.4         0.0         1.0          0.0         3.5         6.7         6.4          7.8
                         10       0.0         0.7         0.0         0.5          0.0         2.5         5.0         5.5          6.9
                         11       0.0         0.4         0.0         0.2          0.0         1.7         3.7         4.7          6.0
                         12       0.0         0.2         0.0         0.1          0.0         1.2         2.8         4.0          5.2
                         13       0.0         0.1         0.0         0.1          0.0         0.9         2.0         3.4          4.5
                         14       0.0         0.1         0.0         0.0          0.0         0.6         1.5         2.9          3.9
                         15       0.0         0.0         0.0         0.0          0.0         0.4         1.1         2.5          3.4
                         16       0.0         0.0         0.0         0.0          0.0         0.3         0.8         2.2          2.9
                         17       0.0         0.0         0.0         0.0          0.0         0.2         0.6         1.8          2.5
                         18       0.0         0.0         0.0         0.0          0.0         0.2         0.4         1.6          2.2
                         19       0.0         0.0         0.0         0.0          0.0         0.1         0.3         1.4          1.9
                         20       0.0         0.0         0.0         0.0          0.0         0.1         0.2         1.2          1.6
                         21       0.0         0.0         0.0         0.0          0.0         0.1         0.2         1.0          1.4
                         22       0.0         0.0         0.0         0.0          0.0         0.0         0.1         0.9          1.2
                         23       0.0         0.0         0.0         0.0          0.0         0.0         0.1         0.7          1.1
                         24       0.0         0.0         0.0         0.0          0.0         0.0         0.1         0.6          0.9
            Total Percentage     100         100          100         100         100         100          100         100         100
              Layer ID from      F01         F01          F01         F01         F01         F01         F01          F01         F01
          outdoors to indoors    F13         F13          F13         F13         F08         M17         M17          F13         F13
              (See Table 18)
                                 G03         G03         G03         G03          G03         F13         F13         G03          G03
                                  I02         I02         I03         I03         F05         G03         G03          I03         I03
                                 F08          I02         F08         I03          I05         I03         I03        M11          I03
                                 F05         F08          F03         F08         G01         F08          I03         F03        M11
                                 F16         F05            0         F03         F03         F03         F08            0         F03
                                 F03         F16            0           0           0            0        F03            0           0
                                   0         F03            0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
                                   0            0           0           0           0            0           0           0           0
```

### Calculation of Transmission Heat Losses

**Exterior Surface Above Grade.** All above-grade surfaces exposed to outdoor conditions (walls, doors, ceilings, fenestration, and raised floors) are treated identically, as follows:

> q = A × HF&emsp;**(34)**
>
> HF = U Δt&emsp;**(35)**

where HF is the heating load factor in W/m<sup>2</sup>.

**Below-Grade Surfaces.** An approximate method for estimating below-grade heat loss [based on the work of Latta and Boileau (1969)] assumes that the heat flow paths shown in Figure 12 can be used to find the steady-state heat loss to the ground surface, as follows:

<!-- str. 511 -->

**Table 17 Roof Conduction Time Series (CTS) (Concluded)**

|   | Membrane, Sheathing, R-2.6 Insulation Board, 150 mm LW Concrete | Membrane, Sheathing, R-5.3 Insulation Board, 150 mm LW Concrete | Membrane, Sheathing, R-2.6 Insulation Board, 200 mm LW Concrete | Membrane, Sheathing, R-5.3 Insulation Board, 200 mm LW Concrete | Concrete Roofs<br>Membrane, Sheathing, R-2.6 Insulation Board, 150 mm HW Concrete | Concrete Roofs<br>Membrane, Sheathing, R-5.3 Insulation Board, 150 mm HW Concrete | Membrane, Sheathing, R-2.6 Insulation Board, 200 mm HW Concrete | Membrane, 150 mm HW 150 mm HW<br>Sheathing, R-5.3 Insulation Board, 200 mm HW Concrete | Membrane, 150 mm HW 150 mm HW<br>Membrane, Concrete, R-3.3 Batt Insulation, Suspended Acoustical Ceiling | Membrane, 150 mm HW 150 mm HW<br>Membrane, Concrete, R-6.7 Batt Insulation, Suspended Acoustical Ceiling |
|---|---|---|---|---|---|---|---|---|---|---|
| Roof Number | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 |
| U, W/(m<sup>2</sup>·K) | 0.2972 | 0.1669 | 0.2890 | 0.1688 | 0.3167 | 0.1729 | 0.3139 | 0.1719 | 0.2387 | 0.1325 |
| Total R | 3.36 | 5.99 | 3.46 | 5.92 | 3.16 | 5.79 | 3.19 | 5.82 | 4.19 | 7.54 |
| Hour |  |  |  | Conduction Time Factors, % |  |  |  |  |  |  |
| 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 | 1.5 1.7 3.4 6.0 7.5 7.8 7.6 7.1 6.5 6.0 5.5 5.0 4.6 4.2 3.8 3.5 3.2 2.9 2.6 2.4 2.2 2.0 1.8 1.7 | 1.9 1.7 2.0 3.2 4.9 6.2 6.9 7.0 6.9 6.5 6.1 5.7 5.2 4.8 4.4 4.1 3.7 3.4 3.1 2.9 2.6 2.4 2.2 2.0 | 2.4 2.3 2.6 3.7 4.9 5.7 6.1 6.1 6.0 5.8 5.5 5.2 5.0 4.7 4.4 4.1 3.9 3.7 3.4 3.2 3.0 2.9 2.7 2.5 | 1.5 1.4 1.5 2.6 4.6 6.4 7.4 7.8 7.6 7.2 6.7 6.1 5.5 5.0 4.5 4.0 3.6 3.2 2.9 2.6 2.3 2.1 1.9 1.7 | 2.0 2.4 4.6 6.5 7.0 6.8 6.5 6.1 5.7 5.3 5.0 4.7 4.4 4.1 3.8 3.6 3.4 3.1 2.9 2.8 2.6 2.4 2.3 2.1 | 2.3 2.2 2.7 4.1 5.4 6.2 6.4 6.3 6.1 5.8 5.5 5.2 4.8 4.5 4.3 4.0 3.8 3.5 3.3 3.1 2.9 2.7 2.6 2.4 | 2.6 2.6 3.5 4.8 5.7 5.9 5.9 5.7 5.5 5.3 5.0 4.8 4.6 4.4 4.2 4.0 3.8 3.6 3.4 3.3 3.1 3.0 2.8 2.7 | 2.8 2.7 2.8 3.4 4.3 5.0 5.5 5.6 5.6 5.5 5.3 5.1 4.9 4.7 4.5 4.3 4.1 3.9 3.7 3.6 3.4 3.2 3.1 3.0 | 1.4 2.3 5.7 8.0 8.2 7.8 7.2 6.6 6.0 5.5 5.0 4.6 4.2 3.8 3.5 3.2 2.9 2.6 2.4 2.2 2.0 1.8 1.7 1.5 | 1.6 1.6 2.6 4.8 6.5 7.3 7.4 7.1 6.7 6.2 5.7 5.3 4.8 4.4 4.0 3.7 3.4 3.1 2.8 2.6 2.4 2.2 2.0 1.8 |
| Total Percentage | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| Layer ID from outdoors to indoors<br>(See Table 18) | F01<br>F13<br>G03<br>I03<br>M12<br>F03 0 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>I03<br>M12<br>F03 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>M13<br>F03 0 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>I03<br>M13<br>F03 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>M14<br>F03 0 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>I03<br>M14<br>F03 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>M15<br>F03 0 0 0 0 0 0 0 0 | F01<br>F13<br>G03<br>I03<br>I03<br>M15<br>F03 0 0 0 0 0 0 0 | F01<br>F13<br>M14<br>F05<br>I05<br>F16<br>F03 0 0 0 0 0 0 0 | F01<br>F13<br>M14<br>F05<br>I05<br>I05<br>F16<br>F03 0 0 0 0 0 0 |

> HF = U (t – t )&emsp;**(36)**
>
> *avg in gr*

where

- U<sub>avg</sub> = average U-factor for below-grade surface from Equation (38) or (39), W/(m<sup>2</sup>·K)
- t<sub>in</sub> = below-grade space air temperature, °C
- t<sub>gr</sub> = design ground surface temperature from Equation (37), °C

The effect of soil heat capacity means that none of the usual external design air temperatures are suitable values for t<sub>gr</sub>. Ground surface temperature fluctuates about an annual mean value by amplitude A, which varies with geographic location and surface cover. The minimum ground surface temperature, suitable for heat loss estimates, is therefore

> t<sub>gr</sub> = t<sub>gr</sub> – A&emsp;**(37)**

<!-- str. 512 -->

**Table 18 Thermal Properties and Code Numbers of Layers Used in Wall and Roof Descriptions for Tables 16 and 17**

| Layer ID | Description | Thickness, mm | Conductivity, W/(m·K) | Density, kg/m<sup>3</sup> | Specific Heat, kJ/(kg·K) | Resistance R, (m<sup>2</sup>·K)/W | R | Mass, kg/m<sup>2</sup> | Thermal Capacity, kJ/(m<sup>2</sup>·K) | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| F01 | Outdoor surface resistance | — | — | — | — | 0.04 | 0.04 | — | — | 1 |
| F02 | Indoor vertical surface resistance | — | — | — | — | 0.12 | 0.12 | — | — | 2 |
| F03 | Indoor horizontal surface resistance | — | — | — | — | 0.16 | 0.16 | — | — | 3 |
| F04 | Wall air space resistance | — | — | — | — | 0.15 | 0.15 | — | — | 4 |
| F05 | Ceiling air space resistance | — | — | — | — | 0.18 | 0.18 | — | — | 5 |
| F06 | EIFS finish | 9.5 | 0.72 | 1856 | 0.84 | — | 0.01 | 17.7 | 14.92 | 6 |
| F07 | 25 mm stucco | 25.4 | 0.72 | 1856 | 0.84 | — | 0.04 | 47.2 | 39.45 | 6 |
| F08 | Metal surface | v0.8 | 45.28 | 7824 | 0.50 | — | 0.00 | 6.0 | 3.07 | 7 |
| F09 | Opaque spandrel glass | 6.4 | 0.99 | 2528 | 0.88 | — | 0.01 | 16.1 | 14.10 | 8 |
| F10 | 25 mm stone | 25.4 | 3.17 | 2560 | 0.79 | — | 0.01 | 65.1 | 51.71 | 9 |
| F11 | Wood siding | 12.7 | 0.09 | 592 | 1.17 | — | 0.14 | 7.5 | 8.79 | 10 |
| F12 | Asphalt shingles | 3.2 | 0.04 | 1120 | 1.26 | — | 0.08 | 3.6 | 4.50 |  |
| F13 | Built-up roofing | 9.5 | 0.16 | 1120 | 1.46 | — | 0.06 | 10.7 | 15.74 |  |
| F14 | Slate or tile | 12.7 | 1.59 | 1920 | 1.26 | — | 0.01 | 24.4 | 30.67 |  |
| F15 | Wood shingles | 6.4 | 0.04 | 592 | 1.30 | — | 0.17 | 3.8 | 4.91 |  |
| F16 | Acoustic tile | 19.1 | 0.06 | 368 | 0.59 | — | 0.31 | 7.0 | 4.09 | 11 |
| F17 | Carpet | 12.7 | 0.06 | 288 | 1.38 | — | 0.22 | 3.7 | 5.11 | 12 |
| F18 | Terrazzo | 25.4 | 1.80 | 2560 | 0.79 | — | 0.01 | 65.1 | 51.71 | 13 |
| G01 | 16 mm gyp board | 15.9 | 0.16 | 800 | 1.09 | — | 0.10 | 12.7 | 13.90 |  |
| G02 | 16 mm plywood | 15.9 | 0.12 | 544 | 1.21 | — | 0.14 | 8.6 | 10.42 |  |
| G03 | 13 mm fiberboard sheathing | 12.7 | 0.07 | 400 | 1.30 | — | 0.19 | 5.1 | 6.54 | 14 |
| G04 | 13 mm wood | 12.7 | 0.15 | 608 | 1.63 | — | 0.08 | 7.7 | 12.67 | 15 |
| G05 | 25 mm wood | 25.4 | 0.15 | 608 | 1.63 | — | 0.17 | 15.5 | 25.35 | 15 |
| G06 | 50 mm wood | 50.8 | 0.15 | 608 | 1.63 | — | 0.33 | 30.9 | 50.49 | 15 |
| G07 | 100 mm wood | 101.6 | 0.15 | 608 | 1.63 | — | 0.66 | 61.8 | 100.97 | 15 |
| I01 | 25 mm insulation board | 25.4 | 0.03 | 43 | 1.21 | — | 0.88 | 1.1 | 1.43 | 16 |
| I02 | 50 mm insulation board | 50.8 | 0.03 | 43 | 1.21 | — | 1.76 | 2.2 | 2.66 | 16 |
| I03 | 75 mm insulation board | 76.2 | 0.03 | 43 | 1.21 | — | 2.64 | 3.3 | 4.09 | 16 |
| I04 | 89 mm batt insulation | 89.4 | 0.05 | 19 | 0.96 | — | 1.94 | 1.7 | 1.64 | 17 |
| I05 | 154 mm batt insulation | 154.4 | 0.05 | 19 | 0.96 | — | 3.34 | 3.0 | 2.86 | 17 |
| I06 | 244 mm batt insulation | 243.8 | 0.05 | 19 | 0.96 | — | 5.28 | 4.7 | 4.50 | 17 |
| M01 | 100 mm brick | 101.6 | 0.89 | 1920 | 0.79 | — | 0.11 | 195.2 | 155.34 | 18 |
| M02 | 150 mm LW concrete block | 152.4 | 0.49 | 512 | 0.88 | — | 0.31 | 78.1 | 68.68 | 19 |
| M03 | 200 mm LW concrete block | 203.2 | 0.50 | 464 | 0.88 | — | 0.41 | 94.3 | 82.99 | 20 |
| M04 | 300 mm LW concrete block | 304.8 | 0.71 | 512 | 0.88 | — | 0.43 | 156.2 | 137.36 | 21 |
| M05 | 200 mm concrete block | 203.2 | 1.11 | 800 | 0.92 | — | 0.18 | 162.7 | 149.83 | 22 |
| M06 | 300 mm concrete block | 304.8 | 1.40 | 800 | 0.92 | — | 0.22 | 244.0 | 224.84 | 23 |
| M07 | 150 mm LW concrete block (filled) | 152.4 | 0.29 | 512 | 0.88 | — | 0.53 | 78.1 | 68.68 | 24 |
| M08 | 200 mm LW concrete block (filled) | 203.2 | 0.26 | 464 | 0.88 | — | 0.78 | 94.3 | 82.99 | 25 |
| M09 | 300 mm LW concrete block (filled) | 304.8 | 0.29 | 512 | 0.88 | — | 1.04 | 156.2 | 137.36 | 26 |
| M10 | 200 mm concrete block (filled) | 203.2 | 0.72 | 800 | 0.92 | — | 0.28 | 162.7 | 149.83 | 27 |
| M11 | 100 mm lightweight concrete | 101.6 | 0.53 | 1280 | 0.84 | — | 0.19 | 130.1 | 108.95 |  |
| M12 | 150 mm lightweight concrete | 152.4 | 0.53 | 1280 | 0.84 | — | 0.29 | 195.2 | 163.52 |  |
| M13 | 200 mm lightweight concrete | 203.2 | 0.53 | 1280 | 0.84 | — | 0.38 | 260.3 | 218.10 |  |
| M14 | 150 mm heavyweight concrete | 152.4 | 1.95 | 2240 | 0.90 | — | 0.08 | 341.6 | 307.62 |  |
| M15 | 200 mm heavyweight concrete | 203.2 | 1.95 | 2240 | 0.90 | — | 0.10 | 455.5 | 410.23 |  |
| M16 | 300 mm heavyweight concrete | 304.8 | 1.95 | 2240 | 0.90 | — | 0.16 | 683.2 | 615.24 |  |
| M17 | 50 mm LW concrete roof ballast | 50.8 | 0.19 | 640 | 0.84 | — | 0.27 | 32.5 | 2 7.19 | 28 |

Notes: The following notes give sources for the data in this table. 14. Chapter 26, Table 4 for nail-base sheathing 1. Chapter 26, Table 1 for 3.4 m/s wind 15. Chapter 26, Table 4 for Southern pine 2. Chapter 26, Table 1 for still air, horizontal heat flow 16. Chapter 26, Table 4 for expanded polystyrene 3. Chapter 26, Table 1 for still air, downward heat flow 17. Chapter 26, Table 4 for glass fiber batt, specific heat per glass fiber board 4. Chapter 26, Table 3 for 40 mm space, 32.2°C, horizontal heat flow, 0.82 emittance 18. Chapter 26, Table 4 for clay fired brick 5. Chapter 26, Table 3 for 90 mm space, 32.2°C, downward heat flow, 0.82 emittance 19. Chapter 26, Table 4, 7.3 kg block, 200 × 400 mm face 6. EIFS finish layers approximated by Chapter 26, Table 4 for 10 mm cement plaster, 20. Chapter 26, Table 4, 8.6 kg block, 200 × 400 mm face sand aggregate 21. Chapter 26, Table 4, 14.5 kg block, 200 × 400 mm face 7. Chapter 33, Table 3 for steel (mild), 22 gage 22. Chapter 26, Table 4, 15 kg normal weight block, 200 × 400 mm face 8. Chapter 26, Table 4 for architectural glass 23. Chapter 26, Table 4, 22.7 kg normal weight block, 200 × 400 mm face 9. Chapter 26, Table 4 for marble and granite 24. Chapter 26, Table 4, 7.3 kg block, vermiculite fill 10. Chapter 26, Table 4, density assumed same as Southern pine 25. Chapter 26, Table 4, 8.6 kg block, 200 × 400 mm face, vermiculite fill 11. Chapter 26, Table 4 for mineral fiberboard, wet molded, acoustical tile 26. Chapter 26, Table 4, 14.5 kg block, 200 × 400 mm face, vermiculite fill 12. Chapter 26, Table 4 for carpet and rubber pad, density assumed same as fiberboard 27. Chapter 26, Table 4, 15 kg normal weight block, 200 × 400 mm face, vermiculite fill 13. Chapter 26, Table 4, density assumed same as stone 28. Chapter 26, Table 4 for 640 kg/m<sup>3</sup> LW concrete

<!-- str. 513 -->

**Table 19 Representative Nonsolar RTS Values for Light to Heavy Construction**

| % Glass | With Carpet<br>10% | With Carpet<br>50% | Light With Carpet<br>90% | Light No Carpet<br>10% | No Carpet<br>50% | No Carpet<br>90% | With Carpet<br>10% | With Carpet<br>50% | Medium With Carpet<br>90% | Medium No Carpet<br>10% | No Carpet<br>50% | No Carpet<br>90% | With Carpet<br>10% | With Carpet 50% 90% | Heavy With Carpet 50% 90% | Heavy No Carpet 10% 50% 90% | No Carpet 10% 50% 90% | 10% 50% 90% | Light | Interior Zones Light | Interior Zones Medium | Interior Zones Medium | Heavy | Heavy |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hour |  |  |  |  |  |  |  |  |  | Radiant Time Factor, % |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 0 | 47 | 50 | 53 | 41 | 43 | 46 | 46 | 49 | 52 | 31 | 33 | 35 | 34 | 38 | 42 | 22 | 25 | 28 | 46 | 40 | 46 | 31 | 33 | 21 |
| 1 | 19 | 18 | 17 | 20 | 19 | 19 | 18 | 17 | 16 | 17 | 16 | 15 | 9 | 9 | 9 | 10 | 9 | 9 | 19 | 20 | 18 | 17 | 9 | 9 |
| 2 | 11 | 10 | 9 | 12 | 11 | 11 | 10 | 9 | 8 | 11 | 10 | 10 | 6 | 6 | 5 | 6 | 6 | 6 | 11 | 12 | 10 | 11 | 6 | 6 |
| 3 | 6 | 6 | 5 | 8 | 7 | 7 | 6 | 5 | 5 | 8 | 7 | 7 | 4 | 4 | 4 | 5 | 5 | 5 | 6 | 8 | 6 | 8 | 5 | 5 |
| 4 | 4 | 4 | 3 | 5 | 5 | 5 | 4 | 3 | 3 | 6 | 5 | 5 | 4 | 4 | 4 | 5 | 5 | 4 | 4 | 5 | 3 | 6 | 4 | 5 |
| 5 | 3 | 3 | 2 | 4 | 3 | 3 | 2 | 2 | 2 | 4 | 4 | 4 | 4 | 3 | 3 | 4 | 4 | 4 | 3 | 4 | 2 | 4 | 4 | 4 |
| 6 | 2 | 2 | 2 | 3 | 3 | 2 | 2 | 2 | 2 | 4 | 3 | 3 | 3 | 3 | 3 | 4 | 4 | 4 | 2 | 3 | 2 | 4 | 3 | 4 |
| 7 | 2 | 1 | 1 | 2 | 2 | 2 | 1 | 1 | 1 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | 4 | 4 | 2 | 2 | 1 | 3 | 3 | 4 |
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 2 | 2 | 3 | 3 | 3 | 4 | 3 | 3 | 1 | 1 | 1 | 3 | 3 | 4 |
| 9 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 2 | 3 | 3 | 3 | 1 | 1 | 1 | 2 | 3 | 3 |
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 2 | 2 | 3 | 3 | 3 | 1 | 1 | 1 | 2 | 3 | 3 |
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 3 | 1 | 1 | 1 | 2 | 2 | 3 |
| 12 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 3 | 1 | 1 | 1 | 1 | 2 | 3 |
| 13 | 1 | 1 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 2 | 1 | 1 | 1 | 1 | 2 | 3 |
| 14 | 0 | 0 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 2 | 2 | 1 | 0 | 1 | 1 | 2 | 3 |
| 15 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 0 | 0 | 1 | 1 | 2 | 3 |
| 16 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 0 | 0 | 1 | 1 | 2 | 3 |
| 17 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 0 | 0 | 1 | 1 | 2 | 2 |
| 18 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 1 | 2 | 2 | 2 | 0 | 0 | 1 | 1 | 2 | 2 |
| 19 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 1 | 2 | 2 | 1 | 2 | 2 | 2 | 0 | 0 | 1 | 0 | 2 | 2 |
| 20 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 2 | 2 |
| 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 2 | 2 |
| 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 1 | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 1 | 2 |
| 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 2 | 2 | 1 | 0 | 0 | 0 | 0 | 1 | 2 |
|  | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |

**Table 20 Representative Solar RTS Values for Light to Heavy Construction**

| % Glass | With Carpet<br>10% | With Carpet<br>50% | Light 90% | No Carpet<br>10% | No Carpet<br>50% | 90% | With Carpet<br>10% | With Carpet<br>50% | Medium<br>90% | Medium No Carpet<br>10% | No Carpet<br>50% | 90% | With Carpet<br>10% | With Carpet<br>50% | Heavy 90% | No Carpet<br>10% | No Carpet<br>50% | 90% |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hour |  |  |  |  |  |  |  | Radiant Time Factor, % |  |  |  |  |  |  |  |  |  |  |
| 0 | 53 | 55 | 56 | 44 | 45 | 46 | 52 | 54 | 55 | 28 | 29 | 29 | 47 | 49 | 51 | 26 | 27 | 28 |
| 1 | 17 | 17 | 17 | 19 | 20 | 20 | 16 | 16 | 15 | 15 | 15 | 15 | 11 | 12 | 12 | 12 | 13 | 13 |
| 2 | 9 | 9 | 9 | 11 | 11 | 11 | 8 | 8 | 8 | 10 | 10 | 10 | 6 | 6 | 6 | 7 | 7 | 7 |
| 3 | 5 | 5 | 5 | 7 | 7 | 7 | 5 | 4 | 4 | 7 | 7 | 7 | 4 | 4 | 3 | 5 | 5 | 5 |
| 4 | 3 | 3 | 3 | 5 | 5 | 5 | 3 | 3 | 3 | 6 | 6 | 6 | 3 | 3 | 3 | 4 | 4 | 4 |
| 5 | 2 | 2 | 2 | 3 | 3 | 3 | 2 | 2 | 2 | 5 | 5 | 5 | 2 | 2 | 2 | 4 | 4 | 4 |
| 6 | 2 | 2 | 2 | 3 | 2 | 2 | 2 | 1 | 1 | 4 | 4 | 4 | 2 | 2 | 2 | 3 | 3 | 3 |
| 7 | 1 | 1 | 1 | 2 | 2 | 2 | 1 | 1 | 1 | 4 | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 |
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 |
| 9 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 3 | 3 | 2 | 2 | 2 | 3 | 3 | 3 |
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 3 | 3 | 3 |
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 3 | 3 | 2 |
| 12 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 1 | 1 | 2 | 2 | 2 |
| 13 | 1 | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 1 | 1 | 2 | 2 | 2 |
| 14 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 2 |
| 15 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 |
| 16 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 |
| 17 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 |
| 18 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 |
| 19 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 |
| 20 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 2 | 2 | 2 |
| 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 2 | 2 | 2 |
| 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 2 | 1 | 1 |
| 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 2 | 1 | 1 |
|  | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |

| With Carpet | With Carpet |   | No Carpet | No Carpet |   |
|---|---|---|---|---|---|
| 10% 50% | 90% | 10% | 50% | 90% |  |
| **Radiant Time Factor, %** |  |  |  |  |  |
| 52 | 54 | 55 | 28 | 29 | 29 |
| 16 | 16 | 15 | 15 | 15 | 15 |
| 8 | 8 | 8 | 10 | 10 | 10 |
| 5 | 4 | 4 | 7 | 7 | 7 |
| 3 | 3 | 3 | 6 | 6 | 6 |
| 2 | 2 | 2 | 5 | 5 | 5 |
| 2 | 1 | 1 | 4 | 4 | 4 |
| 1 | 1 | 1 | 4 | 3 | 3 |
| 1 | 1 | 1 | 3 | 3 | 3 |
| 1 | 1 | 1 | 3 | 3 | 3 |
| 1 | 1 | 1 | 2 | 2 | 2 |
| 1 | 1 | 1 | 2 | 2 | 2 |
| 1 | 1 | 1 | 2 | 2 | 2 |
| 1 | 1 | 1 | 2 | 2 | 2 |
| 1 | 1 | 1 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 |
| 0 | 0 | 0 | 1 | 1 | 1 |
| 0 | 0 | 0 | 1 | 1 | 1 |
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 0 | 0 | 0 |

<!-- str. 514 -->

**Table 21 RTS Representative Zone Construction for Tables 19 and 20**

```text
Construction Class Exterior Wall               Roof/Ceiling             Partitions           Floor                       Furnishings
Light             Steel siding, 50 mm insulation, 100 mm LW concrete, ceil- 19 mm gyp., air space, Acoustic tile, ceiling air space, 25 mm wood @
                   air space, 19 mm gyp.        ing air space, acoustic tile 19 mm gyp.       100 mm LW concrete          50% of floor area
Medium            100 mm face brick, 50 mm insu-100 mm HW concrete, ceil- 19 mm gyp., air space, Acoustic tile, ceiling air space, 25 mm wood @
                   lation, air space, 19 mm gyp. ing air space, acoustic tile 19 mm gyp.      100 mm HW concrete          50% of floor area
Heavy             100 mm face brick, 200 mm    200 mm HW concrete, ceil- 19 mm gyp., 200 mm Acoustic tile, ceiling air space, 25 mm wood @
                   HW concrete air space, 50 mm ing air space, acoustic tile HW concrete block, 200 mm HW concrete        50% of floor area
                   insulation, 19 mm gyp.                                19 mm gyp.
```

![Fig. 12 Heat Flow from Below-Grade Surface](img/ch18/fig-12.png)

*Fig. 12 Heat Flow from Below-Grade Surface*

where

- t<sub>gr</sub> = mean ground temperature, °C, estimated from the annual average air temperature or from well-water temperatures, shown in Figure 18 of Chapter 34 in the 2011 ASHRAE Handbook—HVAC Applications
- A = ground surface temperature amplitude, K, from Figure 13 for North America

Figure 14 shows depth parameters used in determining U<sub>avg</sub>. For walls, the region defined by z<sub>1</sub> and z<sub>2</sub> may be the entire wall or any portion of it, allowing partially insulated configurations to be analyzed piecewise.

The below-grade wall average U-factor is given by U<sub>avg,bw</sub> = (2k soil)/(π(z<sub>2</sub>– z<sub>1</sub>))

(38)

> ( ) ( )
>
> × ln z<sub>2</sub>+ (2k R soil other)/π – ln z<sub>1</sub>+ (2k R soil other)/π

> ( ) ( )

where

- U<sub>avg,bw</sub> = average U-factor for wall region defined by z<sub>1</sub> and z<sub>2</sub>, W/(m<sup>2</sup>·K)
- k<sub>soil</sub> = soil thermal conductivity, W/(m·K)
- R<sub>other</sub> = total resistance of wall, insulation, and indoor surface resistance, (m<sup>2</sup>·K)/W
- z<sub>1</sub>, z<sub>2</sub> = depths of top and bottom of wall segment under consideration, m (Figure 14) The value of soil thermal conductivity k varies widely with soil type and moisture content. A typical value of 1.4 W/(m·K) has been used previously to tabulate U-factors, and R<sub>other</sub> is approximately 0.259 (m<sup>2</sup>·K)/W for uninsulated concrete walls. For these parameters, representative values for U<sub>avg,bw</sub> are shown in Table 22.

The average below-grade floor U-factor (where the entire basement floor is uninsulated or has uniform insulation) is given by

![Fig. 13 Ground Temperature Amplitude](img/ch18/fig-13.png)

*Fig. 13 Ground Temperature Amplitude*

![Fig. 14 Below-Grade Parameters](img/ch18/fig-14.png)

*Fig. 14 Below-Grade Parameters*

**Table 22 Average U-Factor for Basement Walls with Uniform Insulation**

| Depth, m | U<sub>avg,bw</sub> from Grade to Depth, W/(m<sup>2</sup>·K)<br>Uninsulated | U<sub>avg,bw</sub> from Grade to Depth, W/(m<sup>2</sup>·K)<br>R-0.88 | U<sub>avg,bw</sub> from Grade to Depth, W/(m<sup>2</sup>·K)<br>R-1.76 | U<sub>avg,bw</sub> from Grade to Depth, W/(m<sup>2</sup>·K)<br>R-2.64 |
|---|---|---|---|---|
| 0.3 | 2.468 | 0.769 | 0.458 | 0.326 |
| 0.6 | 1.898 | 0.689 | 0.427 | 0.310 |
| 0.9 | 1.571 | 0.628 | 0.401 | 0.296 |
| 1.2 | 1.353 | 0.579 | 0.379 | 0.283 |
| 1.5 | 1.195 | 0.539 | 0.360 | 0.272 |
| 1.8 | 1.075 | 0.505 | 0.343 | 0.262 |
| 2.1 | 0.980 | 0.476 | 0.328 | 0.252 |
| 2.4 | 0.902 | 0.450 | 0.315 | 0.244 |

Soil conductivity = 1.4 W/(m·K); insulation is over entire depth. For other soil conductivities and partial insulation, use Equation (39).

> U = (2k soil)/πw<sub>b</sub>&emsp;**(39)**

avg,bf

> ( )
>
> ( )

> × ln w<sub>b</sub>/2 + z<sub>f</sub>/2 + (k R soil other)/π – ln +
>
> (z<sub>f</sub>/2 (k R soil other)/π)

> ( )

where

- w<sub>b</sub> = basement width (shortest dimension), m z<sub>f</sub> = floor depth below grade, m (see Figure 14)

<!-- str. 515 -->

**Table 23 Average U-Factor for Basement Floors**

| z<sub>f</sub> (Depth of Floor Below Grade), m | w<sub>b</sub> (Shortest Width of Basement), m<br>6 | U<sub>avg,bf</sub>, W/(m<sup>2</sup>·K) w<sub>b</sub> (Shortest Width of Basement), m<br>7 | U<sub>avg,bf</sub>, W/(m<sup>2</sup>·K) w<sub>b</sub> (Shortest Width of Basement), m<br>8 | w<sub>b</sub> (Shortest Width of Basement), m<br>9 |
|---|---|---|---|---|
| 0.3 | 0.370 | 0.335 | 0.307 | 0.283 |
| 0.6 | 0.310 | 0.283 | 0.261 | 0.242 |
| 0.9 | 0.271 | 0.249 | 0.230 | 0.215 |
| 1.2 | 0.242 | 0.224 | 0.208 | 0.195 |
| 1.5 | 0.220 | 0.204 | 0.190 | 0.179 |
| 1.8 | 0.202 | 0.188 | 0.176 | 0.166 |
| 2.1 | 0.187 | 0.175 | 0.164 | 0.155 |

Soil conductivity is 1.4 W/(m·K); floor is uninsulated. For other soil conductivities and insulation, use Equation (39).

**Table 24 Heat Loss Coefficient Fp of Slab Floor Construction**

| F<sub>p</sub>, W/(m·K)<br>Construction Insulation | F<sub>p</sub>, W/(m·K) |
|---|---|
| 200 mm block wall, brick Uninsulated | 1.17 |
| facing R-0.95 (m<sup>2</sup>·K)/W from edge to footer | 0.86 |
| 100 mm block wall, brick Uninsulated facing | 1.45 |
| R-0.95 (m<sup>2</sup>·K)/W from edge to footer | 0.85 |
| Metal stud wall, stucco Uninsulated | 2.07 |
| R-0.95 (m<sup>2</sup>·K)/W from edge to footer | 0.92 |
| Poured concrete wall with Uninsulated duct near perimeter* | 3.67 |
| R-0.95 (m<sup>2</sup>·K)/W from edge to footer | 1.24 |

*Weighted average temperature of heating duct was assumed at 43°C during heating season (outdoor air temperature less than 18°C).

Representative values of U<sub>avg,bf</sub> for uninsulated basement floors are shown in Table 23.

**At-Grade Surfaces.** Concrete slab floors may be (1) unheated, relying for warmth on heat delivered above floor level by the heating system, or (2) heated, containing heated pipes or ducts that constitute a radiant slab or portion of it for complete or partial heating of the house.

The simplified approach that treats heat loss as proportional to slab perimeter allows slab heat loss to be estimated for both unheated and heated slab floors:

> q = p × HF&emsp;**(40)**
>
> HF = F<sub>p</sub>Δt&emsp;**(41)**

where

- q = heat loss through perimeter, W
- F<sub>p</sub> = heat loss coefficient per metre of perimeter, W/(m·K), Table 24
- p = perimeter (exposed edge) of floor, m

**Surfaces Adjacent to Buffer Space.** Heat loss to adjacent unconditioned or semiconditioned spaces can be calculated using a heating factor based on the partition temperature difference:

> HF = U (t<sub>in</sub> – t<sub>b</sub>)&emsp;**(42)**

### Infiltration

Infiltration of outdoor air through openings into a structure is caused by thermal forces, wind pressure, and negative pressure (planned or unplanned) with respect to the outdoors created by mechanical systems. Typically, in building design, if the mechanical systems are designed to maintain positive building pressure, infiltration need not be considered except in ancillary spaces such as entryways and loading areas.

Infiltration is treated as a room load and has both sensible and latent components. During winter, this means heat and humidity loss because cold, dry air must be heated to design temperature and moisture must be added to increase the humidity to design condition. Typically, during winter, controlling indoor humidity is not a factor and infiltration is reduced to a simple sensible component. Under cooling conditions, both sensible and latent components are added to the space load to be treated by the air conditioning system.Procedures for estimating the infiltration rate are discussed in Chapter 16. The infiltration rate is reduced to a volumetric flow rate at a known dry bulb/wet bulb condition. Along with indoor air condition, the following equations define the infiltration sensible and latent loads.

> q<sub>s</sub>(kW) = [(m<sup>3</sup>/s)/v)]c<sub>p</sub> (t<sub>in</sub> – t<sub>o</sub>)&emsp;**(43)**

where

- m<sup>3</sup>/s = volume flow rate of infiltrating air
- c<sub>p</sub> = specific heat capacity of air, kJ/(kg·K)
- v = specific volume of infiltrating air, m<sup>3</sup>/kg

Assuming standard air conditions (15°C and sea-level conditions) for v and c<sub>p</sub>, Equation (43) may be written as

> q<sub>s</sub>(kW) = 1.23(m<sup>3</sup>/s)(t<sub>in</sub> – t<sub>o</sub>)&emsp;**(44)**

The infiltrating air also introduces a latent heating load given by

> q<sub>l</sub>(kW) = [(m<sup>3</sup>/s)/v](W<sub>in</sub> – W<sub>o</sub>)D<sub>h</sub>&emsp;**(45)**

where

- W<sub>in</sub> = humidity ratio for indoor space air, kg<sub>w</sub>/kg<sub>a</sub>
- W<sub>o</sub> = humidity ratio for outdoor air, kg<sub>w</sub>/kg<sub>a</sub>
- D<sub>h</sub> = change in enthalpy to convert 1 kg water from vapor to liquid, kJ/kg

For standard air and nominal indoor comfort conditions, the latent load may be expressed as

> q<sub>l</sub> = 3010(m<sup>3</sup>/s)(W<sub>in</sub> – W<sub>o</sub>)&emsp;**(46)**

The coefficients 1.23 in Equation (44) and 3010 in Equation (46) are given for standard conditions. They depend on temperature and altitude (and, consequently, pressure).

## 7.2 HEATING SAFETY FACTORS AND LOAD ALLOWANCES

Before mechanical cooling became common in the second half of the 1900s, and when energy was less expensive, buildings included much less insulation; large, operable windows; and generally more infiltration-prone assemblies than the energy-efficient and much tighter buildings typical of today. Allowances of 10 to 20% of the net calculated heating load for piping losses to unheated spaces, and 10 to 20% more for a warm-up load, were common practice, along with other occasional safety factors reflecting the experience and/or concern of the individual designer. Such measures are less conservatively applied today with newer construction. A combined warm-up/safety allowance of 20 to 25% is fairly common but varies depending on the particular climate, building use, and type of construction. Engineering judgment must be applied for the particular project. Armstrong et al. (1992a, 1992b) provide a design method to deal with warm-up and cooldown load.

## 7.3 OTHER HEATING CONSIDERATIONS

Calculation of design heating load estimates has essentially become a subset of the more involved and complex estimation of cooling loads for such spaces. Chapter 19 discusses using the heating load estimate to predict or analyze energy consumption over time. Special provisions to deal with particular applications are covered in the 2019 *ASHRAE Handbook—HVAC Applications* and the 2020 *ASHRAE Handbook—HVAC Systems and Equipment*.

The 1989 ASHRAE Handbook—Fundamentals was the last edition to contain a chapter dedicated only to heating load. Its contents were incorporated into this volume’s Chapter 17, which describes steady-state conduction and convection heat transfer and provides, among other data, information on losses through basement floors and slabs.

<!-- str. 516 -->

**Table 25 Common Sizing Calculations in Other Chapters**

| Subject | Volume/Chapter | Equation(s) |
|---|---|---|
| Duct heat transfer | ASTM Standard C680 |  |
| Piping heat transfer | Fundamentals Ch. 4 | Table 2 |
| Pump power | Systems Ch. 44 | (3), (4) |
| Moist-air sensible heating and cooling | Fundamentals Ch. 1 | (43) |
| Moist-air cooling and dehumidification | Fundamentals Ch. 1 | (45) |
| Air mixing | Fundamentals Ch. 1 | (46) |
| Space heat absorption and moist-air moisture gains | Fundamentals Ch. 1 | (48) |
| Adiabatic mixing of water injected into moist air | Fundamentals Ch. 1 | (47) |

## 8. SYSTEM HEATING AND COOLING LOAD EFFECTS

The heat balance (HB) or radiant time series (RTS) methods are used to determine cooling loads of rooms within a building, but they do not address the plant size necessary to reject the heat. Principal factors to consider in determining the plant size are ventilation, heat transport equipment, and air distribution systems. Some of these factors vary as a function of room load, ambient temperature, and control strategies, so it is often necessary to evaluate the factors and strategies dynamically and simultaneously with the heat loss or gain calculations.

Detailed analysis of system components and methods calculating their contribution to equipment sizing are beyond the scope of this chapter, which is general in nature. Table 25 lists the most frequently used calculations in other chapters and volumes.

## 8.1 ZONING

Organization of building rooms into zones as defined for load calculations and air-handling units has no effect on room cooling loads. However, specific grouping and ungrouping of rooms into zones may cause peak system loads to occur at different times during the day or year, and may significantly affect heat removal equipment sizes.

For example, if each room is cooled by a separate heat removal system, the total capacity of the heat transport systems equals the sum of peak room loads. Conditioning all rooms by a single heat transport system (e.g., a variable-volume air handler) requires less capacity (equal to the simultaneous peak of the combined rooms load, which includes some rooms at off-peak loads). This may significantly reduce equipment capacity, depending on the configuration of the building.

## 8.2 VENTILATION

Consult ASHRAE Standard 62.1 and building codes to determine the required quantity of ventilation air for an application, and the various methods of achieving acceptable indoor air quality. The following discussion is confined to the effect of mechanical ventilation on sizing heat removal equipment. Where natural ventilation is used, through operable windows or other means, it is considered as infiltration and is part of the direct-to-room heat gain. Where ventilation air is conditioned and supplied through the mechanical system, its sensible and latent loads are applied directly to heat transport and central equipment, and do not affect room heating and cooling loads. If the mechanical ventilation rate sufficiently exceeds exhaust airflows, air pressure may be positive and infiltration from envelope openings and outdoor wind may not be included in the load calculations. Chapter 16 includes more information on ventilating commercial buildings.

Depending on ventilation requirements and local climate conditions, peak cooling coil loads may occur at peak dehumidification or enthalpy conditions instead of design dry-bulb conditions. Coil loads should be checked against all those peak conditions.

## 8.3 AIR HEAT TRANSPORT SYSTEMS

Heat transport equipment is usually selected to provide adequate heating or cooling for the peak load condition. However, selection must also consider maintaining desired indoor conditions during all occupied hours, which requires matching the rate of heat transport to room peak heating and cooling loads. Automatic control systems normally vary the heating and cooling system capacity during these off-peak hours of operation.

### On/Off Control Systems

On/off control systems, common in residential and light commercial applications, cycle equipment on and off to match room load. They are adaptable to heating or cooling because they can cycle both heating and cooling equipment. In their purest form, their heat transport matches the combined room and ventilation load over a series of cycles.

### Variable-Air-Volume Systems

Variable-air-volume (VAV) systems have airflow controls that adjust cooling airflow to match the room cooling load. Damper leakage or minimum airflow settings may cause overcooling, so most VAV systems are used in conjunction with separate heating systems. These may be duct-mounted heating coils, or separate radiant or convective heating systems.

The amount of heat added by the heating systems during cooling becomes part of the room cooling load. Calculations must determine the minimum airflow relative to off-peak cooling loads. The quantity of heat added to the cooling load can be determined for each terminal by Equation (8) using the minimum required supply airflow rate and the difference between supply air temperature and the room indoor heating design temperature.

### Constant-Air-Volume Reheat Systems

In constant-air-volume (CAV) reheat systems, all supply air is cooled to remove moisture and then heated to avoid overcooling rooms. Reheat refers to the amount of heat added to cooling supply air to raise the supply air temperature to the temperature necessary for picking up the sensible load. The quantity of heat added can be determined by Equation (8).

With a constant-volume reheat system, heat transport system load does not vary with changes in room load, unless the cooling coil discharge temperature is allowed to vary. Where a minimum circulation rate requires a supply air temperature greater than the available design supply air temperature, reheat adds to the cooling load on the heat transport system. This makes the cooling load on the heat transport system larger than the room peak load.

### Mixed Air Systems

Mixed air systems change the supply air temperature to match the cooling capacity by mixing airstreams of different temperatures; examples include multizone and dual-duct systems. Systems that cool the entire airstream to remove moisture and to reheat some of the air before mixing with the cooling airstream influence load on the heat transport system in the same way a reheat system does. Other systems separate the air paths so that mixing of hot- and colddeck airstreams does not occur. For systems that mix hot and cold airstreams, the contribution to the heat transport system load is determined as follows.

<!-- str. 517 -->

1. Determine the ratio of cold-deck flow to hot-deck flow from

> Q<sub>h</sub>/Q<sub>c</sub> = (T<sub>c</sub> – T<sub>r</sub>)/(T<sub>r</sub> – T<sub>h</sub>)

2. From Equation (9), the hot-deck contribution to room load during off-peak cooling is

> q<sub>rh</sub> = 1.23Q<sub>h</sub>(T<sub>h</sub> – T<sub>r</sub>)

where

- Q<sub>h</sub> = heating airflow, L/s
- Q<sub>c</sub> = cooling airflow, L/s

T<sub>c</sub> =cooling air temperature, °C

T<sub>h</sub> =heating air temperature, °C

T<sub>r</sub> =room or return air temperature, °C q<sub>rh</sub> =heating airflow contribution to room load at off-peak hours, W

### Heat Gain from Fans

Fans that circulate air through HVAC systems add energy to the system through the following processes:

- Increasing velocity and static pressure adds kinetic and potential energy
- Fan inefficiency in producing airflow and static pressure adds sensible heat (fan heat) to the airflow
- Inefficiency of motor and drive dissipates sensible heat

The power required to provide airflow and static pressure can be determined from the first law of thermodynamics with the following equation:

- P<sub>A</sub> = 0.009804Vp where
- P<sub>A</sub> = air power, kW
- V = flow rate, m<sup>3</sup>/s
- p = pressure, kPa at standard air conditions with air density = 1.2 kg/m<sup>3</sup> built into the multiplier 0.009804. The power necessary at the fan shaft must account for fan inefficiencies, which may vary from 50 to 70%. This may be determined from

> P<sub>F</sub> = P<sub>A</sub> /η<sub>F</sub>

where

- P<sub>F</sub> = power required at fan shaft, kW
- η<sub>F</sub> = fan efficiency, dimensionless

The power necessary at the input to the fan motor must account for fan motor inefficiencies and drive losses. Fan motor efficiencies generally vary from 80 to 95%, and drive losses for a belt drive are 3% of the fan power. This may be determined from

> P<sub>M</sub> = (1 + DL) P<sub>F</sub> /E<sub>M</sub>E<sub>D</sub>

where

- P<sub>M</sub> = power required at input to motor, kW
- E<sub>D</sub> = belt drive efficiency, dimensionless
- E<sub>M</sub> = fan motor efficiency, dimensionless
- P<sub>F</sub> = power required at fan shaft, kW
- DL = drive loss, dimensionless

Almost all the energy required to generate airflow and static pressure is ultimately dissipated as heat in the building and HVAC system; a small portion is discharged with any exhaust air. Generally, it is assumed that all the heat is released at the fan rather than dispersed to the remainder of the system. The portion of fan heat released to the airstream depends on the location of the fan motor and drive: if they are within the airstream, all the energy input to the fan motor is released to the airstream. If the fan motor and drive are outdoor the airstream, the energy is split between the airstream and the room housing the motor and drive. Therefore, the following equations may be used to calculate heat generated by fans and motors:

If motor and drive are **outside** the airstream,

> q<sub>fs</sub> = P<sub>F</sub>
>
> q<sub>fr</sub> = (P<sub>M</sub> – P<sub>F</sub>)

If motor and drive are **inside** the airstream,

> q<sub>fs</sub> = P<sub>M</sub>
>
> q<sub>fr</sub> = 0.0

where

- P<sub>F</sub> = power required at fan shaft, kW
- P<sub>M</sub> = power required at input to motor, kW
- q<sub>fs</sub> = heat release to airstream, kW
- q<sub>fr</sub> = heat release to room housing motor and drive, kW

Supply airstream temperature rise may be determined from psychrometric formulas or Equation (8).

Variable- or adjustable-frequency drives (VFDs or AFDs) often drive fan motors in VAV air-handling units. These devices release heat to the surrounding space. Refer to manufacturers’ data for heat released or efficiencies. The disposition of heat released is determined by the drive’s location: in the conditioned space, in the return air path, or in a nonconditioned equipment room. These drives, and other electronic equipment such as building control, data processing, and communications devices, are temperature sensitive, so the rooms in which they are housed require cooling, frequently year round.

### Duct Surface Heat Transfer

Heat transfer across the duct surface is one mechanism for energy transfer to or from air inside a duct. It involves conduction through the duct wall and insulation, convection at inner and outer surfaces, and radiation between the duct and its surroundings. Chapter 4 presents a rigorous analysis of duct heat loss and gain, and Chapter 23 addresses application of analysis to insulated duct systems.

The effect of duct heat loss or gain depends on the duct routing, duct insulation, and its surrounding environment. Consider the following conditions:

- For duct run within the area cooled or heated by air in the duct, heat transfer from the space to the duct has no effect on heating or cooling load, but beware of the potential for condensation on cold ducts.
- For duct run through unconditioned spaces or outdoors, heat transfer adds to the cooling or heating load for the air transport system but not for the conditioned space.
- For duct run through conditioned space not served by the duct, heat transfer affects the conditioned space as well as the air transport system serving the duct.
- For an extensive duct system, heat transfer reduces the effective supply air differential temperature, requiring adjustment through air balancing to increase airflow to extremities of the distribution system.

### Duct Leakage

Air leakage from supply ducts can considerably affect HVAC system energy use. Leakage reduces cooling and/or dehumidifying capacity for the conditioned space, and must be offset by increased airflow (sometimes reduced supply air temperatures), unless leaked air enters the conditioned space directly. Supply air leakage into a ceiling return plenum or leakage from unconditioned spaces into return ducts also affects return air temperature and/or humidity.

<!-- str. 518 -->

Determining leakage from a duct system is complex because of the variables in paths, fabrication, and installation methods. Refer to Chapter 21 and publications from the Sheet Metal and Air Conditioning Contractors’ National Association (SMACNA) for methods of determining leakage. In general, good-quality ducts and postinstallation duct sealing provide highly cost-effective energy savings, with improved thermal comfort and delivery of ventilation air.

### Ceiling Return Air Plenum Temperatures

The space above a ceiling, when used as a return air path, is a ceiling return air plenum, or simply a **return plenum**. Unlike a traditional ducted return, the plenum may have multiple heat sources in the air path. These heat sources may be radiant and convective loads from lighting and transformers; conduction loads from adjacent walls, roofs, or glazing; or duct and piping systems within the plenum.

As heat from these sources is picked up by the unducted return air, the temperature differential between the ceiling cavity and conditioned space is small. Most return plenum temperatures do not rise more than 0.6 to 1.7 K above space temperature, thus generating only a relatively small thermal gradient for heat transfer through plenum surfaces, except to the outdoors. This yields a relatively large-percentage reduction in space cooling load by shifting plenum loads to the system. Another reason plenum temperatures do not rise more is leakage into the plenum from supply air ducts, and, if exposed to the roof, increasing levels of insulation.

Where the ceiling space is used as a return air plenum, energy balance requires that heat picked up from the lights into the return air (1) become part of the cooling load to the return air (represented by a temperature rise of return air as it passes through the ceiling space), (2) be partially transferred back into the conditioned space through the ceiling material below, and/or (3) be partially lost from the space through floor surfaces above the plenum. If the plenum has one or more exterior surfaces, heat gains through them must be considered; if adjacent to spaces with different indoor temperatures, partition loads must be considered, too. In a multistory building, the conditioned space frequently gains heat through its floor from a similar plenum below, offsetting the floor loss. The radiant component of heat leaving the ceiling or floor surface of a plenum is normally so small, because of relatively small temperature differences, that all such heat transfer is considered convective for calculation purposes (Rock and Wolfe 1997).

Figure 15 shows a schematic of a typical return air plenum. The following equations, using the heat flow directions shown in Figure 15, represent the heat balance of a return air plenum design for a typical interior room in a multifloor building:

> q<sub>1</sub> = U<sub>c</sub>A<sub>c</sub>(*t<sub>p</sub> – t<sub>r</sub>*)&emsp;**(47)**

![Fig. 15 Schematic Diagram of Typical Return Air Plenum](img/ch18/fig-15.png)

*Fig. 15 Schematic Diagram of Typical Return Air Plenum*

> q<sub>2</sub> = U<sub>f</sub>A<sub>f</sub>(*t<sub>p</sub> – t<sub>fa</sub>*)&emsp;**(48)**
>
> q<sub>3</sub> = 1.1Q(*t<sub>p</sub> – t<sub>r</sub>*)&emsp;**(49)**

> *q<sub>lp</sub> – q*<sub>2</sub> – q<sub>1</sub> – q<sub>3</sub>= 0&emsp;**(50)**
>
> Q = (q<sub>r</sub>+ q<sub>1</sub>)/(1.23(t<sub>r</sub>– t<sub>s</sub>))&emsp;**(51)**

where

- q<sub>1</sub> = heat gain to space from plenum through ceiling, kW
- q<sub>2</sub> = heat loss from plenum through floor above, kW
- q<sub>3</sub> = heat gain “pickup” by return air, kW
- Q = return airflow, L/s
- q<sub>lp</sub> = light heat gain to plenum via return air, kW
- q<sub>lr</sub> = light heat gain to space, kW
- q<sub>f</sub> = heat gain from plenum below, through floor, kW
- q<sub>w</sub> = heat gain from exterior wall, kW
- q<sub>r</sub> = space cooling load, including appropriate treatment of q<sub>lr</sub>, q<sub>f</sub>, and/or q<sub>w</sub>, kW
- t<sub>p</sub> = plenum air temperature, °C
- t<sub>r</sub> = space air temperature, °C
- t<sub>fa</sub> = space air temperature of floor above, °C
- t<sub>s</sub> = supply air temperature, °C

By substituting Equations (47), (48), (49), and (51) into heat balance Equation (50), t<sub>p</sub>can be found as the resultant return air temperature or plenum temperature. The results, although rigorous and best solved by computer, are important in determining the cooling load, which affects equipment size selection, future energy consumption, and other factors.

Equations (47) to (51) are simplified to illustrate the heat balance relationship. Heat gain into a return air plenum is not limited to heat from lights. Exterior walls directly exposed to the ceiling space can transfer heat directly to or from return air. For single-story buildings or the top floor of a multistory building, roof heat gain or loss enters or leaves the ceiling plenum rather than the conditioned space directly. The supply air quantity calculated by Equation (51) is only for the conditioned space under consideration, and is assumed to equal the return air quantity.

The amount of airflow through a return plenum above a conditioned space may not be limited to that supplied into the space; it will, however, have no noticeable effect on plenum temperature if the surplus comes from an adjacent plenum operating under similar conditions. Where special conditions exist, Equations (47) to (51) must be modified appropriately. Finally, although the building’s thermal storage has some effect, the amount of heat entering the return air is small and may be considered as convective for calculation purposes.

### Ceiling Plenums with Ducted Returns

Compared to those in unducted plenum returns, temperatures in ceiling plenums that have well-sealed return or exhaust air ducts float considerably. In cooling mode, heat from lights and other equipment raises the ceiling plenum’s temperature considerably. Solar heat gain through a poorly insulated roof can drive the ceiling plenum temperature to extreme levels, so much so that heat gains to uninsulated supply air ducts in the plenum can dramatically decrease available cooling capacity to the rooms below. In cold weather, much heat is lost from warm supply ducts. Thus, insulating supply air ducts and sealing them well to minimize air leaks are highly desirable, if not essential. Appropriately insulating roofs and plenums’ exterior walls and minimizing infiltration are also key to lowering total building loads and improving HVAC system performance.

<!-- str. 519 -->

### Underfloor Air Distribution Systems

Room cooling loads determined by methods in this chapter cannot model two distinguishing aspects of the thermal performance of underfloor air distribution (UFAD) systems under cooling operation:

- Room air stratification: UFAD systems supply cool air at the floor and extract warmer air at the ceiling, thus creating vertical thermal stratification. Cooling load models assume a well-mixed uniform space temperature.
- Underfloor air supply plenums: cool supply air flowing through the underfloor plenum is exposed to heat gain from both the concrete slab (conducted from the warm return air on the adjacent floor below in a multistory building) and the raised floor panels (conducted from the warmer room above).

Extensive simulation and experimental research led to the development of a whole-building energy simulation program capable of modeling energy performance and load calculations for UFAD systems (Bauman et al. 2007; Webster et al. 2008). Previously, it was thought that cooling loads for UFAD and overhead (OH) mixing systems were nearly identical. However, energy modeling studies show that the UFAD cooling load is generally higher than that calculated in the same building for a well-mixed system (Schiavon et al. 2010a). The difference is primarily caused by the thermal storage effect of the lower-mass raised-floor panels compared to the greater mass of a structural floor slab. Schiavon et al. (2010b) showed that the presence of the raised floor reduces the slab’s ability to store heat, thereby producing higher peak cooling loads for a raised-floor system than for one without a raised floor. A second contributing factor is that the raised-floor surface above the underfloor plenum tends to be cooler (except when illuminated by the sun) than most other room surfaces, producing a room surface temperature distribution resembling a chilled radiant floor system, which has a different peak cooling load than an all-air system (Feng et al. 2012). The precise magnitude of difference in design cooling loads between OH and UFAD systems is still under investigation, but mainly depends on zone orientation and floor level, and possibly the effects of furniture. Methods for determining UFAD cooling loads will be updated as additional research results become available. For more information about simplified approaches to UFAD cooling load calculations, see the ASHRAE *Underfloor Air Distri-* *bution (UFAD) Design Guide* (ASHRAE 2013), Bauman et al. (2010), and Schiavon et al. (2010c).

### Plenums in Load Calculations

Currently, most designers include ceiling and floor plenums within neighboring occupied spaces when thermally zoning a building. However, temperatures in these plenums, and the way that they behave, are significantly different from those of occupied spaces. Thus, they should be defined as a separate thermal zone. Most hand and computer-based load calculation routines, though, currently do not allow floating air temperatures or humidities; assuming a constant air temperature in plenums, attics, and other unconditioned spaces is a poor, but often necessary, assumption. The heat balance method does allow floating space conditions, and when fully implemented in design load software, should allow more accurate modeling of plenums and other complex spaces.

## 8.4 CENTRAL PLANT

### Piping

Losses must be considered for piping systems that transport heat. For water or hydronic piping systems, heat is transferred through the piping and insulation (see Chapter 23 for ways to determine this transfer). However, distribution of this transferred heat depends on the fluid in the pipe and the surrounding environment.

Consider a heating hot-water pipe. If the pipe serves a room heater and is routed through the heated space, any heat loss from the pipe adds heat to the room. Heat transfer to the heated space and heat loss from the piping system is null. If the piping is exposed to ambient conditions en route to the heater, the loss must be considered when selecting the heating equipment; if the pipe is routed through a space requiring cooling, heat loss from the piping also becomes a load on the cooling system.

In summary, the designer must evaluate both the magnitude of the pipe heat transfer and the routing of the piping.

### Pumps

Calculating heat gain from pumps is addressed in the section on Electric Motors. For pumps serving hydronic systems, disposition of heat from the pumps depends on the service. For chilled-water systems, energy applied to the fluid to generate flow and pressure becomes a chiller load. For condenser water pumps, pumping energy must be rejected through the cooling tower. The magnitude of pumping energy relative to cooling load is generally small.

## 9. EXAMPLE COOLING AND HEATING LOAD CALCULATIONS

To illustrate the cooling and heating load calculation procedures discussed in this chapter, an example problem has been developed based on the ASHRAE headquarters building located in Atlanta, Georgia. This example is a two-story office building of approximately 3250 m<sup>2</sup>, including a variety of common office functions and occupancies. In addition to demonstrating calculation procedures, a hypothetical design/construction process is discussed to illustrate (1) application of load calculations and (2) the need to develop reasonable assumptions when specific data are not yet available, as often occurs in everyday design processes.

Table 26 summarizes RTS load calculation procedures.

## 9.1 SINGLE-ROOM EXAMPLE

Calculate the peak heating and cooling loads for the office room shown in Figure 16, for Atlanta, Georgia. The room is on the second floor of a two-story building and has two vertical exterior exposures, with a flat roof above.

![Fig. 16 Single-Room Example Office](img/ch18/fig-16.png)

*Fig. 16 Single-Room Example Office*

<!-- str. 520 -->

**Table 26 Summary of RTS Load Calculation Procedures**

| Equation No. in Equation Chapter | Equation No. in Equation Chapter |
|---|---|
| External Heat Gain | *Partitions, Ceilings, Floors Transmission* |
| Sol-Air Temperature | q = UA(t<sub>b</sub> – t<sub>i</sub>) (32) |
| αE<sub>t</sub> |  |
| εΔR t<sub>e</sub> = t<sub>o</sub> + -------- – --------- (29) | where |
| h<sub>o</sub> h<sub>o</sub> | q = heat transfer rate, W |
| where | U = coefficient of overall heat transfer between adjacent and |
| t<sub>e</sub> = sol-air temperature, °C | conditioned space, W/(m<sup>2</sup>·K) |
| t<sub>o</sub> = outdoor air temperature, °C | A = area of separating section concerned, m<sup>2</sup> |
| a = absorptance of surface for solar radiation | t<sub>b</sub> = average air temperature in adjacent space, °C |
| E<sub>t</sub> = total solar radiation incident on surface, W/m<sup>2</sup> | t<sub>i</sub> = air temperature in conditioned space, °C |
| = coefficient of heat transfer by long-wave radiation and h<sub>o</sub> convection at outer surface, W/(m<sup>2</sup>·K) | Internal Heat Gain<br>Occupants |
| ε = hemispherical emittance of surface | q<sub>s</sub> = q<sub>s,per</sub>N |
| ΔR = difference between long-wave radiation incident on surface from sky and surroundings and radiation emitted by blackbody at outdoor air temperature, W/m<sup>2</sup>; 20 for horizontal surfaces; 0 for vertical surfaces | q<sub>l</sub> = q<sub>l,per</sub>N where q<sub>s</sub> = occupant sensible heat gain, W q<sub>l</sub> = occupant latent heat gain, W |
| *Wall and Roof Transmission* q<sub>θ</sub> = c<sub>0</sub>q<sub>i,θ</sub> + c<sub>1</sub>q<sub>i,θ-1</sub> + c<sub>2</sub>q<sub>i,θ-2</sub> + … + c<sub>23</sub>q<sub>i,θ-23</sub> (31) | = q<sub>l,per</sub> latent heat gain per person, W/person; see Table 1 |
| q<sub>i,θ-n</sub> = UA(t<sub>e,θ-n</sub> – t<sub>rc</sub>) (30) | N = number of occupants |
| where | Lighting |
| q<sub>θ</sub> = hourly conductive heat gain for surface, W | q<sub>el</sub> = WF<sub>ul</sub>F<sub>sa</sub> (1) |
| q<sub>i,θ</sub> = heat input for current hour | where |
| q<sub>i,θ-n</sub> = conductive heat input for surface n hours ago, W | q<sub>el</sub> = heat gain, W |
| c<sub>0</sub>, c<sub>1</sub>, etc. = conduction time factors | W = total light wattage, W |
| U = overall heat transfer coefficient for surface, W/(m<sup>2</sup>·K) | F<sub>ul</sub> = lighting use factor |
| A = surface area, m<sup>2</sup> | F<sub>sa</sub> = lighting special allowance factor |
| Fenestration Transmission |  |
| q<sub>c</sub>= UA(T<sub>out</sub>– T<sub>in</sub>) (14) | Electric Motors |
| where | q<sub>em</sub> = (P/E<sub>M</sub>)F<sub>UM</sub>F<sub>LM</sub> (2) |
| q = fenestration transmission heat gain, W | where |
| U = overall U-factor, including frame and mounting orientation | q<sub>em</sub> = heat equivalent of equipment operation, W |
| from Table 4 of Chapter 15, W/(m<sup>2</sup>·K) | P = motor power rating, W |
| A = window area, m<sup>2</sup> | E<sub>M</sub> = motor efficiency, decimal fraction <1.0 |
| T<sub>in</sub> = indoor temperature, °C | F<sub>UM</sub> = motor use factor, 1.0 or decimal fraction <1.0 |
| T<sub>out</sub> = outdoor temperature, °C | F<sub>LM</sub> = motor load factor, 1.0 or decimal fraction <1.0 |
| Fenestration Solar |  |
| T<sub>out</sub> = outdoor temperature, °C | *Hooded Cooking Appliances* |
| q = AE SHGC(θ)IAC(θ,Ω) b t,b (12) | q<sub>s</sub> = q<sub>input</sub>F<sub>U</sub>F<sub>R</sub> |
| q<sub>d</sub>= A(E<sub>t,d</sub>+ E<sub>t,r</sub>)⟨SHGC⟩<sub>D</sub> IAC<sub>D</sub> (13) | where |
| where | q<sub>s</sub> = sensible heat gain, W |
| q<sub>b</sub> = beam solar heat gain, W | q<sub>input</sub> = nameplate or rated energy input, W |
| q<sub>d</sub> = diffuse solar heat gain, W | F<sub>U</sub> = usage factor; see Tables 5B, 5C, 5D |
| A = window area, m<sup>2</sup> | F<sub>R</sub> = radiation factor; see Tables 5B, 5C, 5D |
| E<sub>t,b</sub>, E<sub>t,d</sub>, = beam, sky diffuse, and ground-reflected diffuse irradiance, | For other appliances and equipment, find q<sub>s</sub> for |
| and E<sub>t,r</sub> calculated using equations in Chapter 14 | Unhooded cooking appliances: Table 5A |
| = beam solar heat gain coefficient as a function of incident angle θ; may be interpolated between values in Table 10 | Other kitchen equipment: Table 5E |
| SHGC(θ) of Chapter 15 | Hospital and laboratory equipment: Tables 6 and 7<br>Computers, printers, scanners, etc.: Tables 8 and 9 |
| = indoor solar attenuation coefficient for beam solar heat gain coefficient; = 1.0 if no indoor shading device. | Miscellaneous office equipment: Table 10<br>Find q<sub>l</sub> for |
| IAC(θ.Ω) is a function of shade type and, depending on |  |
| IAC(θ.Ω) type, may also be a function of beam solar angle of incidence θ and shade geometry | Unhooded cooking appliances: Table 5A<br>Other kitchen equipment: Table 5E<br>Ventilation and Infiltration Air Heat Gain |
| IAC<sub>D</sub> = indoor solar attenuation coefficient for diffuse solar heat gain coefficient; = 1.0 if not indoor shading device. IAC<sub>D</sub> is a function of shade type and, depending on type, may also be a function of shade geometry | q<sub>s</sub> = 1.23Q<sub>s</sub> Δt (9) q<sub>l</sub> = 1.20 × 2500Q<sub>s</sub> ΔW = 3010Q<sub>s</sub> ΔW (10) where q<sub>s</sub> = sensible heat gain due to infiltration, W |

<!-- str. 521 -->

**Table 26 Summary of RTS Load Calculation Procedures (Concluded)**

| Equation No. in Equation Chapter | Equation No. in Equation Chapter |
|---|---|
| q<sub>l</sub> = latent heat gain due to infiltration, W | q<sub>r,θ</sub> = q<sub>i,s</sub>F<sub>r</sub> |
| Q<sub>s</sub> = infiltration airflow at standard air conditions, m<sup>3</sup>/s | where |
| t<sub>o</sub> = outdoor air temperature, °C | q<sub>i,s</sub> = sensible heat gain from heat gain element i, W |
| t<sub>i</sub> = indoor air temperature, °C | F<sub>r</sub> = fraction of heat gain that is radiant. |
| W<sub>o</sub> = outdoor air humidity ratio, kg/kg | Data Sources: |
| W<sub>i</sub> = indoor air humidity ratio, kg/kg | Wall transmission: see Table 14 |
| 1.23 = air sensible heat factor at standard air conditions, | Roof transmission: see Table 14 |
| W/(m<sup>3</sup>·s) |  |
|  | Floor transmission: see Table 14 |
| 3010 = air latent heat factor at standard air conditions, | Fenestration transmission: see Table 14 |
| W/(m<sup>3</sup>·s) |  |
|  | Fenestration solar heat gain: see Table 14, Chapter 18 |
| Instantaneous Room Cooling Load | and Tables 14A to 14G, Chapter 15<br>Lighting: see Table 3 |
| Q<sub>s</sub> = ΣQ<sub>i,r</sub> + ΣQ<sub>i,c</sub> |  |
|  | Occupants: see Tables 1 and 14 |
| Q<sub>l</sub> = Σq<sub>i,l</sub> | Hooded cooking appliances: see Tables 5B, 5C, and 5D |
| where | Unhooded cooking appliances: see Table 5A |
| Q<sub>s</sub> = room sensible cooling load, W | Other appliances and equipment: see Tables 5E, 8, |
| Q<sub>i,r</sub> = radiant portion of sensible cooling load for current hour, | 9, 10, and 14 |
| resulting from heat gain element i, W | Infiltration: see Table 14 |
| Q<sub>i,c</sub> = convective portion of sensible cooling load, resulting from heat gain element i, W | Lighting: see Table 3 |
| Q<sub>l</sub> = room latent cooling load, W | *Convective Portion of Sensible Cooling Load* |
| q<sub>i,l</sub> = latent heat gain for heat gain element i, W | Q<sub>i,c</sub> = q<sub>i,c</sub> |
| *Radiant Portion of Sensible Cooling Load* |  |
|  | where q<sub>i,c</sub> is convective portion of heat gain from heat gain |
| Q<sub>i,r</sub> = Q<sub>r,θ</sub> | element i, W. |
| … |  |
| Q<sub>r,θ</sub> = r<sub>0</sub>q<sub>r,θ</sub> + r<sub>1</sub>q<sub>r,θ–1</sub> + r<sub>2</sub>q<sub>r,θ–2</sub> + r<sub>3</sub>q<sub>r,θ–3</sub> + + r<sub>23</sub>q<sub>r,θ–23</sub> (33) | q<sub>i,c</sub> = q<sub>i,s</sub>(1 – F<sub>r</sub>) |
| where | where |
| Q<sub>r,θ</sub> = radiant cooling load Q<sub>r</sub> for current hour θ, W | q<sub>i,s</sub> = sensible heat gain from heat gain element i, W |
| q<sub>r,θ</sub> = radiant heat gain for current hour, W | fraction of heat gain that is radiant; see row for radiant portion<br>F<sub>r</sub> for sources of radiant fraction data for individual heat gain |
| q<sub>r,θ−n</sub> = radiant heat gain n hours ago, W r<sub>0</sub>, r<sub>1</sub>, etc. = radiant time factors; see Table 19 for radiant time factors for nonsolar heat gains: wall, roof, partition, ceiling, floor, fenestration transmission heat gains, and occupant, lighting, motor, appliance heat gain. Also used for fenestration diffuse solar heat gain; see Table 20 for radiant time factors for fenestration beam solar heat gain. | = elements |

### Room Characteristics

Area: 12 m<sup>2</sup>.

Floor: Carpeted 127 mm concrete slab on metal deck above a conditioned space.

Roof: Flat metal deck topped with rigid closed-cell polyisocyanurate foam core insulation (R = 5.3), and light-colored membrane roofing. Space above 2.75 m suspended acoustical tile ceiling is used as a return air plenum. Assume 30% of cooling load from the roof is directly absorbed in the return airstream without becoming room load. Use roof U = 0.18 W/(m<sup>2</sup>·K).

Spandrel wall: Spandrel bronze-tinted glass, opaque, backed with air space, rigid mineral fiber insulation (R = 0.88), mineral fiber batt insulation (R = 2.3), and 16 mm gypsum wall board. Use spandrel wall U = 0.44 W/(m<sup>2</sup>/K).

Brick wall: Light-brown-colored face brick (102 mm), low-mass concrete block (152 mm), rigid continuous insulation (R = 0.88), mineral fiber batt insulation (R = 2.3), and gypsum wall board (16 mm). Use brick wall U = 0.44 W/(m<sup>2</sup>·K).

Windows: Double glazed, 6 mm bronze-tinted outdoor pane, 13 mm air space and 6 mm clear indoor pane with light-colored interior miniblinds. Window normal solar heat gain coefficient (SHGC) = 0.49. Windows are nonoperable and mounted in aluminum frames with thermal breaks having overall combined U = 3.18 W/(m<sup>2</sup>·K) (based on Type 5d from Tables 4 and 10 of Chapter 15). Indoor attenuation coefficients (IACs) for indoor miniblinds are based on light venetian blinds (assumed louver reflectance = 0.8 and louvers positioned at 45° angle) with heat-absorbing double glazing (Type 5d from Table 14B of Chapter 15), IAC(0) = 0.74, IAC(60) = 0.65, IAD(diff) = 0.79, and radiant fraction = 0.54. Each window is 1.91 m wide by 1.95 m tall for an area per window = 3.72 m<sup>2</sup>.

South exposure: Orientation = 30° east of true south

> Window area = 3.72 m<sup>2</sup>
>
> Spandrel wall area = 5.57 m<sup>2</sup>

> Brick wall area = 5.57 m<sup>2</sup>

West exposure: Orientation = 60° west of south

> Window area = 3.72 m<sup>2</sup>
>
> Spandrel wall area = 5.57 m<sup>2</sup>

> Brick wall area = 3.72 m<sup>2</sup>

Occupancy: 1 person from 8:00 AM to 5:00 PM.

Lighting: One 4-lamp pendant fluorescent 2440 mm type. The fixture has four 32 W T-8 lamps plus electronic ballasts (special allowance factor 0.85 per manufacturer’s data), for a total of 110 W for the room. Operation is from 7:00 AM to 7:00 PM. Assume 0% of cooling load from lighting is directly absorbed in the return airstream without becoming room load, per Table 3.

<!-- str. 522 -->

**Table 27 Monthly/Hourly 5% Design Temperatures for Hartsfield-Jackson Atlanta International Airport, °C**

| Hour | January<br>db | January<br>wb | February<br>db | February<br>wb | March<br>db | March<br>wb | April<br>db | April<br>wb | May<br>db | May<br>wb | June<br>db | June<br>wb | July<br>db | July<br>wb | August<br>db | August<br>wb | September<br>db | September<br>wb | October<br>db | October<br>wb | November<br>db | November<br>wb | December<br>db | December<br>wb |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 7.7 | 7.3 | 8.6 | 7.3 | 12.1 | 9.7 | 15.4 | 12.8 | 19.4 | 16.8 | 22.3 | 19.3 | 23.2 | 20.5 | 23.2 | 20.5 | 20.9 | 18.2 | 15.7 | 13.8 | 11.1 | 10.2 | 8.6 | 8.6 |
| 2 | 7.3 | 7.1 | 8.2 | 7.1 | 11.6 | 9.4 | 15.0 | 12.6 | 18.9 | 16.6 | 21.8 | 19.1 | 22.8 | 20.4 | 22.8 | 20.4 | 20.4 | 18.0 | 15.2 | 13.6 | 10.6 | 9.9 | 8.2 | 8.2 |
| 3 | 6.9 | 6.8 | 7.8 | 6.8 | 11.2 | 9.3 | 14.6 | 12.4 | 18.6 | 16.5 | 21.5 | 19.0 | 22.4 | 20.3 | 22.4 | 20.3 | 20.2 | 17.9 | 14.9 | 13.4 | 10.2 | 9.7 | 7.8 | 7.8 |
| 4 | 6.6 | 6.6 | 7.4 | 6.6 | 10.8 | 9.1 | 14.2 | 12.3 | 18.3 | 16.4 | 21.2 | 18.9 | 22.1 | 20.2 | 22.1 | 20.2 | 19.8 | 17.8 | 14.6 | 13.3 | 9.9 | 9.5 | 7.5 | 7.5 |
| 5 | 6.4 | 6.4 | 7.2 | 6.4 | 10.6 | 8.9 | 14.0 | 12.2 | 18.1 | 16.3 | 20.9 | 18.8 | 21.9 | 20.1 | 21.9 | 20.1 | 19.6 | 17.7 | 14.3 | 13.2 | 9.7 | 9.4 | 7.3 | 7.3 |
| 6 | 6.6 | 6.6 | 7.4 | 6.6 | 10.8 | 9.1 | 14.2 | 12.3 | 18.3 | 16.4 | 21.2 | 18.9 | 22.1 | 20.2 | 22.1 | 20.2 | 19.8 | 17.8 | 14.6 | 13.3 | 9.9 | 9.5 | 7.5 | 7.5 |
| 7 | 7.4 | 7.1 | 8.3 | 7.1 | 11.7 | 9.5 | 15.1 | 12.7 | 19.1 | 16.7 | 21.9 | 19.2 | 22.9 | 20.4 | 22.9 | 20.4 | 20.6 | 18.1 | 15.3 | 13.7 | 10.7 | 10.0 | 8.3 | 8.3 |
| 8 | 9.2 | 8.4 | 10.2 | 8.4 | 13.8 | 10.6 | 17.2 | 13.6 | 20.9 | 17.4 | 23.8 | 19.8 | 24.8 | 21.0 | 24.7 | 21.0 | 22.4 | 18.7 | 17.3 | 14.5 | 12.7 | 11.1 | 10.1 | 9.6 |
| 9 | 11.3 | 9.8 | 12.4 | 9.8 | 16.2 | 11.7 | 19.5 | 14.6 | 23.1 | 18.2 | 25.9 | 20.5 | 26.9 | 21.6 | 26.8 | 21.6 | 24.4 | 19.4 | 19.4 | 15.4 | 14.9 | 12.3 | 12.2 | 10.9 |
| 10 | 13.1 | 11.1 | 14.4 | 11.0 | 18.3 | 12.7 | 21.6 | 15.4 | 25.0 | 18.9 | 27.9 | 21.1 | 28.8 | 22.2 | 28.6 | 22.2 | 26.2 | 20.1 | 21.3 | 16.3 | 16.9 | 13.4 | 14.0 | 12.2 |
| 11 | 14.7 | 12.3 | 16.2 | 12.1 | 20.2 | 13.7 | 23.4 | 16.2 | 26.7 | 19.5 | 29.6 | 21.7 | 30.6 | 22.7 | 30.2 | 22.7 | 27.8 | 20.6 | 23.1 | 17.1 | 18.6 | 14.4 | 15.6 | 13.3 |
| 12 | 15.8 | 13.0 | 17.3 | 12.9 | 21.4 | 14.3 | 24.6 | 16.8 | 27.8 | 19.9 | 30.7 | 22.0 | 31.7 | 23.1 | 31.3 | 23.0 | 28.8 | 21.0 | 24.2 | 17.5 | 19.8 | 15.1 | 16.7 | 14.1 |
| 13 | 16.7 | 13.6 | 18.3 | 13.4 | 22.4 | 14.8 | 25.6 | 17.2 | 28.7 | 20.2 | 31.6 | 22.3 | 32.6 | 23.3 | 32.2 | 23.3 | 29.7 | 21.3 | 25.1 | 17.9 | 20.7 | 15.6 | 17.6 | 14.6 |
| 14 | 17.2 | 14.0 | 18.8 | 13.8 | 23.1 | 15.1 | 26.2 | 17.4 | 29.2 | 20.4 | 32.1 | 22.5 | 33.1 | 23.5 | 32.7 | 23.4 | 30.2 | 21.5 | 25.7 | 18.2 | 21.3 | 15.9 | 18.1 | 15.0 |
| 15 | 17.2 | 14.0 | 18.8 | 13.8 | 23.1 | 15.1 | 26.2 | 17.4 | 29.2 | 20.4 | 32.1 | 22.5 | 33.1 | 23.5 | 32.7 | 23.4 | 30.2 | 21.5 | 25.7 | 18.2 | 21.3 | 15.9 | 18.1 | 15.0 |
| 16 | 16.6 | 13.6 | 18.1 | 13.4 | 22.3 | 14.7 | 25.5 | 17.1 | 28.6 | 20.2 | 31.4 | 22.3 | 32.4 | 23.3 | 32.1 | 23.2 | 29.6 | 21.3 | 25.0 | 17.9 | 20.6 | 15.5 | 17.4 | 14.6 |
| 17 | 15.7 | 12.9 | 17.2 | 12.8 | 21.3 | 14.2 | 24.5 | 16.7 | 27.7 | 19.9 | 30.6 | 22.0 | 31.6 | 23.0 | 31.2 | 23.0 | 28.7 | 20.9 | 24.1 | 17.5 | 19.7 | 15.0 | 16.6 | 14.0 |
| 18 | 14.6 | 12.2 | 16.1 | 12.1 | 20.1 | 13.6 | 23.3 | 16.2 | 26.6 | 19.4 | 29.4 | 21.6 | 30.4 | 22.7 | 30.1 | 22.7 | 27.7 | 20.6 | 22.9 | 17.0 | 18.5 | 14.3 | 15.5 | 13.2 |
| 19 | 13.0 | 11.1 | 14.3 | 10.9 | 18.2 | 12.7 | 21.4 | 15.4 | 24.9 | 18.8 | 27.8 | 21.1 | 28.7 | 22.2 | 28.5 | 22.2 | 26.1 | 20.0 | 21.2 | 16.2 | 16.7 | 13.3 | 13.9 | 12.2 |
| 20 | 11.8 | 10.2 | 13.1 | 10.2 | 16.8 | 12.0 | 20.1 | 14.8 | 23.7 | 18.4 | 26.6 | 20.7 | 27.5 | 21.8 | 27.3 | 21.8 | 24.9 | 19.6 | 20.0 | 15.7 | 15.5 | 12.7 | 12.7 | 11.3 |
| 21 | 10.8 | 9.6 | 12.0 | 9.5 | 15.7 | 11.4 | 19.0 | 14.3 | 22.6 | 18.0 | 25.5 | 20.3 | 26.5 | 21.5 | 26.3 | 21.5 | 23.9 | 19.3 | 19.0 | 15.2 | 14.4 | 12.1 | 11.7 | 10.7 |
| 22 | 9.8 | 8.9 | 10.9 | 8.8 | 14.6 | 10.9 | 17.9 | 13.8 | 21.6 | 17.6 | 24.5 | 20.0 | 25.5 | 21.2 | 25.3 | 21.2 | 23.0 | 18.9 | 17.9 | 14.8 | 13.4 | 11.4 | 10.7 | 10.0 |
| 23 | 9.1 | 8.3 | 10.1 | 8.3 | 13.7 | 10.5 | 17.1 | 13.5 | 20.8 | 17.3 | 23.7 | 19.8 | 24.7 | 20.9 | 24.6 | 20.9 | 22.3 | 18.7 | 17.2 | 14.4 | 12.6 | 11.0 | 10.0 | 9.5 |
| 24 | 8.3 | 7.8 | 9.3 | 7.8 | 12.8 | 10.1 | 16.2 | 13.1 | 20.1 | 17.1 | 22.9 | 19.5 | 23.9 | 20.7 | 23.8 | 20.7 | 21.5 | 18.4 | 16.4 | 14.1 | 11.8 | 10.6 | 9.2 | 9.0 |

Equipment: One computer and a personal printer are used, for which an allowance of 10.76 W/m<sup>2</sup> is to be accommodated by the cooling system, for a total of 130 W for the room. Operation is from 8:00 AM to 5:00 PM.

Infiltration: For purposes of this example, assume the building is maintained under positive pressure during peak cooling conditions and therefore has no infiltration. Assume that infiltration during peak heating conditions is equivalent to one air change per hour.

Weather data: Per Chapter 14, for Atlanta, Georgia, latitude = 33.64, longitude = 84.43, elevation = 313 m above sea level, 99.6% heating design dry-bulb temperature = –5.6°C. For cooling load calculations, use 5% dry-bulb/coincident wet-bulb monthly design day profile calculated per Chapter 14. See Table 27 for temperature profiles used in these examples.

*Indoor design conditions*: 22.2°C for heating; 23.9°C with 50% rh for cooling.

### Cooling Loads Using RTS Method

Traditionally, simplified cooling load calculation methods have estimated the total cooling load at a particular design condition by independently calculating and then summing the load from each component (walls, windows, people, lights, etc). Although the actual heat transfer processes for each component do affect each other, this simplification is appropriate for design load calculations and useful to the designer in understanding the relative contribution of each component to the total cooling load.

Cooling loads are calculated with the RTS method on a component basis similar to previous methods. The following example parts illustrate cooling load calculations for individual components of this single room for a particular hour and month. Equations used are summarized in Table 26.

**Part 1. Internal cooling load using radiant time series.** Calculate the cooling load from lighting at 3:00 PM for the previously described office. **Solution:** First calculate the 24 h heat gain profile for lighting, then split those heat gains into radiant and convective portions, apply the appropriate RTS to the radiant portion, and sum the convective and radiant cooling load components to determine total cooling load at the designated time. Using Equation (1), the lighting heat gain profile, based on the occupancy schedule indicated is q<sub>1</sub> = (110 W)(0%) = 0 q<sub>13</sub> = (110 W)(100%) = 110 q<sub>2</sub> = (110 W)(0%) = 0 q<sub>14</sub> = (110 W)(100%) = 110 q<sub>3</sub> = (110 W)(0%) = 0 q<sub>15</sub> = (110 W)(100%) = 110 q<sub>4</sub> = (110 W)(0%) = 0 q<sub>16</sub> = (110 W)(100%) = 110 q<sub>5</sub> = (110 W)(0%) = 0 q<sub>17</sub> = (110 W)(100%) = 110 q<sub>6</sub> = (110 W)(0%) = 0 q<sub>18</sub> = (110 W)(100%) = 110 q<sub>7</sub> = (110 W)(100%) = 110 q<sub>19</sub> = (110 W)(0%) = 0 q<sub>8</sub> = (110 W)(100%) = 110 q<sub>20</sub> = (110 W)(0%) = 0 q<sub>9</sub> = (110 W)(100%) = 110 q<sub>21</sub> = (110 W)(0%) = 0 q<sub>10</sub> = (110 W)(100%) = 110 q<sub>22</sub> = (110 W)(0%) = 0 q<sub>11</sub> = (110 W)(100%) = 110 q<sub>23</sub> = (110 W)(0%) = 0 q<sub>12</sub> = (110 W)(100%) = 110 q<sub>24</sub> = (110 W)(0%) = 0

The convective portion is simply the lighting heat gain for the hour being calculated times the convective fraction for non-in-ceiling fluorescent luminaire (pendant), from Table 3:

- Q<sub>c,15</sub> = (110)(43%) = 47.3 W

The radiant portion of the cooling load is calculated using lighting heat gains for the current hour and past 23 h, the radiant fraction from Table 3 (57%), and radiant time series from Table 19, in accordance with Equation (33). From Table 19, select the RTS for medium-weight construction, assuming 50% glass and carpeted floors as representative of the described construction. Thus, the radiant cooling load for lighting is

> …

Q<sub>r,15</sub> = r<sub>0</sub>(0.48)q<sub>15</sub> + r<sub>1</sub>(0.48)q<sub>14</sub> + r<sub>2</sub>(0.48)q<sub>13</sub> + r<sub>3</sub>(0.48)q<sub>12</sub>+

> + r<sub>23</sub>(0.48)q<sub>16</sub>
>
> = (0.49)(0.57)(110) + (0.17)(0.57)(110) + (0.09)(0.57)(110)

> + (0.05)(0.57)(110) + (0.03)(0.57)(110) + (0.02)(0.57)(110)
>
> + (0.02)(0.57)(110) + (0.01)(0.57)(110) + (0.01)(0.57)(110)

> + (0.01)(0.57)(0) + (0.01)(0.57)(0) + (0.01)(0.57)(0)
>
> + (0.01)(0.57)(0) + (0.01)(0.57)(0) + (0.01)(0.57)(0)

> + (0.01)(0.57)(0) + (0.01)(0.57)(0) + (0.01)(0.57)(0)

<!-- str. 523 -->

**Table 28 Cooling Load Component: Lighting, W**

| Hour | Usage Profile, % | Heat Gain | Heat Gain<br>Convective 43% | Heat Gain<br>Radiant 57% | Nonsolar RTS Zone Type 8, % | Radiant Cooling Load | Total Sensible Cooling Load | % Lighting to Return 0% | Room Sensible Cooling Load |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | — | — | — | 49 | 8 | 8 | — | 8 |
| 2 | 0 | — | — | — | 17 | 8 | 8 | — | 8 |
| 3 | 0 | — | — | — | 9 | 7 | 7 | — | 7 |
| 4 | 0 | — | — | — | 5 | 6 | 6 | — | 6 |
| 5 | 0 | — | — | — | 3 | 6 | 6 | — | 6 |
| 6 | 0 | — | — | — | 2 | 5 | 5 | — | 5 |
| 7 | 100 | 110 | 47 | 63 | 2 | 35 | 82 | — | 82 |
| 8 | 100 | 110 | 47 | 63 | 1 | 45 | 92 | — | 92 |
| 9 | 100 | 110 | 47 | 63 | 1 | 50 | 97 | — | 97 |
| 10 | 100 | 110 | 47 | 63 | 1 | 53 | 100 | — | 100 |
| 11 | 100 | 110 | 47 | 63 | 1 | 54 | 101 | — | 101 |
| 12 | 100 | 110 | 47 | 63 | 1 | 55 | 102 | — | 102 |
| 13 | 100 | 110 | 47 | 63 | 1 | 55 | 102 | — | 102 |
| 14 | 100 | 110 | 47 | 63 | 1 | 55 | 102 | — | 102 |
| 15 | 100 | 110 | 47 | 63 | 1 | 56 | 103 | — | 103 |
| 16 | 100 | 110 | 47 | 63 | 1 | 56 | 104 | — | 104 |
| 17 | 100 | 110 | 47 | 63 | 1 | 57 | 104 | — | 104 |
| 18 | 100 | 110 | 47 | 63 | 1 | 58 | 105 | — | 105 |
| 19 | 0 | — | — | — | 1 | 28 | 28 | — | 28 |
| 20 | 0 | — | — | — | 1 | 18 | 18 | — | 18 |
| 21 | 0 | — | — | — | 0 | 13 | 13 | — | 13 |
| 22 | 0 | — | — | — | 0 | 10 | 10 | — | 10 |
| 23 | 0 | — | — | — | 0 | 9 | 9 | — | 9 |
| 24 | 0 | — | — | — | 0 | 8 | 8 | — | 8 |
| Total |  | 1319 | 567 | 752 | 100 | 752 | 1319 | — | 1319 |

> + (0.01)(0.57)(0) + (0.01)(0.57)(0) + (0.00)(0.57)(0)
>
> + (0.00)(0.57)(440) + (0.00)(0.57)(440)

> + (0.00)(0.57)(440) = 55.77 W

The total lighting cooling load at the designated hour is thus

> Q<sub>light</sub> = Q<sub>c,15</sub> + Q<sub>r,15</sub> = 47.3 + 55.7 = 103 W

See Table 28 for the office’s lighting usage, heat gain, and cooling load profiles.

**Part 2. Wall cooling load using sol-air temperature, conduction time series and radiant time series.** Calculate the cooling load contribution from the spandrel wall section facing 60° west of south at 3:00 PM local standard time in July for the previously described office.

**Solution:** Determine the wall cooling load by calculating (1) sol-air temperatures at the exterior surface, (2) heat input based on sol-air temperature, (3) delayed heat gain through the mass of the wall to the interior surface using conduction time series, and (4) delayed space cooling load from heat gain using radiant time series.

First, calculate the sol-air temperature at 3:00 PM local standard time (LST) (4:00 PM daylight saving time) on July 21 for a vertical, dark-colored wall surface, facing 60° west of south, located in Atlanta, Georgia (latitude = 33.64, longitude = 84.43), solar clear sky optical depth for beam irradiance τ<sub>b</sub> (“taub”) = 0.515 and τ<sub>d</sub> (“taud”) for diffuse irradiance = 2.066 from monthly Atlanta weather data for July (Table 1 in Chapter 14). From Table 27, the calculated outdoor design temperature for that month and time is 33.3°C. The ground reflectivity is assumed ρ<sub>g</sub>= 0.2.

Sol-air temperature is calculated using Equation (30). For the dark-colored wall, α/h<sub>o</sub> = 0.053, and for vertical surfaces, εΔR/h<sub>o</sub> = 0. The solar irradiance E<sub>t</sub> on the wall must be determined using the equations in Chapter 14:

Solar Angles:

- ψ = southwest orientation = +60°
- Σ = surface tilt from horizontal (where horizontal = 0°) = 90° for vertical wall surface

> 3:00 PM LST = hour 15

Calculate solar altitude, solar azimuth, surface solar azimuth, and incident angle as follows:

From Table 2 in Chapter 14, solar position data and constants for July 21 are

> ET = –6.4 min
>
> δ = 20.4°

> E<sub>o</sub> = 1324 W/m<sup>2</sup>
>
> Local standard meridian (LSM) for Eastern Time Zone = 75°.

Apparent solar time AST

> AST = LST + ET/60 + (LSM – LON)/15
>
> = 15 + (–6.4/60) + [(75 – 84.43)/15]

> = 14.2647

Hour angle H, degrees

> H = 15(AST – 12)
>
> = 15(14.2647 – 12)

> = 33.97°

Solar altitude β

> sin β = cos L cos δ cos H + sin L sin δ

= cos (33.64) cos (20.4) cos (33.97) + sin (33.64) sin (20.4) = 0.841

> β = sin<sup>–1</sup>(0.841) = 57.2°

Solar azimuth φ

> cos φ = (sin β sin L – sin δ)/(cos β cos L)

= [(sin (57.2)sin (33.64) – sin (20.4)]/[cos (57.2) cos (33.64)] = 0.258

> φ = cos<sup>–1</sup>(0.253) = 75.05°

Surface-solar azimuth γ

> γ = φ – ψ
>
> = 75.05 – 60

> = 15.05°

Incident angle θ

> cos θ = cos β cos g sin Σ + sin β cos Σ
>
> = cos (57.2) cos (15.05) sin (90) + sin (57.2) cos (90)

<!-- str. 524 -->

> = 0.523
>
> θ = cos<sup>–1</sup>(0.523) = 58.45°

Beam normal irradiance E<sub>b</sub>

E<sub>b</sub> = E<sub>o</sub>exp(–τ<sub>b</sub>m<sup>ab</sup>)

> m = relative air mass

= 1/[sinβ +0.50572(6.07995 + β)<sup>–1.6364</sup>], β expressed in degrees = 1.18905

> ab = beam air mass exponent
>
> = 1.454 – 0.406τ<sub>b</sub> – 0.268τ<sub>d</sub> + 0.021τ<sub>b</sub>τ<sub>d</sub>

> = 0.713566
>
> E<sub>b</sub> = 1324exp[–0.556(1.8905<sup>0.7055705</sup>)]

> = 805 W/m<sup>2</sup>

Surface beam irradiance E<sub>t,b</sub>

E<sub>t,b</sub> = E<sub>b</sub>cosθ

> = (805)cos(58.5)
>
> = 421 W/m<sup>2</sup>

Ratio Y of sky diffuse radiation on vertical surface to sky diffuse radiation on horizontal surface

> Y = 0.55 + 0.437 cos θ + 0.313 cos<sup>2</sup>θ
>
> = 0.55 + 0.437 cos (58.45) + 0.313 cos<sup>2</sup>(58.45)

> = 0.8644

Diffuse irradiance E<sub>d</sub> – Horizontal surfaces

> E<sub>d</sub> = E<sub>o</sub>exp(–τ<sub>d</sub>m<sup>ad</sup>)

ad = diffuse air mass exponent

> = 0.507 + 0.205τ<sub>b</sub> – 0.080τ<sub>d</sub> – 0.190τ<sub>b</sub>τ<sub>d</sub>
>
> = 0.245137

> E<sub>d</sub> = E<sub>o</sub>exp(–τ<sub>d</sub>m<sup>ad</sup>)
>
> = 1324exp(–2.202(1.8905<sup>0.2369528</sup>)]

> = 133 W/m<sup>2</sup>

Diffuse irradiance E<sub>d</sub> – Vertical surfaces

> E<sub>t,d</sub>= E<sub>d</sub>Y
>
> = (133)(0.864)

> = 115 W/m<sup>2</sup>

Ground reflected irradiance E<sub>t,r</sub>

E<sub>t,r</sub>= (E<sub>b</sub>sinβ + E<sub>d</sub>)ρ<sub>g</sub>(l – cos Σ)/2

> = [805 sin(57.2) + 133](0.2)[1 – cos(90)]/2
>
> = 81 W/m<sup>2</sup>

Total surface irradiance E<sub>t</sub>

E<sub>t</sub> = E<sub>D</sub> + E<sub>d</sub> + E<sub>r</sub>

> = 421 + 115 + 81
>
> = 617 W/m<sup>2</sup>

Sol-air temperature [from Equation (29)]:

- T<sub>e</sub> = t<sub>o</sub> + αE<sub>t</sub> /h<sub>o</sub> – εΔR/h<sub>o</sub> = 33.3 + (0.053)(617) – 0 = 66.0°C

This procedure is used to calculate the sol-air temperatures for each hour on each surface. Because of the tedious solar angle and intensity calculations, using a simple computer spreadsheet or other computer software can reduce the effort involved. A spreadsheet was used to calculate a 24 h sol-air temperature profile for the data of this example. See Table 29A for the solar angle and intensity calculations and Table 29B for the sol-air temperatures for this wall surface and orientation.

Conductive heat gain is calculated using Equations (30) and (31). First, calculate the 24 h heat input profile using Equation (30) and the sol-air temperatures for a southwest-facing wall with dark exterior color:

- q<sub>i,1</sub> = (0.44)(5.57)(23.2 – 23.9) = –1 W
- q<sub>i,2</sub> = (0.44)(5.57)(22.8 – 23.9) = –3
- q<sub>i,3</sub> = (0.44)(5.57)(22.4 – 23.9) = –4
- q<sub>i,4</sub> = (0.44)(5.57)(22.1 – 23.9) = –4
- q<sub>i,5</sub> = (0.44)(5.57)(21.9 – 23.9) = –5
- q<sub>i,6</sub> = (0.44)(5.57)(22.6 – 23.9) = –3
- q<sub>i,7</sub> = (0.44)(5.57)(25.2 – 23.9) = 3
- q<sub>i,8</sub> = (0.44)(5.57)(29.0 – 23.9) = 12
- q<sub>i,9</sub> = (0.44)(5.57)(32.7 – 23.9) = 21
- q<sub>i,10</sub> = (0.44)(5.57)(35.9 – 23.9) = 29
- q<sub>i,11</sub> = (0.44)(5.57)(38.6 – 23.9) = 36
- q<sub>i,12</sub> = (0.44)(5.57)(40.8 – 23.9) = 41
- q<sub>i,13</sub> = (0.44)(5.57)(50.2 – 23.9) = 64 q<sub>i,14</sub> = (0.44)(5.57)(59.8 – 23.9) = 87 q<sub>i,15</sub> = (0.44)(5.57)(65.9 – 23.9) = 102 q<sub>i,16</sub> = (0.44)(5.57)(67.6 – 23.9) = 107 q<sub>i,17</sub> = (0.44)(5.57)(64.3 – 23.9) = 98 q<sub>i,18</sub> = (0.44)(5.57)(55.4 – 23.9) = 77 q<sub>i,19</sub> = (0.44)(5.57)(39.5 – 23.9) = 38 q<sub>i,20</sub> = (0.44)(5.57)(27.6 – 23.9) = 9 q<sub>i,21</sub> = (0.44)(5.57)(26.6 – 23.9) = 6 q<sub>i,22</sub> = (0.44)(5.57)(25.6 – 23.9) = 4 q<sub>i,23</sub> = (0.44)(5.57)(24.7 – 23.9) = 2 q<sub>i,24</sub> = (0.44)(5.57)(23.9 – 23.9) = 0

Next, calculate wall heat gain using conduction time series. The preceding heat input profile is used with conduction time series to calculate the wall heat gain. From Table 16, the most similar wall construction is wall number 1. This is a spandrel glass wall that has similar mass and thermal capacity. Using Equation (31), the conduction time factors for wall 1 can be used in conjunction with the 24 h heat input profile to determine the wall heat gain at 3:00 PM LST:

> …
>
> q<sub>15</sub> = c<sub>0</sub>q<sub>i,15</sub> + c<sub>1</sub>q<sub>i,14</sub> + c<sub>2</sub>q<sub>i,13</sub> + c<sub>3</sub>q<sub>i,12</sub> + + c<sub>23</sub>q<sub>i,16</sub>

> = (0.18)(20) + (0.58)(20) + (0.20)(19) + (0.04)(17)
>
> + (0.00)(14) + (0.00)(10) + (0.00)(5) + (0.00)(0)

> + (0.00)(–5) + (0.00)(–7) + (0.00)(–7) + (0.00)(–7)
>
> + (0.00)(–6) + (0.00)(–5) +(0.00)(–4) + (0.00)(–2)

> + (0.00)(0) + (0.00)(2) + (0.00)(4) + (0.00)(7)
>
> + (0.00)(10) + (0.00)(14) + (0.00)(17) + (0.00)(19)

> = 83.5 W

Because of the tedious calculations involved, a spreadsheet is used to calculate the remainder of a 24 h heat gain profile indicated in Table 29B for the data of this example.

Finally, calculate wall cooling load using radiant time series. Total cooling load for the wall is calculated by summing the convective and radiant portions. The convective portion is simply the wall heat gain for the hour being calculated times the convective fraction for walls from Table 14 (54%):

- Q<sub>c</sub> = (83.5)(0.54) = 45 W

The radiant portion of the cooling load is calculated using conductive heat gains for the current and past 23 h, the radiant fraction for walls from Table 14 (46%), and radiant time series from Table 19, in accordance with Equation (33). From Table 19, select the RTS for medium-weight construction, assuming 50% glass and carpeted floors as representative for the described construction. Use the wall heat gains from Table 29B for 24 h design conditions in July. Thus, the radiant cooling load for the wall at 3:00 PM is

> Q<sub>r,15</sub> = r<sub>0</sub>(0.46)q<sub>i,15</sub> + r<sub>1</sub>(0.46) q<sub>i,14</sub> + r<sub>2</sub>(0.46) q<sub>i,13</sub> + r<sub>3</sub>(0.46) q<sub>i,12</sub>
>
> …

> + + r<sub>23</sub>(0.46) q<sub>i,16</sub>
>
> = (0.49)(0.46)(84) + (0.17)(0.46)(63) + (0.09)(0.46)(44)

> + (0.05)(0.46)(35) + (0.03)(0.46)(28) + (0.02)(0.46)(20)
>
> + (0.02)(0.46)(12) + (0.01)(0.46)(3) + (0.01)(0.46)(–2)

> + (0.01)(0.46)(–4) + (0.01)(0.46)(–4) + (0.01)(0.46)(–3)
>
> + (0.01)(0.46)(–2) + (0.01)(0.46)(–1) + (0.01)(0.46)(0)

> + (0.01)(0.46)(2) + (0.01)(0.46)(4) + (0.01)(0.46)(8)
>
> + (0.01)(0.46)(17) + (0.01)(0.46)(43) + (0.00)(0.46)(75)

> + (0.00)(0.46)(96) + (0.00) (0.46)(103) + (0.00)(0.46)(99)
>
> = 27 W

> The total wall cooling load at the designated hour is thus
>
> Q<sub>wall</sub> = Q<sub>c</sub> + Q<sub>r15</sub> = 45 + 27 = 72 W

Again, a simple computer spreadsheet or other software is necessary to reduce the effort involved. A spreadsheet was used with the heat gain profile to split the heat gain into convective and radiant portions, apply RTS to the radiant portion, and total the convective and radiant loads to determine a 24 h cooling load profile for this example, with results in Table 29B.

**Part 3. Window cooling load using radiant time series.** Calculate the cooling load contribution, with and without indoor shading (venetian blinds) for the window area facing 60° west of south at 3:00 PM in July for the conference room example.

<!-- str. 525 -->

**Table 29A Conduction: Wall Component of Solar Irradiance (Month 7)**

```text
                                                            Direct Beam Solar                 Diffuse Solar Heat Gain
                                                         Beam    Surface             Diffuse                                       Total
  Local   Apparent   Hour    Solar    Solar    Solar    Normal   Incident Surface  Horizontal Ground            Sky    Subtotal   Surface
Standard    Solar   Angle   Altitude Azimuth Air Mass     E_b,    Angle    Direct,     E_d,   Diffuse,   Y    Diffuse, Diffuse, Irradiance,
  Hour      Time      H        β        φ        m       W/m^2      θ      W/m^2     W/m^2     W/m^2   Ratio   W/m^2    W/m^2     W/m^2
      1      0.26   –176      –36     –175       —         0.0    117.4       0.0       0.0      0.0   0.4500     0.0      0.0        0.0
      2      1.26   –161      –33     –159       —         0.0    130.9       0.0       0.0      0.0   0.4500     0.0      0.0        0.0
      3      2.26   –146      –27     –144       —         0.0    144.5       0.0       0.0      0.0   0.4500     0.0      0.0        0.0
      4      3.26   –131      –19     –132       —         0.0    158.1       0.0       0.0      0.0   0.4500     0.0      0.0        0.0
      5      4.26   –116       –9     –122       —         0.0    171.3       0.0       0.0      0.0   0.4500     0.0      0.0        0.0
      6      5.26   –101        3     –113    16.91455    27.5    172.5       0.0      21.2      2.2   0.4500     9.6     11.8      11.8
      7      6.26    –86       14     –105     3.98235   333.0    159.5       0.0      73.0     15.5   0.4500    32.8     48.4      48.4
      8      7.26    –71       27      –98     2.22845   531.9    145.9       0.0     107.2     34.5   0.4500    48.2     82.7      82.7
      9      8.26    –56       39      –90     1.58641   647.4    132.3       0.0     131.0     53.8   0.4500    59.0    112.8     112.8
    10       9.26    –41       51      –81     1.27776   717.2    118.8       0.0     147.7     70.8   0.4500    66.4    137.3     137.3
    11      10.26    –26       63      –67     1.11740   758.5    105.6       0.0     158.5     83.7   0.4553    72.2    155.9     155.9
    12      11.26    –11       74      –39     1.04214   779.3     92.6       0.0     164.3     91.2   0.5306    87.2    178.4     178.4
    13      12.26      4       76       16     1.02872   783.1     80.2     132.9     165.4     92.6   0.6332   104.7    197.4     330.3
    14      13.26     19       69       57     1.07337   770.5     68.7     280.4     161.8     87.9   0.7505   121.5    209.4     489.8
    15      14.2647   33.97   57.2      75.05  1.18905   739.6    58.45     387.0     153.4     77.5   0.8644   132.6    210.1     597.1
    16      15.26     49       45       86     1.41566   684.6     50.4     436.2     139.6     62.3   0.9555   133.4    195.7     631.9
    17      16.26     64       32       94     1.86186   593.7     45.8     414.2     119.4     43.8   1.0073   120.3    164.1     578.3
    18      17.26     79       20      102     2.89735   440.8     45.5     308.9      90.7     24.2   1.0100    91.6    115.7     424.7
    19      18.26     94        8      109     6.84406   173.7     49.7     112.2      48.3      7.3   0.9631    46.6     53.8     166.0
    20      19.26    109       –3      117       —         0.0     57.5       0.0       0.0      0.0   0.8755     0.0      0.0        0.0
    21      20.26    124      –14      127       —         0.0     67.5       0.0       0.0      0.0   0.7630     0.0      0.0        0.0
    22      21.26    139      –23      138       —         0.0     79.0       0.0       0.0      0.0   0.6452     0.0      0.0        0.0
    23      22.26    154      –30      151       —         0.0     91.3       0.0       0.0      0.0   0.5403     0.0      0.0        0.0
    24      23.26    169      –35      167       —         0.0    104.2       0.0       0.0      0.0   0.4618     0.0      0.0        0.0
```

**Table 29B Conduction: Wall Component of Sol-Air Temperatures, Heat Input, Heat Gain, Cooling Load (Month 7)**

| Local Standard Hour | Total Surface Outdoor Sol-Air Indoor Heat CTS Irradiance, Temp., Temps., Temp., Input, Type 1, W/m<sup>2</sup> °C °C °C W % | Heat Gain, W Convective Radiant Total 54% 46% | Nonsolar Radiant Total RTS Zone Cooling Cooling Type 8, Load, Load, % W W |
|---|---|---|---|
| 1 | 0.0 23.2 23.2 23.9 –2 18 | 0 0 0 | 49 4 5 |
| 2 | 0.0 22.8 22.8 23.9 –3 57 | –1 –1 –1 | 17 4 3 |
| 3 | 0.0 22.4 22.4 23.9 –4 20 | –2 –1 –1 | 9 3 1 |
| 4 | 0.0 22.1 22.1 23.9 –4 4 | –3 –2 –2 | 5 2 1 |
| 5 | 0.0 21.9 21.9 23.9 –5 1 | –4 –2 –2 | 3 2 0 |
| 6 | 11.8 22.1 22.7 23.9 –3 0 | –4 –2 –2 | 2 2 –1 |
| 7 | 48.4 22.9 25.4 23.9 4 0 | –2 –1 –1 | 2 2 1 |
| 8 | 82.7 24.8 29.2 23.9 13 0 | 4 2 2 | 1 3 5 |
| 9 | 112.8 26.9 32.9 23.9 22 0 | 12 6 5 | 1 5 12 |
| 10 | 137.3 28.8 36.1 23.9 30 0 | 21 11 9 | 1 8 19 |
| 11 | 155.9 30.6 38.8 23.9 36 0 | 28 15 13 | 1 10 26 |
| 12 | 178.4 31.7 41.1 23.9 42 0 | 35 19 16 | 1 13 32 |
| 13 | 330.3 32.6 50.0 23.9 64 0 | 44 24 20 | 1 15 39 |
| 14 | 489.8 33.1 59.0 23.9 86 0 | 62 33 28 | 1 20 54 |
| 15 | 597.1 33.1 64.7 23.9 99 0 | 81 44 37 | 1 27 71 |
| 16 | 631.9 32.4 65.8 23.9 102 0 | 95 51 44 | 1 32 84 |
| 17 | 578.3 31.6 62.1 23.9 93 0 | 99 53 46 | 1 36 89 |
| 18 | 424.7 30.4 52.9 23.9 71 0 | 91 49 42 | 1 36 85 |
| 19 | 166.0 28.7 37.5 23.9 33 0 | 70 38 32 | 1 32 69 |
| 20 | 0.0 27.5 27.5 23.9 9 0 | 39 21 18 | 1 24 45 |
| 21 | 0.0 26.5 26.5 23.9 6 0 | 17 9 8 | 0 16 25 |
| 22 | 0.0 25.5 25.5 23.9 4 0 | 8 4 4 | 0 11 15 |
| 23 | 0.0 24.7 24.7 23.9 2 0 | 5 3 2 | 0 8 10 |
| 24 | 0.0 23.9 23.9 23.9 0 0 | 2 1 1 | 0 6 7 |

**Solution:** First, calculate the 24 h heat gain profile for the window, then split those heat gains into radiant and convective portions, apply the appropriate RTS to the radiant portion, then sum the convective and radiant cooling load components to determine total window cooling load for the time. The window heat gain components are calculated using Equations (12) to (14). From Part 2, at hour 15 LST (3:00 PM):

> E<sub>t,b</sub> = 421 W/m<sup>2</sup>
>
> E<sub>t,d</sub> = 115 W/m<sup>2</sup>

> E<sub>r</sub> = 81 W/m<sup>2</sup>
>
> θ = 58.45°

> From Chapter 15, Table 10, for glass type 5d,

<!-- str. 526 -->

**Table 30 Window Component of Heat Gain (No Blinds or Overhang) (Month 7)**

| Local Std. Hour | Beam Normal, W/m<sup>2</sup> | Beam Solar Heat Gain<br>Surface Incident Angle | Beam Solar Heat Gain<br>Surface Beam, W/m<sup>2</sup> | Beam Solar Heat Gain<br>Beam SHGC | Adjusted Beam IAC | Beam Solar Heat Gain, W | Diffuse Hor. E<sub>d</sub>, W/m<sup>2</sup> | Ground Diffuse, W/m<sup>2</sup> | Diffuse Solar Heat Gain<br>Y Ratio | Diffuse Solar Heat Gain<br>Sky Diffuse, W/m<sup>2</sup> | Diffuse Solar Heat Gain<br>Subtotal Diffuse, W/m<sup>2</sup> | Hemis. SHGC | Diffuse Solar Heat Gain, W | Conduction Heat Gain<br>Outdoor Temp., °C | Conduction Heat Gain<br>Conduction Heat Gain, W | Total Window Heat Gain, W |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.0 | 117.4 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.4500 | 0.0 | 0.0 | 0.410 | 0 | 23.2 | –8 | –8 |
| 2 | 0.0 | 130.9 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.4500 | 0.0 | 0.0 | 0.410 | 0 | 22.8 | –13 | –13 |
| 3 | 0.0 | 144.5 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.4500 | 0.0 | 0.0 | 0.410 | 0 | 22.4 | –17 | –17 |
| 4 | 0.0 | 158.1 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.4500 | 0.0 | 0.0 | 0.410 | 0 | 22.1 | –21 | –21 |
| 5 | 0.0 | 171.3 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.4500 | 0.0 | 0.0 | 0.410 | 0 | 21.9 | –24 | –24 |
| 6 | 27.5 | 172.5 | 0.0 | 0.000 | 0.000 | 0 | 21.2 | 2.2 | 0.4500 | 9.6 | 11.8 | 0.410 | 18 | 22.1 | –21 | –3 |
| 7 | 333.0 | 159.5 | 0.0 | 0.000 | 0.000 | 0 | 73.0 | 15.5 | 0.4500 | 32.8 | 48.4 | 0.410 | 74 | 22.9 | –12 | 62 |
| 8 | 531.9 | 145.9 | 0.0 | 0.000 | 0.000 | 0 | 107.2 | 34.5 | 0.4500 | 48.2 | 82.7 | 0.410 | 126 | 24.8 | 11 | 137 |
| 9 | 647.4 | 132.3 | 0.0 | 0.000 | 0.000 | 0 | 131.0 | 53.8 | 0.4500 | 59.0 | 112.8 | 0.410 | 172 | 26.9 | 36 | 208 |
| 10 | 717.2 | 118.8 | 0.0 | 0.000 | 0.000 | 0 | 147.7 | 70.8 | 0.4500 | 66.4 | 137.3 | 0.410 | 209 | 28.8 | 58 | 268 |
| 11 | 758.5 | 105.6 | 0.0 | 0.000 | 0.000 | 0 | 158.5 | 83.7 | 0.4553 | 72.2 | 155.8 | 0.410 | 237 | 30.6 | 79 | 316 |
| 12 | 779.3 | 92.6 | 0.0 | 0.000 | 0.000 | 0 | 164.3 | 91.2 | 0.5306 | 87.2 | 178.3 | 0.410 | 272 | 31.7 | 92 | 364 |
| 13 | 783.1 | 80.2 | 132.9 | 0.166 | 1.000 | 82 | 165.4 | 92.6 | 0.6332 | 104.7 | 197.3 | 0.410 | 301 | 32.6 | 102 | 485 |
| 14 | 770.5 | 68.7 | 280.4 | 0.321 | 1.000 | 334 | 161.8 | 87.9 | 0.7505 | 121.4 | 209.4 | 0.410 | 319 | 33.1 | 109 | 762 |
| 15 | 739.6 | 58.4 | 387.0 | 0.398 | 1.000 | 572 | 153.4 | 77.5 | 0.8644 | 132.6 | 210.1 | 0.410 | 320 | 33.1 | 109 | 1001 |
| 16 | 684.6 | 50.4 | 436.2 | 0.438 | 1.000 | 710 | 139.6 | 62.3 | 0.9555 | 133.4 | 195.7 | 0.410 | 298 | 32.4 | 101 | 1109 |
| 17 | 593.7 | 45.8 | 414.2 | 0.448 | 1.000 | 690 | 119.4 | 43.8 | 1.0073 | 120.3 | 164.0 | 0.410 | 250 | 31.6 | 91 | 1031 |
| 18 | 440.8 | 45.5 | 308.9 | 0.449 | 1.000 | 515 | 90.7 | 24.2 | 1.0100 | 91.6 | 115.7 | 0.410 | 176 | 30.4 | 77 | 769 |
| 19 | 173.7 | 49.7 | 112.2 | 0.441 | 1.000 | 184 | 48.3 | 7.3 | 0.9631 | 46.6 | 53.8 | 0.410 | 82 | 28.7 | 57 | 323 |
| 20 | 0.0 | 57.5 | 0.0 | 0.403 | 0.000 | 0 | 0.0 | 0.0 | 0.8755 | 0.0 | 0.0 | 0.410 | 0 | 27.5 | 43 | 43 |
| 21 | 0.0 | 67.5 | 0.0 | 0.330 | 0.000 | 0 | 0.0 | 0.0 | 0.7630 | 0.0 | 0.0 | 0.410 | 0 | 26.5 | 31 | 31 |
| 22 | 0.0 | 79.0 | 0.0 | 0.185 | 0.000 | 0 | 0.0 | 0.0 | 0.6452 | 0.0 | 0.0 | 0.410 | 0 | 25.5 | 19 | 19 |
| 23 | 0.0 | 91.3 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.5403 | 0.0 | 0.0 | 0.410 | 0 | 24.7 | 10 | 10 |
| 24 | 0.0 | 104.2 | 0.0 | 0.000 | 1.000 | 0 | 0.0 | 0.0 | 0.4618 | 0.0 | 0.0 | 0.410 | 0 | 23.9 | 0 | 0 |

> SHGC(θ) = SHGC(58.45) = 0.3978 (interpolated)
>
> ⟨SHGC⟩<sub>D</sub> = 0.41

From Chapter 15, Table 14B, for light-colored blinds (assumed louver reflectance = 0.8 and louvers positioned at 45° angle) on double-glazed, heat-absorbing windows (Type 5d from Table 13B of Chapter 15), IAC(0) = 0.74, IAC(60) = 0.65, IAC(diff) = 0.79, and radiant fraction = 0.54. Without blinds, IAC = 1.0. Therefore, window heat gain components for hour 15, without blinds, are q<sub>b15</sub> = AE<sub>t,b</sub>SHGC(θ)(IAC) = (3.72)(421)(0.3978)(1.00) = 623 W q<sub>d15</sub> = A(E<sub>t,d</sub> + E<sub>r</sub>)⟨SHGC⟩<sub>D</sub>(IAC) = (3.72)(115 + 81)(0.41)(1.00)

> = 299 W

q<sub>c15</sub> = UA(t<sub>out</sub> – t<sub>in</sub>) = (3.18)(3.72)(33.3 – 23.9) = 111 W

This procedure is repeated to determine these values for a 24 h heat gain profile, shown in Table 30.

Total cooling load for the window is calculated by summing the convective and radiant portions. For windows with indoor shading (blinds, drapes, etc.), the direct beam, diffuse, and conductive heat gains may be summed and treated together in calculating cooling loads. However, in this example, the window does not have indoor shading, and the direct beam solar heat gain should be treated separately from the diffuse and conductive heat gains. The direct beam heat gain, without indoor shading, is treated as 100% radiant, and solar RTS factors from Table 20 are used to convert the beam heat gains to cooling loads. The diffuse and conductive heat gains can be totaled and split into radiant and convective portions according to Table 14, and nonsolar RTS factors from Table 19 are used to convert the radiant portion to cooling load.

The solar beam cooling load is calculated using heat gains for the current hour and past 23 h and radiant time series from Table 20, in accordance with Equation (38). From Table 20, select the solar RTS for medium-weight construction, assuming 50% glass and carpeted floors for this example. Using Table 30 values for direct solar heat gain, the radiant cooling load for the window direct beam solar component is

> Q<sub>b,15</sub> = r<sub>0</sub>q<sub>b,15</sub> + r<sub>1</sub>q<sub>b,14</sub> + r<sub>2</sub>q<sub>b,13</sub> + r<sub>3</sub>q<sub>b,12</sub> + … + r<sub>23</sub>q<sub>b,14</sub>
>
> = (0.54)(783) + (0.16)(362) + (0.08)(89) + (0.04)(0)

> + (0.03)(0) + (0.02)(0) + (0.01)(0) + (0.01)(0) + (0.01)(0)
>
> + (0.01)(0) + (0.01)(0) + (0.01)(0) + (0.01)(0) + (0.01)(0)

> + (0.01)(0) + (0.01)(0) + (0.01)(0) + (0.01)(0) + (0.01)(0)
>
> + (0.00)(0) + (0.00)(254) + (0.00)(610) + (0.00)(779)

> + (0.00)(783) = 488 W

This process is repeated for other hours; results are listed in Table 31.

For diffuse and conductive heat gains, the radiant fraction according to Table 14 is 46%. The radiant portion is processed using nonsolar RTS coefficients from Table 19. The results are listed in Tables 30 and 31. For 3:00 PM, the diffuse and conductive cooling load is 380 W.

The total window cooling load at the designated hour is thus

> Q<sub>window</sub> = Q<sub>b</sub> + Q<sub>diff+cond</sub> = 488 + 380 = 868 W

Again, a computer spreadsheet or other software is commonly used to reduce the effort involved in calculations. The spreadsheet shown in Table 30 is expanded in Table 31 to include splitting the heat gain into convective and radiant portions, applying RTS to the radiant portion, and totaling the convective and radiant loads to determine a 24 h cooling load profile for a window without indoor shading.

If the window has an indoor shading device, it is accounted for with the indoor attenuation coefficients (IAC), the radiant fraction, and the RTS type used. If a window has no indoor shading, 100% of the direct beam energy is assumed to be radiant and solar RTS factors are used. However, if an indoor shading device is present, the direct beam is assumed to be interrupted by the shading device, and a portion immediately becomes cooling load by convection. Also, the energy is assumed to be radiated to all surfaces of the room, therefore nonsolar RTS values are used to convert the radiant load into cooling load.

IAC values depend on several factors: (1) type of shading device, (2) position of shading device relative to window, (3) reflectivity of shading device, (4) angular adjustment of shading device, as well as (5) solar position relative to the shading device. These factors are discussed in detail in Chapter 15. For this example with venetian blinds, the IAC for beam radiation is treated separately from the diffuse solar gain. The direct beam IAC must be adjusted based on the profile angle of the sun. At 3:00 PM in July, the profile angle of the sun relative to the window surface is 58°. Calculated using Equation (38) from Chapter 15, the beam IAC = 0.653. The diffuse IAC is 0.79. Thus, the window heat gains, with light-colored blinds, at 3:00 PM are q<sub>b15</sub> = AE<sub>D</sub>SHGC(θ)(IACb) = (3.72)(421)(0.3978)(0.653) = 406 W q<sub>d15</sub> = A(E<sub>d</sub> + E<sub>r</sub>)⟨SHGC⟩<sub>D</sub>(IACd)= (3.72)(115 + 81)(0.41)(0.79)

<!-- str. 527 -->

**Table 31 Window Component of Cooling Load (No Blinds or Overhang) (Month 7)**

| Local Standard Hour | Unshaded Direct Beam Solar Cooling Load<br>Beam Solar Heat Gain W | Unshaded Direct Beam Solar Cooling Load<br>Convective 0%, W | Unshaded Direct Beam Solar Cooling Load (IFAC = 1)<br>Radiant 100%, W | Unshaded Direct Beam Solar Cooling Load (IFAC = 1)<br>Solar RTS Zone Type 8, % | Unshaded Direct Beam Solar Cooling Load<br>Radiant, W | Unshaded Direct Beam Solar Cooling Load<br>Cooling Load, W | Beam Solar Heat Gain, W | Diffuse Heat Gain, W | (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Conduction Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Total Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Convective 54%, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Radiant 46%, W | (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Nonsolar RTS Zone 8, % | Radiant, W | Cooling Load, W | Window Cooling Load, W |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 54 | 31 | 31 | 0 | 0 | –8 | –8 | –4 | –4 | 49 | 18 | 13 | 44 |
| 2 | 0 | 0 | 0 | 16 | 31 | 31 | 0 | 0 | –13 | –13 | –7 | –6 | 17 | 15 | 8 | 39 |
| 3 | 0 | 0 | 0 | 8 | 31 | 31 | 0 | 0 | –17 | –17 | –9 | –8 | 9 | 13 | 3 | 34 |
| 4 | 0 | 0 | 0 | 4 | 31 | 31 | 0 | 0 | –21 | –21 | –11 | –10 | 5 | 10 | –1 | 30 |
| 5 | 0 | 0 | 0 | 3 | 31 | 31 | 0 | 0 | –24 | –24 | –13 | –11 | 3 | 8 | –5 | 26 |
| 6 | 0 | 0 | 0 | 2 | 31 | 31 | 0 | 18 | –21 | –3 | –2 | –1 | 2 | 11 | 9 | 40 |
| 7 | 0 | 0 | 0 | 1 | 31 | 31 | 0 | 74 | –12 | 62 | 33 | 28 | 2 | 25 | 58 | 89 |
| 8 | 0 | 0 | 0 | 1 | 30 | 30 | 0 | 126 | 11 | 137 | 74 | 63 | 1 | 46 | 120 | 150 |
| 9 | 0 | 0 | 0 | 1 | 27 | 27 | 0 | 172 | 36 | 208 | 112 | 96 | 1 | 69 | 181 | 208 |
| 10 | 0 | 0 | 0 | 1 | 21 | 21 | 0 | 209 | 58 | 268 | 145 | 123 | 1 | 91 | 235 | 256 |
| 11 | 0 | 0 | 0 | 1 | 14 | 14 | 0 | 237 | 79 | 316 | 171 | 145 | 1 | 110 | 281 | 295 |
| 12 | 0 | 0 | 0 | 1 | 7 | 7 | 0 | 272 | 92 | 364 | 196 | 167 | 1 | 128 | 325 | 332 |
| 13 | 82 | 0 | 82 | 1 | 46 | 46 | 0 | 301 | 102 | 403 | 218 | 185 | 1 | 145 | 363 | 409 |
| 14 | 334 | 0 | 334 | 1 | 194 | 194 | 0 | 319 | 109 | 428 | 231 | 197 | 1 | 158 | 389 | 583 |
| 15 | 572 | 0 | 572 | 1 | 369 | 369 | 0 | 320 | 109 | 429 | 232 | 197 | 1 | 165 | 397 | 766 |
| 16 | 710 | 0 | 710 | 1 | 505 | 505 | 0 | 298 | 101 | 399 | 216 | 184 | 1 | 163 | 378 | 883 |
| 17 | 690 | 0 | 690 | 1 | 548 | 548 | 0 | 250 | 91 | 341 | 184 | 157 | 1 | 150 | 334 | 882 |
| 18 | 515 | 0 | 515 | 1 | 480 | 480 | 0 | 176 | 77 | 254 | 137 | 117 | 1 | 127 | 264 | 745 |
| 19 | 184 | 0 | 184 | 1 | 290 | 290 | 0 | 82 | 57 | 139 | 75 | 64 | 1 | 94 | 169 | 459 |
| 20 | 0 | 0 | 0 | 0 | 135 | 135 | 0 | 0 | 43 | 43 | 23 | 20 | 1 | 60 | 83 | 744 |
| 21 | 0 | 0 | 0 | 0 | 80 | 80 | 0 | 0 | 31 | 31 | 17 | 14 | 0 | 44 | 61 | 141 |
| 22 | 0 | 0 | 0 | 0 | 54 | 54 | 0 | 0 | 19 | 19 | 10 | 9 | 0 | 34 | 44 | 98 |
| 23 | 0 | 0 | 0 | 0 | 40 | 40 | 0 | 0 | 10 | 10 | 5 | 5 | 0 | 27 | 32 | 72 |
| 24 | 0 | 0 | 0 | 0.0 | 33 | 33 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 22 | 22 | 54 |

> = 236 W

q<sub>c15</sub> = UA(t<sub>out</sub> – t<sub>in</sub>) = (3.18)(3.72)(33.3 – 23.9) = 111 W

Because the same radiant fraction and nonsolar RTS are applied to all parts of the window heat gain when indoor shading is present, those loads can be totaled and the cooling load calculated after splitting the radiant portion for processing with nonsolar RTS. This is shown by the spreadsheet results in Table 32. The total window cooling load with venetian blinds at 3:00 PM = 636 W.

**Part 4. Window cooling load using radiant time series for window with overhang shading.** Calculate the cooling load contribution for the previous example with the addition of a 3 m overhang shading the window. **Solution:** In Chapter 15, methods are described and examples provided for calculating the area of a window shaded by attached vertical or horizontal projections. For 3:00 PM LST IN July, the solar position calculated in previous examples is

> Solar altitude β = 57.2°
>
> Solar azimuth φ = 75.1°

> Surface-solar azimuth γ = 15.1°

From Chapter 15, Equation (32), profile angle Ω is calculated by

> tan Ω = tan β/cos γ = tan(57.2)/cos(15.1) = 1.6087
>
> Ω = 58.1°

> From Chapter 15, Equation (34), shadow height S<sub>H</sub>is
>
> S<sub>H</sub> = P<sub>H</sub> tan Ω = 3.05(1.6087) = 4.9 m

Because the window is 1.95 m tall, at 3:00 PM the window is completely shaded by the 3 m deep overhang. Thus, the shaded window heat gain includes only diffuse solar and conduction gains. This is converted to cooling load by separating the radiant portion, applying RTS, and adding the resulting radiant cooling load to the convective portion to determine total cooling load. Those results are in Table 33. The total window cooling load = 322 W.

**Part 5. Room cooling load total.** Calculate the sensible cooling loads for the previously described office at 3:00 PM in July.

**Solution:** The steps in the previous example parts are repeated for each of the internal and external loads components, including the southeastfacing window, spandrel and brick walls, the southwest-facing brick wall, the roof, people, and equipment loads. The results are tabulated in Table 34. The total room sensible cooling load for the office is 1077 W at 3:00 in July. When this calculation process is repeated for a 24 h design

PM day for each month, it is found that the peak room sensible cooling load actually occurs in July at hour 14 (2:00 PM solar time) at 1077 W as indicated in Table 35.

Although simple in concept, these steps involved in calculating cooling loads are tedious and repetitive, even using the “simplified” RTS method; practically, they should be performed using a computer spreadsheet or other program. The calculations should be repeated for multiple design conditions (i.e., times of day, other months) to determine the maximum cooling load for mechanical equipment sizing. Example spreadsheets for computing each cooling load component using conduction and radiant time series are available from ASHRAE. To illustrate the full building example discussed previously, those individual component spreadsheets have been compiled to allow calculation of cooling and heating loads on a room by room basis as well as for a “block” calculation for analysis of overall areas or buildings where detailed room-by-room data are not available.

<!-- str. 528 -->

**Table 32 Window Component of Cooling Load (with Blinds, No Overhang) (Month 7)**

| Local Standard Hour | Unshaded Direct Beam Solar Cooling Load<br>Beam Solar Heat Gain, W | Unshaded Direct Beam Solar Cooling Load<br>Convective 0%, W | Unshaded Direct Beam Solar Cooling Load (IF AC = 1)<br>Radiant 100%, W | Unshaded Direct Beam Solar Cooling Load (IF AC = 1)<br>Solar RTS Zone Type 8, % | Unshaded Direct Beam Solar Cooling Load<br>Radiant, W | Unshaded Direct Beam Solar Cooling Load<br>Cooling Load, W | Beam Solar Heat Gain, W | Diffuse Heat Gain, W | (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Conduction Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Total Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Convective 46%, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Radiant 54%, W | (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Nonsolar RTS Zone 8, % | (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Radiant, W | Cooling Load, W | Window Cooling Load, W |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | –8 | –8 | –4 | –4 | 49 | 29 | 26 | 26 |
| 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | –13 | –13 | –6 | –7 | 17 | 25 | 19 | 19 |
| 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | –17 | –17 | –8 | –9 | 9 | 23 | 15 | 15 |
| 4 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | –21 | –21 | –10 | –11 | 5 | 20 | 10 | 10 |
| 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | –24 | –24 | –11 | –13 | 3 | 18 | 7 | 7 |
| 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 14 | –21 | –7 | –3 | –4 | 2 | 20 | 17 | 17 |
| 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 58 | –12 | 46 | 21 | 25 | 2 | 34 | 55 | 55 |
| 8 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100 | 11 | 111 | 51 | 60 | 1 | 55 | 106 | 106 |
| 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 136 | 36 | 172 | 79 | 93 | 1 | 77 | 156 | 156 |
| 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 165 | 58 | 224 | 103 | 121 | 1 | 98 | 201 | 201 |
| 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 188 | 79 | 266 | 123 | 144 | 1 | 116 | 239 | 239 |
| 12 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 215 | 92 | 307 | 141 | 166 | 1 | 132 | 273 | 273 |
| 13 | 0 | 0 | 0 | 0 | 0 | 0 | 53 | 238 | 102 | 393 | 181 | 212 | 1 | 160 | 341 | 341 |
| 14 | 0 | 0 | 0 | 0 | 0 | 0 | 217 | 252 | 109 | 578 | 266 | 312 | 1 | 220 | 486 | 486 |
| 15 | 0 | 0 | 0 | 0 | 0 | 0 | 373 | 253 | 109 | 735 | 338 | 397 | 1 | 285 | 623 | 623 |
| 16 | 0 | 0 | 0 | 0 | 0 | 0 | 474 | 236 | 101 | 811 | 373 | 438 | 1 | 333 | 706 | 706 |
| 17 | 0 | 0 | 0 | 0 | 0 | 0 | 472 | 197 | 91 | 760 | 350 | 410 | 1 | 342 | 692 | 692 |
| 18 | 0 | 0 | 0 | 0 | 0 | 0 | 361 | 139 | 77 | 578 | 266 | 312 | 1 | 303 | 569 | 569 |
| 19 | 0 | 0 | 0 | 0 | 0 | 0 | 133 | 65 | 57 | 254 | 117 | 137 | 1 | 207 | 324 | 324 |
| 20 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 43 | 43 | 20 | 23 | 1 | 118 | 138 | 138 |
| 21 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 31 | 31 | 14 | 17 | 0 | 80 | 94 | 94 |
| 22 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 19 | 19 | 9 | 10 | 0 | 58 | 67 | 67 |
| 23 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 10 | 5 | 5 | 0 | 45 | 50 | 50 |
| 24 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 36 | 36 | 36 |

| Beam |   | Con- |   |   |   | Non- |   |   |
|---|---|---|---|---|---|---|---|---|
| Solar | Diffuse | duction | Total | Con- |  | solar |  |  |
| Heat | Heat | Heat | Heat | vective | Radiant | RTS | Radi- | Cooling |
| Gain, | Gain, | Gain, | Gain, | 46%, | 54%, | Zone | ant, | Load, |
| W | W | W | W | W | W | 8, % | W | W |
| 0 | 0 | –8 | –8 | –4 | –4 | 49 | 29 | 26 |
| 0 | 0 | –13 | –13 | –6 | –7 | 17 | 25 | 19 |
| 0 | 0 | –17 | –17 | –8 | –9 | 9 | 23 | 15 |
| 0 | 0 | –21 | –21 | –10 | –11 | 5 | 20 | 10 |
| 0 | 0 | –24 | –24 | –11 | –13 | 3 | 18 | 7 |
| 0 | 14 | –21 | –7 | –3 | –4 | 2 | 20 | 17 |
| 0 | 58 | –12 | 46 | 21 | 25 | 2 | 34 | 55 |
| 0 | 100 | 11 | 111 | 51 | 60 | 1 | 55 | 106 |
| 0 | 136 | 36 | 172 | 79 | 93 | 1 | 77 | 156 |
| 0 | 165 | 58 | 224 | 103 | 121 | 1 | 98 | 201 |
| 0 | 188 | 79 | 266 | 123 | 144 | 1 | 116 | 239 |
| 0 | 215 | 92 | 307 | 141 | 166 | 1 | 132 | 273 |
| 53 | 238 | 102 | 393 | 181 | 212 | 1 | 160 | 341 |
| 217 | 252 | 109 | 578 | 266 | 312 | 1 | 220 | 486 |
| 373 | 253 | 109 | 735 | 338 | 397 | 1 | 285 | 623 |
| 474 | 236 | 101 | 811 | 373 | 438 | 1 | 333 | 706 |
| 472 | 197 | 91 | 760 | 350 | 410 | 1 | 342 | 692 |
| 361 | 139 | 77 | 578 | 266 | 312 | 1 | 303 | 569 |
| 133 | 65 | 57 | 254 | 117 | 137 | 1 | 207 | 324 |
| 0 | 0 | 43 | 43 | 20 | 23 | 1 | 118 | 138 |
| 0 | 0 | 31 | 31 | 14 | 17 | 0 | 80 | 94 |
| 0 | 0 | 19 | 19 | 9 | 10 | 0 | 58 | 67 |
| 0 | 0 | 10 | 10 | 5 | 5 | 0 | 45 | 50 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 36 | 36 |
| **of Cooling Load (with Blinds and Overhang) (Month 7)** |  |  |  |  |  |  |  |  |
| **Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load** |  |  |  |  |  |  |  |  |

**Table 33 Window Component of Cooling Load (with Blinds and Overhang) (Month 7)**

| Local Standard Hour | Overhang and Fins Shading Calculations<br>Surface Solar Azimuth | Overhang and Fins Shading Calculations<br>Profile Angle | Overhang and Fins Shading Calculations<br>Shadow Width, m | Overhang and Fins Shading Calculations<br>Shadow Height, m | Overhang and Fins Shading Calculations<br>Direct Sunlit Area, m<sup>2</sup> | Beam Solar Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Diffuse Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Conduction Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Total Heat Gain, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Convect. % 54%, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Radiant % 46%, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Nonsolar RTS Zone 8, % | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Radiant, W | Shaded Direct Beam (AC < 1.0) + Diffuse + Conduction Cooling Load<br>Cooling Load, W | Window Cooling Load, W |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | –235 | 52 | 0.0 | 0.0 | 0.0 | 0 | 0 | –8 | –8 | –4 | –4 | 49% | 16 | 12 | 12 |
| 2 | –219 | 40 | 0.0 | 0.0 | 0.0 | 0 | 0 | –13 | –13 | –7 | –6 | 17% | 13 | 6 | 6 |
| 3 | –204 | 29 | 0.0 | 0.0 | 0.0 | 0 | 0 | –17 | –17 | –9 | –8 | 9% | 11 | 1 | 1 |
| 4 | –192 | 19 | 0.0 | 0.0 | 0.0 | 0 | 0 | –21 | –21 | –11 | –10 | 5% | 8 | –3 | –3 |
| 5 | –182 | 9 | 0.0 | 0.0 | 0.0 | 0 | 0 | –24 | –24 | –13 | –11 | 3% | 6 | –7 | –7 |
| 6 | –173 | –3 | 0.0 | 0.0 | 0.0 | 0 | 14 | –21 | –7 | –4 | –3 | 2% | 8 | 5 | 5 |
| 7 | –165 | –15 | 0.0 | 0.0 | 0.0 | 0 | 58 | –12 | 46 | 25 | 21 | 2% | 20 | 45 | 45 |
| 8 | –158 | –28 | 0.0 | 0.0 | 0.0 | 0 | 100 | 11 | 111 | 60 | 51 | 1% | 38 | 98 | 98 |
| 9 | –150 | –43 | 0.0 | 0.0 | 0.0 | 0 | 136 | 36 | 172 | 93 | 79 | 1% | 57 | 150 | 150 |
| 10 | –141 | –58 | 0.0 | 0.0 | 0.0 | 0 | 165 | 58 | 224 | 121 | 103 | 1% | 76 | 197 | 197 |
| 11 | –127 | –73 | 0.0 | 0.0 | 0.0 | 0 | 188 | 79 | 266 | 144 | 123 | 1% | 93 | 237 | 237 |
| 12 | –99 | –87 | 0.0 | 0.0 | 0.0 | 0 | 215 | 92 | 307 | 166 | 141 | 1% | 109 | 274 | 274 |
| 13 | –44 | 80 | 0.0 | 2.0 | 0.0 | 0 | 238 | 102 | 340 | 184 | 156 | 1% | 123 | 307 | 307 |
| 14 | –3 | 69 | 0.0 | 2.0 | 0.0 | 0 | 252 | 109 | 361 | 195 | 166 | 1% | 134 | 329 | 329 |
| 15 | 15 | 58 | 0.0 | 2.0 | 0.0 | 0 | 253 | 109 | 362 | 195 | 166 | 1% | 139 | 334 | 334 |
| 16 | 26 | 48 | 0.0 | 2.0 | 0.0 | 0 | 236 | 101 | 337 | 182 | 155 | 1% | 137 | 319 | 319 |
| 17 | 34 | 38 | 0.0 | 2.0 | 0.0 | 0 | 197 | 91 | 288 | 156 | 133 | 1% | 127 | 282 | 282 |
| 18 | 42 | 26 | 0.0 | 1.5 | 0.9 | 85 | 139 | 77 | 302 | 163 | 139 | 1% | 127 | 290 | 290 |
| 19 | 49 | 12 | 0.0 | 0.7 | 2.5 | 88 | 65 | 57 | 210 | 113 | 96 | 1% | 107 | 220 | 220 |
| 20 | 57 | –6 | 0.0 | 0.0 | 0.0 | 0 | 0 | 43 | 43 | 23 | 20 | 1% | 63 | 86 | 86 |
| 21 | 67 | –32 | 0.0 | 0.0 | 0.0 | 0 | 0 | 31 | 31 | 17 | 14 | 0% | 44 | 61 | 61 |
| 22 | 78 | –64 | 0.0 | 0.0 | 0.0 | 0 | 0 | 19 | 19 | 10 | 9 | 0% | 33 | 43 | 43 |
| 23 | 91 | 87 | 0.0 | 0.0 | 0.0 | 0 | 0 | 10 | 10 | 5 | 5 | 0% | 26 | 31 | 31 |
| 24 | 107 | 67 | 0.0 | 0.0 | 0.0 | 0 | 0 | 0 | 0 | 0 | 0 | 0% | 20 | 20 | 20 |

<!-- str. 529 -->

**Table 34 Single-Room Example Cooling Load (July 3:00 PM) for ASHRAE Example Office Building, Atlanta, GA**

![Slika](img/ch18/p0529-17.png)

## 9.2 SINGLE-ROOM EXAMPLE PEAK HEATING LOAD

Although the physics of heat transfer that creates a heating load is identical to that for cooling loads, a number of traditionally used simplifying assumptions facilitate a much simpler calculation procedure. As described in the Heating Load Calculations section, design heating load calculations typically assume a single outdoor temperature, with no heat gain from solar or internal sources, under steady-state conditions. Thus, space heating load is determined by computing the heat transfer rate through building envelope elements (UAΔT) plus heat required because of outdoor air infiltration.

**Part 6. Room heating load.** Calculate the room heating load for the previous described office, including infiltration airflow at one air change per hour.

**Solution:** Because solar heat gain is not considered in calculating design heating loads, orientation of similar envelope elements may be ignored and total areas of each wall or window type combined. Thus, the total spandrel wall area = 5.57 + 5.57 = 11.14 m<sup>2</sup>, total brick wall area = 5.57 + 3.72 = 9.29 m<sup>2</sup>, and total window area = 3.72 + 3.72 = 7.44 m<sup>2</sup>. For this example, use the U-factors that were used for cooling load conditions. In some climates, higher prevalent winds in winter

**Table 35 Single-Room Example Peak Cooling Load (Sept. 5:00 PM) for ASHRAE Example Office Building, Atlanta, GA** should be considered in calculating U-factors (see Chapter 25 for information on calculating U-factors and surface heat transfer coefficients appropriate for local wind conditions). The 99.6% heating design dry-bulb temperature for Atlanta is –5.6°C and the indoor design temperature is 22.2°C. The room volume with a 2.74 m ceiling = 2.74 × 12.7 = 33.2 m<sup>3</sup> = 33 200 L. At one air change per hour, the infiltration airflow = 32 200/3600 = 9.2 L/s. Thus, the heating load is Windows: 3.18 × 7.44 × [22.2 – (–5.6)] = 658 W Spandrel wall: 0.44 × 11.14 × [22.2 – (–5.6)] = 136 Brick wall: 0.45 × 9.29 × [22.2 – (–5.6)] = 116 Roof: 0.18 × 12.08 × [22.2 – (–5.6)] = 60 Infiltration: 9.2 × 1.23 × [22.2 – (–5.6)] = 315 Total room heating load: 1285 W

![Slika](img/ch18/p0529-18.png)

## 9.3 WHOLE-BUILDING EXAMPLE

Because a single-room example does not illustrate the full application of load calculations, a multistory, multiple-room example building has been developed to show a more realistic case. A hypothetical project development process is described to illustrate its effect on the application of load calculations.

<!-- str. 530 -->

**Table 36 Block Load Example: Envelope Area Summary, m2**

|   | Floor Area | North | Brick Areas<br>South | Brick Areas<br>East | West | North | Spandrel/Soffit Areas<br>South | Spandrel/Soffit Areas<br>East | West | North | Window Areas<br>South | Window Areas<br>East | West |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| First floor | 1765 | 63.17 | 52.02 | 37.16 | 37.16 | 130.6 | 125.40 | 96.62 | 33.44 | 55.74 | 92.90 | 11.15 | 33.44 |
| Second floor | 1459 | 47.38 | 36.23 | 27.87 | 27.87 | 96.62 | 85.47 | 50.17 | 50.17 | 52.02 | 78.04 | 33.44 | 33.44 |
| Building total | 3224 | 110.55 | 88.25 | 65.03 | 65.03 | 227.22 | 210.87 | 146.79 | 83.61 | 107.76 | 170.94 | 44.59 | 66.89 |

| North | South | East | West |
|---|---|---|---|
| 130.6 | 125.40 | 96.62 | 33.44 |
| 96.62 | 85.47 | 50.17 | 50.17 |

### Design Process and Shell Building Definition

A development company has acquired a piece of property in Atlanta, GA, to construct an office building. Although no tenant or end user has yet been identified, the owner/developer has decided to proceed with the project on a speculative basis. They select an architectural design firm, who retains an engineering firm for the mechanical and electrical design.

At the first meeting, the developer indicates the project is to proceed on a fast-track basis to take advantage of market conditions; he is negotiating with several potential tenants who will need to occupy the new building within a year. This requires preparing **shell-and- core** construction documents to obtain a building permit, order equipment, and begin construction to meet the schedule.

The shell-and-core design documents will include finished design of the building exterior (the **shell**), as well as permanent interior elements such as stairs, restrooms, elevator, electrical rooms and mechanical spaces (the **core**). The primary mechanical equipment must be sized and installed as part of the shell-and-core package in order for the project to meet the schedule, even though the building occupant is not yet known.

The architect selects a two-story design with an exterior skin of tinted, double-glazed vision glass; opaque, insulated spandrel glass, and brick pilasters. The roof area extends beyond the building edge to form a substantial overhang, shading the second-floor windows. Architectural drawings for the shell-and-core package (see Figures 17 to 22) include plans, elevations, and skin construction details, and are furnished to the engineer for use in “block” heating and cooling load calculations. Mechanical systems and equipment must be specified and installed based on those calculations. (Note: Fullsize, scalable electronic versions of the drawings in Figures 17 to 22, as well as detailed lighting plans, are available from ASHRAE at www.ashrae.org and in the ASHRAE Handbook Online version of this chapter, on the Additional Features tab.)

The HVAC design engineer meets with the developer’s operations staff to agree on the basic HVAC systems for the project. Based on their experience operating other buildings and the lack of specific information on the tenant(s), the team decides on two variablevolume air-handling units (AHUs), one per floor, to provide operating flexibility if one floor is leased to one tenant and the other floor to someone else. Cooling will be provided by an air-cooled chiller located on grade across the parking lot. Heating will be provided by electric resistance heaters in parallel-type fan-powered variable-airvolume (VAV) terminal units. The AHUs must be sized quickly to confirm the size of the mechanical rooms on the architectural plans. The AHUs and chiller must be ordered by the mechanical subcontractor within 10 days to meet the construction schedule. Likewise, the electric heating loads must be provided to the electrical engineers to size the electrical service and for the utility company to extend services to the site.

The mechanical engineer must determine the (1) peak airflow and cooling coil capacity for each AHU, (2) peak cooling capacity required for the chiller, and (3) total heating capacity for sizing the electrical service.

**Solution:** First, calculate “block” heating and cooling loads for each floor to size the AHUs, then calculate a block load for the whole building determine chiller and electric heating capacity.

Based on the architectural drawings, the HVAC engineer assembles basic data on the building as follows:

Location: Atlanta, GA. Per Chapter 14, latitude = 33.64, longitude = 84.43, elevation = 313 m above sea level, 99.6% heating design dry-bulb temperature = –5.6°C. For cooling load calculations, use 5% dry-bulb/coincident wet-bulb monthly design day profile from Chapter 14 (on CD-ROM). See Table 27 for temperature profiles used in these examples.

*Indoor design conditions*: 22.2°C for heating; 23.9°C with 50% rh for cooling.

Building orientation: Plan north is 30° west of true north.

*Gross area per floor*: 1765 m<sup>2</sup> first floor and 1459 m<sup>2</sup> second floor.

*Total building gross area*: 3224 m<sup>2</sup>.

Windows: Bronze-tinted, double-glazed. Solar heat gain coefficients, U-factors are as in the single-room example.

Walls: Part insulated spandrel glass and part brick-and-block clad columns. The insulation barrier in the soffit at the second floor is similar to that of the spandrel glass and is of lightweight construction; for simplicity, that surface is assumed to have similar thermal heat gain/loss to the spandrel glass. Construction and insulation values are as in single-room example.

Roof: Metal deck, topped with board insulation and membrane roofing. Construction and insulation values are as in the single-room example.

Floor: 127 mm lightweight concrete slab on grade for first floor and 127 mm lightweight concrete on metal deck for second floor Total areas of building exterior skin, as measured from the architectural plans, are listed in Table 36.

The engineer needs additional data to estimate the building loads. Thus far, no tenant has yet been signed, so no interior layouts for population counts, lighting layouts, or equipment loads are available. To meet the schedule, assumptions must be made on these load components. The owner requires that the system design must be flexible enough to provide for a variety of tenants over the building’s life. Based on similar office buildings, the team agrees to base the block load calculations on the following assumptions:

Occupancy: 7.54 people per 100 m<sup>2</sup> = 13.3 m<sup>2</sup>/person

Lighting: 11.8 W/m<sup>2</sup>

*Tenant’s office equipment*:10.76 W/m<sup>2</sup>

Normal use schedule is assumed at 100% from 7:00 AM to 7:00 PM and unoccupied/off during other hours.

With interior finishes not finalized, the owner commits to using light-colored interior blinds on all windows. The tenant interior design could include carpeted flooring or acoustical tile ceilings in all areas, but the more conservative assumption, from a peak load standpoint, is chosen: carpeted flooring and no acoustical tile ceilings (no ceiling return plenum).

For block loads, the engineer assumes that the building is maintained under positive pressure during peak cooling conditions and that infiltration during peak heating conditions is equivalent to one air change per hour in a 3.5 m deep perimeter zone around the building.

To maintain indoor air quality, outdoor air must be introduced into the building. Air will be ducted from roof intake hoods to the AHUs where it will be mixed with return air before being cooled and dehumidified by the AHU’s cooling coil. ASHRAE Standard 62.1 is **Table 37 Block Load Example—First Floor Loads for**

<!-- str. 531 -->

### ASHRAE Example Office Building, Atlanta, GA

![Slika](img/ch18/p0531-19.png)

the design basis for ventilation rates; however, no interior tenant layout is available for application of Standard 62.1 procedures. Based on past experience, the engineer decides to use 9.44 L/s of outdoor air per person for sizing the cooling coils and chiller.

Block load calculations were performed using the RTS method, and results for the first and second floors and the entire building are summarized in Tables 37, 38, and 39. Based on these results, the engineer performs psychrometric coil analysis, checks capacities versus vendor catalog data, and prepares specifications and schedules for the equipment. This information is released to the contractor with the shell-and-core design documents. The air-handling units and chiller are purchased, and construction proceeds.

### Tenant Fit Design Process and Definition

About halfway through construction, a tenant agrees to lease the entire building. The tenant will require a combination of open and enclosed office space with a few common areas, such as conference/ training rooms, and a small computer room that will operate on a 24 h basis. Based on the tenant’s space program, the architect prepares interior floor plans and furniture layout plans, and the electrical engineer prepares lighting design plans. Those drawings are furnished to the HVAC engineer to prepare detailed design

**Table 38 Block Load Example—Second Floor Loads for**

### ASHRAE Example Office Building, Atlanta, GA

![Slika](img/ch18/p0531-20.png)

documents. The first step in this process is to prepare room-byroom peak heating and cooling load calculations, which will then be used for design of the air distribution systems from each of the VAV air handlers already installed.

The HVAC engineer must perform a room-by-room “takeoff” of the architect’s drawings. For each room, this effort identifies the floor area, room function, exterior envelope elements and areas, number of occupants, and lighting and equipment loads.

The tenant layout calls for a dropped acoustical tile ceiling throughout, which will be used as a return air plenum. Typical 600 by 1200 mm fluorescent, recessed, return-air-type lighting fixtures are selected. Based on this, the engineer assumes that 20% of the heat gain from lighting will be to the return air plenum and not enter rooms directly. Likewise, some portion of the heat gain from the roof will be extracted via the ceiling return air plenum. From experience, the engineer understands that return air plenum paths are not always predictable, and decides to credit only 30% of the roof heat gain to the return air, with the balance included in the room cooling load.

For the open office areas, some areas along the building perimeter will have different load characteristics from purely interior spaces because of heat gains and losses through the building skin.

<!-- str. 532 -->

**Table 39 Block Load Example—Overall Building Loads for**

### ASHRAE Example Office Building, Atlanta, GA

![Slika](img/ch18/p0532-21.png)

Although those perimeter areas are not separated from other open office spaces by walls, the engineer knows from experience that they must be served by separate control zones to maintain comfort conditions.

### Room-by-Room Cooling and Heating Loads

The room-by-room results of RTS method calculations, including the month and time of day of each room’s peak cooling load, as well as peak heating loads for each room and all input data, are available at www.ashrae.org and in the ASHRAE Handbook Online version of this chapter (on the Additional Features tab) in spreadsheet format similar to Table 39. These results are used by the HVAC engineer to select and design room air distribution devices and to schedule airflow rates for each space. That information is incorporated into the tenant fit drawings and specifications issued to the contractor.

### Conclusions

The example results illustrate issues that should be understood and accounted for in calculating heating and cooling loads:

- First, peak room cooling loads occur at different months and times, depending on the exterior exposure of the room. Calculation of cooling loads for a single point in time may miss the peak and result in inadequate cooling for that room.
- Often, in real design processes, not all data are known. Reasonable assumptions based on past experience must be made.
- Heating and air-conditioning systems often serve spaces whose use changes over the life of a building. Assumptions used in heating and cooling load calculations should consider reasonable possible uses over the life of the building, not just the first use of the space.
- The relative importance of each cooling and heating load component varies, depending on the portion of the building being considered. Characteristics of a particular window may have little effect on the entire building load, but could have a significant effect on the supply airflow to the room where the window is located and thus on the comfort of the occupants of that space.

## 10. PREVIOUS COOLING LOAD CALCULATION METHODS

Procedures described in this chapter are the most current and scientifically derived means for estimating cooling load for a defined building space, but methods in earlier editions of the ASHRAE Handbook are valid for many applications. These earlier procedures are simplifications of the heat balance principles, and their use requires experience to deal with atypical or unusual circumstances. In fact, any cooling or heating load estimate is no better than the assumptions used to define conditions and parameters such as physical makeup of the various envelope surfaces, conditions of occupancy and use, and ambient weather conditions. Experience of the practitioner can never be ignored.

The primary difference between the HB and RTS methods and the older methods is the newer methods’ direct approach, compared to the simplifications necessitated by the limited computer capability available previously.

The **transfer function method (TFM)**, for example, required many calculation steps. It was originally designed for energy analysis with emphasis on daily, monthly, and annual energy use, and thus was more oriented to average hourly cooling loads than peak design loads.

The **total equivalent temperature differential method with time averaging (TETD/TA)** has been a highly reliable (if subjective) method of load estimating since its initial presentation in the 1967 *Handbook of Fundamentals*. Originally intended as a manual method of calculation, it proved suitable only as a computer application because of the need to calculate an extended profile of hourly heat gain values, from which radiant components had to be averaged over a time representative of the general mass of the building involved. Because perception of thermal storage characteristics of a given building is almost entirely subjective, with little specific information for the user to judge variations, the TETD/TA method’s primary usefulness has always been to the experienced engineer.

The **cooling load temperature differential method with solar cooling load factors (CLTD/CLF)** attempted to simplify the two-step TFM and TETD/TA methods into a single-step technique that proceeded directly from raw data to cooling load without intermediate conversion of radiant heat gain to cooling load. A series of factors were taken from cooling load calculation results (produced by more sophisticated methods) as “cooling load temperature differences” and “cooling load factors” for use in traditional conduction (q = UAΔt) equations. The results are approximate cooling load values rather than simple heat gain values. The simplifications and assumptions used in the original work to derive those factors limit this method’s applicability to those building types and conditions for which the CLTD/CLF factors were derived; the method should not be used beyond the range of applicability.

<!-- str. 533 -->

Although the TFM, TETD/TA, and CLTD/CLF procedures are not republished in this chapter, those methods are not invalidated or discredited. Experienced engineers have successfully used them in millions of buildings around the world. The accuracy of cooling load calculations in practice depends primarily on the availability of accurate information and the design engineer’s judgment in the assumptions made in interpreting the available data. Those factors have much greater influence on a project’s success than does the choice of a particular cooling load calculation method.

The primary benefit of HB and RTS calculations is their somewhat reduced dependency on purely subjective input (e.g., determining a proper time-averaging period for TETD/TA; ascertaining appropriate safety factors to add to the rounded-off TFM results; determining whether CLTD/CLF factors are applicable to a specific unique application). However, using the most up-to-date techniques in real-world design still requires judgment on the part of the design engineer and care in choosing appropriate assumptions, just as in applying older calculation methods.

## REFERENCES

ASHRAE members can access ASHRAE Journal articles and ASHRAE research project final reports at technologyportal.ashrae .org. Articles and reports are also available for purchase by nonmembers in the online ASHRAE Bookstore at www.ashrae.org/bookstore.

Abushakra, B., J.S. Haberl, and D.E. Claridge. 2004. Overview of literature on diversity factors and schedules for energy and cooling load calculations (1093-RP). ASHRAE Transactions 110(1):164-176.

Armstrong, P.R., C.E. Hancock, III, and J.E. Seem. 1992a. Commercial building temperature recovery—Part I: Design procedure based on a step response model. ASHRAE Transactions 98(1):381-396.

Armstrong, P.R., C.E. Hancock, III, and J.E. Seem. 1992b. Commercial building temperature recovery—Part II: Experiments to verify the step response model. ASHRAE Transactions 98(1):397-410.

ASHRAE. 2010. Thermal environmental conditions for human occupancy.

ANSI/ASHRAE Standard 55-2010.

ASHRAE. 2010. Ventilation for acceptable indoor air quality. ANSI/ASHRAE Standard 62.1-2010.

ASHRAE. 2016. Energy standard for building except low-rise residential buildings. ANSI/ASHRAE/IES Standard 90.1-2016.

ASHRAE. 2012. Updating the climatic design conditions in the ASHRAE Handbook—Fundamentals (RP-1613). ASHRAE Research Project, Final Report.

ASHRAE. 2013. *Underfloor air distribution (UFAD) design guide*, 2nd ed. ASTM. 2008. Practice for estimate of the heat gain or loss and the surface temperatures of insulated flat, cylindrical, and spherical systems by use of computer programs. Standard C680-08. American Society for Testing and Materials, West Conshohocken, PA.

Bach, C., and O. Sarfraz. 2017. Update to measurements of office heat gain data. ASHRAE Research Project RP-1742, Progress Report.

Bauman, F., T. Webster, P. Linden, and F. Buhl. 2007. Energy performance of UFAD systems. CEC-500-2007-050, Final Report to CEC PIER Buildings Program. Center for the Built Environment, University of California, Berkeley. www.energy.ca.gov/2007publications/CEC-500-2007 -050/CEC-500-2007-050.PDF.

Bauman, F., S. Schiavon, T. Webster, and K.H. Lee. 2010. Cooling load design tool for UFAD systems. ASHRAE Journal (September):62-71. escholarship.org/uc/item/9d8430v3.

Bliss, R.J.V. 1961. Atmospheric radiation near the surface of the ground.

Solar Energy 5(3):103.

CFR. Annual. Energy efficiency program for certain commercial and industrial equipment. *Code of Federal Regulations* 10 CFR 431. U.S. Government Publishing Office, Washington, D.C. www.ecfr.gov.

Chantrasrisalai, C., D.E. Fisher, I. Iu, and D. Eldridge. 2003. Experimental validation of design cooling load procedures: The heat balance method. ASHRAE Transactions 109(2):160-173.

Claridge, D.E., B. Abushakra, J.S. Haberl, and A. Sreshthaputra. 2004. Electricity diversity profiles for energy simulation of office buildings (RP-1093). ASHRAE Transactions 110(1):365-377.

Eldridge, D., D.E. Fisher, I. Iu, and C. Chantrasrisalai. 2003. Experimental validation of design cooling load procedures: Facility design (RP-1117). ASHRAE Transactions 109(2):151-159.

Feng, J., S. Schiavon, and F. Bauman. 2012. Comparison of zone cooling load for radiant and air conditioning systems. Proceedings of the International Conference on Building Energy and Environment. Boulder, CO. escholarship.org/uc/item/9g24f38j.

Fisher, D.R. 1998. New recommended heat gains for commercial cooking equipment. ASHRAE Transactions 104(2):953-960.

Fisher, D.E., and C. Chantrasrisalai. 2006. Lighting heat gain distribution in buildings (RP-1282). ASHRAE Research Project, Final Report.

Fisher, D.E., and C.O. Pedersen. 1997. Convective heat transfer in building energy and thermal load calculations. ASHRAE Transactions 103(2): 137-148.

Gordon, E.B., D.J. Horton, and F.A. Parvin. 1994. Development and application of a standard test method for the performance of exhaust hoods with commercial cooking appliances. ASHRAE Transactions 100(2).

Hittle, D.C. 1999. The effect of beam solar radiation on peak cooling loads.

ASHRAE Transactions 105(2):510-513.

Hittle, D.C., and C.O. Pedersen. 1981. Calculating building heating loads using the frequency of multi-layered slabs. ASHRAE Transactions 87(2): 545-568.

Hosni, M.H., and B.T. Beck. 2008. Update to measurements of office equipment heat gain data (RP-1482). ASHRAE Research Project, Progress Report.

Hosni, M.H., B.W. Jones, J.M. Sipes, and Y. Xu. 1998. Total heat gain and the split between radiant and convective heat gain from office and laboratory equipment in buildings. ASHRAE Transactions 104(1A):356-365.

Hosni, M.H., B.W. Jones, and H. Xu. 1999. Experimental results for heat gain and radiant/convective split from equipment in buildings. ASHRAE Transactions 105(2):527-539.

Incropera, F.P., and D.P. DeWitt. 1990. *Fundamentals of heat and mass* transfer, 3rd ed. Wiley, New York.

Iu, I., and D.E. Fisher. 2004. Application of conduction transfer functions and periodic response factors in cooling load calculation procedures. ASHRAE Transactions 110(2):829-841.

Iu, I., C. Chantrasrisalai, D.S. Eldridge, and D.E. Fisher. 2003. Experimental validation of design cooling load procedures: The radiant time series method (RP-1117). ASHRAE Transactions 109(2):139-150.

Jones, B.W., M.H. Hosni, and J.M. Sipes. 1998. Measurement of radiant heat gain from office equipment using a scanning radiometer. ASHRAE Transactions 104(1B):1775-1783.

Karambakkam, B.K., B. Nigusse, and J.D. Spitler. 2005. A one-dimensional approximation for transient multi-dimensional conduction heat transfer in building envelopes. *Proceedings of the 7th Symposium on Building* *Physics in the Nordic Countries*, The Icelandic Building Research Institute, Reykjavik, vol. 1, pp. 340-347.

Kerrisk, J.F., N.M. Schnurr, J.E. Moore, and B.D. Hunn. 1981. The custom weighting-factor method for thermal load calculations in the DOE-2 computer program. ASHRAE Transactions 87(2):569-584.

Komor, P. 1997. Space cooling demands from office plug loads. ASHRAE Journal 39(12):41-44.

Kong, M., and J. Zhang. 2016. Life-cycle cost and benefit analysis of utilizing hoods for light-duty cooking appliances in commercial kitchens (RP-1631, part 2). *Science and Technology for the Built Environment* 22(6): 866-882.

Kong, M., J. Zhang, B. Guo, and K. Han. 2016. Measurements of grease emission and heat generation rates of electric countertop appliances (RP-1631, part 1). *Science and Technology for the Built Environment* 22(6): 845-865.

Kusuda, T. 1967. *NBSLD, the computer program for heating and cooling* *loads for buildings*. BSS 69 and NBSIR 74-574. National Bureau of Standards.

Latta, J.K., and G.G. Boileau. 1969. Heat losses from house basements.

Canadian Building 19(10):39.

LBL. 2015. *WINDOW 7.4.6: A PC program for analyzing window thermal* *performance for fenestration products*. LBL-48255. Windows and Daylighting Group. Lawrence Berkeley Laboratory, Berkeley.

Liesen, R.J., and C.O. Pedersen. 1997. An evaluation of inside surface heat balance models for cooling load calculations. ASHRAE Transactions 103(2):485-502.

Marn, W.L. 1962. Commercial gas kitchen ventilation studies. Research Bulletin 90(March). Gas Association Laboratories, Cleveland, OH.

<!-- str. 534 -->

McClellan, T.M., and C.O. Pedersen. 1997. Investigation of outdoor heat balance models for use in a heat balance cooling load calculation procedure. ASHRAE Transactions 103(2):469-484.

McQuiston, F.C., and J.D. Spitler. 1992. *Cooling and heating load calcula-* tion manual, 2nd ed. ASHRAE.

Miller, A. 1971. Meteorology, 2nd ed. Charles E. Merrill, Columbus.

Nigusse, B.A. 2007. *Improvements to the radiant time series method cooling* *load calculation procedure*. Ph.D. dissertation, Oklahoma State University.

Parker, D.S., J.E.R. McIlvaine, S.F. Barkaszi, D.J. Beal, and M.T. Anello.

2000. *Laboratory testing of the reflectance properties of roofing mate-* rial. FSEC-CR670-00. Florida Solar Energy Center, Cocoa.

Pedersen, C.O., D.E. Fisher, and R.J. Liesen. 1997. Development of a heat balance procedure for calculating cooling loads. ASHRAE Transactions 103(2):459-468.

Pedersen, C.O., D.E. Fisher, J.D. Spitler, and R.J. Liesen. 1998. Cooling and *heating load calculation principles*. ASHRAE.

PG&E. 2010-2016. *Dishwashing machine performance reports: Applica-* *tion of ASTM F2474, standard test method for heat gain to space perfor-* *mance of commercial kitchen ventilation/appliance systems*. PG&E Food Service Technology Center, San Ramon, CA. www.fishnick.com /publications/appliancereports/dishmachines/.

Rees, S.J., J.D. Spitler, M.G. Davies, and P. Haves. 2000. Qualitative comparison of North American and U.K. cooling load calculation methods. *International Journal of Heating, Ventilating, Air-Conditioning and* Refrigerating Research 6(1):75-99.

Rock, B.A. 2005. A user-friendly model and coefficients for slab-on-grade load and energy calculation. ASHRAE Transactions 111(2):122-136.

Rock, B.A., and D.J. Wolfe. 1997. A sensitivity study of floor and ceiling plenum energy model parameters. ASHRAE Transactions 103(1):16-30.

Schiavon, S., F. Bauman, K.H. Lee, and T. Webster. 2010a. Simplified calculation method for design cooling loads in underfloor air distribution (UFAD) systems. *Energy and Buildings* 43(1-2):517-528. escholarship .org/uc/item/5w53c7kr.

Schiavon, S., K.H. Lee, F. Bauman, and T. Webster. 2010b. Influence of raised floor on zone design cooling load in commercial buildings. Energy and Buildings 42(5):1182-1191. escholarship.org/uc/item/2bv611dt.

Schiavon, S., F. Bauman, K.H. Lee, and T. Webster. 2010c. Development of a simplified cooling load design tool for underfloor air distribution systems. Final Report to CEC PIER Program, July. escholarship.org/uc/item /6278m12z.

Smith, V.A., R.T. Swierczyna, and C.N. Claar. 1995. Application and enhancement of the standard test method for the performance of commercial kitchen ventilation systems. ASHRAE Transactions 101(2).

Sowell, E.F. 1988a. Cross-check and modification of the DOE-2 program for calculation of zone weighting factors. ASHRAE Transactions 94(2).

Sowell, E.F. 1988b. Load calculations for 200,640 zones. ASHRAE Transactions 94(2):716-736.

Spitler, J.D., and D.E. Fisher. 1999a. Development of periodic response factors for use with the radiant time series method. ASHRAE Transactions 105(2):491-509.

Spitler, J.D., and D.E. Fisher. 1999b. On the relationship between the radiant time series and transfer function methods for design cooling load calculations. *International Journal of Heating, Ventilating, Air-Conditioning* *and Refrigerating Research* (now *Science and Technology for the Built* Environment) 5(2):125-138.

Spitler, J.D., D.E. Fisher, and C.O. Pedersen. 1997. The radiant time series cooling load calculation procedure. ASHRAE Transactions 103(2).

Spitler, J.D., S.J. Rees, and P. Haves. 1998. Quantitive comparison of North American and U.K. cooling load calculation procedures—Part 1: Methodology, Part II: Results. ASHRAE Transactions 104(2):36-46, 47-61.

Sun, T.-Y. 1968. Shadow area equations for window overhangs and side-fins and their application in computer calculation. ASHRAE Transactions 74(1):I-1.1 to I-1.9.

Swierczyna, R., P. Sobiski, and D. Fisher. 2008. Revised heat gain and capture and containment exhaust rates from typical commercial cooking appliances (RP-1362). ASHRAE Research Project, Final Report.

Swierczyna, R., P.A. Sobiski, and D.R. Fisher. 2009. Revised heat gain rates from typical commercial cooking appliances from RP-1362. ASHRAE Transactions 115(2):138-160.

Talbert, S.G., L.J. Canigan, and J.A. Eibling. 1973. An experimental study of ventilation requirements of commercial electric kitchens. ASHRAE Transactions 79(1):34.

Walton, G. 1983. *Thermal analysis research program reference manual.* National Bureau of Standards.

Webster, T., F. Bauman, F. Buhl, and A. Daly. 2008. Modeling of underfloor air distribution (UFAD) systems. SimBuild 2008, University of California, Berkeley.

Wilkins, C.K., and M.R. Cook. 1999. Cooling loads in laboratories.

ASHRAE Transactions 105(1):744-749.

Wilkins, C.K., and M.H. Hosni. 2000. Heat gain from office equipment.

ASHRAE Journal 42(6):33-44.

Wilkins, C.K., and M. Hosni. 2011. Plug load design factors. ASHRAE Journal 53(5):30-34.

Wilkins, C.K., and N. McGaffin. 1994. Measuring computer equipment loads in office buildings. ASHRAE Journal 36(8):21-24.

Wilkins, C.K., R. Kosonen, and T. Laine. 1991. An analysis of office equipment load factors. ASHRAE Journal 33(9):38-44.

Zhou, X., S.J. Lochhead, Z. Zhong, and C.V. Huynh. 2016. Low energy LED lighting heat distribution in buildings. ASHRAE Research Project RP-1681, Final Report.

## BIBLIOGRAPHY

Alereza, T., and J.P. Breen, III. 1984. Estimates of recommended heat gain due to commercial appliances and equipment. ASHRAE Transactions 90(2A):25-58.

ASHRAE. 1975. *Procedure for determining heating and cooling loads for* *computerized energy calculations, algorithms for building heat transfer* subroutines.

ASHRAE. 1979. *Cooling and heating load calculation manual*.

BLAST Support Office. 1991. *BLAST user reference.* University of Illinois, Urbana–Champaign.

Buffington, D.E. 1975. Heat gain by conduction through exterior walls and roofs—Transmission matrix method. ASHRAE Transactions 81(2):89.

Burch, D.M., B.A. Peavy, and F.J. Powell. 1974. Experimental validation of the NBS load and indoor temperature prediction model. ASHRAE Transactions 80(2):291.

Burch, D.M., J.E. Seem, G.N. Walton, and B.A. Licitra. 1992. Dynamic evaluation of thermal bridges in a typical office building. ASHRAE Transactions 98:291-304.

Butler, R. 1984. The computation of heat flows through multi-layer slabs.

*Building and Environment* 19(3):197-206.

Ceylan, H.T., and G.E. Myers. 1985. Application of response-coefficient method to heat-conduction transients. ASHRAE Transactions 91:30-39.

Chiles, D.C., and E.F. Sowell. 1984. A counter-intuitive effect of mass on zone cooling load response. ASHRAE Transactions 91(2A):201-208.

Chorpening, B.T. 1997. The sensitivity of cooling load calculations to window solar transmission models. ASHRAE Transactions 103(1).

Clarke, J.A. 1985. *Energy simulation in building design*. Adam Hilger Ltd., Boston.

Davies, M.G. 1996. A time-domain estimation of wall conduction transfer function coefficients. ASHRAE Transactions 102(1):328-208.

Falconer, D.R., E.F. Sowell, J.D. Spitler, and B.B. Todorovich. 1993. Electronic tables for the ASHRAE load calculation manual. ASHRAE Transactions 99(1):193-200.

Harris, S.M., and F.C. McQuiston. 1988. A study to categorize walls and roofs on the basis of thermal response. ASHRAE Transactions 94(2):688-714.

Hittle, D.C. 1981. *Calculating building heating and cooling loads using the* *frequency response of multilayered slabs*, Ph.D. dissertation, Department of Mechanical and Industrial Engineering, University of Illinois, Urbana–Champaign.

Hittle, D.C., and R. Bishop. 1983. An improved root-finding procedure for use in calculating transient heat flow through multilayered slabs. Inter-*national Journal of Heat and Mass Transfer* 26:1685-1693.

Kimura and Stephenson. 1968. Theoretical study of cooling loads caused by lights. ASHRAE Transactions 74(2):189-197.

Kusuda, T. 1969. Thermal response factors for multilayer structures of various heat conduction systems. ASHRAE Transactions 75(1):246.

Mast, W.D. 1972. Comparison between measured and calculated hour heating and cooling loads for an instrumented building. ASHRAE Symposium Bulletin 72(2).

McBridge, M.F., C.D. Jones, W.D. Mast, and C.F. Sepsey. 1975. Field validation test of the hourly load program developed from the ASHRAE algorithms. ASHRAE Transactions 1(1):291.

<!-- str. 535 -->

Mitalas, G.P. 1968. Calculations of transient heat flow through walls and roofs. ASHRAE Transactions 74(2):182-188.

Mitalas, G.P. 1969. An experimental check on the weighting factor method of calculating room cooling load. ASHRAE Transactions 75(2):22.

Mitalas, G.P. 1972. Transfer function method of calculating cooling loads, heat extraction rate, and space temperature. ASHRAE Journal 14(12):52.

Mitalas, G.P. 1973. Calculating cooling load caused by lights. ASHRAE Transactions 75(6):7.

Mitalas, G.P. 1978. Comments on the Z-transfer function method for calculating heat transfer in buildings. ASHRAE Transactions 84(1):667-674.

Mitalas, G.P., and J.G. Arsenault. 1970. Fortran IV program to calculate Z-transfer functions for the calculation of transient heat transfer through walls and roofs. *Use of Computers for Environmental Engineering* *Related to Buildings*, pp. 633-668. National Bureau of Standards, Gaithersburg, MD.

Mitalas, G.P., and K. Kimura. 1971. A calorimeter to determine cooling load caused by lights. ASHRAE Transactions 77(2):65.

Mitalas, G.P., and D.G. Stephenson. 1967. Room thermal response factors.

ASHRAE Transactions 73(2):III.2.1.

Nevins, R.G., H.E. Straub, and H.D. Ball. 1971. Thermal analysis of heat removal troffers. ASHRAE Transactions 77(2):58-72.

NFPA. 2012. Health care facilities code. Standard 99-2012. National Fire Protection Association, Quincy, MA.

Ouyang, K., and F. Haghighat. 1991. A procedure for calculating thermal response factors of multi-layer walls—State space method. Building and Environment 26(2):173-177.

Peavy, B.A. 1978. A note on response factors and conduction transfer functions. ASHRAE Transactions 84(1):688-690.

Peavy, B.A., F.J. Powell, and D.M. Burch. 1975. Dynamic thermal performance of an experimental masonry building. NBS Building Science Series 45 (July).

Romine, T.B., Jr. 1992. Cooling load calculation: Art or science? ASHRAE Journal, 34(1):14.

Rudoy, W. 1979. Don’t turn the tables. ASHRAE Journal 21(7):62.

Rudoy, W., and F. Duran. 1975. Development of an improved cooling load calculation method. ASHRAE Transactions 81(2):19-69.

Seem, J.E., S.A. Klein, W.A. Beckman, and J.W. Mitchell. 1989. Transfer functions for efficient calculation of multidimensional transient heat transfer. *Journal of Heat Transfer* 111:5-12.

Sowell, E.F., and D.C. Chiles. 1984a. Characterization of zone dynamic response for CLF/CLTD tables. ASHRAE Transactions 91(2A):162-178.

Sowell, E.F., and D.C. Chiles. 1984b. Zone descriptions and response characterization for CLF/CLTD calculations. ASHRAE Transactions 91(2A): 179-200.

Spitler, J.D. 1996. *Annotated guide to load calculation models and algo-* rithms. ASHRAE.

Spitler, J.D., F.C. McQuiston, and K.L. Lindsey. 1993. The CLTD/SCL/CLF cooling load calculation method. ASHRAE Transactions 99(1): 183-192.

Spitler, J.D., and F.C. McQuiston. 1993. Development of a revised cooling and heating calculation manual. ASHRAE Transactions 99(1):175-182.

Stephenson, D.G. 1962. Method of determining non-steady-state heat flow through walls and roofs at buildings. *Journal of the Institution of Heating* *and Ventilating Engineers* 30:5.

Stephenson, D.G., and G.P. Mitalas. 1967. Cooling load calculation by thermal response factor method. ASHRAE Transactions 73(2):III.1.1.

Stephenson, D.G., and G.P. Mitalas. 1971. Calculation of heat transfer functions for multi-layer slabs. ASHRAE Transactions 77(2):117-126.

Sun, T.-Y. 1968. Computer evaluation of the shadow area on a window cast by the adjacent building. ASHRAE Journal (September).

Todorovic, B. 1982. Cooling load from solar radiation through partially shaded windows, taking heat storage effect into account. ASHRAE Transactions 88(2):924-937.

Todorovic, B. 1984. Distribution of solar energy following its transmittal through window panes. ASHRAE Transactions 90(1B):806-815.

Todorovic, B. 1987. The effect of the changing shade line on the cooling load calculations. In ASHRAE videotape, *Practical applications for cooling* load calculations.

Todorovic, B. 1989. *Heat storage in building structure and its effect on cool-* *ing load; Heat and mass transfer in building materials and structure*. Hemisphere Publishing, New York.

Todorovic, B., and D. Curcija. 1984. Calculative procedure for estimating cooling loads influenced by window shading, using negative cooling load method. ASHRAE Transactions 2:662.

Todorovic, B., L. Marjanovic, and D. Kovacevic. 1993. Comparison of different calculation procedures for cooling load from solar radiation through a window. ASHRAE Transactions 99(2):559-564.

Wilkins, C.K. 1998. Electronic equipment heat gains in buildings. ASHRAE Transactions 104(1B):1784-1789.

York, D.A., and C.C. Cappiello. 1981. *DOE-2 engineers manual* (Version 2.1A). Lawrence Berkeley Laboratory and Los Alamos National Laboratory.

<!-- str. 536 -->

![Fig. 17 First Floor Shell and Core Plan](img/ch18/fig-17.png)

*Fig. 17 First Floor Shell and Core Plan*

<!-- str. 537 -->

![Fig. 18 Second Floor Shell and Core Plan](img/ch18/fig-18.png)

*Fig. 18 Second Floor Shell and Core Plan*

<!-- str. 538 -->

![Fig. 19 East/West Elevations, Elevation Details, and Perimeter Section](img/ch18/fig-19.png)

*Fig. 19 East/West Elevations, Elevation Details, and Perimeter Section*

<!-- str. 539 -->

![Fig. 20 First Floor Tenant Plan](img/ch18/fig-20.png)

*Fig. 20 First Floor Tenant Plan*

<!-- str. 540 -->

![Fig. 21 Second Floor Tenant Plan](img/ch18/fig-21.png)

*Fig. 21 Second Floor Tenant Plan*

<!-- str. 541 -->

![Fig. 22 3D View](img/ch18/fig-22.png)

*Fig. 22 3D View*
