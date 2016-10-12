import { expect } from 'chai';

import InputParser from './InputParser';
import Instruction from './models/Instruction';
import Mars from './explorer/Mars';
import Orientation from './models/Orientation';
import Position from './models/Position';
import Robot from './models/Robot';

describe('Input Parser', () => {
  it('returns mars from inputs', () => {
    const input = ['5 3'];
    expect(InputParser.parse(input).mars).to.deep.equal(new Mars(5, 3));
  });

  it('returns single robot from input', () => {
    const input = ['5 3', '1 1 E', 'LRF'];
    expect(InputParser.parse(input).robots[0]).to.deep.equal(
      new Robot(new Position(1, 1, Orientation.EAST), [Instruction.LEFT, Instruction.RIGHT, Instruction.FORWARD])
    );
  });

  it('returns multiple robots from input', () => {
    const input = ['5 3', '1 1 E', 'R', '2 2 S', 'F', '4 2 W', 'L'];
    const robots = InputParser.parse(input).robots;
    expect(robots.length).to.deep.equal(3);
    expect(robots[0]).to.deep.equal(new Robot(new Position(1, 1, Orientation.EAST), [Instruction.RIGHT]));
    expect(robots[1]).to.deep.equal(new Robot(new Position(2, 2, Orientation.SOUTH), [Instruction.FORWARD]));
    expect(robots[2]).to.deep.equal(new Robot(new Position(4, 2, Orientation.WEST), [Instruction.LEFT]));
  });
});
