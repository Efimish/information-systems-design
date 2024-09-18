const stringRegexp = /^".*"$/;
const dateRegexp = /^\d{4}.\d{2}.\d{2}$/;
const carNumberRegexp = /^[a-zа-я]\d{3}[a-zа-я]{2} \d{2,3}$/i;

// checkers

export function checkString(text: string) {
    return stringRegexp.test(text);
}

export function checkDate(text: string) {
    return dateRegexp.test(text);
}

export function checkCarNumber(text: string) {
    return carNumberRegexp.test(text);
}

export function checkNumber(str: string): boolean {
    return !isNaN(Number(str));
}

// parsers

export function parseString(text: string): string {
    if (!checkString(text)) throw new Error('Неверный формат строки');
    return text.slice(1, -1);
}

export function parseDate(text: string): Date {
    if (!checkDate(text)) throw new Error('Неверный формат даты');
    const [year, month, day] = text.trim().split('.').map(Number);
    return new Date(year, month - 1, day);
}

export function parseCarNumber(text: string): string {
    if (!checkCarNumber(text)) throw new Error('Неверный формат номера автомобиля');
    return text.toUpperCase();
}
