const income = () => {
  const qs = (selector) => document.querySelector(selector);
  const btnAddIncome = qs('#incomeBtn');

  const cel = (el) => document.createElement(el);


  const addIncomeItem = () => {
    let incomeName = qs('#incomeName').value;
    let incomeAmount = qs('#incomeAmount').value;
    const list = qs('.income__list');
    list.appendChild(cel('li')).innerText = `${incomeName} ${incomeAmount}`
  }

  btnAddIncome.addEventListener('click', () => {
    addIncomeItem();
  })



}

income();

