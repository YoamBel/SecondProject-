const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);


// forme du serpent
let snake = [{ x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }]

function DrawPieces(pieces) {

    ctx.fillStyle = "gold"; // tseva chel nahash 
    ctx.strokeStyle = 'black'; // gvoulim chel nahash 
    ctx.fillRect(pieces.x, pieces.y, 10, 10); //pieces.x, pieces.y --- > émda chel nahash ba mikomote x ve y / 10, 10 ----> godel chel hatiha be pixel
    ctx.strokeRect(pieces.x, pieces.y, 10, 10); //kmo ctx.fillRect aval im ha gvoulim

}


function DrawSnake() {
    snake.forEach(pieces => {
        DrawPieces(pieces); // Im ha snake.forEach hou holeh letsayer ete ha nahash
    })
}
// dogma
//--------------------
DrawSnake();
//--------------------