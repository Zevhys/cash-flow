// import jQuery from "jquery";
// import jszip from "jszip";
// import pdfmake from "pdfmake";

import DataTable from "datatables.net-bs5";

import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-fixedheader-bs5";
import "datatables.net-responsive-bs5";

function addNewRow() {
  table.row.add([1, 2, 3]).draw(false);

  counter++;
}

const table = new DataTable("#main-table");
let counter = 1;

document.querySelector("#addRow").addEventListener("click", addNewRow);

addNewRow();
