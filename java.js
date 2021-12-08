const section = document.querySelector('.section');
const container = document.querySelector('.container');
const div = document.querySelector('.box');
const buttonContainer = document.querySelector('.buttons');
const resetButton = document.querySelector('#clear');
const colorButtons = document.querySelector('#radio-buttons');

const MIN_WIDTH_PX = 350;
const MIN_HEIGHT_PX = 350;
const GRID_SIZE_DEFAULT = 25; // change starting cell
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
	// createButtons();
	createGrid(gridSize);
}

// function to create divs
function createGrid(gridSize) {
	container.style.width = gridWidthPx + 'px';
	container.style.height = gridWidthPx + 'px';
	let cellSize = getCellSizePx();
		let i = 0;
		do {
			const div = document.createElement('div');
			div.addEventListener('mouseover', colorChange);
			div.style.backgroundColor = 'rgba(255, 255, 255, 1)';
			div.style.width = cellSize + 'px';
			div.style.height = cellSize + 'px';
			div.dataset.darken = 0;
			container.appendChild(div).classList.add('box');
			i++;
		} while (i<(gridSize * gridSize));
}

// Clear Button
resetButton.addEventListener('click', removeCells);

//determine each box size in px
function getCellSizePx() {
	return gridWidthPx / gridSize;
}

//removes the color from grid and creates new divs
function removeCells() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
	createGrid(gridSize)
}

//Slider
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
	setCurrentSize(value);
	updateSizeValue(value);
	removeCells();
}
function updateSizeValue(value) {
	sizeValue.innerHTML = `${value} x ${value}`
  }

function setCurrentSize(newSize) {
	gridSize = newSize;
  }
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', function() {
	console.log(colorPicker.value);
})
colorPicker.value = '#ff6f61';

  // use buttons to change cell color. 
function colorChange(e) {
	let colorTheme = colorButtons.color.value;
	let div = e.target;
	switch (colorTheme) {
		case('rainbow'):
			currentColor = rainbow();
			div.style.backgroundColor = `rgba(${currentColor})`;
			break;
		case('blueRainbow'):
			currentColor = blueRainbow();
			div.style.backgroundColor = `rgba(${currentColor})`;
			break;
		case('redRainbow'):
			currentColor = redRainbow();
			div.style.backgroundColor = `rgba(${currentColor})`;
			break;
		case('greenRainbow'):
			currentColor = greenRainbow();
			div.style.backgroundColor = `rgba(${currentColor})`;
			break;
		case('darken'):
      		currentColor = darken(e);
      		div.style.backgroundColor = `rgba(${currentColor})`;
      		break;
		case('user'):
			currentColor = colorPicker.value;
			div.style.backgroundColor = `${currentColor}`;
			break;
		default:
			currentColor = [19, 123, 214, 0.95];
			div.style.backgroundColor = `rgba(${currentColor})`;
	}
}
colorButtons.color.value = 'default' //sets default color button to blue when page is loaded. 

function rainbow() {
	let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
	let alpha =  0.95;
	return [red, green, blue, alpha];
}
function blueRainbow() {
	let red = Math.floor(Math.random()*150);
  	let green = Math.floor(Math.random()*220);
  	let blue = (Math.floor(Math.random()*135)+120);
  	let alpha = (0.5*Math.random()+0.5);
	return [red, green, blue, alpha];
}
function redRainbow() {
	let red = (Math.floor(Math.random()*255)+100);
	let green = (Math.floor(Math.random()*100)+000);
	let blue = Math.floor(Math.random()*0);
	let alpha = (0.6*Math.random()+0.2);
	return [red, green, blue, alpha];
}
function greenRainbow() {
	let red = Math.floor(Math.random()*0);
	let green = (Math.floor(Math.random()*255)+150);
	let blue = (Math.floor(Math.random()*100));
	let alpha = (0.5*Math.random()+0.5);
	return [red, green, blue, alpha];
}
function blue() {
	let red = 19;
    let green = 123;
    let blue = 214;
	let alpha = 0.95;
	return [red, green, blue, alpha];
}
function darken(e) {
	let oldColor = e.target.style.backgroundColor;
	
	let rgbaString = (oldColor.charAt(3) == 'a') ? oldColor.slice(5, -1) : oldColor.slice(4, -1); 		 //checks whether backgroundColor is in rgba or rgb format
	let rgbaArray = rgbaString.split(',');
	
	let red = rgbaArray[0];
	let green = rgbaArray[1];
	let blue = rgbaArray[2];
	let alpha = rgbaArray[3];
	let currentDarkeningStep = e.target.dataset.darken;
	if(currentDarkeningStep == 9) return [0, 0, 0, 1]; //cell is already black
	currentDarkeningStep++;
	e.target.dataset.darken = currentDarkeningStep;
	let newRed = getDarkerColor(red, currentDarkeningStep);
	let newGreen = getDarkerColor(green, currentDarkeningStep);
	let newBlue = getDarkerColor(blue, currentDarkeningStep);
	return [newRed , newGreen, newBlue];
}
function getDarkerColor(color, currentDarkeningStep) {
	let increment;
	let newValue;

	increment = (1 - color) / (10 - currentDarkeningStep);
	newValue = parseFloat(color) + parseFloat(increment)
	return newValue;
	
}
