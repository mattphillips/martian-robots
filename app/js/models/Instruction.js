import { Enum } from 'enumify';
import Orientation from './Orientation';
import Position from './Position';

export default class Instruction extends Enum {
  static fromString(str) {
    const instruction = FROM_STRING[str.toUpperCase()];
    if (!instruction)
        throw new Error('Unrecognised instruction ' +  str + '. Valid instructions are: L, R, F');

    return instruction;
  }

  static execute(position, instruction) {
    if (instruction === Instruction.RIGHT)
      return new Position(position.getX(), position.getY(), MOVE_RIGHT[position.getOrientation().name]);
    else if (instruction === Instruction.LEFT)
      return new Position(position.getX(), position.getY(), MOVE_LEFT[position.getOrientation().name]);
    else if (instruction === Instruction.FORWARD)
      return moveForward(position);
  }
}

Instruction.initEnum(['FORWARD', 'LEFT', 'RIGHT']);

const MOVE_RIGHT = {
  NORTH: Orientation.EAST,
  EAST: Orientation.SOUTH,
  SOUTH: Orientation.WEST,
  WEST: Orientation.NORTH
};

const MOVE_LEFT = {
  NORTH: Orientation.WEST,
  EAST: Orientation.NORTH,
  SOUTH: Orientation.EAST,
  WEST: Orientation.SOUTH
};

const FROM_STRING = {
  F: Instruction.FORWARD,
  L: Instruction.LEFT,
  R: Instruction.RIGHT
};

const moveForward = from => {
  const o = from.getOrientation();
  if (o === Orientation.EAST)
    return new Position(from.getX() + 1, from.getY(), from.getOrientation());
  else if (o === Orientation.NORTH)
    return new Position(from.getX(), from.getY() + 1, from.getOrientation());
  else if (o === Orientation.SOUTH)
    return new Position(from.getX(), from.getY() - 1, from.getOrientation());
  else if (o === Orientation.WEST)
    return new Position(from.getX() - 1, from.getY(), from.getOrientation());
};
