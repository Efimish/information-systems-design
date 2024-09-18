import fs from 'fs';
import { createCarFromArguments, readFromFile, splitLine, splitTextToLines } from "../src/logic"
import PassedCar from "../src/PassedCar";
import PassedCarWithSpeed from "../src/PassedCarWithSpeed";
import RegistredPassedCar from "../src/RegisteredPassedCar";

test('split text to lines', () => {
    expect(splitTextToLines('a\nb')).toStrictEqual(['a', 'b']);

    expect(splitTextToLines('s')).toStrictEqual(['s']);

    expect(splitTextToLines('\ns\n')).toStrictEqual(['s']);

    expect(splitTextToLines('\n\n')).toStrictEqual([]);
});

test('split line', () => {
    expect(splitLine('a  b')).toStrictEqual(['a', 'b']);

    expect(splitLine('a b')).toStrictEqual(['a b']);
})

test('read text from file', () => {
    expect(readFromFile()).toBe(fs.readFileSync('data.txt').toString());
})

test('create cars', () => {
    expect(
        createCarFromArguments('"basic"', '2022.12.22', '"a777aa 124"')
    ).toStrictEqual(
        new PassedCar(
            new Date(2022, 11, 22),
            'A777AA 124'
        )
    );

    expect(
        () => createCarFromArguments('"basic"', '2022.12.22', '"a777aa 123456"')
    ).toThrow();

    expect(
        () => createCarFromArguments('"basic"', '2022.12.22', 'no number')
    ).toThrow();

    expect(
        createCarFromArguments('"registered"', '2022.12.22', '"a777aa 124"', '"Efim"')
    ).toStrictEqual(
        new RegistredPassedCar(
            new Date(2022, 11, 22),
            'A777AA 124',
            'Efim'
        )
    );

    expect(
        () => createCarFromArguments('"registered"', '2022.12.22', '"a777aa 123456"', '"Efim"')
    ).toThrow();

    expect(
        () => createCarFromArguments('"registered"', '2022.12.22', 'no number', '"Efim"')
    ).toThrow();

    expect(
        createCarFromArguments('"with speed"', '2022.12.22', '"a777aa 124"', '90')
    ).toStrictEqual(
        new PassedCarWithSpeed(
            new Date(2022, 11, 22),
            'A777AA 124',
            90
        )
    );

    expect(
        () => createCarFromArguments('"with speed"', '2022.12.22', '"a777aa 123456"', '90')
    ).toThrow();

    expect(
        () => createCarFromArguments('"with speed"', '2022.12.22', 'no number', '90')
    ).toThrow();

    expect(() => createCarFromArguments('random')).toThrow();

    expect(() => createCarFromArguments('"random"')).toThrow();
    
    expect(() => createCarFromArguments('"basic"')).toThrow();

    expect(
        () => createCarFromArguments('"basic"', 'random string')
    ).toThrow();

    expect(
        () => createCarFromArguments('random string')
    ).toThrow();
})