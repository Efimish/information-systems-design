import { parseDate, parseCarNumber } from './utils';

/**
 * Class representing a car that passed the checkpoint.
 * 
 * Класс, представляющий автомобиль, прошедший контрольную точку.
 */
export default class PassedCar {
    date: Date;
    number: string;

    constructor(date: Date, number: string) {
        this.date = date;
        this.number = number;
    }
}