document.addEventListener("DOMContentLoaded",async()=>{
    let products= (await axios("http://localhost:3000/products")).data

    console.log(products);

    let cards=document.querySelector(".cards")


    function createCard(filteredProducts) {
        filteredProducts.forEach(product => {
            let card=document.createElement("div")
            card.classList.add("card")

            let cardImage=document.createElement("div")
            cardImage.classList.add("card-image")

            let cardSale=document.createElement("p")
            cardSale.classList.add("card-sale")
            cardSale.textContent=`${product.sale}`

            let cardHeart=document.createElement("i")
            cardHeart.classList.add("fa-regular", "fa-heart","card-heart")

            let cardImg=document.createElement("img")
            cardImg.classList.add("card-img")
            cardImg.src=`${product.image}`

            let cardContent=document.createElement("div")
            cardContent.classList.add("card-content")

            let cardStar1=document.createElement("i")
            cardStar1.classList.add("fa-solid", "fa-star", "card-star")


            let cardStar2=document.createElement("i")
            cardStar2.classList.add("fa-solid", "fa-star", "card-star")

            let cardStar3=document.createElement("i")
            cardStar3.classList.add("fa-solid", "fa-star", "card-star")

            let cardStar4=document.createElement("i")
            cardStar4.classList.add("fa-solid", "fa-star", "card-star")

            let cardStar5=document.createElement("i")
            cardStar5.classList.add("fa-solid", "fa-star", "card-star")

            let cardTitle=document.createElement("p")
            cardTitle.classList.add("card-title")
            cardTitle.textContent=`${product.title}`

            let price=document.createElement("span")
            price.classList.add("price")
            price.textContent=`$${product.price}`

            let spanSale=document.createElement("span")
            spanSale.classList.add("saleSpan")
            spanSale.textContent=`From $${product.saleprice}`

            let cardFooter=document.createElement("div")
            cardFooter.classList.add("cardFooter")

            let addBtn=document.createElement("button")
            addBtn.classList.add("addBtn")
            addBtn.textContent="Add to card"

            cardFooter.appendChild(addBtn)
            cardContent.append(cardStar1,cardStar2,cardStar3,cardStar4,cardStar5,cardTitle,price,spanSale)
            cardImage.append(cardSale,cardHeart,cardImg)
            card.append(cardImage,cardContent,cardFooter)
            cards.appendChild(card)

        });
    }

    let filteredProducts=[...products]
     
//filter section sort

    let sortByAZ = document.querySelector(".az");
    sortByAZ.addEventListener("click", (e) => {
    e.preventDefault();
    filteredProducts = products.sort((a, b) => a.title.localeCompare(b.title));
    cards.innerHTML = "";
    createCard(filteredProducts);
});

let sortByZA = document.querySelector(".za");
sortByZA.addEventListener("click", (e) => {
  e.preventDefault();
  filteredProducts = products.sort((a, b) => b.title.localeCompare(a.title));
  cards.innerHTML = "";
  createCard(filteredProducts);
});
 
//filter section price
let priceLow=document.querySelector(".low")
priceLow.addEventListener("click",(e)=>{
    e.preventDefault()
      filteredProducts=products.sort((a,b)=>b.price-a.price)
      cards.innerHTML=""
      createCard(filteredProducts)
})

let priceHigh=document.querySelector(".high")
priceHigh.addEventListener("click", (e)=>{
      e.preventDefault()
      filteredProducts=products.sort((a,b)=>a.price-b.price)
      cards.innerHTML=""
      createCard(filteredProducts)
})


//filter section search

let searchText=document.querySelector(".searchTxt")
let searchIcon=document.querySelector(".search")

searchIcon.addEventListener("click", searchProduct)
searchText.addEventListener("keyup", searchProduct)

function searchProduct(e) {
         e.preventDefault()
    let searchvalue=searchText.value
    console.log(searchvalue)
    filteredProducts=products.filter((product)=>product.title.toLowerCase().includes(searchvalue.trim().toLowerCase()))
    cards.innerHTML=""
    createCard(filteredProducts)
}

// search footer 
 let footerInput=document.querySelector(".searchTxtFooter")
 let footerIcon=document.querySelector(".searchFooter")
 footerIcon.addEventListener("click", searchProductFooter)
 footerInput.addEventListener("keyup", searchProductFooter)

 function searchProductFooter(e) {
    e.preventDefault()
   let footerValue=footerInput.value
   filteredProducts=products.filter((product)=>product.title.toLowerCase().includes(footerValue.trim().toLowerCase()))
   cards.innerHTML=""
   createCard(filteredProducts)
 }

 let wishlistIcon=document.querySelector(".wishlistIcon")






 
    createCard(filteredProducts)
    let toast=(text)=>{
        Toastify({
            text: `${text}`,
            duration:3000,
            position:"right",
            stopOnFocus: true,
            style:{
                background:"linear-gradient(to right, #d93025, #e57373)",
                color: "white",
                borderRadius:"6px",
                boxShadow:"0 4px 8px rgba(0,0,0,0.1)"
            },
            onClick:function () {} //Calback after click  
        }).showToast()
    }
})