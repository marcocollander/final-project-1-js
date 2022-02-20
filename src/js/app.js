import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

// helper function
const querySelector = (selector) => document.querySelector(selector);
const querySelectorAll = (selector) => document.querySelectorAll(selector);
const createElement = (elementName) => document.createElement(elementName);

// MODEL - application data
const state = { incomes: [], expenses: [] };

//VIEW

const editIncomeYes = (id, li, div) => {
  li.innerHTML = '';
  div.innerHTML = '';
  const inputName = createElement('input');
  const inputAmount = createElement('input');
  const btnConfirm = createElement('button');
  btnConfirm.innerText = 'Potwierdź';

  li.appendChild(inputName);
  li.appendChild(inputAmount);
  div.appendChild(btnConfirm);

  btnConfirm.addEventListener('click', () => {
    const newIncome = {
      id: id,
      name: inputName.value,
      amount: inputAmount.value,
      isEditable: false,
    };

    updateIncome(newIncome);
  });
};

function editIncomeNo() {}

const renderIncomes = () => {
  querySelector('.incomes__list').innerHTML = '';
  querySelector('.incomes__btns').innerHTML = '';
  let sum = 0;
  querySelector('#incomeSum').textContent = `${sum.toString()} zł`;

  state.incomes.forEach(({ id, name, amount, isEditable }) => {
    const li = createElement('li');
    const div = createElement('div');
    li.textContent = `${name} - ${amount} zł`;

    if (isEditable) {
      const btnYes = createElement('button');
      btnYes.innerText = 'Tak';
      btnYes.addEventListener('click', () => {
        editIncomeYes(id, li, div);
      });
      const btnNo = createElement('button');
      btnNo.innerText = 'Nie';
      btnNo.addEventListener('click', () => {
        editIncomeNo();
      });
      div.appendChild(btnYes);
      div.appendChild(btnNo);
    } else {
      const editBtn = createElement('button');
      editBtn.textContent = 'Edytuj';
      div.appendChild(editBtn);

      editBtn.addEventListener('click', () => {
        editIncome(id);
      });

      const deleteBtn = createElement('button');
      deleteBtn.textContent = 'Usuń';
      div.appendChild(deleteBtn);

      deleteBtn.addEventListener('click', () => {
        deleteIncome(id);
      });
    }
    sum += parseInt(amount);
    querySelector('.incomes__list').appendChild(li);
    querySelector('.incomes__btns').appendChild(div);

    querySelector('#incomeSum').textContent = `${sum.toString()} zł`;
    querySelector(
      '#message'
    ).value = `Możesz jeszcze wydać ${sum.toString()} zł`;
  });
};

const renderApp = () => {
  renderIncomes();
};

// UPDATE (CONTROLER)
const addIncome = (newIncome) => {
  state.incomes = [...state.incomes, newIncome];
  renderApp();
};

const editIncome = (incomeId) => {
  console.log(incomeId);
  state.incomes.map((income) => {
    if (income.id === incomeId) {
      income.isEditable = true;
    }
  });
  renderApp();
};

const updateIncome = (newIncome) => {
  state.incomes.map((income) => {
    if (income.id === newIncome.id) {
      income.isEditable = false;
      income.name = newIncome.name;
      income.amount = newIncome.amount;
    }
  });

  renderApp();
};

const deleteIncome = (incomeId) => {
  state.incomes = state.incomes.filter(({ id }) => id !== incomeId);
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
    isEditable: false,
  };

  addIncome(newIncome);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
});

let selector = '.incomes__btns > div > button:nth-child(1)';

if (querySelector(selector) !== null) {
  let btnsEdit = querySelectorAll(selector);
  console.log(btnsEdit);
}
