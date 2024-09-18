import { checkCarNumber, checkDate, checkNumber, checkString, parseCarNumber, parseDate, parseNumber, parseString } from "../src/utils"

// CHECKERS

test('check strings', () => {
    expect(checkString('"string"')).toBe(true);
    expect(checkString('"another string"')).toBe(true);
    expect(checkString('"""""""')).toBe(true);
    expect(checkString('"/"/"/...,.,,@SAISD6876_--+"')).toBe(true);

    expect(checkString('"_')).toBe(false);
    expect(checkString('random string')).toBe(false);
    expect(checkString('')).toBe(false);
})

test('check dates', () => {
    expect(checkDate('0000.00.00')).toBe(true);
    expect(checkDate('2024.09.18')).toBe(true);

    expect(checkDate('0000,00,00')).toBe(false);
    expect(checkDate('0000 00 00')).toBe(false);
    expect(checkDate('00.00.00')).toBe(false);
    expect(checkDate('00.00.0000')).toBe(false);
    expect(checkDate('random string')).toBe(false);
    expect(checkDate('')).toBe(false);
})

test('check car numbers', () => {
    expect(checkCarNumber('o777oo 777')).toBe(true);
    expect(checkCarNumber('o777oo 77')).toBe(true);
    expect(checkCarNumber('a198bc 123')).toBe(true);

    expect(checkCarNumber('o777oo 7')).toBe(false);
    expect(checkCarNumber('o777oo 7777')).toBe(false);
    expect(checkCarNumber('ooo777 777')).toBe(false);
    expect(checkCarNumber('777ooo 777')).toBe(false);
    expect(checkCarNumber('random string')).toBe(false);
    expect(checkCarNumber('')).toBe(false);
})

test('check numbers', () => {
    expect(checkNumber('123')).toBe(true);
    expect(checkNumber('0')).toBe(true);
    expect(checkNumber('100.55')).toBe(true);
    expect(checkNumber('-1')).toBe(true);

    expect(checkNumber('1235,69')).toBe(false);
    expect(checkNumber('random string')).toBe(false);
    expect(checkNumber('')).toBe(false);
})

// PARSERS

test('parse strings', () => {
    expect(parseString('"string"')).toBe('string');
    expect(parseString('"another string"')).toBe('another string');
    expect(parseString('"""""""')).toBe('"""""');
    expect(parseString('"/"/"/...,.,,@SAISD6876_--+"')).toBe('/"/"/...,.,,@SAISD6876_--+');

    expect(() => parseString('"_')).toThrow();
    expect(() => parseString('random string')).toThrow();
    expect(() => parseString('')).toThrow();
})

test('parse dates', () => {
    expect(parseDate('0000.00.00')).toStrictEqual(new Date(0, -1 ,0));
    expect(parseDate('2024.09.18')).toStrictEqual(new Date(2024, 8, 18));

    expect(() => parseDate('0000,00,00')).toThrow();
    expect(() => parseDate('0000 00 00')).toThrow();
    expect(() => parseDate('00.00.00')).toThrow();
    expect(() => parseDate('00.00.0000')).toThrow();
    expect(() => parseDate('random string')).toThrow();
    expect(() => parseDate('')).toThrow();
})

test('parse car numbers', () => {
    expect(parseCarNumber('o777oo 777')).toBe('O777OO 777');
    expect(parseCarNumber('o777oo 77')).toBe('O777OO 77');
    expect(parseCarNumber('a198bc 123')).toBe('A198BC 123');

    expect(() => parseCarNumber('o777oo 7')).toThrow();
    expect(() => parseCarNumber('o777oo 7777')).toThrow();
    expect(() => parseCarNumber('ooo777 777')).toThrow();
    expect(() => parseCarNumber('777ooo 777')).toThrow();
    expect(() => parseCarNumber('random string')).toThrow();
    expect(() => parseCarNumber('')).toThrow();
})

test('parse numbers', () => {
    expect(parseNumber('123')).toBe(123);
    expect(parseNumber('0')).toBe(0);
    expect(parseNumber('100.55')).toBe(100.55);
    expect(parseNumber('-1')).toBe(-1);

    expect(() => parseNumber('1235,69')).toThrow();
    expect(() => parseNumber('random string')).toThrow();
    expect(() => parseNumber('')).toThrow();
})