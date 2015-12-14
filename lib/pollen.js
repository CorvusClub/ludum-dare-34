
const POLLEN_TYPES = 3;
const POLLEN_MAX_SPEED = 0.2;
const POLLEN_BASE_SPEED = 0.1;

class Pollen {
    constructor(type, x, y) {
        if(type==null) {
            switch(Math.ceil(Math.random()*POLLEN_TYPES)) {
                case 1:
                    this.type = "speed";
                    break;
                case 2:
                    this.type = "sunboost";
                    break;
                case 3:
                    this.type = "turnit";
                    break;
            }
        }
        else {
            this.type = type;
        }
        this.x = x;
        this.y = y;
        this.width = 60 + Math.random() * 40;
        this.baseY = y;
        this.speed = POLLEN_BASE_SPEED + POLLEN_MAX_SPEED * Math.random();
        this.sinOffset = Math.random() * 10;
        this.sinFactor = Math.random() * 100;
        
    }
    update(tick, currentTime)
    {
        this.x += this.speed * tick;
        this.y = this.baseY + Math.sin((this.x + this.sinOffset) / 100) * this.sinFactor;
    }
}

export default Pollen;