const income = () => {
  const btnAddIncome = document.querySelector('#incomeBtn');
  const incomeName = document.querySelector('#incomeName');
  const incomeAmount = document.querySelector('#incomeAmount');

  btnAddIncome.addEventListener('click', () => {
    console.log(incomeName.value);
    console.log(incomeAmount.value);
  })

}

income();

