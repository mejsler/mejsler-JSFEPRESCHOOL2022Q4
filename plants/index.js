const menu = document.querySelector("#menu");
const menuBtn = document.querySelector("#menuBtn");

menuBtn.addEventListener(
  "click",
  () => {
    menu.classList.toggle("open");
    menuBtn.classList.toggle("open");
  },
  false
);

menu.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "A") {
    menu.classList.remove("open");
    menuBtn.classList.remove("open");
  }
});

document.addEventListener("click", (event) => {
  const isClickInside = menu.contains(event.target);
  const isButton = menuBtn.contains(event.target);
  if (!isClickInside && !isButton) {
    menu.classList.remove("open");
    menuBtn.classList.remove("open");
  }
});

console.log(
  "✓ 1. Вёрстка соответствует макету. Ширина экрана 768px +24 \n✓ 2. Вёрстка соответствует макету. Ширина экрана 380px +24 \n✓ 3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15 \n✓ 5. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 \n Самоценка за задание: 85 баллов"
);
