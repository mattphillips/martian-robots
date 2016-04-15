import { InputParser } from '../../lib/js/InputParser';
import { Instruction } from '../../lib/js/models/Instruction';
import { Mars } from '../../lib/js/explorer/Mars';
import { Orientation } from '../../lib/js/models/Orientation';
import { Position } from '../../lib/js/models/Position';
import { Robot } from '../../lib/js/models/Robot';

describe("should correctly convert inputs into mars and robots", function () {

    it("should create mars from inputs", function () {
        var input = [
            '5 3'
        ];
        expect(InputParser.parse(input).mars).toEqual(new Mars(5, 3));
    });

    it("should create robot from input", function () {
        var input = [
            '5 3', '1 1 E', 'LRF'
        ];
        expect(InputParser.parse(input).robots[0]).toEqual(
            new Robot(new Position(1, 1, Orientation.EAST), [Instruction.LEFT, Instruction.RIGHT, Instruction.FORWARD])
        );
    });

    it("should create robots from input", function () {
        var input = [
            '5 3', '1 1 E', 'R', '2 2 S', 'F', '4 2 W', 'L'
        ];
        var robots = InputParser.parse(input).robots;
        expect(robots.length).toEqual(3);
        expect(robots[0]).toEqual(new Robot(new Position(1, 1, Orientation.EAST), [Instruction.RIGHT]));
        expect(robots[1]).toEqual(new Robot(new Position(2, 2, Orientation.SOUTH), [Instruction.FORWARD]));
        expect(robots[2]).toEqual(new Robot(new Position(4, 2, Orientation.WEST), [Instruction.LEFT]));
    });
});
