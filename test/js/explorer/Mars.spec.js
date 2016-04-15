import { Instruction } from '../../../lib/js/models/Instruction';
import { Mars } from '../../../lib/js/explorer/Mars';
import { Orientation } from '../../../lib/js/models/Orientation';
import { Position } from '../../../lib/js/models/Position';
import { Robot } from '../../../lib/js/models/Robot';

describe("should move robot for a given list of instructions", function () {
    it("should move around mars safely", function () {
        var robot = new Robot(
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

        var mars = new Mars(5, 3);
        var finalPosition = mars.move(robot);

        expect(finalPosition).toEqual(new Position(2, 2, Orientation.WEST));
    });

});
