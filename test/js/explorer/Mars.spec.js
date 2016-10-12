import { expect } from 'chai';

import Instruction from '../../../app/js/models/Instruction';
import Mars from '../../../app/js/explorer/Mars';
import Orientation from '../../../app/js/models/Orientation';
import Position from '../../../app/js/models/Position';
import Robot from '../../../app/js/models/Robot';

describe('should move robot for a given list of instructions', () => {
  it('should move around mars safely', () => {
    const robot = new Robot(
      new Position(2, 2, Orientation.EAST),
      [
        Instruction.FORWARD,
        Instruction.RIGHT,
        Instruction.FORWARD,
        Instruction.LEFT,
        Instruction.LEFT,
        Instruction.FORWARD,
        Instruction.LEFT,
        Instruction.FORWARD
      ]
    );

    const mars = new Mars(5, 3);
    const finalPosition = mars.move(robot);

    expect(finalPosition).to.deep.equal(new Position(2, 2, Orientation.WEST));
  });

  it('should move robot to fall off the north edge of mars and set the position to lost', () => {
    const robot = new Robot(
      new Position(0, 0, Orientation.NORTH),
      [
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD
      ]
    );

    const mars = new Mars(5, 3);
    const finalPosition = mars.move(robot);

    expect(finalPosition).to.deep.equal(new Position(0, 3, Orientation.NORTH, true));
    expect(finalPosition.isLost()).to.be.true;
  });

  it('should move robot to fall off the south edge of mars and set the position to lost', () => {
    const robot = new Robot(
      new Position(0, 0, Orientation.SOUTH),
      [
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD
      ]
    );

    const mars = new Mars(5, 3);
    const finalPosition = mars.move(robot);

    expect(finalPosition).to.deep.equal(new Position(0, 0, Orientation.SOUTH, true));
    expect(finalPosition.isLost()).to.be.true;
  });

  it('should move robot to fall off the east edge of mars and set the position to lost', () => {
    const robot = new Robot(
      new Position(3, 0, Orientation.EAST),
      [
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD
      ]
    );

    const mars = new Mars(5, 3);
    const finalPosition = mars.move(robot);

    expect(finalPosition).to.deep.equal(new Position(5, 0, Orientation.EAST, true));
    expect(finalPosition.isLost()).to.be.true;
  });

  it('should move robot to fall off the west edge of mars and set the position to lost', () => {
    const robot = new Robot(
      new Position(3, 0, Orientation.WEST),
      [
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD,
        Instruction.FORWARD
      ]
    );

    const mars = new Mars(5, 3);
    const finalPosition = mars.move(robot);

    expect(finalPosition).to.deep.equal(new Position(0, 0, Orientation.WEST, true));
    expect(finalPosition.isLost()).to.be.true;
  });

  it('should move robot to edge with the scent from a lost robot and should skip any moves that will make the robot fall off the edge', () => {
    const instructions = [
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD
    ];
    const lostRobot = new Robot(new Position(0, 0, Orientation.NORTH), instructions);
    const safeRobot = new Robot(new Position(0, 0, Orientation.NORTH), instructions);

    const mars = new Mars(5, 3);
    const lostRobotFinalPosition = mars.move(lostRobot);
    const safeRobotFinalPosition = mars.move(safeRobot);

    expect(lostRobotFinalPosition).to.deep.equal(new Position(0, 3, Orientation.NORTH, true));
    expect(lostRobotFinalPosition.isLost()).to.be.true;

    expect(safeRobotFinalPosition).to.deep.equal(new Position(1, 3, Orientation.EAST));
    expect(safeRobotFinalPosition.isLost()).to.be.false;
  });

  it('should not skip an instruction on a position with a lost robot scent when the next instruction will not take it off of mars', () => {
    const lostRobot = new Robot(new Position(2, 0, Orientation.NORTH), [
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD
    ]);
    const safeRobot = new Robot(new Position(1, 3, Orientation.EAST), [
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD
    ]);

    const mars = new Mars(5, 3);
    const lostRobotFinalPosition = mars.move(lostRobot);
    const safeRobotFinalPosition = mars.move(safeRobot);

    expect(lostRobotFinalPosition).to.deep.equal(new Position(2, 3, Orientation.NORTH, true));
    expect(lostRobotFinalPosition.isLost()).to.be.true;

    expect(safeRobotFinalPosition).to.deep.equal(new Position(4, 2, Orientation.SOUTH));
    expect(safeRobotFinalPosition.isLost()).to.be.false;
  });
});
