// import jQuery from "jquery";

import { rupiah } from "./input";
import DataTable from "datatables.net-bs5";

import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-fixedheader-bs5";
import "datatables.net-responsive-bs5";

export const table = new DataTable("#main-table", {
  responsive: true,
  fixedHeader: true,
  columns: [
    {
      render: (data) => {
        return data;
      },
    },
    {
      render: (data) => {
        return rupiah.format(parseFloat(data));
      },
    },
    {
      render: (data, type, row, meta) => {
        // console.log("-".repeat(80), meta);

        return createEditButtons(data);
      },
    },
  ],
});

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
  });

  containerBtn.appendChild(btnDelete);
  container.appendChild(containerBtn);
  return container;
}
