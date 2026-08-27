CASE STUDY
Agricultural Robotics · Published Research

# Weeding Robot

A low-cost, laser-based weeding vehicle built for smallholder farms in Pakistan — a full mechanical, electronic, and computer-vision system designed from the ground up to be cheap enough and simple enough for local research groups to replicate.

| ROLE | TIMELINE | STACK | OUTCOME |
|---|---|---|---|
| Applied Research Lead, NCAI Smart City Lab | Field-tested, published 2023 | ROS, Raspberry Pi + Arduino (RS485), CAD, 20W laser module, YOLOv5 | Peer-reviewed publication in *Machines* (MDPI) |

ON THIS PAGE: Overview · Challenge · Journey · Architecture · Impact · Gallery

Publication: [Development of Cost-Effective and Easily Replicable Robust Weeding Machine — Premiering Precision Agriculture in Pakistan](https://www.mdpi.com/2075-1702/11/2/287), *Machines*, 2023

---

## OVERVIEW — Context

Weed control is one of the most labor-intensive tasks in agriculture, and in Pakistan it is still done almost entirely by hand — a slow, expensive, and physically demanding process that chemical and mechanical alternatives haven't meaningfully displaced because of cost, crop damage, or health and environmental risk. The team set out to build a weeding robot that broke from the pattern of existing commercial solutions (some costing tens of thousands of dollars, others too heavy and soil-compacting for real fields) by targeting precision, low cost, and easy replication instead of raw speed.

## CHALLENGE — The problem

Existing weeding approaches each fail in a different way: chemical spraying pollutes soil and water and breeds herbicide-resistant weeds; mechanical weeding damages crops and compacts soil; manual labor is reliable but slow, expensive, and physically hazardous to workers. A viable robotic alternative needed to be precise enough to kill a weed without touching the adjacent crop plant, light enough to avoid compacting the field, adjustable enough to fit different furrow widths, and — critically for the target market — cheap enough that a smallholder farm or local research group could actually afford and repair it.

## JOURNEY — What was built

The robot's chassis is a 1.524m cube-frame assembly of 12 machined and welded metal parts — four wheeled limbs, connecting struts, and four corner housings for electronics and steering motors — deliberately over-engineered toward simplicity so it can be assembled and disassembled with minimal tooling. Each limb pairs a brushed DC motor with a chain-sprocket drive and a custom hydraulic shock absorber to handle rough, uneven farmland, plus a 3D-printed encoder disc (there was no off-the-shelf part with the right dimensions) for position feedback.

The weed-killing mechanism itself is a repurposed 20W engraving laser mounted on a two-axis rail gantry driven by stepper motors, giving it a working range of roughly one square foot and a positioning accuracy around 0.05mm. Rather than building bespoke laser control hardware, the team extracted the instruction stream from the laser's own engraving software and converted it into an Arduino-driven routine — treating "killing a weed" as functionally the same operation as engraving a shape, just aimed at a stem instead of a material sheet.

A computer-vision model (a YOLOv5 variant, retrained by transfer learning on a self-collected dataset of roughly 9,000 images spanning three crops and four weed species) ran on an NVIDIA Jetson Xavier AGX to identify weed plants for the laser to target.

## ARCHITECTURE — System thinking

**Electronics & communication:** the vehicle runs a decentralized master–slave layout over RS485 (via a MAX485 transceiver) — a Raspberry Pi 3 as master, with one dedicated Arduino Uno slave per limb, communicating through ROS publisher/subscriber nodes. Each limb also carries its own 12V battery, since the drive motors draw meaningfully more current crossing rough terrain than flat ground.

**Control modes:** the robot supports both a manual RC mode and a semi-autonomous laptop-interface mode, where the vehicle works one furrow line at a time before advancing to the next — with the human operator still setting overall speed.

**Steering & odometry:** true Ackermann-style steering (motor-limited to 180° of rotation for safety) is combined with per-wheel encoder feedback and IMU data on each board, since wheel slip on soft, uneven ground makes encoder-only odometry unreliable on its own.

## IMPACT — Results and lessons

Field trials ran at the Agro Living Lab in Gadap Town, Karachi, on a 201m × 20m (≈1-acre) okra field with 132 furrows. At the robot's tested speed of 0.07 m/s, and with roughly 5 seconds of laser time to kill each weed, the calculated time to weed a full acre came out to about 23.7 hours — dramatically slower than a human crew, but running unattended, without chemical inputs, and without any measurable damage to the crop. The vision model reached 88% mean average precision at 0.4s inference time, fast enough for real-time targeting on low-power edge hardware. Laser power needed tuning by weed species — grasses needed only ~55% power, while tougher weeds like horseweed required close to full power — a reminder that "one setting fits all" doesn't hold even within a single field.

The most direct path to a faster, more practical version, identified in the published results themselves: a higher-power laser (35–50W) would cut weed-kill time to roughly a second, and solar charging would remove the multi-hour battery-charging bottleneck that currently adds to the total cycle time.

## GALLERY — Visual documentation

*(Add photos: chassis assembly, laser gantry and 20W head, the RS485 master/slave PCBs, computer-vision detections in the field, and lab tests of the laser burning a weed stem.)*
