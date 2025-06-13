let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
console.log(title, price, taxes, ads, discount, total, count, category, submit);
// Calculate total price
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}





// Create product



let dataPro;
if(localStorage.products != null) {
    dataPro = JSON.parse(localStorage.getItem("products"));
} else {
    dataPro = [];
}



submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discount: +discount.value,
        total: total.innerHTML,
        count: +count.value,
        category: category.value.toLowerCase()
    };
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    }else {
        dataPro.push(newPro);
    }
    localStorage.setItem("products", JSON.stringify(dataPro));

    console.log(dataPro);
    clearData();
    showData();
};

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function showData() {
    let table = "";
    // Update product count beside delete all button
    const productCountSpan = document.getElementById("productCount");
    if (productCountSpan) {
        productCountSpan.textContent = dataPro.length > 0 ? `(${dataPro.length})` : "(0)";
    }
    if (dataPro.length === 0) {
        document.getElementById("tbody").innerHTML = "";
        return;
    }
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
}
showData();




function deleteData(index) {
    dataPro.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(dataPro));
    showData();
}

function updateData(index) {
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[index].category;
    // Optionally, you may want to set a mode for update instead of deleting immediately
    // Remove the old product
    // deleteData(index); // Commented out to avoid deleting on update
}

function deleteAll() {
    localStorage.removeItem("products");
    dataPro = [];
    showData();
}

// Ensure deleteAll is available globally and connected to the button
window.deleteAll = deleteAll;
document.getElementById('deleteAll').onclick = deleteAll;

let serchMood = "title"; // Default search mode

function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id === "searchByTitle") {
        serchMood = "title";
        search.placeholder = "Search by Title";
    } else {
        serchMood = "category";
        search.placeholder = "Search by Category";
    }
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (serchMood === "title") {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`;
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateData(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}