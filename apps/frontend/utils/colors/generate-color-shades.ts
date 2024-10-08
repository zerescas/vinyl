import { darken, getRgbValue, lighten } from "@jiaminghi/color";

const defaultShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function generateColorShades(
  color: string,
  shades: number[] = defaultShades,
) {
  // Fix color by luminance
  const luminance = getColorLuminance(color);
  if (luminance >= 0.9) {
    color = darken(color, 30);
  } else if (luminance > 0.2 && luminance <= 0.2) {
    color = lighten(color, 40);
  } else if (luminance <= 0.1) {
    color = lighten(color, 60);
  }

  // Generate color shades
  const result: Record<string, string> = {};
  for (let shade of shades) {
    const shadeColor = lighten(color, 100 - shade / 10);
    result[shade] = toPlainRgb(shadeColor);
  }
  result[950] = toPlainRgb(color);

  return result;
}

function toPlainRgb(color: string) {
  const [r, g, b] = getRgbValue(color);
  return `${r} ${g} ${b}`;
}
