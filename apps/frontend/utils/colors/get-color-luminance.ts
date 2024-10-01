import { getRgbValue } from "@jiaminghi/color";

/**
 * Get color luminance
 *
 * 0 - Black
 * 1 - White
 * @param color - RGB, HEX color
 * @returns range from 0 to 1
 */
export function getColorLuminance(color: string) {
  const rgb = getRgbValue(color).map((val) => val / 255);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
