import DataTable from "datatables.net-bs5";
import { table } from "./table";

export const rupiah = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const itemName = document.getElementById("item-name");
const itemAmount = document.getElementById("item-amount");
const itemDate = document.getElementById("item-date");
// const toggleIncome = document.getElementById("toggle-income");
const toggleExpense = document.getElementById("toggle-expense");

document.getElementById("item-date").valueAsDate = new Date();

document.getElementById("addRow").addEventListener("click", () => {
  let amount = parseFloat(itemAmount.value);

  if (toggleExpense.checked) {
    amount *= -1;
  }

  // console.log(" Item name: ", itemName.value);
  // console.log(" Item amount: ", amount);
  // console.log(" Item date: ", itemDate.value);

  table.row.add([itemName.value, amount, itemDate.value]).draw(false);

  // console.log(table.length);
  // console.log(table.data()[0]);
  console.log(table.rows().data());
});
