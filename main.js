let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit');

//Global Vars
let tmp;
let mood = 'create';

//getTotal()

function getTotal() {
    let result = 0;
    if (price.value != '') {
        result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result
        total.style.background = '#17f00f70'
    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgb(99, 28, 11)'
    }

}
//saveLocalStorage
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}


//CreateProduct()
function submitProduct() {

    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML
    }
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        (mood === 'create' ? count.value != '' : true)
    ) {
        if (mood === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            }
            else {
                dataProduct.push(newProduct);
            }
        }
        else {
            dataProduct[tmp] = newProduct;
            mood = 'create';
            submit.innerHTML = 'CREATE';
            count.style.display = 'block'
        }
        clearInputs()
    }
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData()
}
// when the button is clicked
submit.onclick = submitProduct;

// Array of inputs in the exact order of the user inputs
const inputFields = [title, price, taxes, ads, discount, count, category]

// Intercept the Enter key to move focus od submit
document.querySelector('.inputs').onkeydown = function (e) {

    if (e.key === 'Enter') {

        // Prevent Default Actions (like accidental from reloads)
        e.preventDefault();

        // grab only visiable fields on the screen
        let visibleFields = inputFields.filter(field => field.style.display !== 'none')

        // Find Which Input the user is currently typing in
        const currentIndex = visibleFields.indexOf(document.activeElement);

        // only Jump to the next input if there's actually IS a next input
        if (currentIndex !== -1 && currentIndex < visibleFields.length - 1) {
            visibleFields[currentIndex + 1].focus()
        }
        // If they are on the vary last input (Category) , submit the product!
        else if (currentIndex === visibleFields.length - 1) {
            submitProduct();
            // Automatically loop focus back to the title input for the next item
            title.focus();
        }
        showData()

    }
}



// Clear Inputs 
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}


//Show/Read Data()
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {

        table += `
            
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].total}</td>
                <td><button onclick='updateProduct( ${i} )' id="update">UPDATE</button></td>
                <td><button onclick='deletePro( ${i} )'  id="delete">DELETE</button></td>
            </tr> 
            `;
    }
    document.getElementById('tbody').innerHTML = table
    let deleteBtn = document.querySelector('.divBtn');
    if (dataProduct.length > 0) {

        deleteBtn.innerHTML = `
            <button onclick='deleteAll()'> Delete All (${dataProduct.length}) </button>
        `
    }
    else {
        deleteBtn.innerHTML = ''
    }

}
showData()

//DeleteProduct()
function deletePro(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}
//DeleteAllProducts()
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData()

}
//UpdateProduct()

function updateProduct(i) {


    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    getTotal(); // total
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        behavior: "smooth",
        top: 0
    })


}
//getSearchMood()

let searchMood = 'title'
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category'
    }
    search.placeholder = `Search By ${searchMood}`;
    search.focus();
    search.value = ''
}


//Search()
function searchData(value) {
    let table = '';
    let = searchValue = value.toLowerCase();

    for (let i = 0; i < dataProduct.length; i++) {

        let item = dataProduct[i];

        // Combine the conditions 
        const matchTitle = searchMood === 'title' && item.title.toLowerCase().includes(searchValue);
        const matchCategory = searchMood === 'category' && item.category.toLowerCase().includes(searchValue);

        if (matchTitle || matchCategory) {

            table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick='updateDate( ${i} )' id="update">UPDATE</button></td>
                    <td><button onclick="deleteProduct( ${i} )" id="delete">DELETE</button></td>
                </tr> 
            `;
        }
    }



    document.getElementById('tbody').innerHTML = table;
}
// ## CLEAN-CODE ## //