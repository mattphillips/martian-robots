export class Position {

    constructor(x, y, orientation, lost) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.lost = lost == 'undefined' ? false : lost;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getOrientation() {
        return this.orientation;
    }

    isLost() {
        return this.lost;
    }
}
