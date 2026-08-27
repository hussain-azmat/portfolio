CASE STUDY
IoT / Industrial Safety

# LoRa SOS Emergency Alarm System

A long-range, infrastructure-independent SOS alerting device built for Engro's power plant in Ghotki — designed as a fallback when WiFi and other site communication channels couldn't be relied on for emergency signalling.

| ROLE | TIMELINE | STACK | OUTCOME |
|---|---|---|---|
| Sole Designer & Builder | Prototype deployment | Arduino Nano, LoRa serial module (433MHz), custom PCB, 3D-printed enclosure | Working master–slave pair, field-tested to 10km |

ON THIS PAGE: Overview · Challenge · Journey · Architecture · Impact · Gallery

---

## OVERVIEW — Context

At Engro's power plant site in Ghotki, existing communication infrastructure — WiFi and other standard channels — wasn't reliable enough to be trusted for emergency signalling. In an industrial plant environment, that's not a minor inconvenience: if a worker needs help and the network happens to be down or out of range, there's no fallback. The brief was to build a dedicated, radio-based emergency alert device that didn't depend on the plant's existing network at all — something that would work independently of WiFi coverage, congestion, or outages.

## CHALLENGE — The problem

The device needed to work reliably over real industrial distances — plant sites and surrounding areas can span kilometres — using a communication method with its own dedicated link rather than piggybacking on shared infrastructure. It also needed to be simple enough for a worker to trigger instantly under stress (a single button, not a menu or app), physically robust enough for an industrial site, and cheap enough to build and replicate as more units were needed. Engro also proposed an attendance-tracking use case for the same hardware as a longer-term second feature, though that was always secondary to the core SOS function.

## JOURNEY — What was built

The design centered on a 433MHz LoRa serial radio module — the kind of low-cost, long-range transceiver that was still fairly new and accessible at the time — paired with an Arduino Nano as the controller. Both the PCB layout and the enclosure were designed from scratch: a custom board carrying the Nano and the LoRa module, and a custom CAD 3D-printed casing to house it, sized for a single physical trigger button. Every part of this — PCB design, CAD, and firmware — was done independently, end to end.

The system was built as a master–slave radio pair: pressing the trigger button on the slave unit sends an SOS signal over the dedicated LoRa link to the master, which is meant to sit somewhere with reliable monitoring or a link onward to plant security/response staff. Because the link is a dedicated point-to-point radio connection rather than shared network infrastructure, it keeps working exactly when the plant's normal communications are the least trustworthy.

Attendance tracking — using the same paired-device concept for staff check-in — was pitched by Engro as a future extension once the SOS prototype proved out, but that work was shelved once COVID-19 hit and site priorities shifted.

## ARCHITECTURE — System thinking

**Radio link:** a 433MHz LoRa serial transceiver module on each end, chosen for long range at low power and simple UART-level integration with the Nano — no custom radio protocol stack needed, since the module handles the RF layer.

**Controller:** an Arduino Nano on each unit, reading the trigger button on the slave side and driving the module's serial interface directly.

**Enclosure:** a self-designed, 3D-printed housing built specifically around the PCB layout and the button placement, rather than adapting an off-the-shelf enclosure.

## IMPACT — Results and lessons

The single master–slave prototype pair was field-tested at both 1km and 10km separation, and the SOS signal was received reliably at both distances — validating LoRa as a genuinely viable fallback channel for a plant environment where standard network coverage couldn't be guaranteed. As a single-purpose, single-button device with its own dedicated radio link, it sidesteps the exact failure mode it was built to solve: a WiFi outage or congestion event has no effect on it at all.

The project is also a good example of scope discipline under changing circumstances — the attendance feature was floated as a natural next step on the same hardware, but rather than half-building two features, the SOS function was taken to a fully working, tested state first, leaving attendance as a clearly-defined but deliberately deferred extension.

## GALLERY — Visual documentation

*(Add photos: the assembled PCB with Nano and LoRa module, the 3D-printed enclosure and CAD renders, the trigger button housing, and the master/slave pair together.)*
