import { rupiah, updateTableData } from "./input";
import { loadTableData } from "./storage";

import DataTable from "datatables.net-bs5";
import "datatables.net-fixedheader-bs5";
import "datatables.net-responsive-bs5";

export const table = new DataTable("#main-table", {
  data: loadTableData(),
  responsive: true,
  fixedHeader: true,
  columns: [
    {
      render: (data) => {
        return data;;
      },
    },
    {
      render: (data) => {
        return rupiah.format(parseFloat(data));
      },
    },
    {
      render: (data, type, row, meta) => {
        return createEditButtons(data);
      },
    },
  ],
});

updateTableData();

function createEditButtons(data) {
  let container = document.createElement("div");
  container.innerHTML = data;
  container.setAttribute("class", "date-container");

  let containerBtn = document.createElement("div");
  containerBtn.setAttribute("class", "action-btn");

  let btnDelete = document.createElement("button");
  btnDelete.innerHTML = `<img src="https://s2.svgbox.net/hero-solid.svg?ic=backspace&color=dc3545" width="32" height="32">`;
  btnDelete.setAttribute("class", "mx-3 btn-delete");
  btnDelete.addEventListener("click", () => {
    table.row($(btnDelete).parents("tr")).remove().draw();
    updateTableData();
  });

  containerBtn.appendChild(btnDelete);
  container.appendChild(containerBtn);
  return container;
}
