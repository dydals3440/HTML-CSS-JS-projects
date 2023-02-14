"use strict";

// function init() 활용해 당근과 벌레 5개 랜덤위치 생성
const game__button = document.querySelector(".game__button");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;

function initGame() {
  console.log(fieldRect);
  addItem("carrot", 5, "./img/carrot.png");
  addItem("bug", 5, "./img/bug.png");
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
