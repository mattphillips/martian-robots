Martian Robots
==============

This app is a command line interface that allows the user to define the size of Mars the planet and add Robots to it be moved across it.

## Language and tools used
 - JavaScript
 - Gulp / Babel / Webpack / Karma / Jasmine / PhantomJS

## System Requirements
 You must have NodeJS installed.

## Building
npm has been used to manage the dependencies of the application. To install dependecies and build run:
 - `npm install`

If making changes and you just want to build without installing anything then you can run:
 - `npm run-script build`
 
## Running
To run the app use the command below. Then enter the dimensions of Mars, followed by two lines per Robot (First: position on the planet and the orientation. Second: list of instructions).
Note use the keyword `go` when you have finished entering Robots to make them move.
 - `npm start`

### Sample Input
```
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
go
```

### Sample Output
```
1 1 E
3 3 N LOST
2 3 S
```

## Testing
The tests are located within `test/js/`, Karma, PhantomJS and Jasmine have been used to
test the application. To run the test:
 - `npm test`

## Considerations
There is minimal validation around what is entered to the app so inputs ideally should be correct.

## Extensibility
This implementation can be extended by adding other types to the Instruction enum and defining the behaviour associated to the new instructions.

### Problem definition
The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).

A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the instructions:

- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.

Since the grid is rectangular and bounded a robot that moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move “off” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.
