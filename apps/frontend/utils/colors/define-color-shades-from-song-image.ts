export function defineColorShadesFromSongImage(image: string) {
  const root = document.documentElement;

  // TODO: get real img and get colors from it
  const color = "#ffd458";
  /*
  A temporary list of good colors:
    - #e04343 - red
    - #ffd458 - yellow
    - #c1bda7 - automata
  */

  const shades = generateColorShades(color, [800, 900]);

  for (let [shadeName, shadeColor] of Object.entries(shades)) {
    root.style.setProperty(`--rgb-accent-${shadeName}`, shadeColor);
  }
}
