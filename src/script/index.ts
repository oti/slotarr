import "core-js/stable";
import "regenerator-runtime/runtime";

import Slotarr from "./module/Slotarr";

document.addEventListener("DOMContentLoaded", () => {
  const slotarr = new Slotarr();
  slotarr.dispatch();
});
