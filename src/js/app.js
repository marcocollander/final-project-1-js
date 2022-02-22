import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

// helper function
const querySelector = (selector) => document.querySelector(selector);
const querySelectorAll = (selector) => document.querySelectorAll(selector);
const createElement = (elementName) => document.createElement(elementName);

// MODEL - application data
const state = { incomes: [], expenses: [] };

//VIEW
const createBtn = (parentElement, textContent, callback, id) => {
  const btn = createElement('button');
  btn.textContent = textContent;
  parentElement.appendChild(btn);
  btn.addEventListener('click', () => callback(id));
};

const createInput = (parentElem, valueName, valueAmount) => {
  const inputName = createElement('input');
  const inputAmount = createElement('input');
  parentElem.appendChild(inputName);
  parentElem.appendChild(inputAmount);
  inputName.value = `${valueName}`;
  inputAmount.value = `${valueAmount}`;
};

// INCOMES

const renderIncomes = () => {
  querySelector('.incomes__list').innerHTML = '';
  querySelector('.incomes__btns').innerHTML = '';

  state.incomes.forEach(({ id, name, amount, isEditable }) => {
    const li = createElement('li');
    const div = createElement('div');
    li.textContent = `${name} - ${amount} zł`;

    if (isEditable) {
      li.innerHTML = '';

      createInput(li, name, amount);
      createBtn(div, 'Tak', updateIncome, id);
      createBtn(div, 'Nie', toggleIncomeEditable, id);
    } else {
      createBtn(div, 'Edytuj', toggleIncomeEditable, id);
      createBtn(div, 'Usuń', deleteIncome, id);
    }
    querySelector('.incomes__list').appendChild(li);
    querySelector('.incomes__btns').appendChild(div);
  });
};

const renderSumIncomes = () => {
  const refSumIncomes = querySelector('#sumIncomes');
  let sumIncomes = sum(state.incomes);

  refSumIncomes.innerText = `${sumIncomes} zł`;
  querySelector('#message').value = `Możesz jeszcze wydać ${sumIncomes} zł`;
};

const renderApp = () => {
  renderIncomes();
  renderSumIncomes();
};

// UPDATE (CONTROLER)
const addIncome = (newIncome) => {
  state.incomes = [...state.incomes, newIncome];
  renderApp();
};

const toggleIncomeEditable = (id) => {
  state.incomes = state.incomes.map((income) =>
    income.id === id ? { ...income, isEditable: !income.isEditable } : income
  );
  renderApp();
};

const updateIncome = (id) => {
  const inputs = querySelectorAll('.incomes__list input');
  const newName = inputs[0].value;
  const newAmount = inputs[1].value;
  state.incomes = state.incomes.map((income) =>
    income.id === id
      ? { ...income, name: newName, amount: newAmount, isEditable: false }
      : income
  );

  renderApp();
};

const deleteIncome = (incomeId) => {
  state.incomes = state.incomes.filter(({ id }) => id !== incomeId);
  renderApp();
};

const sum = (incomes) =>
  incomes.reduce((acc, income) => acc + Number(income.amount), 0);

// Events
querySelector('.incomes__form').addEventListener('submit', (e) => {
  e.preventDefault();

  const { incomeName, incomeAmount } = e.currentTarget.elements;
  const incomeId = nanoid();
  const newIncome = {
    id: incomeId,
    name: incomeName.value,
    amount: incomeAmount.value,
    isEdiable: false,
  };

  addIncome(newIncome);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
});

// EXPENSES
