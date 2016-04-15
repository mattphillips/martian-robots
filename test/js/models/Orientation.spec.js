import { Orientation } from "../../../lib/js/models/Orientation";

describe("Should be able to create an Orientation", function () {

    it("should create Orientation from uppercase character", function () {
        expect(Orientation.fromString('N')).toEqual(Orientation.NORTH);
        expect(Orientation.fromString('E')).toEqual(Orientation.EAST);
        expect(Orientation.fromString('S')).toEqual(Orientation.SOUTH);
        expect(Orientation.fromString('W')).toEqual(Orientation.WEST);
        expect( function(){ Orientation.fromString('X'); } ).toThrow(
            new Error('Unrecognised orientation X. Valid orientations are: N, E, S, W')
        );
    });

    it("should create Orientation from lowercase character", function () {
        expect(Orientation.fromString('n')).toEqual(Orientation.NORTH);
        expect(Orientation.fromString('e')).toEqual(Orientation.EAST);
        expect(Orientation.fromString('s')).toEqual(Orientation.SOUTH);
        expect(Orientation.fromString('w')).toEqual(Orientation.WEST);
        expect( function(){ Orientation.fromString('x'); } ).toThrow(
            new Error('Unrecognised orientation x. Valid orientations are: N, E, S, W')
        );
    });
});
