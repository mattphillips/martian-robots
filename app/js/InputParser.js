import { Instruction } from './models/Instruction';
import { Robot } from './models/Robot';
import { Position } from './models/Position';
import { Orientation } from './models/Orientation';
import { Mars } from './explorer/Mars';

export class InputParser {
    static parse(inputs) {
        return {
            mars: buildMars(inputs.shift()),
            robots: buildRobots(inputs)
        }
    }
}

function buildMars(marsInput) {
    var marsDimensions = splitOnWhiteSpace(marsInput);
    return new Mars(parseInt(marsDimensions[0]), parseInt(marsDimensions[1]));
}

function buildRobots(robotInputs) {
    var robots = [];

    for (var i = 0; i < robotInputs.length; i += 2) {
        var positionInput = splitOnWhiteSpace(robotInputs[i]);
        var position = new Position(
            parseInt(positionInput[0]), parseInt(positionInput[1]), Orientation.fromString(positionInput[2])
        );

        var instructions = robotInputs[i+1].split('').map(instruction => {
            return Instruction.fromString(instruction);
        });

        robots.push(new Robot(position, instructions));
    }
    return robots;
}

function splitOnWhiteSpace(str) {
    return str.split(' ');
}

