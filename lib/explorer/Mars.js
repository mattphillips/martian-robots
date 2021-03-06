import Instruction from './../models/Instruction';
import Orientation from './../models/Orientation';
import Position from './../models/Position';
import Robot from './../models/Robot';

export default class Mars {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.lostRobotPositions = new Set();
  }

  move(robot) {
    let currentPosition = robot.getPosition();
    robot.getInstructions().every(instruction => {

      if (isScentInCurrentPosition(currentPosition, this.lostRobotPositions) && isNextInstructionForward(instruction)) {
        return MOVE_TO_NEXT_INSTRUCTION;
      }

      const nextPosition = Instruction.execute(currentPosition, instruction);

      if (isLost(nextPosition, this.width, this.height)) {
        this.lostRobotPositions.add(currentPosition.toString());
        currentPosition = new Position(
            currentPosition.getX(), currentPosition.getY(), currentPosition.getOrientation(), LOST
        );
        return STOP_ALL_INSTRUCTIONS;

      } else {
        currentPosition = nextPosition;
        return MOVE_TO_NEXT_INSTRUCTION;
      }
    });
    return currentPosition;
  }
}

const MOVE_TO_NEXT_INSTRUCTION = true;
const STOP_ALL_INSTRUCTIONS = false;
const LOST = true;

const isScentInCurrentPosition = (currentPosition, lostRobotPositions) =>
  lostRobotPositions.has(currentPosition.toString());

const isNextInstructionForward = instruction => instruction == Instruction.FORWARD;

const isLost = (position, width, height) =>
  position.getX() < 0 || position.getX() > width || position.getY() < 0 || position.getY() > height;
