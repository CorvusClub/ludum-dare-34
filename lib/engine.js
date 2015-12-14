import Input from "./input.js";
import Pollen from "./pollen.js";
import Plant from "./plant.js";
import EventEmitter from "events";

const MAX_ANGLE = Math.PI + Math.PI * 7/8;
const MIN_ANGLE = Math.PI + Math.PI * 1/8;
const DAY_LENGTH = 60*1000; // 1 minute
const SUN_EFFECT = 0.06;
const SPEED_PER_POLLEN = 0.053;

const POLLEN_INTERVAL = 2000;


class Engine extends EventEmitter {
    constructor() {
        super();
        this.input = new Input();
        
        this.plants = [];
        this.plants.push(new Plant(500, 1260));
        this.plant = this.plants[0];
        
        this.pollen = [];
        
        this.sunAngle = Math.PI * 1.5; //between 0 and Math.PI*2
        this.sunSpeed = (1/DAY_LENGTH);
        
        this.timeSinceLastPollen = 0;
        
        this.input.on('inputChange', () => {
            this.plant.angleRotationSpeed = 0.0001;
        });
    }
    /** Tick is milliseconds since last frame*/
    update(tick, currentTime) {
        
        this.sunAngle += this.sunSpeed * tick;
        if(this.sunAngle >= Math.PI*2) {
            this.sunAngle=0;
        }
        
        this.pollen.forEach((pollen, index) => {
            if(pollen.x < this.plant.x && 
               pollen.x + pollen.width > this.plant.x &&
               pollen.y < this.plant.y &&
               pollen.y + pollen.width > this.plant.y
               ) {
                   this.pollen.splice(index, 1);
                   this.plant.pollen.push(pollen);
               }
            pollen.update(tick, currentTime);
            if(pollen.x > this.plant.x + 500) {
                this.pollen.splice(index, 1);
            }
        })
        
        this.timeSinceLastPollen += tick;
        
        if(this.timeSinceLastPollen > POLLEN_INTERVAL) {
            console.log("pollen");
            this.pollen.push(new Pollen(null, this.plant.x - 1000, this.plant.y - (500 + 1000 * Math.random()) ));
            this.timeSinceLastPollen = 0;
        }
        
        if(!this.plant.bloomed) {
        
            if(this.input.leftDown && this.input.rightDown) {
                this.pause = true;
                return;
            }
            else if(this.input.leftDown) {
                this.plant.angle -= this.plant.angleRotationSpeed * tick;
                this.plant.angleRotationSpeed += this.plant.angleAcceleration;
            }
            else if(this.input.rightDown) {
                this.plant.angle += this.plant.angleRotationSpeed * tick;
                this.plant.angleRotationSpeed += this.plant.angleAcceleration;
            }
            this.pause = false;
            if(this.plant.angleRotationSpeed > this.plant.maxAngleSpeed) {
                this.plant.angleRotationSpeed = this.plant.maxAngleSpeed;
            }
            if(this.plant.angle > MAX_ANGLE) {
                this.plant.angle = MAX_ANGLE;
            }
            if(this.plant.angle < MIN_ANGLE) {
                this.plant.angle = MIN_ANGLE;
            }
            
            this.plant.speed = this.getPlantSpeed();
        }
        
        this.plant.update(tick, currentTime);
    }
    
    newPlant() {
        this.plant = new Plant(-500 + 1000 * Math.random(), 1260);
        this.plants.push(this.plant);
        this.emit("newPlant");
    }
    
    isDay() {
        if(this.sunAngle>=Math.PI){
            return true;
        }
        return false;
    }
    
    getPlantSpeed()
    {
        var speeds = 0, sunboosts = 0, height = 0;
        this.plant.pollen.forEach(pollen => {
            if(pollen.type == "speed")
            {
                speeds++;
            }
            if(pollen.type == "sunboost")
            {
                sunboosts++;
            }
            if(pollen.type == "height") {
                height++;
            }
        })
        if(Math.abs(this.plant.angle-this.sunAngle)<0.15)
        {
            this.plant.sunBoost = 1;
        }
        else if(Math.abs(this.plant.angle-this.sunAngle)<0.45)
        {
            this.plant.sunBoost = 0.5;
        }
        else
        {
            this.plant.sunBoost = 0;
        }
        
        let speed = (speeds * SPEED_PER_POLLEN) + ((sunboosts*0.25)+1)*SUN_EFFECT*this.plant.sunBoost;
        
        this.plant.growthFactor = 1 - (this.plant.length / 500 + height * 100);
        
        if(this.plant.growthFactor < 0.2) {
            this.plant.bloom();
            this.emit("bloom");
        }
        return speed * this.plant.growthFactor;
    }
}

export default Engine;