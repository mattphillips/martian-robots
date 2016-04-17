import { InputParser } from './InputParser';
import { Navigator } from './explorer/Navigator';

var args = process.argv.slice(2);

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Please enter Mars dimensions, followed by all Robots. Use the word go to move the Robots');

var inputs = [];

rl.on('line', (line) => {

    if (line == 'go') {

        var data = InputParser.parse(inputs);

        var navigator = new Navigator(data.mars);
        printFinalPositions(navigator.navigate(data.robots));

        rl.close();

    } else if (isNotNewLine(line)) {
        inputs.push(line);
    }
});

function isNotNewLine(line) {
    return line.replace(/(\r|\n)/g,'') != '';
}

function printFinalPositions(positions) {
    console.log('')
    positions.forEach(p => {
        console.log(p.toString());
    });
}
