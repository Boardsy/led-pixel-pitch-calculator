# LED Pixel Pitch Calculator
[![DOI](https://zenodo.org/badge/1380207618.svg)](https://doi.org/10.5281/zenodo.22882808)

A small, dependency-free JavaScript library for planning LED screens. It answers the questions people ask before buying or hiring an LED display:

- What pixel pitch do I need for how far away my audience stands?
- How close can people stand to a P2.5 screen before they see the pixels?
- What resolution will a 3 m by 2 m LED wall have?
- How big does a screen need to be to show Full HD at P1.5?

## Quick answer: what pixel pitch do I need?

As a rule of thumb, the pixel pitch in millimetres equals the closest comfortable viewing distance in metres. A P2.5 screen looks sharp from about 2.5 m, and best from 5 to 7.5 m. If your nearest viewer stands 4 m away, P3.9 is the coarsest pitch that works, and P2.9 gives a cleaner image.

## Usage

```js
const calc = require("./pixel-pitch");

calc.recommendPitch(4);
// { recommendedMm: 3.9, premiumMm: 2.9, note: "P3.9 is sharp from 3.9 m ..." }

calc.viewingDistances(1.86);
// { minimumM: 1.86, optimalFromM: 3.72, optimalToM: 5.58, visualAcuityM: 6.4, ... }

calc.screenResolution(3, 2, 2.5);
// { widthPx: 1200, heightPx: 800, totalPixels: 960000, aspectRatio: 1.5 }

calc.screenSize(1920, 1080, 1.5);
// { widthM: 2.88, heightM: 1.62, diagonalM: 3.3, areaSqM: 4.67 }
```

Run the examples with `node example.js`.

## Method

| Measure | Rule |
|---|---|
| Minimum viewing distance | pitch (mm) x 1, in metres |
| Optimal viewing distance | pitch (mm) x 2 to 3, in metres |
| Visual acuity distance | pitch (mm) x 3.44, in metres (where 20/20 vision stops resolving pixels) |
| Pixel density | (1000 / pitch)² pixels per square metre |

These are widely used industry rules of thumb, not measurements of any specific product. Real results vary with content, brightness and ambient light.

## Data

`data/led_pixel_pitch_viewing_distance.csv` contains the same figures for 14 common pitches from P0.9 to P16. The dataset is also published on Zenodo with a permanent DOI: [10.5281/zenodo.22857054](https://doi.org/10.5281/zenodo.22857054)

## Online version

An interactive version of these calculators is available at [boardsy.co.uk/free-exhibition-display-tools](https://boardsy.co.uk/free-exhibition-display-tools/).

## Licence

Code: MIT. Data: CC BY 4.0.
