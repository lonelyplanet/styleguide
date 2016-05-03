"use strict";

import settings from "rizzo-next/sass/settings.json";

/**
 * Return a font stack
 * @param  {String} family The name of the fony family stored in the settings
 * @return {String}        Font stack
 */
function font(family) {
  return settings.font.family[family.toLowerCase()].join(", ");
}

export {
  font,
};
