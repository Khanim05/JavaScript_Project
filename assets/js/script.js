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
     
//filter section

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





    createCard(filteredProducts)
})