
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
let slideIndex = 1;
arrowRight.addEventListener("click", showSlidesRight);
arrowLeft.addEventListener("click", showSlidesLeft);


function showSlidesRight() {
   let slides = document.querySelectorAll(".slide")
   let inside = document.querySelectorAll("#inside")
   slideIndex += 1;
   if(slideIndex>slides.length){slideIndex=1}
   for (let i=0; i<slides.length; i++){
       slides[i].style.display = "none"
       inside[i].classList.remove("active");
   }
   slides[slideIndex-1].style.display = "flex"
   inside[slideIndex-1].classList.add("active");
}
function showSlidesLeft() {
    let slides = document.querySelectorAll(".slide")
    let inside = document.querySelectorAll("#inside")
    slideIndex -= 1;
    if (slideIndex < 1) {slideIndex = slides.length}
    if(slideIndex>slides.length){slideIndex=1}
    for (let i=0; i<slides.length; i++){
        slides[i].style.display = "none"
        inside[i].classList.remove("active");
    }
    slides[slideIndex-1].style.display = "flex"
    inside[slideIndex-1].classList.add("active");
 }

const wrap1 = document.querySelector(".wrap1");
const cross1 = document.querySelector("#cross1");
const conteiner = document.querySelector(".conteiner");
const backToSite = document.querySelector(".back_to_site");
backToSite.addEventListener("click", () => {
    wrap1.style.display="none"
    conteiner.style.opacity = "1"
});
cross1.addEventListener("click", () => {
    wrap1.style.display="none"
    conteiner.style.opacity = "1"
});

const toBusket = document.querySelector(".to_busket")
toBusket.addEventListener("click", () => {
    wrap1.style.display="none";
    modal2.style.display="block";
    conteiner.style.opacity = "0.5"
});

const modal2 = document.querySelector(".modal2");
const cross2 = document.querySelector("#cross2");
cross2.addEventListener("click", () => {
    modal2.style.display="none"
    conteiner.style.opacity = "1"
    let empty_basket = document.querySelector(".empty_basket");
    empty_basket.remove();
});


let sales = [
	{
		name: 'kate',
        sale: 10,
        count: 3,
	},
	{
		name: 'serg',
        sale: 20,
        count: 2,
	},
	{
		name: 'kira',
        sale: 30,
        count: 2,
    },
    {
		name: 'kris',
        sale: 40,
        count: 5,
	},
];

let salesInput = document.querySelector(".sale")
let salesCuponButton = document.querySelector(".sales_cupon")
let errorP = document.querySelector("#error_p")

let cart = [];

const orders = document.querySelectorAll(".order");
orders.forEach( btn => btn.addEventListener("click", (e) => { 
    wrap1.style.display="flex" ;
    conteiner.style.opacity = "0.5";
    errorP.hidden = true
    
    let pizzaid = e.target.getAttribute("data-id");

    let pizza = {
        id: pizzaid,
        count: 1,
        sum: 0,
    }
    
    const element = cart.find(el => el.id === pizzaid)

   if (element === undefined) {

    let orderList = document.querySelector(".order_list")

    let item = document.createElement("div");
    
    let pizzaName = document.createElement("h2");
    let saveName = e.target.getAttribute("data-name");
    pizzaName.innerHTML = saveName;
    
    let pizzaPic = document.createElement("img")
    pizzaPic.classList.add("orderPic")
    let savePic = e.target.getAttribute("data-pic");
    pizzaPic.src = savePic

    let minusButton = document.createElement("button")
    minusButton.classList.add("minusButton")
    minusButton.innerHTML = ("-")

    
    let numberPis = document.createElement("span")
    numberPis.classList.add("numberPis")
    numberPis.innerHTML = (pizza.count);

    let plusButton = document.createElement("button");
    plusButton.classList.add("plusButton");
    plusButton.innerHTML = ("+")

    let price = e.target.getAttribute("data-price");

    let subTotal = document.createElement("span")
    subTotal.classList.add("subTotal")
    pizza.sum = price * pizza.count;
    subTotal.innerHTML = '$'+ (price * pizza.count).toFixed(2);

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML=("delete")

    let empty_basket = document.createElement("p");
    empty_basket.innerHTML = ("Корзина пуста");
    empty_basket.classList.add("empty_basket")
    orderList.append(empty_basket);
    empty_basket.hidden = true;

    let totalSumP = document.querySelector("#total_sum");
    let toOrder = document.querySelector(".to_order");

    orderList.append(item);
    item.append(pizzaName);
    item.append(pizzaPic);
    item.append(minusButton);
    item.append(numberPis);
    item.append(plusButton);
    item.append(subTotal);
    item.append(deleteButton);

    deleteButton.addEventListener("click", function(){
        item.remove();
        cart = cart.filter( function(item) { return item.id !== pizzaid} )
        totalSum = cart.reduce ((sum, item) => sum + item.sum, 0)
        total.innerHTML = '$'+totalSum.toFixed(2);
        basketCountSum = cart.reduce ((sum, item) => sum + item.count, 0)
        if (basketCountSum === 0){
            basketCount.innerHTML = "";
        }
        else {basketCount.innerHTML = basketCountSum;}
        if ( cart.length === 0){
            empty_basket.hidden = false;
            toOrder.hidden = true;
            totalSumP.hidden = true;
        }
    });

    plusButton.addEventListener("click", function(){
        pizza.count ++;
        numberPis.innerHTML = pizza.count;
        pizza.sum = price * pizza.count;
        subTotal.innerHTML = '$'+ (price * pizza.count).toFixed(2);
        totalSum = cart.reduce ((sum, item) => sum + item.sum, 0)
        total.innerHTML = '$'+totalSum.toFixed(2);
        basketCountSum = cart.reduce ((sum, item) => sum + item.count, 0)
        basketCount.innerHTML = basketCountSum;
    });

    minusButton.addEventListener("click", function(){
        pizza.count = pizza.count - 1;
        if(pizza.count<0){pizza.count = 0}
        numberPis.innerHTML = pizza.count;
        pizza.sum = price * pizza.count;
        subTotal.innerHTML = '$'+ (price * pizza.count).toFixed(2);
        totalSum = cart.reduce ((sum, item) => sum + item.sum, 0)
        total.innerHTML = '$'+totalSum.toFixed(2);
        basketCountSum = cart.reduce ((sum, item) => sum + item.count, 0)
        basketCount.innerHTML = basketCountSum;
    });

    toOrder.hidden = false;
    totalSumP.hidden = false;
    cart.push(pizza);
}

  let totalSum = cart.reduce ((sum, item) => sum + item.sum, 0) 
  let total = document.querySelector(".total")
  total.innerHTML = '$'+totalSum.toFixed(2);
  
  basketCountSum = cart.reduce ((sum, item) => sum + item.count, 0)
  let basketCount = document.querySelector(".basket_count")
  basketCount.innerHTML = basketCountSum;




    salesCuponButton.addEventListener("click", function() {
        let element = sales.find(el => el.name === salesInput.value)
        if(element && element.count>0){
          let totalSumSale = (totalSum - (totalSum * element.sale / 100)).toFixed(2)
          total.innerHTML = '$'+totalSumSale + ' - ' + element.sale + ' % ' + ' = ' + '$' +totalSumSale;
          element.count--;
          errorP.hidden = true;
        }
        else {
            errorP.hidden = false;
            total.innerHTML = '$'+totalSum;
            let error = document.querySelector("#error_p")
            error.innerHTML = "Купон больше не действителен";  
        }
  })



}));

let basketCountSum = 0
let modal3 = document.querySelector(".modal3")

let basketImg = document.querySelector(".basket_img");
basketImg.addEventListener("click", () => {

    basketCountSum = cart.reduce ((sum, item) => sum + item.count, 0)

    if (basketCountSum !== 0){
        modal2.style.display="block";
        conteiner.style.opacity = "0.5"
        modal3.style.display="none";
    }
    modal3.style.display="block";
    conteiner.style.opacity = "0.5"
});

const cross3 = document.querySelector("#cross3");
cross3.addEventListener("click", () => {
    modal3.style.display="none"
    conteiner.style.opacity = "1"
});

