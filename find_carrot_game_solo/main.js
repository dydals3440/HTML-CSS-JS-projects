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

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugPullSound = new Audio("./sound/bug_pull.mp3");
const gameWinSound = new Audio("./sound/game_win.mp3");

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
    playSound(carrotSound);
    // 그 후 UI에 업데이트
    updateScore();
    // 1. 종료조건(당근을 다 먹었을때) => true
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    // 2. 종료조건(벌레를 클릭했을때) =>
    finishGame(false);
  }
}); // finishgame을 true나 false로 정의하는 것은 사실 좋은 코드가 아니랍니다.

function playSound(sound) {
  // 소리 파일이 짧기에 당근을 연달아 누르면 소리가 안날 수도 있으니 항상 초기화
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}

// 3. 종료조건 (타이머 끝날때)

popUpBtn.addEventListener("click", () => {
  // 게임 시작 => 팝업창 없앰 순서
  gameStart();
  hidePopUpAndText();
});

// 승패 여부를 인자로
function finishGame(win) {
  // 1. 게임이 끝났다는것은 종료했다는 의미
  started = false;
  // 2. gamebtn 안보이게
  hideGameButton();
  if (win) {
    playSound(gameWinSound);
  } else {
    playSound(bugPullSound);
  }
  // 게임을 승리해도 background sound 제거
  pauseSound(bgSound);
  // 게임을 끝내기 전에는 항상 타이머를 종료해주기.
  stopGameTimer();
  showPopUpAndText(win ? "YOU WIN" : "YOU LOST");
}

function gameStart() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  // 게임시작시 배경음악
  playSound(bgSound);
}

function gameStop() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpAndText("replay????");
  pauseSound(bgSound);
}

function showStopButton() {
  const icon = document.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
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
