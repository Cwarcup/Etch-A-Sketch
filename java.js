const container = document.querySelector('.container');
const grid = document.querySelector('.grid');
const btnBlack  = document.querySelector('button');
const btnRGB = document.querySelector('button');
const btnGrey = document.querySelector('button');
const btnSize = document.querySelector('button')
const buttonContainer = document.querySelector('buttons');


// function to create divs
function createDivs(col, rows) {
		let i = 0;
		do {
			const div = document.createElement('div');
			div.addEventListener('mouseover', updateCell);
			div.style.backgroundColor ='rgb(255, 255, 255, 0)';
			container.appendChild(div).classList.add('box');
			i++;
		} while (i < (col * rows));
}

createDivs(16,16)

function updateCell(e) {
	let div = e.target;
	div.style.backgroundColor = "red";

}

