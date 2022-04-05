const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);


let fastX = 10;
let fastY = 0



let snake = [{ x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }]

function DrawPieces(pieces) {

    ctx.fillStyle = "gold";
    ctx.strokeStyle = 'black';
    ctx.fillRect(pieces.x, pieces.y, 10, 10);
    ctx.strokeRect(pieces.x, pieces.y, 10, 10);

}


function DrawSnake() {
    snake.forEach(pieces => {
        DrawPieces(pieces);
    })
}

// faire avancer le serpent

function AdvanceSnake() {

    let head = { x: snake[0].x + fastX, y: snake[0].y + fastY }; // kede lehitkam anahach 10 px
    snake.unshift(head); // leosif head 
    snake.pop();

}

// faire bouger le serpent 

function CleanCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function animation() {

    setTimeout(function() {

        // 1) hitroute canvas 
        CleanCanvas();
        // 2)lehitkadem nahash
        AdvanceSnake();
        DrawSnake();
        animation(); // fonction recursive ki hi tsriha likero ota kol azman

    }, 100);

}
animation();


// dirction du serpent


document.addEventListener('keydown', ChangeDirection);

function ChangeDirection(event) {


    let LEFT_ARROW = 37; // 37 ---> smole
    let RIGHT_ARROW = 39; // 39 ---> yamin
    let TOP_ARROW = 38; // 38 ---> lemala
    let BOTTEM_ARROW = 40; // 40 ---> lemata


    let direction = event.keyCode; // dirction ze kede lakahat hakaftoh che lahatsti im event ve keycode

    // === livedok im ze true or false

    let top = fastY === -10; // -10 ki ani holer ve mispar chel amakom iyer yoter gadol
    let bottem = fastY === 10; // 10 ze yored
    let right = fastX === 10;
    let left = fastX === -10;


    /*
        if (direction === LEFT_ARROW) {
            fastX = -10;
            fastY = 0;
        }
        if (direction === TOP_ARROW) {
            fastX = 0;
            fastY = -10;
        }
        if (direction === RIGHT_ARROW) {
            fastX = 10;
            fastY = 0;
        }
        if (direction === BOTTEM_ARROW) {
            fastX = 0;
            fastY = 10;
        }

    */

    if (direction === LEFT_ARROW && !right) {
        fastX = -10;
        fastY = 0;
    }
    if (direction === TOP_ARROW && !bottem) {
        fastX = 0;
        fastY = -10;
    }
    if (direction === RIGHT_ARROW && !left) {
        fastX = 10;
        fastY = 0;
    }
    if (direction === BOTTEM_ARROW && !top) {
        fastX = 0;
        fastY = 10;
    }
}