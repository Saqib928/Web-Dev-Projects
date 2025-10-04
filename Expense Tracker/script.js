let Item = document.getElementById("Description");
let Price = document.getElementById("Amount");
let Button = document.getElementById("submit");
let Type = document.getElementById("categories");
let TABLE = document.getElementById("table");

Button.addEventListener("click", add_expense);

const CLASS_NAMES = {
  Food: "food",
  Housing: "housing",
  Transportation: "transportation",
  Entertainment: "entertainment",
  Clothing: "clothing",
  Others: "others",
};

let expense_records = [];
if (localStorage.getItem("expense_records")) {
  expense_records = JSON.parse(localStorage.getItem("expense_records"));
  renderTable();
}
function add_expense(date = "NA", type = "NA", item = "NA", amount = "NA") {
  if (!Item.value || !Price.value) {
    alert("Please fill in all fields");
    return;
  }
  let Date_Object = new Date();
  let DATE = Date_Object.toLocaleString("en-IN", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  date = DATE;
  type = Type.value;
  item = Item.value;
  amount = Price.value;

  let class_name = CLASS_NAMES[type];

  expense_records.push({ item, type, date, amount, class_name });
  updateLocalStorage();
  renderTable();

  Item.value = "";
  Price.value = "";
}
function delete_expense(index) {
  expense_records.splice(index, 1);
  updateLocalStorage();
  renderTable();
}
function renderTable() {
  TABLE.innerHTML = `<tr>
        <th>Date</th>
        <th>Item</th>
        <th>Categories</th>
        <th>Amount</th>
        <th>Action</th>
    </tr>`;
  expense_records.forEach((expense, index) => {
    let color_code = expense.class_name;

    TABLE.innerHTML += `
                        <tr>
                        <td class="${color_code}">${expense.date}</td>
                        <td class="${color_code}">${expense.item}</td>
                        <td class="${color_code}">${expense.type}</td>
                        <td class="${color_code}">${expense.amount}</td>
                        <td class="${color_code}"><button onclick='delete_expense(${index})'>Delete</button></td>
                        </tr>
        `;
  });
}
function updateLocalStorage() {
  localStorage.setItem("expense_records", JSON.stringify(expense_records));
}

