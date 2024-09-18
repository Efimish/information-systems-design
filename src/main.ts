import {
    createCarFromArguments,
    readFromFile,
    splitLine,
    splitTextToLines
} from './logic';

const data = `
"basic"  3022.12.22  "о777оо 124"
"basic"  3020.12.22  "а777бв 77"
"basic"  3030.01.03  "о77оо 124"
"basic"  3030.01.03  "о777оо 1248"
"basic"  3022.12.222  "о777оо 124"
"basic"  today  "о777оо 124"

"with speed"  3022.12.22  "о777оо 124"  100
"with speed"  3022.12.22  "о777оо 1248"  100
"with speed"  3022.12.22  "о777оо 124"  10000.55
"with speed"  3022.12.222  "о777оо 124"  60

"registered"  3022.12.22  "о777оо 124"  "Ефим"
"registered"  3022.12.22  "о777оо 1248"  "Ефим"
"registered"  3022.12.22  "о777оо 124"  "Ещё кто-то"
"registered"  3022.12.222  "о777оо 124"  "Ефим"

3022.12.22
random text
"o777oo 100"
`;

function startFromVariable() {
    const text = data;
    const lines = splitTextToLines(text);
    lines.forEach(line => {
        console.log('\n --- Получена строка:', line);
        const args = splitLine(line);
        try {
            const car = createCarFromArguments(...args);
            console.log('Создан объект:', car);
        } catch (error) {
            console.error(error.message);
        }
    });
}

function startFromFile() {
    const text = readFromFile();
    const lines = splitTextToLines(text);
    lines.forEach(line => {
        console.log('\n --- Получена строка:', line);
        const args = splitLine(line);
        try {
            const car = createCarFromArguments(...args);
            console.log('Создан объект:', car);
        } catch (error) {
            console.error(error.message);
        }
    });
}

startFromVariable();