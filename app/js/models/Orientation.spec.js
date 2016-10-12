import { expect } from 'chai';

import Orientation from './Orientation';

describe('Orientation', () => {
  describe('.fromString', () => {
    it('returns Orientation from uppercase character', () => {
      expect(Orientation.fromString('N')).to.deep.equal(Orientation.NORTH);
      expect(Orientation.fromString('E')).to.deep.equal(Orientation.EAST);
      expect(Orientation.fromString('S')).to.deep.equal(Orientation.SOUTH);
      expect(Orientation.fromString('W')).to.deep.equal(Orientation.WEST);
      expect(() => Orientation.fromString('X')).to.throw('Unrecognised orientation X. Valid orientations are: N, E, S, W');
    });

    it('returns Orientation from lowercase character', () => {
      expect(Orientation.fromString('n')).to.deep.equal(Orientation.NORTH);
      expect(Orientation.fromString('e')).to.deep.equal(Orientation.EAST);
      expect(Orientation.fromString('s')).to.deep.equal(Orientation.SOUTH);
      expect(Orientation.fromString('w')).to.deep.equal(Orientation.WEST);
      expect(() => Orientation.fromString('x')).to.throw('Unrecognised orientation x. Valid orientations are: N, E, S, W');
    });
  });
});
