import PassedCar from './PassedCar';
import PassedCarWithSpeed from './PassedCarWithSpeed';
import RegistredPassedCar from './RegisteredPassedCar';
import {
    parseString,
    parseDate,
    parseCarNumber,
    checkString
} from './utils';

const CAR_TYPES = ['basic', 'registered', 'with speed'] as const;
export type StringCarType = typeof CAR_TYPES[number];
export type CarType = PassedCar | RegistredPassedCar | PassedCarWithSpeed;

import fs from 'fs';

export function readFromFile() {
    return fs.readFileSync('data.txt').toString();
}

export function splitTextToLines(text: string) {
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

export function splitLine(text: string) {
    return text.trim().split('  ');
}

function getLineType(text: string): StringCarType {
    if (!checkString(text)) throw new Error('Первое поле в строке должно быть типом данных!');
    const str = parseString(text);

    if ((CAR_TYPES as ReadonlyArray<string>).includes(str)) {
        return str as StringCarType;
    }
    else throw new Error('Неверный тип данных');
}

function createPassedCarFromArguments(...args: string[]): PassedCar {
    const [date, sNumber] = args;
    if (!checkString(sNumber)) throw new Error('Номер должен быть строкой!');
    const number = parseString(sNumber);
    return new PassedCar(
        parseDate(date),
        parseCarNumber(number)
    );
}

function createRegisteredPassedCarFromArguments(...args: string[]): RegistredPassedCar {
    const [date, sNumber, owner] = args;
    if (!checkString(sNumber)) throw new Error('Номер должен быть строкой!');
    const number = parseString(sNumber);
    return new RegistredPassedCar(
        parseDate(date),
        parseCarNumber(number),
        parseString(owner)
    );
}

function createPassedCarWithSpeedFromArguments(...args: string[]): PassedCarWithSpeed {
    const [date, sNumber, speed] = args;
    if (!checkString(sNumber)) throw new Error('Номер должен быть строкой!');
    const number = parseString(sNumber);
    return new PassedCarWithSpeed(
        parseDate(date),
        parseCarNumber(number),
        Number(speed)
    );
}

export function createCarFromArguments(...args: string[]): CarType {
    const type = getLineType(args.shift());
    switch (type) {
        case 'basic':
            return createPassedCarFromArguments(...args);
        case 'registered':
            return createRegisteredPassedCarFromArguments(...args);
        case 'with speed':
            return createPassedCarWithSpeedFromArguments(...args);
    }
}