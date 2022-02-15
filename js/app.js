import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

// helper function
const querySelector = selector => document.querySelector(selector);
const createElement = elementName => document.createElement(elementName);

// MODEL - application data
let incomes = [];
let expenses = [];

// VIEW
const renderIncomes = () => {
  querySelector('.incomes__list').innerHTML = '';
  querySelector('.incomes__btns').innerHTML = '';
  let sum = 0;
  querySelector('#incomeSum').textContent = `${sum.toString()} zł`;

  incomes.forEach(({ id, name, amount }) => {
    const li = createElement('li');
    const div = createElement('div');

    li.textContent = `${name} - ${amount} zł`;


    const editBtn = createElement('button');
    editBtn.textContent = 'Edytuj';
    div.appendChild(editBtn);

    const deleteBtn = createElement('button');
    deleteBtn.textContent = 'Usuń';
    div.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', e => {
      deleteIncome(id);
    });

    sum += parseInt(amount);

    editBtn.addEventListener('click', e => {
      editIncome(id);
    });

    querySelector('.incomes__list').appendChild(li);
    querySelector('.incomes__btns').appendChild(div);

    querySelector('#incomeSum').textContent = `${sum.toString()} zł`;
    querySelector(
      '#message'
    ).value = `Możesz jeszcze wydać ${sum.toString()} zł`;
  });
};

const renderExpenses = () => { };

const renderApp = () => {
  renderIncomes();
};

// UPDATE (CONTROLER)
const addIncome = newIncome => {
  let sum = 0;
  console.log(incomes);
  incomes = [...incomes, newIncome];
  console.log(incomes);
  renderApp();
};

const editIncome = incomeId => { };

const deleteIncome = incomeId => {
  incomes = incomes.filter(({ id }) => id !== incomeId);
  console.log(incomes);
  renderApp();
};
// Events
querySelector('.incomes__form').addEventListener('submit', e => {
  e.preventDefault();

  const { incomeName, incomeAmount } = e.currentTarget.elements;
  const incomeId = nanoid();

  const newIncome = {
    id: incomeId,
    name: incomeName.value,
    amount: incomeAmount.value,
  };

  addIncome(newIncome);
});
