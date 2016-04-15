import { Instruction } from './../models/Instruction';
import { Orientation } from './../models/Orientation';
import { Position } from './../models/Position';
import { Robot } from './../models/Robot';

export class Mars {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.lostRobotPositions = new Set();
    }

    move(robot) {
        var currentPosition = robot.getPosition();
        robot.getInstructions().every(instruction => {

            if (isScentInCurrentPosition(currentPosition, this) && isNextInstructionForward(instruction)) {
                return MOVE_TO_NEXT_INSTRUCTION;
            }

            var nextPosition = Instruction.execute(currentPosition, instruction);

            if (isLost(nextPosition, this)) {
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

function isScentInCurrentPosition(currentPosition, planet) {
    return planet.lostRobotPositions.has(currentPosition.toString());
}

function isNextInstructionForward(instruction) {
    return instruction == Instruction.FORWARD;
}
function isLost(position, planet) {
    return position.getX() < 0 || position.getX() > planet.width
        || position.getY() < 0 || position.getY() > planet.height;
}
