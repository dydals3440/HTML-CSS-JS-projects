const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

// window가 load가 되면 (파일이 모두 준비되면) 이래야 getBounding
// 좌표가 제대로 찍힘
addEventListener("load", () => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    //   left와 top을 이용하지 않음 (transform 사용시)
    vertical.style.transform = `translateX(${x}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px, ${
      y - targetHalfHeight
    }px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;
    tag.innerHTML = `translate(${x}px, ${y}px)`;
    //   vertical.style.left = `${x}px`;
    //   horizontal.style.top = `${y}px`;
    //   target.style.left = `${x}px`;
    //   target.style.top = `${y}px`;
    //   tag.style.left = `${x}px`;
    //   tag.style.top = `${y}px`;
    //   tag.innerHTML = `${x}px, ${y}px`;
  });
});
