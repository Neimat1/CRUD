var productName         = document.getElementById('productName');
var productPrice        = document.getElementById('productPrice');
var productCategory     = document.getElementById('productCategory');
var productDescription  = document.getElementById('productDescription');
var buttonAddOrUpdate   = document.getElementById('button-add-update');
var productSearch       = document.getElementById('search');

var currentIndex = 0;
var isValid=true;
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
//var products = [];
//use local storage to store products 
var products;
    if(localStorage.getItem('productsList')==null){
        products=[];
    }
    else{
        //use json.parse() to convert to array of objects
        products = JSON.parse(localStorage.getItem('productsList'));
        //to display producrs when start
        displayProduct();
    }

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 
buttonAddOrUpdate.addEventListener('click',function(){
    if((buttonAddOrUpdate.innerHTML).includes("Update")&&valid()){
        updateProduct(currentIndex);
    }
    else if(buttonAddOrUpdate.innerHTML.includes('Add Product')&&valid()){
        addProduct();
    }
    clearInputs();
    displayProduct();
})
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function validateProductName(){
    regex = /^[A-Z][A-Za-z ]{3,20}$/;
    if(regex.test(productName.value)){
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        return true;
    }
    else{   
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        return false;
    }
}
productName.addEventListener('keyup',validateProductName);

function validateProductPrice(){
    regex =/^[1-9][0-9]{0,9}$/;
    if(regex.test(productPrice.value)){
        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid');
        return true;
    }
    else{   
        productPrice.classList.add('is-invalid');
        productPrice.classList.remove('is-valid');
        return false;
    }
}
productPrice.addEventListener('keyup',validateProductPrice);

function validateProductCategory(){
    regex = /^[A-Z][A-Za-z ]{3,20}$/;
    if(regex.test(productCategory.value)){
        productCategory.classList.add('is-valid');
        productCategory.classList.remove('is-invalid');
        return true;
    }
    else{   
        productCategory.classList.add('is-invalid');
        productCategory.classList.remove('is-valid');
        return false;
    }
}
productCategory.addEventListener('keyup',validateProductCategory);


function validateProductDescription(){
    regex = /^[A-Z][A-Za-z ]{3,500}$/;
    if(regex.test(productDescription.value)){
        productDescription.classList.add('is-valid');
        productDescription.classList.remove('is-invalid');
        return true;
    }
    else{   
        productDescription.classList.add('is-invalid');
        productDescription.classList.remove('is-valid');
        return false;
    }
}
productDescription.addEventListener('keyup',validateProductDescription);

function valid(){
    if(validateProductName()&&
        validateProductPrice()&&
        validateProductCategory()&&
        validateProductDescription()){
            return true
        }
        else{
            return false
        }

}
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function addProduct(){
    var product = {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDescription.value
    }
    products.push(product);
    localStorage.setItem('productsList',JSON.stringify(products));
}
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function deleteProduct(indexDeletedProduct){
    products.splice(indexDeletedProduct,1);
    localStorage.clear();
    localStorage.setItem('productsList',JSON.stringify(products));
    displayProduct();
}

////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 

function clearInputs(){
    productName.value         = ""; 
    productPrice.value        = "";
    productCategory.value     = "";
    productDescription.value  = "";
    productName.classList.remove('is-valid');
    productPrice.classList.remove('is-valid');
    productCategory.classList.remove('is-valid');
    productDescription.classList.remove('is-valid');
}
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 

function displayProduct(){
    var temporaryContainter = '';
    for(var i = 0; i <products.length;i++){
        temporaryContainter =  displayProductData(i, temporaryContainter);
    }
    //attach to html by using innerHTML
    document.getElementById('tbody').innerHTML=temporaryContainter;
}
////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////
function displayProductData(indexOfProduct, temporaryContainter ){
        temporaryContainter += `
        <tr>
            <td>${indexOfProduct}</td>
            <td>${products[indexOfProduct].name}</td>
            <td>${products[indexOfProduct].price}</td>
            <td>${products[indexOfProduct].category}</td>
            <td>${products[indexOfProduct].description}</td>
            <td><button class="btn btn-outline-warning" onclick="DisplayCurrentUpdateProduct(${indexOfProduct})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${indexOfProduct});">Delete</button></td>
        </tr>
    `
    return temporaryContainter;
}

////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function searchProduct(product){
    var temporaryContainter=``;
    for(var i=0;i<products.length;i++){
        if(
            (products[i].name.toUpperCase().includes(product.toUpperCase()))||
            (products[i].category.toUpperCase().includes(product.toUpperCase()))
            ){
                temporaryContainter =  displayProductData(i, temporaryContainter);
        }
    }
    document.getElementById('tbody').innerHTML=temporaryContainter;
}
productSearch.addEventListener('keyup',function(){
    searchProduct(productSearch.value);
});
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function DisplayCurrentUpdateProduct(indexOfProduct){
    productName.value               = products[indexOfProduct].name; 
    productPrice.value              = products[indexOfProduct].price;
    productCategory.value           = products[indexOfProduct].category;
    productDescription.value        = products[indexOfProduct].description;
    buttonAddOrUpdate.innerHTML     = 'Update';
    currentIndex=indexOfProduct;

}
////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function updateProduct(currentIndex){
    products[currentIndex].name = productName.value;
    products[currentIndex].price = productPrice.value;
    products[currentIndex].category = productCategory.value;
    products[currentIndex].description = productDescription.value;
    buttonAddOrUpdate.innerHTML   = 'Add Product';
    localStorage.setItem('productsList',JSON.stringify(products));
    displayProduct();   
}