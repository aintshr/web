let openShopping = document.querySelector('.fa-shopping-cart');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.box-container');
let total = document.querySelector('.total');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');

let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Caramel Frappucino',
        image: '1.JPG',
        price: 150
    },
    {
        id: 2,
        name: 'Java Chip Frappucino',
        image: '2.JPG',
        price: 150
    },
    {
        id: 3,
        name: 'Triple Mocha Frappucino',
        image: '3.JPG',
        price: 150
    },
    {
        id: 4,
        name: 'Dark Caramel Frappucino',
        image: '4.JPG',
        price: 150
    },
    {
        id: 5,
        name: 'Strawberries and Cream Frappucino',
        image: '5.JPG',
        price: 140
    },
    {
        id: 6,
        name: 'Green Tea Cream Frappucino',
        image: '6.JPG',
        price: 140
    },
    {
        id: 7,
        name: 'Chai Tea Cream Frappucino',
        image: '7.JPG',
        price: 140
    },
    {
        id: 8,
        name: 'Chocolate Chip Cream Frappucino',
        image: '8.JPG',
        price: 140
    },
    {
        id: 9,
        name: 'Cold Brew',
        image: '9.JPG',
        price: 135
    },
    {
        id: 10,
        name: 'Caramel Cold Brew',
        image: '10.JPG',
        price: 135
    },
    {
        id: 11,
        name: 'Vanilla Cold Brew',
        image: '11.JPG',
        price: 135
    },
    {
        id: 12,
        name: 'Nitro Cold Brew',
        image: '12.JPG',
        price: 135
    },
    {
        id: 13,
        name: 'Iced Americano',
        image: '13.JPG',
        price: 130
    },
    {
        id: 14,
        name: 'Iced Caffe Latte',
        image: '14.JPG',
        price: 130
    },
    {
        id: 15,
        name: 'Iced Caramel Macchiato',
        image: '15.JPG',
        price: 130
    },
    {
        id: 16,
        name: 'Iced Cappucino',
        image: '16.JPG',
        price: 130
    },
    {
        id: 17,
        name: 'Iced Black Tea Latte',
        image: '17.JPG',
        price: 125
    },
    {
        id: 18,
        name: 'Iced Shaken Black Tea',
        image: '18.JPG',
        price: 125
    },
    {
        id: 19,
        name: 'Iced Hibiscus Tea',
        image: '19.JPG',
        price: 125
    },
    {
        id: 20,
        name: 'Iced Macha Espresso',
        image: '20.JPG',
        price: 125
    },
    {
        id: 21,
        name: 'Hot Chocolate',
        image: '21.JPEG',
        price: 120
    },
    {
        id: 22,
        name: 'White Hot Chocolate',
        image: '22.JPEG',
        price: 120
    },
    {
        id: 23,
        name: 'Espresso Macchiato',
        image: '23.JPG',
        price: 120
    },
    {
        id: 24,
        name: 'Espresso Con Panna',
        image: '24.JPG',
        price: 120
    },
    {
        id: 25,
        name: 'Glazed Doughnut',
        image: '25.JPEG',
        price: 50
    },
    {
        id: 26,
        name: 'Chocolate Doughnut',
        image: '26.JPEG',
        price: 70
    },
    {
        id: 27,
        name: 'Chocolate Cake',
        image: '27.JPG',
        price: 100
    },
    {
        id: 28,
        name: 'Double Chocolate Bar',
        image: '28.JPG',
        price: 100
    }

];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
                    </div>
                    <div class="count">${value.quantity}</div>
                    <div class="returnPrice">$${value.price * value.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + value.quantity;
                totalPrice = totalPrice + (value.price * value.quantity);
            }
        })
    }
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}