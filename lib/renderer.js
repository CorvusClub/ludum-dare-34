class Renderer {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        window.addEventListener("resize", () => {
            this.onResize();
        });
        
        this.width = width;
        this.height = height;
        
        this.onResize();
    }
    update(time) {
        
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