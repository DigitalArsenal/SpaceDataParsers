export function required(a) {
    throw new Error(`Missing parameter: ${a}`);
}
