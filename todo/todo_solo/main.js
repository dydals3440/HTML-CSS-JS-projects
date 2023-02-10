const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  // 입력값이 없으면 거기에 focus를 두고 그냥 return
  if (text === "") {
    input.focus();
    return;
  }
  // 2. 새로운 아이템을 만듭니다.
  const item = createItem(text);
  // 3. item container에 새로 만든 아이템을 추가합니다.
  items.appendChild(item);
  // 내가 입력한 값을 바로바로 확인할 수 있게(입력값이 많아져도)
  item.scrollIntoView({ block: "center" });
  // 4. input 초기화
  input.value = "";
  input.focus();
}

function createItem(text) {
  // <li class = "itemRows"></li>
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");

  // <div class="item"></div>
  const item = document.createElement("item");
  item.setAttribute("class", "item");

  // <span class="item__name">text</span> (즉, 아이템 추가)
  const name = document.createElement("span");
  name.setAttribute("class", "item__name");
  name.innerText = text;

  // 그 옆에는 삭제 버튼이 있어야함 계속. 그리고 버튼 클릭시 삭제되도록. itemRow를 비워버리면됨
  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "item__delete");
  delBtn.innerHTML = '<i class="fas far fa-trash-alt"></i>';
  delBtn.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  // 분리선
  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "item__divider");

  item.appendChild(name);
  item.appendChild(delBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});
