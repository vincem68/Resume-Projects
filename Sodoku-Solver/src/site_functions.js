/**
 * This function will be about creating the div elements to represent the boxes as well as setting up the
 * selectors inside each box
 */
window.onload = function() {

    //get all the rows
    const rows = document.querySelectorAll('.rowDiv');

    //start creating the 9 boxes for each row
    rows.forEach(row => {
        for (let i = 0; i < 9; i++){
            const box = document.createElement('div');
            box.classList.add('boxDiv');
            row.appendChild(box);
        }
    });

    //create the list of possible combos for a box selector
    const options = [
        { value: 0, text: ' '},
        { value: 1, text: '1'},
        { value: 2, text: '2'},
        { value: 3, text: '3'},
        { value: 4, text: '4'},
        { value: 5, text: '5'},
        { value: 6, text: '6'},
        { value: 7, text: '7'},
        { value: 8, text: '8'}, 
        { value: 9, text: '9'},
    ];

    //get all the boxes
    const boxes = document.querySelectorAll('.boxDiv');

    //start creating the lists and adding one to each box
    boxes.forEach(box => {
        const list = document.createElement('select');
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.text = option.text;
            list.appendChild(opt);
            if (opt.value == 0){
                opt.selected = true;
            } 
        });
        box.appendChild(list);
    });
    
}

const sodokuFileButton = document.getElementById('sodokuFile');
const fileSubmitButton = document.getElementById('submitFile');


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


/**
 * This function is used when the box is clicked on and brought into focus. It makes the selector inside
 * the box appear to pick a number.
 */
function boxInFocus(){

    //the selector is now viewable
    this.firstChild.hidden = false;
}


/**
 * This function used when the user clicks outside of the box and is out of focus. It hides the selector
 * inside and makes the selected option appear inside the box
 */
function boxOutOfFocus(){

    //selector is now hidden
    this.firstChild.hidden = true;
}

/**
 * This function will add the space inputted manually to the grid. It will then call checkBoxes afterward.
 */
function addNumberToGrid(){

    //the row of the box, and the box itself, gotten by the DOM tree
    const row = this.parentNode.parentNode;
    const box = this.parentNode;

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

