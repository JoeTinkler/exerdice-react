export const toRGBA = (background: React.CSSProperties['background'], alpha: number) => {
  if (!background || typeof(background) !== 'string' || ! new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$').test(background)) {
    return;
  }
  const hex: string = background;
  const regexp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const rbg = hex?.replace(regexp,(m, r, g, b) => '#' + r + r + g + g + b + b)
    ?.substring(1)
    ?.match(/.{2}/g)
    ?.map(x => parseInt(x, 16));

  return `rgba(${rbg}, ${alpha})`;
}