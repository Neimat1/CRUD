var productName         = document.getElementById('productName');
var productPrice        = document.getElementById('productPrice');
var productCategory     = document.getElementById('productCategory');
var productDescription  = document.getElementById('productDescription');
var buttonAddOrUpdate   = document.getElementById('button-add-update');
var currentIndex = 0;
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
//main function that call other functions
function main(){
    if( !isEmpty()){
        if((buttonAddOrUpdate.innerHTML).includes("Update")){
            updateProduct(currentIndex);
        }
        else if(buttonAddOrUpdate.innerHTML==='Add Product'){
            addProduct();
        }
        clearInputs();
        displayProduct();
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

function isEmpty(){
    if(
        (productName.value== "")&&
        (productPrice.value== "")&& 
        (productCategory.value== "")&&
        (productDescription.value== "")
    ){
        return true;
    }
    else
        return false;

}

////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////// 
function searchProduct(product){
    var temporaryContainter=``;
    for(var i=0;i<products.length;i++){
        if(
            (products[i].name.toLowerCase().includes(product))||
            (products[i].category.toLowerCase().includes(product))
            ){
                temporaryContainter =  displayProductData(i, temporaryContainter);
        }
    }
    document.getElementById('tbody').innerHTML=temporaryContainter;
}
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