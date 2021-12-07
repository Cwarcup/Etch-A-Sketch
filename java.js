const section = document.querySelector('.section');
const container = document.querySelector('.container');
const div = document.querySelector(".box");
const buttonContainer = document.querySelector('.buttons');

const MIN_WIDTH_PX = 350;
const MIN_HEIGHT_PX = 350;
const GRID_SIZE_DEFAULT = 25;
const MARGIN_PX = 20;
const GRID_BORDER_PX = 10;

let gridWidthPx = 720;
let gridSize = GRID_SIZE_DEFAULT;

init();

// run at open
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
	createButtons();
	createDivs(gridSize);
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

//create 'clear' button
function createButtons() {
	const rstbtn = document.createElement('button');
	rstbtn.addEventListener('click', clearGrid);
	rstbtn.textContent = "Clear Grid";
	buttonContainer.appendChild(rstbtn);
}

//determine each box size in px
function getCellSizePx() {
	return gridWidthPx / gridSize;
}

//change box colour
function updateCell(e) {
	let div = e.target;
	div.style.backgroundColor = "black";
}

//removes the color from grid and creates new divs
function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
	createDivs(gridSize)
}

//Slider
//ToFix: certain values (i.e., 39) cause boxes not to fit in boarder. WHY!
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
	setCurrentSize(value);
	updateSizeValue(value);
	clearGrid();
}
function updateSizeValue(value) {
	sizeValue.innerHTML = `${value} x ${value}`
  }

  function setCurrentSize(newSize) {
	  gridSize = newSize;
  }

//   ToFix: rainbow button. RGB works, but isnt changing when clicked. 
const rainbowbtn = document.querySelector('.rainbowbtn');

rainbowbtn.addEventListener('click',toRainbow(e));

function toRainbow(e) {
	let div = e.target;
	const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    div.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
}