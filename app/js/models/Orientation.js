import { Enum } from 'enumify';

export class Orientation extends Enum {

    static fromString(str) {
        var o = FROM_STRING[str.toUpperCase()];
        if (o == null)
            throw new Error('Unrecognised orientation ' +  str + '. Valid orientations are: N, E, S, W');

        return o;
    }

    toString() {
        return this.name.charAt(0);
    }
}

Orientation.initEnum(['NORTH', 'EAST', 'SOUTH', 'WEST']);

const FROM_STRING = {
    N: Orientation.NORTH,
    E: Orientation.EAST,
    S: Orientation.SOUTH,
    W: Orientation.WEST
};
