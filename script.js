/*
    CRUDS-(Product-Management-System)
    ---------- Version.0.1 ----------
*/

// Target DOM Elements 
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let total = document.getElementById('total')

// Global Application State
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

let currenProductIndex = null;
let searchMood = 'title';
let appMood = 'create';

// GetTotal()
function getTotal() {
    let result = 0;
    if (price.value != '') {

        let result = (+price + +taxes + +ads) - +discount
        total.innerHTML = result;
        total.style.background = '#17f00f70';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgb(99, 28, 11)';
    }
}

// Bind Live Total Calaulations
[price, taxes, ads, discount].forEach(input => input.onkeyup = getTotal)


/**
 * CLEAR INPUTS
 */

function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.background = 'rgb(99, 28, 11)';
}

/**
 * Generate HTML table rows
 */
function generateHtml(item, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.taxes}</td>
            <td>${item.ads}</td>
            <td>${item.discount}</td>
            <td>${item.total}</td>
            <td>${item.category}</td>
            <td><button onclick="updateProduct(${index})" id="update">Update </button></td>
            <td><button onclick="deleteProduct(${index})" id="delete">Delete </button></td>
        </tr>
    `;
}

/**
 * Renders All Items in the table
 */

function showDate() {
    let tableHtml = '';
    for (let i = 0; i < dataPro.length; i++) {
        tableHtml += generateHtml(dataPro[i], i);
    }

    document.getElementById('tbody').innerHTML = tableHtml;


    // Manage DeleteALL button 
    const divBtn = document.getElementById('divBtn');
    if (dataPro.length > 0) {
        divBtn.innerHTML + `<button onclick='deleteAllPro()'>Delete All (${dataPro.length}) </button>`;
    } else {
        divBtn.innerHTML = ''
    }
}