import Input from "./input.js";

const ANGLE_CHANGE_PER_MILLISECOND = 0.001;

class Engine {
    constructor() {
        this.input = new Input();
        this.angle = 0;
    }
    /** Time is milliseconds since last frame*/
    update(tick, currentTime) {
        if(this.input.leftDown) {
            this.angle -= ANGLE_CHANGE_PER_MILLISECOND * tick;
        }
        if(this.input.rightDown) {
            this.angle += ANGLE_CHANGE_PER_MILLISECOND * tick;
        }
    }
}

export default Engine;