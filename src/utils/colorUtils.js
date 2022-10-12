export function convertToBrighterColor(color) {
  /**
   * @param {string} color - hex color code
   * @returns {string} - hex color code
   *
   * color is a string in the format of "#RRGGBB"
   */
  const colorCode = color.replace("#", "");
  const colorCodeNumber = parseInt(colorCode, 16);
  const colorCodeNumberBrighter = colorCodeNumber + 10000;
  const colorCodeBrighter = colorCodeNumberBrighter.toString(16);
  return "#" + colorCodeBrighter;
}
