var action = "none"; //determines action done based on keypress
//none: Nothing up: Up down: Down left: Left right: Right shoot: Shoot

var key = []; //unicode key of keydown
var bulletnum = 0;
var enemynum = 1;
var bulletsprite;
var bulletUID;
window.onkeydown = function () { keypress(event); };
window.onkeyup = function () {
    //$("#player").stop(true, false);
    //$("#player").clearQueue();
    keypress(event);
    $("#player").clearQueue();
    /* Muah. -You have just been Sloppy Daved. MUAHAHAHAHA*/
};

setInterval(genenemy, 2000);

function keypress(event) {
    //var oldkey = key;
    //key = event.which; 
    //alert(event.keyCode);
    key[event.keyCode] = (event.type == 'keydown');
    if (key[32]) {
        act("shoot");
    }
    if (key[37]) {
        act("left");
    }
    if (key[38]) {
        act("up");
    }
    if (key[39]) {
        act("right");
    }
    if (key[40]) {
        act("down");
    }
    /*switch (key) {
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
        //$("#player").stop(true, false);
        $("#player").clearQueue();
    }
    act(action);
    */

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
                $("#player").animate({ left: '-=30px' }, 50, "linear");
                break;
            }
        case "right":
            {
                $("#player").animate({ left: '+=30px' }, 50, "linear");
                break;
            }
        case "up":
            {
                $("#player").animate({ top: '-=30px' }, 50, "linear");
                break;
            }
        case "down":
            {
                $("#player").animate({ top: '+=30px' }, 50, "linear");
                break;
            }

    }

    //function for moving player sprite
}

function shoot() {
    //create bullet sprite
    bulletnum++;
    var bulletID = "bullet" + bulletnum
    var txt = "<img id=" + bulletID + " src='assets/laser.png' />";
    $("#game").prepend(txt);
    var pos = $("#player").position();
    var idbulletnum = "#" + bulletID;
    $(idbulletnum).css({
        "position": "absolute",
        "top": (pos.top + 10) + "px",
        "left": (pos.left + 60) + "px"
    });
    //$(idbulletnum).animate({ top: '-=3000px' }, "slow", "linear");
    bullet(idbulletnum); //activate unique bullet function
    $("#laser")[0].play(); //Plays laser sound
    //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
    //might not be optimal because there is only one timer, not an independent timer created for each instance
}

function bullet(idbulletnum) {
    //move bullet
    if ($(idbulletnum).length) {
        var pos = $(idbulletnum).position();
        var newy = pos.top - 5 + "px"
        $(idbulletnum).css({ "top": newy });
        if (pos.top >= 150) {
            setTimeout(function () { bullet(idbulletnum); }, 15);
        }
        else {
            $(idbulletnum).remove(); //kill bullet if border has been crossed.
        }
    }
}
/* if ($(idbulletnum).length) {
     var pos = $(idbulletnum).position();
     //$(idbulletnum).animate({ top: '-=10px' }, 25, "linear") //animate bullet upwards
     if (pos.top >= 150) { //test if border has been crossed
         setTimeout(function () { bullet(idbulletnum); }, 50); //repeat function with the same bulletUID after 25 milliseconds
     }
     else {
         $(idbulletnum).remove(); //kill bullet if border has been crossed.
     }
 }
 */
//check if bullet has collided


function enemy(idenemynum) {
    var pos = $(idenemynum).position();
    var idbulletnum;
    if ($(idenemynum).length) {
        if (bulletnum != 0) {
            for (i = 1; i <= bulletnum; i++) {
                idbulletnum = "#bullet" + i;
                if ($(idbulletnum).length) {
                    var bulletpos = $(idbulletnum).position();
                    var diffY = Math.abs(pos.top - bulletpos.top);
                    var diffX = Math.abs(pos.left - bulletpos.left);
                    if (diffY < 50 && diffX < 30 && diffY != 0 && diffX != 0) {
                        console.log(diffY, diffX);
                        $(idbulletnum).remove();
                        $(idenemynum).remove();
                        $("#explosion")[0].play();
                        break;

                    }
                }
            }
        }

        //$(idenemynum).animate({ top: '+=10px' }, 50, "linear")
        if (pos.top <= 800) { //test if border has been crossed
            setTimeout(function () { enemy(idenemynum); }, 50); //repeat function with the same bulletUID after 25 milliseconds
        }
        else {
            $(idenemynum).remove(); //kill bullet if border has been crossed.
        }
    }
}

function moveenemy(idenemynum) {
    if ($(idenemynum).length) {
        var pos = $(idenemynum).position();
        var newy = pos.top + 4 + "px"
        $(idenemynum).css({ "top": newy });
        setTimeout(function () { moveenemy(idenemynum); }, 30);
    }
}

function timed() {//to be executed 60 times a second
    if (action != "none") {
        act(action);
    }
    action = "none"; //reset key
}

function genenemy() {
    enemynum++;
    var enemyID = "bullet" + enemynum;
    var txt = "<img id=" + enemyID + " src='assets/enemy.png' />";
    $("#game").prepend(txt);
    var idenemynum = "#" + enemyID;
    var enemyX = Math.floor((Math.random() * 400) + 200);
    $(idenemynum).css({
        "position": "absolute",
        "width": "50px",
        "height": "50px",
        "top": "150px",
        "left": enemyX + "px"
    });
    enemy(idenemynum);
    moveenemy(idenemynum);
}