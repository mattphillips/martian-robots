export default class Robot {
  constructor(position, instructions) {
    this.position = position;
    this.instructions = instructions;
  }

  getPosition() {
    return this.position;
  }

  getInstructions() {
    return this.instructions;
  }
}
