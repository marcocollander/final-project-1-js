import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
// helper function
const querySelector = selector => document.querySelector(selector);

// MODEL - application data
let incomes = [];
let sum = 0;

const expenses = [
  {
    id: 'some-uuid-should-be-here',
    name: '',
    amount: '',
    sum: '',
  },
];

// let availableAmount = income[0].amount - expenses[0].amount;

// VIEW
const renderIncomes = () => {
  querySelector('.income__list').innerHTML = incomes
    .map(
      ({ name, amount }) =>
        `<li><span>${name} - ${amount} zł</span><span><button>Edytuj</button><button>Usuń</button></span></li>`
    )
    .join(' ');

  querySelector('#incomeSum').innerHTML = sum.toString();
};

const renderExpenses = () => {};

const renderApp = () => {
  renderIncomes();
};

// UPDATE (CONTROLER)
const addIncome = newIncome => {
  console.log(incomes);
  incomes = [...incomes, newIncome];
  console.log(incomes);
  incomes.forEach(income => {
    sum += parseInt(income.amount);
  });
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

  console.log(newIncome);

  addIncome(newIncome);
});

// renderApp();
