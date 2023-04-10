const gameBoard = (() => {
	// declare an 2-d array that stores x's and o's, if a cell is empty, it is undefined.
	let _table = [...Array(3)].map((e) => Array(3).fill());

	const insert = (row, column, xOrO) => {
		_table[row][column] = xOrO;
	};

	const getTable = () => {
		return _table;
	};
	return { insert, getTable };
})();

function update() {
	gameBoard.getTable().forEach((j, i) => {
		j.forEach((k, ii) => {
			// convert an index in array to an index in DOM
			let value = gameBoard.getTable()[i][ii];
			let index = i * 3 + ii;
			let insertion = document.createElement("h2");

			if (value === undefined) {
				// stop if the cell is empty
				return;
			}

			insertion.innerHTML = value === "O" ? "O" : "X";
			boardGame.item(index).appendChild(insertion);
		});
	});
}

const boardGame = document.querySelectorAll(".table > div");
update();
