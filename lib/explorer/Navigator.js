export default class Navigator {
  constructor(planet) {
    this.planet = planet;
  }

  navigate(robots) {
    return robots.map(r => this.planet.move(r));
  }
}
