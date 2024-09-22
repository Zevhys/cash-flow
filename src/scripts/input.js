import { table } from "./table";
import { saveTableData } from "./storage";

export const rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const itemName = document.getElementById("item-name");
const itemAmount = document.getElementById("item-amount");
const itemDate = document.getElementById("item-date");
const toggleExpense = document.getElementById("toggle-expense");

const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const totalAllEl = document.getElementById("total-all");

let totalIncome = 0;
let totalExpense = 0;
let totalAll = 0;

document.getElementById("item-date").valueAsDate = new Date();

document.getElementById("transaction-form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  let amount = parseFloat(itemAmount.value);

  if (toggleExpense.checked) {
    amount *= -1;
  }

  table.row.add([itemName.value, amount, itemDate.value]).draw(false);

  updateTableData();
});

function updateTotal() {
  totalIncomeEl.textContent = rupiah.format(totalIncome);
  totalExpenseEl.textContent = rupiah.format(totalExpense);
  totalAllEl.textContent = rupiah.format(totalAll);
}

export function updateTableData() {
  let tableData = table.rows().data();
  totalIncome = 0;
  totalExpense = 0;

  for (let index = 0; index < tableData.length; index++) {
    const element = tableData[index];

    if (element[1] >= 0) {
      totalIncome += element[1];
    } else {
      totalExpense += element[1];
    }
  }

  totalAll = totalIncome + totalExpense;

  updateTotal();

  saveTableData();
}
