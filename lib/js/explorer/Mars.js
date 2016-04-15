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
            currentPosition = Instruction.execute(currentPosition, instruction);
            return true;
        });
        return currentPosition;
    }
}
