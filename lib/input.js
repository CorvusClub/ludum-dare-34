import EventEmitter from "events";
class Input extends EventEmitter {
    constructor() {
        super();
        document.body.addEventListener("keydown", this.onKeyDown.bind(this));
        document.body.addEventListener("keyup", this.onKeyUp.bind(this));
        this.leftArrowButton = document.querySelector("#leftArrow");
        this.rightArrowButton = document.querySelector("#rightArrow");
        
        this.leftArrowButton.addEventListener("mousedown", () => {
            this.leftDown = true;
            this.emit('inputChange');
        })
        this.leftArrowButton.addEventListener("mouseup", () => {
            this.leftDown = false;
            this.emit('inputChange');
        })
        this.rightArrowButton.addEventListener("mousedown", () => {
            this.rightDown = true;
            this.emit('inputChange');
        })
        this.rightArrowButton.addEventListener("mouseup", () => {
            this.rightDown = false;
            this.emit('inputChange');
        })
        
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
    onKeyDown(event) {
        let wasRightDown = this.rightDown;
        let wasLeftDown = this.leftDown;
        
        if(event.keyCode == 39) {
            this.rightDown = true;
        }
        if(event.keyCode == 37) {
            this.leftDown = true;
        }
        
        if(wasRightDown != this.rightDown || this.wasLeftDown != this.leftDown) {
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