import EventEmitter from "events";
class Input extends EventEmitter {
    constructor() {
        super();
        document.body.addEventListener("keydown", this.onKeyDown.bind(this));
        document.body.addEventListener("keyup", this.onKeyUp.bind(this));
        this.leftArrowButton = document.querySelector("#leftArrow");
        this.rightArrowButton = document.querySelector("#rightArrow");
        
        this.leftArrowButton.addEventListener("mousedown", this.onLeftDown.bind(this));
        this.leftArrowButton.addEventListener("touchstart", this.onLeftDown.bind(this));
        this.leftArrowButton.addEventListener("mouseup", this.onLeftUp.bind(this));
        this.leftArrowButton.addEventListener("touchend", this.onLeftUp.bind(this));
        this.rightArrowButton.addEventListener("mousedown", this.onRightDown.bind(this));
        this.rightArrowButton.addEventListener("touchstart", this.onRightDown.bind(this));
        this.rightArrowButton.addEventListener("mouseup", this.onRightUp.bind(this));
        this.rightArrowButton.addEventListener("touchend", this.onRightUp.bind(this));
        
        this.on('inputChange', () => {
            if(this.leftDown) {
                this.leftArrowButton.classList.add("down");
            }
            else {
                this.leftArrowButton.classList.remove("down");
            }
            if(this.rightDown) {
                this.rightArrowButton.classList.add("down");
            }
            else {
                this.rightArrowButton.classList.remove("down");
            }
        })
    }
    onLeftDown() {
        this.leftDown = true;
        this.emit("inputChange");
    }
    onRightDown() {
        this.rightDown = true;
        this.emit("inputChange");
    }
    onLeftUp() {
        this.leftDown = false;
        this.emit("inputChange");
    }
    onRightUp() {
        this.rightDown = false;
        this.emit("inputChange");
    }
    onKeyDown(event) {
        let wasRightDown = this.rightDown;
        let wasLeftDown = this.leftDown;
        
        if(event.keyCode == 39) {
            this.rightDown = true;
        }
        if(event.keyCode == 37) {
            this.leftDown = true;
        }
        
        if(wasRightDown != this.rightDown || wasLeftDown != this.leftDown) {
            this.emit('inputChange');
        }
    }
    onKeyUp(event) {
        let wasRightDown = this.rightDown;
        let wasLeftDown = this.leftDown;
        
        if(event.keyCode == 39) {
            this.rightDown = false;
        }
        if(event.keyCode == 37) {
            this.leftDown = false;
        }
        
        if(wasRightDown != this.rightDown || this.wasLeftDown != this.leftDown) {
            this.emit('inputChange');
        }
    }
}

export default Input;