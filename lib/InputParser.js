import Instruction from './models/Instruction';
import Robot from './models/Robot';
import Position from './models/Position';
import Orientation from './models/Orientation';
import Mars from './explorer/Mars';

export default class InputParser {
  static parse(inputs) {
    return {
      mars: buildMars(inputs.shift()),
      robots: buildRobots(inputs)
    };
  }
}

const buildMars = marsInput => {
  const marsDimensions = splitOnWhiteSpace(marsInput);
  return new Mars(parseInt(marsDimensions[0]), parseInt(marsDimensions[1]));
};

const buildRobots = robotInputs => robotInputs.reduce((acc, input, i) => {
  if (i % 2 === 0) {
    const [x, y, orientation] = splitOnWhiteSpace(robotInputs[i]);
    const position = new Position(parseInt(x), parseInt(y), Orientation.fromString(orientation));
    const instructions = [...robotInputs[i + 1]].map(instruction => Instruction.fromString(instruction));
    return acc.concat(new Robot(position, instructions));
  }

  return acc;
}, []);

const splitOnWhiteSpace = str => str.split(' ');
