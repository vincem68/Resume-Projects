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
        //list.hidden = true;
        list.style.display = 'none';
        box.appendChild(list);
        const numParagraph = document.createElement('p');
        numParagraph.textContent = " ";
        //numParagraph.style.display = 'inline';
        box.appendChild(numParagraph);

        //add the event listeners
        box.addEventListener('mouseenter', boxInFocus);
        box.addEventListener('mouseleave', boxOutOfFocus);
        list.addEventListener('input', addNumberToGrid);
    });
    
}

/**
 * This is where all the main button will be placed. Events are tied to them here
 */
document.getElementById('resetButton').addEventListener('click', clearBoard);
document.getElementById('solveButton').addEventListener('click', solveGrid);

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

//let notValidSodoku = false;


/**
 * This function is used when the box is clicked on and brought into focus. It makes the form inside
 * the box appear to pick a number. It also hides the text value.
 */
function boxInFocus(){

    this.childNodes[0].style.display = 'inline';
    this.childNodes[1].style.display = 'none';
}


/**
 * This function used when the user clicks outside of the box and is out of focus. It hides the selector
 * inside and makes the selected option appear inside the box
 */
function boxOutOfFocus(){

    //selector is now hidden
    this.childNodes[0].style.display = 'none';
    this.childNodes[1].style.display = 'inline';
}

/**
 * This function will add the space inputted manually to the grid. It will then call checkBoxes afterward.
 */
function addNumberToGrid(){

    //get the row of the box, and the box itself, gotten by the DOM tree, update the box text
    this.nextSibling.textContent = this.value == 0 ? " " : this.value;
    const box = this.parentNode;
    const row = box.parentNode;

    
    let rowIndex = -1; let boxIndex = -1;

    const rowsList = document.querySelectorAll('.row');

    //get the index of the row
    for (let i = 0; i < 9; i++){
        if (row === rowsList[i]){
            rowIndex = i;
            break;
        }
    }

    //get the index of where the box is in the row
    for (let i = 0; i < 9; i++){
        if (box === row.childNodes[i]){
            boxIndex = i;
            break;
        }
    }

    //update the grid
    grid[rowIndex][boxIndex] = Number(this.value);

    //use validateSpace() to check if entered number is valid
    //validateSpace(rowIndex, boxIndex, this.value);
    
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
        alert("The number inputted is already in the row. Please choose a different number.");

    }
    
    //check if the inputted number is already in the column
    

    //check if the inputted number is already in the box
}


/**
 * First checks to see if the current puzzle is valid. If not, sends an alert and exits.
 * If so, calls solve() from Solve.js on the current 2D array and populates the missing spaces.
 * Populates the displayed grid with the corresponding numbers as well.
 * @returns nothing
 */
function solveGrid(){

    /*
    if (!notValidSodoku){
        alert("The puzzle you entered is not valid. Please make changes.");
        return;
    } */

    //call solve() from Solve.js and fill up the array
    solve(grid);

    //start filling in the board based on the values in the array
    const rows = document.querySelectorAll('.row');
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            rows[i].childNodes[j].childNodes[0].value = grid[i][j];
            rows[i].childNodes[j].childNodes[1].textContent = grid[i][j];
        }
    }

}

/**
 * This function will clear the board, resetting it. Called when the user hits the clear board button.
 * Display will make all spaces empty and the global array grid will all contain 0s
 */
function clearBoard(){

    //get all the boxes and have the empty space as their selected options
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.firstChild.value = 0;
        box.childNodes[1].innerHTML = ' ';
    });

    //get the global grid array and set all values to 0
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            grid[i][j] = 0;
        }
    }
}

