// Explication dans la fonction avance serpent pour quil mange la pomme et du score

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);


let fastX = 10;
let fastY = 0



let appleX = 0; // ze position x
let appleY = 0; // ze position y


let score = 0;



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
    snake.unshift(head);


    //verification si il a manger la pomme
    let snakEeatsApple = snake[0].x === appleX && snake[0].y === appleY;
    //si true le serpent grandi
    if (snakEeatsApple) {
        score += 10;
        document.getElementById('score').innerHTML = score;

        CreateApple();


    } else {
        snake.pop(); // mohek element aharon chel maarah
    }


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


        CleanCanvas();
        // suite
        DrawAppel();
        AdvanceSnake();
        DrawSnake();
        animation();

    }, 100);

}
animation();
// cree la pomme
CreateApple();


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


// la pomme 
/*
canvas 300x300
donc besion un chiffre random 0- 290
290 car la pomme peu sortir du canvas et le serpent pourra pas latteindre car sa taille est de 10 px par morceau
et  faut mettre des chiffre entier pour quele serprend puisse  entre dans le champ sans toucher le mur
*/


function random() {

    return Math.round((Math.random() * 290) / 10) * 10;
    /* math.random = 0,7
    0,7*290 = 203
    203 / 10 = 20,3
    math.round(20)*10 = 200
    */

}
//letsayer tapouhah (kmo snake oto raayon)
function CreateApple() {


    appleX = random();
    appleY = random();

    snake.forEach(function(part) {
        // verifi true or false si il est sur le snake
        let appleOnTheSnake = part.x == appleX && part.y == appleY; //pour savoir si la pomme se situ sur le serpent 
        if (appleOnTheSnake) {
            CreateApple();
        }

    })
}

function DrawAppel() {

    ctx.fillStyle = 'red';
    ctx.strokeStyle = "darkred";
    ctx.fillRect(appleX, appleY, 10, 10);
    ctx.fill();
    ctx.stroke();

}