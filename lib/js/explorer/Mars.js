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

            var nextPosition = Instruction.execute(currentPosition, instruction);
            if (isLost(nextPosition, this)) {
                this.lostRobotPositions.add(currentPosition.toString());
                currentPosition = new Position(
                    currentPosition.getX(), currentPosition.getY(), currentPosition.getOrientation(), LOST
                );
                return false;

            } else {
                currentPosition = nextPosition;
                return true;
            }
        });
        return currentPosition;
    }
}

const LOST = true;

function isLost(position, planet) {
    return position.getX() < 0 || position.getX() > planet.width
        || position.getY() < 0 || position.getY() > planet.height;
}
