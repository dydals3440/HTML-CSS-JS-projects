const target = document.querySelector(".target");
const coordinate = document.querySelector(".coordinate");
document.addEventListener("mousemove", (event) => {
  targetX = event.clientX - 50;
  targetY = event.clientY - 50;
  target.style.left = targetX + "px";
  target.style.top = targetY + "px";
  coordinate.style.left = targetX + 60 + "px";
  coordinate.style.top = targetY + 70 + "px";
  coordinate.innerHTML = `${targetX}px, ${targetY}px`;
});

const vertical = document.querySelector(".vertical");

document.addEventListener("mousemove", (event) => {
  verticalX = event.clientX;
  vertical.style.left = verticalX + "px";
});

const horizontal = document.querySelector(".horizontal");

document.addEventListener("mousemove", (event) => {
  horizontalY = event.clientY - 10;
  horizontal.style.top = horizontalY + "px";
});
