import Renderer from "./lib/renderer.js";
import Engine from "./lib/engine.js";

class Game {
    constructor(canvas) {
        this.engine = new Engine();
        this.renderer = new Renderer(canvas, this.engine, 1000, 1460.5);
        
        this.lastTick = performance.now();
        
        this.update(this.lastTick);
        
        this.song = document.createElement("audio");
        this.song.src = "./rain_nice_today.mp3";
        //this.song.play();
        document.querySelector("#music").addEventListener("click", () => {
            if(this.song.paused) {
                this.song.play();
            }
            else {
                this.song.pause();
            }
        })
    }
    
    update(currentTime) {
        let tick = currentTime - this.lastTick;
        if(tick > 128) {
            tick = 128;
        }
        this.engine.update(tick, currentTime);
        this.renderer.update(tick, currentTime);
        
        this.lastTick = currentTime;
        
        requestAnimationFrame(this.update.bind(this));
    }
}

window.game = new Game(document.getElementById("canvas"));