const grid = document.querySelector('.grid');
const div = document.querySelectorAll('.box');

let gridSize = (16 * 16);


// function to create a grid box. Runs at time of open. 
createDivs(gridSize)

function createDivs(gridSize) {
	let i = 0;
	do {
		const div = document.createElement('div');
		div.classList.add('box');
		grid.appendChild(div);
		i++
	} while (i < gridSize);
}


// hover over is not wokring
function addHoverStyle() {
	div.classList.add('hovered');
}


