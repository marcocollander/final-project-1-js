
  const qs = selector => document.querySelector(selector);
  const cel = el => document.createElement(el);

  const btnAddIncome = qs('#incomeBtn');

  const incomeName = qs('#incomeName');
  const incomeAmount = qs('#incomeAmount');

  const addIncoment = () => {
    const list = qs('.income__list');
    list.appendChild(
      cel('li')
    ).innerText = `${incomeName.value} ${incomeAmount.value}`;

    const aside = qs('.income__btns');
    const div = cel('div');

    const btnEdit = cel('button');
    btnEdit.innerText = 'Edytuj';
    div.appendChild(btnEdit);
    aside.appendChild(div);

    btnEdit.addEventListener('click', () => {});

    const btnDelete = cel('button');
    btnDelete.innerText = 'Usuń';
    div.appendChild(btnDelete);
    aside.appendChild(div);

    btnDelete.addEventListener('click', () => {
      list.remove();
      btnDelete.remove();
      btnEdit.remove();
      incomeName.value = '';
      incomeAmount.value = '';
    });
  };

  btnAddIncome.addEventListener('click', () => {
    addIncoment();
  });

