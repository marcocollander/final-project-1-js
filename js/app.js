import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
// helper function
const querySelector = selector => document.querySelector(selector);

// MODEL - application data
let income = [];

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
const renderIncome = () => {
  querySelector('.income__list').innerHTML = income.map(
    ({ name, amount }) => `<li>${name} - ${amount} zł</li>`.join(',')
  );

  // querySelector('.income__btns').innerHTML = `<button>Edytuj</button><button>Usuń</button>`;
};

const renderExpenses = () => { };

const renderApp = () => {
  renderIncome();
  renderExpenses();
};

// UPDATE (CONTROLER)
const addIncome = newIncome => {
  income = [...income, newIncome]
  renderApp();
};


// Events
querySelector('.income__form').addEventListener('submit', e => {
  e.preventDefault();

  const { incomeName, incomeAmount } = e.currentTarget.elements;
  const incomeId = nanoid();

  const income = {
    id: incomeId,
    name: incomeName.value,
    amount: incomeAmount.value
  }

  addIncome(income);
});

// renderApp();
