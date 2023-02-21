"use strict";

const CARROT_SIZE = 80;
const GAME_DURATION_SEC = 5;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const popUp = document.querySelector(".pop-up");
const popUpBtn = document.querySelector(".pop-up__refresh");
const popUpMessage = document.querySelector(".pop-up__message");

let started = false;
let timer = undefined;
let score = 0;

function initGame() {
  addItem("carrot", CARROT_COUNT, "./img/carrot.png");
  addItem("bug", BUG_COUNT, "./img/bug.png");
}

gameBtn.addEventListener("click", () => {
  if (started) {
    gameStop();
  } else {
    gameStart();
  }
  started = !started; // 이처리를 해줘야지 시작했으면 => 다시 시작했다고 변경해주어야함
});

function gameStart() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  showPopUpAndText();
}

function gameStop() {}

function showStopButton() {
  const icon = document.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}
function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTime = GAME_DURATION_SEC;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      // 타이머 종료 후 더이상 진행되지 않게 return
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpAndText() {
  popUp.style.visibility = "visible";
  popUpMessage.innerText = "regame?";
}

// 아이템을 추가
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  // 당근 사이즈만큼 당겨서 지정을함 왜냐하면 x,y기준은 왼쪽 모서리가 기준이기때문임.
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  // 랜덤하게 배치 ㄱㄱ 그러나 count 만큼 반복해야하므로 반복문 ㄱ
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    // 서로서로 어디있든지 상관없이 우리가 지정하는 포지션에 맞게 배치
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

initGame();
