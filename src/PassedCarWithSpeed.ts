import PassedCar from './PassedCar';

/**
 * Class representing a car that passed the checkpoint with speed.
 * 
 * Класс, представляющий автомобиль, прошедший контрольную точку с указанием скорости.
 */
export default class PassedCarWithSpeed extends PassedCar {
    speed: number;

    constructor(date: Date, number: string, speed: number) {
        super(date, number);
        this.speed = speed;
    }
}