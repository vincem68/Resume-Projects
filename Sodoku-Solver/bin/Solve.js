
/**
 * 
 * @param {*} grid: a 2D array that represents the grid
 * This function will solve the puzzle and put the missing numbers into the inputted 
 * 2D array. The function will be async so the user can still interact with the site.
 * Function should not return anything since arrays are passed by reference.
 */
async function solve(grid){

    //this chunk of code will create an array list representing the blocks.
    //numbers inside each block are numbers that are not yet in that specific block
    var blockNumbers = new Array(9);
    for (var i = 0; i < blocksNumbers.length; i++){
        blockNumbers[i] = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }

    //this section will go through the param grid and take out the numbers already in each block
    //empty spaces in the grid will be represented with a 0
    var currentBlock = 0; //keeps track of current block we're in
    for (var i = 0; i < grid.length; i++){
        
        for (var j = 0; j < grid[i].length; j++){
            //when we cross into the next block in the row
            if (j == 3 || j == 6){
                currentBlock += 1;
            }
            //if we have a filled space in the grid
            if (grid[i][j] != 0){
                removeElement(blockNumbers, currentBlock, grid[i][j]);
            }
            //when we go down to the next row of blocks
            if ((i == 2 || i == 5) && j == 8){
                currentBlock += 1;
            } else { //resets to the first block in the row
                currentBlock -= 2;
            }
        }
    }

    //ths is where we will begin filling in the spaces
    var filledBoxes = 9; //the condition variable that keeps track of blocks that remain to fill

    while (filledBoxes != 0){ 

        for (var i = 0; i < 9; i++){

            var change = false; //we'll use this to check if we should go through the block again.
            

        }

    }
}


/**
 * 
 * @param {*} blockNumbers the 2D array that contains the numbers missing from the blocks
 * @param {*} block the block we want to remove the number from
 * @param {*} number the number we want to remove from the block
 */
function removeElement(blockNumbers, block, number){
    var index = blockNumbers[block].indexOf(number);
    blockNumbers.splice(index, 1);
}