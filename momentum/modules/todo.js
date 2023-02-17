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
  counter.textContent = `Done ${count} / ${len}`;
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
  } else  if (target.tagName === 'DIV') {
    target.parentElement.remove();
    total();
  }
});

input.addEventListener('change', () => {
  newTodo();
  total();
});
