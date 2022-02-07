// helper function
const querySelector = selector => document.querySelector(selector);

// MODEL - application data

const income = [
  {
    name: '',
    amount: '',
    sum: '',
  },
];

const expense = [
  {
    name: '',
    amount: '',
    sum: '',
  },
];

const availableAmout = {
  set amount(amount) {
    // ??
    this.amount = amount;
    this.amount = income[0].amount - expense[0].amount;
    //TODO
  },
};

const form = querySelector('.income__form');
const incomeList = querySelector('.income__list');
const boxOnButtons = querySelector('div.income__btns');

form.addEventListener('submit', e => {
  e.preventDefault();
  const elements = e.currentTarget.elements;
  incomeList.innerHTML = `<li>${elements[0].value} - ${elements[1].value}</li>`;
  boxOnButtons.innerHTML = `<button>Edytuj</button><button>Usuń</button>`;
});
