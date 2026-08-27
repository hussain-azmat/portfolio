CASE STUDY
Robotics / Simulation

# Maze Solver Robot

A CoppeliaSim-based autonomous navigation and mapping project built around the JPL Open Source Rover (OSR) — the same rocker-bogie architecture used on NASA's Mars rovers — taught to explore, map, and fully traverse an unknown maze using a single rotating laser rangefinder.

| ROLE | TIMELINE | STACK | OUTCOME |
|---|---|---|---|
| Robotics Software Developer | Simulation project | CoppeliaSim, Python, Bullet physics, Ackermann kinematics | Full maze traversal + 2D map export |

ON THIS PAGE: Overview · Challenge · Journey · Architecture · Impact · Gallery

---

## OVERVIEW — Context

The project set out to answer a deceptively simple question: could a wheeled planetary rover, dropped into the center of an unmapped 15×15 grid maze, drive itself out — and along the way, build a complete, accurate map of every cell it passed through? Rather than working with a simplified differential-drive robot, the project used a full simulated model of the JPL Open Source Rover, a 6-wheeled, 4-steerable-joint rocker-bogie platform, giving the navigation problem the added complexity of realistic vehicle kinematics, wheel slip, and physical collisions.

The simulation ran in CoppeliaSim Edu on the Bullet 2.78 physics engine, inside a 15m × 15m maze built from 1m × 1m cells with 0.1m walls. The maze had no unreachable pockets, but it did have open exits along its outer boundary that the rover had to learn to detect and treat as forbidden, rather than mistake for ordinary corridors.

## CHALLENGE — The problem

Two connected problems had to be solved:

**Navigation (Delivery 1):** the rover needed to move continuously through the maze without ever leaving it, corner like a real vehicle rather than pivoting in place, and only spin in place when genuinely stuck at a dead end. This meant implementing true Ackermann steering geometry — computing different inner/outer wheel angles and speeds for every turn — while converting all commanded speeds from linear m/s into the correct angular velocity for each of the six independently driven wheels.

**Mapping (Delivery 2):** beyond simply escaping, the rover had to visit every reachable cell in the maze and record, for each one, its grid position, its position in metres relative to the maze center, and exactly which of its four sides were open or walled — merging repeated readings of the same cell to cancel out sensor noise.

## JOURNEY — What was built

The rover carries a single Hokuyo URG-04LX-UG01 laser rangefinder on a rotating joint, sweeping a 240° arc to read distance in three directions — left, front, right — at each decision point. A four-state machine drives the whole system:

- **FORWARD** — cruises at 0.50 m/s, reading the laser every cycle and slowing to 40% speed as a wall approaches
- **BACKUP** — reverses at 0.25 m/s to a safe clearance before a fresh scan
- **TURN_ACK** — executes a 90° Ackermann turn using pre-computed inner/outer steering angles, tracked via a low-pass-filtered yaw estimate
- **SPIN_180** — an in-place counter-clockwise spin, reserved for genuine dead ends

At every junction the rover evaluates left, straight, right and back — in that priority order — and picks whichever direction leads to the least-visited neighbouring cell, actively steering itself toward unexplored territory rather than just wall-following. A `tried[]` list at each junction prevents it from repeatedly attempting a direction that's already failed, and resets cleanly the moment the rover physically advances to a new cell.

## ARCHITECTURE — System thinking

**Sensing:** a three-tier fallback pipeline reads the laser via string signal, XYZ point cloud, or joint-rotation-plus-proximity-sensor — whichever the simulation environment actually supports — so the rover never crashes from a single missing API.

**Kinematics:** true Ackermann steering, computed from the rover's physical geometry (0.284m track width, 0.230m wheelbase, 0.10m wheel radius) at a 0.25m turning radius — tight enough to stay inside a 1m corridor while keeping every wheel rolling without slipping.

**Cell classification:** laser readings under ~1.10m are walls; readings between ~1.10m and 4.50m are open corridor; readings at or beyond 4.50m are treated as a maze exit and explicitly excluded from the map, so the rover is never tempted to "escape" through the boundary.

**Mapping:** every visit to a cell merges its newly-read openings with whatever was recorded on previous visits, so a single noisy reading can't leave a false wall (or false opening) in the final map.

## IMPACT — Results and lessons

The rover successfully traversed the full maze and produced a complete, cell-by-cell map — including a rendered grid view and a diagnostic printout — while never once crossing an open boundary exit. Getting there meant working through a long list of real simulation issues: a laser API that didn't exist in the installed CoppeliaSim version, junction logic that could trap the rover in infinite loops, exit readings being misclassified as open corridors, and Ackermann turns that clipped walls until the turning radius and backup clearance were retuned. Each of these was fixed with a defensive, fail-safe design — try/except-wrapped sensing, explicit exit-exclusion bands, and accumulator-tracked junction history — rather than by simplifying the underlying physics.

The project reinforced a broader point about autonomous navigation: a large share of the real engineering effort lives not in the headline algorithm (Ackermann steering, visit-weighted exploration) but in making sensing and state transitions robust to noise, API quirks, and edge cases like re-entering an already-partially-mapped junction.

## GALLERY — Visual documentation

*(Add renders/screenshots: rover model in CoppeliaSim, the 15×15 maze layout, the final generated 2D map, and a run showing the state-machine transitions.)*
