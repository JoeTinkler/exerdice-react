export const unixTimestamp = (): number => Date.now();

export const addDays = (date: Date, days: number) => new Date(date.getTime() + (24 * 60 * 60 * 1000 * days));

export const addDaysUnix = (date: number, days: number) => date + (24 * 60 * 60 * 1000 * days);

export const sameDay = (x: Date, y: Date) => x.getFullYear() === y.getFullYear()
  && x.getMonth() === y.getMonth()
  && x.getDate() === y.getDate();

export const sameDayUnix = (x: number, y : number) => sameDay(new Date(x), new Date(y));

const startOfDay = (date?: Date | number) => {
  const d = !date || typeof(date) === 'number' ? new Date(date ?? Date.now()) : date;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export const startOfDayUnix = (offset: number) => startOfDay().getTime() + (offset ?? 0);

export const daysBetween = (a: Date | number, b: Date | number) => Math.abs(Math.round((b.valueOf() - a.valueOf()) / (1000 * 60 * 60 * 24)));

const pad = (value: number) => String(value).padStart(2, '0');

export const toDbFormatUnix = (value: number) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
}