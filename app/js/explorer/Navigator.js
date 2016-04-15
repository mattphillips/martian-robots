export class Navigator {

    constructor(planet) {
        this.planet = planet;
    }

    navigate(robots) {
        return robots.map(r => {
            return this.planet.move(r);
        });
    }
}
