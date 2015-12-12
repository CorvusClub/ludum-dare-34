import Snap from "snapsvg";

class Renderer {
    constructor(canvas, engine, width, height) {
        this.engine = engine;
        
        this.canvas = canvas;
        this.svg = Snap(canvas);
        
        this.fps = this.svg.text("2%", "3%", "60");
        
        this.angle = this.svg.text("30%", "50%", "0");
        
        window.addEventListener("resize", () => {
            this.onResize();
        });
        
        this.width = width;
        this.height = height;
        
        this.onResize();
    }
    update(tick, currentTime) {
        let fps = (1000 / tick).toFixed(0);
        this.fps.attr({"text": fps});
        
        this.angle.attr("text", this.engine.angle.toFixed(2))
    }
    onResize() {
        var width = window.innerWidth;
        if(width * this.height / this.width > window.innerHeight) {
            width = window.innerHeight / (this.height / this.width);
        } 
        document.documentElement.style.fontSize = width / 100 + "px";
    }
}
export default Renderer;