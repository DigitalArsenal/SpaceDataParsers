import { parse } from './main'
import { LegacyFormat } from "./lib/legacyformat.enum";

test('parse TLE', () => {
  let { TLE } = LegacyFormat;
  expect(parse(TLE)).toBe(TLE);
});

test('parse SATCAT', () => {
  let { SATCAT } = LegacyFormat;
  expect(parse(SATCAT)).toBe(SATCAT);
});

test('parse VCM', () => {
  let { VCM } = LegacyFormat;
  expect(parse(VCM)).toBe(VCM);
});

test('parse VCEPH', () => {
  let { VCEPH } = LegacyFormat;
  expect(parse(VCEPH)).toBe(VCEPH);
});