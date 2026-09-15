# Category image attributions

Generic, machine-type representative photos used as product imagery for the
imported strength/cardio catalog (`strength-machines.seed.json`). These are
**not** photos of any specific seller's specific unit — they're type-level
stock imagery sourced from Wikimedia Commons under open licenses that
explicitly permit this kind of reuse. Attribution is required by the license
terms below.

Stored in Supabase Storage bucket `product-images` under `categories/`.

| File | Source | Author | License |
|---|---|---|---|
| `chest-press-machine.jpg` | [Chest Incline.jpg](https://commons.wikimedia.org/wiki/File:Chest_Incline.jpg) | Aliva Sahoo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `lat-pulldown-machine.jpg` | [Chinap, Chest, Back, Bicep, tricep Machine.jpg](https://commons.wikimedia.org/wiki/File:Chinap,_Chest,_Back,_Bicep,_tricep_Machine.jpg) | Aliva Sahoo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `shoulder-press-machine.jpg` | [Multifunctional cable and row machines in a gym.jpg](https://commons.wikimedia.org/wiki/File:Multifunctional_cable_and_row_machines_in_a_gym.jpg) | San Francisco Foghorn | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `leg-press-machine.jpg` | [Gym Leg Press Machine.jpg](https://commons.wikimedia.org/wiki/File:Gym_Leg_Press_Machine.jpg) | Aliva Sahoo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `weight-machine.jpg` | [Multifunctional cable and row machines in a gym.jpg](https://commons.wikimedia.org/wiki/File:Multifunctional_cable_and_row_machines_in_a_gym.jpg) | San Francisco Foghorn | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| `elliptical-machine.jpg` | [Elliptical machine.jpg](https://commons.wikimedia.org/wiki/File:Elliptical_machine.jpg) | Cpetro45 (assumed) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |

`Cross Trainers` products reuse `elliptical-machine.jpg` (only one product in
that subcategory).

Images were downsized to a 1600px max width and re-compressed as JPEG
(quality 82) before upload; no other edits were made. Under CC BY-SA, any
further modification must remain under the same license and credit the
original author as listed above. If this attribution page is removed, add
equivalent credit somewhere reachable from the site (e.g. a footer /
credits route) to stay compliant.

**Explicitly not used:** photos from the third-party listings that
`source-urls.txt` was derived from — those are seller-specific product
photos with no established rights for reuse here, so this catalog uses
generic type-level imagery instead.
