const menu = document.querySelector('#menu');
const menuBtn = document.querySelector('#menuBtn');
const serviceBtns = document.querySelector('.service__nav__buttons');
const serviceList = document.querySelector('.service__list');
const priceItems = document.querySelectorAll('.prices__accordion__item');
const contacts = document.querySelector('.contacts__select');
const contactsList = document.querySelector('.contacts__list');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('open');
  menuBtn.classList.toggle('open');
});

menu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
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

priceItems.forEach((item) =>
  item.addEventListener('click', function (event) {
    priceItems.forEach((item) => {
      if (this === item && event.target.tagName !== 'A') {
        this.classList.toggle('open');
        return;
      }
      if (event.target.tagName !== 'A') {
        item.classList.remove('open');
      }
    });
  })
);
const info = [
  {
    0: 'Canandaigua, NY',
    1: '+1	585	393 0001',
    2: '151 Charlotte Street',
    3: '5853930001'
  },
  {
    0: 'New York City',
    1: '+1	212	456 0002',
    2: '9 East 91st Street',
    3: '2124560002'
  },
  {
    0: 'Yonkers, NY',
    1: '+1	914	678 0003',
    2: '511 Warburton Ave',
    3: '9146780003'
  },
  {
    0: 'Sherrill, NY',
    1: '+1	315	908 0004',
    2: '14 WEST Noyes BLVD',
    3: '3159080004'
  },
];

contacts.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName !== 'A' || target.classList.contains('.contacts__info')) {
    contactsList.classList.toggle('open');
  }
  if (target.tagName === 'LI') {
    const table = contacts.querySelectorAll('.data');
    const city = target.innerHTML;
    contactsList.classList.remove('open');
    contacts.querySelector('.selected .kek').innerHTML = city;
    contacts.querySelector('.contacts__info').classList.add('open');
    info.forEach((e) => {
      if (e[0] === city) {
        table.forEach((d, i) => i === 3 ? d.setAttribute("href", `tel:+1${e[i]}`) : d.innerHTML = e[i]);
      }
    });
  }
});

// console.log("✓ 1. Вёрстка валидная +10 \n✓ 2. Вёрстка семантическая +20\n✓ 3. Вёрстка соответствует макету +48\n✓ 4. Требования к css + 12\n✓ 5. Интерактивность, реализуемая через css +20\n Самоценка за задание: 110 баллов")
// console.log(
//   "✓ 1. Вёрстка соответствует макету. Ширина экрана 768px +24 \n✓ 2. Вёрстка соответствует макету. Ширина экрана 380px +24 \n✓ 3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15 \n✓ 5. На ширине экрана 380рх и меньше реализовано адаптивное меню +22 \n Самоценка за задание: 85 баллов"
// );
