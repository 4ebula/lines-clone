let addBalls = true; 
let stopBalls = false;//swtich 'true' for balls add
let ballState = false;
let lastPosition;
let score = 0;
let dsp = ["one", "two", "three", "four"];
let lastCell;
let positionField = new Array(9).fill(0);
for (let i = 0; i < 9; i++) {
    positionField[i] = new Array(9).fill(0);
}
/** Balls codes:
 * 0 - none
 * 1 - red      200 0   0
 * 2 - green    0   200 0
 * 3 - blue     0   0   200
 * 4 - yellow   200 200 0
 * 5 - purple   200 0   200
 * 6 - cyan     0   200 200
 * 7 - black    0   0   0
 **/
let field = new Array(9).fill(null);
for (let i = 0; i < 9; i++) {
    field[i] = new Array(9).fill(null);
}

let colors=["red", "green", "blue", "yellow", "purple", "cyan", "black"];              
let rowIndex, colIndex;

//Creates field and ball
window.onload = function(){
    document.documentElement.style.setProperty("--digit", document.getElementById("score").offsetWidth / 5 + "px");
    let playField =  document.getElementById("playField");
    for(let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let divN = document.createElement("div");
            /*
            divN.setAttribute("id", i);
            */
            divN.setAttribute("class", "cell");
            divN.setAttribute("onclick", `ballMovement(${i}${j})`);
            let figN = document.createElement("figure");
            
            figN.setAttribute("id", `${i}${j}`);
            
            figN.setAttribute("class", "");
            divN.appendChild(figN);
            playField.appendChild(divN);
        }
    }
    ballAdition(5);
    ballsPositions();
}

function ballMovement(cellNumber){
    let row, col;
    ballsPositions(); //where balls are
    //
    lastCell = cellNumber;
    //
    console.log('Cell number is', cellNumber);
    row = `0${cellNumber}`.slice(-2)[0];
    col = `0${cellNumber}`.slice(-2)[1];
    {
        //if nothing bounces
        if(ballState == false){
            if(positionField[row][col] != 0) ballBounce(cellNumber, "bounce");
        }
        //if bounces, but click the cell with any ball
        else {
            row = `0${cellNumber}`.slice(-2)[0];
            col = `0${cellNumber}`.slice(-2)[1];
            if(positionField[row][col] != 0){
                ballBounce(lastPosition, "none");
                if(cellNumber != lastPosition) ballBounce(cellNumber, "bounce");
            }
            //if bounces, and click the empty cell
            else { /* ЕСЛИ ТУДА МОЖНО ПОПАСТЬ*/
            ballBounce(lastPosition, "none");
            moveBall(cellNumber);
            }
        }
    }

}

//Make ball boucnce
function ballBounce(cellNumber, stance){
    let cell = `0${cellNumber}`.slice(-2);
    document.getElementById(cell).style.animationName = stance;
    lastPosition = cellNumber;
    ballState = !ballState;
}
function moveBall(newPosition){
    newCell = `0${newPosition}`.slice(-2);
    lastCell = `0${lastPosition}`.slice(-2);
    let lastColor = document.getElementById(lastCell).className.split(" ");
    document.getElementById(lastCell).className = "";
    document.getElementById(newCell).className = "ball " + lastColor[1];
    linedBalls();
    ballAdition();
}
function ballAdition(amount = 3){
    ballsPositions();
    if(amount != 5 && !linedBalls()) return 0;

    /*TO STOP ADDING BALLS*/
    if(stopBalls && amount != 5) return 0;
    /* */

    let position = [];
    let tempColor;
    let possiblePositions = [];

    //Search for empty spaces
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(positionField[i][j] == 0){
                possiblePositions.push([i, j]);
            }     
        }
    }

    while(amount > 0 && addBalls == true){ //addBalls switches ball adition
        position = possiblePositions[getRandom(0, possiblePositions.length)];
        tempColor = getRandom(0,7);
        positionField[position[0]][position[1]] = tempColor+1;
        document.getElementById(`${position[0]}${position[1]}`).className = "ball " + colors[tempColor];
        amount--;
        let index = possiblePositions.indexOf(position);
        if (index !== -1) {
            possiblePositions.splice(index, 1);
        }
    }
    linedBalls();
}
function linedBalls(){
    //FJFGJS;DLKF
    addBalls = true;
    searchHor();
    searchVer();
    searchDia(); 
    return addBalls;
}
function searchHor(){
    let counter = 1;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 5; j++) {
            if(positionField[i][j] != 0) {
                for (let k = j + 1; k < 9 && counter < 9; k++) {
                    if(positionField[i][j] == positionField[i][k]) counter++;
                    else break;
                }
            }
            if(counter > 4) {
                score += counter * (counter - 4);
                ballDestoy(i, j, counter, 1);
                addBalls = false;
            }
            counter = 1;
        }
        counter = 1;
    }
}
function searchVer(){
    let counter = 1;
    for (let j = 0; j < 9; j++) {
        for (let i = 0; i < 5; i++) {
            if(positionField[i][j] != 0) {
                for (let k = i + 1; k < 9 && counter < 9; k++) {
                    if(positionField[i][j] == positionField[k][j]) counter++;
                    else break;
                }
            }
            if(counter > 4) {
                score += counter * (counter - 4);
                ballDestoy(i, j, counter, 2);
                addBalls =  false;
            }
            counter = 1;
        }
        counter = 1;
    }
}
function searchDia(){
    let counter = 1;
    // \
    for (let i = 0, j = 4, sum = 4; sum < 9; i++, j++) {
        if(j > 4){
            sum++;
            i = -1;
            j = 8 - sum - 1;
            continue;
        }
        if(positionField[i][j] != 0) {
            for (let k = i + 1, l = j + 1; k < 9 && l < 9 && counter < 10; k++, l++) {
                if(positionField[i][j] == positionField[k][l]) counter++;
                else break;
            }
        }
        if(counter > 4) {
            score += counter * (counter - 4);
            ballDestoy(i, j, counter, 3);
            addBalls = false;
        }
        counter = 1;
    }
    for (let i = 4, j = 0, sum = 4; sum < 8; i--, j--) {
        if(j < 0){
            sum++;
            i = 5;
            j = sum - 4 + 1;
            continue;
        }
        if(positionField[i][j] != 0) {
            for (let k = i + 1, l = j + 1; k < 9 && l < 9 && counter < 10; k++, l++) {
                if(positionField[i][j] == positionField[k][l]) counter++;
                else break;
            }
        }
        if(counter > 4) {
            score += counter * (counter - 4);
            ballDestoy(i, j, counter, 3);
            addBalls = false;
        }
        counter = 1;
    }

    counter = 1;
    //Reverse diagonal '/'
    for (let i = 0, j = 4, sum = 4; sum < 9; i++, j--) {
        if(i > j){
            sum++;
            i = -1;
            j = sum - i;
            continue;
        }
        if(positionField[i][j] != 0) {
            for (let k = i + 1, l = j - 1; k < 9 && l >= 0 && counter < 10; k++, l--) {
                if(positionField[i][j] == positionField[k][l]) counter++;
                else break;
            }
        }
        if(counter > 4) {
            ballDestoy(i, j, counter, 4);
            score += counter * (counter - 4);
            addBalls = false;
        }
        counter = 1;
    }
    for (let i = 1, j = 8, sum = 9; sum < 13; i++, j--) {
        if(i > j){
            sum++;
            j = 9;
            i = sum - j;
            continue;
        }
        if(positionField[i][j] != 0) {
            for (let k = i + 1, l = j - 1; k < 9 && l >= 0 && counter < 10; k++, l--) {
                if(positionField[i][j] == positionField[k][l]) counter++;
                else break;
            }
        }
        if(counter > 4) {
            ballDestoy(i, j, counter, 4);
            score += counter * (counter - 4);
            addBalls = false;
        }
        counter = 1;
    }
}

/* CALL
    pathFinder(lastPosition-asarray-ofStrings, ..Postion, 0, []-'cause it's empty, EMPTY)
*/
let counter = 1;
let path = [];
function pathFinder(i, j, initial, destination){
    console.log("Current", i, j);
    if(counter > 100) return 0;
    if(isNaN(i) || isNaN(j)) return '#';
    if(i < 0 || i > 8 || j < 0 || j > 9) return '*';
    if(positionField[i][j] != 0 && `${i}${j}` != initial) return 0;
    if(`${i}${j}` == destination) return `${i}${j}`;
    else return `${i}${j}` + ':' + (pathFinder(i, --j, initial, destination) ? pathFinder(++i, j, initial, destination) ? pathFinder(--i, j, initial, destination) ? pathFinder(i, --j, initial, destination) : 0 : 0 : 0);
 
}

/*
function pathFinder(path, destination, step, forbiden, direction = 1){
    

    let stepper = 100;

    while(!forbiden.includes(path[0]) && stepper != 0){
        cellNumber = path.slice(-1).pop();
        let i = +cellNumber[0];
        let j = +cellNumber[1];
        console.log('Current cell:', i, j);

        switch(direction){
            case 1:
                i--;
                break;
            case 2:
                j++;
                break;
            case 3:
                i++;
                break;
            case 4:
                j--;
                break;
        }
        stepper--;
        console.log('Next cell:', i, j);
        
        
        if(destination == `${i}${j}`){
            path.push(`${i}${j}`);
            forbiden.push(path[0]);
            console.log('Path:', path);
            return 0;
        }
        else{
            if(i < 0 || i > 8 || j < 0 || j > 9 || path.includes(`${i}${j}`) || forbiden.includes(`${i}${j}`) || positionField[i][j] != 0){
                if(direction < 5){
                    direction++;
                    cellNumber = `${i}${j}`;
                    pathFinder(path, destination, step, forbiden, direction);
                }
                else{
                    forbiden.push(cellNumber);
                    if(path.length =! 1) path.pop();
                    console.log('Path:', path);
                    console.log('Forbiden:', forbiden);
                    step--;
                    direction = 1;
                    return direction;
                }
            }
            else{
                step++;
                path.push(`${i}${j}`);
                console.log('Path:', path);
                pathFinder(path, destination, step, forbiden, 1);
            }
        }
    }
    return path;
}
*/
/*
function pathFinder_ver(path, destination, step, forbiden, direction = 1){
    cellNumber = path[step];
    let i = +cellNumber[0];
    let j = +cellNumber[1];
    console.log('Step', step, 'Direction:', direction, 'Current cell:', i, j);
    switch(direction){
        case 1:
            i--;
            break;
        case 2:
            j++;
            break;
        case 3:
            i++;
            break;
        case 4:
            j--;
            break;
    }
    console.log('Next cell:', i, j);
    console.log('Path:', path);
    console.log('Forbiden:', forbiden);
    if(i < 0 || i > 8 || j < 0 || j > 9){
        if(direction < 5){
            direction++;
            cellNumber = `${i}${j}`;
            pathFinder(path, destination, step, forbiden, direction);
        }
        else{
            forbiden.push(cellNumber);
            if(forbiden.includes(path[0])) {
                console.log('noPath');
                console.log('Exeption_1', 'Step:', step, 'Path:', path);
                return -1;
            }
            else{
                path.pop();
                step--;
                return path;
            }
        }
    }
    else{
        if(destination == `${i}${j}`) return path;
        else{
            if(forbiden.includes(`${i}${j}`)){
                if(direction < 5){
                    direction++;
                    cellNumber = `${i}${j}`;
                    pathFinder(path, destination, step, forbiden, direction);
                }
                else{
                    forbiden.push(cellNumber);
                    if(forbiden.includes(path[0])) {
                        console.log('noPath');
                        console.log('Exeption_2', 'Step:', step, 'Path:', path);
                        return -1;
                    }
                    else{
                        path.pop();
                        step--;
                        console.log('step_3.6');
                        return path;
                    }
                }
            }
            else{
                if(path.includes(`${i}${j}`)){
                    if(direction < 5){
                        direction++;
                        cellNumber = `${i}${j}`;
                        pathFinder(path, destination, step, forbiden, direction);
                    }
                    else{
                        forbiden.push(cellNumber);
                        if(forbiden.includes(path[0])) {
                            console.log('noPath');
                            return -1;
                        }
                        else{
                            path.pop();
                            step--;
                            console.log('Exeption_3', 'Step:', step, 'Path:', path);
                            return path;
                        }
                    }
                }
                else{
                    if(positionField[i][j] == 0){
                        step++;
                        path.push(`${i}${j}`);
                        pathFinder(path, destination, step, forbiden, 1);
                    }
                    else{
                        if(direction < 5){
                            direction++;
                            cellNumber = `${i}${j}`;
                            pathFinder(path, destination, step, forbiden, direction);
                        }
                        else{
                            forbiden.push(cellNumber);
                            if(forbiden.includes(path[0])) {
                                console.log('noPath');
                                return -1;
                            }
                            else{
                                path.pop();
                                step--;
                                console.log('Exeption_4', 'Step:', step, 'Path:', path);
                                return path;
                            }
                        }
                    }
                }
            }
        }
    }
}
*/
function ballDestoy(row, col, length, direction){
    displayScore();
    let i = row;
    let j = col;
    while(length != 0) {
        document.getElementById(`${i}${j}`).className = "";
        switch(direction){
            case 1: 
                positionField[i][j] = 0;
                j++;
                break;
            case 2: 
                positionField[i][j] = 0;
                i++;
                break;
            case 3: 
                positionField[i][j] = 0;
                i++;
                j++;
                break;
            case 4: 
                positionField[i][j] = 0;
                i++;
                j--;
                break;
        }
        length--;
    }
}
function displayScore(){
    let displayer = score.toString().split("");
    
    let depth = displayer.length;
    console.log('depth', depth);
    switch(depth){
        case 1: 
            displayer.unshift(0, 0, 0);
            break;
        case 2:
            displayer.unshift(0, 0);
            break;
        case 3:
            displayer.unshift(0);
            break;
    }
    console.log('displayer', displayer);
    for (let i = 0; i< 4; i++) {
        document.getElementById(dsp[i]).textContent = displayer[i];
    }
}
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
function ballsPositions(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tempArray = document.getElementById(`${i}${j}`).className.split(" ");
            positionField[i][j] = tempArray.length == 1 ? 0 : colors.indexOf(tempArray[1])+1;
            
        }
    }
}
/* MANUAL BALLS */
function manualBall(colorM){
    let focusCell = `0${lastCell}`.slice(-2);
    document.getElementById(focusCell).className = "ball " + colorM;
    ballsPositions();
}


/** New features
 * - Add event listner by ID
 * - First drag ball, the explode
 * - Small balls for next move
 * - Game over
 * - Start over
 * - Balls as objects?
 * - Explosion effect
 * - Hard option: forbid path though other balls
 **/