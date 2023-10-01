const balanceElement = document.getElementById("balance");
const minBetButton = document.querySelector(".bet-btn.min-bet");
const maxBetButton = document.querySelector(".bet-btn.max-bet");
const spinButton = document.querySelector(".spin-btn");
const resultElement = document.getElementById("result");

minBetButton.addEventListener("click", setMinBet);
maxBetButton.addEventListener("click", setMaxBet);
spinButton.addEventListener("click", spinReels);

let playerBalance = 1000;
let currentBet = 0;

let reels = document.querySelectorAll(".reel");

const emojis = ["🍒", "🍌", "🔔", "🫐", "🍋", "✖️", "🍊", "7️⃣", "🍉"];

function getRandomEmoji() {
	return emojis[Math.floor(Math.random() * emojis.length)];
}

function updateBalanceDisplay() {
	balanceElement.textContent = `Balance: $${playerBalance}`;

	if (playerBalance < 5) {
		minBetButton.remove();
	}

	if (playerBalance < 50) {
		maxBetButton.remove();
	}
}

function setMinBet() {
	currentBet = 5;
}

function setMaxBet() {
	currentBet = 50;
}

function playerLoses() {
	const reels = document.querySelectorAll(".reel");
	resultElement.innerText = "You Lost!";
	resultElement.style.color = "red";

	// this is reinitialized the original values of the array so that every time the function is called the array emojis are back to 9 and not 6 items
	// due to the splice method being run 3 times in the loop.
	let nonMatchingEmojis = [
		"🍒",
		"🍌",
		"🔔",
		"🫐",
		"🍋",
		"✖️",
		"🍊",
		"7️⃣",
		"🍉",
	];

	for (let i = 0; i < 3; i++) {
		const chosenIndex = Math.floor(Math.random() * nonMatchingEmojis.length);
		reels[i].textContent = nonMatchingEmojis[chosenIndex];

		// this method is removing the element from the array at the given index and only removing one element
		// so that when the loop runs again its not selecting the same element twice because it no longer exist in the array

		nonMatchingEmojis.splice(chosenIndex, 1);
	}

	playerBalance -= currentBet;
}

function spinReels() {
	if (currentBet === 0) {
		return (resultElement.innerText = "Please place a bet first!");
	}

	let probabilityOfWinning = 1 / 9;

	if (Math.random() < probabilityOfWinning) {
		// Player wins
		resultElement.innerText = "You Won!";
		resultElement.style.color = "green";

		let winningEmoji = getRandomEmoji();

		document.querySelector(".reel1").innerText = winningEmoji;
		document.querySelector(".reel2").innerText = winningEmoji;
		document.querySelector(".reel3").innerText = winningEmoji;

		if (currentBet === 5) {
			playerBalance += 100;
		} else if (currentBet === 50) {
			playerBalance += 500;
		}
	} else {
		// Player loses
		playerLoses();
	}

	currentBet = 0;
	updateBalanceDisplay();
}

updateBalanceDisplay();
