import Snap from "snapsvg";
import Pollen from "./pollen";

const POLLEN_DRIFT_X = 0.001;
const CLOUD_INTERVAL = 175;
const STAR_INTERVAL = 80;

const CLOUD_SPEED = 0.01;

const LEAF_INTERVAL = 20;
const LEAF_WIDTH = 8;

class Renderer {
    constructor(canvas, engine, width, height) {
        this.engine = engine;
        
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        
        this.uiSvg = document.querySelector("#ui");
        this.ui = Snap(this.uiSvg);
        
        this.timeTilCloud = 0;
        
        window.addEventListener("resize", () => {
            this.onResize();
        });
        
        this.images = {};
        this.images["seed"] = this.loadImage("misc-apple-seed.svg");
        this.images["leaf"] = this.loadImage("leaf.svg");
        this.images["pollen"] = this.loadImage("pollen.svg");
        this.images["cloud1"] = this.loadImage("cloud.svg");
        this.images["cloud2"] = this.loadImage("cloud2.svg");
        this.images["cloud1Purple"] = this.loadImage("cloudPurple.svg");
        this.images["cloud2Purple"] = this.loadImage("cloud2Purple.svg");
        this.images["star1"] = this.loadImage("star1.svg");
        this.images["star2"] = this.loadImage("star2.svg");
        this.images["sunflower"] = this.loadImage("sunflower.svg");
        
        this.width = width;
        this.height = height;
        
        this.boxHeight = this.width / 10 * this.height / this.width;
        document.querySelector("#gameContainer").style.height = this.boxHeight + "rem";
        
        
        this.clouds = [];
        this.stars = [];
        
        this.leaves = [];
        
        this.lengthSinceLastLeaf = 0;
        
        this.heightSinceCloud = 0;
        this.heightSinceStar = 0;
        
        this.camera = {
            x: this.engine.plantSpawnX,
            y: this.engine.plantSpawnY,
            xScale: 1,
            yScale: 1
        }
        
        this.onResize();
    }
    loadImage(filename) {
        let image = new Image();
        image.src = `./assets/${filename}`;
        return image;
    }
    update(tick, currentTime) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let fps = (1000 / tick).toFixed(0);
        
        
        this.context.font = "30px sans-serif";
        if(this.engine.isDay()) {
            this.context.fillStyle = "black";
        }
        else {
            this.context.fillStyle = "white";
        }
        
        this.context.fillText(fps, 100, 100);
        
        let plantLengthText = this.engine.plantLength.toFixed(2)+ "mm";
        if(this.engine.plantSunBoost > 0) {
            plantLengthText += "▲";
        }
        if(this.engine.plantSunBoost > 0.5) {
            plantLengthText += "▲";
        }
        this.context.fillText(plantLengthText, 800, 50);
        
        
        this.camera.x = this.engine.plantX;
        this.camera.y = this.engine.plantY;
        
        this.context.save();
        
        this.context.translate(this.canvas.width / 2 - this.camera.x * this.camera.xScale,
                          this.canvas.height / 2 - this.camera.y * this.camera.yScale);
        
        this.context.scale(this.camera.xScale, this.camera.yScale);
        
        // sun
        let sunAngle = this.engine.sunAngle;
        let sunDistance = this.boxHeight* 5;
        if(!this.engine.isDay()) {
            sunAngle += Math.PI;
        }
        
        let gradient;
        let sunX = Math.cos(sunAngle) * sunDistance + this.engine.plantX;
        let sunY = Math.sin(sunAngle) * sunDistance + this.engine.plantY;
        if(this.engine.isDay()) {
            gradient = this.context.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunDistance * 2);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
            gradient.addColorStop(1, "transparent");
            
            document.body.classList.add("day");
            document.body.classList.remove("night");
        }
        else {
            gradient = this.context.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunDistance * 2);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
            gradient.addColorStop(0.5, "rgba(0,0,0,0)");
            document.body.classList.remove("day");
            document.body.classList.add("night");
        }
        
        this.context.fillStyle = gradient;
        this.context.beginPath();
        this.context.arc(sunX, sunY, sunDistance * 2, 0, Math.PI * 2);
        this.context.fill();
        
        
        
        if(!this.engine.isDay()) {
            this.stars.forEach((star, index) => {
                if(star.variant === 1) {
                    this.context.drawImage(this.images["star1"], star.x, star.y, 26, 30); 
                }
                else {
                    this.context.drawImage(this.images["star2"], star.x, star.y, 12, 14); 
                }
                if(star.y>this.engine.plantY + this.canvas.height / 2)
                {
                    console.log("cull star");
                    this.stars.splice(index, 1);
                }
            })
        }
        
        
        // dirt
        this.context.fillStyle = "#3C1E10";
        this.context.fillRect(-2500, 1000, 5000, 2000);
        
        this.context.drawImage(this.images["seed"], this.engine.plantSpawnX - 50, this.engine.plantSpawnY - 25, 100, 50);
        
        this.context.strokeStyle = "green";
        this.context.lineWidth = 15;
        this.context.lineCap = "round";
        this.context.beginPath();
        this.context.moveTo(this.engine.plantSpawnX, this.engine.plantSpawnY);
        this.engine.plantParts.forEach(part => {
            this.context.lineTo(part.x, part.y);
        })
        this.context.stroke();
        
        this.lengthSinceLastLeaf += this.engine.lastPlantGrowth;
        
        if(this.lengthSinceLastLeaf > LEAF_INTERVAL && this.engine.plantY < 800) {
            let leaf = {};
            
            leaf.x = this.engine.plantX;
            leaf.y = this.engine.plantY;
            leaf.left =  Math.random() < 0.5;;
            leaf.angle = this.engine.plantAngle + Math.PI / 2;
            this.leaves.push(leaf);
            
            this.lengthSinceLastLeaf = 0;
        }
        
        this.lastAngle = this.engine.plantAngle;
        
        this.engine.pollen.forEach((pollen, index) => {
            this.context.drawImage(this.images["pollen"], pollen.x, pollen.y);
        });
        
        this.leaves.forEach((leaf, index) => {
            if(leaf.left) {
                this.context.scale(-1, 1);
                this.context.translate(-(leaf.x), leaf.y);
                this.context.rotate(leaf.angle * -1);
            }
            else {
                this.context.translate(leaf.x, leaf.y);
                this.context.rotate(leaf.angle);
            }
            this.context.drawImage(this.images["leaf"], -108, 0, 108, 48);
            if(leaf.left) {
                this.context.rotate(leaf.angle);
                this.context.translate(leaf.x, -(leaf.y));
                this.context.scale(-1, 1);
            }
            else {
                this.context.rotate(-leaf.angle);
                this.context.translate(-leaf.x, -leaf.y);
            }
        })
        
        this.clouds.forEach((cloud, index) => {
            cloud.x += CLOUD_SPEED * tick;
            if(this.engine.isDay()) {
                this.context.drawImage(this.images[`cloud${cloud.variant}`], cloud.x, cloud.y, 150, 63); 
            }
            else {
                this.context.drawImage(this.images[`cloud${cloud.variant}Purple`], cloud.x, cloud.y, 150, 63); 
            }
            if(cloud.y>this.engine.plantY + this.canvas.height / 2)
            {
                console.log("cull cloud");
                this.clouds.splice(index, 1);
            }
        });
        this.heightSinceCloud += this.engine.lastPlantHeightChange;
        this.heightSinceStar += this.engine.lastPlantHeightChange;
        
        if(this.heightSinceCloud > CLOUD_INTERVAL)
        {
            console.log("cloud")
            let cloud = {variant:  Math.ceil(Math.random()*2)};
            this.clouds.push(cloud);
            cloud.x = (Math.random()*(this.width+15))+((this.engine.plantX - this.width / 2)-15);
            cloud.y = (this.engine.plantY - this.boxHeight * 5)-70;
            
            this.heightSinceCloud = 0;
        }
        if(this.heightSinceStar> STAR_INTERVAL)
        {
            let starChoice = Math.ceil(Math.random()*2);
            let star = {variant: starChoice};
            this.stars.push(star);
            star.x = (Math.random()*(this.width+15))+((this.engine.plantX - this.width / 2)-15);
            star.y = (this.engine.plantY - this.boxHeight * 5)-70;
            
            this.heightSinceStar = 0;
        }
        
        this.context.restore();
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