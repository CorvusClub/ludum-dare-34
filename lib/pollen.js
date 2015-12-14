
const POLLEN_TYPES = 3;
const POLLEN_SPEED = 0.2;

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
        this.baseY = y;
        this.speed = POLLEN_SPEED;
        
    }
    update()
    {
        this.x += this.speed;
        this.y = this.baseY + Math.sin(this.x);
    }
}

export default Pollen;