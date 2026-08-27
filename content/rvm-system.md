CASE STUDY
IoT / Deep Learning · Published Research

# Reverse Vending Machine (RVM) System

An incentive-based, deep-learning-powered reverse vending machine that identifies, sorts, and rewards the return of used plastic bottles — built and deployed as a low-cost, locally-fabricated alternative to imported RVMs costing tens of thousands of dollars.

| ROLE | TIMELINE | STACK | OUTCOME |
|---|---|---|---|
| Embedded/IoT Engineer, NCAI Smart City Lab | Two hardware iterations, deployed and field-validated | Edge Computing Device, ESP32, MobileNet (transfer learning), Firebase, TCP/JSON | Peer-reviewed publication in *Recycling* (MDPI); 650kg+ plastic collected in deployment |

ON THIS PAGE: Overview · Challenge · Journey · Architecture · Impact · Gallery

Publication: [Plastic Waste Management through the Development of a Low Cost and Light Weight Deep Learning Based Reverse Vending Machine](https://www.mdpi.com/2313-4321/7/5/70), *Recycling*, 2022

---

## OVERVIEW — Context

Plastic bottle waste in Pakistan is largely unmanaged — without a domestic recycling infrastructure, bottles end up burned, dumped, or informally picked and resold by individual laborers. Reverse vending machines are a proven way to incentivize public recycling elsewhere in the world, but the commercial options (typically using IR spectroscopy or barcode readers) run anywhere from $1,800 to $25,000 — well outside the reach of local deployment at any scale. The goal was an end-to-end RVM — hardware, bottle-recognition model, and a reward system tied to user accounts — built and priced for a Pakistani deployment context.

## CHALLENGE — The problem

Object recognition had to work reliably on genuinely cheap, low-power compute — not a cloud GPU — while still handling the real messiness of returned bottles: different sizes, colors, crushed or deformed shapes, and light reflecting off plastic in ways that confuse simple classifiers. On the mechanical side, the machine needed to survive outdoor deployment (rain, dust, temperature swings), sort bottles by size without human intervention, and track a reward balance per user without requiring proprietary payment hardware.

## JOURNEY — What was built

Two full versions of the machine were built. The first was bulky, expensive, and indoor-only; the second — the version documented in the publication — was smaller, more accurate, and rated for outdoor operation, moving from IR to ultrasonic proximity sensors (IR is unreliable in dust, smoke, and mist) and rebuilding the enclosure in metal so the electronics stay protected in heavy rain.

The core interaction flow: capacitive proximity sensors at the intake trigger a camera to capture images of the inserted object, which are classified on an Edge Computing Device (ECD) using a locally-trained deep learning model. Non-bottles are rejected back to the user; recognized bottles are further classified by size, moved by a self-designed mechanical arm to a load-cell weighing platform, and — once the user enters contact details on a keypad — logged against their account in a Firebase database to accumulate reward points, before the arm drops the bottle into its correctly sized bin. A separate check continuously monitors bin fill level and emails the site's bin manager automatically once it's full.

The classification dataset was collected from scratch — nearly 11,000 images captured by a camera mounted inside the machine itself, covering large bottles, small bottles, and a wide "non-bottle" category (cups, paper, wrappers) under deliberately varied conditions: with and without caps, with and without labels, and deformed or crushed.

## ARCHITECTURE — System thinking

**Compute split:** an ESP32 acts as the secondary controller — reading the keypad, proximity sensors, and load cell over GPIO and relaying that data to the ECD as JSON over TCP — while the ECD itself runs the trained TensorFlow Lite classification model and handles all cloud/database communication.

**Model choice:** the team benchmarked MobileNetV2 against ResNet50 and InceptionV3 using transfer learning on the custom bottle dataset. MobileNet won decisively on every axis that mattered for embedded deployment — highest validation accuracy of the three, and a fraction of the size (roughly six times smaller than ResNet50 and fifteen times smaller than InceptionV3 before TFLite conversion, which shrank it further from 47MB to 14MB).

**Mechanical:** a metal-fabricated frame (sized to handle roughly 1.5 tons of plastic waste) built around a conveyor belt, feeding two separate size-based weighing/sorting stations.

## IMPACT — Results and lessons

The MobileNet-based classifier reached 99.2% test accuracy and 99.6% validation accuracy — ahead of both larger reference models — while running comfortably on low-power hardware. Whole-machine validation (not just the model in isolation) surfaced a separate class of problem entirely: early testing had a 29% real-world misclassification rate, traced mostly to poor internal lighting and a camera mounting angle that distorted the image aspect ratio. Simply correcting the camera posture — with no change to the model — cut that error rate by more than half, to 13%, underlining how much a deployed vision system's accuracy depends on physical installation details that never show up in an offline test set.

Deployed across two machine versions at a university campus in Karachi, the system collected over 650kg of plastic waste over more than six months, at an estimated build cost under $750 per unit — versus $1,800–$25,000 for comparable commercial machines. Remaining known issues at time of publication included a jerky, noisy conveyor motor (a cost trade-off) and the sheer transport weight of the metal enclosure once built for outdoor durability.

## GALLERY — Visual documentation

*(Add photos: deployed unit on campus, internal conveyor and sensor layout, mechanical arm and weighing platform, sample classification dataset images, and the confusion matrix / accuracy comparison chart.)*
