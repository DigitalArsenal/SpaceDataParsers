export function required(a: any) {
  throw new Error(`Missing parameter: ${a}`);
}
