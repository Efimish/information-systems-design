import PassedCar from './PassedCar';

/**
 * Class representing a registered car that passed the checkpoint.
 * 
 * Класс, представляющий зарегистрированный автомобиль, прошедший контрольную точку.
 */
export default class RegistredPassedCar extends PassedCar {
    owner: string;

    constructor(date: Date, number: string, owner: string) {
        super(date, number);
        this.owner = owner;
    }
}