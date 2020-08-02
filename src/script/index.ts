// for IE11
import "core-js/stable";
import "regenerator-runtime/runtime";
import "what-input";

import Slotarr from "./module/Slotarr";

document.addEventListener("DOMContentLoaded", () => {
  const slotarr = new Slotarr();
  slotarr.dispatch();
});
