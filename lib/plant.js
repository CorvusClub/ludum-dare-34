import Pollen from "./pollen.js";


const ANGLE_ACCELERATION = 0.0001;
const MAX_ANGLE_ROTATION_SPEED = 0.0008;
const PLANT_BLOOM_SPEED = 0.4;

class Plant {
    constructor(startX, startY) {
        this.startX = startX;
        this.startY = startY;
        this.x = this.startX;
        this.y = this.startY;
        this.angle = Math.PI * 1.5;
        this.parts = [];
        this.speed = 0.001;
        this.pollen = [new Pollen("speed", true), new Pollen("speed", true), new Pollen("speed", true)];
        this.sunBoost = 0;
        this.angleRotationSpeed = 0.0001;
        this.length = 0;
        
        this.bloomed = false;
        this.bloomSize = 0;
        
        this.lastGrowth = 0;
        this.lastHeightChange = 0;
        
        this.angleAcceleration = ANGLE_ACCELERATION;
        this.maxAngleSpeed = MAX_ANGLE_ROTATION_SPEED;
        
        this.lastAngle = 0;
        
        this.paused = true;
    }
    
    update(tick, currentTime) {
        if(this.paused || this.bloomed) {
            return true;
        }
        
        let nextPosition = {};
        nextPosition.x = this.x + Math.cos(this.angle) * this.speed * tick;
        nextPosition.y = this.y + Math.sin(this.angle) * this.speed * tick;
        
        this.lastGrowth = this.speed * tick / 10;
        this.length += this.lastGrowth;
        
        this.lastHeightChange = this.y - nextPosition.y;
        
        this.x = nextPosition.x;
        this.y = nextPosition.y;
        
        
        if(this.lastAngle != this.angle) {
            this.parts.push(nextPosition);
        }
        else {
            this.parts[this.parts.length - 1] = nextPosition;
        }
        
        this.lastAngle = this.angle;
    }
    bloom() {
        this.bloomed = true;
        this.bloomSize = 0;
    }
}

export default Plant;