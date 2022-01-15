const income = () => {

  const qs = selector => document.querySelector(selector);
  const cel = el => document.createElement(el);

  const btnAddIncome = qs('#incomeBtn');

  const addIncomeItem = () => {
    let incomeName = qs('#incomeName').value;
    let incomeAmount = qs('#incomeAmount').value;
    const list = qs('.income__list');
    list.appendChild(cel('li')).innerText = `${incomeName} ${incomeAmount}`;
  };

  const addBtns = () => {
    const aside = qs('.income__btns');
    const div = cel('div');

    const btnEdit = cel('button');
    btnEdit.innerText = 'Edytuj';
    div.appendChild(btnEdit);
    aside.appendChild(div);

    const btnDelete = cel('button');
    btnDelete.innerText = 'Usuń';
    div.appendChild(btnDelete);
    aside.appendChild(div);
  };

  btnAddIncome.addEventListener('click', () => {
    addIncomeItem();
    addBtns();
  });
};

income();
