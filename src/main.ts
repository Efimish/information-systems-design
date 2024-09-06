/**
 * Regular expression for car number.
 * Example: 'a123bc 123'
 * 
 * Регулярное выражение для номера автомобиля.
 * Пример: 'a123bc 123'
 */
const carNumberRegex = /^[a-zа-я]\d{3}[a-zа-я]{2} \d{2,3}$/i;

/**
 * Regular expression for date strings.
 * Example: '2022.22.12'
 * 
 * Регулярное выражение для строк даты.
 * Пример: '2022.22.12'
 */
const dateStringRegex = /^\d{4}.\d{2}.\d{2}$/;

/**
 * Converts a date string to actual date.
 * Example: '2022.12.22' -> new Date(2022, 11, 22)
 * 
 * Преобразует строку даты в фактическую дату.
 * Пример: '2022.12.22' -> new Date(2022, 11, 22)
 */
function parseDate(dateString: string): Date {
    if (!dateStringRegex.test(dateString)) throw new Error('Неверный формат даты');
    const [year, month, day] = dateString.trim().split('.').map(x => parseInt(x));
    return new Date(year, month - 1, day);
}

/**
 * Checks if a string is a valid number.
 * 
 * Проверяет, является ли строка допустимым числом.
 */
function isValidNumber(str: string): boolean {
    return !isNaN(Number(str));
}

/**
 * Tests a car number string and converts it to UpperCase.
 * Example: 'a123bc 123' -> 'A123BC 123'
 * 
 * Проверяет номер автомобиля и преобразует его в верхний регистр.
 * Пример: 'a123bc 123' -> 'A123BC 123'
 */
function parseCarNumber(number: string): string {
    if (!carNumberRegex.test(number)) throw new Error('Неверный номер автомобиля');
    return number.toUpperCase();
}

/**
 * Class representing a car that passed the checkpoint.
 * 
 * Класс, представляющий автомобиль, прошедший контрольную точку.
 */
class PassedCar {
    date: Date;
    number: string;

    constructor(date: string, number: string) {
        this.date = parseDate(date);
        this.number = parseCarNumber(number);
    }
}

/**
 * Class representing a registered car that passed the checkpoint.
 * 
 * Класс, представляющий зарегистрированный автомобиль, прошедший контрольную точку.
 */
class RegistredPassedCar extends PassedCar {
    owner: string;

    constructor(date: string, number: string, owner: string) {
        super(date, number);
        this.owner = owner;
    }
}

/**
 * Class representing a car that passed the checkpoint with speed.
 * 
 * Класс, представляющий автомобиль, прошедший контрольную точку с указанием скорости.
 */
class PassedCarWithSpeed extends PassedCar {
    speed: number;

    constructor(date: string, number: string, speed: number) {
        super(date, number);
        this.speed = speed;
    }
}


import * as fs from 'fs';
// Текст из файла, сразу уберем лишние пробелы и разобьем на строки.
// Уберём пустые строки.
const lines = fs.readFileSync('data.txt').toString()
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

for (const line of lines) {
    console.log('\n --- Получена строка:', line);
    const parts = line.replaceAll('"', '').split('  ');

    // какие данные мы получили? какой класс из них создать?
    let typeOfCar: 'basic' | 'registered' | 'with speed' = 'basic';

    try {
        if (parts.length > 2) {
            if (isValidNumber(parts[2])) typeOfCar = 'with speed';
            else typeOfCar = 'registered';
        }
        else if (parts.length < 2) throw new Error('Недостаточно данных');
        switch (typeOfCar) {
            case 'basic': {
                const [date, number] = parts;
                const car = new PassedCar(date, number);
                console.log('Машина успешно создана:', car);
                break;
            };
            case 'registered': {
                const [date, number, owner] = parts;
                const car = new RegistredPassedCar(date, number, owner);
                console.log('Зарегистрированная Машина успешно создана:', car);
                break;
            };
            case 'with speed': {
                const [date, number, speed] = parts;
                const car = new PassedCarWithSpeed(date, number, Number(speed));
                console.log('Машина со скоростью успешно создана:', car);
                break;
            };
        }
    } catch (error) {
        console.error(error.message);
    }
}