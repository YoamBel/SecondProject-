// 1 er explication canvas 

const canvas = document.getElementById('canvas'); //je cible mon id canvas
const ctx = canvas.getContext('2d'); // mon type jeu soit en 2D

// 2 eme explication  le remplissage 
ctx.fillStyle = "white"; // lemalote canvas (div canvas)
ctx.strokeStyle = "black"; // ani noten lo tsva chel gvoulote chel canvas
ctx.fillRect(0, 0, canvas.width, canvas.height); // noten nekouda mesouyam  kede lehatril , gam ete horeh  ve rohave
ctx.strokeRect(0, 0, canvas.width, canvas.height); // noten gam nekouda mesouyam kede lehatril  gam ete horeh ve rohave im ha gvoulim



// pour explication 5
let fastX = 10; // ze hamehiroute chel x  ve 10 ze biglla che anahnou ovdim im pixelim
let fastY = 0

// pour explication 8 
let appleX = 0; // ze position x
let appleY = 0; // ze position y


// pour explication 9
let score = 0;

// 3 eme explication position et forme du sepent
//--------------1)Rosh---------------2)/3)/4) hatihote chel hagouf 
let snake = [{ x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }]
    //baniti maarah che hou mekabel aémda chel hatihote chel nahash 

// 4 eme explication dessiner les morceau du serpent

// ani tsarih fonction kedé ladahate al ma hanahash holeh liyote (pashoute heh hou niret)
function DrawPieces(pieces) {

    ctx.fillStyle = "gold"; // tseva chel nahash 
    ctx.strokeStyle = 'black'; // gvoulim chel nahash 
    ctx.fillRect(pieces.x, pieces.y, 10, 10); //pieces.x, pieces.y --- > émda chel nahash ba mikomote x ve y / 10, 10 ----> godel chel hatiha be pixel
    ctx.strokeRect(pieces.x, pieces.y, 10, 10); //kmo ctx.fillRect aval im ha gvoulim

}

// ani tsarih hod fonction kede livnote ete ha nahash
function DrawSnake() {
    snake.forEach(pieces => {
        DrawPieces(pieces); // Im ha snake.forEach hou holeh letsayer ete ha nahash
    })
}
// dogma
//--------------------
//DrawSnake();
//--------------------


//5 eme explication bouger le serpent de gauche a droite


/*
// variable expliquer en haut
let fastX = 10; 
*/

function AdvanceSnake() {
    // kede lehitkadem ha nahash ani tsarih lechanote ete ha value ve lahasote machou kede che ze noten argacha lehikadem 
    // az ani tsarih lehosif rosh hadash ba harishon ve limhoke eta ha aharon
    let head = { x: snake[0].x + fastX, y: snake[0].y + fastY }; // kede lehitkam anahach 10 px
    snake.unshift(head); // leosif head 


    //pour lexplication 9
    //ani tsarih livdok ha im arosh chel ha nahash hou al atapouhah
    let snakEeatsApple = snake[0].x === appleX && snake[0].y === appleY;
    // if aze bodek im hanahash ahal ete atapouah, im ken az ze bone tpouah hadash
    if (snakEeatsApple) {
        score += 10;
        document.getElementById('score').innerHTML = score;

        CreateApple();
        // ve gam anahash mathil leachemin ki ze lo mohek  riboua aharon chelo

    } else {
        snake.pop(); // mohek element aharon chel maarah
    }


}

// dogma
//--------------------
/*
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
AdvanceSnake()
*/
//DrawSnake();
//--------------------


//6 eme explication bouger le serpent 

//fonction azote ze aizra kede laasote hitroul canvas kol mini second (0,1 second) 
function CleanCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

//fonction azote ze kede latete agachat che anahash zaz levade


function animation() {

    // setTimeout koret ha fonction kol 0,1 seconde 
    setTimeout(function() {

        //ma tsarih lahasote 
        // 1) hitroute canvas 
        CleanCanvas();

        //a lexplication 8
        DrawAppel();



        // 2)lehitkadem nahash
        AdvanceSnake();
        //3) letsayer hanahash mehadash
        // a lexplication 10 
        if (EndGame()) {
            return;
        }


        DrawSnake();

        animation(); // fonction recursive ki hi tsriha likero ota kol azman

    }, 100);

}
animation(); // mafil oto paham ahat kede che hou yehol lehicaness
// explication 8
CreateApple(); // ani matril livenote atapouha arishon mhout a function


//7 eme explication changer dirction du serpent


//keydown ---> matay cheani lohets button bamikledet
document.addEventListener('keydown', ChangeDirection);


// che ani mishtamesh addEvenListner ani yehol lakahat event
//fonction azote ze kede lechanote dirction
function ChangeDirection(event) {

    // misparim keycode chel amikeldete 
    let LEFT_ARROW = 37; // 37 ---> smole
    let RIGHT_ARROW = 39; // 39 ---> yamin
    let TOP_ARROW = 38; // 38 ---> lemala
    let BOTTEM_ARROW = 40; // 40 ---> lemata


    let direction = event.keyCode; // dirction ze kede lakahat hakaftoh che lahatsti im event ve keycode

    // === livedok im ze true or false
    // ki ani lo rotser che anahash yehol laasote hazarote alave(lavore alave im ani mechaner ha dirction)
    let top = fastY === -10; // -10 ki ani holer ve mispar chel amakom iyer yoter gadol
    let bottem = fastY === 10; // 10 ze yored
    let right = fastX === 10;
    let left = fastX === -10;

    //ahchave che yesh li ete col ze (en haut) ani yehole lenael adirction

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

    //him nahash holeh letsad yamine az fastX= 10
    //az tsarih laafore right = false kede che hou lo yeyol lahzor alav (lo yehol lalhed bstade smole)
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


//8 eme explication La pomme
/*
canvas hou 300x300 pixelin 
az ani tsarih misparim randome ben 0 les 290 
lama 290 ki im ani ose ben 0 les 300 hatapouah yehol latset me ha canvas
ani tsarih gam lasim misparim chemesayem be 0 kede che amemad hiyer komo chel anahash
im lo ha nahash lo yehol lakahat oto
*/

function random() {

    return Math.round((Math.random() * 290) / 10) * 10;
    /* math.random = 0,7
    0,7*290 = 203
    203 / 10 = 20,3
    math.round(20)*10 = 200
     ze hoser li lehoride amispar aharon ve leosif 0 im *10
    */

}
//letsayer tapouhah (kmo snake oto raayon)
function CreateApple() {


    appleX = random(); //position chel x random
    appleY = random(); //position chel y random
    // console.log(pommeX, pommeY);

    //ahchev ani tsarih levnote tapoah che hou lo al hanahash

    snake.forEach(function(part) {
        // az lekol element chel anahash ani tsarih ladaat im true or false haim tapouah hou alav
        let appleOnTheSnake = part.x == appleX && part.y == appleY; //pour savoir si la pomme se situ sur le serpent 
        //im tapouha hou al anahash az tsarih livnote tapouah  hadash
        if (appleOnTheSnake) {
            CreateApple();
        }

    })
}

// ani tsarih function aze kede letsayer ha tapouah 
function DrawAppel() {

    ctx.fillStyle = 'red';
    ctx.strokeStyle = "darkred";
    ctx.fillRect(appleX, appleY, 10, 10);
    //ctx.beginPath(); //  kede leagid cheani metayer oto ke igoule
    //ctx.arc(appleX + 5, appleY + 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

}

/**Revenir a la fonction animation*** */


// 9 eme explication manger la pomme 

// allez sur la fonction avance snake


// 10 eme explication Fin jeu

function EndGame() {

    let headlessSnake = snake.slice(1, -1); // ze kede kol hatihote chel anahash hou lo bamakom chel arosh
    let bite = false; //kede leagide che hou lo nohech adain
    headlessSnake.forEach(pieces => {
        // im 1 meahatihote chel x === rosh chel a snake.x ve gam meahatihote chel y === rosh chel a snake.y
        // az ha nahash nocher bite = true
        if (pieces.x === snake[0].x && pieces.y === snake[0].y) {
            bite = true;
        }
    })

    // bedikote keder ladaate him hou nogea kirim 
    let touchTheLeftWall = snake[0].x < -1; // him rosh chel snake.x < -1 zote omeret che hou avar kir chel smole
    let touchTheRightWall = snake[0].x > canvas.width - 10; // 300 -10  290 ze amakom aharon che hou yehole lhyote
    let touchTheTopWall = snake[0].y < -1;
    let touchTheBottomWall = snake[0].y > canvas.height - 10;


    let gameOver = false;

    //if 
    if (bite || touchTheLeftWall || touchTheRightWall || touchTheTopWall || touchTheBottomWall) {
        gameOver = true;
    }


    return gameOver;


    //explication 11 pour relancer le jeu 

    function Restart() {
        let restart = document.getElementById('restart'); // je cible la div de recommencer
        restart.style.display = "block";

        document.addEventListener('keydown', (e) => {
            // 32 corespon a la barre espace
            if (e.keyCode === 32) {
                document.location.reload(true); //ze kede laasote refrsh 
            }
        })

    }

}