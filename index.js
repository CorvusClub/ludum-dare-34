import Renderer from "./lib/renderer.js";
import Engine from "./lib/engine.js";

class Game {
    constructor(canvas) {
        this.renderer = new Renderer(canvas, 412, 660);
        this.engine = new Engine();
    }
    
    update(time) {
        this.engine.update(time);
        this.renderer.update(time);
    }
}

var game = new Game(document.getElementById("canvas"));