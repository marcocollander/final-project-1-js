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

// INCOMES;
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

const renderSumBudget = (selector) => {
  let sumBudget = 0;

  if (selector === '#sumIncomes') {
    sumBudget = sum(state.incomes);
    querySelector(selector).innerText = `${sumBudget} zł`;
  } else if (selector === '#sumExpenses') {
    sumBudget = sum(state.expenses);
    querySelector('#sumExpenses').innerText = `${sumBudget} zł`;
  }

  return sumBudget;
};

const renderSaldo = () => {
  let saldo = renderSumBudget('#sumIncomes') - renderSumBudget('#sumExpenses');
  if (saldo > 0) {
    querySelector('#message').innerText = `Możesz jeszcze wydać ${saldo} zł`;
  } else if (saldo === 0) {
    querySelector('#message').innerText = `Bilans wynosi ${saldo} zł`;
  } else {
    querySelector(
      '#message'
    ).innerText = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(saldo)} zł`;
  }
};

const renderApp = () => {
  renderIncomes();
  renderExpenses();
  renderSaldo();
};

// UPDATE (CONTROLER)
const addBudgetItem = (budgeItem, state) => {
  if (budgeItem.budgetItemId === 'incomes') {
    state.incomes = [...state.incomes, budgeItem];
  } else if (budgeItem.budgetItemId === 'expenses') {
    state.expenses = [...state.expenses, budgeItem];
  }
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
    budgetItemId: 'incomes',
    name: incomeName.value,
    amount: incomeAmount.value,
    isEditable: false,
  };

  addBudgetItem(newIncome, state);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
});

const updateExpense = (id) => {
  const inputs = querySelectorAll('.expenses__list input');
  const newName = inputs[0].value;
  const newAmount = inputs[1].value;
  state.expenses = state.expenses.map((expense) =>
    expense.id === id
      ? { ...expense, name: newName, amount: newAmount, isEditable: false }
      : expense
  );

  renderApp();
};

const toggleExpenseEditable = (id) => {
  state.expenses = state.expenses.map((expense) =>
    expense.id === id
      ? { ...expense, isEditable: !expense.isEditable }
      : expense
  );
  renderApp();
};

const deleteExpense = (expenseId) => {
  state.expenses = state.expenses.filter(({ id }) => id !== expenseId);
  renderApp();
};

// EXPENSES
const renderExpenses = () => {
  querySelector('.expenses__list').innerHTML = '';
  querySelector('.expenses__btns').innerHTML = '';

  state.expenses.forEach(({ id, name, amount, isEditable }) => {
    const li = createElement('li');
    const div = createElement('div');
    li.textContent = `${name} - ${amount} zł`;

    if (isEditable) {
      li.innerHTML = '';

      createInput(li, name, amount);
      createBtn(div, 'Tak', updateExpense, id);
      createBtn(div, 'Nie', toggleExpenseEditable, id);
    } else {
      createBtn(div, 'Edytuj', toggleExpenseEditable, id);
      createBtn(div, 'Usuń', deleteExpense, id);
    }
    querySelector('.expenses__list').appendChild(li);
    querySelector('.expenses__btns').appendChild(div);
  });
};

//Events
querySelector('.expenses__form').addEventListener('submit', (e) => {
  e.preventDefault();

  const { expenseName, expenseAmount } = e.currentTarget.elements;
  const expenseId = nanoid();

  const newExpense = {
    id: expenseId,
    budgetItemId: 'expenses',
    name: expenseName.value,
    amount: expenseAmount.value,
    isEditable: false,
  };

  addBudgetItem(newExpense, state);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
});
