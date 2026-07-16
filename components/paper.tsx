import { CrumpleLight } from "./crumple-light";

/**
 * The paper surface: a base sheet carrying colour and fibre grain, the crumple
 * relief lit live from the cursor, then a soft key light and vignette.
 */
export function Paper() {
  return (
    <>
      <div aria-hidden className="paper-base" />
      <CrumpleLight />
      <div aria-hidden className="paper-light" />
    </>
  );
}
