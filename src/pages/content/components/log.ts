import { DEBUG } from './isGroupActive';


export function log(...v) {
  if (DEBUG) {
    console.log(...v);
  }
}
