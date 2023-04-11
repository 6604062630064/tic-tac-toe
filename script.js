const gameBoard = (() => {
	// declare an 2-d array that stores x's and o's, if a cell is empty, it is undefined.
	let _table = [...Array(3)].map((e) => Array(3).fill());

	const insert = (position, team) => {
		let row = Math.floor(position / 3);
		let column = position % 3;
		_table[row][column] = team;
	};

	const getTable = () => {
		return _table;
	};

	const isEmpty = (position) => {
		let row = Math.floor(position / 3);
		let column = position % 3;
		return _table[row][column] === undefined;
	};

	const getValue = (position) => {
		let row = Math.floor(position / 3);
		let column = position % 3;
		return _table[row][column];
	};

	const reset = () => {
		_table = [...Array(3)].map((e) => Array(3).fill());
	};
	return { insert, getTable, isEmpty, getValue, reset };
})();

const displayController = (() => {
	const update = () => {
		gameBoard.getTable().forEach((j, i) => {
			j.forEach((k, ii) => {
				// convert an index in array to an index in DOM
				let value = gameBoard.getTable()[i][ii];
				let index = i * 3 + ii;
				let insertion = document.createElement("h2");
				boardGame.item(index).innerHTML = "";
				if (value === undefined) {
					// stop if the cell is empty
					return;
				}

				insertion.innerHTML = value === "O" ? "O" : "X";
				boardGame.item(index).appendChild(insertion);
			});
		});
	};

	const displayWinner = (winner) => {
		alert(`${winner} wins!`);
	};

	const disableClicking = () => {
		grid.classList.add("noClick");
	};

	const enableClicking = () => {
		grid.classList.remove("noClick");
	};
	return { update, displayWinner, disableClicking, enableClicking };
})();

const gameLogic = (() => {
	let lastRoundTeam = "O";
	const checkWinCondition = () => {
		// Check if all values in an array is the same
		function checkDiag() {
			return (
				allEqual(leftDiag.map((e) => gameBoard.getValue(e))) ||
				allEqual(rightDiag.map((e) => gameBoard.getValue(e)))
			);
		}
		const allEqual = (arr) => arr.every((v) => v === arr[0] && v !== undefined);
		let newArr = gameBoard.getTable()[0].map((val, index) =>
			gameBoard
				.getTable()
				.map((row) => row[index])
				.reverse()
		);

		const leftDiag = [0, 4, 8];
		const rightDiag = [2, 4, 6];

		for (let i = 0; i < 3; i++) {
			if (
				allEqual(gameBoard.getTable()[i]) ||
				allEqual(newArr[i]) ||
				checkDiag()
			) {
				displayController.displayWinner(lastRoundTeam);
				displayController.disableClicking();
				break;
			}
		}
	};
	const play = (i) => {
		// Check if the cell is empty, then check if the last player is the same as the current player
		if (gameBoard.isEmpty(i)) {
			if (lastRoundTeam === "O") {
				PlayerX.play(i);
				lastRoundTeam = "X";
			} else {
				PlayerO.play(i);
				lastRoundTeam = "O";
			}
		} else {
			return;
		}

		displayController.update();
		checkWinCondition();
	};

	return { checkWinCondition, play };
})();

const Player = (team) => {
	const _team = team;
	const play = (position) => {
		gameBoard.insert(position, _team);
	};
	return { play };
};

const PlayerX = Player("X");
const PlayerO = Player("O");

const boardGame = document.querySelectorAll(".table > div");
const resetButton = document.querySelector("button");
const grid = document.querySelector(".table");

function onClick(i) {
	gameLogic.play(i);
}

boardGame.forEach((cell, i) => {
	cell.addEventListener("click", (e) => {
		gameLogic.play(i);
	});
});

resetButton.addEventListener("click", (e) => {
	gameBoard.reset();
	displayController.update();
	displayController.enableClicking();
});
