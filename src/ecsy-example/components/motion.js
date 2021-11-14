import { createComponentClass } from "ecsy";

export const Motion = createComponentClass({
  x: { default: 0 },
  y: { default: 0 },
  angularVelocity: { default: 0 },
  damping: { default: 0 }
}, "Motion");
