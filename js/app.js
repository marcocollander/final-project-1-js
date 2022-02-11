import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
// helper function
const querySelector = selector => document.querySelector(selector);

// MODEL - application data
let income = [
  {
    id: 'some-uuid-should-be-here',
    name: '',
    amount: '',
    sum: '',
  },
];

const expenses = [
  {
    id: 'some-uuid-should-be-here',
    name: '',
    amount: '',
    sum: '',
  },
];

let availableAmount = income[0].amount - expenses[0].amount;

// VIEW
const renderIncome = () => {
  const boxOnButtons = querySelector('.income__btns');

  querySelector('.income__list').innerHTML = income.map(
    ({ name, amount }) => `<li>${name} - ${amount} zł</li>`
  );

  querySelector(
    '.income__btns'
  ).innerHTML = `<button>Edytuj</button><button>Usuń</button>`;
};

const renderExpenses = () => {};

const renderApp = () => {
  renderIncome();
  renderExpenses();
};

// UPDATE (CONTROLER)
const addIncome = income => {
  renderApp();
};

// Events
querySelector('.income__form').addEventListener('submit', e => {
  e.preventDefault();
  const { incomeName, incomeAmount } = e.currentTarget.elements;
  const incomeId = incomeName.dataset.id;

  addIncome(incomeId, incomeName.value, incomeAmount.value);
});

// renderApp();
