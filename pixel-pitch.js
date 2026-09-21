/**
 * LED pixel pitch and screen size calculator.
 * Rules of thumb used across the LED display industry:
 *   minimum viewing distance (m)  = pixel pitch (mm) x 1
 *   optimal viewing distance (m)  = pixel pitch (mm) x 2 to 3
 *   visual acuity distance (m)    = pixel pitch (mm) x 3.44
 * These are planning guides, not product specifications.
 */

const COMMON_PITCHES_MM = [0.9, 1.2, 1.5, 1.86, 2.0, 2.5, 2.9, 3.9, 4.8, 5.9, 6.9, 8.0, 10.0, 16.0];

const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;

/** Viewing distances (metres) for a given pixel pitch (mm). */
function viewingDistances(pitchMm) {
  if (!(pitchMm > 0)) throw new Error("pitchMm must be a positive number");
  return {
    pitchMm,
    minimumM: round(pitchMm),
    optimalFromM: round(pitchMm * 2),
    optimalToM: round(pitchMm * 3),
    visualAcuityM: round(pitchMm * 3.44),
    pixelsPerSquareMetre: Math.round((1000 / pitchMm) ** 2),
  };
}

/**
 * Recommend a pixel pitch for the closest distance viewers will stand (metres).
 * Returns the coarsest common pitch whose minimum viewing distance
 * is at or below that distance, plus a finer "premium" option.
 */
function recommendPitch(closestViewerM) {
  if (!(closestViewerM > 0)) throw new Error("closestViewerM must be a positive number");
  const suitable = COMMON_PITCHES_MM.filter((p) => p <= closestViewerM);
  if (suitable.length === 0) {
    return { recommendedMm: COMMON_PITCHES_MM[0], premiumMm: null,
      note: "Viewers are very close. Use the finest pitch available." };
  }
  const recommendedMm = suitable[suitable.length - 1];
  const idx = COMMON_PITCHES_MM.indexOf(recommendedMm);
  return {
    recommendedMm,
    premiumMm: idx > 0 ? COMMON_PITCHES_MM[idx - 1] : null,
    note: `P${recommendedMm} is sharp from ${recommendedMm} m and looks best from ${round(recommendedMm * 2)} to ${round(recommendedMm * 3)} m.`,
  };
}

/** Resolution of a screen of given size (metres) at a given pitch (mm). */
function screenResolution(widthM, heightM, pitchMm) {
  if (!(widthM > 0 && heightM > 0 && pitchMm > 0)) throw new Error("All values must be positive numbers");
  const widthPx = Math.floor((widthM * 1000) / pitchMm);
  const heightPx = Math.floor((heightM * 1000) / pitchMm);
  return { widthPx, heightPx, totalPixels: widthPx * heightPx, aspectRatio: round(widthM / heightM) };
}

/** Physical size (metres) needed to show a target resolution at a given pitch (mm). */
function screenSize(widthPx, heightPx, pitchMm) {
  if (!(widthPx > 0 && heightPx > 0 && pitchMm > 0)) throw new Error("All values must be positive numbers");
  const widthM = round((widthPx * pitchMm) / 1000);
  const heightM = round((heightPx * pitchMm) / 1000);
  return { widthM, heightM, diagonalM: round(Math.hypot(widthM, heightM)), areaSqM: round(widthM * heightM) };
}

module.exports = { COMMON_PITCHES_MM, viewingDistances, recommendPitch, screenResolution, screenSize };
