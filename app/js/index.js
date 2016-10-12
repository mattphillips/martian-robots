import readLine from 'readline';

import InputParser from './InputParser';
import Navigator from './explorer/Navigator';

const args = process.argv.slice(2);

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Please enter Mars dimensions, followed by all Robots. Use the word `go` to move the Robots:');

let inputs = [];

rl.on('line', (line) => {
  if (line === 'go') {
    const data = InputParser.parse(inputs);
    const navigator = new Navigator(data.mars);
    console.log('');
    printFinalPositions(navigator.navigate(data.robots));

    rl.close();

  } else if (isNotNewLine(line)) {
    inputs.push(line);
  }
});

const isNotNewLine = line => line.replace(/(\r|\n)/g, '') !== '';

const printFinalPositions = positions => positions.forEach(p => console.log(p.toString()));
