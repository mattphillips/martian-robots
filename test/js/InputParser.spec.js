import { expect } from 'chai';

import InputParser from '../../app/js/InputParser';
import Instruction from '../../app/js/models/Instruction';
import Mars from '../../app/js/explorer/Mars';
import Orientation from '../../app/js/models/Orientation';
import Position from '../../app/js/models/Position';
import Robot from '../../app/js/models/Robot';

describe('should correctly convert inputs into mars and robots', () => {
  it('should create mars from inputs', () => {
    const input = ['5 3'];
    expect(InputParser.parse(input).mars).to.deep.equal(new Mars(5, 3));
  });

  it('should create robot from input', () => {
    const input = ['5 3', '1 1 E', 'LRF'];
    expect(InputParser.parse(input).robots[0]).to.deep.equal(
      new Robot(new Position(1, 1, Orientation.EAST), [Instruction.LEFT, Instruction.RIGHT, Instruction.FORWARD])
    );
  });

  it('should create robots from input', () => {
    const input = ['5 3', '1 1 E', 'R', '2 2 S', 'F', '4 2 W', 'L'];
    const robots = InputParser.parse(input).robots;
    expect(robots.length).to.deep.equal(3);
    expect(robots[0]).to.deep.equal(new Robot(new Position(1, 1, Orientation.EAST), [Instruction.RIGHT]));
    expect(robots[1]).to.deep.equal(new Robot(new Position(2, 2, Orientation.SOUTH), [Instruction.FORWARD]));
    expect(robots[2]).to.deep.equal(new Robot(new Position(4, 2, Orientation.WEST), [Instruction.LEFT]));
  });
});
