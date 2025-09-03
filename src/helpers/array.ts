export const maxValue = <T>(arr: T[], key: keyof T): number => arr?.reduce((max, item) => {
    const value = parseFloat(item[key] as unknown as string);
    return value > max ? value : max;
  }, 0) ?? 0;