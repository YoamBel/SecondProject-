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
// dogma
//--------------------

AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()

DrawSnake();
//--------------------