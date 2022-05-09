export function required(a) {
  console.log(this.name);
  throw new Error(`Missing parameter: ${a}`);
}
