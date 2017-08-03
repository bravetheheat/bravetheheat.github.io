var action = "none"; //determines action done based on keypress
//none: Nothing up: Up down: Down left: Left right: Right shoot: Shoot

var key; //unicode key of keydown

$("#game").onkeydown = function () { keypress(event); };

function keypress(event) {
    key = event.which; //key 
    switch (key) {
        case 32: { //spacebar
            action = "shoot"
            break;
        }
        case 37: {
            action = "left";
            break;
        }
        case 38: {
            action = "up";
            break;
        }
        case 39: {
            action = "right";
            break;
        }
        case 40: {
            action = "down";
            break;
        }
        default: {
            action = "none";
            break;
        }
    }
    key = 0; //reset key
}

function act(playeract) {
    switch (playeract) {
        case "shoot":
            {
                shoot();
                break;
            }
        case "up":
            {
                move("up");
                break;
            }
        case "left": {
            move("down");
            break;
        }
        case "right": {
            move("right");
            break;
        }
        case "down": {
            move("down");
            break;
        }
    }
}

function move(direction) {
    //function for moving player sprite
}

function shoot() {
    //create bullet sprite
    setInterval(function () { bullet(); }, (1 / 60)); //move the shot and check for colisions
    //might not be optimal because there is only one timer, not an independent timer created for each instance
}

function bullet() {
    //move bullet
    //check if bullet has collided
}

function timed() {//to be executed 60 times a second
    if (action != "none") {
        act(action);
    }
    action = "none"; //reset key
}

