import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

// helper function
const querySelector = (selector) => document.querySelector(selector);
const createElement = (elementName) => document.createElement(elementName);

// MODEL - application data
let incomes = [];
// let expenses = [];

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

    deleteBtn.addEventListener('click', () => {
      deleteIncome(id);
    });

    sum += parseInt(amount);

    editBtn.addEventListener('click', () => {
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

// const renderExpenses = () => {};

const renderApp = () => {
  renderIncomes();
};

// UPDATE (CONTROLER)
const addIncome = (newIncome) => {
  incomes = [...incomes, newIncome];
  renderApp();
};

const editIncome = (incomeId, name) => {
  incomes = incomes.map((income) =>
    income.id === incomeId ? { ...incomes, name } : income
  );

  renderApp();
};

const deleteIncome = (incomeId) => {
  incomes = incomes.filter(({ id }) => id !== incomeId);
  renderApp();
};

// Events
querySelector('.incomes__form').addEventListener('submit', (e) => {
  e.preventDefault();

  const { incomeName, incomeAmount } = e.currentTarget.elements;
  const incomeId = nanoid();

  const newIncome = {
    id: incomeId,
    name: incomeName.value,
    amount: incomeAmount.value,
  };

  addIncome(newIncome);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
});
