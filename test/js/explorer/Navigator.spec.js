import { expect } from 'chai';

import { Navigator } from '../../../app/js/explorer/Navigator';
import { Mars } from '../../../app/js/explorer/Mars';
import { Position } from '../../../app/js/models/Position';
import { Orientation } from '../../../app/js/models/Orientation';
import { Instruction } from '../../../app/js/models/Instruction';
import { Robot } from '../../../app/js/models/Robot';

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

        expect(finalPositions.length).to.deep.equal(3);
        expect(finalPositions[0]).to.deep.equal(new Position(1,1, Orientation.EAST));
        expect(finalPositions[1]).to.deep.equal(new Position(3,3, Orientation.NORTH, true));
        expect(finalPositions[1].isLost()).to.be.true;
        expect(finalPositions[2]).to.deep.equal(new Position(2,3, Orientation.SOUTH));
    });
});
