import { expect } from 'chai';

import Instruction from './Instruction';
import Orientation from './Orientation';
import Position from './Position';

const buildPosition = orientation => new Position(3, 3, orientation);

describe('Instruction', () => {

  describe('.fromString', () => {
    it('returns correct Instruction', () => {
      expect(Instruction.fromString('F')).to.deep.equal(Instruction.FORWARD);
      expect(Instruction.fromString('L')).to.deep.equal(Instruction.LEFT);
      expect(Instruction.fromString('R')).to.deep.equal(Instruction.RIGHT);
      expect(() => Instruction.fromString('X')).to.throw('Unrecognised instruction X. Valid instructions are: L, R, F');
    });
  });

  describe('.execute', () => {
    it('returns new position that has turned right', () => {
      const northFacing = buildPosition(Orientation.NORTH);
      const eastFacing = buildPosition(Orientation.EAST);
      const southFacing = buildPosition(Orientation.SOUTH);
      const westFacing = buildPosition(Orientation.WEST);

      expect(Instruction.execute(northFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.EAST);
      expect(Instruction.execute(eastFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.SOUTH);
      expect(Instruction.execute(southFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.WEST);
      expect(Instruction.execute(westFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.NORTH);
    });

    it('returns new position that has turned left', () => {
      const northFacing = buildPosition(Orientation.NORTH);
      const eastFacing = buildPosition(Orientation.EAST);
      const southFacing = buildPosition(Orientation.SOUTH);
      const westFacing = buildPosition(Orientation.WEST);

      expect(Instruction.execute(northFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.WEST);
      expect(Instruction.execute(eastFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.NORTH);
      expect(Instruction.execute(southFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.EAST);
      expect(Instruction.execute(westFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.SOUTH);
    });

    it('returns new position that has moved forward', () => {
      const northFacing = buildPosition(Orientation.NORTH);
      const eastFacing = buildPosition(Orientation.EAST);
      const southFacing = buildPosition(Orientation.SOUTH);
      const westFacing = buildPosition(Orientation.WEST);

      expect(Instruction.execute(northFacing, Instruction.FORWARD)).to.deep.equal(new Position(3, 4, Orientation.NORTH));
      expect(Instruction.execute(eastFacing, Instruction.FORWARD)).to.deep.equal(new Position(4, 3, Orientation.EAST));
      expect(Instruction.execute(southFacing, Instruction.FORWARD)).to.deep.equal(new Position(3, 2, Orientation.SOUTH));
      expect(Instruction.execute(westFacing, Instruction.FORWARD)).to.deep.equal(new Position(2, 3, Orientation.WEST));
    });
  });
});
