let controlForStartGame = document.querySelector(".control-button span"); // Select The Start Game Button
let userName = document.querySelector(".user-name h3 span");
controlForStartGame.onclick = function () {
  this.parentElement.style.display = "none"; // display Splash Screen
  let yourName = prompt("Whats Your Name ?"); // Prompt Window To Ask For Name
  // If Name Is Empty
  if (yourName == null || yourName == "") {
    userName.innerHTML = "unknown"; // Select The Start Game Button
  } else {
    userName.innerHTML = yourName; // Set Name To Your Name
  }
};
let duration = 1000;
let memoryGameBlocks = document.querySelector(".memory-game-blocks");
// Create Array From Game Blocks
let blocks = Array.from(memoryGameBlocks.children);
// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
blocks.forEach((eleBlock, index) => {
  // Add Css Order Property
  eleBlock.style.order = orderRange[index];
  // Add Click Event
  eleBlock.addEventListener("click", function () {
    // Trigger The Flip Function
    flipBlock(eleBlock);
  });
});
// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");
  // Collect All Flipped Cards
  let FinalFlippedBlock = blocks.filter((eleBlockFlip) =>
    eleBlockFlip.classList.contains("is-flipped")
  );
  // IF There Two Selected Blocks
  if (FinalFlippedBlock.length === 2) {
    // Stop Clicking Function
    stopClicking();
    // Check Matched Block Function
    checkBlock(FinalFlippedBlock[0], FinalFlippedBlock[1]);
  }
}
// Stop Clicking function
function stopClicking() {
  // Add Class No Clicking On Main Container
  memoryGameBlocks.classList.add("no-clicking");
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    memoryGameBlocks.classList.remove("no-clicking");
  }, duration);
}
// Check Matched Block
function checkBlock(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".info-content .tries span");
  if (firstBlock.dataset.animals === secondBlock.dataset.animals) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("win").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
  blocks.every(function (ele) {
    if (ele.classList.contains("has-match")) {
      document.getElementById("win").remove();
      setTimeout(() => document.getElementById("end-match").play(), 400);
    }
  });
}
// Shuffle Function
function shuffle(array) {
  // Setting Vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    // Decrease Length By One
    current--;
    // [1] Save Current Element in Stash
    temp = array[current];
    // [2] Current Element = Random Element
    array[current] = array[random];
    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}