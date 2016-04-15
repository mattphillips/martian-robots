import { Instruction } from '../../../app/js/models/Instruction';
import { Orientation } from '../../../app/js/models/Orientation';
import { Position } from '../../../app/js/models/Position';

describe("Should be able to create an Instruction and execute it", function () {

    describe("should correctly create an Instruction", function () {
        it("should create Instruction from string", function () {
            expect(Instruction.fromString('F')).toEqual(Instruction.FORWARD);
            expect(Instruction.fromString('L')).toEqual(Instruction.LEFT);
            expect(Instruction.fromString('R')).toEqual(Instruction.RIGHT);
            expect( function(){ Instruction.fromString('X'); } ).toThrow(
                new Error('Unrecognised instruction X. Valid instructions are: L, R, F')
            );
        });
    });

    describe("should correctly determine new position when executing an instruction", function () {
        it("should turn right correctly", function () {
            var northFacing = buildPosition(Orientation.NORTH);
            var eastFacing = buildPosition(Orientation.EAST);
            var southFacing = buildPosition(Orientation.SOUTH);
            var westFacing = buildPosition(Orientation.WEST);

            expect(Instruction.execute(northFacing, Instruction.RIGHT).getOrientation()).toEqual(Orientation.EAST);
            expect(Instruction.execute(eastFacing, Instruction.RIGHT).getOrientation()).toEqual(Orientation.SOUTH);
            expect(Instruction.execute(southFacing, Instruction.RIGHT).getOrientation()).toEqual(Orientation.WEST);
            expect(Instruction.execute(westFacing, Instruction.RIGHT).getOrientation()).toEqual(Orientation.NORTH);
        });

        it("should turn left correctly", function () {
            var northFacing = buildPosition(Orientation.NORTH);
            var eastFacing = buildPosition(Orientation.EAST);
            var southFacing = buildPosition(Orientation.SOUTH);
            var westFacing = buildPosition(Orientation.WEST);

            expect(Instruction.execute(northFacing, Instruction.LEFT).getOrientation()).toEqual(Orientation.WEST);
            expect(Instruction.execute(eastFacing, Instruction.LEFT).getOrientation()).toEqual(Orientation.NORTH);
            expect(Instruction.execute(southFacing, Instruction.LEFT).getOrientation()).toEqual(Orientation.EAST);
            expect(Instruction.execute(westFacing, Instruction.LEFT).getOrientation()).toEqual(Orientation.SOUTH);
        });

        it("should move forward in the correct direction", function () {
            var northFacing = buildPosition(Orientation.NORTH);
            var eastFacing = buildPosition(Orientation.EAST);
            var southFacing = buildPosition(Orientation.SOUTH);
            var westFacing = buildPosition(Orientation.WEST);

            expect(Instruction.execute(northFacing, Instruction.FORWARD)).toEqual(new Position(3, 4, Orientation.NORTH));
            expect(Instruction.execute(eastFacing, Instruction.FORWARD)).toEqual(new Position(4, 3, Orientation.EAST));
            expect(Instruction.execute(southFacing, Instruction.FORWARD)).toEqual(new Position(3, 2, Orientation.SOUTH));
            expect(Instruction.execute(westFacing, Instruction.FORWARD)).toEqual(new Position(2, 3, Orientation.WEST));
        });
    });

    function buildPosition(orientation) {
        return new Position(3, 3, orientation);
    }
});