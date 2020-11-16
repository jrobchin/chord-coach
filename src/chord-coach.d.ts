import * as tonal from "@tonaljs/tonal";

declare global {
  interface Window {
    tonal: typeof tonal;
  }
}
