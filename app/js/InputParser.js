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

const buildRobots = robotInputs => {
  let robots = [];

  for (let i = 0; i < robotInputs.length; i += 2) {
    const positionInput = splitOnWhiteSpace(robotInputs[i]);
    const position = new Position(
      parseInt(positionInput[0]),
      parseInt(positionInput[1]),
      Orientation.fromString(positionInput[2])
    );
    const instructions = robotInputs[i + 1]
      .split('')
      .map(instruction => Instruction.fromString(instruction));

    robots.push(new Robot(position, instructions));
  }

  return robots;
};

const splitOnWhiteSpace = str => str.split(' ');
