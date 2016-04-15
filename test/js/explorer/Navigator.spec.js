import { Navigator } from '../../lib/js/explorer/Navigator';
import { Mars } from '../../lib/js/explorer/Mars';
import { Position } from '../../lib/js/models/Position';
import { Orientation } from '../../lib/js/models/Orientation';
import { Instruction } from '../../lib/js/models/Instruction';
import { Robot } from '../../lib/js/models/Robot';

describe("should navigate robots across mars", function() {

    it("should move robots from start to expected finish positions", function() {
        var mars = new Mars(5,3);
        var navigator = new Navigator(mars);

        var robots = [
            new Robot(
                new Position(1,1, Orientation.EAST),
                [ Instruction.RIGHT, Instruction.FORWARD, Instruction.RIGHT, Instruction.FORWARD,
                Instruction.RIGHT, Instruction.FORWARD, Instruction.RIGHT, Instruction.FORWARD ]
            ),
            new Robot(
                new Position(3,2, Orientation.NORTH),
                [ Instruction.FORWARD, Instruction.RIGHT, Instruction.RIGHT, Instruction.FORWARD,
                Instruction.LEFT, Instruction.LEFT, Instruction.FORWARD, Instruction.FORWARD, Instruction.RIGHT,
                Instruction.RIGHT, Instruction.FORWARD, Instruction.LEFT, Instruction.LEFT ]
            ),
            new Robot(
                new Position(0,3, Orientation.WEST),
                [ Instruction.LEFT, Instruction.LEFT, Instruction.FORWARD, Instruction.FORWARD, Instruction.FORWARD,
                Instruction.LEFT, Instruction.FORWARD, Instruction.LEFT, Instruction.FORWARD, Instruction.LEFT ]
            )
        ];

        var finalPositions = navigator.navigate(robots);

        expect(finalPositions.length).toEqual(3);
        expect(finalPositions[0]).toEqual(new Position(1,1, Orientation.EAST));
        expect(finalPositions[1]).toEqual(new Position(3,3, Orientation.NORTH, true));
        expect(finalPositions[1].isLost()).toBeTruthy();
        expect(finalPositions[2]).toEqual(new Position(2,3, Orientation.SOUTH));
    });
});
