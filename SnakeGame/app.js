const canvas = document.getElementById('canvas'); //je cible mon id canvas
const ctx = canvas.getContext('2d'); // mon type jeu soit en 2D

// Variables

// Vitesse sur X
fastX = 10; // vitesse de x laxe des x (droite et gauche)
// Vitesse sur Y
fastY = 0; // vitesse de y laxe des y (haut et bas (+10))
// pommeX
let appleX = 0;
// pommeY
let appleY = 0;
// Score
let score = 0;
// bugDirection sert a gerer les bug de dirction
let bugDirection = false;
// StopGame
let stopGame = false;


let snake = [{ x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }]
    // 1 er ojet est la tete du serpen x 140 y 150

//cette fonction permet de nettoyer canvas de faire avancer e serpent et de le redessiner
function animation() {

    if (stopGame === true) {
        return;
    } else {

        // setTimeout sert a appeler une fonction au bour un certain nombre de temps (100 est representer par 100 miniseconde)
        setTimeout(function() {
            bugDirection = false; // raffrechire le bug
            CleanCanvas();
            DrawAppel();
            AdvanceSnake();
            DrawSnake();
            // recursion
            animation();

        }, 100);
    }


}
animation();
CreateApple();
//cette fonction permet de metoyer canvas et de le redessiner 
function CleanCanvas() {
    ctx.fillStyle = "white"; // pour le remplissage du canvas
    ctx.strokeStyle = "black"; // pour le contour du canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height); // pour remplire le canvas a 0,0 et que sa prenne toute la longueur et toute la largeur
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // permet de faire le contour
}

// pour dessiner les morceau du serpent
function DrawPieces(pieces) {

    ctx.fillStyle = "gold";
    ctx.strokeStyle = 'black';
    ctx.fillRect(pieces.x, pieces.y, 10, 10); // remplire un rectangle avec les coordonner et on lui donne une largeur et une hauteur
    ctx.strokeRect(pieces.x, pieces.y, 10, 10);

}

function DrawSnake() {
    snake.forEach(pieces => {
        DrawPieces(pieces); //Le foreah represente chaque  objet de mon tableau
    })
}


function AdvanceSnake() {

    const head = { x: snake[0].x + fastX, y: snake[0].y + fastY }; // pour vree une nouvelle tete du serpent qui prendra la 1 er valeur de x plus la vitesse de x (vx) le y prendra aussi vy
    snake.unshift(head); // ajouter une tete en 1 er position ,ajoute un element

    if (EndGame()) {
        snake.shift(head); // enleve la tete soit le 1 er element du tableau
        Restart();
        stopGame = true;
        return;
    }
    // si serpent a manger la pomme alors true il ree une nouvelle pomme 
    const snakEeatsApple = snake[0].x === appleX && snake[0].y === appleY;

    if (snakEeatsApple) {
        score += 10;
        document.getElementById('score').innerHTML = score;

        CreateApple();
    } else {
        snake.pop(); // sinon il enleve le dernier element
    }


}

DrawSnake();

document.addEventListener('keydown', ChangeDirection); // keydown : appuyer sur une touche du clavier

function ChangeDirection(event) {
    // console.log(event);

    // eviter le bug
    if (bugDirection) return;
    bugDirection = true;

    // la dirction des fleche en code ascii soit en keyCode
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;
    const TOP_ARROW = 38;
    const BOTTEM_ARROW = 40;

    const direction = event.keyCode; // valeur du code ascii

    const top = fastY === -10; // le signe des === correspon pour un true ou un false de vy qui est egale a 10
    const bottem = fastY === 10;
    const right = fastX === 10;
    const left = fastX === -10;
    // pour permettre au serpent de ne pas repasser sur lui meme ou de me pas tourner a droite ou a gauche si il est dans le sens opposer


    // Imaginons que l'on veuille aller à gauche (premier cas)
    // on appuie sur la touche gauche, donc direction === FLECHE_GAUCHE === true
    // puis on verifie que l'on est pas entrain d'aller à droite, pour eviter que le serpent se retourne sur lui-même
    // donc si on va à droite, "adroite === true", donc on écrit !adroite (inverse de adroite, donc false) pour empecher la condition && de s'executer.
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
//la taille de la pomme doit toujour etre decaler du nombre de pexel de la tail du serpent


function random() {

    return Math.round((Math.random() * 290) / 10) * 10;

}

function CreateApple() {

    appleX = random();
    appleY = random();
    // console.log(pommeX, pommeY);

    // cree une pomme qui est en dehor du corp du serpent
    snake.forEach(function(part) {

        const appleOnTheSnake = part.x == appleX && part.y == appleY; //pour savoir si la pomme se situ sur le serpent 

        if (appleOnTheSnake) {
            CreateApple();
        }

    })

}

function DrawAppel() {

    ctx.fillStyle = 'red';
    ctx.strokeStyle = "darkred";
    ctx.beginPath(); //  on va dessiner un cercle
    ctx.arc(appleX + 5, appleY + 5, 5, 0, 2 * Math.PI); // pour cree un cercle // le +5 represente la pomme pour quelle soit bien placer pour quand le serpent passera decu
    ctx.fill(); // remplire le cercle et de replacer lobjet par la 1 er valeur du tableau s il ne pas present
    ctx.stroke(); // refaire le comtour et le chemin choisi;

}

function EndGame() {

    let headlessSnake = snake.slice(1, -1); //isoler le coprs du serpent sans la tete a partir de la position 1 jusqua -1
    let bite = false;
    headlessSnake.forEach(pieces => {
        //si un des morceau de x = x de la tete et un des morceau des y = y de la tete cest a dire auil a mordu
        if (pieces.x === snake[0].x && pieces.y === snake[0].y) {
            bite = true;
        }
    })

    const touchTheLeftWall = snake[0].x < -1; // si on par en negatif sur x c que lon est tous  gauche et aue lon a depasser le mur
    const touchTheRightWall = snake[0].x > canvas.width - 10; // la longeur de canvas est 300 et le -10 represente le derniere endoit ou le serpen peu contstruire un dernier carre cest a dire 290
    const touchTheTopWall = snake[0].y < -1;
    const touchTheBottomWall = snake[0].y > canvas.height - 10;

    let gameOver = false;

    // si il se mort ou touche un mur alors  game over renvoi true et se sera la din de la partie 
    if (bite || touchTheLeftWall || touchTheRightWall || touchTheTopWall || touchTheBottomWall) {
        gameOver = true;
    }


    return gameOver;
}

// pour appuiyer sur la touche espace et recommencer la game
function Restart() {
    const restart = document.getElementById('restart'); // je cible la div de recommencer
    restart.style.display = "block";

    document.addEventListener('keydown', (e) => {
        // 32 corespon a la barre espace
        if (e.keyCode === 32) {
            document.location.reload(true);
        }
    })

}