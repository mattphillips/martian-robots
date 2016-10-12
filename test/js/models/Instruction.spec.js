import { expect } from 'chai';

import { Instruction } from '../../../app/js/models/Instruction';
import { Orientation } from '../../../app/js/models/Orientation';
import { Position } from '../../../app/js/models/Position';

describe("Should be able to create an Instruction and execute it", function () {

    describe("should correctly create an Instruction", function () {
        it("should create Instruction from string", function () {
            expect(Instruction.fromString('F')).to.deep.equal(Instruction.FORWARD);
            expect(Instruction.fromString('L')).to.deep.equal(Instruction.LEFT);
            expect(Instruction.fromString('R')).to.deep.equal(Instruction.RIGHT);
            expect( function(){ Instruction.fromString('X'); } ).to.throw(
                'Unrecognised instruction X. Valid instructions are: L, R, F'
            );
        });
    });

    describe("should correctly determine new position when executing an instruction", function () {
        it("should turn right correctly", function () {
            var northFacing = buildPosition(Orientation.NORTH);
            var eastFacing = buildPosition(Orientation.EAST);
            var southFacing = buildPosition(Orientation.SOUTH);
            var westFacing = buildPosition(Orientation.WEST);

            expect(Instruction.execute(northFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.EAST);
            expect(Instruction.execute(eastFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.SOUTH);
            expect(Instruction.execute(southFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.WEST);
            expect(Instruction.execute(westFacing, Instruction.RIGHT).getOrientation()).to.deep.equal(Orientation.NORTH);
        });

        it("should turn left correctly", function () {
            var northFacing = buildPosition(Orientation.NORTH);
            var eastFacing = buildPosition(Orientation.EAST);
            var southFacing = buildPosition(Orientation.SOUTH);
            var westFacing = buildPosition(Orientation.WEST);

            expect(Instruction.execute(northFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.WEST);
            expect(Instruction.execute(eastFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.NORTH);
            expect(Instruction.execute(southFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.EAST);
            expect(Instruction.execute(westFacing, Instruction.LEFT).getOrientation()).to.deep.equal(Orientation.SOUTH);
        });

        it("should move forward in the correct direction", function () {
            var northFacing = buildPosition(Orientation.NORTH);
            var eastFacing = buildPosition(Orientation.EAST);
            var southFacing = buildPosition(Orientation.SOUTH);
            var westFacing = buildPosition(Orientation.WEST);

            expect(Instruction.execute(northFacing, Instruction.FORWARD)).to.deep.equal(new Position(3, 4, Orientation.NORTH));
            expect(Instruction.execute(eastFacing, Instruction.FORWARD)).to.deep.equal(new Position(4, 3, Orientation.EAST));
            expect(Instruction.execute(southFacing, Instruction.FORWARD)).to.deep.equal(new Position(3, 2, Orientation.SOUTH));
            expect(Instruction.execute(westFacing, Instruction.FORWARD)).to.deep.equal(new Position(2, 3, Orientation.WEST));
        });
    });

    function buildPosition(orientation) {
        return new Position(3, 3, orientation);
    }
});
