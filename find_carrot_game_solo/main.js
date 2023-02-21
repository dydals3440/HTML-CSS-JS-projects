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
  field.innerText = "";
  gameScore.innerHTML = CARROT_COUNT;
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

field.addEventListener("click", (e) => {
  // 시작되지 않았으면 리턴
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches(".carrot")) {
    target.remove();
    // 점수 증가
    score++;
    // 그 후 UI에 업데이트
    updateScore();
    // 1. 종료조건(당근을 다 먹었을때) => true
    if (score === CARROT_COUNT) {
      finishGame();
    }
  } else if (target.matches(".bug")) {
    // 2. 종료조건(벌레를 클릭했을때) =>
    stopGameTimer();
    finishGame(false);
  }
}); // finishgame을 true나 false로 정의하는 것은 사실 좋은 코드가 아니랍니다.

// 3. 종료조건 (타이머 끝날때)

popUpBtn.addEventListener("click", () => {
  // 게임 시작 => 팝업창 없앰 순서
  gameStart();
  hidePopUpAndText();
  showStopButton();
});

// 승패 여부를 인자로
function finishGame(win) {
  // 1. 게임이 끝났다는것은 종료했다는 의미
  started = false;
  // 2. gamebtn 안보이게
  hideGameButton();
  showPopUpAndText(win ? "YOU WIN" : "YOU LOST");
}

function gameStart() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function gameStop() {
  stopGameTimer();
  hideGameButton();
  showPopUpAndText("replay????");
}

function showStopButton() {
  const icon = document.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function updateScore() {
  gameScore.innerText = CARROT_COUNT - score;
}

function startGameTimer() {
  let remainingTime = GAME_DURATION_SEC;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      // 타이머 종료 후 더이상 진행되지 않게 return 게임 종료도 이루어져야함(3번 종료조건)
      clearInterval(timer);
      // 승패 여부는 당근을 다 못먹었냐로 정해짐
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpAndText(text) {
  // 아니면 나중에 pop-up--hide 달아놓고 나중에 remove ㄱㄱ
  popUp.style.visibility = "visible";
  popUpMessage.innerText = text;
}

function hidePopUpAndText(text) {
  popUp.style.visibility = "hidden";
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
