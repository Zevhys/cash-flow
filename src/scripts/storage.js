import { table } from "./table";
const itemKey = "dataTable";

export function saveTableData() {
  localStorage.setItem(itemKey, JSON.stringify(table.rows().data().toArray()));
}

export function loadTableData() {
  if (localStorage.getItem(itemKey) !== null) {
    return JSON.parse(localStorage.getItem(itemKey));
  }
  return [];
}
