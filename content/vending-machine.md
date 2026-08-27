CASE STUDY
Machine Design · Fab Academy

# Automated Vending Machine

A group machine-design project combining mechanical fabrication, embedded control, and an early cashless, barcode-based purchase flow built around SMS-linked mobile credit — designed and built at Fab Lab Khairpur.

| ROLE | TIMELINE | STACK | OUTCOME |
|---|---|---|---|
| Embedded Programmer (team of 5) | 2019, Fab Academy | Arduino Leonardo, 360° servos, 16x2 LCD, HC-05 Bluetooth, barcode-to-SMS payment app | Working 6-slot vending prototype |

ON THIS PAGE: Overview · Challenge · Journey · Architecture · Impact · Gallery

---

## OVERVIEW — Context

The brief for this machine-design assignment was open-ended: build a machine combining mechanism, actuation, and automation, as a team, and document both the group build and each member's individual contribution. The team picked a vending machine — partly for its everyday familiarity, and partly because it forced every discipline on the team (CAD, CNC, electronics, programming, and mobile/wireless) to genuinely interlock rather than work in isolation.

## CHALLENGE — The problem

Beyond the mechanical challenge of six independent dispensing units, the team wanted to address a real, local pain point: cash-based vending is genuinely awkward in Pakistan — customers without exact change, shopkeepers unable to make change, and long queues at high-traffic locations like university cafeterias where a simple chocolate purchase shouldn't take minutes. The machine needed a cashless purchase path that didn't depend on card payment infrastructure the target locations didn't have.

## JOURNEY — What was built

Work was split five ways: CAD modeling, CNC milling, electronics, programming (this author's role), and the wireless/mobile application layer. The body itself went through two fabrication passes — first laser-cut in 4mm cardboard purely to validate the CAD joints and press-fits, then milled for real in 16mm laminated MDF on a ShopBot, with the front panel laser-cut separately in acrylic.

Six 360°-rotation continuous servos — hand-converted from standard 180° hobby servos, since true continuous-rotation servos weren't in the lab's inventory — each sat behind its own dispensing slot, actuated one at a time based on the customer's selection. Product selection ran through a 16x2 LCD (showing a welcome message and later purchase confirmations) and an HC-05 Bluetooth module bridging to the mobile payment side of the system.

The purchase flow: each product in the machine had its own vinyl-cut barcode. A customer used a phone app ("Scan to Arduino") to scan the barcode of the item they wanted; the app sent that code to the machine over Bluetooth, and the machine dispensed the matching item and displayed a confirmation and thank-you message on the LCD. Payment itself rode on a telecom-issued SIM-based prepaid credit system through a local operator (Jazz) — the user pre-loaded credit, and each purchase deducted the item price and confirmed it by SMS, entirely sidestepping the need for cash, card readers, or POS integration.

## ARCHITECTURE — System thinking

**Control board:** an Arduino Leonardo (ATmega32u4) — the same board the team had built themselves in an earlier embedded-programming week — read the incoming barcode-derived product code over serial and drove the matching servo, LCD update, and dispensing sequence.

**Product logic:** the firmware mapped a small set of numeric codes to specific SKUs (chips, biscuits, and several chocolate brands, each at its own price point), triggering that slot's servo for a fixed duration before resetting and returning to an idle scrolling display.

**Wireless bridge:** the HC-05 module received the scanned barcode value from the customer's phone over Bluetooth and passed it into the Leonardo's serial buffer, where it was parsed and matched against the product table.

## IMPACT — Results and lessons

The finished prototype dispensed products correctly against scanned barcodes and displayed live purchase confirmations, validating the core idea: a phone-scan-to-dispense flow riding on prepaid mobile credit, with no cash or card hardware required at all. Mechanically, the two-stage fabrication approach (cardboard proof, then MDF/acrylic final) caught fit issues early and meant the CNC pass came out clean on the first attempt. On the actuation side, converting standard servos to continuous rotation — rather than sourcing different hardware — was a pragmatic constraint-driven fix that kept the six-slot design working within the lab's existing parts inventory.

The team's own "future work" notes were candid about the prototype's limits: capacity was small, security around the payment flow was minimal, and real deployment would need direct cooperation with a telecom operator rather than the workaround used for the demo — all reasonable trade-offs for a project scoped to prove the concept rather than ship a production machine.

## GALLERY — Visual documentation

*(Add photos: CAD assembly renders, cardboard proof-of-fit cut, ShopBot milling and MDF assembly, the six-servo dispensing mechanism, LCD + Bluetooth wiring, and the vinyl barcode labels on the finished front panel.)*
