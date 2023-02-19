const todo = document.querySelector('.todo'),
  input = todo.querySelector('.todo-input'),
  button = todo.querySelector('.todo-button'),
  list = todo.querySelector('.todo-list'),
  counter = todo.querySelector('.todo-count');

const newTodo = () => {
  const span = document.createElement('span'),
    li = document.createElement('li'),
    checkbox = document.createElement('input'),
    close = document.createElement('div');

  checkbox.setAttribute('type', 'checkbox');
  span.textContent = input.value;
  li.appendChild(checkbox);
  li.appendChild(span);
  list.appendChild(li).appendChild(close);
  input.value = '';
};

const total = () => {
  let count = 0;
  let len = list.children.length;
  for (let i = 0; i < len; i++) {
    if (list.children[i].children[0].checked) count++;
  }
  counter.textContent = `${count} / ${len}`;
  count = 0;
};

todo.addEventListener('click', (event) => {
  if (event.target === button && input.value) {
    newTodo();
    total();
  }
});

list.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === 'INPUT') {
    total();
  } else if (target.tagName === 'DIV') {
    localStorage.removeItem(`todo^${target.previousElementSibling.textContent}`);
    target.parentElement.remove();
    total();
  }
});

input.addEventListener('change', () => {
  newTodo();
  total();
});

const setLocalStorageTodo = () => {
  if (list.children.length > 0) {
    for (let i = 0; i < list.children.length; i++) {
      const todos = [];
      todos.push([
        `todo^${list.children[i].children[1].innerText}`,
        `${list.children[i].children[0].checked}`,
      ]);
      todos.forEach((e) => {
        localStorage.setItem(e[0], e[1]);
      });
    }
  }
};
const restoreTodo = (name, value) => {
  const span = document.createElement('span'),
    li = document.createElement('li'),
    checkbox = document.createElement('input'),
    close = document.createElement('div');
  checkbox.setAttribute('type', 'checkbox');
  if (value === 'true') {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
  span.textContent = name;
  li.appendChild(checkbox);
  li.appendChild(span);
  list.appendChild(li).appendChild(close);
};

const getLocalStorageTodo = () => {
  const storage = { ...localStorage };
  const storageArr = Object.keys(storage).map((key) => [key, storage[key]]);
  let kek = storageArr
    .filter((e) => e[0].startsWith('todo^'))
    .map((e) => [e[0].slice(5), e[1]]);
  kek.forEach((e) => restoreTodo(e[0], e[1]));
  total();
};

window.addEventListener('load', getLocalStorageTodo);
window.addEventListener('beforeunload', setLocalStorageTodo);
