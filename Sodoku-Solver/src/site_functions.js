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
            box.classList.add('col-med-1');
            box.classList.add('p-2');
            box.classList.add('space');
            row.appendChild(box);
        }
    });

    //get all the boxes
    const boxes = document.querySelectorAll('.space');

    //start creating the lists and adding one to each box
    boxes.forEach(box => {

        //create the input for each box. Only numbers 0-9
        const list = document.createElement('input');
        list.type = 'text';
        list.maxLength = 1;
        //list.step = 1;
        list.value = "";
        list.style.display = 'none';
        box.appendChild(list);
        const numParagraph = document.createElement('p');
        numParagraph.textContent = " ";
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
document.getElementById('genButton').addEventListener('click', generateBoard);

//a global object that represents the sodoku grid. Initially starts out with all empty spaces
let grid = [
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
    //make sure to immediately exit if user inputs a non digit or 0
    if (isNaN(this.value) || this.value == "0"){
        alert("Your input is not a digit between 1 and 9. Input something else.")
        return;
    }

    //get the row of the box, and the box itself, gotten by the DOM tree, update the box text
    this.nextSibling.textContent = this.value == "" ? " " : this.value;
    const box = this.parentNode;
    const row = box.parentNode;
    
    //indexes of where the space would be in the grid
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

    //call validateSpace before adding the number
    validateSpace(rowIndex, boxIndex, this.value, grid[rowIndex][boxIndex].toString());

    //update the grid
    grid[rowIndex][boxIndex] = Number(this.value);
}

/**
 * This function will check the grid to make sure a number inputted doesn't violate
 * the rules of Sodoku. The rules to make sure of:
 * 
 *  1. Make sure no duplicate numbers are in the same row
 *  2. Make sure no duplicate numbers are in the same column
 *  3. Make sure no duplicate numbers are in the same box
 * 
 * If nothing is wrong, function returns true to validateSudoku. Otherwise returns false
 */
function validateSpace(rowIndex, spaceIndex, num, prevNum){

    //if user made space empty make it 0 here
    if (num == ""){
        num = "0";
    }

    const rows = document.querySelectorAll('.row');

    //declare booleans to use to let us know what to say in alert if user input is invalid.
    //prevDupNums is used to get any red spaces not the current space that contain the previous value of
    //the current space. Use it to make those spaces white if they are now the only kind of a number left
    //in a row, col or box
    let validRow = true; let validCol = true; let validBox = true; let prevDupNums = [];
    let alertMessage = "The number you have entered makes an invalid puzzle. The following issues are:\n";
    
    //check if the inputted number is already in the row
    rows[rowIndex].childNodes.forEach(space => {
        if (num != "0"){
            if (space.firstChild.value == num && space != rows[rowIndex].childNodes[spaceIndex]){
                space.style.backgroundColor = 'red';
                validRow = false;
            }
        }
        if (prevNum != "0"){
            if (space.firstChild.value == prevNum && space != rows[rowIndex].childNodes[spaceIndex]){
                prevDupNums.push(space);
            }
        }
    });
    if (!validRow){
        alertMessage += "The number inputted is already in the row.\n";
    }
    if (prevDupNums.length == 1){
        prevDupNums[0].style.backgroundColor = 'white';
    }
    prevDupNums = [];
    
    //check if the inputted number is already in the column
    rows.forEach(row => {
        if (num != "0"){
            if (row.childNodes[spaceIndex].firstChild.value == num && row != rows[rowIndex]){
                row.childNodes[spaceIndex].style.backgroundColor = 'red';
                validCol = false;
            }
        }
        if (prevNum != "0"){
            if (row.childNodes[spaceIndex].firstChild.value == prevNum && row != rows[rowIndex]){
                prevDupNums.push(row.childNodes[spaceIndex]);
            }
        }
    });
    if (!validCol){
        alertMessage += "The number inputted is already in the column.\n";
    }
    if (prevDupNums.length == 1){
        prevDupNums[0].style.backgroundColor = 'white';
    }
    prevDupNums = [];
    

    //add all spaces the current space is part of
    const subBox = [];
    if (rowIndex <= 2){
        if (spaceIndex <= 2){
            subBox.push(
                rows[0].childNodes[0], rows[0].childNodes[1], rows[0].childNodes[2],
                rows[1].childNodes[0], rows[1].childNodes[1], rows[1].childNodes[2],
                rows[2].childNodes[0], rows[2].childNodes[1], rows[2].childNodes[2]
            );
        } else if (spaceIndex >= 6){
            subBox.push(
                rows[0].childNodes[6], rows[0].childNodes[7], rows[0].childNodes[8],
                rows[1].childNodes[6], rows[1].childNodes[7], rows[1].childNodes[8],
                rows[2].childNodes[6], rows[2].childNodes[7], rows[2].childNodes[8]
            );
        } else {
            subBox.push(
                rows[0].childNodes[3], rows[0].childNodes[4], rows[0].childNodes[5],
                rows[1].childNodes[3], rows[1].childNodes[4], rows[1].childNodes[5],
                rows[2].childNodes[3], rows[2].childNodes[4], rows[2].childNodes[5]
            );
        }
    } else if (rowIndex >= 6){
        if (spaceIndex <= 2){
            subBox.push(
                rows[6].childNodes[0], rows[6].childNodes[1], rows[6].childNodes[2],
                rows[7].childNodes[0], rows[7].childNodes[1], rows[7].childNodes[2],
                rows[8].childNodes[0], rows[8].childNodes[1], rows[8].childNodes[2]
            );
        } else if (spaceIndex >= 6){
            subBox.push(
                rows[6].childNodes[6], rows[6].childNodes[7], rows[6].childNodes[8],
                rows[7].childNodes[6], rows[7].childNodes[7], rows[7].childNodes[8],
                rows[8].childNodes[6], rows[8].childNodes[7], rows[8].childNodes[8]
            );
        } else {
            subBox.push(
                rows[6].childNodes[3], rows[6].childNodes[4], rows[6].childNodes[5],
                rows[7].childNodes[3], rows[7].childNodes[4], rows[7].childNodes[5],
                rows[8].childNodes[3], rows[8].childNodes[4], rows[8].childNodes[5]
            );
        }
    } else {
        if (spaceIndex <= 2){
            subBox.push(
                rows[3].childNodes[0], rows[3].childNodes[1], rows[3].childNodes[2],
                rows[4].childNodes[0], rows[4].childNodes[1], rows[4].childNodes[2],
                rows[5].childNodes[0], rows[5].childNodes[1], rows[5].childNodes[2]
            );
        } else if (spaceIndex >= 6){
            subBox.push(
                rows[3].childNodes[6], rows[3].childNodes[7], rows[3].childNodes[8],
                rows[4].childNodes[6], rows[4].childNodes[7], rows[4].childNodes[8],
                rows[5].childNodes[6], rows[5].childNodes[7], rows[5].childNodes[8]
            );
        } else {
            subBox.push(
                rows[3].childNodes[3], rows[3].childNodes[4], rows[3].childNodes[5],
                rows[4].childNodes[3], rows[4].childNodes[4], rows[4].childNodes[5],
                rows[5].childNodes[3], rows[5].childNodes[4], rows[5].childNodes[5]
            );
        }
    }

    //check the box to see if we have a duplicate
    subBox.forEach(space => {
        if (num != "0"){
            if (space.firstChild.value == num && space != rows[rowIndex].childNodes[spaceIndex]){
                space.style.backgroundColor = 'red';
                validBox = false;
            }
        }
        if (prevNum != "0"){
            if (space.firstChild.value == prevNum && space != rows[rowIndex].childNodes[spaceIndex]){
                prevDupNums.push(space);
            }
        }
    });
    if (!validBox){
        alertMessage += "The number inputted is already within the same box.\n";
    }
    if (prevDupNums.length == 1){
        prevDupNums[0].style.backgroundColor = 'white';
    }

    //return true if nothing is wrong, revert space back to white if everything is correct
    if (validRow && (validCol && validBox)){
        rows[rowIndex].childNodes[spaceIndex].style.backgroundColor = 'white';
        return;
    }

    //otherwise send the alert to the user, make space red
    alertMessage += "Please choose a different number.";
    alert(alertMessage);
    rows[rowIndex].childNodes[spaceIndex].style.backgroundColor = 'red';
}


/**
 * First checks to see if the current puzzle is valid. If not, sends an alert and exits.
 * If so, calls solve() from Solve.js on the current 2D array and populates the missing spaces.
 * Populates the displayed grid with the corresponding numbers as well.
 * @returns nothing
 */
function solveGrid(){

    //check to see if we have any red spaces. If so, abort the function.
    let validSudoku = true;
    const boxes = document.querySelectorAll('.space');
    boxes.forEach(box => {
        if (box.style.backgroundColor == 'rgb(255, 0, 0)'){
            validSudoku = false;
        }
    });

    if (!validSudoku){
        alert("The puzzle you entered is not valid. Please make changes.");
        return;
    }

    //call solve() from Solve.js and fill up the array
    solve(grid);

    const rows = document.querySelectorAll('.row');
    //start filling in the board based on the values in the array
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            rows[i].childNodes[j].childNodes[0].value = grid[i][j];
            rows[i].childNodes[j].childNodes[1].textContent = grid[i][j];
        }
    }

}

async function generateBoard(){

    document.querySelectorAll('.space').forEach(space => {
        space.style.backgroundColor = 'white';
    });

    //connect to the sudoko api
    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}");
    const board = await response.json();
    //swap out the current grid with the new one
    grid = board.newboard.grids[0].value;

    //change the text values on the viewable grid
    const rows = document.querySelectorAll('.row');
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            rows[i].childNodes[j].childNodes[0].value = grid[i][j];
            rows[i].childNodes[j].childNodes[1].textContent = (grid[i][j] == 0) ? " " : grid[i][j];
        }
    }
}

/**
 * This function will clear the board, resetting it. Called when the user hits the clear board button.
 * Display will make all spaces empty and the global array grid will all contain 0s
 */
function clearBoard(){

    //get all the boxes and have the empty space as their selected options, remove red backgrounds
    const boxes = document.querySelectorAll('.space');
    boxes.forEach(box => {
        box.firstChild.value = 0;
        box.childNodes[1].innerHTML = ' ';
        box.style.backgroundColor = 'white';
    });

    //get the global grid array and set all values to 0
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            grid[i][j] = 0;
        }
    }
}

