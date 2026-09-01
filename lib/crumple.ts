/**
 * One clock for the crumple, shared by everything that has to move with it.
 *
 * The sheet balling up is three separate effects — the paper shrinking and
 * tumbling, the writing warping, the creases deepening — and if each ran its
 * own timer they'd drift apart and read as three animations that happened to
 * fire together. So they all sample the same function and only differ in what
 * they do with the number.
 *
 * Page load is the tail of the same timeline: start the clock partway in, at
 * the moment the ball begins to open, and the sheet arrives crumpled and
 * flattens out. Same curve, same code.
 */

/** Collapsing into a ball. Short — crumpling paper is a fast, violent motion. */
export const CRUMPLE_MS = 620;
/** Held as a ball, so the eye registers it as an object before it opens. */
export const HOLD_MS = 260;
/** Opening back out. Slow: paper unfolds far more reluctantly than it folds. */
export const UNFOLD_MS = 1500;

/** Start the clock here to get the opening half only, as on first load. */
export const UNFOLD_AT = CRUMPLE_MS + HOLD_MS;
export const TOTAL_MS = UNFOLD_AT + UNFOLD_MS;

/**
 * How balled-up the sheet is at `elapsed` ms: 0 is flat, 1 is a ball.
 *
 * Cubic in on the way down and cubic out on the way back, which is the
 * asymmetry that makes it read as paper rather than as a scale transform — it
 * accelerates as it collapses on itself, then eases as it runs out of spring.
 */
export function crumpleAmount(elapsed: number): number {
  if (elapsed <= 0) return 0;
  if (elapsed < CRUMPLE_MS) {
    const e = elapsed / CRUMPLE_MS;
    return e * e * e;
  }
  if (elapsed < UNFOLD_AT) return 1;
  const e = Math.min(1, (elapsed - UNFOLD_AT) / UNFOLD_MS);
  return Math.pow(1 - e, 3);
}

/** Roughly how wide the ball is on screen, in CSS px. */
export const BALL_PX = 96;

/**
 * How much the sheet is squashed at crumple amount `a`, per axis.
 *
 * Non-uniform on purpose. A viewport is a wide rectangle, so scaling it evenly
 * gives a wide ellipse — a pebble, not a ball. Driving each axis to the same
 * pixel target instead lands on something roughly square however wide the
 * window is.
 */
export function sheetScale(a: number, w: number, h: number) {
  return {
    x: 1 - a * (1 - BALL_PX / Math.max(1, w)),
    y: 1 - a * (1 - BALL_PX / Math.max(1, h)),
  };
}
