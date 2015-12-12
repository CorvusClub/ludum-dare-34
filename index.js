import Renderer from "./lib/renderer.js";
import Engine from "./lib/engine.js";

class Game {
    constructor(canvas) {
        this.engine = new Engine();
        this.renderer = new Renderer(canvas, this.engine, 412, 660);
        
        this.lastTick = performance.now();
        
        this.update();
    }
    
    update(currentTime) {
        let tick = currentTime - this.lastTick;
        
        this.engine.update(tick, currentTime);
        this.renderer.update(tick, currentTime);
        
        this.lastTick = currentTime;
        
        requestAnimationFrame(this.update.bind(this));
    }
}

var game = new Game(document.getElementById("canvas"));