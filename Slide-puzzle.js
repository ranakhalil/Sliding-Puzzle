/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Sliding Block Puzzle
Author : Rana Khalil
Created : 17th of September , 2011
Modified : 24th of September, 2011
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/
//setting the default image path
var _image_path = "img1.jpg";
//Image dimensions: height and width
var _image_width =  640;
var _image_height = 426;

//array of images to store the different images and their sizes
var images = new Array();

//Storing the image with its height and width in an object to easily retrieve it
var obj1 = new Object();
obj1.path = "img1.jpg"; //image path with the name
//Image dimensions
obj1.swidth = 640;
obj1.sheight = 426;
images [0] = obj1; //storing the object into the array

//Storing the image with its height and width in an object to easily retrieve it
var obj2 = new Object();
obj2.path = "image_3.jpg"; //image path with the name
//Image dimensions
obj2.swidth = 779;
obj2.sheight = 1025;
images[1] = obj2; //storing the object into the array

//Storing the image with its height and width in an object to easily retrieve it
var obj3 = new Object();
obj3.path = "image_4.bmp";//image path with the name
//Image dimensions
obj3.swidth = 430;
obj3.sheight = 397;
images[2] = obj3;//storing the object into the array

//Storing the image with its height and width in an object to easily retrieve it
var obj4 = new Object();
obj4.path = "image_5.jpg"; //image path with the name
//Image dimensions
obj4.swidth = 500;
obj4.sheight = 363;
images[3] = obj4; //storing the object into the array

//Storing the image with its height and width in an object to easily retrieve it
var obj5 = new Object();
obj5.path = "image_6.jpg"; //image path with the name
//Image dimensions
obj5.swidth = 290;
obj5.sheight = 500;
images[4] = obj5; //storing the object into the array

//Storing the image with its height and width in an object to easily retrieve it
var obj6 = new Object();
obj6.path = "image_7.jpg"; //image path with the name
//Image dimensions
obj6.swidth = 350;
obj6.sheight = 250;
images[5] = obj6; //storing the object into the array

//Storing the image with its height and width in an object to easily retrieve it
var obj7 = new Object();
obj7.path = "image_8.jpg";//image path with the name
//Image dimensions
obj7.swidth = 779;
obj7.sheight = 809;
images[6] = obj7; //storing the object into the array

//default number of rows and columns
var _num_rows = 4;
var _num_cols = 4;


//The default values for the size of the tile created by divs
var _tile_width = 60;
var _tile_height = 50;

// this is the array which will save the tiles in
var tile_array;


// Add any other global variables you may need here.

/*
 * Summary: function to create 2 dimensional array through creating an array or arrays. 
 * Parameter: the number of rows and columns required
 * Returns: the two dimensional array with the number of rows and columns passed into the function
 */
function doubleArray(row, col)
{
  var arr = new Array(row);  // creating a new array with the size of the rows passed, which each row will have
								// An array with the number of cells representing the number of columns needed
	
	/*
	* This for loop goes over each cell in the array, then creates an array
	* of arrays representing the rows and columns
	*/
	for(var r=0; r<row ; r++) 
	{
		arr[r] = new Array(col); // creating an array of the size representing the number of columns in each row cell
	}
	
	return arr; //return array
} //double Array function ends


/*
 * Summary: createTile, creates the divs , adds them to the window so they would show on the screen and sets
 * the position of teh background image to represent the part of the image needed
 * Parameter: it takes no parameters
 * Returns: It doesn't return anything
 */

function createTiles(){
	
	
  // figure out how wide and tall each tile should be based on the image with and height
  // then ceiling the float that will result from dividing the total size of the image
 // by the number of rows and columns needed
  	_tile_width = Math.ceil(_image_width/_num_cols); // divide the total number of divs needed by the number of columns to get
													// the tile width
  
	_tile_height = Math.ceil(_image_height/_num_rows);  // divide the total number of divs needed by the number of rows to get
														// the tile height

 
	//Create the two dimensional array needed to save the tiles in
	 tile_array = doubleArray(_num_rows, _num_cols);
	
  // add all of the tiles to your page using nested for loops and
	for(var r=0; r<_num_rows ; r++) // to loop over each row
	{
		for(var c=0; c<_num_cols ; c++) // to loop over each column
		{
			if(r === c && c === 0) // if we are in the first row and column, we mark it as the empty tile
			{
				tile_array[r][c] = 0; // we mark it by adding zero
				continue; //continue to the loop
			}
			
			var container = document.getElementById("cont"); // get the container div which we will place the other divs in
			tile_array[r][c] = createDiv(r,c); //save each div created into the array
			container.appendChild(tile_array[r][c]); //append the div created and saved to the container
			
		}
	}


	
}

/*
 * Summary: Should return a div with the specified width and height 
 * and put it at the supplied row and column, sets the background picture position
 * Parameters: it recieved the specific row and column to be able to which part of the picture should the tile show
 * Returns: The div you created
 */
function createDiv(row, col){
  // create your div and set its size & position attributes
  // based on parameters
	var tile = document.createElement("div"); // creating the div element for the tile

	var x = _tile_width * col; // setting the x position for the picture
	var y =  _tile_height * row; // setting the y position for the picture

	tile.style.backgroundImage = "url("+_image_path+")"; // setting the background picture and its path
	tile.style.width = _tile_width+"px"; // setting the width of the div
	tile.style.height = _tile_height+"px"; // setting the height of the div
	tile.style.left = col * _tile_width+"px"; //setting the left position of the div
	tile.style.top = row * _tile_height+"px"; // setting the top position of the div
	tile.style.position = "absolute"; // setting the div position to absolute
	tile.className = "empty"; //setting the class name of the div to the empty class in the CSS part in p1.html
	tile.row = row; //setting the row of the tile to the row in the array
	tile.col = col; //setting the column of the tile to the column in the array
	
	// add an event handler that will execute some function you define that will move the 
  // clicked div to the empty tile location if the div is in a valid position
	tile.onclick = tileClicked;

	//setting the background picture position relative to the div to show part of the picture
	tile.style.backgroundPosition = (-x)+"px"+" "+(-y)+"px";
		
  
	// return your tile
	return tile;
} // createDiv ends here


/*
 * Summary: Example function that could get called when a tile is clicked.
 * Parameters: the event passed to the tileClicked (which is the mouse click)
 */

function tileClicked(e){
  // check if the tile can move to the empty spot
  // if the tile can move, move the tile to the empty spot

	var curr_tile = e.target; // setting the curr_tile to the tile that has been clicked
	
	var curr_row = curr_tile.row; // setting the curr_row to the row of the tile clicked
	var curr_col = curr_tile.col; //setting the curr_col to the column of the tile clicked
	
	/*
	* check the tile in the row before the tile clicked , if the tile from the row before it is the empty one , we move the tile 
	* to the position of the empty tile, and set the empty tile to the position where the curr_tile was
	*/
	if( ! (curr_row - 1 < 0 )) // checking if the row number is valid and didnt exceed the boundaries
	{
		if(tile_array[curr_row-1][curr_col] == 0) //check if the item before the tile clicked is the empty tile
		{
			var temp1 = tile_array[curr_row][curr_col]; // save the div currently clicked into the temp variable
			tile_array[curr_row][curr_col] = 0; // set the current tile position to the empty tile
			curr_tile.row = curr_row - 1; // setting the tile new row
			curr_tile.col = curr_col; // setting the tile new col
			tile_array[curr_tile.row][curr_tile.col] = temp1; //saving the div in the new position
			curr_tile.style.left = curr_tile.col * _tile_width+"px"; //setting the left position for the tile 
			curr_tile.style.top = curr_tile.row * _tile_height+"px"; //setting the top position for the tile
			
		}
	}
	

	/*
	* check the tile in the row after the tile clicked , if the tile from the row after it is the empty one , we move the tile 
	* to the position of the empty tile, and set the empty tile to the position where the curr_tile was
	*/
	
	if(!(curr_row + 1 > _num_rows - 1))  // checking if the row number is valid and didnt exceed the boundaries
	{
		if(tile_array[curr_row + 1][curr_col] == 0) //check if the item after the tile clicked is the empty tile
		{
				var temp2 = tile_array[curr_row][curr_col]; // save the div currently clicked into the temp variable
				tile_array[curr_row][curr_col] = 0; // set the current tile position to the empty tile
				curr_tile.row = curr_row + 1; // setting the tile new row
				curr_tile.col = curr_col; // setting the tile new col
				tile_array[curr_tile.row][curr_tile.col] = temp2; //saving the div in the new position
				curr_tile.style.left = curr_tile.col * _tile_width+"px"; //setting the left position for the tile 
				curr_tile.style.top = curr_tile.row * _tile_height+"px"; //setting the top position for the tile
		}
	
	}
	
		/*
		* check the tile in the column before the tile clicked , if the tile from the row before it is the empty one 
		* , we move the tile to the position of the empty tile, and set the empty tile to the position where the curr_tile was
		*/

		if(!(curr_col - 1 < 0))
		{
			if(tile_array[curr_row][curr_col-1] == 0)
			{
				var temp3 = tile_array[curr_row][curr_col];
				tile_array[curr_row][curr_col] = 0;
				curr_tile.col = curr_col - 1;
				curr_tile.row = curr_row;
				tile_array[curr_tile.row][curr_tile.col] = temp3;
				curr_tile.style.left = curr_tile.col * _tile_width+"px";
				curr_tile.style.top = curr_tile.row * _tile_height+"px";
			}
		}
		
	
			if(!(curr_col + 1 > _num_cols))
			{
				if(tile_array[curr_row][curr_col+1] == 0)
				{
					var temp4 = tile_array[curr_row][curr_col];
					tile_array[curr_row][curr_col] = 0;
					curr_tile.col = curr_col+1;
					curr_tile.row = curr_row;
					tile_array[curr_tile.row][curr_tile.col] = temp4;
					curr_tile.style.left = curr_tile.col * _tile_width+"px";
					curr_tile.style.top = curr_tile.row * _tile_height+"px";
				}
			}
	
	
}

/*
 * Summary: Shuffle up the tiles in the beginning of the game
 */
function shuffleTiles(){
	
	//set the empty tile row and columns position
	var row = 0;
	var col = 0;
	
	//for loops to ensure iteration over each tile and moving it
	for(var r=0; r < _num_rows; r++)
	{
		for(var c=0; c < _num_cols; c++)
		{
			if(tile_array[r][c] === 0) //if its the empty tile, continue to the next tile
			{continue;}
			
			if(!(r-1 < 0) && tile_array[r-1][c] === 0) // check for teh row before the empty tile , if its valid
			{
				var temp3 = tile_array[r][c]; // set a temp. variable to save the tile in
				temp3.style.left = c * _tile_width+"px";
				temp3.style.top = (r-1) * _tile_height + "px";
				tile_array[r][c] = 0;
				tile_array[r-1][c] = temp3;
			}
			
			if(!(c-1 < 0) && tile_array[r][c-1] === 0)
			{
				var temp = tile_array[r][c];
				temp.style.left = (c - 1) * _tile_width+"px";
				temp.style.top = r * _tile_height+"px";
				tile_array[r][c] = 0;
				tile_array[r][c-1] = temp;
			}
			
			if( (c+1) < _num_cols && tile_array[r][c+1] === 0)
			{
				var temp2 = tile_array[r][c];
				temp2.style.left = (c + 1) * _tile_width+"px";
				temp2.style.top = r * _tile_height+"px";
				tile_array[r][c] = 0;
				tile_array[r][c+1] = temp2;
			}
			
		
			if( (r+1) < _num_rows && tile_array[r+1][c] === 0)
			{
				var temp4 = tile_array[r][c];
				temp4.style.left = c * _tile_width+"px";
				temp4.style.top = (r+1)*_tile_height+"px";
				tile_array[r][c] = 0;
				tile_array[r+1][c] = temp4;
			}
		}
	}

}

/*
 * Summary: Generates a random puzzle
 * Random number of random rows and cols with random picture
 */
function generateRandomPuzzle(){
//Random number of rows and cols and picture

	var num = Math.ceil(Math.random()*6); // set the random magical number to access the array of images through
	_image_path = String(images[num].path); // get the image path using the index generated
	_image_width = images[num].swidth; //get the picture width
	_image_height = images[num].sheight; //get the picture height
	
	var puzzleSize = Math.ceil(Math.random()*9); //get the random puzzle size
	_num_rows = puzzleSize; //set the number of rows
	_num_cols = puzzleSize; // set the number of columns
	
	
	
	
	
	
}

/*
 * When the page loads, create our puzzle
 */
window.onload = function () {
  // generate parameters for a random puzzle
  // create the tiles
  // shuffle the tiles

	generateRandomPuzzle();	
	createTiles();
//	shuffleTiles();

	

	

}






