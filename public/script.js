products = [{id:1,name1:'Lava',desc:'Smartphone',price:10,image:'iphoneblack.webp'},
            {id:2,name1:'Samsung',desc:'Smartphone',price:10,image:'iphonered.webp'},
            {id:3,name1:'vivo',desc:'Smartphone',price:10,image:'iphonegray.webp'}
           ];

ContainerProduct = document.getElementById("ContainerProduct");


products.forEach(element => {
    newProduct = document.createElement('div');
    newProduct.classname = 'card';
    newProduct.style.width = '18rem';
    newProduct.innerHTML = `<div class="card p-5 m-5" style="width: 18rem;">
                            <img class="card-img-top" src="${element.image}" alt="Card image cap">
                            <div class="card-body">
                            <h5 class="card-title">${element.name1}</h5>
                            <p class="card-text">${element.desc}</p>
                            <p class="card-text">${element.price}</p>
                            <a href="#" class="btn btn-primary" type="button" onclick="addToCart(${element.id});">Add To Cart</a>
                            </div>
                            </div>`;
    ContainerProduct.appendChild(newProduct);
});

cart = [];

function showProduct(){
    var totalPrice = 0;
    showCartProduct = document.getElementById("showCartProducts");
    showCartProduct.innerHTML = '';
    cart.forEach(elemn => {
        cartProduct = document.createElement('div');
        cartProduct.innerHTML = `<h4>Name :${elemn.name1}</h4>
                                  <p>Price :${elemn.price}</p>
                                  <hr>`;
        showCartProduct.appendChild(cartProduct);
        quantity = Number(document.getElementById("q").value);
        finalquantity = quantity*elemn.price;
        totalPrice += finalquantity;
        document.getElementById("totalprice").innerHTML = totalPrice;
    });
}

function addToCart(id){
    addedProduct = products.find(p => p.id === id);
    console.log(addedProduct);
    cart.push(addedProduct);
    document.getElementById("productCount").innerHTML = cart.length;
    showProduct();
}