var action = "none"; //determines action done based on keypress
//none: Nothing up: Up down: Down left: Left right: Right shoot: Shoot

var key; //unicode key of keydown

window.onkeydown = function () { keypress(event); };
window.onkeyup = function () {
    //$("#player").stop(true, false);
    $("#player").clearQueue();
    /* Muah. -You have just been Sloppy Daved. MUAHAHAHAHA*/
};

function keypress(event) {
    var oldkey = key;
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
    if (oldkey != key) {
        $("#player").stop(true, false);
    }
    act(action);
}
/*  To Katie

  ,d88b.d88b,
  88888888888
  `Y8888888Y'
    `Y888Y'    
      `Y'
*/


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
            move("left");
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
    var pos = $("#player").position();
    switch (direction) {
        case "left":
            {
                $("#player").animate({ left: '-=30px' }, 30, "linear");
                break;
            }
        case "right":
            {
                $("#player").animate({ left: '+=30px' }, 30, "linear");
                break;
            }
        case "up":
            {
                $("#player").animate({ top: '-=30px' }, 30, "linear");
                break;
            }
        case "down":
            {
                $("#player").animate({ top: '+=30px' }, 30, "linear");
                break;
            }

    }

    //function for moving player sprite
}

function shoot() {
    //create bullet sprite
    setInterval(function () { bullet(); }, (1 / 60)); //move the shot and check for colisions
    //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
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

