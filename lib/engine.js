import Input from "./input.js";
import Pollen from "./pollen.js";

const ANGLE_ACCELERATION = 0.0001;
const MAX_ANGLE_ROTATION_SPEED = 0.0008;

const MAX_ANGLE = Math.PI + (Math.PI * 7/8);
const MIN_ANGLE = Math.PI + (Math.PI * 1/8);
const DAY_LENGTH = 60*1000; // 1 minute
const SUN_EFFECT = 0.1;
const SPEED_PER_POLLEN = 0.033;

class Engine {
    constructor() {
        this.input = new Input();
        this.plantAngle = Math.PI * 1.5;
        this.plantSpawnX = 500;
        this.plantSpawnY = 1260;
        this.plantX = this.plantSpawnX;
        this.plantY = this.plantSpawnY;
        this.plantParts = [];
        this.plantSpeed = 0.001;
        this.plantPollens = [new Pollen("speed", true), new Pollen("speed", true), new Pollen("speed", true)];
        this.plantSunBoost = 0;
        this.angleRotationSpeed = 0.0001;
        
        this.pollen = [];
        
        this.sunAngle = Math.PI * 1.5; //between 0 and Math.PI*2
        this.sunSpeed = (1/DAY_LENGTH);
        
        this.plantLength = 0;
        
        this.input.on('inputChange', () => {
            this.angleRotationSpeed = 0.0001;
        });
    }
    /** Tick is milliseconds since last frame*/
    update(tick, currentTime) {
        if(this.input.leftDown && this.input.rightDown) {
            this.pause = true;
            return;
        }
        else if(this.input.leftDown) {
            this.plantAngle -= this.angleRotationSpeed * tick;
            this.angleRotationSpeed += ANGLE_ACCELERATION;
        }
        else if(this.input.rightDown) {
            this.plantAngle += this.angleRotationSpeed * tick;
            this.angleRotationSpeed += ANGLE_ACCELERATION;
        }
        this.pause = false;
        if(this.angleRotationSpeed > MAX_ANGLE_ROTATION_SPEED) {
            this.angleRotationSpeed = MAX_ANGLE_ROTATION_SPEED;
        }
        if(this.plantAngle > MAX_ANGLE) {
            this.plantAngle = MAX_ANGLE;
        }
        if(this.plantAngle < MIN_ANGLE) {
            this.plantAngle = MIN_ANGLE;
        }
        let nextPosition = {};
        this.plantSpeed = this.getPlantSpeed();
        nextPosition.x = this.plantX + Math.cos(this.plantAngle) * this.plantSpeed * tick;
        nextPosition.y = this.plantY + Math.sin(this.plantAngle) * this.plantSpeed * tick;
        
        this.lastPlantGrowth = this.plantSpeed * tick / 10;
        this.plantLength += this.lastPlantGrowth;
        
        this.lastPlantHeightChange = this.plantY - nextPosition.y;
        
        this.plantX = nextPosition.x;
        this.plantY = nextPosition.y;
        
        
        if(this.plantAngle != this.lastAngle) {
            this.plantParts.push(nextPosition);
        }
        else {
            this.plantParts[this.plantParts.length - 1] = nextPosition;
        }
        
        this.sunAngle += this.sunSpeed * tick;
        if(this.sunAngle >= Math.PI*2) {
            this.sunAngle=0;
        }
        
        this.pollen.forEach((pollen, index) => {
            if(pollen.x < this.plantX && 
               pollen.x + pollen.width > this.plantX &&
               pollen.y + 70 < this.plantY &&
               pollen.y + 70 + pollen.width > this.plantY
               ) {
                   this.engine.pollen.splice(index, 1);
                   this.engine.plantPollens.push(pollen.pickup);
               }
            pollen.update(tick, currentTime);
        })
        
    }
    
    isDay() {
        if(this.sunAngle>=Math.PI){
            return true;
        }
        return false;
    }
    
    getPlantSpeed()
    {
        let speeds = 0, sunboosts = 0;
        for(let i = 0;i<this.plantPollens.length;i++)
        {
            if(this.plantPollens[i].type == "speed")
            {
                speeds++;
            }
            if(this.plantPollens[i].type == "sunboost")
            {
                sunboosts++;
            }
        }
        if(Math.abs(this.plantAngle-this.sunAngle)<0.15)
        {
            this.plantSunBoost = 1;
        }
        else if(Math.abs(this.plantAngle-this.sunAngle)<0.45)
        {
            this.plantSunBoost = 0.5;
        }
        else
        {
            this.plantSunBoost = 0;
        }
        
        
        let speed = (speeds * SPEED_PER_POLLEN) + ((sunboosts*0.25)+1)*SUN_EFFECT*this.plantSunBoost;
        
        let growthFactor = 1 - (this.plantLength / 500);
        return speed * growthFactor;
    }
}

export default Engine;