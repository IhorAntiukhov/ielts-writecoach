export function getNounByNumber(number: number, noun: string) {
  return number === 1 ? noun : `${noun}s`;
}
