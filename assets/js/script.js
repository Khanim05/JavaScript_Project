document.addEventListener("DOMContentLoaded",async()=>{
    let products= (await axios.get("http://localhost:3000/products")).data

    console.log(products);
     
    let users=JSON.parse(localStorage.getItem("users")) || []
    let register=document.querySelector(".register")
    let login=document.querySelector(".login")
    let logout=document.querySelector(".logout")
    let btnusername=document.querySelector(".username")


    let loginedUser=users.find((user)=>user.isLogined==true)
    let userIndex=loginedUser ? users.findIndex((user)=>user.id===loginedUser.id) : -1

    if (!loginedUser) {
        register.classList.remove("d-none")
        login.classList.remove("d-none")
        logout.classList.add("d-none")
    }
    else{
        register.classList.add("d-none")
        login.classList.add("d-none")
        logout.classList.remove("d-none")
        btnusername.classList.remove("d-none")
        btnusername.textContent=loginedUser.username
    }


    logout.addEventListener("click", logoutUser)

    function logoutUser(e) {
        e.preventDefault()
        loginedUser.isLogined=false
        localStorage.setItem("users",JSON.stringify(users))
        toast("Logout account")
        setTimeout(() => {
            window.location.reload()
        }, 2000);
        return
    }
    

    // let Userbasket=loginedUser.basket || []
    // console.log(Userbasket)

    // let UserselectHeart=loginedUser.selecthearts || []

    // let Userwishlist=loginedUser.wishlist || []
    // console.log(Userwishlist)


    let cards=document.querySelector(".cards")

    let filteredProducts=[...products]

    function createCard(filteredProducts) {
        filteredProducts.forEach(product => {
            let card=document.createElement("div")
            card.classList.add("card")
            card.addEventListener("click", () => {
                window.location.href = `product-details.html?id=${product.id}`;
              });

            let cardImage=document.createElement("div")
            cardImage.classList.add("card-image")

            let cardSale=document.createElement("p")
            cardSale.classList.add("card-sale")
            cardSale.textContent=`${product.sale}`

            let cardHeart=document.createElement("i")
            cardHeart.classList.add("fa-regular", "fa-heart","card-heart")
            if (loginedUser && loginedUser.wishlist.some(item => item.id === product.id)) {
                cardHeart.classList.remove("fa-regular");
                cardHeart.classList.add("fa-solid");
              }
            cardHeart.addEventListener("click", (e)=>{
                e.stopPropagation()
                addUserWishlist(product.id,cardHeart)
            })

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
            addBtn.addEventListener("click", (e)=>{
                e.stopPropagation()
                UserBasket(product.id)
            })

            cardFooter.appendChild(addBtn)
            cardContent.append(cardStar1,cardStar2,cardStar3,cardStar4,cardStar5,cardTitle,price,spanSale)
            cardImage.append(cardSale,cardHeart,cardImg)
            card.append(cardImage,cardContent,cardFooter)
            cards.appendChild(card)

        });
    }

     
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

 //User Wishlisti
 function addUserWishlist(productID,HeardIcon) {
    if (!loginedUser) {
        toast("Login to add product to wishlist")
        setTimeout(() => {
            window.location.href="login.html"
        }, 2000);
    }

    let loginedUserProduct=loginedUser.wishlist.some((product)=>product.id===productID)
    if (loginedUserProduct) {
        let loginedUserProductIndex=loginedUser.wishlist.findIndex((product)=>product.id===productID)
        loginedUser.wishlist.splice(loginedUserProductIndex,1)
        users[userIndex].wishlist=loginedUser.wishlist
        HeardIcon.classList.add("fa-regular")
        HeardIcon.classList.remove("fa-solid")
        localStorage.setItem("users",JSON.stringify(users))
        toast("Product removed wishlist.")
    }
    else{
       let userAddProduct=filteredProducts.find((product)=>product.id===productID)
       loginedUser.wishlist.push(userAddProduct)
       users[userIndex].wishlist=loginedUser.wishlist
       HeardIcon.classList.remove("fa-regular")
       HeardIcon.classList.add("fa-solid")
       localStorage.setItem("users",JSON.stringify(users))
       toast("Product add wishlist")
    }
 }

//user Basket
function UserBasket(productID) {
    if (!loginedUser) {
        toast("Login to add product to basket")
        setTimeout(() => {
            window.location.href="login.html"
        }, 2000);
    }
    let userProduct=filteredProducts.find((item)=>item.id===productID)
    let existProduct=loginedUser.basket.find((item)=>item.id===productID)
    if (!existProduct) {
        loginedUser.basket.push({...userProduct,count:1})
    }
    else{
        existProduct.count++
    }
    users[userIndex].basket=loginedUser.basket
    localStorage.setItem("users",JSON.stringify(users))
    toast("Product added basket")

    basketCount()
}


//Basket count
function basketCount() {
    if (loginedUser) {
    let result=loginedUser.basket.reduce((acc,product)=>acc+product.count,0)

    let basketIcon=document.querySelector(".basketIcon sup")
    basketIcon.textContent=result
    }

}
basketCount()




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