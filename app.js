const customInputEl = document.getElementById("custom__input");
const customBtnEl = document.getElementById("custom__btn");

const billInputEl = document.getElementById("bill__input");
const numOfPeopleEl = document.getElementById("num-of-people__input");

const amountPerson = document.getElementById("amount__person");
const tipPerson = document.getElementById("tip__person");

const peopleError = document.getElementById("people__error");

const buttons = document.querySelectorAll(".tip__btn");

const reset = document.getElementById("reset");

let tipValue = 5;
let bill = 0;
let people = 0;

const checkReset = function () {
  console.log(reset);

  if (!people || !bill) {
    reset.classList.add("reset-empty");
    reset.classList.remove('reset-filled');
  } else {  
    reset.classList.remove('reset-empty');
    reset.classList.add('reset-filled');

  }
};


const checkInput = function () {
  if (!people) {
    numOfPeopleEl.style.outline = "2px solid red";
    peopleError.classList.remove("hidden");
  } else {
    numOfPeopleEl.style.outline = "none";
    peopleError.classList.add("hidden");
  }
};

const calculateTotalPerson = function () {
  if (!bill || !people || !tipValue) {
    return;
  } else {
    const totalPerson = (Number(bill) + (bill * (tipValue / 100))) / people;
    amountPerson.textContent = `$${totalPerson.toFixed(2)}`;
  }
};

const calculateTipPerson = function () {
  if (!bill || !people || !tipValue) {
    return;
  } else {
    const tip = (bill / people) * (tipValue / 100);
    tipPerson.textContent = `$${tip.toFixed(2)}`;
  }
};

//-------------PROGRAM---------------

checkReset();
billInputEl.addEventListener("input", () => {
  bill = billInputEl.value;
  calculateTipPerson();
  calculateTotalPerson();
  checkInput();
  checkReset();
  
});

numOfPeopleEl.addEventListener("input", () => {
  people = numOfPeopleEl.value;
  console.log(people);
  checkInput();
  calculateTotalPerson();
  calculateTipPerson();
  checkReset();
});

reset.addEventListener("click", function () {
  billInputEl.value = '';
  numOfPeopleEl.value = '';
  amountPerson.textContent = `$0.00`;
  tipPerson.textContent = `$0.00`;
  reset.classList.remove('reset-filled');
  reset.classList.add('reset-empty');
  console.log(reset);
  tipValue = 5;
});

for (const btn of buttons) {
  btn.addEventListener("click", function () {
    tipValue = btn.id.slice(btn.id.indexOf("-") + 1);
    calculateTipPerson();
    calculateTotalPerson();
  });
}

customInputEl.addEventListener("input", function () {
  tipValue = customInputEl.value;
  calculateTotalPerson();
  calculateTipPerson();
});

//activar custom
customBtnEl.addEventListener("click", function () {
  customBtnEl.classList.add("hidden");
  customInputEl.classList.remove("hidden");
  customInputEl.style.outline = "2px solid var(--Green400)";
});
