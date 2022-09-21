import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/extend-expect";

installGlobals();

global.HTMLElement.prototype.detachEvent = function(type, listener) {
    this.removeEventListener(type.replace('on', ''), listener)
  }