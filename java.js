const section = document.querySelector('.section');
const header = document.querySelector('#header');
const container = document.querySelector('.container');
const grid = document.querySelector('.grid');
const div = document.querySelector(".box");
const buttonContainer = document.querySelector('.buttons');

const MIN_WIDTH_PX = 450;
const MIN_HEIGHT_PX = 450;
const GRID_SIZE_DEFAULT = 25;
const BUTTON_HEIGHT_PX = 33;
const MARGIN_PX = 20;
const GRID_BORDER_PX = 10;

let gridWidthPx = 960;
let gridSize = GRID_SIZE_DEFAULT;


// create header and buttons:
init();


function init() {

	let borderColor = 'rgb(114,160,193)';

	container.style.minWidth = `${MIN_WIDTH_PX}px`;
	container.style.minHeight = `${MIN_HEIGHT_PX}px`;
	container.style.margin = `${MARGIN_PX}px`;
	container.style.border = `${borderColor} ${GRID_BORDER_PX}px solid`;
	container.style.borderRadius = '8px';
	container.style.boxShadow = `0px 0px 20px ${borderColor}`;

	section.style.margin = `${MARGIN_PX}px`;
	section.style.minWidth = `${MIN_WIDTH_PX}px`;

	createDivs(gridSize);

	createButtons();

}


function getCellSizePx() {
	return gridWidthPx / gridSize;
}

// function to create divs
function createDivs(gridSize) {

	container.style.width = gridWidthPx + 'px';
	container.style.height = gridWidthPx + 'px';
	
	let cellSize = getCellSizePx();
	
		let i = 0;
		do {
			const div = document.createElement('div');
			div.addEventListener('mouseover', updateCell);
			div.style.backgroundColor ='grey';
			div.style.width = cellSize + 'px';
			div.style.height = cellSize + 'px';
			container.appendChild(div).classList.add('box');
			i++;
		} while (i < (gridSize ** 2));
}



//change cell colour
function updateCell(e) {
	let div = e.target;
	div.style.backgroundColor = "red";
}

// need to create button to restart grid 
function createButtons() {
	const rstbtn = document.createElement('button');
	rstbtn.addEventListener('click', clearGrid);
	rstbtn.textContent = "Clear Grid";
	buttonContainer.appendChild(rstbtn);

	const boxButton = document.createElement('button');
	boxButton.addEventListener('click', changeBoxNumber);
	boxButton.textContent = 'Change Number Of Boxes';
	buttonContainer.appendChild(boxButton);

	const boxSlider = document.createElement('input');
	boxSlider.classList.add('slider');
	buttonContainer.appendChild(boxSlider);

}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
	createDivs(gridSize)
}


function changeBoxNumber() {
	gridSize = parseInt(prompt('Please enter the number of cells per side:'));
	if (gridSize > 100 || gridSize < 0) {
		gridSize = parseInt(prompt('Enter a cell number between 0 and 100'))
	}
	
	clearGrid();
}