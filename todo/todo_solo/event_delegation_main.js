const items = document.querySelector(".items");
const form = document.querySelector(".new-form");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

form.addEventListener("submit", (event) => {
  // 페이지가 자동으로 로딩이 되지 않게 해줌.
  event.preventDefault();
  onAdd();
});

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

let id = 0; // UUID
function createItem(text) {
  // <li class = "itemRows"></li>
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
        <div class="item">
            <span class = "item__name">${text}</span>
            <button class = "item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>`;
  id++;
  return itemRow;
}

// addBtn.addEventListener("click", () => {
//   onAdd();
// });

// input.addEventListener("keypress", (event) => {
//   if (event.isComposing) {
//     return;
//   }
//   if (event.key === "Enter") {
//     onAdd();
//   }
// });

items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
