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
  "✓ 1. Вёрстка валидная +10 \n✓ 2. Вёрстка семантическая +20\n✓ 3. Вёрстка соответствует макету +48\n✓ 4. Требования к css + 12\n✓ 5. Интерактивность, реализуемая через css +20\n Самоценка за задание: 110 баллов"
);
