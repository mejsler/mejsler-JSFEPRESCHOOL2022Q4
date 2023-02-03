const menu = document.querySelector('#menu');
const menuBtn = document.querySelector('#menuBtn');
const serviceBtns = document.querySelector('.service__nav__buttons');
const serviceList = document.querySelector('.service__list');

menuBtn.addEventListener(
  'click',
  () => {
    menu.classList.toggle('open');
    menuBtn.classList.toggle('open');
  },
  false
);

menu.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'A') {
    menu.classList.remove('open');
    menuBtn.classList.remove('open');
  }
});

document.addEventListener('click', (event) => {
  const isClickInside = menu.contains(event.target);
  const isButton = menuBtn.contains(event.target);
  if (!isClickInside && !isButton) {
    menu.classList.remove('open');
    menuBtn.classList.remove('open');
  }
});

serviceBtns.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    let activeCount = serviceBtns.getElementsByClassName('active');
    if (activeCount.length < 2) {
      target.classList.toggle('active');
      serviceList.classList.toggle(`${target.id}`);
      serviceList.classList.add('active');
    } else {
      target.classList.remove('active');
      serviceList.classList.remove(`${target.id}`);
    }
    if (activeCount.length > 0) {
      serviceList.classList.add('active');
    } else {
      serviceList.classList.remove('active');
    }
  }
});

// console.log("✓ 1. Вёрстка валидная +10 \n✓ 2. Вёрстка семантическая +20\n✓ 3. Вёрстка соответствует макету +48\n✓ 4. Требования к css + 12\n✓ 5. Интерактивность, реализуемая через css +20\n Самоценка за задание: 110 баллов")
// console.log(
//   "✓ 1. Вёрстка соответствует макету. Ширина экрана 768px +24 \n✓ 2. Вёрстка соответствует макету. Ширина экрана 380px +24 \n✓ 3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15 \n✓ 5. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 \n Самоценка за задание: 85 баллов"
// );
