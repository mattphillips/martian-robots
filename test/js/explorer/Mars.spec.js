import { Instruction } from '../../lib/js/models/Instruction';
import { Mars } from '../../lib/js/explorer/Mars';
import { Orientation } from '../../lib/js/models/Orientation';
import { Position } from '../../lib/js/models/Position';
import { Robot } from '../../lib/js/models/Robot';

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

    it("should move robot to fall off the edge of mars and set the position to lost", function () {
        var robot = new Robot(
            new Position(0, 0, Orientation.NORTH),
            [
                Instruction.FORWARD,
                Instruction.FORWARD,
                Instruction.FORWARD,
                Instruction.FORWARD,
                Instruction.FORWARD
            ]
        );

        var mars = new Mars(5, 3);
        var finalPosition = mars.move(robot);

        expect(finalPosition).toEqual(new Position(0, 3, Orientation.NORTH, true));
        expect(finalPosition.isLost()).toBeTruthy();
    });

    it("should move robot to edge with the scent from a lost robot and should skip any moves that will make the " +
        "robot fall off the edge", function () {
        var instructions = [
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.RIGHT,
            Instruction.FORWARD
        ];
        var lostRobot = new Robot(new Position(0, 0, Orientation.NORTH), instructions);
        var safeRobot = new Robot(new Position(0, 0, Orientation.NORTH), instructions);

        var mars = new Mars(5, 3);
        var lostRobotFinalPosition = mars.move(lostRobot);
        var safeRobotFinalPosition = mars.move(safeRobot);

        expect(lostRobotFinalPosition).toEqual(new Position(0, 3, Orientation.NORTH, true));
        expect(lostRobotFinalPosition.isLost()).toBeTruthy();

        expect(safeRobotFinalPosition).toEqual(new Position(1, 3, Orientation.EAST));
        expect(safeRobotFinalPosition.isLost()).toBeFalsy();
    });

    it("should not skip an instruction on a position with a lost robot scent when the next " +
        "instruction will not take it off of mars", function () {
        var lostRobot = new Robot(new Position(2, 0, Orientation.NORTH), [
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD
        ]);
        var safeRobot = new Robot(new Position(1, 3, Orientation.EAST), [
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.RIGHT,
            Instruction.FORWARD
        ]);

        var mars = new Mars(5, 3);
        var lostRobotFinalPosition = mars.move(lostRobot);
        var safeRobotFinalPosition = mars.move(safeRobot);

        expect(lostRobotFinalPosition).toEqual(new Position(2, 3, Orientation.NORTH, true));
        expect(lostRobotFinalPosition.isLost()).toBeTruthy();

        expect(safeRobotFinalPosition).toEqual(new Position(4, 2, Orientation.SOUTH));
        expect(safeRobotFinalPosition.isLost()).toBeFalsy();
    });
});
