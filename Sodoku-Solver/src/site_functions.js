import solve from './Solve.js';

/**
 * This function will be about creating the div elements to represent the boxes as well as setting up the
 * selectors inside each box
 */
window.onload = function() {

    //get all the rows
    const rows = document.querySelectorAll('.row');

    //start creating the 9 boxes for each row
    rows.forEach(row => {
        for (let i = 0; i < 9; i++){
            const box = document.createElement('div');
            box.classList.add('col-1');
            box.classList.add('p-2');
            box.classList.add('box');
            row.appendChild(box);
        }
    });

    //get all the boxes
    const boxes = document.querySelectorAll('.box');

    //start creating the lists and adding one to each box
    boxes.forEach(box => {

        //create the input for each box. Only numbers 0-9
        const list = document.createElement('input');
        list.type = 'number';
        list.min = 0;
        list.max = 9;
        list.step = 1;
        list.value = 0;
        list.hidden = true;
        box.appendChild(list);
        const numParagraph = document.createElement('p');
        numParagraph.innerHTML = ' ';
        box.appendChild(numParagraph);

        //add the event listeners
        box.addEventListener('mouseenter', boxInFocus);
        box.addEventListener('mouseleave', boxOutOfFocus);
        list.addEventListener('change', addNumberToGrid);
    });
    
}

/**
 * This is where all the main button will be placed. Events are tied to them here
 */
document.getElementById('resetButton').addEventListener('click', clearBoard);

//a global object that represents the sodoku grid. Initially starts out with all empty spaces
const grid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];

//this number will be used to keep track of how many spaces in the grid have been filled
let spacesFilled = 0;


/**
 * This function is used when the box is clicked on and brought into focus. It makes the form inside
 * the box appear to pick a number. It also hides the text value.
 */
function boxInFocus(){
    this.childNodes[0].hidden = false;
    this.childNodes[1].hidden = true;
}


/**
 * This function used when the user clicks outside of the box and is out of focus. It hides the selector
 * inside and makes the selected option appear inside the box
 */
function boxOutOfFocus(){

    //selector is now hidden
    this.childNodes[0].hidden = true;
    this.childNodes[1].hidden = false;
}

/**
 * This function will add the space inputted manually to the grid. It will then call checkBoxes afterward.
 */
function addNumberToGrid(){

    //the row of the box, and the box itself, gotten by the DOM tree
    const row = this.parentNode.parentNode;
    const box = this.parentNode;
    const num = box.childNodes[1];

    num.innerHTML = this.value;

    //change the box's displayed number based on the selected number from the drop down
    //box.childNodes[1].innerHTML = box.childNodes[0].options[box.childNodes[0].selectedIndex].text;

    /*
    let rowIndex = -1; let boxIndex = -1;

    const rowsList = document.querySelectorAll('.rowDiv');

    //get the index of the row
    for (let i = 0; i < 9; i++){
        if (row === rowsList[i]){
            rowIndex = i;
        }
    }

    //get the index of where the box is in the row
    for (let i = 0; i < 9; i++){
        if (box === row.childNodes[i]){
            boxIndex = i;
        }
    }

    //update the grid
    grid[rowIndex][boxIndex] = this.value;

    //use validateSpace() to check if entered number is valid
    validateSpace(rowIndex, boxIndex, this.value);
    */
}

/**
 * This function will check the grid to make sure a number inputted doesn't violate
 * the rules of Sodoku. The rules to make sure of:
 * 
 *  1. Make sure no duplicate numbers are in the same row
 *  2. Make sure no duplicate numbers are in the same column
 *  3. Make sure no duplicate numbers are in the same box
 */
function validateSpace(rowIndex, boxIndex, num){

    //if the user selected the space to be empty, exit the function
    if (num == 0){
        return;
    }
    
    //check if the inputted number is already in the row
    if (grid[rowIndex].includes(num)){
        //make the other boxes/numbers that share it red
    }
    
    //check if the inputted number is already in the column
    

    //check if the inputted number is already in the box
}

function solveGrid(){

    //call solve() from Solve.js and fill up the array
    solve(grid);

}

/**
 * This function will clear the board, resetting it. Called when the user hits the clear board button
 */
function clearBoard(){

    //get all the boxes and have the empty space as their selected options
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.firstChild.selectedIndex = 0;
    });

    //get the global grid array and set all values to 0
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            grid[i][j] = 0;
        }
    }
}

